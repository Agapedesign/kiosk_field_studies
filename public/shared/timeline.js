/**
 * Field Studies Display — Shared Timeline Calculator
 *
 * Both screens import this to determine current project and phase
 * based on wall-clock time + shared start timestamp.
 * This keeps SX and DX in sync without any server.
 */

const TIMELINE = (function () {
  'use strict';

  function getProjectDuration(idx) {
    const p = PROJECTS[idx];
    const imgCount = (p.images.gallery && p.images.gallery.length) || CONFIG.t2.imageCount;
    return CONFIG.t0.duration
      + CONFIG.transition.duration
      + CONFIG.t1.duration
      + CONFIG.t2.durationPerImage * imgCount
      + CONFIG.dissolve.duration;
  }

  function getTotalDuration() {
    let total = 0;
    for (let i = 0; i < PROJECTS.length; i++) {
      total += getProjectDuration(i);
    }
    return total;
  }

  function getStartTime() {
    var params = new URLSearchParams(window.location.search);
    var s = params.get('start');
    return s ? parseInt(s, 10) : CONFIG.sync.defaultStart;
  }

  /** Seconds elapsed in current loop cycle */
  function getElapsedInCycle() {
    var total = getTotalDuration();
    var elapsedSec = (Date.now() - getStartTime()) / 1000;
    return ((elapsedSec % total) + total) % total; // always positive
  }

  /**
   * Returns { projectIndex, phase, phaseProgress }
   * phase: 't0' | 'transition' | 't1' | 't2' | 'dissolve'
   */
  function getState() {
    var elapsed = getElapsedInCycle();
    var acc = 0;

    for (var i = 0; i < PROJECTS.length; i++) {
      var dur = getProjectDuration(i);
      if (elapsed < acc + dur) {
        var projElapsed = elapsed - acc;
        var t0End = CONFIG.t0.duration;
        var transEnd = t0End + CONFIG.transition.duration;
        var t1End = transEnd + CONFIG.t1.duration;
        var imgCount = (PROJECTS[i].images.gallery && PROJECTS[i].images.gallery.length) || CONFIG.t2.imageCount;
        var t2End = t1End + CONFIG.t2.durationPerImage * imgCount;

        var phase, phaseElapsed, phaseDuration;
        if (projElapsed < t0End) {
          phase = 't0'; phaseElapsed = projElapsed; phaseDuration = CONFIG.t0.duration;
        } else if (projElapsed < transEnd) {
          phase = 'transition'; phaseElapsed = projElapsed - t0End; phaseDuration = CONFIG.transition.duration;
        } else if (projElapsed < t1End) {
          phase = 't1'; phaseElapsed = projElapsed - transEnd; phaseDuration = CONFIG.t1.duration;
        } else if (projElapsed < t2End) {
          phase = 't2'; phaseElapsed = projElapsed - t1End; phaseDuration = CONFIG.t2.durationPerImage * imgCount;
        } else {
          phase = 'dissolve'; phaseElapsed = projElapsed - t2End; phaseDuration = CONFIG.dissolve.duration;
        }

        return {
          projectIndex: i,
          phase: phase,
          phaseProgress: phaseDuration > 0 ? phaseElapsed / phaseDuration : 0,
        };
      }
      acc += dur;
    }
    return { projectIndex: 0, phase: 't0', phaseProgress: 0 };
  }

  return {
    getProjectDuration: getProjectDuration,
    getTotalDuration: getTotalDuration,
    getStartTime: getStartTime,
    getElapsedInCycle: getElapsedInCycle,
    getState: getState,
  };
})();
