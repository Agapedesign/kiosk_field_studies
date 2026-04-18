/**
 * Field Studies — sync client (PartyKit WebSocket).
 *
 * Minimal protocol, project-level only:
 *   SX -> DX: { type: "project_start", index, id, ts }
 *   DX -> SX: { type: "project_end",   index, id, ts }
 *
 * If CONFIG.sync.host is empty the module stays dormant and each screen
 * runs its own standalone timeline — sync is purely additive.
 */
const SYNC = (function () {
  'use strict';

  var ws = null;
  var role = null;
  var reconnectTimer = null;
  var lastMessageTs = 0;
  var sentCount = 0;
  var recvCount = 0;
  var handlers = {
    project_start: [],
    project_end: [],
  };

  function buildUrl() {
    var host = (CONFIG.sync && CONFIG.sync.host) || '';
    var room = (CONFIG.sync && CONFIG.sync.room) || 'showroom';
    if (!host) return '';
    return 'wss://' + host + '/party/' + room;
  }

  function connect(r) {
    role = r;
    var url = buildUrl();
    if (!url) {
      console.log('[SYNC] no host configured — standalone mode');
      return;
    }
    console.log('[SYNC] connecting as', role, '→', url);
    try {
      ws = new WebSocket(url);
    } catch (e) {
      console.warn('[SYNC] WebSocket failed, retrying in 2s', e);
      scheduleReconnect();
      return;
    }

    ws.onopen = function () {
      console.log('[SYNC] ✓ connected as', role);
    };

    ws.onmessage = function (event) {
      lastMessageTs = Date.now();
      recvCount++;
      var msg;
      try {
        msg = JSON.parse(event.data);
      } catch (e) {
        console.warn('[SYNC] bad JSON', event.data);
        return;
      }
      console.log('[SYNC] ← recv', msg.type, msg.index, msg.id);
      var list = handlers[msg.type];
      if (!list) return;
      for (var i = 0; i < list.length; i++) {
        try { list[i](msg); } catch (e) { console.error('[SYNC] handler error', e); }
      }
    };

    ws.onclose = function (event) {
      console.log('[SYNC] ✗ disconnected (code', event.code, '), retrying in 2s');
      scheduleReconnect();
    };

    ws.onerror = function (err) {
      console.warn('[SYNC] error event', err);
    };
  }

  function scheduleReconnect() {
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(function () { connect(role); }, 2000);
  }

  function send(msg) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn('[SYNC] send skipped — not connected', msg);
      return false;
    }
    try {
      ws.send(JSON.stringify(msg));
      sentCount++;
      console.log('[SYNC] → send', msg.type, msg.index, msg.id);
      return true;
    } catch (e) {
      console.warn('[SYNC] send failed', e);
      return false;
    }
  }

  function isConnected() {
    return !!ws && ws.readyState === WebSocket.OPEN;
  }

  /** True if sync is live AND we've heard from the peer recently. */
  function isAuthoritative() {
    if (!isConnected()) return false;
    // Accept fresh connections without requiring prior messages — the
    // server replays lastState, so silence means genuinely idle.
    if (lastMessageTs === 0) return true;
    return (Date.now() - lastMessageTs) < 30000;
  }

  return {
    connect: connect,
    isConnected: isConnected,
    isAuthoritative: isAuthoritative,
    on: function (type, cb) {
      (handlers[type] = handlers[type] || []).push(cb);
    },
    broadcastProjectStart: function (index, id) {
      return send({ type: 'project_start', index: index, id: id, ts: Date.now() });
    },
    broadcastProjectEnd: function (index, id) {
      return send({ type: 'project_end', index: index, id: id, ts: Date.now() });
    },
    broadcastHeartbeat: function (index, id) {
      return send({ type: 'heartbeat', index: index, id: id, ts: Date.now() });
    },
    /** Console helper: `SYNC.status()` prints current state. */
    status: function () {
      var s = {
        role: role,
        url: buildUrl(),
        readyState: ws ? ws.readyState : 'no ws',
        connected: isConnected(),
        authoritative: isAuthoritative(),
        sent: sentCount,
        received: recvCount,
        lastMessageAgo: lastMessageTs ? (Date.now() - lastMessageTs) + 'ms' : 'never',
      };
      console.table(s);
      return s;
    },
  };
})();
