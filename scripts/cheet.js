(function (global) {
  'use strict';

  var cheet,
      sequences = {},
      keys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        a: 65,
        b: 66
      },
      Sequence,
      NOOP = function NOOP() {},
      held = {};

  Sequence = function Sequence (str, next, fail, done) {
    var i;

    this.str = str;
    this.next = next ? next : NOOP;
    this.fail = fail ? fail : NOOP;
    this.done = done ? done : NOOP;

    this.seq = str.split(' ');
    this.keys = [];

    for (i=0; i<this.seq.length; ++i) {
      this.keys.push(keys[this.seq[i]]);
    }

    this.idx = 0;
  };

  Sequence.prototype.keydown = function keydown (keyCode) {
    var i = this.idx;
    if (keyCode !== this.keys[i]) {
      if (i > 0) {
        this.reset();
        this.fail(this.str);
        cheet.__fail(this.str);
      }
      return;
    }

    this.next(this.str, this.seq[i], i, this.seq);
    cheet.__next(this.str, this.seq[i], i, this.seq);

    if (++this.idx === this.keys.length) {
      this.done(this.str);
      cheet.__done(this.str);
      this.reset();
    }
  };

  Sequence.prototype.reset = function () {
    this.idx = 0;
  };

  cheet = function cheet (str, handlers) {
    var next, fail, done;

    if (typeof handlers === 'function') {
      done = handlers;
    } else if (handlers !== null && handlers !== undefined) {
      next = handlers.next;
      fail = handlers.fail;
      done = handlers.done;
    }

    sequences[str] = new Sequence(str, next, fail, done);
  };

  cheet.disable = function disable (str) {
    delete sequences[str];
  };

  function keydown (e) {
    var id,
        k = e ? e.keyCode : event.keyCode;

    if (held[k]) return;
    held[k] = true;

    for (id in sequences) {
      sequences[id].keydown(k);
    }
  }

  function keyup (e) {
    var k = e ? e.keyCode : event.keyCode;
    held[k] = false;
  }

  function resetHeldKeys (e) {
    var k;
    for (k in held) {
      held[k] = false;
    }
  }

  function on (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function () {
        obj['e' + type + fn](window.event);
      };
      obj.attachEvent('on' + type, obj[type + fn]);
    }
  }

  on(window, 'keydown', keydown);
  on(window, 'keyup', keyup);
  on(window, 'blur', resetHeldKeys);
  on(window, 'focus', resetHeldKeys);

  cheet.__next = NOOP;
  cheet.next = function next (fn) {
    cheet.__next = fn === null ? NOOP : fn;
  };

  cheet.__fail = NOOP;
  cheet.fail = function fail (fn) {
    cheet.__fail = fn === null ? NOOP : fn;
  };

  cheet.__done = NOOP;
  cheet.done = function done (fn) {
    cheet.__done = fn === null ? NOOP : fn;
  };

  cheet.reset = function reset (id) {
    var seq = sequences[id];
    if (!(seq instanceof Sequence)) {
      console.warn('cheet: Unknown sequence: ' + id);
      return;
    }

    seq.reset();
  };

  global.cheet = cheet;

  if (typeof define === 'function' && define.amd) {
    define([], function () { return cheet; });
  } else if (typeof module !== 'undefined' && module !== null) {
    module.exports = cheet;
  }

})(this);
