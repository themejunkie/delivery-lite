// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

/***************************************************************

  Table of Content:
  - Formalize
  - imagesLoaded
  - FitVids
  - Superfish
  - Supersubs
  - hoverIntent
  - Flexslider
  - jQuery.mmenu
  - TinyNav.js

*****************************************************************/

/*
  Formalize - version 1.2

  Note: This file depends on the jQuery library.
*/

// Module pattern:
// http://yuiblog.com/blog/2007/06/12/module-pattern
var FORMALIZE = (function($, window, document, undefined) {
  // Internet Explorer detection.
  function IE(version) {
	var b = document.createElement('b');
	b.innerHTML = '<!--[if IE ' + version + ']><br><![endif]-->';
	return !!b.getElementsByTagName('br').length;
  }

  // Private constants.
  var PLACEHOLDER_SUPPORTED = 'placeholder' in document.createElement('input');
  var AUTOFOCUS_SUPPORTED = 'autofocus' in document.createElement('input');
  var IE6 = IE(6);
  var IE7 = IE(7);

  // Expose innards of FORMALIZE.
  return {
	// FORMALIZE.go
	go: function() {
	  var i, j = this.init;

	  for (i in j) {
		j.hasOwnProperty(i) && j[i]();
	  }
	},
	// FORMALIZE.init
	init: {
	  // FORMALIZE.init.disable_link_button
	  disable_link_button: function() {
		$(document.documentElement).on('click', 'a.button_disabled', function() {
		  return false;
		});
	  },
	  // FORMALIZE.init.full_input_size
	  full_input_size: function() {
		if (!IE7 || !$('textarea, input.input_full').length) {
		  return;
		}

		// This fixes width: 100% on <textarea> and class="input_full".
		// It ensures that form elements don't go wider than container.
		$('textarea, input.input_full').wrap('<span class="input_full_wrap"></span>');
	  },
	  // FORMALIZE.init.ie6_skin_inputs
	  ie6_skin_inputs: function() {
		// Test for Internet Explorer 6.
		if (!IE6 || !$('input, select, textarea').length) {
		  // Exit if the browser is not IE6,
		  // or if no form elements exist.
		  return;
		}

		// For <input type="submit" />, etc.
		var button_regex = /button|submit|reset/;

		// For <input type="text" />, etc.
		var type_regex = /date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;

		$('input').each(function() {
		  var el = $(this);

		  // Is it a button?
		  if (this.getAttribute('type').match(button_regex)) {
			el.addClass('ie6_button');

			/* Is it disabled? */
			if (this.disabled) {
			  el.addClass('ie6_button_disabled');
			}
		  }
		  // Or is it a textual input?
		  else if (this.getAttribute('type').match(type_regex)) {
			el.addClass('ie6_input');

			/* Is it disabled? */
			if (this.disabled) {
			  el.addClass('ie6_input_disabled');
			}
		  }
		});

		$('textarea, select').each(function() {
		  /* Is it disabled? */
		  if (this.disabled) {
			$(this).addClass('ie6_input_disabled');
		  }
		});
	  },
	  // FORMALIZE.init.autofocus
	  autofocus: function() {
		if (AUTOFOCUS_SUPPORTED || !$(':input[autofocus]').length) {
		  return;
		}

		var el = $('[autofocus]')[0];

		if (!el.disabled) {
		  el.focus();
		}
	  },
	  // FORMALIZE.init.placeholder
	  placeholder: function() {
		if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
		  // Exit if placeholder is supported natively,
		  // or if page does not have any placeholder.
		  return;
		}

		FORMALIZE.misc.add_placeholder();

		$(':input[placeholder]').each(function() {
		  // Placeholder obscured in older browsers,
		  // so there's no point adding to password.
		  if (this.type === 'password') {
			return;
		  }

		  var el = $(this);
		  var text = el.attr('placeholder');

		  el.focus(function() {
			if (el.val() === text) {
			  el.val('').removeClass('placeholder_text');
			}
		  }).blur(function() {
			FORMALIZE.misc.add_placeholder();
		  });

		  // Prevent <form> from accidentally
		  // submitting the placeholder text.
		  el.closest('form').submit(function() {
			if (el.val() === text) {
			  el.val('').removeClass('placeholder_text');
			}
		  }).on('reset', function() {
			setTimeout(FORMALIZE.misc.add_placeholder, 50);
		  });
		});
	  }
	},
	// FORMALIZE.misc
	misc: {
	  // FORMALIZE.misc.add_placeholder
	  add_placeholder: function() {
		if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
		  // Exit if placeholder is supported natively,
		  // or if page does not have any placeholder.
		  return;
		}

		$(':input[placeholder]').each(function() {
		  // Placeholder obscured in older browsers,
		  // so there's no point adding to password.
		  if (this.type === 'password') {
			return;
		  }

		  var el = $(this);
		  var text = el.attr('placeholder');

		  if (!el.val() || el.val() === text) {
			el.val(text).addClass('placeholder_text');
		  }
		});
	  }
	}
  };
// Alias jQuery, window, document.
})(jQuery, this, this.document);

// Automatically calls all functions in FORMALIZE.init
jQuery(document).ready(function() {
  FORMALIZE.go();
});

/*!
 * imagesLoaded PACKAGED v3.1.6
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
	obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
	obj[ type + fn ] = fn.handleEvent ?
	  function() {
		var event = getIEEvent( obj );
		fn.handleEvent.call( fn, event );
	  } :
	  function() {
		var event = getIEEvent( obj );
		fn.call( obj, event );
	  };
	obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
	obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
	obj.detachEvent( "on" + type, obj[ type + fn ] );
	try {
	  delete obj[ type + fn ];
	} catch ( err ) {
	  // can't delete window object properties
	  obj[ type + fn ] = undefined;
	}
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.6
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
	// AMD
	define( [
	  'eventEmitter/EventEmitter',
	  'eventie/eventie'
	], function( EventEmitter, eventie ) {
	  return factory( window, EventEmitter, eventie );
	});
  } else if ( typeof exports === 'object' ) {
	// CommonJS
	module.exports = factory(
	  window,
	  require('eventEmitter'),
	  require('eventie')
	);
  } else {
	// browser global
	window.imagesLoaded = factory(
	  window,
	  window.EventEmitter,
	  window.eventie
	);
  }

})( this,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
	a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
	// use object if already an array
	ary = obj;
  } else if ( typeof obj.length === 'number' ) {
	// convert nodeList to array
	for ( var i=0, len = obj.length; i < len; i++ ) {
	  ary.push( obj[i] );
	}
  } else {
	// array of single index
	ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
	// coerce ImagesLoaded() without new, to be new ImagesLoaded()
	if ( !( this instanceof ImagesLoaded ) ) {
	  return new ImagesLoaded( elem, options );
	}
	// use elem as selector string
	if ( typeof elem === 'string' ) {
	  elem = document.querySelectorAll( elem );
	}

	this.elements = makeArray( elem );
	this.options = extend( {}, this.options );

	if ( typeof options === 'function' ) {
	  onAlways = options;
	} else {
	  extend( this.options, options );
	}

	if ( onAlways ) {
	  this.on( 'always', onAlways );
	}

	this.getImages();

	if ( $ ) {
	  // add jQuery Deferred object
	  this.jqDeferred = new $.Deferred();
	}

	// HACK check async to allow time to bind listeners
	var _this = this;
	setTimeout( function() {
	  _this.check();
	});
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
	this.images = [];

	// filter & find items if we have an item selector
	for ( var i=0, len = this.elements.length; i < len; i++ ) {
	  var elem = this.elements[i];
	  // filter siblings
	  if ( elem.nodeName === 'IMG' ) {
		this.addImage( elem );
	  }
	  // find children
	  // no non-element nodes, #143
	  var nodeType = elem.nodeType;
	  if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
		continue;
	  }
	  var childElems = elem.querySelectorAll('img');
	  // concat childElems to filterFound array
	  for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
		var img = childElems[j];
		this.addImage( img );
	  }
	}
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
	var loadingImage = new LoadingImage( img );
	this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
	var _this = this;
	var checkedCount = 0;
	var length = this.images.length;
	this.hasAnyBroken = false;
	// complete if no images
	if ( !length ) {
	  this.complete();
	  return;
	}

	function onConfirm( image, message ) {
	  if ( _this.options.debug && hasConsole ) {
		console.log( 'confirm', image, message );
	  }

	  _this.progress( image );
	  checkedCount++;
	  if ( checkedCount === length ) {
		_this.complete();
	  }
	  return true; // bind once
	}

	for ( var i=0; i < length; i++ ) {
	  var loadingImage = this.images[i];
	  loadingImage.on( 'confirm', onConfirm );
	  loadingImage.check();
	}
  };

  ImagesLoaded.prototype.progress = function( image ) {
	this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
	// HACK - Chrome triggers event before object properties have changed. #83
	var _this = this;
	setTimeout( function() {
	  _this.emit( 'progress', _this, image );
	  if ( _this.jqDeferred && _this.jqDeferred.notify ) {
		_this.jqDeferred.notify( _this, image );
	  }
	});
  };

  ImagesLoaded.prototype.complete = function() {
	var eventName = this.hasAnyBroken ? 'fail' : 'done';
	this.isComplete = true;
	var _this = this;
	// HACK - another setTimeout so that confirm happens after progress
	setTimeout( function() {
	  _this.emit( eventName, _this );
	  _this.emit( 'always', _this );
	  if ( _this.jqDeferred ) {
		var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
		_this.jqDeferred[ jqMethod ]( _this );
	  }
	});
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
	$.fn.imagesLoaded = function( options, callback ) {
	  var instance = new ImagesLoaded( this, options, callback );
	  return instance.jqDeferred.promise( $(this) );
	};
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
	this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
	// first check cached any previous images that have same src
	var resource = cache[ this.img.src ] || new Resource( this.img.src );
	if ( resource.isConfirmed ) {
	  this.confirm( resource.isLoaded, 'cached was confirmed' );
	  return;
	}

	// If complete is true and browser supports natural sizes,
	// try to check for image status manually.
	if ( this.img.complete && this.img.naturalWidth !== undefined ) {
	  // report based on naturalWidth
	  this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
	  return;
	}

	// If none of the checks above matched, simulate loading on detached element.
	var _this = this;
	resource.on( 'confirm', function( resrc, message ) {
	  _this.confirm( resrc.isLoaded, message );
	  return true;
	});

	resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
	this.isLoaded = isLoaded;
	this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
	this.src = src;
	// add to cache
	cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
	// only trigger checking once
	if ( this.isChecked ) {
	  return;
	}
	// simulate loading on detached element
	var proxyImage = new Image();
	eventie.bind( proxyImage, 'load', this );
	eventie.bind( proxyImage, 'error', this );
	proxyImage.src = this.src;
	// set flag
	this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
	var method = 'on' + event.type;
	if ( this[ method ] ) {
	  this[ method ]( event );
	}
  };

  Resource.prototype.onload = function( event ) {
	this.confirm( true, 'onload' );
	this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
	this.confirm( false, 'onerror' );
	this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
	this.isConfirmed = true;
	this.isLoaded = isLoaded;
	this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
	eventie.unbind( event.target, 'load', this );
	eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
	var settings = {
	  customSelector: null,
	  ignore: null,
	};

	if(!document.getElementById('fit-vids-style')) {
	  // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
	  var head = document.head || document.getElementsByTagName('head')[0];
	  var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
	  var div = document.createElement('div');
	  div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
	  head.appendChild(div.childNodes[1]);
	}

	if ( options ) {
	  $.extend( settings, options );
	}

	return this.each(function(){
	  var selectors = [
		"iframe[src*='player.vimeo.com']",
		"iframe[src*='youtube.com']",
		"iframe[src*='youtube-nocookie.com']",
		"iframe[src*='kickstarter.com'][src*='video.html']",
		"object",
		"embed"
	  ];

	  if (settings.customSelector) {
		selectors.push(settings.customSelector);
	  }

	  var ignoreList = '.fitvidsignore';

	  if(settings.ignore) {
		ignoreList = ignoreList + ', ' + settings.ignore;
	  }

	  var $allVideos = $(this).find(selectors.join(','));
	  $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
	  $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

	  $allVideos.each(function(){
		var $this = $(this);
		if($this.parents(ignoreList).length > 0) {
		  return; // Disable FitVids on this video.
		}
		if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
		if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
		{
		  $this.attr('height', 9);
		  $this.attr('width', 16);
		}
		var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
			width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
			aspectRatio = height / width;
		if(!$this.attr('id')){
		  var videoID = 'fitvid' + Math.floor(Math.random()*999999);
		  $this.attr('id', videoID);
		}
		$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
		$this.removeAttr('height').removeAttr('width');
	  });
	});
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*
 * jQuery Superfish Menu Plugin - v1.7.4
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

;(function ($) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// iOS clicks only bubble as far as body children
					$(window).load(function () {
						$('body').children().on('click', $.noop);
					});
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var touchAction = $menu.css('ms-touch-action');
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css('ms-touch-action', touchAction);
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);
					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				o.onBeforeShow.call($ul);
				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop
	};

	// soon to be deprecated
	$.fn.extend({
		hideSuperfishUl: methods.hide,
		showSuperfishUl: methods.show
	});

})(jQuery);


/*
 * Supersubs v0.3b - jQuery plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

;(function($){ // $ will refer to jQuery within this closure

	$.fn.supersubs = function(options){
		var opts = $.extend({}, $.fn.supersubs.defaults, options);
		// return original object to support chaining
		return this.each(function() {
			// cache selections
			var $$ = $(this);
			// support metadata
			var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
			// cache all ul elements and show them in preparation for measurements
			$ULs = $$.find('ul').show();
			// get the font size of menu.
			// .css('fontSize') returns various results cross-browser, so measure an em dash instead
			var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
				'padding' : 0,
				'position' : 'absolute',
				'top' : '-999em',
				'width' : 'auto'
			}).appendTo($$)[0].clientWidth; //clientWidth is faster than .width()
			// remove em dash
			$('#menu-fontsize').remove();
			// loop through each ul in menu
			$ULs.each(function(i) {	
				// cache this ul
				var $ul = $(this);
				// get all (li) children of this ul
				var $LIs = $ul.children();
				// get all anchor grand-children
				var $As = $LIs.children('a');
				// force content to one line and save current float property
				var liFloat = $LIs.css('white-space','nowrap').css('float');
				// remove width restrictions and floats so elements remain vertically stacked
				$ul.add($LIs).add($As).css({
					'float' : 'none',
					'width'	: 'auto'
				});
				// this ul will now be shrink-wrapped to longest li due to position:absolute
				// so save its width as ems.
				var emWidth = $ul[0].clientWidth / fontsize;
				// add more width to ensure lines don't turn over at certain sizes in various browsers
				emWidth += o.extraWidth;
				// restrict to at least minWidth and at most maxWidth
				if (emWidth > o.maxWidth)		{ emWidth = o.maxWidth; }
				else if (emWidth < o.minWidth)	{ emWidth = o.minWidth; }
				emWidth += 'em';
				// set ul to width in ems
				$ul.css('width',emWidth);
				// restore li floats to avoid IE bugs
				// set li width to full width of this ul
				// revert white-space to normal
				$LIs.css({
					'float' : liFloat,
					'width' : '100%',
					'white-space' : 'normal'
				})
				// update offset position of descendant ul to reflect new width of parent.
				// set it to 100% in case it isn't already set to this in the CSS
				.each(function(){
					var $childUl = $(this).children('ul');
					var offsetDirection = $childUl.css('left') !== undefined ? 'left' : 'right';
					$childUl.css(offsetDirection,'100%');
				});
			}).hide();
			
		});
	};
	// expose defaults
	$.fn.supersubs.defaults = {
		minWidth		: 9,		// requires em unit.
		maxWidth		: 25,		// requires em unit.
		extraWidth		: 0			// extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
	};
	
})(jQuery); // plugin code ends

/**
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 **/
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);

/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") slider.vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) methods.pausePlay.setup();

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // TOUCH
        if (touch && slider.vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture)
                          e.currentTarget._gesture.addPointer(e.pointerId);
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            el.addEventListener('touchstart', onTouchStart, false);

            function onTouchStart(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            }

            function onTouchMove(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            }

            function onTouchEnd(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            }
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        $clone.find( '[id]' ).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var prefixes = ['webkit','moz','ms','o'];

          if ('hidden' in document) return 'hidden';
          for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document)
            methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
          }
          if (methods.pauseInvisible.visProp) {
            var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                else slider.pause(); //Or just pause
              }
              else {
                if(slider.started) slider.play(); //Initiated before, just play
                else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
              }
            });
          }
        },
        isHidden: function() {
          return document[methods.pauseInvisible.visProp] || false;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) slider.pause();

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (slider.vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            
            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) clearInterval(slider.animatedSlides);
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          // slider.container.append(slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true')).prepend(slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true'));
		      methods.uniqueID( slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true') ).appendTo( slider.container );
		      methods.uniqueID( slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true') ).prependTo( slider.container );
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) methods.directionNav.update();

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  };
})(jQuery);

/*	
 * jQuery mmenu v4.2.7
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function( $ ) {

	var _PLUGIN_	= 'mmenu',
		_VERSION_	= '4.2.7';


	//	Plugin already excists
	if ( $[ _PLUGIN_ ] )
	{
		return;
	}

	//	Global variables
	var glbl = {
		$wndw: null,
		$html: null,
		$body: null,
		$page: null,
		$blck: null,

		$allMenus: null
	};

	var _c = {}, _d = {}, _e = {},
		_serialnr 	= 0,
		_strollTop	= 0;


	$[ _PLUGIN_ ] = function( $menu, opts, conf )
	{
		glbl.$allMenus = glbl.$allMenus.add( $menu );

		this.$menu = $menu;
		this.opts  = opts
		this.conf  = conf;

		this.opened		= false;
		this.serialnr	= _serialnr++;

		this._init();

		return this;
	};

	$[ _PLUGIN_ ].prototype = {

		open: function()
		{
			if ( this.opened )
			{
				return false;
			}
			var that = this;

			this._openSetup();

			//	For some reason, some browsers need a (pretty long) delay before the .mm-opened class sets the needed styles
			//	Without it, the page isn't animated
			setTimeout(
				function()
				{
					that._openFinish();
				}, 50
			);

			return 'open';
		},
		_openSetup: function()
		{
			_strollTop = glbl.$wndw.scrollTop() || 0;

			//	Set opened
			this.$menu.addClass( _c.current );

			//	Close others
			glbl.$allMenus.not( this.$menu ).trigger( _e.close );

			//	Store style and position
			glbl.$page.data( _d.style, glbl.$page.attr( 'style' ) || '' );

			//	Trigger window-resize to measure height
			glbl.$wndw.trigger( _e.resize, [ true ] );

			//	Add options
			if ( this.opts.modal )
			{
				glbl.$html.addClass( _c.modal );
			}
			if ( this.opts.moveBackground )
			{
				glbl.$html.addClass( _c.background );
			}
			if ( this.opts.position != 'left' )
			{
				glbl.$html.addClass( _c.mm( this.opts.position ) );
			}
			if ( this.opts.zposition != 'back' )
			{
				glbl.$html.addClass( _c.mm( this.opts.zposition ) );
			}
			if ( this.opts.classes )
			{
				glbl.$html.addClass( this.opts.classes );
			}

			//	Open
			glbl.$html.addClass( _c.opened );
			this.$menu.addClass( _c.opened );
		},
		_openFinish: function()
		{
			var that = this;

			//	Callback
			transitionend( glbl.$page,
				function()
				{
					that.opened = true;
					that.$menu.trigger( _e.opened );
				}, this.conf.transitionDuration
			);

			//	Opening
			glbl.$html.addClass( _c.opening );
			this.$menu.trigger( _e.opening );
		},
		close: function()
		{
			var that = this;

			if ( !this.opened )
			{
				return false;
			}

			//	Callback
			transitionend( glbl.$page,
				function()
				{
					that.$menu
						.removeClass( _c.current )
						.removeClass( _c.opened );

					glbl.$html
						.removeClass( _c.opened )
						.removeClass( _c.modal )
						.removeClass( _c.background )
						.removeClass( _c.mm( that.opts.position ) )
						.removeClass( _c.mm( that.opts.zposition ) );

					if ( that.opts.classes )
					{
						glbl.$html.removeClass( that.opts.classes );
					}

					//	Restore style and position
					glbl.$page.attr( 'style', glbl.$page.data( _d.style ) );

					that.opened = false;
					that.$menu.trigger( _e.closed );
	
				}, this.conf.transitionDuration
			);

			//	Closing
			glbl.$html.removeClass( _c.opening );
			this.$menu.trigger( _e.closing );
	
			return 'close';
		},
	
		_init: function()
		{
			this.opts = extendOptions( this.opts, this.conf, this.$menu );
			this.direction = ( this.opts.slidingSubmenus ) ? 'horizontal' : 'vertical';
	
			//	INIT PAGE & MENU
			this._initPage( glbl.$page );
			this._initMenu();
			this._initBlocker();
			this._initPanles();
			this._initLinks();
			this._initOpenClose();
			this._bindCustomEvents();

			if ( $[ _PLUGIN_ ].addons )
			{
				for ( var a = 0; a < $[ _PLUGIN_ ].addons.length; a++ )
				{
					if ( typeof this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ] == 'function' )
					{
						this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ]();
					}
				}
			}
		},

		_bindCustomEvents: function()
		{
			var that = this;

			this.$menu
				.off( _e.open + ' ' + _e.close + ' ' + _e.setPage+ ' ' + _e.update )
				.on( _e.open + ' ' + _e.close + ' ' + _e.setPage+ ' ' + _e.update,
					function( e )
					{
						e.stopPropagation();
					}
				);

			//	Menu-events
			this.$menu
				.on( _e.open,
					function( e )
					{
						if ( $(this).hasClass( _c.current ) )
						{
							e.stopImmediatePropagation();
							return false;
						}
						return that.open();
					}
				)
				.on( _e.close,
					function( e )
					{
						if ( !$(this).hasClass( _c.current ) )
						{
							e.stopImmediatePropagation();
							return false;
						}
						return that.close();
					}
				)
				.on( _e.setPage,
					function( e, $p )
					{
						that._initPage( $p );
						that._initOpenClose();
					}
				);

			//	Panel-events
			var $panels = this.$menu.find( this.opts.isMenu && this.direction != 'horizontal' ? 'ul, ol' : '.' + _c.panel );
			$panels
				.off( _e.toggle + ' ' + _e.open + ' ' + _e.close )
				.on( _e.toggle + ' ' + _e.open + ' ' + _e.close,
					function( e )
					{
						e.stopPropagation();
					}
				);

			if ( this.direction == 'horizontal' )
			{
				$panels
					.on( _e.open,
						function( e )
						{
							return openSubmenuHorizontal( $(this), that.$menu );
						}
					);
			}
			else
			{
				$panels
					.on( _e.toggle,
						function( e )
						{
							var $t = $(this);
							return $t.triggerHandler( $t.parent().hasClass( _c.opened ) ? _e.close : _e.open );
						}
					)
					.on( _e.open,
						function( e )
						{
							$(this).parent().addClass( _c.opened );
							return 'open';
						}
					)
					.on( _e.close,
						function( e )
						{
							$(this).parent().removeClass( _c.opened );
							return 'close';
						}
					);
			}
		},
		
		_initBlocker: function()
		{
			var that = this;

			if ( !glbl.$blck )
			{
				glbl.$blck = $( '<div id="' + _c.blocker + '" />' )
					.appendTo( glbl.$body );
			}

			glbl.$blck
				.off( _e.touchstart )
				.on( _e.touchstart,
					function( e )
					{
						e.preventDefault();
						e.stopPropagation();
						glbl.$blck.trigger( _e.mousedown );
					}
				)
				.on( _e.mousedown,
					function( e )
					{
						e.preventDefault();
						if ( !glbl.$html.hasClass( _c.modal ) )
						{
							that.$menu.trigger( _e.close );
						}
					}
				);
		},
		_initPage: function( $p )
		{
			if ( !$p )
			{
				$p = $(this.conf.pageSelector, glbl.$body);
				if ( $p.length > 1 )
				{
					$[ _PLUGIN_ ].debug( 'Multiple nodes found for the page-node, all nodes are wrapped in one <' + this.conf.pageNodetype + '>.' );
					$p = $p.wrapAll( '<' + this.conf.pageNodetype + ' />' ).parent();
				}
			}
	
			$p.addClass( _c.page );
			glbl.$page = $p;
		},
		_initMenu: function()
		{
			var that = this;

			//	Clone if needed
			if ( this.conf.clone )
			{
				this.$menu = this.$menu.clone( true );
				this.$menu.add( this.$menu.find( '*' ) ).filter( '[id]' ).each(
					function()
					{
						$(this).attr( 'id', _c.mm( $(this).attr( 'id' ) ) );
					}
				);
			}

			//	Strip whitespace
			this.$menu.contents().each(
				function()
				{
					if ( $(this)[ 0 ].nodeType == 3 )
					{
						$(this).remove();
					}
				}
			);

			//	Inject to body
			this.$menu[ this.conf.menuInjectMethod + 'To' ]( this.conf.menuWrapperSelector )
				.addClass( _c.menu );

			//	Add direction class
			this.$menu.addClass( _c.mm( this.direction ) );

			//	Add options classes
			if ( this.opts.classes )
			{
				this.$menu.addClass( this.opts.classes );
			}
			if ( this.opts.isMenu )
			{
				this.$menu.addClass( _c.ismenu );
			}
			if ( this.opts.position != 'left' )
			{
				this.$menu.addClass( _c.mm( this.opts.position ) );
			}
			if ( this.opts.zposition != 'back' )
			{
				this.$menu.addClass( _c.mm( this.opts.zposition ) );
			}
		},
		_initPanles: function()
		{
			var that = this;


			//	Refactor List class
			this.__refactorClass( $('.' + this.conf.listClass, this.$menu), 'list' );

			//	Add List class
			if ( this.opts.isMenu )
			{
				$('ul, ol', this.$menu)
					.not( '.mm-nolist' )
					.addClass( _c.list );
			}

			var $lis = $('.' + _c.list + ' > li', this.$menu);

			//	Refactor Selected class
			this.__refactorClass( $lis.filter( '.' + this.conf.selectedClass ), 'selected' );

			//	Refactor Label class
			this.__refactorClass( $lis.filter( '.' + this.conf.labelClass ), 'label' );

			//	Refactor Spacer class
			this.__refactorClass( $lis.filter( '.' + this.conf.spacerClass ), 'spacer' );

			//	setSelected-event
			$lis
				.off( _e.setSelected )
				.on( _e.setSelected,
					function( e, selected )
					{
						e.stopPropagation();
	
						$lis.removeClass( _c.selected );
						if ( typeof selected != 'boolean' )
						{
							selected = true;
						}
						if ( selected )
						{
							$(this).addClass( _c.selected );
						}
					}
				);

			//	Refactor Panel class
			this.__refactorClass( $('.' + this.conf.panelClass, this.$menu), 'panel' );

			//	Add Panel class
			this.$menu
				.children()
				.filter( this.conf.panelNodetype )
				.add( this.$menu.find( '.' + _c.list ).children().children().filter( this.conf.panelNodetype ) )
				.addClass( _c.panel );

			var $panels = $('.' + _c.panel, this.$menu);

			//	Add an ID to all panels
			$panels
				.each(
					function( i )
					{
						var $t = $(this),
							id = $t.attr( 'id' ) || _c.mm( 'm' + that.serialnr + '-p' + i );

						$t.attr( 'id', id );
					}
			);

			//	Add open and close links to menu items
			$panels
				.find( '.' + _c.panel )
				.each(
					function( i )
					{
						var $t = $(this),
							$u = $t.is( 'ul, ol' ) ? $t : $t.find( 'ul ,ol' ).first(),
							$l = $t.parent(),
							$a = $l.find( '> a, > span' ),
							$p = $l.closest( '.' + _c.panel );

						$t.data( _d.parent, $l );

						if ( $l.parent().is( '.' + _c.list ) )
						{
							var $btn = $( '<a class="' + _c.subopen + '" href="#' + $t.attr( 'id' ) + '" />' ).insertBefore( $a );
							if ( !$a.is( 'a' ) )
							{
								$btn.addClass( _c.fullsubopen );
							}
							if ( that.direction == 'horizontal' )
							{
								$u.prepend( '<li class="' + _c.subtitle + '"><a class="' + _c.subclose + '" href="#' + $p.attr( 'id' ) + '">' + $a.text() + '</a></li>' );
							}
						}
					}
				);

			//	Link anchors to panels
			var evt = this.direction == 'horizontal' ? _e.open : _e.toggle;
			$panels
				.each(
					function( i )
					{
						var $opening = $(this),
							id = $opening.attr( 'id' );

						$('a[href="#' + id + '"]', that.$menu)
							.off( _e.click )
							.on( _e.click,
								function( e )
								{
									e.preventDefault();
									$opening.trigger( evt );
								}
							);
					}
			);

			if ( this.direction == 'horizontal' )
			{
				//	Add opened-classes
				var $selected = $('.' + _c.list + ' > li.' + _c.selected, this.$menu);
				$selected
					.parents( 'li' )
					.removeClass( _c.selected )
					.end()
					.add( $selected.parents( 'li' ) )
					.each(
						function()
						{
							var $t = $(this),
								$u = $t.find( '> .' + _c.panel );

							if ( $u.length )
							{
								$t.parents( '.' + _c.panel ).addClass( _c.subopened );
								$u.addClass( _c.opened );
							}
						}
					)
					.closest( '.' + _c.panel )
					.addClass( _c.opened )
					.parents( '.' + _c.panel )
					.addClass( _c.subopened );
			}
			else
			{
				//	Replace Selected-class with opened-class in parents from .Selected
				var $selected = $('li.' + _c.selected, this.$menu);
				$selected
					.parents( 'li' )
					.removeClass( _c.selected )
					.end()
					.add( $selected.parents( 'li' ) )
					.addClass( _c.opened );
			}

			//	Set current opened
			var $current = $panels.filter( '.' + _c.opened );
			if ( !$current.length )
			{
				$current = $panels.first();
			}
			$current
				.addClass( _c.opened )
				.last()
				.addClass( _c.current );

			//	Rearrange markup
			if ( this.direction == 'horizontal' )
			{
				$panels.find( '.' + _c.panel ).appendTo( this.$menu );
			}
		},
		_initLinks: function()
		{
			var that = this;
	
			$('.' + _c.list + ' > li > a', this.$menu)
				.not( '.' + _c.subopen )
				.not( '.' + _c.subclose )
				.not( '[rel="external"]' )
				.not( '[target="_blank"]' )
				.off( _e.click )
				.on( _e.click,
					function( e )
					{
						var $t = $(this),
							href = $t.attr( 'href' );

						//	Set selected item
						if ( that.__valueOrFn( that.opts.onClick.setSelected, $t ) )
						{
							$t.parent().trigger( _e.setSelected );
						}

						//	Prevent default / don't follow link. Default: false
						var preventDefault = that.__valueOrFn( that.opts.onClick.preventDefault, $t, href.slice( 0, 1 ) == '#' );
						if ( preventDefault )
						{
							e.preventDefault();
						}

						//	Block UI. Default: false if preventDefault, true otherwise
						if ( that.__valueOrFn( that.opts.onClick.blockUI, $t, !preventDefault ) )
						{
							glbl.$html.addClass( _c.blocking );
						}

						//	Close menu. Default: true if preventDefault, false otherwise
						if ( that.__valueOrFn( that.opts.onClick.close, $t, preventDefault ) )
						{
							that.$menu.triggerHandler( _e.close );
						}
					}
				);
		},
		_initOpenClose: function()
		{
			var that = this;

			//	Open menu
			var id = this.$menu.attr( 'id' );
			if ( id && id.length )
			{
				if ( this.conf.clone )
				{
					id = _c.umm( id );
				}

				$('a[href="#' + id + '"]')
					.off( _e.click )
					.on( _e.click,
						function( e )
						{
							e.preventDefault();
							that.$menu.trigger( _e.open );
						}
					);
			}

			//	Close menu
			var id = glbl.$page.attr( 'id' );
			if ( id && id.length )
			{
				$('a[href="#' + id + '"]')
					.on( _e.click,
						function( e )
						{
							e.preventDefault();
							that.$menu.trigger( _e.close );
						}
					);
			}
		},
		
		__valueOrFn: function( o, $e, d )
		{
			if ( typeof o == 'function' )
			{
				return o.call( $e[ 0 ] );
			}
			if ( typeof o == 'undefined' && typeof d != 'undefined' )
			{
				return d;
			}
			return o;
		},
		
		__refactorClass: function( $e, c )
		{
			$e.removeClass( this.conf[ c + 'Class' ] ).addClass( _c[ c ] );
		}
	};


	$.fn[ _PLUGIN_ ] = function( opts, conf )
	{
		//	First time plugin is fired
		if ( !glbl.$wndw )
		{
			_initPlugin();
		}

		//	Extend options
		opts = extendOptions( opts, conf );
		conf = extendConfiguration( conf );

		return this.each(
			function()
			{
				var $menu = $(this);
				if ( $menu.data( _PLUGIN_ ) )
				{
					return;
				}
				$menu.data( _PLUGIN_, new $[ _PLUGIN_ ]( $menu, opts, conf ) );
			}
		);
	};

	$[ _PLUGIN_ ].version = _VERSION_;
	
	$[ _PLUGIN_ ].defaults = {
		position		: 'left',
		zposition		: 'back',
		moveBackground	: true,
		slidingSubmenus	: true,
		modal			: false,
		classes			: '',
		onClick			: {
//			close				: true,
//			blockUI				: null,
//			preventDefault		: null,
			setSelected			: true
		}
	};
	$[ _PLUGIN_ ].configuration = {
		panelClass			: 'Panel',
		listClass			: 'List',
		selectedClass		: 'Selected',
		labelClass			: 'Label',
		spacerClass			: 'Spacer',
		pageNodetype		: 'div',
		panelNodetype		: 'ul, ol, div',
		pageSelector		: null,
		menuWrapperSelector	: 'body',
		menuInjectMethod	: 'prepend',
		transitionDuration	: 400
	};



	/*
		SUPPORT
	*/
	(function() {

		var wd = window.document,
			ua = window.navigator.userAgent,
			ds = document.createElement( 'div' ).style;

		var _touch 				= 'ontouchstart' in wd,
			_overflowscrolling	= 'WebkitOverflowScrolling' in wd.documentElement.style,
			_oldAndroidBrowser	= (function() {
				if ( ua.indexOf( 'Android' ) >= 0 )
				{
					return 2.4 > parseFloat( ua.slice( ua.indexOf( 'Android' ) +8 ) );
				}
				return false;
			})();

		$[ _PLUGIN_ ].support = {

			touch: _touch,
			oldAndroidBrowser: _oldAndroidBrowser,
			overflowscrolling: (function() {
				if ( !_touch )
				{
					return true;
				}
				if ( _overflowscrolling )
				{
					return true;
				}
				if ( _oldAndroidBrowser )
				{
					return false;
				}
				return true;
			})()
		};
	})();


	/*
		DEBUG
	*/
	$[ _PLUGIN_ ].debug = function( msg ) {};
	$[ _PLUGIN_ ].deprecated = function( depr, repl )
	{
		if ( typeof console != 'undefined' && typeof console.warn != 'undefined' )
		{
			console.warn( 'MMENU: ' + depr + ' is deprecated, use ' + repl + ' instead.' );
		}
	};


	function extendOptions( o, c, $m )
	{

		if ( $m )
		{
			if ( typeof o != 'object' )
			{
				o = {};
			}
			if ( typeof o.isMenu != 'boolean' )
			{
				var $c = $m.children();
				o.isMenu = ( $c.length == 1 && $c.is( c.panelNodetype ) );
			}
			return o;
		}
		
		//	Extend from defaults
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults, o );


		//	DEPRECATED
		if ( o.position == 'top' || o.position == 'bottom' )
		{
			if ( o.zposition == 'back' || o.zposition == 'next' )
			{
				$[ _PLUGIN_ ].deprecated( 'Using position "' + o.position + '" in combination with zposition "' + o.zposition + '"', 'zposition "front"' );
				o.zposition = 'front';
			}
		}
		//	/DEPRECATED

		return o;
	}
	function extendConfiguration( c )
	{
		c = $.extend( true, {}, $[ _PLUGIN_ ].configuration, c )

		//	Set pageSelector
		if ( typeof c.pageSelector != 'string' )
		{
			c.pageSelector = '> ' + c.pageNodetype;
		}

		//	Restrict injectMethod
		if ( c.menuInjectMethod != 'append' )
		{
			c.menuInjectMethod = 'prepend';
		}

		return c;
	}

	function _initPlugin()
	{
		glbl.$wndw = $(window);
		glbl.$html = $('html');
		glbl.$body = $('body');
		
		glbl.$allMenus = $();


		//	Classnames, Datanames, Eventnames
		$.each( [ _c, _d, _e ],
			function( i, o )
			{
				o.add = function( c )
				{
					c = c.split( ' ' );
					for ( var d in c )
					{
						o[ c[ d ] ] = o.mm( c[ d ] );
					}
				};
			}
		);

		//	Classnames
		_c.mm = function( c ) { return 'mm-' + c; };
		_c.add( 'menu ismenu panel list subtitle selected label spacer current highest hidden page blocker modal background opened opening subopened subopen fullsubopen subclose' );
		_c.umm = function( c )
		{
			if ( c.slice( 0, 3 ) == 'mm-' )
			{
				c = c.slice( 3 );
			}
			return c;
		};

		//	Datanames
		_d.mm = function( d ) { return 'mm-' + d; };
		_d.add( 'parent style' );

		//	Eventnames
		_e.mm = function( e ) { return e + '.mm'; };
		_e.add( 'toggle open opening opened close closing closed update setPage setSelected transitionend webkitTransitionEnd mousedown touchstart mouseup touchend scroll touchmove click keydown keyup resize' );


		//	Prevent tabbing
		glbl.$wndw
			.on( _e.keydown,
				function( e )
				{
					if ( glbl.$html.hasClass( _c.opened ) )
					{
						if ( e.keyCode == 9 )
						{
							e.preventDefault();
							return false;
						}
					}
				}
			);

		//	Set page min-height to window height
		var _h = 0;
		glbl.$wndw
			.on( _e.resize,
				function( e, force )
				{
					if ( force || glbl.$html.hasClass( _c.opened ) )
					{
						var nh = glbl.$wndw.height();
						if ( force || nh != _h )
						{
							_h = nh;
							glbl.$page.css( 'minHeight', nh );
						}
					}
				}
			);


		$[ _PLUGIN_ ]._c = _c;
		$[ _PLUGIN_ ]._d = _d;
		$[ _PLUGIN_ ]._e = _e;

		$[ _PLUGIN_ ].glbl = glbl;
	}

	function openSubmenuHorizontal( $opening, $m )
	{
		if ( $opening.hasClass( _c.current ) )
		{
			return false;
		} 

		var $panels = $('.' + _c.panel, $m),
			$current = $panels.filter( '.' + _c.current );
		
		$panels
			.removeClass( _c.highest )
			.removeClass( _c.current )
			.not( $opening )
			.not( $current )
			.addClass( _c.hidden );

		if ( $opening.hasClass( _c.opened ) )
		{
			$current
				.addClass( _c.highest )
				.removeClass( _c.opened )
				.removeClass( _c.subopened );
		}
		else
		{
			$opening
				.addClass( _c.highest );

			$current
				.addClass( _c.subopened );
		}

		$opening
			.removeClass( _c.hidden )
			.removeClass( _c.subopened )
			.addClass( _c.current )
			.addClass( _c.opened );

		return 'open';
	}

	function transitionend( $e, fn, duration )
	{
		var _ended = false,
			_fn = function()
			{
				if ( !_ended )
				{
					fn.call( $e[ 0 ] );
				}
				_ended = true;
			};

		$e.one( _e.transitionend, _fn );
		$e.one( _e.webkitTransitionEnd, _fn );
		setTimeout( _fn, duration * 1.1 );
	}

})( jQuery );

/*! http://tinynav.viljamis.com v1.2 by @viljamis */
(function ($, window, i) {
  $.fn.tinyNav = function (options) {

    // Default settings
    var settings = $.extend({
      'active' : 'selected', // String: Set the "active" class
      'header' : '', // String: Specify text for "header" and show header instead of the active item
      'indent' : '- ', // String: Specify text for indenting sub-items
      'label'  : '' // String: sets the <label> text for the <select> (if not set, no label will be added)
    }, options);

    return this.each(function () {

      // Used for namespacing
      i++;

      var $nav = $(this),
        // Namespacing
        namespace = 'tinynav',
        namespace_i = namespace + i,
        l_namespace_i = '.l_' + namespace_i,
        $select = $('<select/>').attr("id", namespace_i).addClass(namespace + ' ' + namespace_i);

      if ($nav.is('ul,ol')) {

        if (settings.header !== '') {
          $select.append(
            $('<option/>').text(settings.header)
          );
        }

        // Build options
        var options = '';

        $nav
          .addClass('l_' + namespace_i)
          .find('a')
          .each(function () {
            options += '<option value="' + $(this).attr('href') + '">';
            var j;
            for (j = 0; j < $(this).parents('ul, ol').length - 1; j++) {
              options += settings.indent;
            }
            options += $(this).text() + '</option>';
          });

        // Append options into a select
        $select.append(options);

        // Select the active item
        if (!settings.header) {
          $select
            .find(':eq(' + $(l_namespace_i + ' li')
            .index($(l_namespace_i + ' li.' + settings.active)) + ')')
            .attr('selected', true);
        }

        // Change window location
        $select.change(function () {
          window.location.href = $(this).val();
        });

        // Inject select
        $(l_namespace_i).after($select);

        // Inject label
        if (settings.label) {
          $select.before(
            $("<label/>")
              .attr("for", namespace_i)
              .addClass(namespace + '_label ' + namespace_i + '_label')
              .append(settings.label)
          );
        }

      }

    });

  };
})(jQuery, this, 0);