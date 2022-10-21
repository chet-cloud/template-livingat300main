"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;

(function (factory) {
  var registeredInModuleLoader = false;

  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }

  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();

    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
})(function () {
  function extend() {
    var i = 0;
    var result = {};

    for (; i < arguments.length; i++) {
      var attributes = arguments[i];

      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }

    return result;
  }

  function init(converter) {
    function api(key, value, attributes) {
      var result;

      if (typeof document === 'undefined') {
        return;
      } // Write


      if (arguments.length > 1) {
        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        } // We're using "expires" because "max-age" is not supported by IE


        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

        try {
          result = JSON.stringify(value);

          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);
        var stringifiedAttributes = '';

        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue;
          }

          stringifiedAttributes += '=' + attributes[attributeName];
        }

        return document.cookie = key + '=' + value + stringifiedAttributes;
      } // Read


      if (!key) {
        result = {};
      } // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"


      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = parts[0].replace(rdecode, decodeURIComponent);
          cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.set = api;

    api.get = function (key) {
      return api.call(api, key);
    };

    api.getJSON = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };

    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;
    return api;
  }

  return init(function () {});
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Flickity fullscreen v1.0.1
 * Enable fullscreen view for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/
(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['flickity/js/index', 'tap-listener/tap-listener'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('flickity'), require('tap-listener'));
  } else {
    // browser global
    factory(window.Flickity, window.TapListener);
  }
})(window, function factory(Flickity, TapListener) {
  'use strict';

  Flickity.createMethods.push('_createFullscreen');
  var proto = Flickity.prototype;

  proto._createFullscreen = function () {
    this.isFullscreen = false;

    if (!this.options.fullscreen) {
      return;
    } // buttons


    this.viewFullscreenButton = new FullscreenButton('view', this);
    this.exitFullscreenButton = new FullscreenButton('exit', this);
    this.on('activate', this._changeFullscreenActive);
    this.on('deactivate', this._changeFullscreenActive);
  }; // ----- activation ----- //


  proto._changeFullscreenActive = function () {
    var childMethod = this.isActive ? 'appendChild' : 'removeChild';
    this.element[childMethod](this.viewFullscreenButton.element);
    this.element[childMethod](this.exitFullscreenButton.element); // activate or deactivate buttons

    var activeMethod = this.isActive ? 'activate' : 'deactivate';
    this.viewFullscreenButton[activeMethod]();
    this.exitFullscreenButton[activeMethod]();
  }; // ----- view, exit, toggle ----- //


  proto.viewFullscreen = function () {
    this._changeFullscreen(true);

    this.focus();
  };

  proto.exitFullscreen = function () {
    this._changeFullscreen(false);
  };

  proto._changeFullscreen = function (isView) {
    if (this.isFullscreen == isView) {
      return;
    }

    this.isFullscreen = isView;
    var classMethod = isView ? 'add' : 'remove';
    document.documentElement.classList[classMethod]('is-flickity-fullscreen');
    this.element.classList[classMethod]('is-fullscreen');
    this.resize(); // HACK extra reposition on fullscreen for images

    if (this.isFullscreen) {
      this.reposition();
    }
  };

  proto.toggleFullscreen = function () {
    this._changeFullscreen(!this.isFullscreen);
  }; // ----- setGallerySize ----- //
  // overwrite so fullscreen cells are full height


  var setGallerySize = proto.setGallerySize;

  proto.setGallerySize = function () {
    if (!this.options.setGallerySize) {
      return;
    }

    if (this.isFullscreen) {
      // remove height style on fullscreen
      this.viewport.style.height = '';
    } else {
      // otherwise, do normal
      setGallerySize.call(this);
    }
  }; // ----- keyboard ----- //
  // ESC key closes full screen


  Flickity.keyboardHandlers[27] = function () {
    this.exitFullscreen();
  }; // ----- FullscreenButton ----- //


  function FullscreenButton(name, flickity) {
    this.name = name;
    this.createButton();
    this.createIcon(); // events
    // trigger viewFullscreen or exitFullscreen on button tap

    this.onTap = function () {
      flickity[name + 'Fullscreen']();
    };

    this.bindTap(this.element);
    this.clickHandler = this.onClick.bind(this);
  }

  FullscreenButton.prototype = Object.create(TapListener.prototype);

  FullscreenButton.prototype.createButton = function () {
    var element = this.element = document.createElement('button');
    element.className = 'flickity-button flickity-fullscreen-button ' + 'flickity-fullscreen-button-' + this.name; // set label

    var label = capitalize(this.name + ' full-screen');
    element.setAttribute('aria-label', label);
    element.title = label;
  };

  function capitalize(text) {
    return text[0].toUpperCase() + text.slice(1);
  }

  FullscreenButton.prototype.createIcon = function () {
    var icon = document.createElement('i');
    icon.setAttribute('class', 'tipi-i-maximize');
    this.element.appendChild(icon);
  };

  FullscreenButton.prototype.activate = function () {
    this.on('tap', this.onTap);
    this.element.addEventListener('click', this.clickHandler);
  };

  FullscreenButton.prototype.deactivate = function () {
    this.off('tap', this.onTap);
    this.element.removeEventListener('click', this.clickHandler);
  };

  FullscreenButton.prototype.onClick = function () {
    var focused = document.activeElement;

    if (focused && focused == this.element) {
      this.onTap();
    }
  }; // ----- fin ----- //


  return Flickity;
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Flickity PACKAGED v2.1.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /* globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
      return factory(window, jQuery);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('jquery'));
  } else {
    // browser global
    window.jQueryBridget = factory(window, window.jQuery);
  }
})(window, function factory(window, jQuery) {
  'use strict'; // ----- utils ----- //

  var arraySlice = Array.prototype.slice; // helper function for logging errors
  // $.error breaks jQuery chaining

  var console = window.console;
  var logError = typeof console == 'undefined' ? function () {} : function (message) {
    console.error(message);
  }; // ----- jQueryBridget ----- //

  function jQueryBridget(namespace, PluginClass, $) {
    $ = $ || jQuery || window.jQuery;

    if (!$) {
      return;
    } // add option method -> $().plugin('option', {...})


    if (!PluginClass.prototype.option) {
      // option setter
      PluginClass.prototype.option = function (opts) {
        // bail out if not an object
        if (!$.isPlainObject(opts)) {
          return;
        }

        this.options = $.extend(true, this.options, opts);
      };
    } // make jQuery plugin


    $.fn[namespace] = function (arg0
    /*, arg1 */
    ) {
      if (typeof arg0 == 'string') {
        // method call $().plugin( 'methodName', { options } )
        // shift arguments by 1
        var args = arraySlice.call(arguments, 1);
        return methodCall(this, arg0, args);
      } // just $().plugin({ options })


      plainCall(this, arg0);
      return this;
    }; // $().plugin('methodName')


    function methodCall($elems, methodName, args) {
      var returnValue;
      var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';
      $elems.each(function (i, elem) {
        // get instance
        var instance = $.data(elem, namespace);

        if (!instance) {
          logError(namespace + ' not initialized. Cannot call methods, i.e. ' + pluginMethodStr);
          return;
        }

        var method = instance[methodName];

        if (!method || methodName.charAt(0) == '_') {
          logError(pluginMethodStr + ' is not a valid method');
          return;
        } // apply method, get return value


        var value = method.apply(instance, args); // set return value if value is returned, use only first value

        returnValue = returnValue === undefined ? value : returnValue;
      });
      return returnValue !== undefined ? returnValue : $elems;
    }

    function plainCall($elems, options) {
      $elems.each(function (i, elem) {
        var instance = $.data(elem, namespace);

        if (instance) {
          // set options & init
          instance.option(options);

          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass(elem, options);
          $.data(elem, namespace, instance);
        }
      });
    }

    updateJQuery($);
  } // ----- updateJQuery ----- //
  // set $.bridget for v1 backwards compatibility


  function updateJQuery($) {
    if (!$ || $ && $.bridget) {
      return;
    }

    $.bridget = jQueryBridget;
  }

  updateJQuery(jQuery || window.jQuery); // -----  ----- //

  return jQueryBridget;
});
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */


(function (global, factory) {
  // universal module definition

  /* jshint strict: false */

  /* globals define, module, window */
  if (typeof define == 'function' && define.amd) {
    // AMD - RequireJS
    define('ev-emitter/ev-emitter', factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }
})(typeof window != 'undefined' ? window : void 0, function () {
  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    } // set events hash


    var events = this._events = this._events || {}; // set listeners array

    var listeners = events[eventName] = events[eventName] || []; // only add once

    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    } // add event


    this.on(eventName, listener); // set once flag
    // set onceEvents hash

    var onceEvents = this._onceEvents = this._onceEvents || {}; // set onceListeners object

    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {}; // set flag

    onceListeners[listener] = true;
    return this;
  };

  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];

    if (!listeners || !listeners.length) {
      return;
    }

    var index = listeners.indexOf(listener);

    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];

    if (!listeners || !listeners.length) {
      return;
    } // copy over to avoid interference if .off() in listener


    listeners = listeners.slice(0);
    args = args || []; // once stuff

    var onceListeners = this._onceEvents && this._onceEvents[eventName];

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[listener];

      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener); // unset once flag

        delete onceListeners[listener];
      } // trigger listener


      listener.apply(this, args);
    }

    return this;
  };

  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;
});
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

/* globals console: false */


(function (window, factory) {
  /* jshint strict: false */

  /* globals define, module */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('get-size/get-size', factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }
})(window, function factory() {
  'use strict'; // -------------------------- helpers -------------------------- //
  // get a number from a string, not a percentage

  function getStyleSize(value) {
    var num = parseFloat(value); // not a percent like '100%', and a number

    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }

  function noop() {}

  var logError = typeof console == 'undefined' ? noop : function (message) {
    console.error(message);
  }; // -------------------------- measurements -------------------------- //

  var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
  var measurementsLength = measurements.length;

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };

    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }

    return size;
  } // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */


  function getStyle(elem) {
    var style = getComputedStyle(elem);

    if (!style) {
      logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See https://bit.ly/getsizebug1');
    }

    return style;
  } // -------------------------- setup -------------------------- //


  var isSetup = false;
  var isBoxSizeOuter;
  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */

  function setup() {
    // setup once
    if (isSetup) {
      return;
    }

    isSetup = true; // -------------------------- box sizing -------------------------- //

    /**
     * Chrome & Safari measure the outer-width on style.width on border-box elems
     * IE11 & Firefox<29 measures the inner-width
     */

    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';
    var body = document.body || document.documentElement;
    body.appendChild(div);
    var style = getStyle(div); // round value for browser zoom. desandro/masonry#928

    isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
    getSize.isBoxSizeOuter = isBoxSizeOuter;
    body.removeChild(div);
  } // -------------------------- getSize -------------------------- //


  function getSize(elem) {
    setup(); // use querySeletor if elem is string

    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    } // do not proceed on non-objects


    if (!elem || _typeof(elem) != 'object' || !elem.nodeType) {
      return;
    }

    var style = getStyle(elem); // if hidden, everything is 0

    if (style.display == 'none') {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;
    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box'; // get all measurements

    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[measurement];
      var num = parseFloat(value); // any 'auto', 'medium' value will be 0

      size[measurement] = !isNaN(num) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;
    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter; // overwrite width and height if we can get it from style

    var styleWidth = getStyleSize(style.width);

    if (styleWidth !== false) {
      size.width = styleWidth + ( // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }

    var styleHeight = getStyleSize(style.height);

    if (styleHeight !== false) {
      size.height = styleHeight + ( // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }

    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);
    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;
    return size;
  }

  return getSize;
});
/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */


(function (window, factory) {
  /*global define: false, module: false */
  'use strict'; // universal module definition

  if (typeof define == 'function' && define.amd) {
    // AMD
    define('desandro-matches-selector/matches-selector', factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }
})(window, function factory() {
  'use strict';

  var matchesMethod = function () {
    var ElemProto = window.Element.prototype; // check for the standard method name first

    if (ElemProto.matches) {
      return 'matches';
    } // check un-prefixed


    if (ElemProto.matchesSelector) {
      return 'matchesSelector';
    } // check vendor prefixes


    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';

      if (ElemProto[method]) {
        return method;
      }
    }
  }();

  return function matchesSelector(elem, selector) {
    return elem[matchesMethod](selector);
  };
});
/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */


(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('fizzy-ui-utils/utils', ['desandro-matches-selector/matches-selector'], function (matchesSelector) {
      return factory(window, matchesSelector);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('desandro-matches-selector'));
  } else {
    // browser global
    window.fizzyUIUtils = factory(window, window.matchesSelector);
  }
})(window, function factory(window, matchesSelector) {
  var utils = {}; // ----- extend ----- //
  // extends objects

  utils.extend = function (a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }

    return a;
  }; // ----- modulo ----- //


  utils.modulo = function (num, div) {
    return (num % div + div) % div;
  }; // ----- makeArray ----- //


  var arraySlice = Array.prototype.slice; // turn element or nodeList into an array

  utils.makeArray = function (obj) {
    if (Array.isArray(obj)) {
      // use object if already an array
      return obj;
    } // return empty array if undefined or null. #6


    if (obj === null || obj === undefined) {
      return [];
    }

    var isArrayLike = _typeof(obj) == 'object' && typeof obj.length == 'number';

    if (isArrayLike) {
      // convert nodeList to array
      return arraySlice.call(obj);
    } // array of single index


    return [obj];
  }; // ----- removeFrom ----- //


  utils.removeFrom = function (ary, obj) {
    var index = ary.indexOf(obj);

    if (index != -1) {
      ary.splice(index, 1);
    }
  }; // ----- getParent ----- //


  utils.getParent = function (elem, selector) {
    while (elem.parentNode && elem != document.body) {
      elem = elem.parentNode;

      if (matchesSelector(elem, selector)) {
        return elem;
      }
    }
  }; // ----- getQueryElement ----- //
  // use element as selector string


  utils.getQueryElement = function (elem) {
    if (typeof elem == 'string') {
      return document.querySelector(elem);
    }

    return elem;
  }; // ----- handleEvent ----- //
  // enable .ontype to trigger from .addEventListener( elem, 'type' )


  utils.handleEvent = function (event) {
    var method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  }; // ----- filterFindElements ----- //


  utils.filterFindElements = function (elems, selector) {
    // make array of elems
    elems = utils.makeArray(elems);
    var ffElems = [];
    elems.forEach(function (elem) {
      // check that elem is an actual element
      if (!(elem instanceof HTMLElement)) {
        return;
      } // add elem if no selector


      if (!selector) {
        ffElems.push(elem);
        return;
      } // filter & find items if we have a selector
      // filter


      if (matchesSelector(elem, selector)) {
        ffElems.push(elem);
      } // find children


      var childElems = elem.querySelectorAll(selector); // concat childElems to filterFound array

      for (var i = 0; i < childElems.length; i++) {
        ffElems.push(childElems[i]);
      }
    });
    return ffElems;
  }; // ----- debounceMethod ----- //


  utils.debounceMethod = function (_class, methodName, threshold) {
    threshold = threshold || 100; // original method

    var method = _class.prototype[methodName];
    var timeoutName = methodName + 'Timeout';

    _class.prototype[methodName] = function () {
      var timeout = this[timeoutName];
      clearTimeout(timeout);
      var args = arguments;

      var _this = this;

      this[timeoutName] = setTimeout(function () {
        method.apply(_this, args);
        delete _this[timeoutName];
      }, threshold);
    };
  }; // ----- docReady ----- //


  utils.docReady = function (callback) {
    var readyState = document.readyState;

    if (readyState == 'complete' || readyState == 'interactive') {
      // do async to allow for other scripts to run. metafizzy/flickity#441
      setTimeout(callback);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }; // ----- htmlInit ----- //
  // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/


  utils.toDashed = function (str) {
    return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
      return $1 + '-' + $2;
    }).toLowerCase();
  };

  var console = window.console;
  /**
   * allow user to initialize classes via [data-namespace] or .js-namespace class
   * htmlInit( Widget, 'widgetName' )
   * options are parsed from data-namespace-options
   */

  utils.htmlInit = function (WidgetClass, namespace) {
    utils.docReady(function () {
      var dashedNamespace = utils.toDashed(namespace);
      var dataAttr = 'data-' + dashedNamespace;
      var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
      var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
      var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
      var dataOptionsAttr = dataAttr + '-options';
      var jQuery = window.jQuery;
      elems.forEach(function (elem) {
        var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
        var options;

        try {
          options = attr && JSON.parse(attr);
        } catch (error) {
          // log error, do not initialize
          if (console) {
            console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error);
          }

          return;
        } // initialize


        var instance = new WidgetClass(elem, options); // make available via $().data('namespace')

        if (jQuery) {
          jQuery.data(elem, namespace, instance);
        }
      });
    });
  }; // -----  ----- //


  return utils;
}); // Flickity.Cell


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/cell', ['get-size/get-size'], function (getSize) {
      return factory(window, getSize);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('get-size'));
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(window, window.getSize);
  }
})(window, function factory(window, getSize) {
  function Cell(elem, parent) {
    this.element = elem;
    this.parent = parent;
    this.create();
  }

  var proto = Cell.prototype;

  proto.create = function () {
    this.element.style.position = 'absolute';
    this.element.setAttribute('aria-selected', 'false');
    this.x = 0;
    this.shift = 0;
  };

  proto.destroy = function () {
    // reset style
    this.element.style.position = '';
    var side = this.parent.originSide;
    this.element.removeAttribute('aria-selected');
    this.element.style[side] = '';
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };

  proto.setPosition = function (x) {
    this.x = x;
    this.updateTarget();
    this.renderPosition(x);
  }; // setDefaultTarget v1 method, backwards compatibility, remove in v3


  proto.updateTarget = proto.setDefaultTarget = function () {
    var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
    this.target = this.x + this.size[marginProperty] + this.size.width * this.parent.cellAlign;
  };

  proto.renderPosition = function (x) {
    // render position of cell with in slider
    var side = this.parent.originSide;
    this.element.style[side] = this.parent.getPositionValue(x);
  };
  /**
   * @param {Integer} factor - 0, 1, or -1
  **/


  proto.wrapShift = function (shift) {
    this.shift = shift;
    this.renderPosition(this.x + this.parent.slideableWidth * shift);
  };

  proto.remove = function () {
    this.element.parentNode.removeChild(this.element);
  };

  return Cell;
}); // slide


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/slide', factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }
})(window, function factory() {
  'use strict';

  function Slide(parent) {
    this.parent = parent;
    this.isOriginLeft = parent.originSide == 'left';
    this.cells = [];
    this.outerWidth = 0;
    this.height = 0;
  }

  var proto = Slide.prototype;

  proto.addCell = function (cell) {
    this.cells.push(cell);
    this.outerWidth += cell.size.outerWidth;
    this.height = Math.max(cell.size.outerHeight, this.height); // first cell stuff

    if (this.cells.length == 1) {
      this.x = cell.x; // x comes from first cell

      var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
      this.firstMargin = cell.size[beginMargin];
    }
  };

  proto.updateTarget = function () {
    var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
    var lastCell = this.getLastCell();
    var lastMargin = lastCell ? lastCell.size[endMargin] : 0;
    var slideWidth = this.outerWidth - (this.firstMargin + lastMargin);
    this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
  };

  proto.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  };

  proto.select = function () {
    this.changeSelected(true);
  };

  proto.unselect = function () {
    this.changeSelected(false);
  };

  proto.changeSelected = function (isSelected) {
    var classMethod = isSelected ? 'add' : 'remove';
    this.cells.forEach(function (cell) {
      cell.element.classList[classMethod]('is-selected');
      cell.element.setAttribute('aria-selected', isSelected.toString());
    });
  };

  proto.getCellElements = function () {
    return this.cells.map(function (cell) {
      return cell.element;
    });
  };

  return Slide;
}); // animate


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/animate', ['fizzy-ui-utils/utils'], function (utils) {
      return factory(window, utils);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('fizzy-ui-utils'));
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(window, window.fizzyUIUtils);
  }
})(window, function factory(window, utils) {
  // -------------------------- animate -------------------------- //
  var proto = {};

  proto.startAnimation = function () {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.restingFrames = 0;
    this.animate();
  };

  proto.animate = function () {
    this.applyDragForce();
    this.applySelectedAttraction();
    var previousX = this.x;
    this.integratePhysics();
    this.positionSlider();
    this.settle(previousX); // animate next frame

    if (this.isAnimating) {
      var _this = this;

      requestAnimationFrame(function animateFrame() {
        _this.animate();
      });
    }
  };

  proto.positionSlider = function () {
    var x = this.x; // wrap position around

    if (this.options.wrapAround && this.cells.length > 1) {
      x = utils.modulo(x, this.slideableWidth);
      x = x - this.slideableWidth;
      this.shiftWrapCells(x);
    }

    x = x + this.cursorPosition; // reverse if right-to-left and using transform

    x = this.options.rightToLeft ? -x : x;
    var value = this.getPositionValue(x); // use 3D tranforms for hardware acceleration on iOS
    // but use 2D when settled, for better font-rendering

    this.slider.style.transform = this.isAnimating ? 'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')'; // scroll event

    var firstSlide = this.slides[0];

    if (firstSlide) {
      var positionX = -this.x - firstSlide.target;
      var progress = positionX / this.slidesWidth;
      this.dispatchEvent('scroll', null, [progress, positionX]);
    }
  };

  proto.positionSliderAtSelected = function () {
    if (!this.cells.length) {
      return;
    }

    this.x = -this.selectedSlide.target;
    this.velocity = 0; // stop wobble

    this.positionSlider();
  };

  proto.getPositionValue = function (position) {
    if (this.options.percentPosition) {
      // percent position, round to 2 digits, like 12.34%
      return Math.round(position / this.size.innerWidth * 10000) * 0.01 + '%';
    } else {
      // pixel positioning
      return Math.round(position) + 'px';
    }
  };

  proto.settle = function (previousX) {
    // keep track of frames where x hasn't moved
    if (!this.isPointerDown && Math.round(this.x * 100) == Math.round(previousX * 100)) {
      this.restingFrames++;
    } // stop animating if resting for 3 or more frames


    if (this.restingFrames > 2) {
      this.isAnimating = false;
      delete this.isFreeScrolling; // render position with translateX when settled

      this.positionSlider();
      this.dispatchEvent('settle', null, [this.selectedIndex]);
    }
  };

  proto.shiftWrapCells = function (x) {
    // shift before cells
    var beforeGap = this.cursorPosition + x;

    this._shiftCells(this.beforeShiftCells, beforeGap, -1); // shift after cells


    var afterGap = this.size.innerWidth - (x + this.slideableWidth + this.cursorPosition);

    this._shiftCells(this.afterShiftCells, afterGap, 1);
  };

  proto._shiftCells = function (cells, gap, shift) {
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var cellShift = gap > 0 ? shift : 0;
      cell.wrapShift(cellShift);
      gap -= cell.size.outerWidth;
    }
  };

  proto._unshiftCells = function (cells) {
    if (!cells || !cells.length) {
      return;
    }

    for (var i = 0; i < cells.length; i++) {
      cells[i].wrapShift(0);
    }
  }; // -------------------------- physics -------------------------- //


  proto.integratePhysics = function () {
    this.x += this.velocity;
    this.velocity *= this.getFrictionFactor();
  };

  proto.applyForce = function (force) {
    this.velocity += force;
  };

  proto.getFrictionFactor = function () {
    return 1 - this.options[this.isFreeScrolling ? 'freeScrollFriction' : 'friction'];
  };

  proto.getRestingPosition = function () {
    // my thanks to Steven Wittens, who simplified this math greatly
    return this.x + this.velocity / (1 - this.getFrictionFactor());
  };

  proto.applyDragForce = function () {
    if (!this.isDraggable || !this.isPointerDown) {
      return;
    } // change the position to drag position by applying force


    var dragVelocity = this.dragX - this.x;
    var dragForce = dragVelocity - this.velocity;
    this.applyForce(dragForce);
  };

  proto.applySelectedAttraction = function () {
    // do not attract if pointer down or no slides
    var dragDown = this.isDraggable && this.isPointerDown;

    if (dragDown || this.isFreeScrolling || !this.slides.length) {
      return;
    }

    var distance = this.selectedSlide.target * -1 - this.x;
    var force = distance * this.options.selectedAttraction;
    this.applyForce(force);
  };

  return proto;
}); // Flickity main


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/flickity', ['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './cell', './slide', './animate'], function (EvEmitter, getSize, utils, Cell, Slide, animatePrototype) {
      return factory(window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./cell'), require('./slide'), require('./animate'));
  } else {
    // browser global
    var _Flickity = window.Flickity;
    window.Flickity = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, _Flickity.Cell, _Flickity.Slide, _Flickity.animatePrototype);
  }
})(window, function factory(window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype) {
  // vars
  var jQuery = window.jQuery;
  var getComputedStyle = window.getComputedStyle;
  var console = window.console;

  function moveElements(elems, toElem) {
    elems = utils.makeArray(elems);

    while (elems.length) {
      toElem.appendChild(elems.shift());
    }
  } // -------------------------- Flickity -------------------------- //
  // globally unique identifiers


  var GUID = 0; // internal store of all Flickity intances

  var instances = {};

  function Flickity(element, options) {
    var queryElement = utils.getQueryElement(element);

    if (!queryElement) {
      if (console) {
        console.error('Bad element for Flickity: ' + (queryElement || element));
      }

      return;
    }

    this.element = queryElement; // do not initialize twice on same element

    if (this.element.flickityGUID) {
      var instance = instances[this.element.flickityGUID];
      instance.option(options);
      return instance;
    } // add jQuery


    if (jQuery) {
      this.$element = jQuery(this.element);
    } // options


    this.options = utils.extend({}, this.constructor.defaults);
    this.option(options); // kick things off

    this._create();
  }

  Flickity.defaults = {
    accessibility: true,
    // adaptiveHeight: false,
    cellAlign: 'center',
    // cellSelector: undefined,
    // contain: false,
    freeScrollFriction: 0.075,
    // friction when free-scrolling
    friction: 0.28,
    // friction when selecting
    namespaceJQueryEvents: true,
    // initialIndex: 0,
    percentPosition: true,
    resize: true,
    selectedAttraction: 0.025,
    setGallerySize: true // watchCSS: false,
    // wrapAround: false

  }; // hash of methods triggered on _create()

  Flickity.createMethods = [];
  var proto = Flickity.prototype; // inherit EventEmitter

  utils.extend(proto, EvEmitter.prototype);

  proto._create = function () {
    // add id for Flickity.data
    var id = this.guid = ++GUID;
    this.element.flickityGUID = id; // expando

    instances[id] = this; // associate via id
    // initial properties

    this.selectedIndex = 0; // how many frames slider has been in same position

    this.restingFrames = 0; // initial physics properties

    this.x = 0;
    this.velocity = 0;
    this.originSide = this.options.rightToLeft ? 'right' : 'left'; // create viewport & slider

    this.viewport = document.createElement('div');
    this.viewport.className = 'flickity-viewport';

    this._createSlider();

    if (this.options.resize || this.options.watchCSS) {
      window.addEventListener('resize', this);
    } // add listeners from on option


    for (var eventName in this.options.on) {
      var listener = this.options.on[eventName];
      this.on(eventName, listener);
    }

    Flickity.createMethods.forEach(function (method) {
      this[method]();
    }, this);

    if (this.options.watchCSS) {
      this.watchCSS();
    } else {
      this.activate();
    }
  };
  /**
   * set options
   * @param {Object} opts
   */


  proto.option = function (opts) {
    utils.extend(this.options, opts);
  };

  proto.activate = function () {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.element.classList.add('flickity-enabled');

    if (this.options.rightToLeft) {
      this.element.classList.add('flickity-rtl');
    }

    this.getSize(); // move initial cell elements so they can be loaded as cells

    var cellElems = this._filterFindCellElements(this.element.children);

    moveElements(cellElems, this.slider);
    this.viewport.appendChild(this.slider);
    this.element.appendChild(this.viewport); // get cells from children

    this.reloadCells();

    if (this.options.accessibility) {
      // allow element to focusable
      this.element.tabIndex = 0; // listen for key presses

      this.element.addEventListener('keydown', this);
    }

    this.emitEvent('activate');
    var index;
    var initialIndex = this.options.initialIndex;

    if (this.isInitActivated) {
      index = this.selectedIndex;
    } else if (initialIndex !== undefined) {
      index = this.cells[initialIndex] ? initialIndex : 0;
    } else {
      index = 0;
    } // select instantly


    this.select(index, false, true); // flag for initial activation, for using initialIndex

    this.isInitActivated = true; // ready event. #493

    this.dispatchEvent('ready');
  }; // slider positions the cells


  proto._createSlider = function () {
    // slider element does all the positioning
    var slider = document.createElement('div');
    slider.className = 'flickity-slider';
    slider.style[this.originSide] = 0;
    this.slider = slider;
  };

  proto._filterFindCellElements = function (elems) {
    return utils.filterFindElements(elems, this.options.cellSelector);
  }; // goes through all children


  proto.reloadCells = function () {
    // collection of item elements
    this.cells = this._makeCells(this.slider.children);
    this.positionCells();

    this._getWrapShiftCells();

    this.setGallerySize();
  };
  /**
   * turn elements into Flickity.Cells
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - collection of new Flickity Cells
   */


  proto._makeCells = function (elems) {
    var cellElems = this._filterFindCellElements(elems); // create new Flickity for collection


    var cells = cellElems.map(function (cellElem) {
      return new Cell(cellElem, this);
    }, this);
    return cells;
  };

  proto.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  };

  proto.getLastSlide = function () {
    return this.slides[this.slides.length - 1];
  }; // positions all cells


  proto.positionCells = function () {
    // size all cells
    this._sizeCells(this.cells); // position all cells


    this._positionCells(0);
  };
  /**
   * position certain cells
   * @param {Integer} index - which cell to start with
   */


  proto._positionCells = function (index) {
    index = index || 0; // also measure maxCellHeight
    // start 0 if positioning all cells

    this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
    var cellX = 0; // get cellX

    if (index > 0) {
      var startCell = this.cells[index - 1];
      cellX = startCell.x + startCell.size.outerWidth;
    }

    var len = this.cells.length;

    for (var i = index; i < len; i++) {
      var cell = this.cells[i];
      cell.setPosition(cellX);
      cellX += cell.size.outerWidth;
      this.maxCellHeight = Math.max(cell.size.outerHeight, this.maxCellHeight);
    } // keep track of cellX for wrap-around


    this.slideableWidth = cellX; // slides

    this.updateSlides(); // contain slides target

    this._containSlides(); // update slidesWidth


    this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
  };
  /**
   * cell.getSize() on multiple cells
   * @param {Array} cells
   */


  proto._sizeCells = function (cells) {
    cells.forEach(function (cell) {
      cell.getSize();
    });
  }; // --------------------------  -------------------------- //


  proto.updateSlides = function () {
    this.slides = [];

    if (!this.cells.length) {
      return;
    }

    var slide = new Slide(this);
    this.slides.push(slide);
    var isOriginLeft = this.originSide == 'left';
    var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

    var canCellFit = this._getCanCellFit();

    this.cells.forEach(function (cell, i) {
      // just add cell if first cell in slide
      if (!slide.cells.length) {
        slide.addCell(cell);
        return;
      }

      var slideWidth = slide.outerWidth - slide.firstMargin + (cell.size.outerWidth - cell.size[nextMargin]);

      if (canCellFit.call(this, i, slideWidth)) {
        slide.addCell(cell);
      } else {
        // doesn't fit, new slide
        slide.updateTarget();
        slide = new Slide(this);
        this.slides.push(slide);
        slide.addCell(cell);
      }
    }, this); // last slide

    slide.updateTarget(); // update .selectedSlide

    this.updateSelectedSlide();
  };

  proto._getCanCellFit = function () {
    var groupCells = this.options.groupCells;

    if (!groupCells) {
      return function () {
        return false;
      };
    } else if (typeof groupCells == 'number') {
      // group by number. 3 -> [0,1,2], [3,4,5], ...
      var number = parseInt(groupCells, 10);
      return function (i) {
        return i % number !== 0;
      };
    } // default, group by width of slide
    // parse '75%


    var percentMatch = typeof groupCells == 'string' && groupCells.match(/^(\d+)%$/);
    var percent = percentMatch ? parseInt(percentMatch[1], 10) / 100 : 1;
    return function (i, slideWidth) {
      return slideWidth <= (this.size.innerWidth + 1) * percent;
    };
  }; // alias _init for jQuery plugin .flickity()


  proto._init = proto.reposition = function () {
    this.positionCells();
    this.positionSliderAtSelected();
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
    this.setCellAlign();
    this.cursorPosition = this.size.innerWidth * this.cellAlign;
  };

  var cellAlignShorthands = {
    // cell align, then based on origin side
    center: {
      left: 0.5,
      right: 0.5
    },
    left: {
      left: 0,
      right: 1
    },
    right: {
      right: 0,
      left: 1
    }
  };

  proto.setCellAlign = function () {
    var shorthand = cellAlignShorthands[this.options.cellAlign];
    this.cellAlign = shorthand ? shorthand[this.originSide] : this.options.cellAlign;
  };

  proto.setGallerySize = function () {
    if (this.options.setGallerySize) {
      var height = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
      this.viewport.style.height = height + 'px';
    }
  };

  proto._getWrapShiftCells = function () {
    // only for wrap-around
    if (!this.options.wrapAround) {
      return;
    } // unshift previous cells


    this._unshiftCells(this.beforeShiftCells);

    this._unshiftCells(this.afterShiftCells); // get before cells
    // initial gap


    var gapX = this.cursorPosition;
    var cellIndex = this.cells.length - 1;
    this.beforeShiftCells = this._getGapCells(gapX, cellIndex, -1); // get after cells
    // ending gap between last cell and end of gallery viewport

    gapX = this.size.innerWidth - this.cursorPosition; // start cloning at first cell, working forwards

    this.afterShiftCells = this._getGapCells(gapX, 0, 1);
  };

  proto._getGapCells = function (gapX, cellIndex, increment) {
    // keep adding cells until the cover the initial gap
    var cells = [];

    while (gapX > 0) {
      var cell = this.cells[cellIndex];

      if (!cell) {
        break;
      }

      cells.push(cell);
      cellIndex += increment;
      gapX -= cell.size.outerWidth;
    }

    return cells;
  }; // ----- contain ----- //
  // contain cell targets so no excess sliding


  proto._containSlides = function () {
    if (!this.options.contain || this.options.wrapAround || !this.cells.length) {
      return;
    }

    var isRightToLeft = this.options.rightToLeft;
    var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
    var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
    var contentWidth = this.slideableWidth - this.getLastCell().size[endMargin]; // content is less than gallery size

    var isContentSmaller = contentWidth < this.size.innerWidth; // bounds

    var beginBound = this.cursorPosition + this.cells[0].size[beginMargin];
    var endBound = contentWidth - this.size.innerWidth * (1 - this.cellAlign); // contain each cell target

    this.slides.forEach(function (slide) {
      if (isContentSmaller) {
        // all cells fit inside gallery
        slide.target = contentWidth * this.cellAlign;
      } else {
        // contain to bounds
        slide.target = Math.max(slide.target, beginBound);
        slide.target = Math.min(slide.target, endBound);
      }
    }, this);
  }; // -----  ----- //

  /**
   * emits events via eventEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */


  proto.dispatchEvent = function (type, event, args) {
    var emitArgs = event ? [event].concat(args) : args;
    this.emitEvent(type, emitArgs);

    if (jQuery && this.$element) {
      // default trigger with type if no event
      type += this.options.namespaceJQueryEvents ? '.flickity' : '';
      var $event = type;

      if (event) {
        // create jQuery event
        var jQEvent = jQuery.Event(event);
        jQEvent.type = type;
        $event = jQEvent;
      }

      this.$element.trigger($event, args);
    }
  }; // -------------------------- select -------------------------- //

  /**
   * @param {Integer} index - index of the slide
   * @param {Boolean} isWrap - will wrap-around to last/first if at the end
   * @param {Boolean} isInstant - will immediately set position at selected cell
   */


  proto.select = function (index, isWrap, isInstant) {
    if (!this.isActive) {
      return;
    }

    index = parseInt(index, 10);

    this._wrapSelect(index);

    if (this.options.wrapAround || isWrap) {
      index = utils.modulo(index, this.slides.length);
    } // bail if invalid index


    if (!this.slides[index]) {
      return;
    }

    var prevIndex = this.selectedIndex;
    this.selectedIndex = index;
    this.updateSelectedSlide();

    if (isInstant) {
      this.positionSliderAtSelected();
    } else {
      this.startAnimation();
    }

    if (this.options.adaptiveHeight) {
      this.setGallerySize();
    } // events


    this.dispatchEvent('select', null, [index]); // change event if new index

    if (index != prevIndex) {
      this.dispatchEvent('change', null, [index]);
    } // old v1 event name, remove in v3


    this.dispatchEvent('cellSelect');
  }; // wraps position for wrapAround, to move to closest slide. #113


  proto._wrapSelect = function (index) {
    var len = this.slides.length;
    var isWrapping = this.options.wrapAround && len > 1;

    if (!isWrapping) {
      return index;
    }

    var wrapIndex = utils.modulo(index, len); // go to shortest

    var delta = Math.abs(wrapIndex - this.selectedIndex);
    var backWrapDelta = Math.abs(wrapIndex + len - this.selectedIndex);
    var forewardWrapDelta = Math.abs(wrapIndex - len - this.selectedIndex);

    if (!this.isDragSelect && backWrapDelta < delta) {
      index += len;
    } else if (!this.isDragSelect && forewardWrapDelta < delta) {
      index -= len;
    } // wrap position so slider is within normal area


    if (index < 0) {
      this.x -= this.slideableWidth;
    } else if (index >= len) {
      this.x += this.slideableWidth;
    }
  };

  proto.previous = function (isWrap, isInstant) {
    this.select(this.selectedIndex - 1, isWrap, isInstant);
  };

  proto.next = function (isWrap, isInstant) {
    this.select(this.selectedIndex + 1, isWrap, isInstant);
  };

  proto.updateSelectedSlide = function () {
    var slide = this.slides[this.selectedIndex]; // selectedIndex could be outside of slides, if triggered before resize()

    if (!slide) {
      return;
    } // unselect previous selected slide


    this.unselectSelectedSlide(); // update new selected slide

    this.selectedSlide = slide;
    slide.select();
    this.selectedCells = slide.cells;
    this.selectedElements = slide.getCellElements(); // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
    // Remove in v3?

    this.selectedCell = slide.cells[0];
    this.selectedElement = this.selectedElements[0];
  };

  proto.unselectSelectedSlide = function () {
    if (this.selectedSlide) {
      this.selectedSlide.unselect();
    }
  };
  /**
   * select slide from number or cell element
   * @param {Element or Number} elem
   */


  proto.selectCell = function (value, isWrap, isInstant) {
    // get cell
    var cell = this.queryCell(value);

    if (!cell) {
      return;
    }

    var index = this.getCellSlideIndex(cell);
    this.select(index, isWrap, isInstant);
  };

  proto.getCellSlideIndex = function (cell) {
    // get index of slides that has cell
    for (var i = 0; i < this.slides.length; i++) {
      var slide = this.slides[i];
      var index = slide.cells.indexOf(cell);

      if (index != -1) {
        return i;
      }
    }
  }; // -------------------------- get cells -------------------------- //

  /**
   * get Flickity.Cell, given an Element
   * @param {Element} elem
   * @returns {Flickity.Cell} item
   */


  proto.getCell = function (elem) {
    // loop through cells to get the one that matches
    for (var i = 0; i < this.cells.length; i++) {
      var cell = this.cells[i];

      if (cell.element == elem) {
        return cell;
      }
    }
  };
  /**
   * get collection of Flickity.Cells, given Elements
   * @param {Element, Array, NodeList} elems
   * @returns {Array} cells - Flickity.Cells
   */


  proto.getCells = function (elems) {
    elems = utils.makeArray(elems);
    var cells = [];
    elems.forEach(function (elem) {
      var cell = this.getCell(elem);

      if (cell) {
        cells.push(cell);
      }
    }, this);
    return cells;
  };
  /**
   * get cell elements
   * @returns {Array} cellElems
   */


  proto.getCellElements = function () {
    return this.cells.map(function (cell) {
      return cell.element;
    });
  };
  /**
   * get parent cell from an element
   * @param {Element} elem
   * @returns {Flickit.Cell} cell
   */


  proto.getParentCell = function (elem) {
    // first check if elem is cell
    var cell = this.getCell(elem);

    if (cell) {
      return cell;
    } // try to get parent cell elem


    elem = utils.getParent(elem, '.flickity-slider > *');
    return this.getCell(elem);
  };
  /**
   * get cells adjacent to a slide
   * @param {Integer} adjCount - number of adjacent slides
   * @param {Integer} index - index of slide to start
   * @returns {Array} cells - array of Flickity.Cells
   */


  proto.getAdjacentCellElements = function (adjCount, index) {
    if (!adjCount) {
      return this.selectedSlide.getCellElements();
    }

    index = index === undefined ? this.selectedIndex : index;
    var len = this.slides.length;

    if (1 + adjCount * 2 >= len) {
      return this.getCellElements();
    }

    var cellElems = [];

    for (var i = index - adjCount; i <= index + adjCount; i++) {
      var slideIndex = this.options.wrapAround ? utils.modulo(i, len) : i;
      var slide = this.slides[slideIndex];

      if (slide) {
        cellElems = cellElems.concat(slide.getCellElements());
      }
    }

    return cellElems;
  };
  /**
   * select slide from number or cell element
   * @param {Element, Selector String, or Number} selector
   */


  proto.queryCell = function (selector) {
    if (typeof selector == 'number') {
      // use number as index
      return this.cells[selector];
    }

    if (typeof selector == 'string') {
      // use string as selector, get element
      selector = this.element.querySelector(selector);
    } // get cell from element


    return this.getCell(selector);
  }; // -------------------------- events -------------------------- //


  proto.uiChange = function () {
    this.emitEvent('uiChange');
  };

  proto.childUIPointerDown = function (event) {
    this.emitEvent('childUIPointerDown', [event]);
  }; // ----- resize ----- //


  proto.onresize = function () {
    this.watchCSS();
    this.resize();
  };

  utils.debounceMethod(Flickity, 'onresize', 150);

  proto.resize = function () {
    if (!this.isActive) {
      return;
    }

    this.getSize(); // wrap values

    if (this.options.wrapAround) {
      this.x = utils.modulo(this.x, this.slideableWidth);
    }

    this.positionCells();

    this._getWrapShiftCells();

    this.setGallerySize();
    this.emitEvent('resize'); // update selected index for group slides, instant
    // TODO: position can be lost between groups of various numbers

    var selectedElement = this.selectedElements && this.selectedElements[0];
    this.selectCell(selectedElement, false, true);
  }; // watches the :after property, activates/deactivates


  proto.watchCSS = function () {
    var watchOption = this.options.watchCSS;

    if (!watchOption) {
      return;
    }

    var afterContent = getComputedStyle(this.element, ':after').content; // activate if :after { content: 'flickity' }

    if (afterContent.indexOf('flickity') != -1) {
      this.activate();
    } else {
      this.deactivate();
    }
  }; // ----- keydown ----- //
  // go previous/next if left/right keys pressed


  proto.onkeydown = function (event) {
    // only work if element is in focus
    var isNotFocused = document.activeElement && document.activeElement != this.element;

    if (!this.options.accessibility || isNotFocused) {
      return;
    }

    var handler = Flickity.keyboardHandlers[event.keyCode];

    if (handler) {
      handler.call(this);
    }
  };

  Flickity.keyboardHandlers = {
    // left arrow
    37: function _() {
      var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
      this.uiChange();
      this[leftMethod]();
    },
    // right arrow
    39: function _() {
      var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
      this.uiChange();
      this[rightMethod]();
    }
  }; // ----- focus ----- //

  proto.focus = function () {
    // TODO remove scrollTo once focus options gets more support
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
    var prevScrollY = window.pageYOffset;
    this.element.focus({
      preventScroll: true
    }); // hack to fix scroll jump after focus, #76

    if (window.pageYOffset != prevScrollY) {
      window.scrollTo(window.pageXOffset, prevScrollY);
    }
  }; // -------------------------- destroy -------------------------- //
  // deactivate all Flickity functionality, but keep stuff available


  proto.deactivate = function () {
    if (!this.isActive) {
      return;
    }

    this.element.classList.remove('flickity-enabled');
    this.element.classList.remove('flickity-rtl');
    this.unselectSelectedSlide(); // destroy cells

    this.cells.forEach(function (cell) {
      cell.destroy();
    });
    this.element.removeChild(this.viewport); // move child elements back into element

    moveElements(this.slider.children, this.element);

    if (this.options.accessibility) {
      this.element.removeAttribute('tabIndex');
      this.element.removeEventListener('keydown', this);
    } // set flags


    this.isActive = false;
    this.emitEvent('deactivate');
  };

  proto.destroy = function () {
    this.deactivate();
    window.removeEventListener('resize', this);
    this.emitEvent('destroy');

    if (jQuery && this.$element) {
      jQuery.removeData(this.element, 'flickity');
    }

    delete this.element.flickityGUID;
    delete instances[this.guid];
  }; // -------------------------- prototype -------------------------- //


  utils.extend(proto, animatePrototype); // -------------------------- extras -------------------------- //

  /**
   * get Flickity instance from element
   * @param {Element} elem
   * @returns {Flickity}
   */

  Flickity.data = function (elem) {
    elem = utils.getQueryElement(elem);
    var id = elem && elem.flickityGUID;
    return id && instances[id];
  };

  utils.htmlInit(Flickity, 'flickity');

  if (jQuery && jQuery.bridget) {
    jQuery.bridget('flickity', Flickity);
  } // set internal jQuery, for Webpack + jQuery v3, #478


  Flickity.setJQuery = function (jq) {
    jQuery = jq;
  };

  Flickity.Cell = Cell;
  return Flickity;
});
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */

  /*global define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('unipointer/unipointer', ['ev-emitter/ev-emitter'], function (EvEmitter) {
      return factory(window, EvEmitter);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('ev-emitter'));
  } else {
    // browser global
    window.Unipointer = factory(window, window.EvEmitter);
  }
})(window, function factory(window, EvEmitter) {
  function noop() {}

  function Unipointer() {} // inherit EvEmitter


  var proto = Unipointer.prototype = Object.create(EvEmitter.prototype);

  proto.bindStartEvent = function (elem) {
    this._bindStartEvent(elem, true);
  };

  proto.unbindStartEvent = function (elem) {
    this._bindStartEvent(elem, false);
  };
  /**
   * Add or remove start event
   * @param {Boolean} isAdd - remove if falsey
   */


  proto._bindStartEvent = function (elem, isAdd) {
    // munge isAdd, default to true
    isAdd = isAdd === undefined ? true : isAdd;
    var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener'; // default to mouse events

    var startEvent = 'mousedown';

    if (window.PointerEvent) {
      // Pointer Events
      startEvent = 'pointerdown';
    } else if ('ontouchstart' in window) {
      // Touch Events. iOS Safari
      startEvent = 'touchstart';
    }

    elem[bindMethod](startEvent, this);
  }; // trigger handler methods for events


  proto.handleEvent = function (event) {
    var method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  }; // returns the touch that we're keeping track of


  proto.getTouch = function (touches) {
    for (var i = 0; i < touches.length; i++) {
      var touch = touches[i];

      if (touch.identifier == this.pointerIdentifier) {
        return touch;
      }
    }
  }; // ----- start event ----- //


  proto.onmousedown = function (event) {
    // dismiss clicks from right or middle buttons
    var button = event.button;

    if (button && button !== 0 && button !== 1) {
      return;
    }

    this._pointerDown(event, event);
  };

  proto.ontouchstart = function (event) {
    this._pointerDown(event, event.changedTouches[0]);
  };

  proto.onpointerdown = function (event) {
    this._pointerDown(event, event);
  };
  /**
   * pointer start
   * @param {Event} event
   * @param {Event or Touch} pointer
   */


  proto._pointerDown = function (event, pointer) {
    // dismiss right click and other pointers
    // button = 0 is okay, 1-4 not
    if (event.button || this.isPointerDown) {
      return;
    }

    this.isPointerDown = true; // save pointer identifier to match up touch events

    this.pointerIdentifier = pointer.pointerId !== undefined ? // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;
    this.pointerDown(event, pointer);
  };

  proto.pointerDown = function (event, pointer) {
    this._bindPostStartEvents(event);

    this.emitEvent('pointerDown', [event, pointer]);
  }; // hash of events to be bound after start event


  var postStartEvents = {
    mousedown: ['mousemove', 'mouseup'],
    touchstart: ['touchmove', 'touchend', 'touchcancel'],
    pointerdown: ['pointermove', 'pointerup', 'pointercancel']
  };

  proto._bindPostStartEvents = function (event) {
    if (!event) {
      return;
    } // get proper events to match start event


    var events = postStartEvents[event.type]; // bind events to node

    events.forEach(function (eventName) {
      window.addEventListener(eventName, this);
    }, this); // save these arguments

    this._boundPointerEvents = events;
  };

  proto._unbindPostStartEvents = function () {
    // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
    if (!this._boundPointerEvents) {
      return;
    }

    this._boundPointerEvents.forEach(function (eventName) {
      window.removeEventListener(eventName, this);
    }, this);

    delete this._boundPointerEvents;
  }; // ----- move event ----- //


  proto.onmousemove = function (event) {
    this._pointerMove(event, event);
  };

  proto.onpointermove = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerMove(event, event);
    }
  };

  proto.ontouchmove = function (event) {
    var touch = this.getTouch(event.changedTouches);

    if (touch) {
      this._pointerMove(event, touch);
    }
  };
  /**
   * pointer move
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */


  proto._pointerMove = function (event, pointer) {
    this.pointerMove(event, pointer);
  }; // public


  proto.pointerMove = function (event, pointer) {
    this.emitEvent('pointerMove', [event, pointer]);
  }; // ----- end event ----- //


  proto.onmouseup = function (event) {
    this._pointerUp(event, event);
  };

  proto.onpointerup = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerUp(event, event);
    }
  };

  proto.ontouchend = function (event) {
    var touch = this.getTouch(event.changedTouches);

    if (touch) {
      this._pointerUp(event, touch);
    }
  };
  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */


  proto._pointerUp = function (event, pointer) {
    this._pointerDone();

    this.pointerUp(event, pointer);
  }; // public


  proto.pointerUp = function (event, pointer) {
    this.emitEvent('pointerUp', [event, pointer]);
  }; // ----- pointer done ----- //
  // triggered on pointer up & pointer cancel


  proto._pointerDone = function () {
    this._pointerReset();

    this._unbindPostStartEvents();

    this.pointerDone();
  };

  proto._pointerReset = function () {
    // reset properties
    this.isPointerDown = false;
    delete this.pointerIdentifier;
  };

  proto.pointerDone = noop; // ----- pointer cancel ----- //

  proto.onpointercancel = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerCancel(event, event);
    }
  };

  proto.ontouchcancel = function (event) {
    var touch = this.getTouch(event.changedTouches);

    if (touch) {
      this._pointerCancel(event, touch);
    }
  };
  /**
   * pointer cancel
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */


  proto._pointerCancel = function (event, pointer) {
    this._pointerDone();

    this.pointerCancel(event, pointer);
  }; // public


  proto.pointerCancel = function (event, pointer) {
    this.emitEvent('pointerCancel', [event, pointer]);
  }; // -----  ----- //
  // utility function for getting x/y coords from event


  Unipointer.getPointerPoint = function (pointer) {
    return {
      x: pointer.pageX,
      y: pointer.pageY
    };
  }; // -----  ----- //


  return Unipointer;
});
/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */


(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('unidragger/unidragger', ['unipointer/unipointer'], function (Unipointer) {
      return factory(window, Unipointer);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('unipointer'));
  } else {
    // browser global
    window.Unidragger = factory(window, window.Unipointer);
  }
})(window, function factory(window, Unipointer) {
  // -------------------------- Unidragger -------------------------- //
  function Unidragger() {} // inherit Unipointer & EvEmitter


  var proto = Unidragger.prototype = Object.create(Unipointer.prototype); // ----- bind start ----- //

  proto.bindHandles = function () {
    this._bindHandles(true);
  };

  proto.unbindHandles = function () {
    this._bindHandles(false);
  };
  /**
   * Add or remove start event
   * @param {Boolean} isAdd
   */


  proto._bindHandles = function (isAdd) {
    // munge isAdd, default to true
    isAdd = isAdd === undefined ? true : isAdd; // bind each handle

    var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
    var touchAction = isAdd ? this._touchActionValue : '';

    for (var i = 0; i < this.handles.length; i++) {
      var handle = this.handles[i];

      this._bindStartEvent(handle, isAdd);

      handle[bindMethod]('click', this); // touch-action: none to override browser touch gestures. metafizzy/flickity#540

      if (window.PointerEvent) {
        handle.style.touchAction = touchAction;
      }
    }
  }; // prototype so it can be overwriteable by Flickity


  proto._touchActionValue = 'none'; // ----- start event ----- //

  /**
   * pointer start
   * @param {Event} event
   * @param {Event or Touch} pointer
   */

  proto.pointerDown = function (event, pointer) {
    var isOkay = this.okayPointerDown(event);

    if (!isOkay) {
      return;
    } // track start event position


    this.pointerDownPointer = pointer;
    event.preventDefault();
    this.pointerDownBlur(); // bind move and end events

    this._bindPostStartEvents(event);

    this.emitEvent('pointerDown', [event, pointer]);
  }; // nodes that have text fields


  var cursorNodes = {
    TEXTAREA: true,
    INPUT: true,
    SELECT: true,
    OPTION: true
  }; // input types that do not have text fields

  var clickTypes = {
    radio: true,
    checkbox: true,
    button: true,
    submit: true,
    image: true,
    file: true
  }; // dismiss inputs with text fields. flickity#403, flickity#404

  proto.okayPointerDown = function (event) {
    var isCursorNode = cursorNodes[event.target.nodeName];
    var isClickType = clickTypes[event.target.type];
    var isOkay = !isCursorNode || isClickType;

    if (!isOkay) {
      this._pointerReset();
    }

    return isOkay;
  }; // kludge to blur previously focused input


  proto.pointerDownBlur = function () {
    var focused = document.activeElement; // do not blur body for IE10, metafizzy/flickity#117

    var canBlur = focused && focused.blur && focused != document.body;

    if (canBlur) {
      focused.blur();
    }
  }; // ----- move event ----- //

  /**
   * drag move
   * @param {Event} event
   * @param {Event or Touch} pointer
   */


  proto.pointerMove = function (event, pointer) {
    var moveVector = this._dragPointerMove(event, pointer);

    this.emitEvent('pointerMove', [event, pointer, moveVector]);

    this._dragMove(event, pointer, moveVector);
  }; // base pointer move logic


  proto._dragPointerMove = function (event, pointer) {
    var moveVector = {
      x: pointer.pageX - this.pointerDownPointer.pageX,
      y: pointer.pageY - this.pointerDownPointer.pageY
    }; // start drag if pointer has moved far enough to start drag

    if (!this.isDragging && this.hasDragStarted(moveVector)) {
      this._dragStart(event, pointer);
    }

    return moveVector;
  }; // condition if pointer has moved far enough to start drag


  proto.hasDragStarted = function (moveVector) {
    return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
  }; // ----- end event ----- //

  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   */


  proto.pointerUp = function (event, pointer) {
    this.emitEvent('pointerUp', [event, pointer]);

    this._dragPointerUp(event, pointer);
  };

  proto._dragPointerUp = function (event, pointer) {
    if (this.isDragging) {
      this._dragEnd(event, pointer);
    } else {
      // pointer didn't move enough for drag to start
      this._staticClick(event, pointer);
    }
  }; // -------------------------- drag -------------------------- //
  // dragStart


  proto._dragStart = function (event, pointer) {
    this.isDragging = true; // prevent clicks

    this.isPreventingClicks = true;
    this.dragStart(event, pointer);
  };

  proto.dragStart = function (event, pointer) {
    this.emitEvent('dragStart', [event, pointer]);
  }; // dragMove


  proto._dragMove = function (event, pointer, moveVector) {
    // do not drag if not dragging yet
    if (!this.isDragging) {
      return;
    }

    this.dragMove(event, pointer, moveVector);
  };

  proto.dragMove = function (event, pointer, moveVector) {
    event.preventDefault();
    this.emitEvent('dragMove', [event, pointer, moveVector]);
  }; // dragEnd


  proto._dragEnd = function (event, pointer) {
    // set flags
    this.isDragging = false; // re-enable clicking async

    setTimeout(function () {
      delete this.isPreventingClicks;
    }.bind(this));
    this.dragEnd(event, pointer);
  };

  proto.dragEnd = function (event, pointer) {
    this.emitEvent('dragEnd', [event, pointer]);
  }; // ----- onclick ----- //
  // handle all clicks and prevent clicks when dragging


  proto.onclick = function (event) {
    if (this.isPreventingClicks) {
      event.preventDefault();
    }
  }; // ----- staticClick ----- //
  // triggered after pointer down & up with no/tiny movement


  proto._staticClick = function (event, pointer) {
    // ignore emulated mouse up clicks
    if (this.isIgnoringMouseUp && event.type == 'mouseup') {
      return;
    }

    this.staticClick(event, pointer); // set flag for emulated clicks 300ms after touchend

    if (event.type != 'mouseup') {
      this.isIgnoringMouseUp = true; // reset flag after 300ms

      setTimeout(function () {
        delete this.isIgnoringMouseUp;
      }.bind(this), 400);
    }
  };

  proto.staticClick = function (event, pointer) {
    this.emitEvent('staticClick', [event, pointer]);
  }; // ----- utils ----- //


  Unidragger.getPointerPoint = Unipointer.getPointerPoint; // -----  ----- //

  return Unidragger;
}); // drag


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/drag', ['./flickity', 'unidragger/unidragger', 'fizzy-ui-utils/utils'], function (Flickity, Unidragger, utils) {
      return factory(window, Flickity, Unidragger, utils);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('./flickity'), require('unidragger'), require('fizzy-ui-utils'));
  } else {
    // browser global
    window.Flickity = factory(window, window.Flickity, window.Unidragger, window.fizzyUIUtils);
  }
})(window, function factory(window, Flickity, Unidragger, utils) {
  // ----- defaults ----- //
  utils.extend(Flickity.defaults, {
    draggable: '>1',
    dragThreshold: 3
  }); // ----- create ----- //

  Flickity.createMethods.push('_createDrag'); // -------------------------- drag prototype -------------------------- //

  var proto = Flickity.prototype;
  utils.extend(proto, Unidragger.prototype);
  proto._touchActionValue = 'pan-y'; // --------------------------  -------------------------- //

  var isTouch = 'createTouch' in document;
  var isTouchmoveScrollCanceled = false;

  proto._createDrag = function () {
    this.on('activate', this.onActivateDrag);
    this.on('uiChange', this._uiChangeDrag);
    this.on('childUIPointerDown', this._childUIPointerDownDrag);
    this.on('deactivate', this.onDeactivateDrag);
    this.on('cellChange', this.updateDraggable); // TODO updateDraggable on resize? if groupCells & slides change
    // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
    // #457, RubaXa/Sortable#973

    if (isTouch && !isTouchmoveScrollCanceled) {
      window.addEventListener('touchmove', function () {});
      isTouchmoveScrollCanceled = true;
    }
  };

  proto.onActivateDrag = function () {
    this.handles = [this.viewport];
    this.bindHandles();
    this.updateDraggable();
  };

  proto.onDeactivateDrag = function () {
    this.unbindHandles();
    this.element.classList.remove('is-draggable');
  };

  proto.updateDraggable = function () {
    // disable dragging if less than 2 slides. #278
    if (this.options.draggable == '>1') {
      this.isDraggable = this.slides.length > 1;
    } else {
      this.isDraggable = this.options.draggable;
    }

    if (this.isDraggable) {
      this.element.classList.add('is-draggable');
    } else {
      this.element.classList.remove('is-draggable');
    }
  }; // backwards compatibility


  proto.bindDrag = function () {
    this.options.draggable = true;
    this.updateDraggable();
  };

  proto.unbindDrag = function () {
    this.options.draggable = false;
    this.updateDraggable();
  };

  proto._uiChangeDrag = function () {
    delete this.isFreeScrolling;
  };

  proto._childUIPointerDownDrag = function (event) {
    // allow focus & preventDefault even when not draggable
    // so child UI elements keep focus on carousel. #721
    event.preventDefault();
    this.pointerDownFocus(event);
  }; // -------------------------- pointer events -------------------------- //


  proto.pointerDown = function (event, pointer) {
    if (!this.isDraggable) {
      this._pointerDownDefault(event, pointer);

      return;
    }

    var isOkay = this.okayPointerDown(event);

    if (!isOkay) {
      return;
    }

    this._pointerDownPreventDefault(event);

    this.pointerDownFocus(event); // blur

    if (document.activeElement != this.element) {
      // do not blur if already focused
      this.pointerDownBlur();
    } // stop if it was moving


    this.dragX = this.x;
    this.viewport.classList.add('is-pointer-down'); // track scrolling

    this.pointerDownScroll = getScrollPosition();
    window.addEventListener('scroll', this);

    this._pointerDownDefault(event, pointer);
  }; // default pointerDown logic, used for staticClick


  proto._pointerDownDefault = function (event, pointer) {
    // track start event position
    this.pointerDownPointer = pointer; // bind move and end events

    this._bindPostStartEvents(event);

    this.dispatchEvent('pointerDown', event, [pointer]);
  };

  var focusNodes = {
    INPUT: true,
    TEXTAREA: true,
    SELECT: true
  };

  proto.pointerDownFocus = function (event) {
    var isFocusNode = focusNodes[event.target.nodeName];

    if (!isFocusNode) {
      this.focus();
    }
  };

  proto._pointerDownPreventDefault = function (event) {
    var isTouchStart = event.type == 'touchstart';
    var isTouchPointer = event.pointerType == 'touch';
    var isFocusNode = focusNodes[event.target.nodeName];

    if (!isTouchStart && !isTouchPointer && !isFocusNode) {
      event.preventDefault();
    }
  }; // ----- move ----- //


  proto.hasDragStarted = function (moveVector) {
    return Math.abs(moveVector.x) > this.options.dragThreshold;
  }; // ----- up ----- //


  proto.pointerUp = function (event, pointer) {
    delete this.isTouchScrolling;
    this.viewport.classList.remove('is-pointer-down');
    this.dispatchEvent('pointerUp', event, [pointer]);

    this._dragPointerUp(event, pointer);
  };

  proto.pointerDone = function () {
    window.removeEventListener('scroll', this);
    delete this.pointerDownScroll;
  }; // -------------------------- dragging -------------------------- //


  proto.dragStart = function (event, pointer) {
    if (!this.isDraggable) {
      return;
    }

    this.dragStartPosition = this.x;
    this.startAnimation();
    window.removeEventListener('scroll', this);
    this.dispatchEvent('dragStart', event, [pointer]);
  };

  proto.pointerMove = function (event, pointer) {
    var moveVector = this._dragPointerMove(event, pointer);

    this.dispatchEvent('pointerMove', event, [pointer, moveVector]);

    this._dragMove(event, pointer, moveVector);
  };

  proto.dragMove = function (event, pointer, moveVector) {
    if (!this.isDraggable) {
      return;
    }

    event.preventDefault();
    this.previousDragX = this.dragX; // reverse if right-to-left

    var direction = this.options.rightToLeft ? -1 : 1;

    if (this.options.wrapAround) {
      // wrap around move. #589
      moveVector.x = moveVector.x % this.slideableWidth;
    }

    var dragX = this.dragStartPosition + moveVector.x * direction;

    if (!this.options.wrapAround && this.slides.length) {
      // slow drag
      var originBound = Math.max(-this.slides[0].target, this.dragStartPosition);
      dragX = dragX > originBound ? (dragX + originBound) * 0.5 : dragX;
      var endBound = Math.min(-this.getLastSlide().target, this.dragStartPosition);
      dragX = dragX < endBound ? (dragX + endBound) * 0.5 : dragX;
    }

    this.dragX = dragX;
    this.dragMoveTime = new Date();
    this.dispatchEvent('dragMove', event, [pointer, moveVector]);
  };

  proto.dragEnd = function (event, pointer) {
    if (!this.isDraggable) {
      return;
    }

    if (this.options.freeScroll) {
      this.isFreeScrolling = true;
    } // set selectedIndex based on where flick will end up


    var index = this.dragEndRestingSelect();

    if (this.options.freeScroll && !this.options.wrapAround) {
      // if free-scroll & not wrap around
      // do not free-scroll if going outside of bounding slides
      // so bounding slides can attract slider, and keep it in bounds
      var restingX = this.getRestingPosition();
      this.isFreeScrolling = -restingX > this.slides[0].target && -restingX < this.getLastSlide().target;
    } else if (!this.options.freeScroll && index == this.selectedIndex) {
      // boost selection if selected index has not changed
      index += this.dragEndBoostSelect();
    }

    delete this.previousDragX; // apply selection
    // TODO refactor this, selecting here feels weird
    // HACK, set flag so dragging stays in correct direction

    this.isDragSelect = this.options.wrapAround;
    this.select(index);
    delete this.isDragSelect;
    this.dispatchEvent('dragEnd', event, [pointer]);
  };

  proto.dragEndRestingSelect = function () {
    var restingX = this.getRestingPosition(); // how far away from selected slide

    var distance = Math.abs(this.getSlideDistance(-restingX, this.selectedIndex)); // get closet resting going up and going down

    var positiveResting = this._getClosestResting(restingX, distance, 1);

    var negativeResting = this._getClosestResting(restingX, distance, -1); // use closer resting for wrap-around


    var index = positiveResting.distance < negativeResting.distance ? positiveResting.index : negativeResting.index;
    return index;
  };
  /**
   * given resting X and distance to selected cell
   * get the distance and index of the closest cell
   * @param {Number} restingX - estimated post-flick resting position
   * @param {Number} distance - distance to selected cell
   * @param {Integer} increment - +1 or -1, going up or down
   * @returns {Object} - { distance: {Number}, index: {Integer} }
   */


  proto._getClosestResting = function (restingX, distance, increment) {
    var index = this.selectedIndex;
    var minDistance = Infinity;
    var condition = this.options.contain && !this.options.wrapAround ? // if contain, keep going if distance is equal to minDistance
    function (d, md) {
      return d <= md;
    } : function (d, md) {
      return d < md;
    };

    while (condition(distance, minDistance)) {
      // measure distance to next cell
      index += increment;
      minDistance = distance;
      distance = this.getSlideDistance(-restingX, index);

      if (distance === null) {
        break;
      }

      distance = Math.abs(distance);
    }

    return {
      distance: minDistance,
      // selected was previous index
      index: index - increment
    };
  };
  /**
   * measure distance between x and a slide target
   * @param {Number} x
   * @param {Integer} index - slide index
   */


  proto.getSlideDistance = function (x, index) {
    var len = this.slides.length; // wrap around if at least 2 slides

    var isWrapAround = this.options.wrapAround && len > 1;
    var slideIndex = isWrapAround ? utils.modulo(index, len) : index;
    var slide = this.slides[slideIndex];

    if (!slide) {
      return null;
    } // add distance for wrap-around slides


    var wrap = isWrapAround ? this.slideableWidth * Math.floor(index / len) : 0;
    return x - (slide.target + wrap);
  };

  proto.dragEndBoostSelect = function () {
    // do not boost if no previousDragX or dragMoveTime
    if (this.previousDragX === undefined || !this.dragMoveTime || // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100) {
      return 0;
    }

    var distance = this.getSlideDistance(-this.dragX, this.selectedIndex);
    var delta = this.previousDragX - this.dragX;

    if (distance > 0 && delta > 0) {
      // boost to next if moving towards the right, and positive velocity
      return 1;
    } else if (distance < 0 && delta < 0) {
      // boost to previous if moving towards the left, and negative velocity
      return -1;
    }

    return 0;
  }; // ----- staticClick ----- //


  proto.staticClick = function (event, pointer) {
    // get clickedCell, if cell was clicked
    var clickedCell = this.getParentCell(event.target);
    var cellElem = clickedCell && clickedCell.element;
    var cellIndex = clickedCell && this.cells.indexOf(clickedCell);
    this.dispatchEvent('staticClick', event, [pointer, cellElem, cellIndex]);
  }; // ----- scroll ----- //


  proto.onscroll = function () {
    var scroll = getScrollPosition();
    var scrollMoveX = this.pointerDownScroll.x - scroll.x;
    var scrollMoveY = this.pointerDownScroll.y - scroll.y; // cancel click/tap if scroll is too much

    if (Math.abs(scrollMoveX) > 3 || Math.abs(scrollMoveY) > 3) {
      this._pointerDone();
    }
  }; // ----- utils ----- //


  function getScrollPosition() {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  } // -----  ----- //


  return Flickity;
});
/*!
 * Tap listener v2.0.0
 * listens to taps
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */


(function (window, factory) {
  // universal module definition

  /*jshint strict: false*/

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('tap-listener/tap-listener', ['unipointer/unipointer'], function (Unipointer) {
      return factory(window, Unipointer);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('unipointer'));
  } else {
    // browser global
    window.TapListener = factory(window, window.Unipointer);
  }
})(window, function factory(window, Unipointer) {
  // --------------------------  TapListener -------------------------- //
  function TapListener(elem) {
    this.bindTap(elem);
  } // inherit Unipointer & EventEmitter


  var proto = TapListener.prototype = Object.create(Unipointer.prototype);
  /**
   * bind tap event to element
   * @param {Element} elem
   */

  proto.bindTap = function (elem) {
    if (!elem) {
      return;
    }

    this.unbindTap();
    this.tapElement = elem;

    this._bindStartEvent(elem, true);
  };

  proto.unbindTap = function () {
    if (!this.tapElement) {
      return;
    }

    this._bindStartEvent(this.tapElement, true);

    delete this.tapElement;
  };
  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   */


  proto.pointerUp = function (event, pointer) {
    // ignore emulated mouse up clicks
    if (this.isIgnoringMouseUp && event.type == 'mouseup') {
      return;
    }

    var pointerPoint = Unipointer.getPointerPoint(pointer);
    var boundingRect = this.tapElement.getBoundingClientRect();
    var scrollX = window.pageXOffset;
    var scrollY = window.pageYOffset; // calculate if pointer is inside tapElement

    var isInside = pointerPoint.x >= boundingRect.left + scrollX && pointerPoint.x <= boundingRect.right + scrollX && pointerPoint.y >= boundingRect.top + scrollY && pointerPoint.y <= boundingRect.bottom + scrollY; // trigger callback if pointer is inside element

    if (isInside) {
      this.emitEvent('tap', [event, pointer]);
    } // set flag for emulated clicks 300ms after touchend


    if (event.type != 'mouseup') {
      this.isIgnoringMouseUp = true; // reset flag after 300ms

      var _this = this;

      setTimeout(function () {
        delete _this.isIgnoringMouseUp;
      }, 400);
    }
  };

  proto.destroy = function () {
    this.pointerDone();
    this.unbindTap();
  }; // -----  ----- //


  return TapListener;
}); // prev/next buttons


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/prev-next-button', ['./flickity', 'tap-listener/tap-listener', 'fizzy-ui-utils/utils'], function (Flickity, TapListener, utils) {
      return factory(window, Flickity, TapListener, utils);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('./flickity'), require('tap-listener'), require('fizzy-ui-utils'));
  } else {
    // browser global
    factory(window, window.Flickity, window.TapListener, window.fizzyUIUtils);
  }
})(window, function factory(window, Flickity, TapListener, utils) {
  'use strict';

  var svgURI = 'http://www.w3.org/2000/svg'; // -------------------------- PrevNextButton -------------------------- //

  function PrevNextButton(direction, parent) {
    this.direction = direction;
    this.parent = parent;

    this._create();
  }

  PrevNextButton.prototype = Object.create(TapListener.prototype);

  PrevNextButton.prototype._create = function () {
    // properties
    this.isEnabled = true;
    this.isPrevious = this.direction == -1;
    var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
    this.isLeft = this.direction == leftDirection;
    var element = this.element = document.createElement('button');
    element.className = 'flickity-button flickity-prev-next-button';
    element.className += this.isPrevious ? ' previous' : ' next'; // prevent button from submitting form http://stackoverflow.com/a/10836076/182183

    element.setAttribute('type', 'button'); // init as disabled

    this.disable();
    element.setAttribute('aria-label', this.isPrevious ? 'Previous' : 'Next'); // create arrow

    var svg = this.createSVG();
    element.appendChild(svg); // events

    this.on('tap', this.onTap);
    this.parent.on('select', this.update.bind(this));
    this.on('pointerDown', this.parent.childUIPointerDown.bind(this.parent));
  };

  PrevNextButton.prototype.activate = function () {
    this.bindTap(this.element); // click events from keyboard

    this.element.addEventListener('click', this); // add to DOM

    this.parent.element.appendChild(this.element);
  };

  PrevNextButton.prototype.deactivate = function () {
    // remove from DOM
    this.parent.element.removeChild(this.element); // do regular TapListener destroy

    TapListener.prototype.destroy.call(this); // click events from keyboard

    this.element.removeEventListener('click', this);
  };

  PrevNextButton.prototype.createSVG = function () {
    var svg = document.createElementNS(svgURI, 'svg');
    svg.setAttribute('class', 'flickity-button-icon');
    svg.setAttribute('viewBox', '0 0 100 100');
    var path = document.createElementNS(svgURI, 'path');
    var pathMovements = getArrowMovements(this.parent.options.arrowShape);
    path.setAttribute('d', pathMovements);
    path.setAttribute('class', 'arrow'); // rotate arrow

    if (!this.isLeft) {
      path.setAttribute('transform', 'translate(100, 100) rotate(180) ');
    }

    svg.appendChild(path);
    return svg;
  }; // get SVG path movmement


  function getArrowMovements(shape) {
    // use shape as movement if string
    if (typeof shape == 'string') {
      return shape;
    } // create movement string


    return 'M ' + shape.x0 + ',50' + ' L ' + shape.x1 + ',' + (shape.y1 + 50) + ' L ' + shape.x2 + ',' + (shape.y2 + 50) + ' L ' + shape.x3 + ',50 ' + ' L ' + shape.x2 + ',' + (50 - shape.y2) + ' L ' + shape.x1 + ',' + (50 - shape.y1) + ' Z';
  }

  PrevNextButton.prototype.onTap = function () {
    if (!this.isEnabled) {
      return;
    }

    this.parent.uiChange();
    var method = this.isPrevious ? 'previous' : 'next';
    this.parent[method]();
  };

  PrevNextButton.prototype.handleEvent = utils.handleEvent;

  PrevNextButton.prototype.onclick = function (event) {
    // only allow clicks from keyboard
    var focused = document.activeElement;

    if (focused && focused == this.element) {
      this.onTap(event, event);
    }
  }; // -----  ----- //


  PrevNextButton.prototype.enable = function () {
    if (this.isEnabled) {
      return;
    }

    this.element.disabled = false;
    this.isEnabled = true;
  };

  PrevNextButton.prototype.disable = function () {
    if (!this.isEnabled) {
      return;
    }

    this.element.disabled = true;
    this.isEnabled = false;
  };

  PrevNextButton.prototype.update = function () {
    // index of first or last slide, if previous or next
    var slides = this.parent.slides; // enable is wrapAround and at least 2 slides

    if (this.parent.options.wrapAround && slides.length > 1) {
      this.enable();
      return;
    }

    var lastIndex = slides.length ? slides.length - 1 : 0;
    var boundIndex = this.isPrevious ? 0 : lastIndex;
    var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
    this[method]();
  };

  PrevNextButton.prototype.destroy = function () {
    this.deactivate();
  }; // -------------------------- Flickity prototype -------------------------- //


  utils.extend(Flickity.defaults, {
    prevNextButtons: true,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 70,
      y2: 40,
      x3: 30
    }
  });
  Flickity.createMethods.push('_createPrevNextButtons');
  var proto = Flickity.prototype;

  proto._createPrevNextButtons = function () {
    if (!this.options.prevNextButtons) {
      return;
    }

    this.prevButton = new PrevNextButton(-1, this);
    this.nextButton = new PrevNextButton(1, this);
    this.on('activate', this.activatePrevNextButtons);
  };

  proto.activatePrevNextButtons = function () {
    this.prevButton.activate();
    this.nextButton.activate();
    this.on('deactivate', this.deactivatePrevNextButtons);
  };

  proto.deactivatePrevNextButtons = function () {
    this.prevButton.deactivate();
    this.nextButton.deactivate();
    this.off('deactivate', this.deactivatePrevNextButtons);
  }; // --------------------------  -------------------------- //


  Flickity.PrevNextButton = PrevNextButton;
  return Flickity;
}); // page dots


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/page-dots', ['./flickity', 'tap-listener/tap-listener', 'fizzy-ui-utils/utils'], function (Flickity, TapListener, utils) {
      return factory(window, Flickity, TapListener, utils);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('./flickity'), require('tap-listener'), require('fizzy-ui-utils'));
  } else {
    // browser global
    factory(window, window.Flickity, window.TapListener, window.fizzyUIUtils);
  }
})(window, function factory(window, Flickity, TapListener, utils) {
  // -------------------------- PageDots -------------------------- //
  function PageDots(parent) {
    this.parent = parent;

    this._create();
  }

  PageDots.prototype = new TapListener();

  PageDots.prototype._create = function () {
    // create holder element
    this.holder = document.createElement('ol');
    this.holder.className = 'flickity-page-dots'; // create dots, array of elements

    this.dots = []; // events

    this.on('tap', this.onTap);
    this.on('pointerDown', this.parent.childUIPointerDown.bind(this.parent));
  };

  PageDots.prototype.activate = function () {
    this.setDots();
    this.bindTap(this.holder); // add to DOM

    this.parent.element.appendChild(this.holder);
  };

  PageDots.prototype.deactivate = function () {
    // remove from DOM
    this.parent.element.removeChild(this.holder);
    TapListener.prototype.destroy.call(this);
  };

  PageDots.prototype.setDots = function () {
    // get difference between number of slides and number of dots
    var delta = this.parent.slides.length - this.dots.length;

    if (delta > 0) {
      this.addDots(delta);
    } else if (delta < 0) {
      this.removeDots(-delta);
    }
  };

  PageDots.prototype.addDots = function (count) {
    var fragment = document.createDocumentFragment();
    var newDots = [];
    var length = this.dots.length;
    var max = length + count;

    for (var i = length; i < max; i++) {
      var dot = document.createElement('li');
      dot.className = 'dot';
      dot.setAttribute('aria-label', 'Page dot ' + (i + 1));
      fragment.appendChild(dot);
      newDots.push(dot);
    }

    this.holder.appendChild(fragment);
    this.dots = this.dots.concat(newDots);
  };

  PageDots.prototype.removeDots = function (count) {
    // remove from this.dots collection
    var removeDots = this.dots.splice(this.dots.length - count, count); // remove from DOM

    removeDots.forEach(function (dot) {
      this.holder.removeChild(dot);
    }, this);
  };

  PageDots.prototype.updateSelected = function () {
    // remove selected class on previous
    if (this.selectedDot) {
      this.selectedDot.className = 'dot';
      this.selectedDot.removeAttribute('aria-current');
    } // don't proceed if no dots


    if (!this.dots.length) {
      return;
    }

    this.selectedDot = this.dots[this.parent.selectedIndex];
    this.selectedDot.className = 'dot is-selected';
    this.selectedDot.setAttribute('aria-current', 'step');
  };

  PageDots.prototype.onTap = function (event) {
    var target = event.target; // only care about dot clicks

    if (target.nodeName != 'LI') {
      return;
    }

    this.parent.uiChange();
    var index = this.dots.indexOf(target);
    this.parent.select(index);
  };

  PageDots.prototype.destroy = function () {
    this.deactivate();
  };

  Flickity.PageDots = PageDots; // -------------------------- Flickity -------------------------- //

  utils.extend(Flickity.defaults, {
    pageDots: true
  });
  Flickity.createMethods.push('_createPageDots');
  var proto = Flickity.prototype;

  proto._createPageDots = function () {
    if (!this.options.pageDots) {
      return;
    }

    this.pageDots = new PageDots(this); // events

    this.on('activate', this.activatePageDots);
    this.on('select', this.updateSelectedPageDots);
    this.on('cellChange', this.updatePageDots);
    this.on('resize', this.updatePageDots);
    this.on('deactivate', this.deactivatePageDots);
  };

  proto.activatePageDots = function () {
    this.pageDots.activate();
  };

  proto.updateSelectedPageDots = function () {
    this.pageDots.updateSelected();
  };

  proto.updatePageDots = function () {
    this.pageDots.setDots();
  };

  proto.deactivatePageDots = function () {
    this.pageDots.deactivate();
  }; // -----  ----- //


  Flickity.PageDots = PageDots;
  return Flickity;
}); // player & autoPlay


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/player', ['ev-emitter/ev-emitter', 'fizzy-ui-utils/utils', './flickity'], function (EvEmitter, utils, Flickity) {
      return factory(EvEmitter, utils, Flickity);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('ev-emitter'), require('fizzy-ui-utils'), require('./flickity'));
  } else {
    // browser global
    factory(window.EvEmitter, window.fizzyUIUtils, window.Flickity);
  }
})(window, function factory(EvEmitter, utils, Flickity) {
  // -------------------------- Player -------------------------- //
  function Player(parent) {
    this.parent = parent;
    this.state = 'stopped'; // visibility change event handler

    this.onVisibilityChange = this.visibilityChange.bind(this);
    this.onVisibilityPlay = this.visibilityPlay.bind(this);
  }

  Player.prototype = Object.create(EvEmitter.prototype); // start play

  Player.prototype.play = function () {
    if (this.state == 'playing') {
      return;
    } // do not play if page is hidden, start playing when page is visible


    var isPageHidden = document.hidden;

    if (isPageHidden) {
      document.addEventListener('visibilitychange', this.onVisibilityPlay);
      return;
    }

    this.state = 'playing'; // listen to visibility change

    document.addEventListener('visibilitychange', this.onVisibilityChange); // start ticking

    this.tick();
  };

  Player.prototype.tick = function () {
    // do not tick if not playing
    if (this.state != 'playing') {
      return;
    }

    var time = this.parent.options.autoPlay; // default to 3 seconds

    time = typeof time == 'number' ? time : 3000;

    var _this = this; // HACK: reset ticks if stopped and started within interval


    this.clear();
    this.timeout = setTimeout(function () {
      _this.parent.next(true);

      _this.tick();
    }, time);
  };

  Player.prototype.stop = function () {
    this.state = 'stopped';
    this.clear(); // remove visibility change event

    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  };

  Player.prototype.clear = function () {
    clearTimeout(this.timeout);
  };

  Player.prototype.pause = function () {
    if (this.state == 'playing') {
      this.state = 'paused';
      this.clear();
    }
  };

  Player.prototype.unpause = function () {
    // re-start play if paused
    if (this.state == 'paused') {
      this.play();
    }
  }; // pause if page visibility is hidden, unpause if visible


  Player.prototype.visibilityChange = function () {
    var isPageHidden = document.hidden;
    this[isPageHidden ? 'pause' : 'unpause']();
  };

  Player.prototype.visibilityPlay = function () {
    this.play();
    document.removeEventListener('visibilitychange', this.onVisibilityPlay);
  }; // -------------------------- Flickity -------------------------- //


  utils.extend(Flickity.defaults, {
    pauseAutoPlayOnHover: true
  });
  Flickity.createMethods.push('_createPlayer');
  var proto = Flickity.prototype;

  proto._createPlayer = function () {
    this.player = new Player(this);
    this.on('activate', this.activatePlayer);
    this.on('uiChange', this.stopPlayer);
    this.on('pointerDown', this.stopPlayer);
    this.on('deactivate', this.deactivatePlayer);
  };

  proto.activatePlayer = function () {
    if (!this.options.autoPlay) {
      return;
    }

    this.player.play();
    this.element.addEventListener('mouseenter', this);
  }; // Player API, don't hate the ... thanks I know where the door is


  proto.playPlayer = function () {
    this.player.play();
  };

  proto.stopPlayer = function () {
    this.player.stop();
  };

  proto.pausePlayer = function () {
    this.player.pause();
  };

  proto.unpausePlayer = function () {
    this.player.unpause();
  };

  proto.deactivatePlayer = function () {
    this.player.stop();
    this.element.removeEventListener('mouseenter', this);
  }; // ----- mouseenter/leave ----- //
  // pause auto-play on hover


  proto.onmouseenter = function () {
    if (!this.options.pauseAutoPlayOnHover) {
      return;
    }

    this.player.pause();
    this.element.addEventListener('mouseleave', this);
  }; // resume auto-play on hover off


  proto.onmouseleave = function () {
    this.player.unpause();
    this.element.removeEventListener('mouseleave', this);
  }; // -----  ----- //


  Flickity.Player = Player;
  return Flickity;
}); // add, remove cell


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/add-remove-cell', ['./flickity', 'fizzy-ui-utils/utils'], function (Flickity, utils) {
      return factory(window, Flickity, utils);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('./flickity'), require('fizzy-ui-utils'));
  } else {
    // browser global
    factory(window, window.Flickity, window.fizzyUIUtils);
  }
})(window, function factory(window, Flickity, utils) {
  // append cells to a document fragment
  function getCellsFragment(cells) {
    var fragment = document.createDocumentFragment();
    cells.forEach(function (cell) {
      fragment.appendChild(cell.element);
    });
    return fragment;
  } // -------------------------- add/remove cell prototype -------------------------- //


  var proto = Flickity.prototype;
  /**
   * Insert, prepend, or append cells
   * @param {Element, Array, NodeList} elems
   * @param {Integer} index
   */

  proto.insert = function (elems, index) {
    var cells = this._makeCells(elems);

    if (!cells || !cells.length) {
      return;
    }

    var len = this.cells.length; // default to append

    index = index === undefined ? len : index; // add cells with document fragment

    var fragment = getCellsFragment(cells); // append to slider

    var isAppend = index == len;

    if (isAppend) {
      this.slider.appendChild(fragment);
    } else {
      var insertCellElement = this.cells[index].element;
      this.slider.insertBefore(fragment, insertCellElement);
    } // add to this.cells


    if (index === 0) {
      // prepend, add to start
      this.cells = cells.concat(this.cells);
    } else if (isAppend) {
      // append, add to end
      this.cells = this.cells.concat(cells);
    } else {
      // insert in this.cells
      var endCells = this.cells.splice(index, len - index);
      this.cells = this.cells.concat(cells).concat(endCells);
    }

    this._sizeCells(cells);

    this.cellChange(index, true);
  };

  proto.append = function (elems) {
    this.insert(elems, this.cells.length);
  };

  proto.prepend = function (elems) {
    this.insert(elems, 0);
  };
  /**
   * Remove cells
   * @param {Element, Array, NodeList} elems
   */


  proto.remove = function (elems) {
    var cells = this.getCells(elems);

    if (!cells || !cells.length) {
      return;
    }

    var minCellIndex = this.cells.length - 1; // remove cells from collection & DOM

    cells.forEach(function (cell) {
      cell.remove();
      var index = this.cells.indexOf(cell);
      minCellIndex = Math.min(index, minCellIndex);
      utils.removeFrom(this.cells, cell);
    }, this);
    this.cellChange(minCellIndex, true);
  };
  /**
   * logic to be run after a cell's size changes
   * @param {Element} elem - cell's element
   */


  proto.cellSizeChange = function (elem) {
    var cell = this.getCell(elem);

    if (!cell) {
      return;
    }

    cell.getSize();
    var index = this.cells.indexOf(cell);
    this.cellChange(index);
  };
  /**
   * logic any time a cell is changed: added, removed, or size changed
   * @param {Integer} changedCellIndex - index of the changed cell, optional
   */


  proto.cellChange = function (changedCellIndex, isPositioningSlider) {
    var prevSelectedElem = this.selectedElement;

    this._positionCells(changedCellIndex);

    this._getWrapShiftCells();

    this.setGallerySize(); // update selectedIndex
    // try to maintain position & select previous selected element

    var cell = this.getCell(prevSelectedElem);

    if (cell) {
      this.selectedIndex = this.getCellSlideIndex(cell);
    }

    this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex);
    this.emitEvent('cellChange', [changedCellIndex]); // position slider

    this.select(this.selectedIndex); // do not position slider after lazy load

    if (isPositioningSlider) {
      this.positionSliderAtSelected();
    }
  }; // -----  ----- //


  return Flickity;
}); // lazyload


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/lazyload', ['./flickity', 'fizzy-ui-utils/utils'], function (Flickity, utils) {
      return factory(window, Flickity, utils);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('./flickity'), require('fizzy-ui-utils'));
  } else {
    // browser global
    factory(window, window.Flickity, window.fizzyUIUtils);
  }
})(window, function factory(window, Flickity, utils) {
  'use strict';

  Flickity.createMethods.push('_createLazyload');
  var proto = Flickity.prototype;

  proto._createLazyload = function () {
    this.on('select', this.lazyLoad);
  };

  proto.lazyLoad = function () {
    var lazyLoad = this.options.lazyLoad;

    if (!lazyLoad) {
      return;
    } // get adjacent cells, use lazyLoad option for adjacent count


    var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
    var cellElems = this.getAdjacentCellElements(adjCount); // get lazy images in those cells

    var lazyImages = [];
    cellElems.forEach(function (cellElem) {
      var lazyCellImages = getCellLazyImages(cellElem);
      lazyImages = lazyImages.concat(lazyCellImages);
    }); // load lazy images

    lazyImages.forEach(function (img) {
      new LazyLoader(img, this);
    }, this);
  };

  function getCellLazyImages(cellElem) {
    // check if cell element is lazy image
    if (cellElem.nodeName == 'IMG') {
      var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
      var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
      var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');

      if (lazyloadAttr || srcAttr || srcsetAttr) {
        return [cellElem];
      }
    } // select lazy images in cell


    var lazySelector = 'img[data-flickity-lazyload], ' + 'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
    var imgs = cellElem.querySelectorAll(lazySelector);
    return utils.makeArray(imgs);
  } // -------------------------- LazyLoader -------------------------- //

  /**
   * class to handle loading images
   */


  function LazyLoader(img, flickity) {
    this.img = img;
    this.flickity = flickity;
    this.load();
  }

  LazyLoader.prototype.handleEvent = utils.handleEvent;

  LazyLoader.prototype.load = function () {
    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this); // get src & srcset

    var src = this.img.getAttribute('data-flickity-lazyload') || this.img.getAttribute('data-flickity-lazyload-src');
    var srcset = this.img.getAttribute('data-flickity-lazyload-srcset'); // set src & serset

    this.img.src = src;

    if (srcset) {
      this.img.setAttribute('srcset', srcset);
    } // remove attr


    this.img.removeAttribute('data-flickity-lazyload');
    this.img.removeAttribute('data-flickity-lazyload-src');
    this.img.removeAttribute('data-flickity-lazyload-srcset');
  };

  LazyLoader.prototype.onload = function (event) {
    this.complete(event, 'flickity-lazyloaded');
  };

  LazyLoader.prototype.onerror = function (event) {
    this.complete(event, 'flickity-lazyerror');
  };

  LazyLoader.prototype.complete = function (event, className) {
    // unbind events
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
    var cell = this.flickity.getParentCell(this.img);
    var cellElem = cell && cell.element;
    this.flickity.cellSizeChange(cellElem);
    this.img.classList.add(className);
    this.flickity.dispatchEvent('lazyLoad', event, cellElem);
  }; // -----  ----- //


  Flickity.LazyLoader = LazyLoader;
  return Flickity;
});
/*!
 * Flickity v2.1.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity/js/index', ['./flickity', './drag', './prev-next-button', './page-dots', './player', './add-remove-cell', './lazyload'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('./flickity'), require('./drag'), require('./prev-next-button'), require('./page-dots'), require('./player'), require('./add-remove-cell'), require('./lazyload'));
  }
})(window, function factory(Flickity) {
  /*jshint strict: false*/
  return Flickity;
});
/*!
 * Flickity asNavFor v2.0.1
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/


(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('flickity-as-nav-for/as-nav-for', ['flickity/js/index', 'fizzy-ui-utils/utils'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('flickity'), require('fizzy-ui-utils'));
  } else {
    // browser global
    window.Flickity = factory(window.Flickity, window.fizzyUIUtils);
  }
})(window, function factory(Flickity, utils) {
  // -------------------------- asNavFor prototype -------------------------- //
  // Flickity.defaults.asNavFor = null;
  Flickity.createMethods.push('_createAsNavFor');
  var proto = Flickity.prototype;

  proto._createAsNavFor = function () {
    this.on('activate', this.activateAsNavFor);
    this.on('deactivate', this.deactivateAsNavFor);
    this.on('destroy', this.destroyAsNavFor);
    var asNavForOption = this.options.asNavFor;

    if (!asNavForOption) {
      return;
    } // HACK do async, give time for other flickity to be initalized


    var _this = this;

    setTimeout(function initNavCompanion() {
      _this.setNavCompanion(asNavForOption);
    });
  };

  proto.setNavCompanion = function (elem) {
    elem = utils.getQueryElement(elem);
    var companion = Flickity.data(elem); // stop if no companion or companion is self

    if (!companion || companion == this) {
      return;
    }

    this.navCompanion = companion; // companion select

    var _this = this;

    this.onNavCompanionSelect = function () {
      _this.navCompanionSelect();
    };

    companion.on('select', this.onNavCompanionSelect); // click

    this.on('staticClick', this.onNavStaticClick);
    this.navCompanionSelect(true);
  };

  proto.navCompanionSelect = function (isInstant) {
    if (!this.navCompanion) {
      return;
    } // select slide that matches first cell of slide


    var selectedCell = this.navCompanion.selectedCells[0];
    var firstIndex = this.navCompanion.cells.indexOf(selectedCell);
    var lastIndex = firstIndex + this.navCompanion.selectedCells.length - 1;
    var selectIndex = Math.floor(lerp(firstIndex, lastIndex, this.navCompanion.cellAlign));
    this.selectCell(selectIndex, false, isInstant); // set nav selected class

    this.removeNavSelectedElements(); // stop if companion has more cells than this one

    if (selectIndex >= this.cells.length) {
      return;
    }

    var selectedCells = this.cells.slice(firstIndex, lastIndex + 1);
    this.navSelectedElements = selectedCells.map(function (cell) {
      return cell.element;
    });
    this.changeNavSelectedClass('add');
  };

  function lerp(a, b, t) {
    return (b - a) * t + a;
  }

  proto.changeNavSelectedClass = function (method) {
    this.navSelectedElements.forEach(function (navElem) {
      navElem.classList[method]('is-nav-selected');
    });
  };

  proto.activateAsNavFor = function () {
    this.navCompanionSelect(true);
  };

  proto.removeNavSelectedElements = function () {
    if (!this.navSelectedElements) {
      return;
    }

    this.changeNavSelectedClass('remove');
    delete this.navSelectedElements;
  };

  proto.onNavStaticClick = function (event, pointer, cellElement, cellIndex) {
    if (typeof cellIndex == 'number') {
      this.navCompanion.selectCell(cellIndex);
    }
  };

  proto.deactivateAsNavFor = function () {
    this.removeNavSelectedElements();
  };

  proto.destroyAsNavFor = function () {
    if (!this.navCompanion) {
      return;
    }

    this.navCompanion.off('select', this.onNavCompanionSelect);
    this.off('staticClick', this.onNavStaticClick);
    delete this.navCompanion;
  }; // -----  ----- //


  return Flickity;
});
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


(function (window, factory) {
  'use strict'; // universal module definition

  /*global define: false, module: false, require: false */

  if (typeof define == 'function' && define.amd) {
    // AMD
    define('imagesloaded/imagesloaded', ['ev-emitter/ev-emitter'], function (EvEmitter) {
      return factory(window, EvEmitter);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('ev-emitter'));
  } else {
    // browser global
    window.imagesLoaded = factory(window, window.EvEmitter);
  }
})(typeof window !== 'undefined' ? window : void 0, // --------------------------  factory -------------------------- //
function factory(window, EvEmitter) {
  var $ = window.jQuery;
  var console = window.console; // -------------------------- helpers -------------------------- //
  // extend objects

  function extend(a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }

    return a;
  }

  var arraySlice = Array.prototype.slice; // turn element or nodeList into an array

  function makeArray(obj) {
    if (Array.isArray(obj)) {
      // use object if already an array
      return obj;
    }

    var isArrayLike = _typeof(obj) == 'object' && typeof obj.length == 'number';

    if (isArrayLike) {
      // convert nodeList to array
      return arraySlice.call(obj);
    } // array of single index


    return [obj];
  } // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */


  function ImagesLoaded(elem, options, onAlways) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if (!(this instanceof ImagesLoaded)) {
      return new ImagesLoaded(elem, options, onAlways);
    } // use elem as selector string


    var queryElem = elem;

    if (typeof elem == 'string') {
      queryElem = document.querySelectorAll(elem);
    } // bail if bad element


    if (!queryElem) {
      console.error('Bad element for imagesLoaded ' + (queryElem || elem));
      return;
    }

    this.elements = makeArray(queryElem);
    this.options = extend({}, this.options); // shift arguments if no options set

    if (typeof options == 'function') {
      onAlways = options;
    } else {
      extend(this.options, options);
    }

    if (onAlways) {
      this.on('always', onAlways);
    }

    this.getImages();

    if ($) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    } // HACK check async to allow time to bind listeners


    setTimeout(this.check.bind(this));
  }

  ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function () {
    this.images = []; // filter & find items if we have an item selector

    this.elements.forEach(this.addElementImages, this);
  };
  /**
   * @param {Node} element
   */


  ImagesLoaded.prototype.addElementImages = function (elem) {
    // filter siblings
    if (elem.nodeName == 'IMG') {
      this.addImage(elem);
    } // get background image on element


    if (this.options.background === true) {
      this.addElementBackgroundImages(elem);
    } // find children
    // no non-element nodes, #143


    var nodeType = elem.nodeType;

    if (!nodeType || !elementNodeTypes[nodeType]) {
      return;
    }

    var childImgs = elem.querySelectorAll('img'); // concat childElems to filterFound array

    for (var i = 0; i < childImgs.length; i++) {
      var img = childImgs[i];
      this.addImage(img);
    } // get child background images


    if (typeof this.options.background == 'string') {
      var children = elem.querySelectorAll(this.options.background);

      for (i = 0; i < children.length; i++) {
        var child = children[i];
        this.addElementBackgroundImages(child);
      }
    }
  };

  var elementNodeTypes = {
    1: true,
    9: true,
    11: true
  };

  ImagesLoaded.prototype.addElementBackgroundImages = function (elem) {
    var style = getComputedStyle(elem);

    if (!style) {
      // Firefox returns null if in a hidden iframe https://bugzil.la/548397
      return;
    } // get url inside url("...")


    var reURL = /url\((['"])?(.*?)\1\)/gi;
    var matches = reURL.exec(style.backgroundImage);

    while (matches !== null) {
      var url = matches && matches[2];

      if (url) {
        this.addBackground(url, elem);
      }

      matches = reURL.exec(style.backgroundImage);
    }
  };
  /**
   * @param {Image} img
   */


  ImagesLoaded.prototype.addImage = function (img) {
    var loadingImage = new LoadingImage(img);
    this.images.push(loadingImage);
  };

  ImagesLoaded.prototype.addBackground = function (url, elem) {
    var background = new Background(url, elem);
    this.images.push(background);
  };

  ImagesLoaded.prototype.check = function () {
    var _this = this;

    this.progressedCount = 0;
    this.hasAnyBroken = false; // complete if no images

    if (!this.images.length) {
      this.complete();
      return;
    }

    function onProgress(image, elem, message) {
      // HACK - Chrome triggers event before object properties have changed. #83
      setTimeout(function () {
        _this.progress(image, elem, message);
      });
    }

    this.images.forEach(function (loadingImage) {
      loadingImage.once('progress', onProgress);
      loadingImage.check();
    });
  };

  ImagesLoaded.prototype.progress = function (image, elem, message) {
    this.progressedCount++;
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded; // progress event

    this.emitEvent('progress', [this, image, elem]);

    if (this.jqDeferred && this.jqDeferred.notify) {
      this.jqDeferred.notify(this, image);
    } // check if completed


    if (this.progressedCount == this.images.length) {
      this.complete();
    }

    if (this.options.debug && console) {
      console.log('progress: ' + message, image, elem);
    }
  };

  ImagesLoaded.prototype.complete = function () {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emitEvent(eventName, [this]);
    this.emitEvent('always', [this]);

    if (this.jqDeferred) {
      var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[jqMethod](this);
    }
  }; // --------------------------  -------------------------- //


  function LoadingImage(img) {
    this.img = img;
  }

  LoadingImage.prototype = Object.create(EvEmitter.prototype);

  LoadingImage.prototype.check = function () {
    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    var isComplete = this.getIsImageComplete();

    if (isComplete) {
      // report based on naturalWidth
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      return;
    } // If none of the checks above matched, simulate loading on detached element.


    this.proxyImage = new Image();
    this.proxyImage.addEventListener('load', this);
    this.proxyImage.addEventListener('error', this); // bind to image as well for Firefox. #191

    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.proxyImage.src = this.img.src;
  };

  LoadingImage.prototype.getIsImageComplete = function () {
    // check for non-zero, non-undefined naturalWidth
    // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
    return this.img.complete && this.img.naturalWidth;
  };

  LoadingImage.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    this.emitEvent('progress', [this, this.img, message]);
  }; // ----- events ----- //
  // trigger specified handler for event type


  LoadingImage.prototype.handleEvent = function (event) {
    var method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  };

  LoadingImage.prototype.onload = function () {
    this.confirm(true, 'onload');
    this.unbindEvents();
  };

  LoadingImage.prototype.onerror = function () {
    this.confirm(false, 'onerror');
    this.unbindEvents();
  };

  LoadingImage.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener('load', this);
    this.proxyImage.removeEventListener('error', this);
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  }; // -------------------------- Background -------------------------- //


  function Background(url, element) {
    this.url = url;
    this.element = element;
    this.img = new Image();
  } // inherit LoadingImage prototype


  Background.prototype = Object.create(LoadingImage.prototype);

  Background.prototype.check = function () {
    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.img.src = this.url; // check if image is already complete

    var isComplete = this.getIsImageComplete();

    if (isComplete) {
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      this.unbindEvents();
    }
  };

  Background.prototype.unbindEvents = function () {
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  };

  Background.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    this.emitEvent('progress', [this, this.element, message]);
  }; // -------------------------- jQuery -------------------------- //


  ImagesLoaded.makeJQueryPlugin = function (jQuery) {
    jQuery = jQuery || window.jQuery;

    if (!jQuery) {
      return;
    } // set local variable


    $ = jQuery; // $().imagesLoaded()

    $.fn.imagesLoaded = function (options, callback) {
      var instance = new ImagesLoaded(this, options, callback);
      return instance.jqDeferred.promise($(this));
    };
  }; // try making plugin


  ImagesLoaded.makeJQueryPlugin(); // --------------------------  -------------------------- //

  return ImagesLoaded;
});
/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */


(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['flickity/js/index', 'imagesloaded/imagesloaded'], function (Flickity, imagesLoaded) {
      return factory(window, Flickity, imagesLoaded);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('flickity'), require('imagesloaded'));
  } else {
    // browser global
    window.Flickity = factory(window, window.Flickity, window.imagesLoaded);
  }
})(window, function factory(window, Flickity, imagesLoaded) {
  'use strict';

  Flickity.createMethods.push('_createImagesLoaded');
  var proto = Flickity.prototype;

  proto._createImagesLoaded = function () {
    this.on('activate', this.imagesLoaded);
  };

  proto.imagesLoaded = function () {
    if (!this.options.imagesLoaded) {
      return;
    }

    var _this = this;

    function onImagesLoadedProgress(instance, image) {
      var cell = _this.getParentCell(image.img);

      _this.cellSizeChange(cell && cell.element);

      if (!_this.options.freeScroll) {
        _this.positionSliderAtSelected();
      }
    }

    imagesLoaded(this.slider).on('progress', onImagesLoadedProgress);
  };

  return Flickity;
});
"use strict";

/*!
* hoverIntent v1.9.0 // 2017.09.01 // jQuery v1.7.0+
* http://briancherne.github.io/jquery-hoverIntent/
*
* You may use hoverIntent under the terms of the MIT license. Basically that
* means you are free to use hoverIntent as long as this header is left intact.
* Copyright 2007-2017 Brian Cherne
*/
!function (factory) {
  "use strict";

  "function" == typeof define && define.amd ? define(["jquery"], factory) : jQuery && !jQuery.fn.hoverIntent && factory(jQuery);
}(function ($) {
  "use strict";

  var cX,
      cY,
      _cfg = {
    interval: 100,
    sensitivity: 6,
    timeout: 0
  },
      INSTANCE_COUNT = 0,
      track = function track(ev) {
    cX = ev.pageX, cY = ev.pageY;
  },
      compare = function compare(ev, $el, s, cfg) {
    if (Math.sqrt((s.pX - cX) * (s.pX - cX) + (s.pY - cY) * (s.pY - cY)) < cfg.sensitivity) return $el.off(s.event, track), delete s.timeoutId, s.isActive = !0, ev.pageX = cX, ev.pageY = cY, delete s.pX, delete s.pY, cfg.over.apply($el[0], [ev]);
    s.pX = cX, s.pY = cY, s.timeoutId = setTimeout(function () {
      compare(ev, $el, s, cfg);
    }, cfg.interval);
  },
      delay = function delay(ev, $el, s, out) {
    return delete $el.data("hoverIntent")[s.id], out.apply($el[0], [ev]);
  };

  $.fn.hoverIntent = function (handlerIn, handlerOut, selector) {
    var instanceId = INSTANCE_COUNT++,
        cfg = $.extend({}, _cfg);
    $.isPlainObject(handlerIn) ? (cfg = $.extend(cfg, handlerIn), $.isFunction(cfg.out) || (cfg.out = cfg.over)) : cfg = $.isFunction(handlerOut) ? $.extend(cfg, {
      over: handlerIn,
      out: handlerOut,
      selector: selector
    }) : $.extend(cfg, {
      over: handlerIn,
      out: handlerIn,
      selector: handlerOut
    });

    var handleHover = function handleHover(e) {
      var ev = $.extend({}, e),
          $el = $(this),
          hoverIntentData = $el.data("hoverIntent");
      hoverIntentData || $el.data("hoverIntent", hoverIntentData = {});
      var state = hoverIntentData[instanceId];
      state || (hoverIntentData[instanceId] = state = {
        id: instanceId
      }), state.timeoutId && (state.timeoutId = clearTimeout(state.timeoutId));
      var mousemove = state.event = "mousemove.hoverIntent.hoverIntent" + instanceId;

      if ("mouseenter" === e.type) {
        if (state.isActive) return;
        state.pX = ev.pageX, state.pY = ev.pageY, $el.off(mousemove, track).on(mousemove, track), state.timeoutId = setTimeout(function () {
          compare(ev, $el, state, cfg);
        }, cfg.interval);
      } else {
        if (!state.isActive) return;
        $el.off(mousemove, track), state.timeoutId = setTimeout(function () {
          delay(ev, $el, state, cfg.out);
        }, cfg.timeout);
      }
    };

    return this.on({
      "mouseenter.hoverIntent": handleHover,
      "mouseleave.hoverIntent": handleHover
    }, cfg.selector);
  };
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Masonry PACKAGED v4.2.1
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /* globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
      return factory(window, jQuery);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('jquery'));
  } else {
    // browser global
    window.jQueryBridget = factory(window, window.jQuery);
  }
})(window, function factory(window, jQuery) {
  'use strict'; // ----- utils ----- //

  var arraySlice = Array.prototype.slice; // helper function for logging errors
  // $.error breaks jQuery chaining

  var console = window.console;
  var logError = typeof console == 'undefined' ? function () {} : function (message) {
    console.error(message);
  }; // ----- jQueryBridget ----- //

  function jQueryBridget(namespace, PluginClass, $) {
    $ = $ || jQuery || window.jQuery;

    if (!$) {
      return;
    } // add option method -> $().plugin('option', {...})


    if (!PluginClass.prototype.option) {
      // option setter
      PluginClass.prototype.option = function (opts) {
        // bail out if not an object
        if (!$.isPlainObject(opts)) {
          return;
        }

        this.options = $.extend(true, this.options, opts);
      };
    } // make jQuery plugin


    $.fn[namespace] = function (arg0
    /*, arg1 */
    ) {
      if (typeof arg0 == 'string') {
        // method call $().plugin( 'methodName', { options } )
        // shift arguments by 1
        var args = arraySlice.call(arguments, 1);
        return methodCall(this, arg0, args);
      } // just $().plugin({ options })


      plainCall(this, arg0);
      return this;
    }; // $().plugin('methodName')


    function methodCall($elems, methodName, args) {
      var returnValue;
      var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';
      $elems.each(function (i, elem) {
        // get instance
        var instance = $.data(elem, namespace);

        if (!instance) {
          logError(namespace + ' not initialized. Cannot call methods, i.e. ' + pluginMethodStr);
          return;
        }

        var method = instance[methodName];

        if (!method || methodName.charAt(0) == '_') {
          logError(pluginMethodStr + ' is not a valid method');
          return;
        } // apply method, get return value


        var value = method.apply(instance, args); // set return value if value is returned, use only first value

        returnValue = returnValue === undefined ? value : returnValue;
      });
      return returnValue !== undefined ? returnValue : $elems;
    }

    function plainCall($elems, options) {
      $elems.each(function (i, elem) {
        var instance = $.data(elem, namespace);

        if (instance) {
          // set options & init
          instance.option(options);

          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass(elem, options);
          $.data(elem, namespace, instance);
        }
      });
    }

    updateJQuery($);
  } // ----- updateJQuery ----- //
  // set $.bridget for v1 backwards compatibility


  function updateJQuery($) {
    if (!$ || $ && $.bridget) {
      return;
    }

    $.bridget = jQueryBridget;
  }

  updateJQuery(jQuery || window.jQuery); // -----  ----- //

  return jQueryBridget;
});
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */


(function (global, factory) {
  // universal module definition

  /* jshint strict: false */

  /* globals define, module, window */
  if (typeof define == 'function' && define.amd) {
    // AMD - RequireJS
    define('ev-emitter/ev-emitter', factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }
})(typeof window != 'undefined' ? window : void 0, function () {
  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    } // set events hash


    var events = this._events = this._events || {}; // set listeners array

    var listeners = events[eventName] = events[eventName] || []; // only add once

    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    } // add event


    this.on(eventName, listener); // set once flag
    // set onceEvents hash

    var onceEvents = this._onceEvents = this._onceEvents || {}; // set onceListeners object

    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {}; // set flag

    onceListeners[listener] = true;
    return this;
  };

  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];

    if (!listeners || !listeners.length) {
      return;
    }

    var index = listeners.indexOf(listener);

    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];

    if (!listeners || !listeners.length) {
      return;
    } // copy over to avoid interference if .off() in listener


    listeners = listeners.slice(0);
    args = args || []; // once stuff

    var onceListeners = this._onceEvents && this._onceEvents[eventName];

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[listener];

      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener); // unset once flag

        delete onceListeners[listener];
      } // trigger listener


      listener.apply(this, args);
    }

    return this;
  };

  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;
});
/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

/*global define: false, module: false, console: false */


(function (window, factory) {
  'use strict';

  if (typeof define == 'function' && define.amd) {
    // AMD
    define('get-size/get-size', [], function () {
      return factory();
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }
})(window, function factory() {
  'use strict'; // -------------------------- helpers -------------------------- //
  // get a number from a string, not a percentage

  function getStyleSize(value) {
    var num = parseFloat(value); // not a percent like '100%', and a number

    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }

  function noop() {}

  var logError = typeof console == 'undefined' ? noop : function (message) {
    console.error(message);
  }; // -------------------------- measurements -------------------------- //

  var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
  var measurementsLength = measurements.length;

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };

    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }

    return size;
  } // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */


  function getStyle(elem) {
    var style = getComputedStyle(elem);

    if (!style) {
      logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See http://bit.ly/getsizebug1');
    }

    return style;
  } // -------------------------- setup -------------------------- //


  var isSetup = false;
  var isBoxSizeOuter;
  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */

  function setup() {
    // setup once
    if (isSetup) {
      return;
    }

    isSetup = true; // -------------------------- box sizing -------------------------- //

    /**
     * WebKit measures the outer-width on style.width on border-box elems
     * IE & Firefox<29 measures the inner-width
     */

    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';
    var body = document.body || document.documentElement;
    body.appendChild(div);
    var style = getStyle(div);
    getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
    body.removeChild(div);
  } // -------------------------- getSize -------------------------- //


  function getSize(elem) {
    setup(); // use querySeletor if elem is string

    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    } // do not proceed on non-objects


    if (!elem || _typeof(elem) != 'object' || !elem.nodeType) {
      return;
    }

    var style = getStyle(elem); // if hidden, everything is 0

    if (style.display == 'none') {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;
    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box'; // get all measurements

    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[measurement];
      var num = parseFloat(value); // any 'auto', 'medium' value will be 0

      size[measurement] = !isNaN(num) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;
    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter; // overwrite width and height if we can get it from style

    var styleWidth = getStyleSize(style.width);

    if (styleWidth !== false) {
      size.width = styleWidth + ( // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }

    var styleHeight = getStyleSize(style.height);

    if (styleHeight !== false) {
      size.height = styleHeight + ( // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }

    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);
    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;
    return size;
  }

  return getSize;
});
/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */


(function (window, factory) {
  /*global define: false, module: false */
  'use strict'; // universal module definition

  if (typeof define == 'function' && define.amd) {
    // AMD
    define('desandro-matches-selector/matches-selector', factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }
})(window, function factory() {
  'use strict';

  var matchesMethod = function () {
    var ElemProto = window.Element.prototype; // check for the standard method name first

    if (ElemProto.matches) {
      return 'matches';
    } // check un-prefixed


    if (ElemProto.matchesSelector) {
      return 'matchesSelector';
    } // check vendor prefixes


    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';

      if (ElemProto[method]) {
        return method;
      }
    }
  }();

  return function matchesSelector(elem, selector) {
    return elem[matchesMethod](selector);
  };
});
/**
 * Fizzy UI utils v2.0.5
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */


(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('fizzy-ui-utils/utils', ['desandro-matches-selector/matches-selector'], function (matchesSelector) {
      return factory(window, matchesSelector);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(window, require('desandro-matches-selector'));
  } else {
    // browser global
    window.fizzyUIUtils = factory(window, window.matchesSelector);
  }
})(window, function factory(window, matchesSelector) {
  var utils = {}; // ----- extend ----- //
  // extends objects

  utils.extend = function (a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }

    return a;
  }; // ----- modulo ----- //


  utils.modulo = function (num, div) {
    return (num % div + div) % div;
  }; // ----- makeArray ----- //
  // turn element or nodeList into an array


  utils.makeArray = function (obj) {
    var ary = [];

    if (Array.isArray(obj)) {
      // use object if already an array
      ary = obj;
    } else if (obj && _typeof(obj) == 'object' && typeof obj.length == 'number') {
      // convert nodeList to array
      for (var i = 0; i < obj.length; i++) {
        ary.push(obj[i]);
      }
    } else {
      // array of single index
      ary.push(obj);
    }

    return ary;
  }; // ----- removeFrom ----- //


  utils.removeFrom = function (ary, obj) {
    var index = ary.indexOf(obj);

    if (index != -1) {
      ary.splice(index, 1);
    }
  }; // ----- getParent ----- //


  utils.getParent = function (elem, selector) {
    while (elem.parentNode && elem != document.body) {
      elem = elem.parentNode;

      if (matchesSelector(elem, selector)) {
        return elem;
      }
    }
  }; // ----- getQueryElement ----- //
  // use element as selector string


  utils.getQueryElement = function (elem) {
    if (typeof elem == 'string') {
      return document.querySelector(elem);
    }

    return elem;
  }; // ----- handleEvent ----- //
  // enable .ontype to trigger from .addEventListener( elem, 'type' )


  utils.handleEvent = function (event) {
    var method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  }; // ----- filterFindElements ----- //


  utils.filterFindElements = function (elems, selector) {
    // make array of elems
    elems = utils.makeArray(elems);
    var ffElems = [];
    elems.forEach(function (elem) {
      // check that elem is an actual element
      if (!(elem instanceof HTMLElement)) {
        return;
      } // add elem if no selector


      if (!selector) {
        ffElems.push(elem);
        return;
      } // filter & find items if we have a selector
      // filter


      if (matchesSelector(elem, selector)) {
        ffElems.push(elem);
      } // find children


      var childElems = elem.querySelectorAll(selector); // concat childElems to filterFound array

      for (var i = 0; i < childElems.length; i++) {
        ffElems.push(childElems[i]);
      }
    });
    return ffElems;
  }; // ----- debounceMethod ----- //


  utils.debounceMethod = function (_class, methodName, threshold) {
    // original method
    var method = _class.prototype[methodName];
    var timeoutName = methodName + 'Timeout';

    _class.prototype[methodName] = function () {
      var timeout = this[timeoutName];

      if (timeout) {
        clearTimeout(timeout);
      }

      var args = arguments;

      var _this = this;

      this[timeoutName] = setTimeout(function () {
        method.apply(_this, args);
        delete _this[timeoutName];
      }, threshold || 100);
    };
  }; // ----- docReady ----- //


  utils.docReady = function (callback) {
    var readyState = document.readyState;

    if (readyState == 'complete' || readyState == 'interactive') {
      // do async to allow for other scripts to run. metafizzy/flickity#441
      setTimeout(callback);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }; // ----- htmlInit ----- //
  // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/


  utils.toDashed = function (str) {
    return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
      return $1 + '-' + $2;
    }).toLowerCase();
  };

  var console = window.console;
  /**
   * allow user to initialize classes via [data-namespace] or .js-namespace class
   * htmlInit( Widget, 'widgetName' )
   * options are parsed from data-namespace-options
   */

  utils.htmlInit = function (WidgetClass, namespace) {
    utils.docReady(function () {
      var dashedNamespace = utils.toDashed(namespace);
      var dataAttr = 'data-' + dashedNamespace;
      var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
      var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
      var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
      var dataOptionsAttr = dataAttr + '-options';
      var jQuery = window.jQuery;
      elems.forEach(function (elem) {
        var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
        var options;

        try {
          options = attr && JSON.parse(attr);
        } catch (error) {
          // log error, do not initialize
          if (console) {
            console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error);
          }

          return;
        } // initialize


        var instance = new WidgetClass(elem, options); // make available via $().data('namespace')

        if (jQuery) {
          jQuery.data(elem, namespace, instance);
        }
      });
    });
  }; // -----  ----- //


  return utils;
});
/**
 * Outlayer Item
 */


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */

  /* globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD - RequireJS
    define('outlayer/item', ['ev-emitter/ev-emitter', 'get-size/get-size'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(require('ev-emitter'), require('get-size'));
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(window.EvEmitter, window.getSize);
  }
})(window, function factory(EvEmitter, getSize) {
  'use strict'; // ----- helpers ----- //

  function isEmptyObj(obj) {
    for (var prop in obj) {
      return false;
    }

    prop = null;
    return true;
  } // -------------------------- CSS3 support -------------------------- //


  var docElemStyle = document.documentElement.style;
  var transitionProperty = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
  var transformProperty = typeof docElemStyle.transform == 'string' ? 'transform' : 'WebkitTransform';
  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
  }[transitionProperty]; // cache all vendor properties that could have vendor prefix

  var vendorProperties = {
    transform: transformProperty,
    transition: transitionProperty,
    transitionDuration: transitionProperty + 'Duration',
    transitionProperty: transitionProperty + 'Property',
    transitionDelay: transitionProperty + 'Delay'
  }; // -------------------------- Item -------------------------- //

  function Item(element, layout) {
    if (!element) {
      return;
    }

    this.element = element; // parent layout class, i.e. Masonry, Isotope, or Packery

    this.layout = layout;
    this.position = {
      x: 0,
      y: 0
    };

    this._create();
  } // inherit EvEmitter


  var proto = Item.prototype = Object.create(EvEmitter.prototype);
  proto.constructor = Item;

  proto._create = function () {
    // transition objects
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    };
    this.css({
      position: 'absolute'
    });
  }; // trigger specified handler for event type


  proto.handleEvent = function (event) {
    var method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };
  /**
   * apply CSS styles to element
   * @param {Object} style
   */


  proto.css = function (style) {
    var elemStyle = this.element.style;

    for (var prop in style) {
      // use vendor property if available
      var supportedProp = vendorProperties[prop] || prop;
      elemStyle[supportedProp] = style[prop];
    }
  }; // measure position, and sets it


  proto.getPosition = function () {
    var style = getComputedStyle(this.element);

    var isOriginLeft = this.layout._getOption('originLeft');

    var isOriginTop = this.layout._getOption('originTop');

    var xValue = style[isOriginLeft ? 'left' : 'right'];
    var yValue = style[isOriginTop ? 'top' : 'bottom']; // convert percent to pixels

    var layoutSize = this.layout.size;
    var x = xValue.indexOf('%') != -1 ? parseFloat(xValue) / 100 * layoutSize.width : parseInt(xValue, 10);
    var y = yValue.indexOf('%') != -1 ? parseFloat(yValue) / 100 * layoutSize.height : parseInt(yValue, 10); // clean up 'auto' or other non-integer values

    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y; // remove padding from measurement

    x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
    y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
    this.position.x = x;
    this.position.y = y;
  }; // set settled position, apply padding


  proto.layoutPosition = function () {
    var layoutSize = this.layout.size;
    var style = {};

    var isOriginLeft = this.layout._getOption('originLeft');

    var isOriginTop = this.layout._getOption('originTop'); // x


    var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
    var xProperty = isOriginLeft ? 'left' : 'right';
    var xResetProperty = isOriginLeft ? 'right' : 'left';
    var x = this.position.x + layoutSize[xPadding]; // set in percentage or pixels

    style[xProperty] = this.getXValue(x); // reset other property

    style[xResetProperty] = ''; // y

    var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
    var yProperty = isOriginTop ? 'top' : 'bottom';
    var yResetProperty = isOriginTop ? 'bottom' : 'top';
    var y = this.position.y + layoutSize[yPadding]; // set in percentage or pixels

    style[yProperty] = this.getYValue(y); // reset other property

    style[yResetProperty] = '';
    this.css(style);
    this.emitEvent('layout', [this]);
  };

  proto.getXValue = function (x) {
    var isHorizontal = this.layout._getOption('horizontal');

    return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + '%' : x + 'px';
  };

  proto.getYValue = function (y) {
    var isHorizontal = this.layout._getOption('horizontal');

    return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + '%' : y + 'px';
  };

  proto._transitionTo = function (x, y) {
    this.getPosition(); // get current x & y from top/left

    var curX = this.position.x;
    var curY = this.position.y;
    var compareX = parseInt(x, 10);
    var compareY = parseInt(y, 10);
    var didNotMove = compareX === this.position.x && compareY === this.position.y; // save end position

    this.setPosition(x, y); // if did not move and not transitioning, just go to layout

    if (didNotMove && !this.isTransitioning) {
      this.layoutPosition();
      return;
    }

    var transX = x - curX;
    var transY = y - curY;
    var transitionStyle = {};
    transitionStyle.transform = this.getTranslate(transX, transY);
    this.transition({
      to: transitionStyle,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: true
    });
  };

  proto.getTranslate = function (x, y) {
    // flip cooridinates if origin on right or bottom
    var isOriginLeft = this.layout._getOption('originLeft');

    var isOriginTop = this.layout._getOption('originTop');

    x = isOriginLeft ? x : -x;
    y = isOriginTop ? y : -y;
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  }; // non transition + transform support


  proto.goTo = function (x, y) {
    this.setPosition(x, y);
    this.layoutPosition();
  };

  proto.moveTo = proto._transitionTo;

  proto.setPosition = function (x, y) {
    this.position.x = parseInt(x, 10);
    this.position.y = parseInt(y, 10);
  }; // ----- transition ----- //

  /**
   * @param {Object} style - CSS
   * @param {Function} onTransitionEnd
   */
  // non transition, just trigger callback


  proto._nonTransition = function (args) {
    this.css(args.to);

    if (args.isCleaning) {
      this._removeStyles(args.to);
    }

    for (var prop in args.onTransitionEnd) {
      args.onTransitionEnd[prop].call(this);
    }
  };
  /**
   * proper transition
   * @param {Object} args - arguments
   *   @param {Object} to - style to transition to
   *   @param {Object} from - style to start transition from
   *   @param {Boolean} isCleaning - removes transition styles after transition
   *   @param {Function} onTransitionEnd - callback
   */


  proto.transition = function (args) {
    // redirect to nonTransition if no transition duration
    if (!parseFloat(this.layout.options.transitionDuration)) {
      this._nonTransition(args);

      return;
    }

    var _transition = this._transn; // keep track of onTransitionEnd callback by css property

    for (var prop in args.onTransitionEnd) {
      _transition.onEnd[prop] = args.onTransitionEnd[prop];
    } // keep track of properties that are transitioning


    for (prop in args.to) {
      _transition.ingProperties[prop] = true; // keep track of properties to clean up when transition is done

      if (args.isCleaning) {
        _transition.clean[prop] = true;
      }
    } // set from styles


    if (args.from) {
      this.css(args.from); // force redraw. http://blog.alexmaccaw.com/css-transitions

      var h = this.element.offsetHeight; // hack for JSHint to hush about unused var

      h = null;
    } // enable transition


    this.enableTransition(args.to); // set styles that are transitioning

    this.css(args.to);
    this.isTransitioning = true;
  }; // dash before all cap letters, including first for
  // WebkitTransform => -webkit-transform


  function toDashedAll(str) {
    return str.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  }

  var transitionProps = 'opacity,' + toDashedAll(transformProperty);

  proto.enableTransition = function ()
  /* style */
  {
    // HACK changing transitionProperty during a transition
    // will cause transition to jump
    if (this.isTransitioning) {
      return;
    } // make `transition: foo, bar, baz` from style object
    // HACK un-comment this when enableTransition can work
    // while a transition is happening
    // var transitionValues = [];
    // for ( var prop in style ) {
    //   // dash-ify camelCased properties like WebkitTransition
    //   prop = vendorProperties[ prop ] || prop;
    //   transitionValues.push( toDashedAll( prop ) );
    // }
    // munge number to millisecond, to match stagger


    var duration = this.layout.options.transitionDuration;
    duration = typeof duration == 'number' ? duration + 'ms' : duration; // enable transition styles

    this.css({
      transitionProperty: transitionProps,
      transitionDuration: duration,
      transitionDelay: this.staggerDelay || 0
    }); // listen for transition end event

    this.element.addEventListener(transitionEndEvent, this, false);
  }; // ----- events ----- //


  proto.onwebkitTransitionEnd = function (event) {
    this.ontransitionend(event);
  };

  proto.onotransitionend = function (event) {
    this.ontransitionend(event);
  }; // properties that I munge to make my life easier


  var dashedVendorProperties = {
    '-webkit-transform': 'transform'
  };

  proto.ontransitionend = function (event) {
    // disregard bubbled events from children
    if (event.target !== this.element) {
      return;
    }

    var _transition = this._transn; // get property name of transitioned property, convert to prefix-free

    var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName; // remove property that has completed transitioning

    delete _transition.ingProperties[propertyName]; // check if any properties are still transitioning

    if (isEmptyObj(_transition.ingProperties)) {
      // all properties have completed transitioning
      this.disableTransition();
    } // clean style


    if (propertyName in _transition.clean) {
      // clean up style
      this.element.style[event.propertyName] = '';
      delete _transition.clean[propertyName];
    } // trigger onTransitionEnd callback


    if (propertyName in _transition.onEnd) {
      var onTransitionEnd = _transition.onEnd[propertyName];
      onTransitionEnd.call(this);
      delete _transition.onEnd[propertyName];
    }

    this.emitEvent('transitionEnd', [this]);
  };

  proto.disableTransition = function () {
    this.removeTransitionStyles();
    this.element.removeEventListener(transitionEndEvent, this, false);
    this.isTransitioning = false;
  };
  /**
   * removes style property from element
   * @param {Object} style
  **/


  proto._removeStyles = function (style) {
    // clean up transition styles
    var cleanStyle = {};

    for (var prop in style) {
      cleanStyle[prop] = '';
    }

    this.css(cleanStyle);
  };

  var cleanTransitionStyle = {
    transitionProperty: '',
    transitionDuration: '',
    transitionDelay: ''
  };

  proto.removeTransitionStyles = function () {
    // remove transition
    this.css(cleanTransitionStyle);
  }; // ----- stagger ----- //


  proto.stagger = function (delay) {
    delay = isNaN(delay) ? 0 : delay;
    this.staggerDelay = delay + 'ms';
  }; // ----- show/hide/remove ----- //
  // remove element from DOM


  proto.removeElem = function () {
    this.element.parentNode.removeChild(this.element); // remove display: none

    this.css({
      display: ''
    });
    this.emitEvent('remove', [this]);
  };

  proto.remove = function () {
    // just remove element if no transition support or no transition
    if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
      this.removeElem();
      return;
    } // start transition


    this.once('transitionEnd', function () {
      this.removeElem();
    });
    this.hide();
  };

  proto.reveal = function () {
    delete this.isHidden; // remove display: none

    this.css({
      display: ''
    });
    var options = this.layout.options;
    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
    onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
    this.transition({
      from: options.hiddenStyle,
      to: options.visibleStyle,
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onRevealTransitionEnd = function () {
    // check if still visible
    // during transition, item may have been hidden
    if (!this.isHidden) {
      this.emitEvent('reveal');
    }
  };
  /**
   * get style property use for hide/reveal transition end
   * @param {String} styleProperty - hiddenStyle/visibleStyle
   * @returns {String}
   */


  proto.getHideRevealTransitionEndProperty = function (styleProperty) {
    var optionStyle = this.layout.options[styleProperty]; // use opacity

    if (optionStyle.opacity) {
      return 'opacity';
    } // get first property


    for (var prop in optionStyle) {
      return prop;
    }
  };

  proto.hide = function () {
    // set flag
    this.isHidden = true; // remove display: none

    this.css({
      display: ''
    });
    var options = this.layout.options;
    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
    onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
    this.transition({
      from: options.visibleStyle,
      to: options.hiddenStyle,
      // keep hidden stuff hidden
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onHideTransitionEnd = function () {
    // check if still hidden
    // during transition, item may have been un-hidden
    if (this.isHidden) {
      this.css({
        display: 'none'
      });
      this.emitEvent('hide');
    }
  };

  proto.destroy = function () {
    this.css({
      position: '',
      left: '',
      right: '',
      top: '',
      bottom: '',
      transition: '',
      transform: ''
    });
  };

  return Item;
});
/*!
 * Outlayer v2.1.0
 * the brains and guts of a layout library
 * MIT license
 */


(function (window, factory) {
  'use strict'; // universal module definition

  /* jshint strict: false */

  /* globals define, module, require */

  if (typeof define == 'function' && define.amd) {
    // AMD - RequireJS
    define('outlayer/outlayer', ['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'], function (EvEmitter, getSize, utils, Item) {
      return factory(window, EvEmitter, getSize, utils, Item);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(window, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item'));
  } else {
    // browser global
    window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item);
  }
})(window, function factory(window, EvEmitter, getSize, utils, Item) {
  'use strict'; // ----- vars ----- //

  var console = window.console;
  var jQuery = window.jQuery;

  var noop = function noop() {}; // -------------------------- Outlayer -------------------------- //
  // globally unique identifiers


  var GUID = 0; // internal store of all Outlayer intances

  var instances = {};
  /**
   * @param {Element, String} element
   * @param {Object} options
   * @constructor
   */

  function Outlayer(element, options) {
    var queryElement = utils.getQueryElement(element);

    if (!queryElement) {
      if (console) {
        console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element));
      }

      return;
    }

    this.element = queryElement; // add jQuery

    if (jQuery) {
      this.$element = jQuery(this.element);
    } // options


    this.options = utils.extend({}, this.constructor.defaults);
    this.option(options); // add id for Outlayer.getFromElement

    var id = ++GUID;
    this.element.outlayerGUID = id; // expando

    instances[id] = this; // associate via id
    // kick it off

    this._create();

    var isInitLayout = this._getOption('initLayout');

    if (isInitLayout) {
      this.layout();
    }
  } // settings are for internal use only


  Outlayer.namespace = 'outlayer';
  Outlayer.Item = Item; // default options

  Outlayer.defaults = {
    containerStyle: {
      position: 'relative'
    },
    initLayout: true,
    originLeft: true,
    originTop: true,
    resize: true,
    resizeContainer: true,
    // item options
    transitionDuration: '0.4s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    }
  };
  var proto = Outlayer.prototype; // inherit EvEmitter

  utils.extend(proto, EvEmitter.prototype);
  /**
   * set options
   * @param {Object} opts
   */

  proto.option = function (opts) {
    utils.extend(this.options, opts);
  };
  /**
   * get backwards compatible option value, check old name
   */


  proto._getOption = function (option) {
    var oldOption = this.constructor.compatOptions[option];
    return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option];
  };

  Outlayer.compatOptions = {
    // currentName: oldName
    initLayout: 'isInitLayout',
    horizontal: 'isHorizontal',
    layoutInstant: 'isLayoutInstant',
    originLeft: 'isOriginLeft',
    originTop: 'isOriginTop',
    resize: 'isResizeBound',
    resizeContainer: 'isResizingContainer'
  };

  proto._create = function () {
    // get items from children
    this.reloadItems(); // elements that affect layout, but are not laid out

    this.stamps = [];
    this.stamp(this.options.stamp); // set container style

    utils.extend(this.element.style, this.options.containerStyle); // bind resize method

    var canBindResize = this._getOption('resize');

    if (canBindResize) {
      this.bindResize();
    }
  }; // goes through all children again and gets bricks in proper order


  proto.reloadItems = function () {
    // collection of item elements
    this.items = this._itemize(this.element.children);
  };
  /**
   * turn elements into Outlayer.Items to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - collection of new Outlayer Items
   */


  proto._itemize = function (elems) {
    var itemElems = this._filterFindItemElements(elems);

    var Item = this.constructor.Item; // create new Outlayer Items for collection

    var items = [];

    for (var i = 0; i < itemElems.length; i++) {
      var elem = itemElems[i];
      var item = new Item(elem, this);
      items.push(item);
    }

    return items;
  };
  /**
   * get item elements to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - item elements
   */


  proto._filterFindItemElements = function (elems) {
    return utils.filterFindElements(elems, this.options.itemSelector);
  };
  /**
   * getter method for getting item elements
   * @returns {Array} elems - collection of item elements
   */


  proto.getItemElements = function () {
    return this.items.map(function (item) {
      return item.element;
    });
  }; // ----- init & layout ----- //

  /**
   * lays out all items
   */


  proto.layout = function () {
    this._resetLayout();

    this._manageStamps(); // don't animate first layout


    var layoutInstant = this._getOption('layoutInstant');

    var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
    this.layoutItems(this.items, isInstant); // flag for initalized

    this._isLayoutInited = true;
  }; // _init is alias for layout


  proto._init = proto.layout;
  /**
   * logic before any new layout
   */

  proto._resetLayout = function () {
    this.getSize();
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };
  /**
   * get measurement from option, for columnWidth, rowHeight, gutter
   * if option is String -> get element from selector string, & get size of element
   * if option is Element -> get size of element
   * else use option as a number
   *
   * @param {String} measurement
   * @param {String} size - width or height
   * @private
   */


  proto._getMeasurement = function (measurement, size) {
    var option = this.options[measurement];
    var elem;

    if (!option) {
      // default to 0
      this[measurement] = 0;
    } else {
      // use option as an element
      if (typeof option == 'string') {
        elem = this.element.querySelector(option);
      } else if (option instanceof HTMLElement) {
        elem = option;
      } // use size of element, if element


      this[measurement] = elem ? getSize(elem)[size] : option;
    }
  };
  /**
   * layout a collection of item elements
   * @api public
   */


  proto.layoutItems = function (items, isInstant) {
    items = this._getItemsForLayout(items);

    this._layoutItems(items, isInstant);

    this._postLayout();
  };
  /**
   * get the items to be laid out
   * you may want to skip over some items
   * @param {Array} items
   * @returns {Array} items
   */


  proto._getItemsForLayout = function (items) {
    return items.filter(function (item) {
      return !item.isIgnored;
    });
  };
  /**
   * layout items
   * @param {Array} items
   * @param {Boolean} isInstant
   */


  proto._layoutItems = function (items, isInstant) {
    this._emitCompleteOnItems('layout', items);

    if (!items || !items.length) {
      // no items, emit event with empty array
      return;
    }

    var queue = [];
    items.forEach(function (item) {
      // get x/y object from method
      var position = this._getItemLayoutPosition(item); // enqueue


      position.item = item;
      position.isInstant = isInstant || item.isLayoutInstant;
      queue.push(position);
    }, this);

    this._processLayoutQueue(queue);
  };
  /**
   * get item layout position
   * @param {Outlayer.Item} item
   * @returns {Object} x and y position
   */


  proto._getItemLayoutPosition = function ()
  /* item */
  {
    return {
      x: 0,
      y: 0
    };
  };
  /**
   * iterate over array and position each item
   * Reason being - separating this logic prevents 'layout invalidation'
   * thx @paul_irish
   * @param {Array} queue
   */


  proto._processLayoutQueue = function (queue) {
    this.updateStagger();
    queue.forEach(function (obj, i) {
      this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
    }, this);
  }; // set stagger from option in milliseconds number


  proto.updateStagger = function () {
    var stagger = this.options.stagger;

    if (stagger === null || stagger === undefined) {
      this.stagger = 0;
      return;
    }

    this.stagger = getMilliseconds(stagger);
    return this.stagger;
  };
  /**
   * Sets position of item in DOM
   * @param {Outlayer.Item} item
   * @param {Number} x - horizontal position
   * @param {Number} y - vertical position
   * @param {Boolean} isInstant - disables transitions
   */


  proto._positionItem = function (item, x, y, isInstant, i) {
    if (isInstant) {
      // if not transition, just set CSS
      item.goTo(x, y);
    } else {
      item.stagger(i * this.stagger);
      item.moveTo(x, y);
    }
  };
  /**
   * Any logic you want to do after each layout,
   * i.e. size the container
   */


  proto._postLayout = function () {
    this.resizeContainer();
  };

  proto.resizeContainer = function () {
    var isResizingContainer = this._getOption('resizeContainer');

    if (!isResizingContainer) {
      return;
    }

    var size = this._getContainerSize();

    if (size) {
      this._setContainerMeasure(size.width, true);

      this._setContainerMeasure(size.height, false);
    }
  };
  /**
   * Sets width or height of container if returned
   * @returns {Object} size
   *   @param {Number} width
   *   @param {Number} height
   */


  proto._getContainerSize = noop;
  /**
   * @param {Number} measure - size of width or height
   * @param {Boolean} isWidth
   */

  proto._setContainerMeasure = function (measure, isWidth) {
    if (measure === undefined) {
      return;
    }

    var elemSize = this.size; // add padding and border width if border box

    if (elemSize.isBorderBox) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }

    measure = Math.max(measure, 0);
    this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
  };
  /**
   * emit eventComplete on a collection of items events
   * @param {String} eventName
   * @param {Array} items - Outlayer.Items
   */


  proto._emitCompleteOnItems = function (eventName, items) {
    var _this = this;

    function onComplete() {
      _this.dispatchEvent(eventName + 'Complete', null, [items]);
    }

    var count = items.length;

    if (!items || !count) {
      onComplete();
      return;
    }

    var doneCount = 0;

    function tick() {
      doneCount++;

      if (doneCount == count) {
        onComplete();
      }
    } // bind callback


    items.forEach(function (item) {
      item.once(eventName, tick);
    });
  };
  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */


  proto.dispatchEvent = function (type, event, args) {
    // add original event to arguments
    var emitArgs = event ? [event].concat(args) : args;
    this.emitEvent(type, emitArgs);

    if (jQuery) {
      // set this.$element
      this.$element = this.$element || jQuery(this.element);

      if (event) {
        // create jQuery event
        var $event = jQuery.Event(event);
        $event.type = type;
        this.$element.trigger($event, args);
      } else {
        // just trigger with type if no event available
        this.$element.trigger(type, args);
      }
    }
  }; // -------------------------- ignore & stamps -------------------------- //

  /**
   * keep item in collection, but do not lay it out
   * ignored items do not get skipped in layout
   * @param {Element} elem
   */


  proto.ignore = function (elem) {
    var item = this.getItem(elem);

    if (item) {
      item.isIgnored = true;
    }
  };
  /**
   * return item to layout collection
   * @param {Element} elem
   */


  proto.unignore = function (elem) {
    var item = this.getItem(elem);

    if (item) {
      delete item.isIgnored;
    }
  };
  /**
   * adds elements to stamps
   * @param {NodeList, Array, Element, or String} elems
   */


  proto.stamp = function (elems) {
    elems = this._find(elems);

    if (!elems) {
      return;
    }

    this.stamps = this.stamps.concat(elems); // ignore

    elems.forEach(this.ignore, this);
  };
  /**
   * removes elements to stamps
   * @param {NodeList, Array, or Element} elems
   */


  proto.unstamp = function (elems) {
    elems = this._find(elems);

    if (!elems) {
      return;
    }

    elems.forEach(function (elem) {
      // filter out removed stamp elements
      utils.removeFrom(this.stamps, elem);
      this.unignore(elem);
    }, this);
  };
  /**
   * finds child elements
   * @param {NodeList, Array, Element, or String} elems
   * @returns {Array} elems
   */


  proto._find = function (elems) {
    if (!elems) {
      return;
    } // if string, use argument as selector string


    if (typeof elems == 'string') {
      elems = this.element.querySelectorAll(elems);
    }

    elems = utils.makeArray(elems);
    return elems;
  };

  proto._manageStamps = function () {
    if (!this.stamps || !this.stamps.length) {
      return;
    }

    this._getBoundingRect();

    this.stamps.forEach(this._manageStamp, this);
  }; // update boundingLeft / Top


  proto._getBoundingRect = function () {
    // get bounding rect for container element
    var boundingRect = this.element.getBoundingClientRect();
    var size = this.size;
    this._boundingRect = {
      left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
      top: boundingRect.top + size.paddingTop + size.borderTopWidth,
      right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
      bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
    };
  };
  /**
   * @param {Element} stamp
  **/


  proto._manageStamp = noop;
  /**
   * get x/y position of element relative to container element
   * @param {Element} elem
   * @returns {Object} offset - has left, top, right, bottom
   */

  proto._getElementOffset = function (elem) {
    var boundingRect = elem.getBoundingClientRect();
    var thisRect = this._boundingRect;
    var size = getSize(elem);
    var offset = {
      left: boundingRect.left - thisRect.left - size.marginLeft,
      top: boundingRect.top - thisRect.top - size.marginTop,
      right: thisRect.right - boundingRect.right - size.marginRight,
      bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
    };
    return offset;
  }; // -------------------------- resize -------------------------- //
  // enable event handlers for listeners
  // i.e. resize -> onresize


  proto.handleEvent = utils.handleEvent;
  /**
   * Bind layout to window resizing
   */

  proto.bindResize = function () {
    window.addEventListener('resize', this);
    this.isResizeBound = true;
  };
  /**
   * Unbind layout to window resizing
   */


  proto.unbindResize = function () {
    window.removeEventListener('resize', this);
    this.isResizeBound = false;
  };

  proto.onresize = function () {
    this.resize();
  };

  utils.debounceMethod(Outlayer, 'onresize', 100);

  proto.resize = function () {
    // don't trigger if size did not change
    // or if resize was unbound. See #9
    if (!this.isResizeBound || !this.needsResizeLayout()) {
      return;
    }

    this.layout();
  };
  /**
   * check if layout is needed post layout
   * @returns Boolean
   */


  proto.needsResizeLayout = function () {
    var size = getSize(this.element); // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be

    var hasSizes = this.size && size;
    return hasSizes && size.innerWidth !== this.size.innerWidth;
  }; // -------------------------- methods -------------------------- //

  /**
   * add items to Outlayer instance
   * @param {Array or NodeList or Element} elems
   * @returns {Array} items - Outlayer.Items
  **/


  proto.addItems = function (elems) {
    var items = this._itemize(elems); // add items to collection


    if (items.length) {
      this.items = this.items.concat(items);
    }

    return items;
  };
  /**
   * Layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */


  proto.appended = function (elems) {
    var items = this.addItems(elems);

    if (!items.length) {
      return;
    } // layout and reveal just the new items


    this.layoutItems(items, true);
    this.reveal(items);
  };
  /**
   * Layout prepended elements
   * @param {Array or NodeList or Element} elems
   */


  proto.prepended = function (elems) {
    var items = this._itemize(elems);

    if (!items.length) {
      return;
    } // add items to beginning of collection


    var previousItems = this.items.slice(0);
    this.items = items.concat(previousItems); // start new layout

    this._resetLayout();

    this._manageStamps(); // layout new stuff without transition


    this.layoutItems(items, true);
    this.reveal(items); // layout previous items

    this.layoutItems(previousItems);
  };
  /**
   * reveal a collection of items
   * @param {Array of Outlayer.Items} items
   */


  proto.reveal = function (items) {
    this._emitCompleteOnItems('reveal', items);

    if (!items || !items.length) {
      return;
    }

    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.reveal();
    });
  };
  /**
   * hide a collection of items
   * @param {Array of Outlayer.Items} items
   */


  proto.hide = function (items) {
    this._emitCompleteOnItems('hide', items);

    if (!items || !items.length) {
      return;
    }

    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.hide();
    });
  };
  /**
   * reveal item elements
   * @param {Array}, {Element}, {NodeList} items
   */


  proto.revealItemElements = function (elems) {
    var items = this.getItems(elems);
    this.reveal(items);
  };
  /**
   * hide item elements
   * @param {Array}, {Element}, {NodeList} items
   */


  proto.hideItemElements = function (elems) {
    var items = this.getItems(elems);
    this.hide(items);
  };
  /**
   * get Outlayer.Item, given an Element
   * @param {Element} elem
   * @param {Function} callback
   * @returns {Outlayer.Item} item
   */


  proto.getItem = function (elem) {
    // loop through items to get the one that matches
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];

      if (item.element == elem) {
        // return item
        return item;
      }
    }
  };
  /**
   * get collection of Outlayer.Items, given Elements
   * @param {Array} elems
   * @returns {Array} items - Outlayer.Items
   */


  proto.getItems = function (elems) {
    elems = utils.makeArray(elems);
    var items = [];
    elems.forEach(function (elem) {
      var item = this.getItem(elem);

      if (item) {
        items.push(item);
      }
    }, this);
    return items;
  };
  /**
   * remove element(s) from instance and DOM
   * @param {Array or NodeList or Element} elems
   */


  proto.remove = function (elems) {
    var removeItems = this.getItems(elems);

    this._emitCompleteOnItems('remove', removeItems); // bail if no items to remove


    if (!removeItems || !removeItems.length) {
      return;
    }

    removeItems.forEach(function (item) {
      item.remove(); // remove item from collection

      utils.removeFrom(this.items, item);
    }, this);
  }; // ----- destroy ----- //
  // remove and disable Outlayer instance


  proto.destroy = function () {
    // clean up dynamic styles
    var style = this.element.style;
    style.height = '';
    style.position = '';
    style.width = ''; // destroy items

    this.items.forEach(function (item) {
      item.destroy();
    });
    this.unbindResize();
    var id = this.element.outlayerGUID;
    delete instances[id]; // remove reference to instance by id

    delete this.element.outlayerGUID; // remove data for jQuery

    if (jQuery) {
      jQuery.removeData(this.element, this.constructor.namespace);
    }
  }; // -------------------------- data -------------------------- //

  /**
   * get Outlayer instance from element
   * @param {Element} elem
   * @returns {Outlayer}
   */


  Outlayer.data = function (elem) {
    elem = utils.getQueryElement(elem);
    var id = elem && elem.outlayerGUID;
    return id && instances[id];
  }; // -------------------------- create Outlayer class -------------------------- //

  /**
   * create a layout class
   * @param {String} namespace
   */


  Outlayer.create = function (namespace, options) {
    // sub-class Outlayer
    var Layout = subclass(Outlayer); // apply new options and compatOptions

    Layout.defaults = utils.extend({}, Outlayer.defaults);
    utils.extend(Layout.defaults, options);
    Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
    Layout.namespace = namespace;
    Layout.data = Outlayer.data; // sub-class Item

    Layout.Item = subclass(Item); // -------------------------- declarative -------------------------- //

    utils.htmlInit(Layout, namespace); // -------------------------- jQuery bridge -------------------------- //
    // make into jQuery plugin

    if (jQuery && jQuery.bridget) {
      jQuery.bridget(namespace, Layout);
    }

    return Layout;
  };

  function subclass(Parent) {
    function SubClass() {
      Parent.apply(this, arguments);
    }

    SubClass.prototype = Object.create(Parent.prototype);
    SubClass.prototype.constructor = SubClass;
    return SubClass;
  } // ----- helpers ----- //
  // how many milliseconds are in each unit


  var msUnits = {
    ms: 1,
    s: 1000
  }; // munge time-like parameter into millisecond number
  // '0.4s' -> 40

  function getMilliseconds(time) {
    if (typeof time == 'number') {
      return time;
    }

    var matches = time.match(/(^\d*\.?\d*)(\w*)/);
    var num = matches && matches[1];
    var unit = matches && matches[2];

    if (!num.length) {
      return 0;
    }

    num = parseFloat(num);
    var mult = msUnits[unit] || 1;
    return num * mult;
  } // ----- fin ----- //
  // back in global


  Outlayer.Item = Item;
  return Outlayer;
});
/*!
 * Masonry v4.2.1
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */


(function (window, factory) {
  // universal module definition

  /* jshint strict: false */

  /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['outlayer/outlayer', 'get-size/get-size'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('outlayer'), require('get-size'));
  } else {
    // browser global
    window.Masonry = factory(window.Outlayer, window.getSize);
  }
})(window, function factory(Outlayer, getSize) {
  // -------------------------- masonryDefinition -------------------------- //
  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry'); // isFitWidth -> fitWidth

  Masonry.compatOptions.fitWidth = 'isFitWidth';
  var proto = Masonry.prototype;

  proto._resetLayout = function () {
    this.getSize();

    this._getMeasurement('columnWidth', 'outerWidth');

    this._getMeasurement('gutter', 'outerWidth');

    this.measureColumns(); // reset column Y

    this.colYs = [];

    for (var i = 0; i < this.cols; i++) {
      this.colYs.push(0);
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function () {
    this.getContainerWidth(); // if columnWidth is 0, default to outerWidth of first item

    if (!this.columnWidth) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element; // columnWidth fall back to item of first element

      this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || // if first elem has no width, default to size of container
      this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter; // calculate columns

    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth; // fix rounding errors, typically with gutters

    var excess = columnWidth - containerWidth % columnWidth; // if overshoot is less than a pixel, round up, otherwise floor it

    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[mathMethod](cols);
    this.cols = Math.max(cols, 1);
  };

  proto.getContainerWidth = function () {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');

    var container = isFitWidth ? this.element.parentNode : this.element; // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be

    var size = getSize(container);
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function (item) {
    item.getSize(); // how many columns does this brick span

    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil'; // round if off by 1 pixel, otherwise use ceil

    var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
    colSpan = Math.min(colSpan, this.cols); // use horizontal or top column position

    var colPosMethod = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[colPosMethod](colSpan, item); // position the brick

    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    }; // apply setHeight to necessary columns

    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;

    for (var i = colPosition.col; i < setMax; i++) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function (colSpan) {
    var colGroup = this._getTopColGroup(colSpan); // get the minimum Y value from the columns


    var minimumY = Math.min.apply(Math, colGroup);
    return {
      col: colGroup.indexOf(minimumY),
      y: minimumY
    };
  };
  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */


  proto._getTopColGroup = function (colSpan) {
    if (colSpan < 2) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = []; // how many different places could this brick fit horizontally

    var groupCount = this.cols + 1 - colSpan; // for each group potential horizontal position

    for (var i = 0; i < groupCount; i++) {
      colGroup[i] = this._getColGroupY(i, colSpan);
    }

    return colGroup;
  };

  proto._getColGroupY = function (col, colSpan) {
    if (colSpan < 2) {
      return this.colYs[col];
    } // make an array of colY values for that one group


    var groupColYs = this.colYs.slice(col, col + colSpan); // and get the max value of the array

    return Math.max.apply(Math, groupColYs);
  }; // get column position based on horizontal index. #873


  proto._getHorizontalColPosition = function (colSpan, item) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols; // shift to next row if item can't fit on current row

    col = isOver ? 0 : col; // don't let zero-size items take up space

    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
    return {
      col: col,
      y: this._getColGroupY(col, colSpan)
    };
  };

  proto._manageStamp = function (stamp) {
    var stampSize = getSize(stamp);

    var offset = this._getElementOffset(stamp); // get the columns that this stamp affects


    var isOriginLeft = this._getOption('originLeft');

    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor(firstX / this.columnWidth);
    firstCol = Math.max(0, firstCol);
    var lastCol = Math.floor(lastX / this.columnWidth); // lastCol should not go over if multiple of columnWidth #425

    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min(this.cols - 1, lastCol); // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');

    var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;

    for (var i = firstCol; i <= lastCol; i++) {
      this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
    }
  };

  proto._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var size = {
      height: this.maxY
    };

    if (this._getOption('fitWidth')) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function () {
    var unusedCols = 0; // count unused columns

    var i = this.cols;

    while (--i) {
      if (this.colYs[i] !== 0) {
        break;
      }

      unusedCols++;
    } // fit container to columns that have been used


    return (this.cols - unusedCols) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function () {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;
});
"use strict";

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function (window, document) {
  'use strict'; // Exits early if all IntersectionObserver and IntersectionObserverEntry
  // features are natively supported.

  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function get() {
          return this.intersectionRatio > 0;
        }
      });
    }

    return;
  }
  /**
   * An IntersectionObserver registry. This registry exists to hold a strong
   * reference to IntersectionObserver instances currently observering a target
   * element. Without this registry, instances without another reference may be
   * garbage collected.
   */


  var registry = [];
  /**
   * Creates the global IntersectionObserverEntry constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
   * @param {Object} entry A dictionary of instance properties.
   * @constructor
   */

  function IntersectionObserverEntry(entry) {
    this.time = entry.time;
    this.target = entry.target;
    this.rootBounds = entry.rootBounds;
    this.boundingClientRect = entry.boundingClientRect;
    this.intersectionRect = entry.intersectionRect || getEmptyRect();
    this.isIntersecting = !!entry.intersectionRect; // Calculates the intersection ratio.

    var targetRect = this.boundingClientRect;
    var targetArea = targetRect.width * targetRect.height;
    var intersectionRect = this.intersectionRect;
    var intersectionArea = intersectionRect.width * intersectionRect.height; // Sets intersection ratio.

    if (targetArea) {
      this.intersectionRatio = intersectionArea / targetArea;
    } else {
      // If area is zero and is intersecting, sets to 1, otherwise to 0
      this.intersectionRatio = this.isIntersecting ? 1 : 0;
    }
  }
  /**
   * Creates the global IntersectionObserver constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
   * @param {Function} callback The function to be invoked after intersection
   *     changes have queued. The function is not invoked if the queue has
   *     been emptied by calling the `takeRecords` method.
   * @param {Object=} opt_options Optional configuration options.
   * @constructor
   */


  function IntersectionObserver(callback, opt_options) {
    var options = opt_options || {};

    if (typeof callback != 'function') {
      throw new Error('callback must be a function');
    }

    if (options.root && options.root.nodeType != 1) {
      throw new Error('root must be an Element');
    } // Binds and throttles `this._checkForIntersections`.


    this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT); // Private properties.

    this._callback = callback;
    this._observationTargets = [];
    this._queuedEntries = [];
    this._rootMarginValues = this._parseRootMargin(options.rootMargin); // Public properties.

    this.thresholds = this._initThresholds(options.threshold);
    this.root = options.root || null;
    this.rootMargin = this._rootMarginValues.map(function (margin) {
      return margin.value + margin.unit;
    }).join(' ');
  }
  /**
   * The minimum interval within which the document will be checked for
   * intersection changes.
   */


  IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;
  /**
   * The frequency in which the polyfill polls for intersection changes.
   * this can be updated on a per instance basis and must be set prior to
   * calling `observe` on the first target.
   */

  IntersectionObserver.prototype.POLL_INTERVAL = null;
  /**
   * Use a mutation observer on the root element
   * to detect intersection changes.
   */

  IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;
  /**
   * Starts observing a target element for intersection changes based on
   * the thresholds values.
   * @param {Element} target The DOM element to observe.
   */

  IntersectionObserver.prototype.observe = function (target) {
    var isTargetAlreadyObserved = this._observationTargets.some(function (item) {
      return item.element == target;
    });

    if (isTargetAlreadyObserved) {
      return;
    }

    if (!(target && target.nodeType == 1)) {
      throw new Error('target must be an Element');
    }

    this._registerInstance();

    this._observationTargets.push({
      element: target,
      entry: null
    });

    this._monitorIntersections();

    this._checkForIntersections();
  };
  /**
   * Stops observing a target element for intersection changes.
   * @param {Element} target The DOM element to observe.
   */


  IntersectionObserver.prototype.unobserve = function (target) {
    this._observationTargets = this._observationTargets.filter(function (item) {
      return item.element != target;
    });

    if (!this._observationTargets.length) {
      this._unmonitorIntersections();

      this._unregisterInstance();
    }
  };
  /**
   * Stops observing all target elements for intersection changes.
   */


  IntersectionObserver.prototype.disconnect = function () {
    this._observationTargets = [];

    this._unmonitorIntersections();

    this._unregisterInstance();
  };
  /**
   * Returns any queue entries that have not yet been reported to the
   * callback and clears the queue. This can be used in conjunction with the
   * callback to obtain the absolute most up-to-date intersection information.
   * @return {Array} The currently queued entries.
   */


  IntersectionObserver.prototype.takeRecords = function () {
    var records = this._queuedEntries.slice();

    this._queuedEntries = [];
    return records;
  };
  /**
   * Accepts the threshold value from the user configuration object and
   * returns a sorted array of unique threshold values. If a value is not
   * between 0 and 1 and error is thrown.
   * @private
   * @param {Array|number=} opt_threshold An optional threshold value or
   *     a list of threshold values, defaulting to [0].
   * @return {Array} A sorted list of unique and valid threshold values.
   */


  IntersectionObserver.prototype._initThresholds = function (opt_threshold) {
    var threshold = opt_threshold || [0];
    if (!Array.isArray(threshold)) threshold = [threshold];
    return threshold.sort().filter(function (t, i, a) {
      if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
        throw new Error('threshold must be a number between 0 and 1 inclusively');
      }

      return t !== a[i - 1];
    });
  };
  /**
   * Accepts the rootMargin value from the user configuration object
   * and returns an array of the four margin values as an object containing
   * the value and unit properties. If any of the values are not properly
   * formatted or use a unit other than px or %, and error is thrown.
   * @private
   * @param {string=} opt_rootMargin An optional rootMargin value,
   *     defaulting to '0px'.
   * @return {Array<Object>} An array of margin objects with the keys
   *     value and unit.
   */


  IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
    var marginString = opt_rootMargin || '0px';
    var margins = marginString.split(/\s+/).map(function (margin) {
      var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);

      if (!parts) {
        throw new Error('rootMargin must be specified in pixels or percent');
      }

      return {
        value: parseFloat(parts[1]),
        unit: parts[2]
      };
    }); // Handles shorthand.

    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];
    return margins;
  };
  /**
   * Starts polling for intersection changes if the polling is not already
   * happening, and if the page's visibilty state is visible.
   * @private
   */


  IntersectionObserver.prototype._monitorIntersections = function () {
    if (!this._monitoringIntersections) {
      this._monitoringIntersections = true; // If a poll interval is set, use polling instead of listening to
      // resize and scroll events or DOM mutations.

      if (this.POLL_INTERVAL) {
        this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
      } else {
        addEvent(window, 'resize', this._checkForIntersections, true);
        addEvent(document, 'scroll', this._checkForIntersections, true);

        if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
          this._domObserver = new MutationObserver(this._checkForIntersections);

          this._domObserver.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        }
      }
    }
  };
  /**
   * Stops polling for intersection changes.
   * @private
   */


  IntersectionObserver.prototype._unmonitorIntersections = function () {
    if (this._monitoringIntersections) {
      this._monitoringIntersections = false;
      clearInterval(this._monitoringInterval);
      this._monitoringInterval = null;
      removeEvent(window, 'resize', this._checkForIntersections, true);
      removeEvent(document, 'scroll', this._checkForIntersections, true);

      if (this._domObserver) {
        this._domObserver.disconnect();

        this._domObserver = null;
      }
    }
  };
  /**
   * Scans each observation target for intersection changes and adds them
   * to the internal entries queue. If new entries are found, it
   * schedules the callback to be invoked.
   * @private
   */


  IntersectionObserver.prototype._checkForIntersections = function () {
    var rootIsInDom = this._rootIsInDom();

    var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

    this._observationTargets.forEach(function (item) {
      var target = item.element;
      var targetRect = getBoundingClientRect(target);

      var rootContainsTarget = this._rootContainsTarget(target);

      var oldEntry = item.entry;

      var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);

      var newEntry = item.entry = new IntersectionObserverEntry({
        time: now(),
        target: target,
        boundingClientRect: targetRect,
        rootBounds: rootRect,
        intersectionRect: intersectionRect
      });

      if (!oldEntry) {
        this._queuedEntries.push(newEntry);
      } else if (rootIsInDom && rootContainsTarget) {
        // If the new entry intersection ratio has crossed any of the
        // thresholds, add a new entry.
        if (this._hasCrossedThreshold(oldEntry, newEntry)) {
          this._queuedEntries.push(newEntry);
        }
      } else {
        // If the root is not in the DOM or target is not contained within
        // root but the previous entry for this target had an intersection,
        // add a new record indicating removal.
        if (oldEntry && oldEntry.isIntersecting) {
          this._queuedEntries.push(newEntry);
        }
      }
    }, this);

    if (this._queuedEntries.length) {
      this._callback(this.takeRecords(), this);
    }
  };
  /**
   * Accepts a target and root rect computes the intersection between then
   * following the algorithm in the spec.
   * TODO(philipwalton): at this time clip-path is not considered.
   * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
   * @param {Element} target The target DOM element
   * @param {Object} rootRect The bounding rect of the root after being
   *     expanded by the rootMargin value.
   * @return {?Object} The final intersection rect object or undefined if no
   *     intersection is found.
   * @private
   */


  IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, rootRect) {
    // If the element isn't displayed, an intersection can't happen.
    if (window.getComputedStyle(target).display == 'none') return;
    var targetRect = getBoundingClientRect(target);
    var intersectionRect = targetRect;
    var parent = getParentNode(target);
    var atRoot = false;

    while (!atRoot) {
      var parentRect = null;
      var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {}; // If the parent isn't displayed, an intersection can't happen.

      if (parentComputedStyle.display == 'none') return;

      if (parent == this.root || parent == document) {
        atRoot = true;
        parentRect = rootRect;
      } else {
        // If the element has a non-visible overflow, and it's not the <body>
        // or <html> element, update the intersection rect.
        // Note: <body> and <html> cannot be clipped to a rect that's not also
        // the document rect, so no need to compute a new intersection.
        if (parent != document.body && parent != document.documentElement && parentComputedStyle.overflow != 'visible') {
          parentRect = getBoundingClientRect(parent);
        }
      } // If either of the above conditionals set a new parentRect,
      // calculate new intersection data.


      if (parentRect) {
        intersectionRect = computeRectIntersection(parentRect, intersectionRect);
        if (!intersectionRect) break;
      }

      parent = getParentNode(parent);
    }

    return intersectionRect;
  };
  /**
   * Returns the root rect after being expanded by the rootMargin value.
   * @return {Object} The expanded root rect.
   * @private
   */


  IntersectionObserver.prototype._getRootRect = function () {
    var rootRect;

    if (this.root) {
      rootRect = getBoundingClientRect(this.root);
    } else {
      // Use <html>/<body> instead of window since scroll bars affect size.
      var html = document.documentElement;
      var body = document.body;
      rootRect = {
        top: 0,
        left: 0,
        right: html.clientWidth || body.clientWidth,
        width: html.clientWidth || body.clientWidth,
        bottom: html.clientHeight || body.clientHeight,
        height: html.clientHeight || body.clientHeight
      };
    }

    return this._expandRectByRootMargin(rootRect);
  };
  /**
   * Accepts a rect and expands it by the rootMargin value.
   * @param {Object} rect The rect object to expand.
   * @return {Object} The expanded rect.
   * @private
   */


  IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
    var margins = this._rootMarginValues.map(function (margin, i) {
      return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
    });

    var newRect = {
      top: rect.top - margins[0],
      right: rect.right + margins[1],
      bottom: rect.bottom + margins[2],
      left: rect.left - margins[3]
    };
    newRect.width = newRect.right - newRect.left;
    newRect.height = newRect.bottom - newRect.top;
    return newRect;
  };
  /**
   * Accepts an old and new entry and returns true if at least one of the
   * threshold values has been crossed.
   * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
   *    particular target element or null if no previous entry exists.
   * @param {IntersectionObserverEntry} newEntry The current entry for a
   *    particular target element.
   * @return {boolean} Returns true if a any threshold has been crossed.
   * @private
   */


  IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {
    // To make comparing easier, an entry that has a ratio of 0
    // but does not actually intersect is given a value of -1
    var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
    var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1; // Ignore unchanged ratios

    if (oldRatio === newRatio) return;

    for (var i = 0; i < this.thresholds.length; i++) {
      var threshold = this.thresholds[i]; // Return true if an entry matches a threshold or if the new ratio
      // and the old ratio are on the opposite sides of a threshold.

      if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
        return true;
      }
    }
  };
  /**
   * Returns whether or not the root element is an element and is in the DOM.
   * @return {boolean} True if the root element is an element and is in the DOM.
   * @private
   */


  IntersectionObserver.prototype._rootIsInDom = function () {
    return !this.root || containsDeep(document, this.root);
  };
  /**
   * Returns whether or not the target element is a child of root.
   * @param {Element} target The target element to check.
   * @return {boolean} True if the target element is a child of root.
   * @private
   */


  IntersectionObserver.prototype._rootContainsTarget = function (target) {
    return containsDeep(this.root || document, target);
  };
  /**
   * Adds the instance to the global IntersectionObserver registry if it isn't
   * already present.
   * @private
   */


  IntersectionObserver.prototype._registerInstance = function () {
    if (registry.indexOf(this) < 0) {
      registry.push(this);
    }
  };
  /**
   * Removes the instance from the global IntersectionObserver registry.
   * @private
   */


  IntersectionObserver.prototype._unregisterInstance = function () {
    var index = registry.indexOf(this);
    if (index != -1) registry.splice(index, 1);
  };
  /**
   * Returns the result of the performance.now() method or null in browsers
   * that don't support the API.
   * @return {number} The elapsed time since the page was requested.
   */


  function now() {
    return window.performance && performance.now && performance.now();
  }
  /**
   * Throttles a function and delays its executiong, so it's only called at most
   * once within a given time period.
   * @param {Function} fn The function to throttle.
   * @param {number} timeout The amount of time that must pass before the
   *     function can be called again.
   * @return {Function} The throttled function.
   */


  function throttle(fn, timeout) {
    var timer = null;
    return function () {
      if (!timer) {
        timer = setTimeout(function () {
          fn();
          timer = null;
        }, timeout);
      }
    };
  }
  /**
   * Adds an event handler to a DOM node ensuring cross-browser compatibility.
   * @param {Node} node The DOM node to add the event handler to.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to add.
   * @param {boolean} opt_useCapture Optionally adds the even to the capture
   *     phase. Note: this only works in modern browsers.
   */


  function addEvent(node, event, fn, opt_useCapture) {
    if (typeof node.addEventListener == 'function') {
      node.addEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.attachEvent == 'function') {
      node.attachEvent('on' + event, fn);
    }
  }
  /**
   * Removes a previously added event handler from a DOM node.
   * @param {Node} node The DOM node to remove the event handler from.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to remove.
   * @param {boolean} opt_useCapture If the event handler was added with this
   *     flag set to true, it should be set to true here in order to remove it.
   */


  function removeEvent(node, event, fn, opt_useCapture) {
    if (typeof node.removeEventListener == 'function') {
      node.removeEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.detatchEvent == 'function') {
      node.detatchEvent('on' + event, fn);
    }
  }
  /**
   * Returns the intersection between two rect objects.
   * @param {Object} rect1 The first rect.
   * @param {Object} rect2 The second rect.
   * @return {?Object} The intersection rect or undefined if no intersection
   *     is found.
   */


  function computeRectIntersection(rect1, rect2) {
    var top = Math.max(rect1.top, rect2.top);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var left = Math.max(rect1.left, rect2.left);
    var right = Math.min(rect1.right, rect2.right);
    var width = right - left;
    var height = bottom - top;
    return width >= 0 && height >= 0 && {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      width: width,
      height: height
    };
  }
  /**
   * Shims the native getBoundingClientRect for compatibility with older IE.
   * @param {Element} el The element whose bounding rect to get.
   * @return {Object} The (possibly shimmed) rect of the element.
   */


  function getBoundingClientRect(el) {
    var rect;

    try {
      rect = el.getBoundingClientRect();
    } catch (err) {// Ignore Windows 7 IE11 "Unspecified error"
      // https://github.com/w3c/IntersectionObserver/pull/205
    }

    if (!rect) return getEmptyRect(); // Older IE

    if (!(rect.width && rect.height)) {
      rect = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    }

    return rect;
  }
  /**
   * Returns an empty rect object. An empty rect is returned when an element
   * is not in the DOM.
   * @return {Object} The empty rect.
   */


  function getEmptyRect() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  /**
   * Checks to see if a parent element contains a child elemnt (including inside
   * shadow DOM).
   * @param {Node} parent The parent element.
   * @param {Node} child The child element.
   * @return {boolean} True if the parent node contains the child node.
   */


  function containsDeep(parent, child) {
    var node = child;

    while (node) {
      if (node == parent) return true;
      node = getParentNode(node);
    }

    return false;
  }
  /**
   * Gets the parent node of an element or its host element if the parent node
   * is a shadow root.
   * @param {Node} node The node whose parent to get.
   * @return {Node|null} The parent node or null if no parent exists.
   */


  function getParentNode(node) {
    var parent = node.parentNode;

    if (parent && parent.nodeType == 11 && parent.host) {
      // If the parent is a shadow root, return the host element.
      return parent.host;
    }

    return parent;
  } // Exposes the constructors globally.


  window.IntersectionObserver = IntersectionObserver;
  window.IntersectionObserverEntry = IntersectionObserverEntry;
})(window, document);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */

/**
 * @namespace ScrollMagic
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.ScrollMagic = factory();
  }
})(void 0, function () {
  "use strict";

  var ScrollMagic = function ScrollMagic() {
    _util.log(2, '(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use \'new ScrollMagic.Controller()\' to create a new controller instance. Use \'new ScrollMagic.Scene()\' to instance a scene.');
  };

  ScrollMagic.version = "2.0.5"; // global const

  var PIN_SPACER_ATTRIBUTE = "data-scrollmagic-pin-spacer"; // passiveSupported

  var passiveSupported = false;

  try {
    var options = Object.defineProperty({}, "passive", {
      get: function get() {
        passiveSupported = true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }

  var passive = passiveSupported ? {
    passive: true
  } : false; // TODO: temporary workaround for chrome's scroll jitter bug

  window.addEventListener("mousewheel", function () {}, passive);
  /**
   * The main class that is needed once per scroll container.
   *
   * @class
   *
   * @example
   * // basic initialization
   * var controller = new ScrollMagic.Controller();
   *
   * // passing options
   * var controller = new ScrollMagic.Controller({container: "#myContainer", loglevel: 3});
   *
   * @param {object} [options] - An object containing one or more options for the controller.
   * @param {(string|object)} [options.container=window] - A selector, DOM object that references the main container for scrolling.
   * @param {boolean} [options.vertical=true] - Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
   * @param {object} [options.globalSceneOptions={}] - These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see {@link ScrollMagic.Scene}.
   * @param {number} [options.loglevel=2] Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
   ** `0` => silent
   ** `1` => errors
   ** `2` => errors, warnings
   ** `3` => errors, warnings, debuginfo
   * @param {boolean} [options.refreshInterval=100] - Some changes don't call events by default, like changing the container size or moving a scene trigger element.  
   This interval polls these parameters to fire the necessary events.  
   If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
   *
   */

  ScrollMagic.Controller = function (options) {
    /*
    	 * ----------------------------------------------------------------
    	 * settings
    	 * ----------------------------------------------------------------
    	 */
    var NAMESPACE = 'ScrollMagic.Controller',
        SCROLL_DIRECTION_FORWARD = 'FORWARD',
        SCROLL_DIRECTION_REVERSE = 'REVERSE',
        SCROLL_DIRECTION_PAUSED = 'PAUSED',
        DEFAULT_OPTIONS = CONTROLLER_OPTIONS.defaults;
    /*
    	 * ----------------------------------------------------------------
    	 * private vars
    	 * ----------------------------------------------------------------
    	 */

    var Controller = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _sceneObjects = [],
        _updateScenesOnNextCycle = false,
        // can be boolean (true => all scenes) or an array of scenes to be updated
    _scrollPos = 0,
        _scrollDirection = SCROLL_DIRECTION_PAUSED,
        _isDocument = true,
        _viewPortSize = 0,
        _enabled = true,
        _updateTimeout,
        _refreshTimeout;
    /*
    	 * ----------------------------------------------------------------
    	 * private functions
    	 * ----------------------------------------------------------------
    	 */

    /**
     * Internal constructor function of the ScrollMagic Controller
     * @private
     */


    var construct = function construct() {
      for (var key in _options) {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      }

      _options.container = _util.get.elements(_options.container)[0]; // check ScrollContainer

      if (!_options.container) {
        log(1, "ERROR creating object " + NAMESPACE + ": No valid scroll container supplied");
        throw NAMESPACE + " init failed."; // cancel
      }

      _isDocument = _options.container === window || _options.container === document.body || !document.body.contains(_options.container); // normalize to window

      if (_isDocument) {
        _options.container = window;
      } // update container size immediately


      _viewPortSize = getViewportSize(); // set event handlers

      _options.container.addEventListener("resize", onChange, passive);

      _options.container.addEventListener("scroll", onChange, passive);

      var ri = parseInt(_options.refreshInterval, 10);
      _options.refreshInterval = _util.type.Number(ri) ? ri : DEFAULT_OPTIONS.refreshInterval;
      scheduleRefresh();
      log(3, "added new " + NAMESPACE + " controller (v" + ScrollMagic.version + ")");
    };
    /**
     * Schedule the next execution of the refresh function
     * @private
     */


    var scheduleRefresh = function scheduleRefresh() {
      if (_options.refreshInterval > 0) {
        _refreshTimeout = window.setTimeout(refresh, _options.refreshInterval);
      }
    };
    /**
     * Default function to get scroll pos - overwriteable using `Controller.scrollPos(newFunction)`
     * @private
     */


    var getScrollPos = function getScrollPos() {
      return _options.vertical ? _util.get.scrollTop(_options.container) : _util.get.scrollLeft(_options.container);
    };
    /**
     * Returns the current viewport Size (width vor horizontal, height for vertical)
     * @private
     */


    var getViewportSize = function getViewportSize() {
      // TIPI EDIT
      return _options.vertical ? _options.container === window ? document.documentElement.clientHeight : _util.get.height(_options.container) : _util.get.width(_options.container);
    };
    /**
     * Default function to set scroll pos - overwriteable using `Controller.scrollTo(newFunction)`
     * Make available publicly for pinned mousewheel workaround.
     * @private
     */


    var setScrollPos = this._setScrollPos = function (pos) {
      if (_options.vertical) {
        if (_isDocument) {
          window.scrollTo(_util.get.scrollLeft(), pos);
        } else {
          _options.container.scrollTop = pos;
        }
      } else {
        if (_isDocument) {
          window.scrollTo(pos, _util.get.scrollTop());
        } else {
          _options.container.scrollLeft = pos;
        }
      }
    };
    /**
     * Handle updates in cycles instead of on scroll (performance)
     * @private
     */


    var updateScenes = function updateScenes() {
      if (_enabled && _updateScenesOnNextCycle) {
        // determine scenes to update
        var scenesToUpdate = _util.type.Array(_updateScenesOnNextCycle) ? _updateScenesOnNextCycle : _sceneObjects.slice(0); // reset scenes

        _updateScenesOnNextCycle = false;
        var oldScrollPos = _scrollPos; // update scroll pos now instead of onChange, as it might have changed since scheduling (i.e. in-browser smooth scroll)

        _scrollPos = Controller.scrollPos();
        var deltaScroll = _scrollPos - oldScrollPos;

        if (deltaScroll !== 0) {
          // scroll position changed?
          _scrollDirection = deltaScroll > 0 ? SCROLL_DIRECTION_FORWARD : SCROLL_DIRECTION_REVERSE;
        } // reverse order of scenes if scrolling reverse


        if (_scrollDirection === SCROLL_DIRECTION_REVERSE) {
          scenesToUpdate.reverse();
        } // update scenes


        scenesToUpdate.forEach(function (scene, index) {
          log(3, "updating Scene " + (index + 1) + "/" + scenesToUpdate.length + " (" + _sceneObjects.length + " total)");
          scene.update(true);
        });

        if (scenesToUpdate.length === 0 && _options.loglevel >= 3) {
          log(3, "updating 0 Scenes (nothing added to controller)");
        }
      }
    };
    /**
     * Initializes rAF callback
     * @private
     */


    var debounceUpdate = function debounceUpdate() {
      _updateTimeout = _util.rAF(updateScenes);
    };
    /**
     * Handles Container changes
     * @private
     */


    var onChange = function onChange(e) {
      log(3, "event fired causing an update:", e.type);

      if (e.type == "resize") {
        // resize
        _viewPortSize = getViewportSize();
        _scrollDirection = SCROLL_DIRECTION_PAUSED;
      } // schedule update


      if (_updateScenesOnNextCycle !== true) {
        _updateScenesOnNextCycle = true;
        debounceUpdate();
      }
    };

    var refresh = function refresh() {
      if (!_isDocument) {
        // simulate resize event. Only works for viewport relevant param (performance)
        if (_viewPortSize != getViewportSize()) {
          var resizeEvent;

          try {
            resizeEvent = new Event('resize', {
              bubbles: false,
              cancelable: false
            });
          } catch (e) {
            // stupid IE
            resizeEvent = document.createEvent("Event");
            resizeEvent.initEvent("resize", false, false);
          }

          _options.container.dispatchEvent(resizeEvent);
        }
      }

      _sceneObjects.forEach(function (scene, index) {
        // refresh all scenes
        scene.refresh();
      });

      scheduleRefresh();
    };
    /**
     * Send a debug message to the console.
     * provided publicly with _log for plugins
     * @private
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */


    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    }; // for scenes we have getters for each option, but for the controller we don't, so we need to make it available externally for plugins


    this._options = _options;
    /**
     * Sort scenes in ascending order of their start offset.
     * @private
     *
     * @param {array} ScenesArray - an array of ScrollMagic Scenes that should be sorted
     * @return {array} The sorted array of Scenes.
     */

    var sortScenes = function sortScenes(ScenesArray) {
      if (ScenesArray.length <= 1) {
        return ScenesArray;
      } else {
        var scenes = ScenesArray.slice(0);
        scenes.sort(function (a, b) {
          return a.scrollOffset() > b.scrollOffset() ? 1 : -1;
        });
        return scenes;
      }
    };
    /**
     * ----------------------------------------------------------------
     * public functions
     * ----------------------------------------------------------------
     */

    /**
     * Add one ore more scene(s) to the controller.  
     * This is the equivalent to `Scene.addTo(controller)`.
     * @public
     * @example
     * // with a previously defined scene
     * controller.addScene(scene);
     *
     * // with a newly created scene.
     * controller.addScene(new ScrollMagic.Scene({duration : 0}));
     *
     * // adding multiple scenes
     * controller.addScene([scene, scene2, new ScrollMagic.Scene({duration : 0})]);
     *
     * @param {(ScrollMagic.Scene|array)} newScene - ScrollMagic Scene or Array of Scenes to be added to the controller.
     * @return {Controller} Parent object for chaining.
     */


    this.addScene = function (newScene) {
      if (_util.type.Array(newScene)) {
        newScene.forEach(function (scene, index) {
          Controller.addScene(scene);
        });
      } else if (newScene instanceof ScrollMagic.Scene) {
        if (newScene.controller() !== Controller) {
          newScene.addTo(Controller);
        } else if (_sceneObjects.indexOf(newScene) < 0) {
          // new scene
          _sceneObjects.push(newScene); // add to array


          _sceneObjects = sortScenes(_sceneObjects); // sort

          newScene.on("shift.controller_sort", function () {
            // resort whenever scene moves
            _sceneObjects = sortScenes(_sceneObjects);
          }); // insert Global defaults.

          for (var key in _options.globalSceneOptions) {
            if (newScene[key]) {
              newScene[key].call(newScene, _options.globalSceneOptions[key]);
            }
          }

          log(3, "adding Scene (now " + _sceneObjects.length + " total)");
        }
      } else {
        log(1, "ERROR: invalid argument supplied for '.addScene()'");
      }

      return Controller;
    };
    /**
     * Remove one ore more scene(s) from the controller.  
     * This is the equivalent to `Scene.remove()`.
     * @public
     * @example
     * // remove a scene from the controller
     * controller.removeScene(scene);
     *
     * // remove multiple scenes from the controller
     * controller.removeScene([scene, scene2, scene3]);
     *
     * @param {(ScrollMagic.Scene|array)} Scene - ScrollMagic Scene or Array of Scenes to be removed from the controller.
     * @returns {Controller} Parent object for chaining.
     */


    this.removeScene = function (Scene) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.removeScene(scene);
        });
      } else {
        var index = _sceneObjects.indexOf(Scene);

        if (index > -1) {
          Scene.off("shift.controller_sort");

          _sceneObjects.splice(index, 1);

          log(3, "removing Scene (now " + _sceneObjects.length + " left)");
          Scene.remove();
        }
      }

      return Controller;
    };
    /**
     * Update one ore more scene(s) according to the scroll position of the container.  
     * This is the equivalent to `Scene.update()`.  
     * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
     * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.  
     * _**Note:** This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
     * @public
     * @example
     * // update a specific scene on next cycle
     * controller.updateScene(scene);
     *
     * // update a specific scene immediately
     * controller.updateScene(scene, true);
     *
     * // update multiple scenes scene on next cycle
     * controller.updateScene([scene1, scene2, scene3]);
     *
     * @param {ScrollMagic.Scene} Scene - ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle.  
     This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
     * @return {Controller} Parent object for chaining.
     */


    this.updateScene = function (Scene, immediately) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.updateScene(scene, immediately);
        });
      } else {
        if (immediately) {
          Scene.update(true);
        } else if (_updateScenesOnNextCycle !== true && Scene instanceof ScrollMagic.Scene) {
          // if _updateScenesOnNextCycle is true, all connected scenes are already scheduled for update
          // prep array for next update cycle
          _updateScenesOnNextCycle = _updateScenesOnNextCycle || [];

          if (_updateScenesOnNextCycle.indexOf(Scene) == -1) {
            _updateScenesOnNextCycle.push(Scene);
          }

          _updateScenesOnNextCycle = sortScenes(_updateScenesOnNextCycle); // sort

          debounceUpdate();
        }
      }

      return Controller;
    };
    /**
     * Updates the controller params and calls updateScene on every scene, that is attached to the controller.  
     * See `Controller.updateScene()` for more information about what this means.  
     * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.  
     * The only application for this method is when ScrollMagic fails to detect these events.  
     * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes.
     * For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
     * @public
     * @example
     * // update the controller on next cycle (saves performance due to elimination of redundant updates)
     * controller.update();
     *
     * // update the controller immediately
     * controller.update(true);
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
     * @return {Controller} Parent object for chaining.
     */


    this.update = function (immediately) {
      onChange({
        type: "resize"
      }); // will update size and set _updateScenesOnNextCycle to true

      if (immediately) {
        updateScenes();
      }

      return Controller;
    };
    /**
     * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.  
     * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
     * @public
     *
     * @since 1.1.0
     * @example
     * // scroll to an offset of 100
     * controller.scrollTo(100);
     *
     * // scroll to a DOM element
     * controller.scrollTo("#anchor");
     *
     * // scroll to the beginning of a scene
     * var scene = new ScrollMagic.Scene({offset: 200});
     * controller.scrollTo(scene);
     *
     * // define a new scroll position modification function (jQuery animate instead of jump)
     * controller.scrollTo(function (newScrollPos) {
     *	$("html, body").animate({scrollTop: newScrollPos});
     * });
     * controller.scrollTo(100); // call as usual, but the new function will be used instead
     *
     * // define a new scroll function with an additional parameter
     * controller.scrollTo(function (newScrollPos, message) {
     *  console.log(message);
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter to the defined custom function
     * controller.scrollTo(100, "my message");
     *
     * // define a new scroll function with an additional parameter containing multiple variables
     * controller.scrollTo(function (newScrollPos, options) {
     *  someGlobalVar = options.a + options.b;
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter containing multiple options
     * controller.scrollTo(100, {a: 1, b: 2});
     *
     * // define a new scroll function with a callback supplied as an additional parameter
     * controller.scrollTo(function (newScrollPos, callback) {
     *	$(this).animate({scrollTop: newScrollPos}, 400, "swing", callback);
     * });
     * // call as usual, but supply an extra parameter, which is used as a callback in the previously defined custom scroll function
     * controller.scrollTo(100, function() {
     *	console.log("scroll has finished.");
     * });
     *
     * @param {mixed} scrollTarget - The supplied argument can be one of these types:
     * 1. `number` -> The container will scroll to this new scroll offset.
     * 2. `string` or `object` -> Can be a selector or a DOM object.  
     *  The container will scroll to the position of this element.
     * 3. `ScrollMagic Scene` -> The container will scroll to the start of this scene.
     * 4. `function` -> This function will be used for future scroll position modifications.  
     *  This provides a way for you to change the behaviour of scrolling and adding new behaviour like animation. The function receives the new scroll position as a parameter and a reference to the container element using `this`.  
     *  It may also optionally receive an optional additional parameter (see below)  
     *  _**NOTE:**  
     *  All other options will still work as expected, using the new function to scroll._
     * @param {mixed} [additionalParameter] - If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
     * @returns {Controller} Parent object for chaining.
     */


    this.scrollTo = function (scrollTarget, additionalParameter) {
      if (_util.type.Number(scrollTarget)) {
        // excecute
        setScrollPos.call(_options.container, scrollTarget, additionalParameter);
      } else if (scrollTarget instanceof ScrollMagic.Scene) {
        // scroll to scene
        if (scrollTarget.controller() === Controller) {
          // check if the controller is associated with this scene
          Controller.scrollTo(scrollTarget.scrollOffset(), additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", scrollTarget);
        }
      } else if (_util.type.Function(scrollTarget)) {
        // assign new scroll function
        setScrollPos = scrollTarget;
      } else {
        // scroll to element
        var elem = _util.get.elements(scrollTarget)[0];

        if (elem) {
          // if parent is pin spacer, use spacer position instead so correct start position is returned for pinned elements.
          while (elem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            elem = elem.parentNode;
          }

          var param = _options.vertical ? "top" : "left",
              // which param is of interest ?
          containerOffset = _util.get.offset(_options.container),
              // container position is needed because element offset is returned in relation to document, not in relation to container.
          elementOffset = _util.get.offset(elem);

          if (!_isDocument) {
            // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
            containerOffset[param] -= Controller.scrollPos();
          }

          Controller.scrollTo(elementOffset[param] - containerOffset[param], additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", scrollTarget);
        }
      }

      return Controller;
    };
    /**
     * **Get** the current scrollPosition or **Set** a new method to calculate it.  
     * -> **GET**:
     * When used as a getter this function will return the current scroll position.  
     * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.  
     * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
     *
     * -> **SET**:
     * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.  
     * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.  
     * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.  
     * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.  
     * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
     *
     * To change the current scroll position please use `Controller.scrollTo()`.
     * @public
     *
     * @example
     * // get the current scroll Position
     * var scrollPos = controller.scrollPos();
     *
     * // set a new scroll position calculation method
     * controller.scrollPos(function () {
     *	return this.info("vertical") ? -mychildcontainer.y : -mychildcontainer.x
     * });
     *
     * @param {function} [scrollPosMethod] - The function to be used for the scroll position calculation of the container.
     * @returns {(number|Controller)} Current scroll position or parent object for chaining.
     */


    this.scrollPos = function (scrollPosMethod) {
      if (!arguments.length) {
        // get
        return getScrollPos.call(Controller);
      } else {
        // set
        if (_util.type.Function(scrollPosMethod)) {
          getScrollPos = scrollPosMethod;
        } else {
          log(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.");
        }
      }

      return Controller;
    };
    /**
     * **Get** all infos or one in particular about the controller.
     * @public
     * @example
     * // returns the current scroll position (number)
     * var scrollPos = controller.info("scrollPos");
     *
     * // returns all infos as an object
     * var infos = controller.info();
     *
     * @param {string} [about] - If passed only this info will be returned instead of an object containing all.  
     Valid options are:
     ** `"size"` => the current viewport size of the container
     ** `"vertical"` => true if vertical scrolling, otherwise false
     ** `"scrollPos"` => the current scroll position
     ** `"scrollDirection"` => the last known direction of the scroll
     ** `"container"` => the container element
     ** `"isDocument"` => true if container element is the document.
     * @returns {(mixed|object)} The requested info(s).
     */


    this.info = function (about) {
      var values = {
        size: _viewPortSize,
        // contains height or width (in regard to orientation);
        vertical: _options.vertical,
        scrollPos: _scrollPos,
        scrollDirection: _scrollDirection,
        container: _options.container,
        isDocument: _isDocument
      };

      if (!arguments.length) {
        // get all as an object
        return values;
      } else if (values[about] !== undefined) {
        return values[about];
      } else {
        log(1, "ERROR: option \"" + about + "\" is not available");
        return;
      }
    };
    /**
     * **Get** or **Set** the current loglevel option value.
     * @public
     *
     * @example
     * // get the current value
     * var loglevel = controller.loglevel();
     *
     * // set a new value
     * controller.loglevel(3);
     *
     * @param {number} [newLoglevel] - The new loglevel setting of the Controller. `[0-3]`
     * @returns {(number|Controller)} Current loglevel or parent object for chaining.
     */


    this.loglevel = function (newLoglevel) {
      if (!arguments.length) {
        // get
        return _options.loglevel;
      } else if (_options.loglevel != newLoglevel) {
        // set
        _options.loglevel = newLoglevel;
      }

      return Controller;
    };
    /**
     * **Get** or **Set** the current enabled state of the controller.  
     * This can be used to disable all Scenes connected to the controller without destroying or removing them.
     * @public
     *
     * @example
     * // get the current value
     * var enabled = controller.enabled();
     *
     * // disable the controller
     * controller.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the controller `true` or `false`.
     * @returns {(boolean|Controller)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Controller.updateScene(_sceneObjects, true);
      }

      return Controller;
    };
    /**
     * Destroy the Controller, all Scenes and everything.
     * @public
     *
     * @example
     * // without resetting the scenes
     * controller = controller.destroy();
     *
     * // with scene reset
     * controller = controller.destroy(true);
     *
     * @param {boolean} [resetScenes=false] - If `true` the pins and tweens (if existent) of all scenes will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (resetScenes) {
      window.clearTimeout(_refreshTimeout);
      var i = _sceneObjects.length;

      while (i--) {
        _sceneObjects[i].destroy(resetScenes);
      }

      _options.container.removeEventListener("resize", onChange, passive);

      _options.container.removeEventListener("scroll", onChange, passive);

      _util.cAF(_updateTimeout);

      log(3, "destroyed " + NAMESPACE + " (reset: " + (resetScenes ? "true" : "false") + ")");
      return null;
    }; // INIT


    construct();
    return Controller;
  }; // store pagewide controller options


  var CONTROLLER_OPTIONS = {
    defaults: {
      container: window,
      vertical: true,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100
    }
  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   */

  ScrollMagic.Controller.addOption = function (name, defaultValue) {
    CONTROLLER_OPTIONS.defaults[name] = defaultValue;
  }; // instance extension function for plugins


  ScrollMagic.Controller.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Controller = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Controller, oldClass); // copy properties


    ScrollMagic.Controller.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Controller.prototype.constructor = ScrollMagic.Controller; // restore constructor
  };
  /**
   * A Scene defines where the controller should react and how.
   *
   * @class
   *
   * @example
   * // create a standard scene and add it to a controller
   * new ScrollMagic.Scene()
   *		.addTo(controller);
   *
   * // create a scene with custom options and assign a handler to it.
   * var scene = new ScrollMagic.Scene({
   * 		duration: 100,
   *		offset: 200,
   *		triggerHook: "onEnter",
   *		reverse: false
   * });
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.  
   Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers `globalSceneOptions` option. The object accepts the same properties as the ones below.  
   When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in `globalSceneOptions`.
   * @param {(number|function)} [options.duration=0] - The duration of the scene. 
   If `0` tweens will auto-play when reaching the scene start point, pins will be pinned indefinetly starting at the start position.  
   A function retuning the duration value is also supported. Please see `Scene.duration()` for details.
   * @param {number} [options.offset=0] - Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
   * @param {(string|object)} [options.triggerElement=null] - Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
   * @param {(number|string)} [options.triggerHook="onCenter"] - Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.  
   Can also be defined using a string:
   ** `"onEnter"` => `1`
   ** `"onCenter"` => `0.5`
   ** `"onLeave"` => `0`
   * @param {boolean} [options.reverse=true] - Should the scene reverse, when scrolling up?
   * @param {number} [options.loglevel=2] - Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
   ** `0` => silent
   ** `1` => errors
   ** `2` => errors, warnings
   ** `3` => errors, warnings, debuginfo
   * 
   */


  ScrollMagic.Scene = function (options) {
    /*
    	 * ----------------------------------------------------------------
    	 * settings
    	 * ----------------------------------------------------------------
    	 */
    var NAMESPACE = 'ScrollMagic.Scene',
        SCENE_STATE_BEFORE = 'BEFORE',
        SCENE_STATE_DURING = 'DURING',
        SCENE_STATE_AFTER = 'AFTER',
        DEFAULT_OPTIONS = SCENE_OPTIONS.defaults;
    /*
    	 * ----------------------------------------------------------------
    	 * private vars
    	 * ----------------------------------------------------------------
    	 */

    var Scene = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _state = SCENE_STATE_BEFORE,
        _progress = 0,
        _scrollOffset = {
      start: 0,
      end: 0
    },
        // reflects the controllers's scroll position for the start and end of the scene respectively
    _triggerPos = 0,
        _enabled = true,
        _durationUpdateMethod,
        _controller;
    /**
     * Internal constructor function of the ScrollMagic Scene
     * @private
     */


    var construct = function construct() {
      for (var key in _options) {
        // check supplied options
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      } // add getters/setters for all possible options


      for (var optionName in DEFAULT_OPTIONS) {
        addSceneOption(optionName);
      } // validate all options


      validateOption();
    };
    /*
     * ----------------------------------------------------------------
     * Event Management
     * ----------------------------------------------------------------
     */


    var _listeners = {};
    /**
     * Scene start event.  
     * Fires whenever the scroll position its the starting point of the scene.  
     * It will also fire when scrolling back up going over the start position of the scene. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#start
     *
     * @example
     * scene.on("start", function (event) {
     * 	console.log("Hit start point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene end event.  
     * Fires whenever the scroll position its the ending point of the scene.  
     * It will also fire when scrolling back up from after the scene and going over its end position. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#end
     *
     * @example
     * scene.on("end", function (event) {
     * 	console.log("Hit end point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene enter event.  
     * Fires whenever the scene enters the "DURING" state.  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#enter
     *
     * @example
     * scene.on("enter", function (event) {
     * 	console.log("Scene entered.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene - always `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene leave event.  
     * Fires whenever the scene's state goes from "DURING" to either "BEFORE" or "AFTER".  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene leaves its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#leave
     *
     * @example
     * scene.on("leave", function (event) {
     * 	console.log("Scene left.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene update event.  
     * Fires whenever the scene is updated (but not necessarily changes the progress).
     *
     * @event ScrollMagic.Scene#update
     *
     * @example
     * scene.on("update", function (event) {
     * 	console.log("Scene updated.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.startPos - The starting position of the scene (in relation to the conainer)
     * @property {number} event.endPos - The ending position of the scene (in relation to the conainer)
     * @property {number} event.scrollPos - The current scroll position of the container
     */

    /**
     * Scene progress event.  
     * Fires whenever the progress of the scene changes.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#progress
     *
     * @example
     * scene.on("progress", function (event) {
     * 	console.log("Scene progress changed to " + event.progress);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"`, `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene change event.  
     * Fires whenvever a property of the scene is changed.
     *
     * @event ScrollMagic.Scene#change
     *
     * @example
     * scene.on("change", function (event) {
     * 	console.log("Scene Property \"" + event.what + "\" changed to " + event.newval);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.what - Indicates what value has been changed
     * @property {mixed} event.newval - The new value of the changed property
     */

    /**
     * Scene shift event.  
     * Fires whenvever the start or end **scroll offset** of the scene change.
     * This happens explicitely, when one of these values change: `offset`, `duration` or `triggerHook`.
     * It will fire implicitly when the `triggerElement` changes, if the new element has a different position (most cases).
     * It will also fire implicitly when the size of the container changes and the triggerHook is anything other than `onLeave`.
     *
     * @event ScrollMagic.Scene#shift
     * @since 1.1.0
     *
     * @example
     * scene.on("shift", function (event) {
     * 	console.log("Scene moved, because the " + event.reason + " has changed.)");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.reason - Indicates why the scene has shifted
     */

    /**
     * Scene destroy event.  
     * Fires whenvever the scene is destroyed.
     * This can be used to tidy up custom behaviour used in events.
     *
     * @event ScrollMagic.Scene#destroy
     * @since 1.1.0
     *
     * @example
     * scene.on("enter", function (event) {
     *        // add custom action
     *        $("#my-elem").left("200");
     *      })
     *      .on("destroy", function (event) {
     *        // reset my element to start position
     *        if (event.reset) {
     *          $("#my-elem").left("0");
     *        }
     *      });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.reset - Indicates if the destroy method was called with reset `true` or `false`.
     */

    /**
     * Scene add event.  
     * Fires when the scene is added to a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#add
     * @since 2.0.0
     *
     * @example
     * scene.on("add", function (event) {
     * 	console.log('Scene was added to a new controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.controller - The controller object the scene was added to.
     */

    /**
     * Scene remove event.  
     * Fires when the scene is removed from a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#remove
     * @since 2.0.0
     *
     * @example
     * scene.on("remove", function (event) {
     * 	console.log('Scene was removed from its controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     */

    /**
     * Add one ore more event listener.  
     * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
     * @method ScrollMagic.Scene#on
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update progress start end enter leave", callback);
     *
     * @param {string} names - The name or names of the event the callback should be attached to.
     * @param {function} callback - A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */

    this.on = function (names, callback) {
      if (_util.type.Function(callback)) {
        names = names.trim().split(' ');
        names.forEach(function (fullname) {
          var nameparts = fullname.split('.'),
              eventname = nameparts[0],
              namespace = nameparts[1];

          if (eventname != "*") {
            // disallow wildcards
            if (!_listeners[eventname]) {
              _listeners[eventname] = [];
            }

            _listeners[eventname].push({
              namespace: namespace || '',
              callback: callback
            });
          }
        });
      } else {
        log(1, "ERROR when calling '.on()': Supplied callback for '" + names + "' is not a valid function!");
      }

      return Scene;
    };
    /**
     * Remove one or more event listener.
     * @method ScrollMagic.Scene#off
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update", callback);
     * // remove listeners
     * scene.off("change update", callback);
     *
     * @param {string} names - The name or names of the event that should be removed.
     * @param {function} [callback] - A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.off = function (names, callback) {
      if (!names) {
        log(1, "ERROR: Invalid event name supplied.");
        return Scene;
      }

      names = names.trim().split(' ');
      names.forEach(function (fullname, key) {
        var nameparts = fullname.split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1] || '',
            removeList = eventname === '*' ? Object.keys(_listeners) : [eventname];
        removeList.forEach(function (remove) {
          var list = _listeners[remove] || [],
              i = list.length;

          while (i--) {
            var listener = list[i];

            if (listener && (namespace === listener.namespace || namespace === '*') && (!callback || callback == listener.callback)) {
              list.splice(i, 1);
            }
          }

          if (!list.length) {
            delete _listeners[remove];
          }
        });
      });
      return Scene;
    };
    /**
     * Trigger an event.
     * @method ScrollMagic.Scene#trigger
     *
     * @example
     * this.trigger("change");
     *
     * @param {string} name - The name of the event that should be triggered.
     * @param {object} [vars] - An object containing info that should be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */


    this.trigger = function (name, vars) {
      if (name) {
        var nameparts = name.trim().split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1],
            listeners = _listeners[eventname];
        log(3, 'event fired:', eventname, vars ? "->" : '', vars || '');

        if (listeners) {
          listeners.forEach(function (listener, key) {
            if (!namespace || namespace === listener.namespace) {
              listener.callback.call(Scene, new ScrollMagic.Event(eventname, listener.namespace, Scene, vars));
            }
          });
        }
      } else {
        log(1, "ERROR: Invalid event name supplied.");
      }

      return Scene;
    }; // set event listeners


    Scene.on("change.internal", function (e) {
      if (e.what !== "loglevel" && e.what !== "tweenChanges") {
        // no need for a scene update scene with these options...
        if (e.what === "triggerElement") {
          updateTriggerElementPosition();
        } else if (e.what === "reverse") {
          // the only property left that may have an impact on the current scene state. Everything else is handled by the shift event.
          Scene.update();
        }
      }
    }).on("shift.internal", function (e) {
      updateScrollOffset();
      Scene.update(); // update scene to reflect new position
    });
    /**
     * Send a debug message to the console.
     * @private
     * but provided publicly with _log for plugins
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */

    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    };
    /**
     * Add the scene to a controller.  
     * This is the equivalent to `Controller.addScene(scene)`.
     * @method ScrollMagic.Scene#addTo
     *
     * @example
     * // add a scene to a ScrollMagic Controller
     * scene.addTo(controller);
     *
     * @param {ScrollMagic.Controller} controller - The controller to which the scene should be added.
     * @returns {Scene} Parent object for chaining.
     */


    this.addTo = function (controller) {
      if (!(controller instanceof ScrollMagic.Controller)) {
        log(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller");
      } else if (_controller != controller) {
        // new controller
        if (_controller) {
          // was associated to a different controller before, so remove it...
          _controller.removeScene(Scene);
        }

        _controller = controller;
        validateOption();
        updateDuration(true);
        updateTriggerElementPosition(true);
        updateScrollOffset();

        _controller.info("container").addEventListener('resize', onContainerResize);

        controller.addScene(Scene);
        Scene.trigger("add", {
          controller: _controller
        });
        log(3, "added " + NAMESPACE + " to controller");
        Scene.update();
      }

      return Scene;
    };
    /**
     * **Get** or **Set** the current enabled state of the scene.  
     * This can be used to disable this scene without removing or destroying it.
     * @method ScrollMagic.Scene#enabled
     *
     * @example
     * // get the current value
     * var enabled = scene.enabled();
     *
     * // disable the scene
     * scene.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the scene `true` or `false`.
     * @returns {(boolean|Scene)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Scene.update(true);
      }

      return Scene;
    };
    /**
     * Remove the scene from the controller.  
     * This is the equivalent to `Controller.removeScene(scene)`.
     * The scene will not be updated anymore until you readd it to a controller.
     * To remove the pin or the tween you need to call removeTween() or removePin() respectively.
     * @method ScrollMagic.Scene#remove
     * @example
     * // remove the scene from its controller
     * scene.remove();
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.remove = function () {
      if (_controller) {
        _controller.info("container").removeEventListener('resize', onContainerResize);

        var tmpParent = _controller;
        _controller = undefined;
        tmpParent.removeScene(Scene);
        Scene.trigger("remove");
        log(3, "removed " + NAMESPACE + " from controller");
      }

      return Scene;
    };
    /**
     * Destroy the scene and everything.
     * @method ScrollMagic.Scene#destroy
     * @example
     * // destroy the scene without resetting the pin and tween to their initial positions
     * scene = scene.destroy();
     *
     * // destroy the scene and reset the pin and tween
     * scene = scene.destroy(true);
     *
     * @param {boolean} [reset=false] - If `true` the pin and tween (if existent) will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (reset) {
      Scene.trigger("destroy", {
        reset: reset
      });
      Scene.remove();
      Scene.triggerElement(null);
      Scene.off("*.*");
      log(3, "destroyed " + NAMESPACE + " (reset: " + (reset ? "true" : "false") + ")");
      return null;
    };
    /**
     * Updates the Scene to reflect the current state.  
     * This is the equivalent to `Controller.updateScene(scene, immediately)`.  
     * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
     * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
     * This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.  
     * _**NOTE:** This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
     * @method ScrollMagic.Scene#update
     * @example
     * // update the scene on next tick
     * scene.update();
     *
     * // update the scene immediately
     * scene.update(true);
     *
     * @fires Scene.update
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
     * @returns {Scene} Parent object for chaining.
     */


    this.update = function (immediately) {
      if (_controller) {
        if (immediately) {
          if (_controller.enabled() && _enabled) {
            var scrollPos = _controller.info("scrollPos"),
                newProgress;

            if (_options.duration > 0) {
              newProgress = (scrollPos - _scrollOffset.start) / (_scrollOffset.end - _scrollOffset.start);
            } else {
              newProgress = scrollPos >= _scrollOffset.start ? 1 : 0;
            }

            Scene.trigger("update", {
              startPos: _scrollOffset.start,
              endPos: _scrollOffset.end,
              scrollPos: scrollPos
            });
            Scene.progress(newProgress);
          } else if (_pin && _state === SCENE_STATE_DURING) {
            updatePinState(true); // unpin in position
          }
        } else {
          _controller.updateScene(Scene, false);
        }
      }

      return Scene;
    };
    /**
     * Updates dynamic scene variables like the trigger element position or the duration.
     * This method is automatically called in regular intervals from the controller. See {@link ScrollMagic.Controller} option `refreshInterval`.
     * 
     * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement.
     * If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
     *
     * @method ScrollMagic.Scene#refresh
     * @since 1.1.0
     * @example
     * scene = new ScrollMagic.Scene({triggerElement: "#trigger"});
     * 
     * // change the position of the trigger
     * $("#trigger").css("top", 500);
     * // immediately let the scene know of this change
     * scene.refresh();
     *
     * @fires {@link Scene.shift}, if the trigger element position or the duration changed
     * @fires {@link Scene.change}, if the duration changed
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.refresh = function () {
      updateDuration();
      updateTriggerElementPosition(); // update trigger element position

      return Scene;
    };
    /**
     * **Get** or **Set** the scene's progress.  
     * Usually it shouldn't be necessary to use this as a setter, as it is set automatically by scene.update().  
     * The order in which the events are fired depends on the duration of the scene:
     *  1. Scenes with `duration == 0`:  
     *  Scenes that have no duration by definition have no ending. Thus the `end` event will never be fired.  
     *  When the trigger position of the scene is passed the events are always fired in this order:  
     *  `enter`, `start`, `progress` when scrolling forward  
     *  and  
     *  `progress`, `start`, `leave` when scrolling in reverse
     *  2. Scenes with `duration > 0`:  
     *  Scenes with a set duration have a defined start and end point.  
     *  When scrolling past the start position of the scene it will fire these events in this order:  
     *  `enter`, `start`, `progress`  
     *  When continuing to scroll and passing the end point it will fire these events:  
     *  `progress`, `end`, `leave`  
     *  When reversing through the end point these events are fired:  
     *  `enter`, `end`, `progress`  
     *  And when continuing to scroll past the start position in reverse it will fire:  
     *  `progress`, `start`, `leave`  
     *  In between start and end the `progress` event will be called constantly, whenever the progress changes.
     * 
     * In short:  
     * `enter` events will always trigger **before** the progress update and `leave` envents will trigger **after** the progress update.  
     * `start` and `end` will always trigger at their respective position.
     * 
     * Please review the event descriptions for details on the events and the event object that is passed to the callback.
     * 
     * @method ScrollMagic.Scene#progress
     * @example
     * // get the current scene progress
     * var progress = scene.progress();
     *
     * // set new scene progress
     * scene.progress(0.3);
     *
     * @fires {@link Scene.enter}, when used as setter
     * @fires {@link Scene.start}, when used as setter
     * @fires {@link Scene.progress}, when used as setter
     * @fires {@link Scene.end}, when used as setter
     * @fires {@link Scene.leave}, when used as setter
     *
     * @param {number} [progress] - The new progress value of the scene `[0-1]`.
     * @returns {number} `get` -  Current scene progress.
     * @returns {Scene} `set` -  Parent object for chaining.
     */


    this.progress = function (progress) {
      if (!arguments.length) {
        // get
        return _progress;
      } else {
        // set
        var doUpdate = false,
            oldState = _state,
            scrollDirection = _controller ? _controller.info("scrollDirection") : 'PAUSED',
            reverseOrForward = _options.reverse || progress >= _progress;

        if (_options.duration === 0) {
          // zero duration scenes
          doUpdate = _progress != progress;
          _progress = progress < 1 && reverseOrForward ? 0 : 1;
          _state = _progress === 0 ? SCENE_STATE_BEFORE : SCENE_STATE_DURING;
        } else {
          // scenes with start and end
          if (progress < 0 && _state !== SCENE_STATE_BEFORE && reverseOrForward) {
            // go back to initial state
            _progress = 0;
            _state = SCENE_STATE_BEFORE;
            doUpdate = true;
          } else if (progress >= 0 && progress < 1 && reverseOrForward) {
            _progress = progress;
            _state = SCENE_STATE_DURING;
            doUpdate = true;
          } else if (progress >= 1 && _state !== SCENE_STATE_AFTER) {
            _progress = 1;
            _state = SCENE_STATE_AFTER;
            doUpdate = true;
          } else if (_state === SCENE_STATE_DURING && !reverseOrForward) {
            updatePinState(); // in case we scrolled backwards mid-scene and reverse is disabled => update the pin position, so it doesn't move back as well.
          }
        }

        if (doUpdate) {
          // fire events
          var eventVars = {
            progress: _progress,
            state: _state,
            scrollDirection: scrollDirection
          },
              stateChanged = _state != oldState;

          var trigger = function trigger(eventName) {
            // tmp helper to simplify code
            Scene.trigger(eventName, eventVars);
          };

          if (stateChanged) {
            // enter events
            if (oldState !== SCENE_STATE_DURING) {
              trigger("enter");
              trigger(oldState === SCENE_STATE_BEFORE ? "start" : "end");
            }
          }

          trigger("progress");

          if (stateChanged) {
            // leave events
            if (_state !== SCENE_STATE_DURING) {
              trigger(_state === SCENE_STATE_BEFORE ? "start" : "end");
              trigger("leave");
            }
          }
        }

        return Scene;
      }
    };
    /**
     * Update the start and end scrollOffset of the container.
     * The positions reflect what the controller's scroll position will be at the start and end respectively.
     * Is called, when:
     *   - Scene event "change" is called with: offset, triggerHook, duration 
     *   - scroll container event "resize" is called
     *   - the position of the triggerElement changes
     *   - the controller changes -> addTo()
     * @private
     */


    var updateScrollOffset = function updateScrollOffset() {
      _scrollOffset = {
        start: _triggerPos + _options.offset
      };

      if (_controller && _options.triggerElement) {
        // take away triggerHook portion to get relative to top
        _scrollOffset.start -= _controller.info("size") * _options.triggerHook;
      }

      _scrollOffset.end = _scrollOffset.start + _options.duration;
    };
    /**
     * Updates the duration if set to a dynamic function.
     * This method is called when the scene is added to a controller and in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.change}, if the duration changed
     * @fires {@link Scene.shift}, if the duration changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateDuration = function updateDuration(suppressEvents) {
      // update duration
      if (_durationUpdateMethod) {
        var varname = "duration";

        if (changeOption(varname, _durationUpdateMethod.call(Scene)) && !suppressEvents) {
          // set
          Scene.trigger("change", {
            what: varname,
            newval: _options[varname]
          });
          Scene.trigger("shift", {
            reason: varname
          });
        }
      }
    };
    /**
     * Updates the position of the triggerElement, if present.
     * This method is called ...
     *  - ... when the triggerElement is changed
     *  - ... when the scene is added to a (new) controller
     *  - ... in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.shift}, if the position changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateTriggerElementPosition = function updateTriggerElementPosition(suppressEvents) {
      var elementPos = 0,
          telem = _options.triggerElement;

      if (_controller && (telem || _triggerPos > 0)) {
        // either an element exists or was removed and the triggerPos is still > 0
        if (telem) {
          // there currently a triggerElement set
          if (telem.parentNode) {
            // check if element is still attached to DOM
            var controllerInfo = _controller.info(),
                containerOffset = _util.get.offset(controllerInfo.container),
                // container position is needed because element offset is returned in relation to document, not in relation to container.
            param = controllerInfo.vertical ? "top" : "left"; // which param is of interest ?
            // if parent is spacer, use spacer position instead so correct start position is returned for pinned elements.


            while (telem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
              telem = telem.parentNode;
            }

            var elementOffset = _util.get.offset(telem);

            if (!controllerInfo.isDocument) {
              // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
              containerOffset[param] -= _controller.scrollPos();
            }

            elementPos = elementOffset[param] - containerOffset[param];
          } else {
            // there was an element, but it was removed from DOM
            log(2, "WARNING: triggerElement was removed from DOM and will be reset to", undefined);
            Scene.triggerElement(undefined); // unset, so a change event is triggered
          }
        }

        var changed = elementPos != _triggerPos;
        _triggerPos = elementPos;

        if (changed && !suppressEvents) {
          Scene.trigger("shift", {
            reason: "triggerElementPosition"
          });
        }
      }
    };
    /**
     * Trigger a shift event, when the container is resized and the triggerHook is > 1.
     * @private
     */


    var onContainerResize = function onContainerResize(e) {
      if (_options.triggerHook > 0) {
        Scene.trigger("shift", {
          reason: "containerResize"
        });
      }
    };

    var _validate = _util.extend(SCENE_OPTIONS.validate, {
      // validation for duration handled internally for reference to private var _durationMethod
      duration: function duration(val) {
        if (_util.type.String(val) && val.match(/^(\.|\d)*\d+%$/)) {
          // percentage value
          var perc = parseFloat(val) / 100;

          val = function val() {
            return _controller ? _controller.info("size") * perc : 0;
          };
        }

        if (_util.type.Function(val)) {
          // function
          _durationUpdateMethod = val;

          try {
            val = parseFloat(_durationUpdateMethod());
          } catch (e) {
            val = -1; // will cause error below
          }
        } // val has to be float


        val = parseFloat(val);

        if (!_util.type.Number(val) || val < 0) {
          if (_durationUpdateMethod) {
            _durationUpdateMethod = undefined;
            throw ["Invalid return value of supplied function for option \"duration\":", val];
          } else {
            throw ["Invalid value for option \"duration\":", val];
          }
        }

        return val;
      }
    });
    /**
     * Checks the validity of a specific or all options and reset to default if neccessary.
     * @private
     */


    var validateOption = function validateOption(check) {
      check = arguments.length ? [check] : Object.keys(_validate);
      check.forEach(function (optionName, key) {
        var value;

        if (_validate[optionName]) {
          // there is a validation method for this option
          try {
            // validate value
            value = _validate[optionName](_options[optionName]);
          } catch (e) {
            // validation failed -> reset to default
            value = DEFAULT_OPTIONS[optionName];
            var logMSG = _util.type.String(e) ? [e] : e;

            if (_util.type.Array(logMSG)) {
              logMSG[0] = "ERROR: " + logMSG[0];
              logMSG.unshift(1); // loglevel 1 for error msg

              log.apply(this, logMSG);
            } else {
              log(1, "ERROR: Problem executing validation callback for option '" + optionName + "':", e.message);
            }
          } finally {
            _options[optionName] = value;
          }
        }
      });
    };
    /**
     * Helper used by the setter/getters for scene options
     * @private
     */


    var changeOption = function changeOption(varname, newval) {
      var changed = false,
          oldval = _options[varname];

      if (_options[varname] != newval) {
        _options[varname] = newval;
        validateOption(varname); // resets to default if necessary

        changed = oldval != _options[varname];
      }

      return changed;
    }; // generate getters/setters for all options


    var addSceneOption = function addSceneOption(optionName) {
      if (!Scene[optionName]) {
        Scene[optionName] = function (newVal) {
          if (!arguments.length) {
            // get
            return _options[optionName];
          } else {
            if (optionName === "duration") {
              // new duration is set, so any previously set function must be unset
              _durationUpdateMethod = undefined;
            }

            if (changeOption(optionName, newVal)) {
              // set
              Scene.trigger("change", {
                what: optionName,
                newval: _options[optionName]
              });

              if (SCENE_OPTIONS.shifts.indexOf(optionName) > -1) {
                Scene.trigger("shift", {
                  reason: optionName
                });
              }
            }
          }

          return Scene;
        };
      }
    };
    /**
     * **Get** or **Set** the duration option value.
     * As a setter it also accepts a function returning a numeric value.  
     * This is particularly useful for responsive setups.
     *
     * The duration is updated using the supplied function every time `Scene.refresh()` is called, which happens periodically from the controller (see ScrollMagic.Controller option `refreshInterval`).  
     * _**NOTE:** Be aware that it's an easy way to kill performance, if you supply a function that has high CPU demand.  
     * Even for size and position calculations it is recommended to use a variable to cache the value. (see example)  
     * This counts double if you use the same function for multiple scenes._
     *
     * @method ScrollMagic.Scene#duration
     * @example
     * // get the current duration value
     * var duration = scene.duration();
     *
     * // set a new duration
     * scene.duration(300);
     *
     * // use a function to automatically adjust the duration to the window height.
     * var durationValueCache;
     * function getDuration () {
     *   return durationValueCache;
     * }
     * function updateDuration (e) {
     *   durationValueCache = window.innerHeight;
     * }
     * $(window).on("resize", updateDuration); // update the duration when the window size changes
     * $(window).triggerHandler("resize"); // set to initial value
     * scene.duration(getDuration); // supply duration method
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|function)} [newDuration] - The new duration of the scene.
     * @returns {number} `get` -  Current scene duration.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the offset option value.
     * @method ScrollMagic.Scene#offset
     * @example
     * // get the current offset
     * var offset = scene.offset();
     *
     * // set a new offset
     * scene.offset(100);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {number} [newOffset] - The new offset of the scene.
     * @returns {number} `get` -  Current scene offset.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerElement option value.
     * Does **not** fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
     * @method ScrollMagic.Scene#triggerElement
     * @example
     * // get the current triggerElement
     * var triggerElement = scene.triggerElement();
     *
     * // set a new triggerElement using a selector
     * scene.triggerElement("#trigger");
     * // set a new triggerElement using a DOM object
     * scene.triggerElement(document.getElementById("trigger"));
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {(string|object)} [newTriggerElement] - The new trigger element for the scene.
     * @returns {(string|object)} `get` -  Current triggerElement.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerHook option value.
     * @method ScrollMagic.Scene#triggerHook
     * @example
     * // get the current triggerHook value
     * var triggerHook = scene.triggerHook();
     *
     * // set a new triggerHook using a string
     * scene.triggerHook("onLeave");
     * // set a new triggerHook using a number
     * scene.triggerHook(0.7);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|string)} [newTriggerHook] - The new triggerHook of the scene. See {@link Scene} parameter description for value options.
     * @returns {number} `get` -  Current triggerHook (ALWAYS numerical).
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the reverse option value.
     * @method ScrollMagic.Scene#reverse
     * @example
     * // get the current reverse option
     * var reverse = scene.reverse();
     *
     * // set new reverse option
     * scene.reverse(false);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {boolean} [newReverse] - The new reverse setting of the scene.
     * @returns {boolean} `get` -  Current reverse option value.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the loglevel option value.
     * @method ScrollMagic.Scene#loglevel
     * @example
     * // get the current loglevel
     * var loglevel = scene.loglevel();
     *
     * // set new loglevel
     * scene.loglevel(3);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {number} [newLoglevel] - The new loglevel setting of the scene. `[0-3]`
     * @returns {number} `get` -  Current loglevel.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** the associated controller.
     * @method ScrollMagic.Scene#controller
     * @example
     * // get the controller of a scene
     * var controller = scene.controller();
     *
     * @returns {ScrollMagic.Controller} Parent controller or `undefined`
     */


    this.controller = function () {
      return _controller;
    };
    /**
     * **Get** the current state.
     * @method ScrollMagic.Scene#state
     * @example
     * // get the current state
     * var state = scene.state();
     *
     * @returns {string} `"BEFORE"`, `"DURING"` or `"AFTER"`
     */


    this.state = function () {
      return _state;
    };
    /**
     * **Get** the current scroll offset for the start of the scene.  
     * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).  
     * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
     * @method ScrollMagic.Scene#scrollOffset
     * @example
     * // get the current scroll offset for the start and end of the scene.
     * var start = scene.scrollOffset();
     * var end = scene.scrollOffset() + scene.duration();
     * console.log("the scene starts at", start, "and ends at", end);
     *
     * @returns {number} The scroll offset (of the container) at which the scene will trigger. Y value for vertical and X value for horizontal scrolls.
     */


    this.scrollOffset = function () {
      return _scrollOffset.start;
    };
    /**
     * **Get** the trigger position of the scene (including the value of the `offset` option).  
     * @method ScrollMagic.Scene#triggerPosition
     * @example
     * // get the scene's trigger position
     * var triggerPosition = scene.triggerPosition();
     *
     * @returns {number} Start position of the scene. Top position value for vertical and left position value for horizontal scrolls.
     */


    this.triggerPosition = function () {
      var pos = _options.offset; // the offset is the basis

      if (_controller) {
        // get the trigger position
        if (_options.triggerElement) {
          // Element as trigger
          pos += _triggerPos;
        } else {
          // return the height of the triggerHook to start at the beginning
          pos += _controller.info("size") * Scene.triggerHook();
        }
      }

      return pos;
    };

    var _pin, _pinOptions;

    Scene.on("shift.internal", function (e) {
      var durationChanged = e.reason === "duration";

      if (_state === SCENE_STATE_AFTER && durationChanged || _state === SCENE_STATE_DURING && _options.duration === 0) {
        // if [duration changed after a scene (inside scene progress updates pin position)] or [duration is 0, we are in pin phase and some other value changed].
        updatePinState();
      }

      if (durationChanged) {
        updatePinDimensions();
      }
    }).on("progress.internal", function (e) {
      updatePinState();
    }).on("add.internal", function (e) {
      updatePinDimensions();
    }).on("destroy.internal", function (e) {
      Scene.removePin(e.reset);
    });
    /**
     * Update the pin state.
     * @private
     */

    var updatePinState = function updatePinState(forceUnpin) {
      if (_pin && _controller) {
        var containerInfo = _controller.info(),
            pinTarget = _pinOptions.spacer.firstChild; // may be pin element or another spacer, if cascading pins


        if (!forceUnpin && _state === SCENE_STATE_DURING) {
          // during scene or if duration is 0 and we are past the trigger
          // pinned state
          if (_util.css(pinTarget, "position") != "fixed") {
            // change state before updating pin spacer (position changes due to fixed collapsing might occur.)
            _util.css(pinTarget, {
              "position": "fixed"
            }); // update pin spacer


            updatePinDimensions();
          }

          var fixedPos = _util.get.offset(_pinOptions.spacer, true),
              // get viewport position of spacer
          scrollDistance = _options.reverse || _options.duration === 0 ? containerInfo.scrollPos - _scrollOffset.start // quicker
          : Math.round(_progress * _options.duration * 10) / 10; // if no reverse and during pin the position needs to be recalculated using the progress
          // add scrollDistance


          fixedPos[containerInfo.vertical ? "top" : "left"] += scrollDistance; // set new values

          _util.css(_pinOptions.spacer.firstChild, {
            top: fixedPos.top,
            left: fixedPos.left
          });
        } else {
          // unpinned state
          var newCSS = {
            position: _pinOptions.inFlow ? "relative" : "absolute",
            top: 0,
            left: 0
          },
              change = _util.css(pinTarget, "position") != newCSS.position;

          if (!_pinOptions.pushFollowers) {
            newCSS[containerInfo.vertical ? "top" : "left"] = _options.duration * _progress;
          } else if (_options.duration > 0) {
            // only concerns scenes with duration
            if (_state === SCENE_STATE_AFTER && parseFloat(_util.css(_pinOptions.spacer, "padding-top")) === 0) {
              change = true; // if in after state but havent updated spacer yet (jumped past pin)
            } else if (_state === SCENE_STATE_BEFORE && parseFloat(_util.css(_pinOptions.spacer, "padding-bottom")) === 0) {
              // before
              change = true; // jumped past fixed state upward direction
            }
          } // set new values


          _util.css(pinTarget, newCSS);

          if (change) {
            // update pin spacer if state changed
            updatePinDimensions();
          }
        }
      }
    };
    /**
     * Update the pin spacer and/or element size.
     * The size of the spacer needs to be updated whenever the duration of the scene changes, if it is to push down following elements.
     * @private
     */


    var updatePinDimensions = function updatePinDimensions() {
      if (_pin && _controller && _pinOptions.inFlow) {
        // no spacerresize, if original position is absolute
        var after = _state === SCENE_STATE_AFTER,
            before = _state === SCENE_STATE_BEFORE,
            during = _state === SCENE_STATE_DURING,
            vertical = _controller.info("vertical"),
            pinTarget = _pinOptions.spacer.firstChild,
            // usually the pined element but can also be another spacer (cascaded pins)
        marginCollapse = _util.isMarginCollapseType(_util.css(_pinOptions.spacer, "display")),
            css = {}; // set new size
        // if relsize: spacer -> pin | else: pin -> spacer


        if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
          if (during) {
            _util.css(_pin, {
              "width": _util.get.width(_pinOptions.spacer)
            });
          } else {
            _util.css(_pin, {
              "width": "100%"
            });
          }
        } else {
          // minwidth is needed for cascaded pins.
          css["min-width"] = _util.get.width(vertical ? _pin : pinTarget, true, true);
          css.width = during ? css["min-width"] : "auto";
        }

        if (_pinOptions.relSize.height) {
          if (during) {
            // the only padding the spacer should ever include is the duration (if pushFollowers = true), so we need to substract that.
            _util.css(_pin, {
              "height": _util.get.height(_pinOptions.spacer) - (_pinOptions.pushFollowers ? _options.duration : 0)
            });
          } else {
            _util.css(_pin, {
              "height": "100%"
            });
          }
        } else {
          // margin is only included if it's a cascaded pin to resolve an IE9 bug
          css["min-height"] = _util.get.height(vertical ? pinTarget : _pin, true, !marginCollapse); // needed for cascading pins

          css.height = during ? css["min-height"] : "auto";
        } // add space for duration if pushFollowers is true


        if (_pinOptions.pushFollowers) {
          css["padding" + (vertical ? "Top" : "Left")] = _options.duration * _progress;
          css["padding" + (vertical ? "Bottom" : "Right")] = _options.duration * (1 - _progress);
        }

        _util.css(_pinOptions.spacer, css);
      }
    };
    /**
     * Updates the Pin state (in certain scenarios)
     * If the controller container is not the document and we are mid-pin-phase scrolling or resizing the main document can result to wrong pin positions.
     * So this function is called on resize and scroll of the document.
     * @private
     */


    var updatePinInContainer = function updatePinInContainer() {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        updatePinState();
      }
    };
    /**
     * Updates the Pin spacer size state (in certain scenarios)
     * If container is resized during pin and relatively sized the size of the pin might need to be updated...
     * So this function is called on resize of the container.
     * @private
     */


    var updateRelativePinSpacer = function updateRelativePinSpacer() {
      if (_controller && _pin && // well, duh
      _state === SCENE_STATE_DURING && ( // element in pinned state?
      // is width or height relatively sized, but not in relation to body? then we need to recalc.
      (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) && _util.get.width(window) != _util.get.width(_pinOptions.spacer.parentNode) || _pinOptions.relSize.height && _util.get.height(window) != _util.get.height(_pinOptions.spacer.parentNode))) {
        updatePinDimensions();
      }
    };
    /**
     * Is called, when the mousewhel is used while over a pinned element inside a div container.
     * If the scene is in fixed state scroll events would be counted towards the body. This forwards the event to the scroll container.
     * @private
     */


    var onMousewheelOverPin = function onMousewheelOverPin(e) {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        // in pin state
        console.log('onMousewheelOverPin => ');
        e.preventDefault();

        _controller._setScrollPos(_controller.info("scrollPos") - ((e.wheelDelta || e[_controller.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || -e.detail * 30));
      }
    };
    /**
     * Pin an element for the duration of the tween.  
     * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.  
     * Make sure only one pin is applied to an element at the same time.
     * An element can be pinned multiple times, but only successively.
     * _**NOTE:** The option `pushFollowers` has no effect, when the scene duration is 0._
     * @method ScrollMagic.Scene#setPin
     * @example
     * // pin element and push all following elements down by the amount of the pin duration.
     * scene.setPin("#pin");
     *
     * // pin element and keeping all following elements in their place. The pinned element will move past them.
     * scene.setPin("#pin", {pushFollowers: false});
     *
     * @param {(string|object)} element - A Selector targeting an element or a DOM object that is supposed to be pinned.
     * @param {object} [settings] - settings for the pin
     * @param {boolean} [settings.pushFollowers=true] - If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.  
     Ignored, when duration is `0`.
     * @param {string} [settings.spacerClass="scrollmagic-pin-spacer"] - Classname of the pin spacer element, which is used to replace the element.
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.setPin = function (element, settings) {
      var defaultSettings = {
        pushFollowers: true,
        spacerClass: "scrollmagic-pin-spacer"
      };
      settings = _util.extend({}, defaultSettings, settings); // validate Element

      element = _util.get.elements(element)[0];

      if (!element) {
        log(1, "ERROR calling method 'setPin()': Invalid pin element supplied.");
        return Scene; // cancel
      } else if (_util.css(element, "position") === "fixed") {
        log(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.");
        return Scene; // cancel
      }

      if (_pin) {
        // preexisting pin?
        if (_pin === element) {
          // same pin we already have -> do nothing
          return Scene; // cancel
        } else {
          // kill old pin
          Scene.removePin();
        }
      }

      _pin = element;
      var parentDisplay = _pin.parentNode.style.display,
          boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
      _pin.parentNode.style.display = 'none'; // hack start to force css to return stylesheet values instead of calculated px values.

      var inFlow = _util.css(_pin, "position") != "absolute",
          pinCSS = _util.css(_pin, boundsParams.concat(["display"])),
          sizeCSS = _util.css(_pin, ["width", "height"]);

      _pin.parentNode.style.display = parentDisplay; // hack end.

      if (!inFlow && settings.pushFollowers) {
        log(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.");
        settings.pushFollowers = false;
      }

      window.setTimeout(function () {
        // wait until all finished, because with responsive duration it will only be set after scene is added to controller
        if (_pin && _options.duration === 0 && settings.pushFollowers) {
          log(2, "WARNING: pushFollowers =", true, "has no effect, when scene duration is 0.");
        }
      }, 0); // create spacer and insert

      var spacer = _pin.parentNode.insertBefore(document.createElement('div'), _pin),
          spacerCSS = _util.extend(pinCSS, {
        position: inFlow ? "relative" : "absolute",
        boxSizing: "content-box",
        mozBoxSizing: "content-box",
        webkitBoxSizing: "content-box"
      });

      if (!inFlow) {
        // copy size if positioned absolutely, to work for bottom/right positioned elements.
        _util.extend(spacerCSS, _util.css(_pin, ["width", "height"]));
      }

      _util.css(spacer, spacerCSS);

      spacer.setAttribute(PIN_SPACER_ATTRIBUTE, "");

      _util.addClass(spacer, settings.spacerClass); // set the pin Options


      _pinOptions = {
        spacer: spacer,
        relSize: {
          // save if size is defined using % values. if so, handle spacer resize differently...
          width: sizeCSS.width.slice(-1) === "%",
          height: sizeCSS.height.slice(-1) === "%",
          autoFullWidth: sizeCSS.width === "auto" && inFlow && _util.isMarginCollapseType(pinCSS.display)
        },
        pushFollowers: settings.pushFollowers,
        inFlow: inFlow // stores if the element takes up space in the document flow

      };

      if (!_pin.___origStyle) {
        _pin.___origStyle = {};
        var pinInlineCSS = _pin.style,
            copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
        copyStyles.forEach(function (val) {
          _pin.___origStyle[val] = pinInlineCSS[val] || "";
        });
      } // if relative size, transfer it to spacer and make pin calculate it...


      if (_pinOptions.relSize.width) {
        _util.css(spacer, {
          width: sizeCSS.width
        });
      }

      if (_pinOptions.relSize.height) {
        _util.css(spacer, {
          height: sizeCSS.height
        });
      } // now place the pin element inside the spacer	


      spacer.appendChild(_pin); // and set new css

      _util.css(_pin, {
        position: inFlow ? "relative" : "absolute",
        margin: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto"
      });

      if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
        _util.css(_pin, {
          boxSizing: "border-box",
          mozBoxSizing: "border-box",
          webkitBoxSizing: "border-box"
        });
      } // add listener to document to update pin position in case controller is not the document.


      window.addEventListener('scroll', updatePinInContainer, passive);
      window.addEventListener('resize', updatePinInContainer, passive);
      window.addEventListener('resize', updateRelativePinSpacer, passive); // add mousewheel listener to catch scrolls over fixed elements

      _pin.addEventListener("mousewheel", onMousewheelOverPin, passive);

      _pin.addEventListener("DOMMouseScroll", onMousewheelOverPin, passive);

      log(3, "added pin"); // finally update the pin to init

      updatePinState();
      return Scene;
    };
    /**
     * Remove the pin from the scene.
     * @method ScrollMagic.Scene#removePin
     * @example
     * // remove the pin from the scene without resetting it (the spacer is not removed)
     * scene.removePin();
     *
     * // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
     * scene.removePin(true);
     *
     * @param {boolean} [reset=false] - If `false` the spacer will not be removed and the element's position will not be reset.
     * @returns {Scene} Parent object for chaining.
     */


    this.removePin = function (reset) {
      if (_pin) {
        if (_state === SCENE_STATE_DURING) {
          updatePinState(true); // force unpin at position
        }

        if (reset || !_controller) {
          // if there's no controller no progress was made anyway...
          var pinTarget = _pinOptions.spacer.firstChild; // usually the pin element, but may be another spacer (cascaded pins)...

          if (pinTarget.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // copy margins to child spacer
            var style = _pinOptions.spacer.style,
                values = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            margins = {};
            values.forEach(function (val) {
              margins[val] = style[val] || "";
            });

            _util.css(pinTarget, margins);
          }

          _pinOptions.spacer.parentNode.insertBefore(pinTarget, _pinOptions.spacer);

          _pinOptions.spacer.parentNode.removeChild(_pinOptions.spacer);

          if (!_pin.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // if it's the last pin for this element -> restore inline styles
            // TODO: only correctly set for first pin (when cascading) - how to fix?
            _util.css(_pin, _pin.___origStyle);

            delete _pin.___origStyle;
          }
        }

        window.removeEventListener('scroll', updatePinInContainer, passive);
        window.removeEventListener('resize', updatePinInContainer, passive);
        window.removeEventListener('resize', updateRelativePinSpacer, passive);

        _pin.removeEventListener("mousewheel", onMousewheelOverPin, passive);

        _pin.removeEventListener("DOMMouseScroll", onMousewheelOverPin, passive);

        _pin = undefined;
        _pinOptions.spacer = null;
        log(3, "removed pin (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };

    var _cssClasses,
        _cssClassElems = [];

    Scene.on("destroy.internal", function (e) {
      Scene.removeClassToggle(e.reset);
    });
    /**
     * Define a css class modification while the scene is active.  
     * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over.
     * If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
     * @method ScrollMagic.Scene#setClassToggle
     * @example
     * // add the class 'myclass' to the element with the id 'my-elem' for the duration of the scene
     * scene.setClassToggle("#my-elem", "myclass");
     *
     * // add multiple classes to multiple elements defined by the selector '.classChange'
     * scene.setClassToggle(".classChange", "class1 class2 class3");
     *
     * @param {(string|object)} element - A Selector targeting one or more elements or a DOM object that is supposed to be modified.
     * @param {string} classes - One or more Classnames (separated by space) that should be added to the element during the scene.
     *
     * @returns {Scene} Parent object for chaining.
     */

    this.setClassToggle = function (element, classes) {
      var elems = _util.get.elements(element);

      if (elems.length === 0 || !_util.type.String(classes)) {
        log(1, "ERROR calling method 'setClassToggle()': Invalid " + (elems.length === 0 ? "element" : "classes") + " supplied.");
        return Scene;
      }

      if (_cssClassElems.length > 0) {
        // remove old ones
        Scene.removeClassToggle();
      }

      _cssClasses = classes;
      _cssClassElems = elems;
      Scene.on("enter.internal_class leave.internal_class", function (e) {
        var toggle = e.type === "enter" ? _util.addClass : _util.removeClass;

        _cssClassElems.forEach(function (elem, key) {
          toggle(elem, _cssClasses);
        });
      });
      return Scene;
    };
    /**
     * Remove the class binding from the scene.
     * @method ScrollMagic.Scene#removeClassToggle
     * @example
     * // remove class binding from the scene without reset
     * scene.removeClassToggle();
     *
     * // remove class binding and remove the changes it caused
     * scene.removeClassToggle(true);
     *
     * @param {boolean} [reset=false] - If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.removeClassToggle = function (reset) {
      if (reset) {
        _cssClassElems.forEach(function (elem, key) {
          _util.removeClass(elem, _cssClasses);
        });
      }

      Scene.off("start.internal_class end.internal_class");
      _cssClasses = undefined;
      _cssClassElems = [];
      return Scene;
    }; // INIT


    construct();
    return Scene;
  }; // store pagewide scene options


  var SCENE_OPTIONS = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: undefined,
      triggerHook: 0.5,
      reverse: true,
      loglevel: 2
    },
    validate: {
      offset: function offset(val) {
        val = parseFloat(val);

        if (!_util.type.Number(val)) {
          throw ["Invalid value for option \"offset\":", val];
        }

        return val;
      },
      triggerElement: function triggerElement(val) {
        val = val || undefined;

        if (val) {
          var elem = _util.get.elements(val)[0];

          if (elem && elem.parentNode) {
            val = elem;
          } else {
            throw ["Element defined in option \"triggerElement\" was not found:", val];
          }
        }

        return val;
      },
      triggerHook: function triggerHook(val) {
        var translate = {
          "onCenter": 0.5,
          "onEnter": 1,
          "onLeave": 0
        };

        if (_util.type.Number(val)) {
          val = Math.max(0, Math.min(parseFloat(val), 1)); //  make sure its betweeen 0 and 1
        } else if (val in translate) {
          val = translate[val];
        } else {
          throw ["Invalid value for option \"triggerHook\": ", val];
        }

        return val;
      },
      reverse: function reverse(val) {
        return !!val; // force boolean
      },
      loglevel: function loglevel(val) {
        val = parseInt(val);

        if (!_util.type.Number(val) || val < 0 || val > 3) {
          throw ["Invalid value for option \"loglevel\":", val];
        }

        return val;
      }
    },
    // holder for  validation methods. duration validation is handled in 'getters-setters.js'
    shifts: ["duration", "offset", "triggerHook"] // list of options that trigger a `shift` event

  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   * TODO: DOC (private for dev)
   */

  ScrollMagic.Scene.addOption = function (name, defaultValue, validationCallback, shifts) {
    if (!(name in SCENE_OPTIONS.defaults)) {
      SCENE_OPTIONS.defaults[name] = defaultValue;
      SCENE_OPTIONS.validate[name] = validationCallback;

      if (shifts) {
        SCENE_OPTIONS.shifts.push(name);
      }
    } else {
      ScrollMagic._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + name + "', because it already exists.");
    }
  }; // instance extension function for plugins
  // TODO: DOC (private for dev)


  ScrollMagic.Scene.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Scene = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Scene, oldClass); // copy properties


    ScrollMagic.Scene.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Scene.prototype.constructor = ScrollMagic.Scene; // restore constructor
  };
  /**
   * TODO: DOCS (private for dev)
   * @class
   * @private
   */


  ScrollMagic.Event = function (type, namespace, target, vars) {
    vars = vars || {};

    for (var key in vars) {
      this[key] = vars[key];
    }

    this.type = type;
    this.target = this.currentTarget = target;
    this.namespace = namespace || '';
    this.timeStamp = this.timestamp = Date.now();
    return this;
  };
  /*
   * TODO: DOCS (private for dev)
   */


  var _util = ScrollMagic._util = function (window) {
    var U = {},
        i;
    /**
     * ------------------------------
     * internal helpers
     * ------------------------------
     */
    // parse float and fall back to 0.

    var floatval = function floatval(number) {
      return parseFloat(number) || 0;
    }; // get current style IE safe (otherwise IE would return calculated values for 'auto')


    var _getComputedStyle = function _getComputedStyle(elem) {
      return elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem);
    }; // get element dimension (width or height)


    var _dimension = function _dimension(which, elem, outer, includeMargin) {
      elem = elem === document ? window : elem;

      if (elem === window) {
        includeMargin = false;
      } else if (!_type.DomElement(elem)) {
        return 0;
      }

      which = which.charAt(0).toUpperCase() + which.substr(1).toLowerCase();
      var dimension = (outer ? elem['offset' + which] || elem['outer' + which] : elem['client' + which] || elem['inner' + which]) || 0;

      if (outer && includeMargin) {
        var style = _getComputedStyle(elem);

        dimension += which === 'Height' ? floatval(style.marginTop) + floatval(style.marginBottom) : floatval(style.marginLeft) + floatval(style.marginRight);
      }

      return dimension;
    }; // converts 'margin-top' into 'marginTop'


    var _camelCase = function _camelCase(str) {
      return str.replace(/^[^a-z]+([a-z])/g, '$1').replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    };
    /**
     * ------------------------------
     * external helpers
     * ------------------------------
     */
    // extend obj – same as jQuery.extend({}, objA, objB)


    U.extend = function (obj) {
      obj = obj || {};

      for (i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key];
          }
        }
      }

      return obj;
    }; // check if a css display type results in margin-collapse or not


    U.isMarginCollapseType = function (str) {
      return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(str) > -1;
    }; // implementation of requestAnimationFrame
    // based on https://gist.github.com/paulirish/1579671


    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];
    var _requestAnimationFrame = window.requestAnimationFrame;
    var _cancelAnimationFrame = window.cancelAnimationFrame; // try vendor prefixes if the above doesn't work

    for (i = 0; !_requestAnimationFrame && i < vendors.length; ++i) {
      _requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
      _cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
    } // fallbacks


    if (!_requestAnimationFrame) {
      _requestAnimationFrame = function _requestAnimationFrame(callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!_cancelAnimationFrame) {
      _cancelAnimationFrame = function _cancelAnimationFrame(id) {
        window.clearTimeout(id);
      };
    }

    U.rAF = _requestAnimationFrame.bind(window);
    U.cAF = _cancelAnimationFrame.bind(window);
    var loglevels = ["error", "warn", "log"],
        console = window.console || {};

    console.log = console.log || function () {}; // no console log, well - do nothing then...
    // make sure methods for all levels exist.


    for (i = 0; i < loglevels.length; i++) {
      var method = loglevels[i];

      if (!console[method]) {
        console[method] = console.log; // prefer .log over nothing
      }
    }

    U.log = function (loglevel) {
      if (loglevel > loglevels.length || loglevel <= 0) loglevel = loglevels.length;
      var now = new Date(),
          time = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + ":" + ("00" + now.getMilliseconds()).slice(-3),
          method = loglevels[loglevel - 1],
          args = Array.prototype.splice.call(arguments, 1),
          func = Function.prototype.bind.call(console[method], console);
      args.unshift(time);
      func.apply(console, args);
    };
    /**
     * ------------------------------
     * type testing
     * ------------------------------
     */


    var _type = U.type = function (v) {
      return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    };

    _type.String = function (v) {
      return _type(v) === 'string';
    };

    _type.Function = function (v) {
      return _type(v) === 'function';
    };

    _type.Array = function (v) {
      return Array.isArray(v);
    };

    _type.Number = function (v) {
      return !_type.Array(v) && v - parseFloat(v) + 1 >= 0;
    };

    _type.DomElement = function (o) {
      return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
      o && _typeof(o) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
    };
    /**
     * ------------------------------
     * DOM Element info
     * ------------------------------
     */
    // always returns a list of matching DOM elements, from a selector, a DOM element or an list of elements or even an array of selectors


    var _get = U.get = {};

    _get.elements = function (selector) {
      var arr = [];

      if (_type.String(selector)) {
        try {
          selector = document.querySelectorAll(selector);
        } catch (e) {
          // invalid selector
          return arr;
        }
      }

      if (_type(selector) === 'nodelist' || _type.Array(selector)) {
        for (var i = 0, ref = arr.length = selector.length; i < ref; i++) {
          // list of elements
          var elem = selector[i];
          arr[i] = _type.DomElement(elem) ? elem : _get.elements(elem); // if not an element, try to resolve recursively
        }
      } else if (_type.DomElement(selector) || selector === document || selector === window) {
        arr = [selector]; // only the element
      }

      return arr;
    }; // get scroll top value


    _get.scrollTop = function (elem) {
      return elem && typeof elem.scrollTop === 'number' ? elem.scrollTop : window.pageYOffset || 0;
    }; // get scroll left value


    _get.scrollLeft = function (elem) {
      return elem && typeof elem.scrollLeft === 'number' ? elem.scrollLeft : window.pageXOffset || 0;
    }; // get element height


    _get.width = function (elem, outer, includeMargin) {
      return _dimension('width', elem, outer, includeMargin);
    }; // get element width


    _get.height = function (elem, outer, includeMargin) {
      return _dimension('height', elem, outer, includeMargin);
    }; // get element position (optionally relative to viewport)


    _get.offset = function (elem, relativeToViewport) {
      var offset = {
        top: 0,
        left: 0
      };

      if (elem && elem.getBoundingClientRect) {
        // check if available
        var rect = elem.getBoundingClientRect();
        offset.top = rect.top;
        offset.left = rect.left;

        if (!relativeToViewport) {
          // clientRect is by default relative to viewport...
          offset.top += _get.scrollTop();
          offset.left += _get.scrollLeft();
        }
      }

      return offset;
    };
    /**
     * ------------------------------
     * DOM Element manipulation
     * ------------------------------
     */


    U.addClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.add(classname);else elem.className += ' ' + classname;
      }
    };

    U.removeClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.remove(classname);else elem.className = elem.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }; // if options is string -> returns css value
    // if options is array -> returns object with css value pairs
    // if options is object -> set new css values


    U.css = function (elem, options) {
      if (_type.String(options)) {
        return _getComputedStyle(elem)[_camelCase(options)];
      } else if (_type.Array(options)) {
        var obj = {},
            style = _getComputedStyle(elem);

        options.forEach(function (option, key) {
          obj[option] = style[_camelCase(option)];
        });
        return obj;
      } else {
        for (var option in options) {
          var val = options[option];

          if (val == parseFloat(val)) {
            // assume pixel for seemingly numerical values
            val += 'px';
          }

          elem.style[_camelCase(option)] = val;
        }
      }
    };

    return U;
  }(window || {});

  ScrollMagic.Scene.prototype.addIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  return ScrollMagic;
});
/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic jQuery plugin.
 *
 * requires: jQuery ~1.11 or ~2.1
 */

/**
 * This plugin is meant to be used in conjunction with jQuery.  
 * It enables ScrollMagic to make use of jQuery's advanced selector engine (sizzle) for all elements supplied to ScrollMagic objects, like scroll containers or trigger elements.  
 * ScrollMagic also accepts jQuery elements for all methods that expect references to DOM elements. Please note, that in most cases the first element of the matched set will be used.
 * 
 * Additionally it provides the ScrollMagic object within the jQuery namespace, so it can be accessed using `$.ScrollMagic`.
 *
 * In contrast to most other plugins it does not offer new API additions for ScrollMagic.
 *
 * To have access to this extension, please include `plugins/jquery.ScrollMagic.js`.
 * @example
 * // create a new scene making use of jQuery's advanced selector engine
 * var scene = new $.ScrollMagic.Scene({
 *   triggerElement: "#parent div.trigger[attr='thisone']:not(.notthisone)"
 * });
 * @requires {@link http://jquery.com/|jQuery ~1.11 or ~2.1}
 * @mixin framework.jQuery
 */


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ScrollMagic', 'jquery'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // CommonJS
    factory(require('scrollmagic'), require('jquery'));
  } else {
    // Browser global
    factory(root.ScrollMagic, root.jQuery);
  }
})(void 0, function (ScrollMagic, $) {
  "use strict";

  var NAMESPACE = "jquery.ScrollMagic";
  var console = window.console || {},
      err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

  if (!ScrollMagic) {
    err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
  }

  if (!$) {
    err("(" + NAMESPACE + ") -> ERROR: jQuery could not be found. Please make sure it's loaded before ScrollMagic or use an asynchronous loader like requirejs.");
  }

  ScrollMagic._util.get.elements = function (selector) {
    return $(selector).toArray();
  };

  ScrollMagic._util.addClass = function (elem, classname) {
    $(elem).addClass(classname);
  };

  ScrollMagic._util.removeClass = function (elem, classname) {
    $(elem).removeClass(classname);
  };

  $.ScrollMagic = ScrollMagic;
});
/*!
 * @file ScrollMagic GSAP Animation Plugin.
 *
 * requires: GSAP ~1.14
 * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
 * Greensock License info at http://www.greensock.com/licensing/
 */

/**
 * This plugin is meant to be used in conjunction with the Greensock Animation Plattform.  
 * It offers an easy API to trigger Tweens or synchronize them to the scrollbar movement.
 *
 * Both the `lite` and the `max` versions of the GSAP library are supported.  
 * The most basic requirement is `TweenLite`.
 * 
 * To have access to this extension, please include `plugins/animation.gsap.js`.
 * @requires {@link http://greensock.com/gsap|GSAP ~1.14.x}
 * @mixin animation.GSAP
 */


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ScrollMagic', 'TweenMax', 'TimelineMax'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // CommonJS
    // Loads whole gsap package onto global scope.
    require('gsap');

    factory(require('scrollmagic'), TweenMax, TimelineMax);
  } else {
    // Browser globals
    factory(root.ScrollMagic || root.jQuery && root.jQuery.ScrollMagic, root.TweenMax || root.TweenLite, root.TimelineMax || root.TimelineLite);
  }
})(void 0, function (ScrollMagic, Tween, Timeline) {
  "use strict";

  var NAMESPACE = "animation.gsap"; // (BUILD) - REMOVE IN MINIFY - START

  var console = window.console || {},
      err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

  if (!ScrollMagic) {
    err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
  }

  if (!Tween) {
    err("(" + NAMESPACE + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.");
  } // (BUILD) - REMOVE IN MINIFY - END

  /*
   * ----------------------------------------------------------------
   * Extensions for Scene
   * ----------------------------------------------------------------
   */

  /**
   * Every instance of ScrollMagic.Scene now accepts an additional option.  
   * See {@link ScrollMagic.Scene} for a complete list of the standard options.
   * @memberof! animation.GSAP#
   * @method new ScrollMagic.Scene(options)
   * @example
   * var scene = new ScrollMagic.Scene({tweenChanges: true});
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.
   * @param {boolean} [options.tweenChanges=false] - Tweens Animation to the progress target instead of setting it.  
                                                    Does not affect animations where duration is `0`.
   */

  /**
   * **Get** or **Set** the tweenChanges option value.  
   * This only affects scenes with a duration. If `tweenChanges` is `true`, the progress update when scrolling will not be immediate, but instead the animation will smoothly animate to the target state.  
   * For a better understanding, try enabling and disabling this option in the [Scene Manipulation Example](../examples/basic/scene_manipulation.html).
   * @memberof! animation.GSAP#
   * @method Scene.tweenChanges
   * 
   * @example
   * // get the current tweenChanges option
   * var tweenChanges = scene.tweenChanges();
   *
   * // set new tweenChanges option
   * scene.tweenChanges(true);
   *
   * @fires {@link Scene.change}, when used as setter
   * @param {boolean} [newTweenChanges] - The new tweenChanges setting of the scene.
   * @returns {boolean} `get` -  Current tweenChanges option value.
   * @returns {Scene} `set` -  Parent object for chaining.
   */
  // add option (TODO: DOC (private for dev))


  ScrollMagic.Scene.addOption("tweenChanges", // name
  false, // default
  function (val) {
    // validation callback
    return !!val;
  }); // extend scene

  ScrollMagic.Scene.extend(function () {
    var Scene = this,
        _tween; // (BUILD) - REMOVE IN MINIFY - START


    var log = function log() {
      if (Scene._log) {
        // not available, when main source minified
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

        Scene._log.apply(this, arguments);
      }
    }; // (BUILD) - REMOVE IN MINIFY - END
    // set listeners


    Scene.on("progress.plugin_gsap", function () {
      updateTweenProgress();
    });
    Scene.on("destroy.plugin_gsap", function (e) {
      Scene.removeTween(e.reset);
    });
    /**
     * Update the tween progress to current position.
     * @private
     */

    var updateTweenProgress = function updateTweenProgress() {
      if (_tween) {
        var progress = Scene.progress(),
            state = Scene.state();

        if (_tween.repeat && _tween.repeat() === -1) {
          // infinite loop, so not in relation to progress
          if (state === 'DURING' && _tween.paused()) {
            _tween.play();
          } else if (state !== 'DURING' && !_tween.paused()) {
            _tween.pause();
          }
        } else if (progress != _tween.progress()) {
          // do we even need to update the progress?
          // no infinite loop - so should we just play or go to a specific point in time?
          if (Scene.duration() === 0) {
            // play the animation
            if (progress > 0) {
              // play from 0 to 1
              _tween.play();
            } else {
              // play from 1 to 0
              _tween.reverse();
            }
          } else {
            // go to a specific point in time
            if (Scene.tweenChanges() && _tween.tweenTo) {
              // go smooth
              _tween.tweenTo(progress * _tween.duration());
            } else {
              // just hard set it
              _tween.progress(progress).pause();
            }
          }
        }
      }
    };
    /**
     * Add a tween to the scene.  
     * If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).  
     * 
     * If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.  
     * For a scene with a duration of `0`, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.  
     * To gain better understanding, check out the [Simple Tweening example](../examples/basic/simple_tweening.html).
     *
     * Instead of supplying a tween this method can also be used as a shorthand for `TweenMax.to()` (see example below).
     * @memberof! animation.GSAP#
     *
     * @example
     * // add a single tween directly
     * scene.setTween(TweenMax.to("obj"), 1, {x: 100});
     *
     * // add a single tween via variable
     * var tween = TweenMax.to("obj"), 1, {x: 100};
     * scene.setTween(tween);
     *
     * // add multiple tweens, wrapped in a timeline.
     * var timeline = new TimelineMax();
     * var tween1 = TweenMax.from("obj1", 1, {x: 100});
     * var tween2 = TweenMax.to("obj2", 1, {y: 100});
     * timeline
     *      .add(tween1)
     *      .add(tween2);
     * scene.addTween(timeline);
     *
     * // short hand to add a TweenMax.to() tween
     * scene.setTween("obj3", 0.5, {y: 100});
     *
     * // short hand to add a TweenMax.to() tween for 1 second
     * // this is useful, when the scene has a duration and the tween duration isn't important anyway
     * scene.setTween("obj3", {y: 100});
     *
     * @param {(object|string)} TweenObject - A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
     * @param {(number|object)} duration - A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
     * @param {object} params - The parameters for the tween
     * @returns {Scene} Parent object for chaining.
     */


    Scene.setTween = function (TweenObject, duration, params) {
      var newTween;

      if (arguments.length > 1) {
        if (arguments.length < 3) {
          params = duration;
          duration = 1;
        }

        TweenObject = Tween.to(TweenObject, duration, params);
      }

      try {
        // wrap Tween into a Timeline Object if available to include delay and repeats in the duration and standardize methods.
        if (Timeline) {
          newTween = new Timeline({
            smoothChildTiming: true
          }).add(TweenObject);
        } else {
          newTween = TweenObject;
        }

        newTween.pause();
      } catch (e) {
        log(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject");
        return Scene;
      }

      if (_tween) {
        // kill old tween?
        Scene.removeTween();
      }

      _tween = newTween; // some properties need to be transferred it to the wrapper, otherwise they would get lost.

      if (TweenObject.repeat && TweenObject.repeat() === -1) {
        // TweenMax or TimelineMax Object?
        _tween.repeat(-1);

        _tween.yoyo(TweenObject.yoyo());
      } // (BUILD) - REMOVE IN MINIFY - START
      // Some tween validations and debugging helpers


      if (Scene.tweenChanges() && !_tween.tweenTo) {
        log(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.");
      } // check if there are position tweens defined for the trigger and warn about it :)


      if (_tween && Scene.controller() && Scene.triggerElement() && Scene.loglevel() >= 2) {
        // controller is needed to know scroll direction.
        var triggerTweens = Tween.getTweensOf(Scene.triggerElement()),
            vertical = Scene.controller().info("vertical");
        triggerTweens.forEach(function (value, index) {
          var tweenvars = value.vars.css || value.vars,
              condition = vertical ? tweenvars.top !== undefined || tweenvars.bottom !== undefined : tweenvars.left !== undefined || tweenvars.right !== undefined;

          if (condition) {
            log(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!");
            return false;
          }
        });
      } // warn about tween overwrites, when an element is tweened multiple times


      if (parseFloat(TweenLite.version) >= 1.14) {
        // onOverwrite only present since GSAP v1.14.0
        var list = _tween.getChildren ? _tween.getChildren(true, true, false) : [_tween],
            // get all nested tween objects
        newCallback = function newCallback() {
          log(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
        };

        for (var i = 0, thisTween, oldCallback; i < list.length; i++) {
          /*jshint loopfunc: true */
          thisTween = list[i];

          if (oldCallback !== newCallback) {
            // if tweens is added more than once
            oldCallback = thisTween.vars.onOverwrite;

            thisTween.vars.onOverwrite = function () {
              if (oldCallback) {
                oldCallback.apply(this, arguments);
              }

              newCallback.apply(this, arguments);
            };
          }
        }
      } // (BUILD) - REMOVE IN MINIFY - END


      log(3, "added tween");
      updateTweenProgress();
      return Scene;
    };
    /**
     * Remove the tween from the scene.  
     * This will terminate the control of the Scene over the tween.
     *
     * Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
     * @memberof! animation.GSAP#
     *
     * @example
     * // remove the tween from the scene without resetting it
     * scene.removeTween();
     *
     * // remove the tween from the scene and reset it to initial position
     * scene.removeTween(true);
     *
     * @param {boolean} [reset=false] - If `true` the tween will be reset to its initial values.
     * @returns {Scene} Parent object for chaining.
     */


    Scene.removeTween = function (reset) {
      if (_tween) {
        if (reset) {
          _tween.progress(0).pause();
        }

        _tween.kill();

        _tween = undefined;
        log(3, "removed tween (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };
  });
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * HC-Sticky
 * =========
 * Version: 2.2.3
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
!function (t, e) {
  "use strict";

  if ("object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports)) {
    if (!t.document) throw new Error("HC-Sticky requires a browser to run.");
    module.exports = e(t);
  } else "function" == typeof define && define.amd ? define("hcSticky", [], e(t)) : e(t);
}("undefined" != typeof window ? window : void 0, function (U) {
  "use strict";

  var Y = {
    top: 0,
    bottom: 0,
    bottomEnd: 0,
    innerTop: 0,
    innerSticker: null,
    stickyClass: "sticky",
    stickTo: null,
    followScroll: !0,
    responsive: null,
    mobileFirst: !1,
    onStart: null,
    onStop: null,
    onBeforeResize: null,
    onResize: null,
    resizeDebounce: 100,
    disable: !1,
    queries: null,
    queryFlow: "down"
  },
      $ = function $(t, e, o) {
    console.log("%c! HC Sticky:%c " + t + "%c " + o + " is now deprecated and will be removed. Use%c " + e + "%c instead.", "color: red", "color: darkviolet", "color: black", "color: darkviolet", "color: black");
  },
      Q = U.document,
      X = function X(n, f) {
    var o = this;
    if ("string" == typeof n && (n = Q.querySelector(n)), !n) return !1;
    f.queries && $("queries", "responsive", "option"), f.queryFlow && $("queryFlow", "mobileFirst", "option");
    var p = {},
        d = X.Helpers,
        s = n.parentNode;
    "static" === d.getStyle(s, "position") && (s.style.position = "relative");

    var u = function u() {
      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      d.isEmptyObject(t) && !d.isEmptyObject(p) || (p = Object.assign({}, Y, p, t));
    },
        t = function t() {
      return p.disable;
    },
        e = function e() {
      var t,
          e = p.responsive || p.queries;

      if (e) {
        var o = U.innerWidth;
        if (t = f, (p = Object.assign({}, Y, t || {})).mobileFirst) for (var i in e) {
          i <= o && !d.isEmptyObject(e[i]) && u(e[i]);
        } else {
          var n = [];

          for (var s in e) {
            var r = {};
            r[s] = e[s], n.push(r);
          }

          for (var l = n.length - 1; 0 <= l; l--) {
            var a = n[l],
                c = Object.keys(a)[0];
            o <= c && !d.isEmptyObject(a[c]) && u(a[c]);
          }
        }
      }
    },
        r = {
      css: {},
      position: null,
      stick: function stick() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        d.hasClass(n, p.stickyClass) || (!1 === l.isAttached && l.attach(), r.position = "fixed", n.style.position = "fixed", n.style.left = l.offsetLeft + "px", n.style.width = l.width, void 0 === t.bottom ? n.style.bottom = "auto" : n.style.bottom = t.bottom + "px", void 0 === t.top ? n.style.top = "auto" : n.style.top = t.top + "px", n.classList ? n.classList.add(p.stickyClass) : n.className += " " + p.stickyClass, p.onStart && p.onStart.call(n, Object.assign({}, p)));
      },
      release: function release() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};

        if (t.stop = t.stop || !1, !0 === t.stop || "fixed" === r.position || null === r.position || !(void 0 === t.top && void 0 === t.bottom || void 0 !== t.top && (parseInt(d.getStyle(n, "top")) || 0) === t.top || void 0 !== t.bottom && (parseInt(d.getStyle(n, "bottom")) || 0) === t.bottom)) {
          !0 === t.stop ? !0 === l.isAttached && l.detach() : !1 === l.isAttached && l.attach();
          var e = t.position || r.css.position;
          r.position = e, n.style.position = e, n.style.left = !0 === t.stop ? r.css.left : l.positionLeft + "px", n.style.width = "absolute" !== e ? r.css.width : l.width, void 0 === t.bottom ? n.style.bottom = !0 === t.stop ? "" : "auto" : n.style.bottom = t.bottom + "px", void 0 === t.top ? n.style.top = !0 === t.stop ? "" : "auto" : n.style.top = t.top + "px", n.classList ? n.classList.remove(p.stickyClass) : n.className = n.className.replace(new RegExp("(^|\\b)" + p.stickyClass.split(" ").join("|") + "(\\b|$)", "gi"), " "), p.onStop && p.onStop.call(n, Object.assign({}, p));
        }
      }
    },
        l = {
      el: Q.createElement("div"),
      offsetLeft: null,
      positionLeft: null,
      width: null,
      isAttached: !1,
      init: function init() {
        for (var t in l.el.className = "sticky-spacer", r.css) {
          l.el.style[t] = r.css[t];
        }

        l.el.style["z-index"] = "-1";
        var e = d.getStyle(n);
        l.offsetLeft = d.offset(n).left - (parseInt(e.marginLeft) || 0), l.positionLeft = d.position(n).left, l.width = d.getStyle(n, "width");
      },
      attach: function attach() {
        s.insertBefore(l.el, n), l.isAttached = !0;
      },
      detach: function detach() {
        l.el = s.removeChild(l.el), l.isAttached = !1;
      }
    },
        a = void 0,
        c = void 0,
        g = void 0,
        m = void 0,
        h = void 0,
        v = void 0,
        y = void 0,
        b = void 0,
        S = void 0,
        w = void 0,
        k = void 0,
        E = void 0,
        x = void 0,
        L = void 0,
        T = void 0,
        j = void 0,
        O = void 0,
        C = void 0,
        i = function i() {
      var t, e, o, i;
      r.css = (t = n, e = d.getCascadedStyle(t), o = d.getStyle(t), i = {
        height: t.offsetHeight + "px",
        left: e.left,
        right: e.right,
        top: e.top,
        bottom: e.bottom,
        position: o.position,
        display: o.display,
        verticalAlign: o.verticalAlign,
        boxSizing: o.boxSizing,
        marginLeft: e.marginLeft,
        marginRight: e.marginRight,
        marginTop: e.marginTop,
        marginBottom: e.marginBottom,
        paddingLeft: e.paddingLeft,
        paddingRight: e.paddingRight
      }, e.float && (i.float = e.float || "none"), e.cssFloat && (i.cssFloat = e.cssFloat || "none"), o.MozBoxSizing && (i.MozBoxSizing = o.MozBoxSizing), i.width = "auto" !== e.width ? e.width : "border-box" === i.boxSizing || "border-box" === i.MozBoxSizing ? t.offsetWidth + "px" : o.width, i), l.init(), a = !(!p.stickTo || !("document" === p.stickTo || p.stickTo.nodeType && 9 === p.stickTo.nodeType || "object" == _typeof(p.stickTo) && p.stickTo instanceof ("undefined" != typeof HTMLDocument ? HTMLDocument : Document))), c = p.stickTo ? a ? Q : "string" == typeof p.stickTo ? Q.querySelector(p.stickTo) : p.stickTo : s, T = (C = function C() {
        var t = n.offsetHeight + (parseInt(r.css.marginTop) || 0) + (parseInt(r.css.marginBottom) || 0),
            e = (T || 0) - t;
        return -1 <= e && e <= 1 ? T : t;
      })(), m = (O = function O() {
        return a ? Math.max(Q.documentElement.clientHeight, Q.body.scrollHeight, Q.documentElement.scrollHeight, Q.body.offsetHeight, Q.documentElement.offsetHeight) : c.offsetHeight;
      })(), h = a ? 0 : d.offset(c).top, v = p.stickTo ? a ? 0 : d.offset(s).top : h, y = U.innerHeight, j = n.offsetTop - (parseInt(r.css.marginTop) || 0), g = p.innerSticker ? "string" == typeof p.innerSticker ? Q.querySelector(p.innerSticker) : p.innerSticker : null, b = isNaN(p.top) && -1 < p.top.indexOf("%") ? parseFloat(p.top) / 100 * y : p.top, S = isNaN(p.bottom) && -1 < p.bottom.indexOf("%") ? parseFloat(p.bottom) / 100 * y : p.bottom, w = g ? g.offsetTop : p.innerTop ? p.innerTop : 0, k = isNaN(p.bottomEnd) && -1 < p.bottomEnd.indexOf("%") ? parseFloat(p.bottomEnd) / 100 * y : p.bottomEnd, E = h - b + w + j;
    },
        z = U.pageYOffset || Q.documentElement.scrollTop,
        N = 0,
        H = void 0,
        R = function R() {
      T = C(), m = O(), x = h + m - b - k, L = y < T;
      var t = U.pageYOffset || Q.documentElement.scrollTop,
          e = d.offset(n).top,
          o = e - t,
          i = void 0;
      H = t < z ? "up" : "down", N = t - z, E < (z = t) ? x + b + (L ? S : 0) - (p.followScroll && L ? 0 : b) <= t + T - w - (y - (E - w) < T - w && p.followScroll && 0 < (i = T - y - w) ? i : 0) ? r.release({
        position: "absolute",
        bottom: v + s.offsetHeight - x - b
      }) : L && p.followScroll ? "down" === H ? o + T + S <= y + .9 ? r.stick({
        bottom: S
      }) : "fixed" === r.position && r.release({
        position: "absolute",
        top: e - b - E - N + w
      }) : Math.ceil(o + w) < 0 && "fixed" === r.position ? r.release({
        position: "absolute",
        top: e - b - E + w - N
      }) : t + b - w <= e && r.stick({
        top: b - w
      }) : r.stick({
        top: b - w
      }) : r.release({
        stop: !0
      });
    },
        A = !1,
        B = !1,
        I = function I() {
      A && (d.event.unbind(U, "scroll", R), A = !1);
    },
        q = function q() {
      null !== n.offsetParent && "none" !== d.getStyle(n, "display") ? (i(), m <= T ? I() : (R(), A || (d.event.bind(U, "scroll", R), A = !0))) : I();
    },
        F = function F() {
      n.style.position = "", n.style.left = "", n.style.top = "", n.style.bottom = "", n.style.width = "", n.classList ? n.classList.remove(p.stickyClass) : n.className = n.className.replace(new RegExp("(^|\\b)" + p.stickyClass.split(" ").join("|") + "(\\b|$)", "gi"), " "), r.css = {}, !(r.position = null) === l.isAttached && l.detach();
    },
        M = function M() {
      F(), e(), t() ? I() : q();
    },
        D = function D() {
      p.onBeforeResize && p.onBeforeResize.call(n, Object.assign({}, p)), M(), p.onResize && p.onResize.call(n, Object.assign({}, p));
    },
        P = p.resizeDebounce ? d.debounce(D, p.resizeDebounce) : D,
        W = function W() {
      B && (d.event.unbind(U, "resize", P), B = !1), I();
    },
        V = function V() {
      B || (d.event.bind(U, "resize", P), B = !0), e(), t() ? I() : q();
    };

    this.options = function (t) {
      return t ? p[t] : Object.assign({}, p);
    }, this.refresh = M, this.update = function (t) {
      u(t), f = Object.assign({}, f, t || {}), M();
    }, this.attach = V, this.detach = W, this.destroy = function () {
      W(), F();
    }, this.triggerMethod = function (t, e) {
      "function" == typeof o[t] && o[t](e);
    }, this.reinit = function () {
      $("reinit", "refresh", "method"), M();
    }, u(f), V(), d.event.bind(U, "load", M);
  };

  if (void 0 !== U.jQuery) {
    var i = U.jQuery,
        n = "hcSticky";
    i.fn.extend({
      hcSticky: function hcSticky(e, o) {
        return this.length ? "options" === e ? i.data(this.get(0), n).options() : this.each(function () {
          var t = i.data(this, n);
          t ? t.triggerMethod(e, o) : (t = new X(this, e), i.data(this, n, t));
        }) : this;
      }
    });
  }

  return U.hcSticky = U.hcSticky || X, X;
}), function (c) {
  "use strict";

  var t = c.hcSticky,
      f = c.document;
  "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
    value: function value(t, e) {
      if (null == t) throw new TypeError("Cannot convert undefined or null to object");

      for (var o = Object(t), i = 1; i < arguments.length; i++) {
        var n = arguments[i];
        if (null != n) for (var s in n) {
          Object.prototype.hasOwnProperty.call(n, s) && (o[s] = n[s]);
        }
      }

      return o;
    },
    writable: !0,
    configurable: !0
  }), Array.prototype.forEach || (Array.prototype.forEach = function (t) {
    var e, o;
    if (null == this) throw new TypeError("this is null or not defined");
    var i = Object(this),
        n = i.length >>> 0;
    if ("function" != typeof t) throw new TypeError(t + " is not a function");

    for (1 < arguments.length && (e = arguments[1]), o = 0; o < n;) {
      var s;
      o in i && (s = i[o], t.call(e, s, o, i)), o++;
    }
  });

  var e = function () {
    var t = f.documentElement,
        e = function e() {};

    function i(t) {
      var e = c.event;
      return e.target = e.target || e.srcElement || t, e;
    }

    t.addEventListener ? e = function e(t, _e, o) {
      t.addEventListener(_e, o, !1);
    } : t.attachEvent && (e = function e(_e2, t, o) {
      _e2[t + o] = o.handleEvent ? function () {
        var t = i(_e2);
        o.handleEvent.call(o, t);
      } : function () {
        var t = i(_e2);
        o.call(_e2, t);
      }, _e2.attachEvent("on" + t, _e2[t + o]);
    });

    var o = function o() {};

    return t.removeEventListener ? o = function o(t, e, _o) {
      t.removeEventListener(e, _o, !1);
    } : t.detachEvent && (o = function o(e, _o2, i) {
      e.detachEvent("on" + _o2, e[_o2 + i]);

      try {
        delete e[_o2 + i];
      } catch (t) {
        e[_o2 + i] = void 0;
      }
    }), {
      bind: e,
      unbind: o
    };
  }(),
      r = function r(t, e) {
    return c.getComputedStyle ? e ? f.defaultView.getComputedStyle(t, null).getPropertyValue(e) : f.defaultView.getComputedStyle(t, null) : t.currentStyle ? e ? t.currentStyle[e.replace(/-\w/g, function (t) {
      return t.toUpperCase().replace("-", "");
    })] : t.currentStyle : void 0;
  },
      l = function l(t) {
    var e = t.getBoundingClientRect(),
        o = c.pageYOffset || f.documentElement.scrollTop,
        i = c.pageXOffset || f.documentElement.scrollLeft;
    return {
      top: e.top + o,
      left: e.left + i
    };
  };

  t.Helpers = {
    isEmptyObject: function isEmptyObject(t) {
      for (var e in t) {
        return !1;
      }

      return !0;
    },
    debounce: function debounce(i, n, s) {
      var r = void 0;
      return function () {
        var t = this,
            e = arguments,
            o = s && !r;
        clearTimeout(r), r = setTimeout(function () {
          r = null, s || i.apply(t, e);
        }, n), o && i.apply(t, e);
      };
    },
    hasClass: function hasClass(t, e) {
      return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className);
    },
    offset: l,
    position: function position(t) {
      var e = t.offsetParent,
          o = l(e),
          i = l(t),
          n = r(e),
          s = r(t);
      return o.top += parseInt(n.borderTopWidth) || 0, o.left += parseInt(n.borderLeftWidth) || 0, {
        top: i.top - o.top - (parseInt(s.marginTop) || 0),
        left: i.left - o.left - (parseInt(s.marginLeft) || 0)
      };
    },
    getStyle: r,
    getCascadedStyle: function getCascadedStyle(t) {
      var e = t.cloneNode(!0);
      e.style.display = "none", Array.prototype.slice.call(e.querySelectorAll('input[type="radio"]')).forEach(function (t) {
        t.removeAttribute("name");
      }), t.parentNode.insertBefore(e, t.nextSibling);
      var o = void 0;
      e.currentStyle ? o = e.currentStyle : c.getComputedStyle && (o = f.defaultView.getComputedStyle(e, null));
      var i = {};

      for (var n in o) {
        !isNaN(n) || "string" != typeof o[n] && "number" != typeof o[n] || (i[n] = o[n]);
      }

      if (Object.keys(i).length < 3) for (var s in i = {}, o) {
        isNaN(s) || (i[o[s].replace(/-\w/g, function (t) {
          return t.toUpperCase().replace("-", "");
        })] = o.getPropertyValue(o[s]));
      }

      if (i.margin || "auto" !== i.marginLeft ? i.margin || i.marginLeft !== i.marginRight || i.marginLeft !== i.marginTop || i.marginLeft !== i.marginBottom || (i.margin = i.marginLeft) : i.margin = "auto", !i.margin && "0px" === i.marginLeft && "0px" === i.marginRight) {
        var r = t.offsetLeft - t.parentNode.offsetLeft,
            l = r - (parseInt(i.left) || 0) - (parseInt(i.right) || 0),
            a = t.parentNode.offsetWidth - t.offsetWidth - r - (parseInt(i.right) || 0) + (parseInt(i.left) || 0) - l;
        0 !== a && 1 !== a || (i.margin = "auto");
      }

      return e.parentNode.removeChild(e), e = null, i;
    },
    event: e
  };
}(window);
"use strict";

/*! Swipebox v1.4.4 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */
;

(function (window, document, $, undefined) {
  $.swipebox = function (elem, options) {
    // Default options
    var ui,
        defaults = {
      useCSS: true,
      useSVG: true,
      initialIndexOnArray: 0,
      removeBarsOnMobile: true,
      hideCloseButtonOnMobile: false,
      hideBarsDelay: 3000,
      videoMaxWidth: 1140,
      vimeoColor: 'cccccc',
      beforeOpen: null,
      afterOpen: null,
      afterClose: null,
      afterMedia: null,
      nextSlide: null,
      prevSlide: null,
      loopAtEnd: false,
      autoplayVideos: false,
      queryStringData: {},
      toggleClassOnLoad: ''
    },
        plugin = this,
        elements = [],
        // slides array [ { href:'...', title:'...' }, ...],
    $elem,
        selector = elem.selector,
        isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
        isTouch = isMobile !== null || document.createTouch !== undefined || 'ontouchstart' in window || 'onmsgesturechange' in window || navigator.msMaxTouchPoints,
        supportSVG = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
        winWidth = window.innerWidth ? window.innerWidth : $(window).width(),
        winHeight = window.innerHeight ? window.innerHeight : $(window).height(),
        currentX = 0,

    /* jshint multistr: true */
    html = '<div id="swipebox-overlay">\
					<div id="swipebox-container">\
						<div id="swipebox-slider"></div>\
						<div id="swipebox-top-bar">\
							<div id="swipebox-title"></div>\
						</div>\
						<div id="swipebox-bottom-bar">\
							<div id="swipebox-arrows">\
								<a id="swipebox-prev"></a>\
								<a id="swipebox-next"></a>\
							</div>\
						</div>\
						<a id="swipebox-close"></a>\
					</div>\
			</div>';
    plugin.settings = {};

    $.swipebox.close = function () {
      ui.closeSlide();
    };

    $.swipebox.extend = function () {
      return ui;
    };

    plugin.init = function () {
      plugin.settings = $.extend({}, defaults, options);

      if ($.isArray(elem)) {
        elements = elem;
        ui.target = $(window);
        ui.init(plugin.settings.initialIndexOnArray);
      } else {
        $(document).on('click', selector, function (event) {
          // console.log( isTouch );
          if (event.target.parentNode.className === 'slide current') {
            return false;
          }

          if (!$.isArray(elem)) {
            ui.destroy();
            $elem = $(selector);
            ui.actions();
          }

          elements = [];
          var index, relType, relVal; // Allow for HTML5 compliant attribute before legacy use of rel

          if (!relVal) {
            relType = 'data-rel';
            relVal = $(this).attr(relType);
          }

          if (!relVal) {
            relType = 'rel';
            relVal = $(this).attr(relType);
          }

          if (relVal && relVal !== '' && relVal !== 'nofollow') {
            $elem = $(selector).filter('[' + relType + '="' + relVal + '"]');
          } else {
            $elem = $(selector);
          }

          $elem.each(function () {
            var title = null,
                href = null;

            if ($(this).attr('title')) {
              title = $(this).attr('title');
            }

            if ($(this).attr('href')) {
              href = $(this).attr('href');
            }

            elements.push({
              href: href,
              title: title
            });
          });
          index = $elem.index($(this));
          event.preventDefault();
          event.stopPropagation();
          ui.target = $(event.target);
          ui.init(index);
        });
      }
    };

    ui = {
      /**
       * Initiate Swipebox
       */
      init: function init(index) {
        if (plugin.settings.beforeOpen) {
          plugin.settings.beforeOpen();
        }

        this.target.trigger('swipebox-start');
        $.swipebox.isOpen = true;
        this.build();
        this.openSlide(index);
        this.openMedia(index);
        this.preloadMedia(index + 1);
        this.preloadMedia(index - 1);

        if (plugin.settings.afterOpen) {
          plugin.settings.afterOpen(index);
        }
      },

      /**
       * Built HTML containers and fire main functions
       */
      build: function build() {
        var $this = this,
            bg;
        $('body').append(html);

        if (supportSVG && plugin.settings.useSVG === true) {
          bg = $('#swipebox-close').css('background-image');
          bg = bg.replace('png', 'svg');
          $('#swipebox-prev, #swipebox-next, #swipebox-close').css({
            'background-image': bg
          });
        }

        if (isMobile && plugin.settings.removeBarsOnMobile) {
          $('#swipebox-bottom-bar, #swipebox-top-bar').remove();
        }

        $.each(elements, function () {
          $('#swipebox-slider').append('<div class="slide"></div>');
        });
        $this.setDim();
        $this.actions();

        if (isTouch) {
          $this.gesture();
        } // Devices can have both touch and keyboard input so always allow key events


        $this.keyboard();
        $this.animBars();
        $this.resize();
      },

      /**
       * Set dimensions depending on windows width and height
       */
      setDim: function setDim() {
        var width,
            height,
            sliderCss = {}; // Reset dimensions on mobile orientation change

        if ('onorientationchange' in window) {
          window.addEventListener('orientationchange', function () {
            if (window.orientation === 0) {
              width = winWidth;
              height = winHeight;
            } else if (window.orientation === 90 || window.orientation === -90) {
              width = winHeight;
              height = winWidth;
            }
          }, false);
        } else {
          width = window.innerWidth ? window.innerWidth : $(window).width();
          height = window.innerHeight ? window.innerHeight : $(window).height();
        }

        sliderCss = {
          width: width,
          height: height
        };
        $('#swipebox-overlay').css(sliderCss);
      },

      /**
       * Reset dimensions on window resize envent
       */
      resize: function resize() {
        var $this = this;
        $(window).resize(function () {
          $this.setDim();
        }).resize();
      },

      /**
       * Check if device supports CSS transitions
       */
      supportTransition: function supportTransition() {
        var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split(' '),
            i;

        for (i = 0; i < prefixes.length; i++) {
          if (document.createElement('div').style[prefixes[i]] !== undefined) {
            return prefixes[i];
          }
        }

        return false;
      },

      /**
       * Check if CSS transitions are allowed (options + devicesupport)
       */
      doCssTrans: function doCssTrans() {
        if (plugin.settings.useCSS && this.supportTransition()) {
          return true;
        }
      },

      /**
       * Touch navigation
       */
      gesture: function gesture() {
        var $this = this,
            index,
            hDistance,
            vDistance,
            hDistanceLast,
            vDistanceLast,
            hDistancePercent,
            vSwipe = false,
            hSwipe = false,
            hSwipMinDistance = 10,
            vSwipMinDistance = 50,
            startCoords = {},
            endCoords = {},
            bars = $('#swipebox-top-bar, #swipebox-bottom-bar'),
            slider = $('#swipebox-slider');
        bars.addClass('visible-bars');
        $this.setTimeout();
        $('body').bind('touchstart', function (event) {
          $(this).addClass('touching');
          index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
          endCoords = event.originalEvent.targetTouches[0];
          startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
          startCoords.pageY = event.originalEvent.targetTouches[0].pageY;
          $('#swipebox-slider').css({
            '-webkit-transform': 'translate3d(' + currentX + '%, 0, 0)',
            'transform': 'translate3d(' + currentX + '%, 0, 0)'
          });
          $('.touching').bind('touchmove', function (event) {
            event.preventDefault();
            event.stopPropagation();
            endCoords = event.originalEvent.targetTouches[0];

            if (!hSwipe) {
              vDistanceLast = vDistance;
              vDistance = endCoords.pageY - startCoords.pageY;

              if (Math.abs(vDistance) >= vSwipMinDistance || vSwipe) {
                var opacity = 0.75 - Math.abs(vDistance) / slider.height();
                slider.css({
                  'top': vDistance + 'px'
                });
                slider.css({
                  'opacity': opacity
                });
                vSwipe = true;
              }
            }

            hDistanceLast = hDistance;
            hDistance = endCoords.pageX - startCoords.pageX;
            hDistancePercent = hDistance * 100 / winWidth;

            if (!hSwipe && !vSwipe && Math.abs(hDistance) >= hSwipMinDistance) {
              $('#swipebox-slider').css({
                '-webkit-transition': '',
                'transition': ''
              });
              hSwipe = true;
            }

            if (hSwipe) {
              // swipe left
              if (0 < hDistance) {
                // first slide
                if (0 === index) {
                  // console.log( 'first' );
                  $('#swipebox-overlay').addClass('leftSpringTouch');
                } else {
                  // Follow gesture
                  $('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
                  $('#swipebox-slider').css({
                    '-webkit-transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)',
                    'transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)'
                  });
                } // swipe rught

              } else if (0 > hDistance) {
                // last Slide
                if (elements.length === index + 1) {
                  // console.log( 'last' );
                  $('#swipebox-overlay').addClass('rightSpringTouch');
                } else {
                  $('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
                  $('#swipebox-slider').css({
                    '-webkit-transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)',
                    'transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)'
                  });
                }
              }
            }
          });
          return false;
        }).bind('touchend', function (event) {
          event.preventDefault();
          event.stopPropagation();
          $('#swipebox-slider').css({
            '-webkit-transition': '-webkit-transform 0.4s ease',
            'transition': 'transform 0.4s ease'
          });
          vDistance = endCoords.pageY - startCoords.pageY;
          hDistance = endCoords.pageX - startCoords.pageX;
          hDistancePercent = hDistance * 100 / winWidth; // Swipe to bottom to close

          if (vSwipe) {
            vSwipe = false;

            if (Math.abs(vDistance) >= 2 * vSwipMinDistance && Math.abs(vDistance) > Math.abs(vDistanceLast)) {
              var vOffset = vDistance > 0 ? slider.height() : -slider.height();
              slider.animate({
                top: vOffset + 'px',
                'opacity': 0
              }, 300, function () {
                $this.closeSlide();
              });
            } else {
              slider.animate({
                top: 0,
                'opacity': 1
              }, 300);
            }
          } else if (hSwipe) {
            hSwipe = false; // swipeLeft

            if (hDistance >= hSwipMinDistance && hDistance >= hDistanceLast) {
              $this.getPrev(); // swipeRight
            } else if (hDistance <= -hSwipMinDistance && hDistance <= hDistanceLast) {
              $this.getNext();
            }
          } else {
            // Top and bottom bars have been removed on touchable devices
            // tap
            if (!bars.hasClass('visible-bars')) {
              $this.showBars();
              $this.setTimeout();
            } else {
              $this.clearTimeout();
              $this.hideBars();
            }
          }

          $('#swipebox-slider').css({
            '-webkit-transform': 'translate3d(' + currentX + '%, 0, 0)',
            'transform': 'translate3d(' + currentX + '%, 0, 0)'
          });
          $('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
          $('.touching').off('touchmove').removeClass('touching');
        });
      },

      /**
       * Set timer to hide the action bars
       */
      setTimeout: function setTimeout() {
        if (plugin.settings.hideBarsDelay > 0) {
          var $this = this;
          $this.clearTimeout();
          $this.timeout = window.setTimeout(function () {
            $this.hideBars();
          }, plugin.settings.hideBarsDelay);
        }
      },

      /**
       * Clear timer
       */
      clearTimeout: function clearTimeout() {
        window.clearTimeout(this.timeout);
        this.timeout = null;
      },

      /**
       * Show navigation and title bars
       */
      showBars: function showBars() {
        var bars = $('#swipebox-top-bar, #swipebox-bottom-bar');

        if (this.doCssTrans()) {
          bars.addClass('visible-bars');
        } else {
          $('#swipebox-top-bar').animate({
            top: 0
          }, 500);
          $('#swipebox-bottom-bar').animate({
            bottom: 0
          }, 500);
          setTimeout(function () {
            bars.addClass('visible-bars');
          }, 1000);
        }
      },

      /**
       * Hide navigation and title bars
       */
      hideBars: function hideBars() {
        var bars = $('#swipebox-top-bar, #swipebox-bottom-bar');

        if (this.doCssTrans()) {
          bars.removeClass('visible-bars');
        } else {
          $('#swipebox-top-bar').animate({
            top: '-50px'
          }, 500);
          $('#swipebox-bottom-bar').animate({
            bottom: '-50px'
          }, 500);
          setTimeout(function () {
            bars.removeClass('visible-bars');
          }, 1000);
        }
      },

      /**
       * Animate navigation and top bars
       */
      animBars: function animBars() {
        var $this = this,
            bars = $('#swipebox-top-bar, #swipebox-bottom-bar');
        bars.addClass('visible-bars');
        $this.setTimeout();
        $('#swipebox-slider').click(function () {
          if (!bars.hasClass('visible-bars')) {
            $this.showBars();
            $this.setTimeout();
          }
        });
        $('#swipebox-bottom-bar').hover(function () {
          $this.showBars();
          bars.addClass('visible-bars');
          $this.clearTimeout();
        }, function () {
          if (plugin.settings.hideBarsDelay > 0) {
            bars.removeClass('visible-bars');
            $this.setTimeout();
          }
        });
      },

      /**
       * Keyboard navigation
       */
      keyboard: function keyboard() {
        var $this = this;
        $(window).bind('keyup', function (event) {
          event.preventDefault();
          event.stopPropagation();

          if (event.keyCode === 37) {
            $this.getPrev();
          } else if (event.keyCode === 39) {
            $this.getNext();
          } else if (event.keyCode === 27) {
            $this.closeSlide();
          }
        });
      },

      /**
       * Navigation events : go to next slide, go to prevous slide and close
       */
      actions: function actions() {
        var $this = this,
            action = 'touchend click'; // Just detect for both event types to allow for multi-input

        if (elements.length < 2) {
          $('#swipebox-bottom-bar').hide();

          if (undefined === elements[1]) {
            $('#swipebox-top-bar').hide();
          }
        } else {
          $('#swipebox-prev').bind(action, function (event) {
            event.preventDefault();
            event.stopPropagation();
            $this.getPrev();
            $this.setTimeout();
          });
          $('#swipebox-next').bind(action, function (event) {
            event.preventDefault();
            event.stopPropagation();
            $this.getNext();
            $this.setTimeout();
          });
        }

        $('#swipebox-close').bind(action, function () {
          $this.closeSlide();
        });
      },

      /**
       * Set current slide
       */
      setSlide: function setSlide(index, isFirst) {
        isFirst = isFirst || false;
        var slider = $('#swipebox-slider');
        currentX = -index * 100;

        if (this.doCssTrans()) {
          slider.css({
            '-webkit-transform': 'translate3d(' + -index * 100 + '%, 0, 0)',
            'transform': 'translate3d(' + -index * 100 + '%, 0, 0)'
          });
        } else {
          slider.animate({
            left: -index * 100 + '%'
          });
        }

        $('#swipebox-slider .slide').removeClass('current');
        $('#swipebox-slider .slide').eq(index).addClass('current');
        this.setTitle(index);

        if (isFirst) {
          slider.fadeIn();
        }

        $('#swipebox-prev, #swipebox-next').removeClass('disabled');

        if (index === 0) {
          $('#swipebox-prev').addClass('disabled');
        } else if (index === elements.length - 1 && plugin.settings.loopAtEnd !== true) {
          $('#swipebox-next').addClass('disabled');
        }
      },

      /**
       * Open slide
       */
      openSlide: function openSlide(index) {
        $('html').addClass('swipebox-html');

        if (isTouch) {
          $('html').addClass('swipebox-touch');

          if (plugin.settings.hideCloseButtonOnMobile) {
            $('html').addClass('swipebox-no-close-button');
          }
        } else {
          $('html').addClass('swipebox-no-touch');
        }

        $(window).trigger('resize'); // fix scroll bar visibility on desktop

        this.setSlide(index, true);
      },

      /**
       * Set a time out if the media is a video
       */
      preloadMedia: function preloadMedia(index) {
        var $this = this,
            src = null;

        if (elements[index] !== undefined) {
          src = elements[index].href;
        }

        if (!$this.isVideo(src)) {
          setTimeout(function () {
            $this.openMedia(index);
          }, 1000);
        } else {
          $this.openMedia(index);
        }
      },

      /**
       * Open
       */
      openMedia: function openMedia(index) {
        var $this = this,
            src,
            slide;

        if (elements[index] !== undefined) {
          src = elements[index].href;
        }

        if (index < 0 || index >= elements.length) {
          return false;
        }

        slide = $('#swipebox-slider .slide').eq(index);

        if (!$this.isVideo(src)) {
          slide.addClass('slide-loading');
          $this.loadMedia(src, function () {
            slide.removeClass('slide-loading');
            slide.html(this);

            if (plugin.settings.afterMedia) {
              plugin.settings.afterMedia(index);
            }
          });
        } else {
          slide.html($this.getVideo(src));

          if (plugin.settings.afterMedia) {
            plugin.settings.afterMedia(index);
          }
        }
      },

      /**
       * Set link title attribute as caption
       */
      setTitle: function setTitle(index) {
        var title = null;
        $('#swipebox-title').empty();

        if (elements[index] !== undefined) {
          title = elements[index].title;
        }

        if (title) {
          $('#swipebox-top-bar').show();
          $('#swipebox-title').append(title);
        } else {
          $('#swipebox-top-bar').hide();
        }
      },

      /**
       * Check if the URL is a video
       */
      isVideo: function isVideo(src) {
        if (src) {
          if (src.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || src.match(/vimeo\.com\/([0-9]*)/) || src.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) {
            return true;
          }

          if (src.toLowerCase().indexOf('swipeboxvideo=1') >= 0) {
            return true;
          }
        }
      },

      /**
       * Parse URI querystring and:
       * - overrides value provided via dictionary
       * - rebuild it again returning a string
       */
      parseUri: function parseUri(uri, customData) {
        var a = document.createElement('a'),
            qs = {}; // Decode the URI

        a.href = decodeURIComponent(uri); // QueryString to Object

        if (a.search) {
          qs = JSON.parse('{"' + a.search.toLowerCase().replace('?', '').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        } // Extend with custom data


        if ($.isPlainObject(customData)) {
          qs = $.extend(qs, customData, plugin.settings.queryStringData); // The dev has always the final word
        } // Return querystring as a string


        return $.map(qs, function (val, key) {
          if (val && val > '') {
            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
          }
        }).join('&');
      },

      /**
       * Get video iframe code from URL
       */
      getVideo: function getVideo(url) {
        var iframe = '',
            youtubeUrl = url.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/),
            youtubeShortUrl = url.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/),
            vimeoUrl = url.match(/(?:www\.)?vimeo\.com\/([0-9]*)/),
            qs = '';

        if (youtubeUrl || youtubeShortUrl) {
          if (youtubeShortUrl) {
            youtubeUrl = youtubeShortUrl;
          }

          qs = ui.parseUri(url, {
            'autoplay': plugin.settings.autoplayVideos ? '1' : '0',
            'v': ''
          });
          iframe = '<iframe width="560" height="315" src="//' + youtubeUrl[1] + '/embed/' + youtubeUrl[2] + '?' + qs + '" frameborder="0" allowfullscreen></iframe>';
        } else if (vimeoUrl) {
          qs = ui.parseUri(url, {
            'autoplay': plugin.settings.autoplayVideos ? '1' : '0',
            'byline': '0',
            'portrait': '0',
            'color': plugin.settings.vimeoColor
          });
          iframe = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + vimeoUrl[1] + '?' + qs + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
        } else {
          iframe = '<iframe width="560" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
        }

        return '<div class="swipebox-video-container" style="max-width:' + plugin.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + iframe + '</div></div>';
      },

      /**
       * Load image
       */
      loadMedia: function loadMedia(src, callback) {
        // Inline content
        if (src.trim().indexOf('#') === 0) {
          callback.call($('<div>', {
            'class': 'swipebox-inline-container'
          }).append($(src).clone().toggleClass(plugin.settings.toggleClassOnLoad)));
        } // Everything else
        else {
            if (!this.isVideo(src)) {
              var img = $('<img>').on('load', function () {
                callback.call(img);
              });
              img.attr('src', src);
            }
          }
      },

      /**
       * Get next slide
       */
      getNext: function getNext() {
        var $this = this,
            src,
            index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));

        if (index + 1 < elements.length) {
          src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
          $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
          index++;
          $this.setSlide(index);
          $this.preloadMedia(index + 1);

          if (plugin.settings.nextSlide) {
            plugin.settings.nextSlide(index);
          }
        } else {
          if (plugin.settings.loopAtEnd === true) {
            src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
            $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
            index = 0;
            $this.preloadMedia(index);
            $this.setSlide(index);
            $this.preloadMedia(index + 1);

            if (plugin.settings.nextSlide) {
              plugin.settings.nextSlide(index);
            }
          } else {
            $('#swipebox-overlay').addClass('rightSpring');
            setTimeout(function () {
              $('#swipebox-overlay').removeClass('rightSpring');
            }, 500);
          }
        }
      },

      /**
       * Get previous slide
       */
      getPrev: function getPrev() {
        var index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current')),
            src;

        if (index > 0) {
          src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
          $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
          index--;
          this.setSlide(index);
          this.preloadMedia(index - 1);

          if (plugin.settings.prevSlide) {
            plugin.settings.prevSlide(index);
          }
        } else {
          $('#swipebox-overlay').addClass('leftSpring');
          setTimeout(function () {
            $('#swipebox-overlay').removeClass('leftSpring');
          }, 500);
        }
      },

      /* jshint unused:false */
      nextSlide: function nextSlide(index) {// Callback for next slide
      },
      prevSlide: function prevSlide(index) {// Callback for prev slide
      },

      /**
       * Close
       */
      closeSlide: function closeSlide() {
        $('html').removeClass('swipebox-html');
        $('html').removeClass('swipebox-touch');
        $(window).trigger('resize');
        this.destroy();
      },

      /**
       * Destroy the whole thing
       */
      destroy: function destroy() {
        $(window).unbind('keyup');
        $('body').unbind('touchstart');
        $('body').unbind('touchmove');
        $('body').unbind('touchend');
        $('#swipebox-slider').unbind();
        $('#swipebox-overlay').remove();

        if (!$.isArray(elem)) {
          elem.removeData('_swipebox');
        }

        if (this.target) {
          this.target.trigger('swipebox-destroy');
        }

        $.swipebox.isOpen = false;

        if (plugin.settings.afterClose) {
          plugin.settings.afterClose();
        }
      }
    };
    plugin.init();
  };

  $.fn.swipebox = function (options) {
    if (!$.data(this, '_swipebox')) {
      var swipebox = new $.swipebox(this, options);
      this.data('_swipebox', swipebox);
    }

    return this.data('_swipebox');
  };
})(window, document, jQuery);