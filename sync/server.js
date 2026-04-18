/**
 * Field Studies — PartyKit sync relay.
 *
 * Pure message relay between the two showroom screens (SX master, DX follower).
 *
 * Protocol (minimal, project-level sync only):
 *   SX -> DX: { type: "project_start", index, id, ts }
 *   DX -> SX: { type: "project_end",   index, id, ts }
 *
 * The server forwards every message to the other peer and remembers the last
 * one so a reconnecting client can immediately realign.
 */
export default class FieldStudiesSync {
  constructor(room) {
    this.room = room;
    this.lastState = null;
  }

  async onConnect(conn) {
    if (this.lastState) {
      conn.send(this.lastState);
    }
  }

  async onMessage(message, sender) {
    this.lastState = message;
    this.room.broadcast(message, [sender.id]);
  }
}
