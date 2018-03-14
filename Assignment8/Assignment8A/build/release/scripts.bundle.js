
/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*!
 * Bootstrap-select v1.12.4 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2017 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof module&&module.exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){!function(a){"use strict";function b(b){var c=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];return a.each(c,function(){b=b?b.replace(this.re,this.ch):""}),b}function c(b){var c=arguments,d=b;[].shift.apply(c);var e,f=this.each(function(){var b=a(this);if(b.is("select")){var f=b.data("selectpicker"),g="object"==typeof d&&d;if(f){if(g)for(var h in g)g.hasOwnProperty(h)&&(f.options[h]=g[h])}else{var i=a.extend({},l.DEFAULTS,a.fn.selectpicker.defaults||{},b.data(),g);i.template=a.extend({},l.DEFAULTS.template,a.fn.selectpicker.defaults?a.fn.selectpicker.defaults.template:{},b.data().template,g.template),b.data("selectpicker",f=new l(this,i))}"string"==typeof d&&(e=f[d]instanceof Function?f[d].apply(f,c):f.options[d])}});return"undefined"!=typeof e?e:f}String.prototype.includes||!function(){var a={}.toString,b=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(a){}return c}(),c="".indexOf,d=function(b){if(null==this)throw new TypeError;var d=String(this);if(b&&"[object RegExp]"==a.call(b))throw new TypeError;var e=d.length,f=String(b),g=f.length,h=arguments.length>1?arguments[1]:void 0,i=h?Number(h):0;i!=i&&(i=0);var j=Math.min(Math.max(i,0),e);return!(g+j>e)&&c.call(d,f,i)!=-1};b?b(String.prototype,"includes",{value:d,configurable:!0,writable:!0}):String.prototype.includes=d}(),String.prototype.startsWith||!function(){var a=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(a){}return c}(),b={}.toString,c=function(a){if(null==this)throw new TypeError;var c=String(this);if(a&&"[object RegExp]"==b.call(a))throw new TypeError;var d=c.length,e=String(a),f=e.length,g=arguments.length>1?arguments[1]:void 0,h=g?Number(g):0;h!=h&&(h=0);var i=Math.min(Math.max(h,0),d);if(f+i>d)return!1;for(var j=-1;++j<f;)if(c.charCodeAt(i+j)!=e.charCodeAt(j))return!1;return!0};a?a(String.prototype,"startsWith",{value:c,configurable:!0,writable:!0}):String.prototype.startsWith=c}(),Object.keys||(Object.keys=function(a,b,c){c=[];for(b in a)c.hasOwnProperty.call(a,b)&&c.push(b);return c});var d={useDefault:!1,_set:a.valHooks.select.set};a.valHooks.select.set=function(b,c){return c&&!d.useDefault&&a(b).data("selected",!0),d._set.apply(this,arguments)};var e=null,f=function(){try{return new Event("change"),!0}catch(a){return!1}}();a.fn.triggerNative=function(a){var b,c=this[0];c.dispatchEvent?(f?b=new Event(a,{bubbles:!0}):(b=document.createEvent("Event"),b.initEvent(a,!0,!1)),c.dispatchEvent(b)):c.fireEvent?(b=document.createEventObject(),b.eventType=a,c.fireEvent("on"+a,b)):this.trigger(a)},a.expr.pseudos.icontains=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.text()).toString().toUpperCase();return f.includes(d[3].toUpperCase())},a.expr.pseudos.ibegins=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.text()).toString().toUpperCase();return f.startsWith(d[3].toUpperCase())},a.expr.pseudos.aicontains=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toString().toUpperCase();return f.includes(d[3].toUpperCase())},a.expr.pseudos.aibegins=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toString().toUpperCase();return f.startsWith(d[3].toUpperCase())};var g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},h={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x60;":"`"},i=function(a){var b=function(b){return a[b]},c="(?:"+Object.keys(a).join("|")+")",d=RegExp(c),e=RegExp(c,"g");return function(a){return a=null==a?"":""+a,d.test(a)?a.replace(e,b):a}},j=i(g),k=i(h),l=function(b,c){d.useDefault||(a.valHooks.select.set=d._set,d.useDefault=!0),this.$element=a(b),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=c,null===this.options.title&&(this.options.title=this.$element.attr("title"));var e=this.options.windowPadding;"number"==typeof e&&(this.options.windowPadding=[e,e,e,e]),this.val=l.prototype.val,this.render=l.prototype.render,this.refresh=l.prototype.refresh,this.setStyle=l.prototype.setStyle,this.selectAll=l.prototype.selectAll,this.deselectAll=l.prototype.deselectAll,this.destroy=l.prototype.destroy,this.remove=l.prototype.remove,this.show=l.prototype.show,this.hide=l.prototype.hide,this.init()};l.VERSION="1.12.4",l.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results matched {0}",countSelectedText:function(a,b){return 1==a?"{0} item selected":"{0} items selected"},maxOptionsText:function(a,b){return[1==a?"Limit reached ({n} item max)":"Limit reached ({n} items max)",1==b?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)"]},selectAllText:"Select All",deselectAllText:"Deselect All",doneButton:!1,doneButtonText:"Close",multipleSeparator:", ",styleBase:"btn",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,liveSearchNormalize:!1,liveSearchStyle:"contains",actionsBox:!1,iconBase:"glyphicon",tickIcon:"glyphicon-ok",showTick:!1,template:{caret:'<span class="caret"></span>'},maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1,windowPadding:0},l.prototype={constructor:l,init:function(){var b=this,c=this.$element.attr("id");this.$element.addClass("bs-select-hidden"),this.liObj={},this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement).appendTo(this.$newElement),this.$button=this.$newElement.children("button"),this.$menu=this.$newElement.children(".dropdown-menu"),this.$menuInner=this.$menu.children(".inner"),this.$searchbox=this.$menu.find("input"),this.$element.removeClass("bs-select-hidden"),this.options.dropdownAlignRight===!0&&this.$menu.addClass("dropdown-menu-right"),"undefined"!=typeof c&&(this.$button.attr("data-id",c),a('label[for="'+c+'"]').click(function(a){a.preventDefault(),b.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile(),this.$newElement.on({"hide.bs.dropdown":function(a){b.$menuInner.attr("aria-expanded",!1),b.$element.trigger("hide.bs.select",a)},"hidden.bs.dropdown":function(a){b.$element.trigger("hidden.bs.select",a)},"show.bs.dropdown":function(a){b.$menuInner.attr("aria-expanded",!0),b.$element.trigger("show.bs.select",a)},"shown.bs.dropdown":function(a){b.$element.trigger("shown.bs.select",a)}}),b.$element[0].hasAttribute("required")&&this.$element.on("invalid",function(){b.$button.addClass("bs-invalid"),b.$element.on({"focus.bs.select":function(){b.$button.focus(),b.$element.off("focus.bs.select")},"shown.bs.select":function(){b.$element.val(b.$element.val()).off("shown.bs.select")},"rendered.bs.select":function(){this.validity.valid&&b.$button.removeClass("bs-invalid"),b.$element.off("rendered.bs.select")}}),b.$button.on("blur.bs.select",function(){b.$element.focus().blur(),b.$button.off("blur.bs.select")})}),setTimeout(function(){b.$element.trigger("loaded.bs.select")})},createDropdown:function(){var b=this.multiple||this.options.showTick?" show-tick":"",c=this.$element.parent().hasClass("input-group")?" input-group-btn":"",d=this.autofocus?" autofocus":"",e=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",f=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"'+(null===this.options.liveSearchPlaceholder?"":' placeholder="'+j(this.options.liveSearchPlaceholder)+'"')+' role="textbox" aria-label="Search"></div>':"",g=this.multiple&&this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">'+this.options.selectAllText+'</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">'+this.options.deselectAllText+"</button></div></div>":"",h=this.multiple&&this.options.doneButton?'<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">'+this.options.doneButtonText+"</button></div></div>":"",i='<div class="btn-group bootstrap-select'+b+c+'"><button type="button" class="'+this.options.styleBase+' dropdown-toggle" data-toggle="dropdown"'+d+' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">'+this.options.template.caret+'</span></button><div class="dropdown-menu open" role="combobox">'+e+f+g+'<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>'+h+"</div></div>";return a(i)},createView:function(){var a=this.createDropdown(),b=this.createLi();return a.find("ul")[0].innerHTML=b,a},reloadLi:function(){var a=this.createLi();this.$menuInner[0].innerHTML=a},createLi:function(){var c=this,d=[],e=0,f=document.createElement("option"),g=-1,h=function(a,b,c,d){return"<li"+("undefined"!=typeof c&&""!==c?' class="'+c+'"':"")+("undefined"!=typeof b&&null!==b?' data-original-index="'+b+'"':"")+("undefined"!=typeof d&&null!==d?'data-optgroup="'+d+'"':"")+">"+a+"</li>"},i=function(d,e,f,g){return'<a tabindex="0"'+("undefined"!=typeof e?' class="'+e+'"':"")+(f?' style="'+f+'"':"")+(c.options.liveSearchNormalize?' data-normalized-text="'+b(j(a(d).html()))+'"':"")+("undefined"!=typeof g||null!==g?' data-tokens="'+g+'"':"")+' role="option">'+d+'<span class="'+c.options.iconBase+" "+c.options.tickIcon+' check-mark"></span></a>'};if(this.options.title&&!this.multiple&&(g--,!this.$element.find(".bs-title-option").length)){var k=this.$element[0];f.className="bs-title-option",f.innerHTML=this.options.title,f.value="",k.insertBefore(f,k.firstChild);var l=a(k.options[k.selectedIndex]);void 0===l.attr("selected")&&void 0===this.$element.data("selected")&&(f.selected=!0)}var m=this.$element.find("option");return m.each(function(b){var f=a(this);if(g++,!f.hasClass("bs-title-option")){var k,l=this.className||"",n=j(this.style.cssText),o=f.data("content")?f.data("content"):f.html(),p=f.data("tokens")?f.data("tokens"):null,q="undefined"!=typeof f.data("subtext")?'<small class="text-muted">'+f.data("subtext")+"</small>":"",r="undefined"!=typeof f.data("icon")?'<span class="'+c.options.iconBase+" "+f.data("icon")+'"></span> ':"",s=f.parent(),t="OPTGROUP"===s[0].tagName,u=t&&s[0].disabled,v=this.disabled||u;if(""!==r&&v&&(r="<span>"+r+"</span>"),c.options.hideDisabled&&(v&&!t||u))return k=f.data("prevHiddenIndex"),f.next().data("prevHiddenIndex",void 0!==k?k:b),void g--;if(f.data("content")||(o=r+'<span class="text">'+o+q+"</span>"),t&&f.data("divider")!==!0){if(c.options.hideDisabled&&v){if(void 0===s.data("allOptionsDisabled")){var w=s.children();s.data("allOptionsDisabled",w.filter(":disabled").length===w.length)}if(s.data("allOptionsDisabled"))return void g--}var x=" "+s[0].className||"";if(0===f.index()){e+=1;var y=s[0].label,z="undefined"!=typeof s.data("subtext")?'<small class="text-muted">'+s.data("subtext")+"</small>":"",A=s.data("icon")?'<span class="'+c.options.iconBase+" "+s.data("icon")+'"></span> ':"";y=A+'<span class="text">'+j(y)+z+"</span>",0!==b&&d.length>0&&(g++,d.push(h("",null,"divider",e+"div"))),g++,d.push(h(y,null,"dropdown-header"+x,e))}if(c.options.hideDisabled&&v)return void g--;d.push(h(i(o,"opt "+l+x,n,p),b,"",e))}else if(f.data("divider")===!0)d.push(h("",b,"divider"));else if(f.data("hidden")===!0)k=f.data("prevHiddenIndex"),f.next().data("prevHiddenIndex",void 0!==k?k:b),d.push(h(i(o,l,n,p),b,"hidden is-hidden"));else{var B=this.previousElementSibling&&"OPTGROUP"===this.previousElementSibling.tagName;if(!B&&c.options.hideDisabled&&(k=f.data("prevHiddenIndex"),void 0!==k)){var C=m.eq(k)[0].previousElementSibling;C&&"OPTGROUP"===C.tagName&&!C.disabled&&(B=!0)}B&&(g++,d.push(h("",null,"divider",e+"div"))),d.push(h(i(o,l,n,p),b))}c.liObj[b]=g}}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),d.join("")},findLis:function(){return null==this.$lis&&(this.$lis=this.$menu.find("li")),this.$lis},render:function(b){var c,d=this,e=this.$element.find("option");b!==!1&&e.each(function(a){var b=d.findLis().eq(d.liObj[a]);d.setDisabled(a,this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled,b),d.setSelected(a,this.selected,b)}),this.togglePlaceholder(),this.tabIndex();var f=e.map(function(){if(this.selected){if(d.options.hideDisabled&&(this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled))return;var b,c=a(this),e=c.data("icon")&&d.options.showIcon?'<i class="'+d.options.iconBase+" "+c.data("icon")+'"></i> ':"";return b=d.options.showSubtext&&c.data("subtext")&&!d.multiple?' <small class="text-muted">'+c.data("subtext")+"</small>":"","undefined"!=typeof c.attr("title")?c.attr("title"):c.data("content")&&d.options.showContent?c.data("content").toString():e+c.html()+b}}).toArray(),g=this.multiple?f.join(this.options.multipleSeparator):f[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var h=this.options.selectedTextFormat.split(">");if(h.length>1&&f.length>h[1]||1==h.length&&f.length>=2){c=this.options.hideDisabled?", [disabled]":"";var i=e.not('[data-divider="true"], [data-hidden="true"]'+c).length,j="function"==typeof this.options.countSelectedText?this.options.countSelectedText(f.length,i):this.options.countSelectedText;g=j.replace("{0}",f.length.toString()).replace("{1}",i.toString())}}void 0==this.options.title&&(this.options.title=this.$element.attr("title")),"static"==this.options.selectedTextFormat&&(g=this.options.title),g||(g="undefined"!=typeof this.options.title?this.options.title:this.options.noneSelectedText),this.$button.attr("title",k(a.trim(g.replace(/<[^>]*>?/g,"")))),this.$button.children(".filter-option").html(g),this.$element.trigger("rendered.bs.select")},setStyle:function(a,b){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,""));var c=a?a:this.options.style;"add"==b?this.$button.addClass(c):"remove"==b?this.$button.removeClass(c):(this.$button.removeClass(this.options.style),this.$button.addClass(c))},liHeight:function(b){if(b||this.options.size!==!1&&!this.sizeInfo){var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("ul"),f=document.createElement("li"),g=document.createElement("li"),h=document.createElement("a"),i=document.createElement("span"),j=this.options.header&&this.$menu.find(".popover-title").length>0?this.$menu.find(".popover-title")[0].cloneNode(!0):null,k=this.options.liveSearch?document.createElement("div"):null,l=this.options.actionsBox&&this.multiple&&this.$menu.find(".bs-actionsbox").length>0?this.$menu.find(".bs-actionsbox")[0].cloneNode(!0):null,m=this.options.doneButton&&this.multiple&&this.$menu.find(".bs-donebutton").length>0?this.$menu.find(".bs-donebutton")[0].cloneNode(!0):null;if(i.className="text",c.className=this.$menu[0].parentNode.className+" open",d.className="dropdown-menu open",e.className="dropdown-menu inner",f.className="divider",i.appendChild(document.createTextNode("Inner text")),h.appendChild(i),g.appendChild(h),e.appendChild(g),e.appendChild(f),j&&d.appendChild(j),k){var n=document.createElement("input");k.className="bs-searchbox",n.className="form-control",k.appendChild(n),d.appendChild(k)}l&&d.appendChild(l),d.appendChild(e),m&&d.appendChild(m),c.appendChild(d),document.body.appendChild(c);var o=h.offsetHeight,p=j?j.offsetHeight:0,q=k?k.offsetHeight:0,r=l?l.offsetHeight:0,s=m?m.offsetHeight:0,t=a(f).outerHeight(!0),u="function"==typeof getComputedStyle&&getComputedStyle(d),v=u?null:a(d),w={vert:parseInt(u?u.paddingTop:v.css("paddingTop"))+parseInt(u?u.paddingBottom:v.css("paddingBottom"))+parseInt(u?u.borderTopWidth:v.css("borderTopWidth"))+parseInt(u?u.borderBottomWidth:v.css("borderBottomWidth")),horiz:parseInt(u?u.paddingLeft:v.css("paddingLeft"))+parseInt(u?u.paddingRight:v.css("paddingRight"))+parseInt(u?u.borderLeftWidth:v.css("borderLeftWidth"))+parseInt(u?u.borderRightWidth:v.css("borderRightWidth"))},x={vert:w.vert+parseInt(u?u.marginTop:v.css("marginTop"))+parseInt(u?u.marginBottom:v.css("marginBottom"))+2,horiz:w.horiz+parseInt(u?u.marginLeft:v.css("marginLeft"))+parseInt(u?u.marginRight:v.css("marginRight"))+2};document.body.removeChild(c),this.sizeInfo={liHeight:o,headerHeight:p,searchHeight:q,actionsHeight:r,doneButtonHeight:s,dividerHeight:t,menuPadding:w,menuExtras:x}}},setSize:function(){if(this.findLis(),this.liHeight(),this.options.header&&this.$menu.css("padding-top",0),this.options.size!==!1){var b,c,d,e,f,g,h,i,j=this,k=this.$menu,l=this.$menuInner,m=a(window),n=this.$newElement[0].offsetHeight,o=this.$newElement[0].offsetWidth,p=this.sizeInfo.liHeight,q=this.sizeInfo.headerHeight,r=this.sizeInfo.searchHeight,s=this.sizeInfo.actionsHeight,t=this.sizeInfo.doneButtonHeight,u=this.sizeInfo.dividerHeight,v=this.sizeInfo.menuPadding,w=this.sizeInfo.menuExtras,x=this.options.hideDisabled?".disabled":"",y=function(){var b,c=j.$newElement.offset(),d=a(j.options.container);j.options.container&&!d.is("body")?(b=d.offset(),b.top+=parseInt(d.css("borderTopWidth")),b.left+=parseInt(d.css("borderLeftWidth"))):b={top:0,left:0};var e=j.options.windowPadding;f=c.top-b.top-m.scrollTop(),g=m.height()-f-n-b.top-e[2],h=c.left-b.left-m.scrollLeft(),i=m.width()-h-o-b.left-e[1],f-=e[0],h-=e[3]};if(y(),"auto"===this.options.size){var z=function(){var m,n=function(b,c){return function(d){return c?d.classList?d.classList.contains(b):a(d).hasClass(b):!(d.classList?d.classList.contains(b):a(d).hasClass(b))}},u=j.$menuInner[0].getElementsByTagName("li"),x=Array.prototype.filter?Array.prototype.filter.call(u,n("hidden",!1)):j.$lis.not(".hidden"),z=Array.prototype.filter?Array.prototype.filter.call(x,n("dropdown-header",!0)):x.filter(".dropdown-header");y(),b=g-w.vert,c=i-w.horiz,j.options.container?(k.data("height")||k.data("height",k.height()),d=k.data("height"),k.data("width")||k.data("width",k.width()),e=k.data("width")):(d=k.height(),e=k.width()),j.options.dropupAuto&&j.$newElement.toggleClass("dropup",f>g&&b-w.vert<d),j.$newElement.hasClass("dropup")&&(b=f-w.vert),"auto"===j.options.dropdownAlignRight&&k.toggleClass("dropdown-menu-right",h>i&&c-w.horiz<e-o),m=x.length+z.length>3?3*p+w.vert-2:0,k.css({"max-height":b+"px",overflow:"hidden","min-height":m+q+r+s+t+"px"}),l.css({"max-height":b-q-r-s-t-v.vert+"px","overflow-y":"auto","min-height":Math.max(m-v.vert,0)+"px"})};z(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize",z),m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize",z)}else if(this.options.size&&"auto"!=this.options.size&&this.$lis.not(x).length>this.options.size){var A=this.$lis.not(".divider").not(x).children().slice(0,this.options.size).last().parent().index(),B=this.$lis.slice(0,A+1).filter(".divider").length;b=p*this.options.size+B*u+v.vert,j.options.container?(k.data("height")||k.data("height",k.height()),d=k.data("height")):d=k.height(),j.options.dropupAuto&&this.$newElement.toggleClass("dropup",f>g&&b-w.vert<d),k.css({"max-height":b+q+r+s+t+"px",overflow:"hidden","min-height":""}),l.css({"max-height":b-v.vert+"px","overflow-y":"auto","min-height":""})}}},setWidth:function(){if("auto"===this.options.width){this.$menu.css("min-width","0");var a=this.$menu.parent().clone().appendTo("body"),b=this.options.container?this.$newElement.clone().appendTo("body"):a,c=a.children(".dropdown-menu").outerWidth(),d=b.css("width","auto").children("button").outerWidth();a.remove(),b.remove(),this.$newElement.css("width",Math.max(c,d)+"px")}else"fit"===this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){this.$bsContainer=a('<div class="bs-container" />');var b,c,d,e=this,f=a(this.options.container),g=function(a){e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi,"")).toggleClass("dropup",a.hasClass("dropup")),b=a.offset(),f.is("body")?c={top:0,left:0}:(c=f.offset(),c.top+=parseInt(f.css("borderTopWidth"))-f.scrollTop(),c.left+=parseInt(f.css("borderLeftWidth"))-f.scrollLeft()),d=a.hasClass("dropup")?0:a[0].offsetHeight,e.$bsContainer.css({top:b.top-c.top+d,left:b.left-c.left,width:a[0].offsetWidth})};this.$button.on("click",function(){var b=a(this);e.isDisabled()||(g(e.$newElement),e.$bsContainer.appendTo(e.options.container).toggleClass("open",!b.hasClass("open")).append(e.$menu))}),a(window).on("resize scroll",function(){g(e.$newElement)}),this.$element.on("hide.bs.select",function(){e.$menu.data("height",e.$menu.height()),e.$bsContainer.detach()})},setSelected:function(a,b,c){c||(this.togglePlaceholder(),c=this.findLis().eq(this.liObj[a])),c.toggleClass("selected",b).find("a").attr("aria-selected",b)},setDisabled:function(a,b,c){c||(c=this.findLis().eq(this.liObj[a])),b?c.addClass("disabled").children("a").attr("href","#").attr("tabindex",-1).attr("aria-disabled",!0):c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex",0).attr("aria-disabled",!1)},isDisabled:function(){return this.$element[0].disabled},checkDisabled:function(){var a=this;this.isDisabled()?(this.$newElement.addClass("disabled"),this.$button.addClass("disabled").attr("tabindex",-1).attr("aria-disabled",!0)):(this.$button.hasClass("disabled")&&(this.$newElement.removeClass("disabled"),this.$button.removeClass("disabled").attr("aria-disabled",!1)),this.$button.attr("tabindex")!=-1||this.$element.data("tabindex")||this.$button.removeAttr("tabindex")),this.$button.click(function(){return!a.isDisabled()})},togglePlaceholder:function(){var a=this.$element.val();this.$button.toggleClass("bs-placeholder",null===a||""===a||a.constructor===Array&&0===a.length)},tabIndex:function(){this.$element.data("tabindex")!==this.$element.attr("tabindex")&&this.$element.attr("tabindex")!==-98&&"-98"!==this.$element.attr("tabindex")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex"))),this.$element.attr("tabindex",-98)},clickListener:function(){var b=this,c=a(document);c.data("spaceSelect",!1),this.$button.on("keyup",function(a){/(32)/.test(a.keyCode.toString(10))&&c.data("spaceSelect")&&(a.preventDefault(),c.data("spaceSelect",!1))}),this.$button.on("click",function(){b.setSize()}),this.$element.on("shown.bs.select",function(){if(b.options.liveSearch||b.multiple){if(!b.multiple){var a=b.liObj[b.$element[0].selectedIndex];if("number"!=typeof a||b.options.size===!1)return;var c=b.$lis.eq(a)[0].offsetTop-b.$menuInner[0].offsetTop;c=c-b.$menuInner[0].offsetHeight/2+b.sizeInfo.liHeight/2,b.$menuInner[0].scrollTop=c}}else b.$menuInner.find(".selected a").focus()}),this.$menuInner.on("click","li a",function(c){var d=a(this),f=d.parent().data("originalIndex"),g=b.$element.val(),h=b.$element.prop("selectedIndex"),i=!0;if(b.multiple&&1!==b.options.maxOptions&&c.stopPropagation(),c.preventDefault(),!b.isDisabled()&&!d.parent().hasClass("disabled")){var j=b.$element.find("option"),k=j.eq(f),l=k.prop("selected"),m=k.parent("optgroup"),n=b.options.maxOptions,o=m.data("maxOptions")||!1;if(b.multiple){if(k.prop("selected",!l),b.setSelected(f,!l),d.blur(),n!==!1||o!==!1){var p=n<j.filter(":selected").length,q=o<m.find("option:selected").length;if(n&&p||o&&q)if(n&&1==n)j.prop("selected",!1),k.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected"),b.setSelected(f,!0);else if(o&&1==o){m.find("option:selected").prop("selected",!1),k.prop("selected",!0);var r=d.parent().data("optgroup");b.$menuInner.find('[data-optgroup="'+r+'"]').removeClass("selected"),b.setSelected(f,!0)}else{var s="string"==typeof b.options.maxOptionsText?[b.options.maxOptionsText,b.options.maxOptionsText]:b.options.maxOptionsText,t="function"==typeof s?s(n,o):s,u=t[0].replace("{n}",n),v=t[1].replace("{n}",o),w=a('<div class="notify"></div>');t[2]&&(u=u.replace("{var}",t[2][n>1?0:1]),v=v.replace("{var}",t[2][o>1?0:1])),k.prop("selected",!1),b.$menu.append(w),n&&p&&(w.append(a("<div>"+u+"</div>")),i=!1,b.$element.trigger("maxReached.bs.select")),o&&q&&(w.append(a("<div>"+v+"</div>")),i=!1,b.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){b.setSelected(f,!1)},10),w.delay(750).fadeOut(300,function(){a(this).remove()})}}}else j.prop("selected",!1),k.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected",!1),b.setSelected(f,!0);!b.multiple||b.multiple&&1===b.options.maxOptions?b.$button.focus():b.options.liveSearch&&b.$searchbox.focus(),i&&(g!=b.$element.val()&&b.multiple||h!=b.$element.prop("selectedIndex")&&!b.multiple)&&(e=[f,k.prop("selected"),l],b.$element.triggerNative("change"))}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(c){c.currentTarget==this&&(c.preventDefault(),c.stopPropagation(),b.options.liveSearch&&!a(c.target).hasClass("close")?b.$searchbox.focus():b.$button.focus())}),this.$menuInner.on("click",".divider, .dropdown-header",function(a){a.preventDefault(),a.stopPropagation(),b.options.liveSearch?b.$searchbox.focus():b.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){b.$button.click()}),this.$searchbox.on("click",function(a){a.stopPropagation()}),this.$menu.on("click",".actions-btn",function(c){b.options.liveSearch?b.$searchbox.focus():b.$button.focus(),c.preventDefault(),c.stopPropagation(),a(this).hasClass("bs-select-all")?b.selectAll():b.deselectAll()}),this.$element.change(function(){b.render(!1),b.$element.trigger("changed.bs.select",e),e=null})},liveSearchListener:function(){var c=this,d=a('<li class="no-results"></li>');this.$button.on("click.dropdown.data-api",function(){c.$menuInner.find(".active").removeClass("active"),c.$searchbox.val()&&(c.$searchbox.val(""),c.$lis.not(".is-hidden").removeClass("hidden"),d.parent().length&&d.remove()),c.multiple||c.$menuInner.find(".selected").addClass("active"),setTimeout(function(){c.$searchbox.focus()},10)}),this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api",function(a){a.stopPropagation()}),this.$searchbox.on("input propertychange",function(){if(c.$lis.not(".is-hidden").removeClass("hidden"),c.$lis.filter(".active").removeClass("active"),d.remove(),c.$searchbox.val()){var e,f=c.$lis.not(".is-hidden, .divider, .dropdown-header");if(e=c.options.liveSearchNormalize?f.not(":a"+c._searchStyle()+'("'+b(c.$searchbox.val())+'")'):f.not(":"+c._searchStyle()+'("'+c.$searchbox.val()+'")'),e.length===f.length)d.html(c.options.noneResultsText.replace("{0}",'"'+j(c.$searchbox.val())+'"')),c.$menuInner.append(d),c.$lis.addClass("hidden");else{e.addClass("hidden");var g,h=c.$lis.not(".hidden");h.each(function(b){var c=a(this);c.hasClass("divider")?void 0===g?c.addClass("hidden"):(g&&g.addClass("hidden"),g=c):c.hasClass("dropdown-header")&&h.eq(b+1).data("optgroup")!==c.data("optgroup")?c.addClass("hidden"):g=null}),g&&g.addClass("hidden"),f.not(".hidden").first().addClass("active"),c.$menuInner.scrollTop(0)}}})},_searchStyle:function(){var a={begins:"ibegins",startsWith:"ibegins"};return a[this.options.liveSearchStyle]||"icontains"},val:function(a){return"undefined"!=typeof a?(this.$element.val(a),this.render(),this.$element):this.$element.val()},changeAll:function(b){if(this.multiple){"undefined"==typeof b&&(b=!0),this.findLis();var c=this.$element.find("option"),d=this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),e=d.length,f=[];if(b){if(d.filter(".selected").length===d.length)return}else if(0===d.filter(".selected").length)return;d.toggleClass("selected",b);for(var g=0;g<e;g++){var h=d[g].getAttribute("data-original-index");f[f.length]=c.eq(h)[0]}a(f).prop("selected",b),this.render(!1),this.togglePlaceholder(),this.$element.triggerNative("change")}},selectAll:function(){return this.changeAll(!0)},deselectAll:function(){return this.changeAll(!1)},toggle:function(a){a=a||window.event,a&&a.stopPropagation(),this.$button.trigger("click")},keydown:function(b){var c,d,e,f,g=a(this),h=g.is("input")?g.parent().parent():g.parent(),i=h.data("this"),j=":not(.disabled, .hidden, .dropdown-header, .divider)",k={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(f=i.$newElement.hasClass("open"),!f&&(b.keyCode>=48&&b.keyCode<=57||b.keyCode>=96&&b.keyCode<=105||b.keyCode>=65&&b.keyCode<=90))return i.options.container?i.$button.trigger("click"):(i.setSize(),i.$menu.parent().addClass("open"),f=!0),void i.$searchbox.focus();if(i.options.liveSearch&&/(^9$|27)/.test(b.keyCode.toString(10))&&f&&(b.preventDefault(),b.stopPropagation(),i.$menuInner.click(),i.$button.focus()),/(38|40)/.test(b.keyCode.toString(10))){if(c=i.$lis.filter(j),!c.length)return;d=i.options.liveSearch?c.index(c.filter(".active")):c.index(c.find("a").filter(":focus").parent()),e=i.$menuInner.data("prevIndex"),38==b.keyCode?(!i.options.liveSearch&&d!=e||d==-1||d--,d<0&&(d+=c.length)):40==b.keyCode&&((i.options.liveSearch||d==e)&&d++,d%=c.length),i.$menuInner.data("prevIndex",d),i.options.liveSearch?(b.preventDefault(),g.hasClass("dropdown-toggle")||(c.removeClass("active").eq(d).addClass("active").children("a").focus(),g.focus())):c.eq(d).children("a").focus()}else if(!g.is("input")){var l,m,n=[];c=i.$lis.filter(j),c.each(function(c){a.trim(a(this).children("a").text().toLowerCase()).substring(0,1)==k[b.keyCode]&&n.push(c)}),l=a(document).data("keycount"),l++,a(document).data("keycount",l),m=a.trim(a(":focus").text().toLowerCase()).substring(0,1),m!=k[b.keyCode]?(l=1,a(document).data("keycount",l)):l>=n.length&&(a(document).data("keycount",0),l>n.length&&(l=1)),c.eq(n[l-1]).children("a").focus()}if((/(13|32)/.test(b.keyCode.toString(10))||/(^9$)/.test(b.keyCode.toString(10))&&i.options.selectOnTab)&&f){if(/(32)/.test(b.keyCode.toString(10))||b.preventDefault(),i.options.liveSearch)/(32)/.test(b.keyCode.toString(10))||(i.$menuInner.find(".active a").click(),g.focus());else{var o=a(":focus");o.click(),o.focus(),b.preventDefault(),a(document).data("spaceSelect",!0)}a(document).data("keycount",0)}(/(^9$|27)/.test(b.keyCode.toString(10))&&f&&(i.multiple||i.options.liveSearch)||/(27)/.test(b.keyCode.toString(10))&&!f)&&(i.$menu.parent().removeClass("open"),i.options.container&&i.$newElement.removeClass("open"),i.$button.focus())},mobile:function(){this.$element.addClass("mobile-device")},refresh:function(){this.$lis=null,this.liObj={},this.reloadLi(),this.render(),this.checkDisabled(),this.liHeight(!0),this.setStyle(),
this.setWidth(),this.$lis&&this.$searchbox.trigger("propertychange"),this.$element.trigger("refreshed.bs.select")},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()},destroy:function(){this.$newElement.before(this.$element).remove(),this.$bsContainer?this.$bsContainer.remove():this.$menu.remove(),this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")}};var m=a.fn.selectpicker;a.fn.selectpicker=c,a.fn.selectpicker.Constructor=l,a.fn.selectpicker.noConflict=function(){return a.fn.selectpicker=m,this},a(document).data("keycount",0).on("keydown.bs.select",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input',l.prototype.keydown).on("focusin.modal",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input',function(a){a.stopPropagation()}),a(window).on("load.bs.select.data-api",function(){a(".selectpicker").each(function(){var b=a(this);c.call(b,b.data())})})}(a)});
//# sourceMappingURL=bootstrap-select.js.map
/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */
+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.toggle"),f="object"==typeof b&&b;e||d.data("bs.toggle",e=new c(this,f)),"string"==typeof b&&e[b]&&e[b]()})}var c=function(b,c){this.$element=a(b),this.options=a.extend({},this.defaults(),c),this.render()};c.VERSION="2.2.0",c.DEFAULTS={on:"On",off:"Off",onstyle:"primary",offstyle:"default",size:"normal",style:"",width:null,height:null},c.prototype.defaults=function(){return{on:this.$element.attr("data-on")||c.DEFAULTS.on,off:this.$element.attr("data-off")||c.DEFAULTS.off,onstyle:this.$element.attr("data-onstyle")||c.DEFAULTS.onstyle,offstyle:this.$element.attr("data-offstyle")||c.DEFAULTS.offstyle,size:this.$element.attr("data-size")||c.DEFAULTS.size,style:this.$element.attr("data-style")||c.DEFAULTS.style,width:this.$element.attr("data-width")||c.DEFAULTS.width,height:this.$element.attr("data-height")||c.DEFAULTS.height}},c.prototype.render=function(){this._onstyle="btn-"+this.options.onstyle,this._offstyle="btn-"+this.options.offstyle;var b="large"===this.options.size?"btn-lg":"small"===this.options.size?"btn-sm":"mini"===this.options.size?"btn-xs":"",c=a('<label class="btn">').html(this.options.on).addClass(this._onstyle+" "+b),d=a('<label class="btn">').html(this.options.off).addClass(this._offstyle+" "+b+" active"),e=a('<span class="toggle-handle btn btn-default">').addClass(b),f=a('<div class="toggle-group">').append(c,d,e),g=a('<div class="toggle btn" data-toggle="toggle">').addClass(this.$element.prop("checked")?this._onstyle:this._offstyle+" off").addClass(b).addClass(this.options.style);this.$element.wrap(g),a.extend(this,{$toggle:this.$element.parent(),$toggleOn:c,$toggleOff:d,$toggleGroup:f}),this.$toggle.append(f);var h=this.options.width||Math.max(c.outerWidth(),d.outerWidth())+e.outerWidth()/2,i=this.options.height||Math.max(c.outerHeight(),d.outerHeight());c.addClass("toggle-on"),d.addClass("toggle-off"),this.$toggle.css({width:h,height:i}),this.options.height&&(c.css("line-height",c.height()+"px"),d.css("line-height",d.height()+"px")),this.update(!0),this.trigger(!0)},c.prototype.toggle=function(){this.$element.prop("checked")?this.off():this.on()},c.prototype.on=function(a){return this.$element.prop("disabled")?!1:(this.$toggle.removeClass(this._offstyle+" off").addClass(this._onstyle),this.$element.prop("checked",!0),void(a||this.trigger()))},c.prototype.off=function(a){return this.$element.prop("disabled")?!1:(this.$toggle.removeClass(this._onstyle).addClass(this._offstyle+" off"),this.$element.prop("checked",!1),void(a||this.trigger()))},c.prototype.enable=function(){this.$toggle.removeAttr("disabled"),this.$element.prop("disabled",!1)},c.prototype.disable=function(){this.$toggle.attr("disabled","disabled"),this.$element.prop("disabled",!0)},c.prototype.update=function(a){this.$element.prop("disabled")?this.disable():this.enable(),this.$element.prop("checked")?this.on(a):this.off(a)},c.prototype.trigger=function(b){this.$element.off("change.bs.toggle"),b||this.$element.change(),this.$element.on("change.bs.toggle",a.proxy(function(){this.update()},this))},c.prototype.destroy=function(){this.$element.off("change.bs.toggle"),this.$toggleGroup.remove(),this.$element.removeData("bs.toggle"),this.$element.unwrap()};var d=a.fn.bootstrapToggle;a.fn.bootstrapToggle=b,a.fn.bootstrapToggle.Constructor=c,a.fn.toggle.noConflict=function(){return a.fn.bootstrapToggle=d,this},a(function(){a("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle()}),a(document).on("click.bs.toggle","div[data-toggle^=toggle]",function(b){var c=a(this).find("input[type=checkbox]");c.bootstrapToggle("toggle"),b.preventDefault()})}(jQuery);
//# sourceMappingURL=bootstrap-toggle.min.js.map
/*1510861924,,JIT Construction: v3461256,en_US*/

/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Platform Policy
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
try {window.FB|| (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 0;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    var __p;    with (this) {      (function(){var a={},b=function b(i,j){if(!i&&!j)return null;var k={};if(typeof i!=="undefined")k.type=i;if(typeof j!=="undefined")k.signature=j;return k},c=function c(i,j){return b(i&&/^[A-Z]/.test(i)?i:undefined,j&&(j.params&&j.params.length||j.returns)?"function("+(j.params?j.params.map(function(k){return/\?/.test(k)?"?"+k.replace("?",""):k}).join(","):"")+")"+(j.returns?":"+j.returns:""):undefined)},d=function d(i,j,k){return i},e=function e(i,j,k){if("sourcemeta"in __transform_includes)i.__SMmeta=j;if("typechecks"in __transform_includes){var l=c(j?j.name:undefined,k);if(l)__w(i,l)}return i},f=function f(i,j,k){return k.apply(i,j)},g=function g(i,j,k,l){if(l&&l.params)__t.apply(i,l.params);var m=k.apply(i,j);if(l&&l.returns)__t([m,l.returns]);return m},h=function h(i,j,k,l,m){if(m){if(!m.callId)m.callId=m.module+":"+(m.line||0)+":"+(m.column||0);var n=m.callId;a[n]=(a[n]||0)+1}return k.apply(i,j)};if(typeof __transform_includes==="undefined"){__annotator=d;__bodyWrapper=f}else{__annotator=e;if("codeusage"in __transform_includes){__annotator=d;__bodyWrapper=h;__bodyWrapper.getCodeUsage=function(){return a};__bodyWrapper.clearCodeUsage=function(){a={}}}else if("typechecks"in __transform_includes)__bodyWrapper=g;else __bodyWrapper=f}})();
__t=function(a){return a[0]};__w=function(a){return a};
var require,__d;(function(a){var b={},c={},d=["global","require","requireDynamic","requireLazy","module","exports"];require=function(e,f){if(Object.prototype.hasOwnProperty.call(c,e))return c[e];if(!Object.prototype.hasOwnProperty.call(b,e)){if(f)return null;throw new Error("Module "+e+" has not been defined")}var g=b[e],h=g.deps,i=g.factory.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case"module":j=g;break;case"exports":j=g.exports;break;case"global":j=a;break;case"require":j=require;break;case"requireDynamic":j=null;break;case"requireLazy":j=null;break;default:j=require.call(null,h[l])}k.push(j)}g.factory.apply(a,k);c[e]=g.exports;return g.exports};__d=function(e,f,g,h){if(typeof g=="function"){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e)}else c[e]=g}})(this);
__d("ES5Array",[],(function a(b,c,d,e,f,g){var h={};h.isArray=function(i){return Object.prototype.toString.call(i)=="[object Array]"};f.exports=h}),null);
__d("ES5ArrayPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.map=function(i,j){if(typeof i!="function")throw new TypeError();var k=void 0,l=this.length,m=new Array(l);for(k=0;k<l;++k)if(k in this)m[k]=i.call(j,this[k],k,this);return m};h.forEach=function(i,j){h.map.call(this,i,j)};h.filter=function(i,j){__p&&__p();if(typeof i!="function")throw new TypeError();var k=void 0,l=void 0,m=this.length,n=[];for(k=0;k<m;++k)if(k in this){l=this[k];if(i.call(j,l,k,this))n.push(l)}return n};h.every=function(i,j){if(typeof i!="function")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(!i.call(j,k[m],m,k))return false;return true};h.some=function(i,j){if(typeof i!="function")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(i.call(j,k[m],m,k))return true;return false};h.indexOf=function(i,j){var k=this.length;j|=0;if(j<0)j+=k;for(;j<k;j++)if(j in this&&this[j]===i)return j;return-1};f.exports=h}),null);
__d("ES5Date",[],(function a(b,c,d,e,f,g){var h={};h.now=function(){return new Date().getTime()};f.exports=h}),null);
__d("ES5FunctionPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.bind=function(i){if(typeof this!="function")throw new TypeError("Bind must be called on a function");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName="bound:"+(j.displayName||j.name||"(?)");l.toString=function m(){return"bound: "+j};return l};f.exports=h}),null);
__d("ie8DontEnum",[],(function a(b,c,d,e,f,g){var h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","prototypeIsEnumerable","constructor"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable("toString"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);
__d("ES5Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!="object"&&m!="function")throw new TypeError("Object prototype may only be a Object or null");k.prototype=l;return new k()};j.keys=function(l){__p&&__p();var m=typeof l;if(m!="object"&&m!="function"||l===null)throw new TypeError("Object.keys called on non-object");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);
__d("ES5StringPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.trim=function(){if(this==null)throw new TypeError("String.prototype.trim called on null or undefined");return String.prototype.replace.call(this,/^\s+|\s+$/g,"")};h.startsWith=function(i){var j=String(this);if(this==null)throw new TypeError("String.prototype.startsWith called on null or undefined");var k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;var l=Math.min(Math.max(k,0),j.length);return j.indexOf(String(i),k)==l};h.endsWith=function(i){__p&&__p();var j=String(this);if(this==null)throw new TypeError("String.prototype.endsWith called on null or undefined");var k=j.length,l=String(i),m=arguments.length>1?Number(arguments[1]):k;if(isNaN(m))m=0;var n=Math.min(Math.max(m,0),k),o=n-l.length;if(o<0)return false;return j.lastIndexOf(l,o)==o};h.includes=function(i){if(this==null)throw new TypeError("String.prototype.contains called on null or undefined");var j=String(this),k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;return j.indexOf(String(i),k)!=-1};h.contains=h.includes;h.repeat=function(i){__p&&__p();if(this==null)throw new TypeError("String.prototype.repeat called on null or undefined");var j=String(this),k=i?Number(i):0;if(isNaN(k))k=0;if(k<0||k===Infinity)throw RangeError();if(k===1)return j;if(k===0)return"";var l="";while(k){if(k&1)l+=j;if(k>>=1)j+=j}return l};f.exports=h}),null);
__d("ES6Array",[],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h={from:function i(j){__p&&__p();if(j==null)throw new TypeError("Object is null or undefined");var k=arguments[1],l=arguments[2],m=this,n=Object(j),o=typeof Symbol==="function"?typeof Symbol==="function"?Symbol.iterator:"@@iterator":"@@iterator",p=typeof k==="function",q=typeof n[o]==="function",r=0,s=void 0,t=void 0;if(q){s=typeof m==="function"?new m():[];var u=n[o](),v=void 0;while(!(v=u.next()).done){t=v.value;if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}var w=n.length;if(isNaN(w)||w<0)w=0;s=typeof m==="function"?new m(w):new Array(w);while(r<w){t=n[r];if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}};f.exports=h}),null);
__d("ES6ArrayPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={find:function i(j,k){if(this==null)throw new TypeError("Array.prototype.find called on null or undefined");if(typeof j!=="function")throw new TypeError("predicate must be a function");var l=h.findIndex.call(this,j,k);return l===-1?void 0:this[l]},findIndex:function i(j,k){if(this==null)throw new TypeError("Array.prototype.findIndex called on null or undefined");if(typeof j!=="function")throw new TypeError("predicate must be a function");var l=Object(this),m=l.length>>>0;for(var n=0;n<m;n++)if(j.call(k,l[n],n,l))return n;return-1},fill:function i(j){if(this==null)throw new TypeError("Array.prototype.fill called on null or undefined");var k=Object(this),l=k.length>>>0,m=arguments[1],n=m>>0,o=n<0?Math.max(l+n,0):Math.min(n,l),p=arguments[2],q=p===undefined?l:p>>0,r=q<0?Math.max(l+q,0):Math.min(q,l);while(o<r){k[o]=j;o++}return k}};f.exports=h}),null);
__d("ES6DatePrototype",[],(function a(b,c,d,e,f,g){function h(j){return(j<10?"0":"")+j}var i={toISOString:function j(){if(!isFinite(this))throw new Error("Invalid time value");var k=this.getUTCFullYear();k=(k<0?"-":k>9999?"+":"")+("00000"+Math.abs(k)).slice(0<=k&&k<=9999?-4:-6);return k+"-"+h(this.getUTCMonth()+1)+"-"+h(this.getUTCDate())+"T"+h(this.getUTCHours())+":"+h(this.getUTCMinutes())+":"+h(this.getUTCSeconds())+"."+(this.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"}};f.exports=i}),null);
__d("ES6Number",[],(function a(b,c,d,e,f,g){__p&&__p();var h=Math.pow(2,-52),i=Math.pow(2,53)-1,j=-1*i,k={isFinite:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l=="number"&&isFinite(l)}),isNaN:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l=="number"&&isNaN(l)}),isInteger:function l(m){return this.isFinite(m)&&Math.floor(m)===m},isSafeInteger:function l(m){return this.isFinite(m)&&m>=this.MIN_SAFE_INTEGER&&m<=this.MAX_SAFE_INTEGER&&Math.floor(m)===m},EPSILON:h,MAX_SAFE_INTEGER:i,MIN_SAFE_INTEGER:j};f.exports=k}),null);
__d("ES6Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={assign:function k(l){__p&&__p();if(l==null)throw new TypeError("Object.assign target cannot be null or undefined");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);
__d("ES7ArrayPrototype",["ES5ArrayPrototype","ES5Array"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=h.indexOf,k=i.isArray;function l(p){return Math.min(Math.max(m(p),0),Number.MAX_SAFE_INTEGER)}function m(p){var q=Number(p);return isFinite(q)&&q!==0?n(q)*Math.floor(Math.abs(q)):q}function n(p){return p>=0?1:-1}var o={includes:function p(q){"use strict";__p&&__p();if(q!==undefined&&k(this)&&!(typeof q==="number"&&isNaN(q)))return j.apply(this,arguments)!==-1;var r=Object(this),s=r.length?l(r.length):0;if(s===0)return false;var t=arguments.length>1?m(arguments[1]):0,u=t<0?Math.max(s+t,0):t,v=isNaN(q)&&typeof q==="number";while(u<s){var w=r[u];if(w===q||typeof w==="number"&&v&&isNaN(w))return true;u++}return false}};f.exports=o}),null);
__d("ES7Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};j.entries=function(k){if(k==null)throw new TypeError("Object.entries called on non-object");var l=[];for(var m in k)if(i.call(k,m))l.push([m,k[m]]);h(k,function(n){return l.push([n,k[n]])});return l};j.values=function(k){if(k==null)throw new TypeError("Object.values called on non-object");var l=[];for(var m in k)if(i.call(k,m))l.push(k[m]);h(k,function(n){return l.push(k[n])});return l};f.exports=j}),null);
__d("ES7StringPrototype",[],(function a(b,c,d,e,f,g){var h={};h.trimLeft=function(){return this.replace(/^\s+/,"")};h.trimRight=function(){return this.replace(/\s+$/,"")};f.exports=h}),null);
/**
 * License: https://www.facebook.com/legal/license/PEUvhci6ox4/
 */
__d("json3-3.3.2",[],(function aa(ba,ca,da,ea,fa,a){"use strict";__p&&__p();var b={},c={exports:b};(function(){__p&&__p();var d;(function(){__p&&__p();var ia=typeof d==="function"&&d.amd,e={"function":true,object:true},f=e[typeof b]&&b&&!b.nodeType&&b,g=e[typeof window]&&window||this,h=f&&e[typeof c]&&c&&!c.nodeType&&typeof ba=="object"&&ba;if(h&&(h.global===h||h.window===h||h.self===h))g=h;function i(l,a){__p&&__p();l||(l=g.Object());a||(a=g.Object());var la=l.Number||g.Number,ma=l.String||g.String,na=l.Object||g.Object,m=l.Date||g.Date,oa=l.SyntaxError||g.SyntaxError,pa=l.TypeError||g.TypeError,qa=l.Math||g.Math,j=l.JSON||g.JSON;if(typeof j=="object"&&j){a.stringify=j.stringify;a.parse=j.parse}var ra=na.prototype,n=ra.toString,o,p,q,r=new m(-3509827334573292);try{r=r.getUTCFullYear()==-109252&&r.getUTCMonth()===0&&r.getUTCDate()===1&&r.getUTCHours()==10&&r.getUTCMinutes()==37&&r.getUTCSeconds()==6&&r.getUTCMilliseconds()==708}catch(s){}function t(I){__p&&__p();if(t[I]!==q)return t[I];var J;if(I=="bug-string-char-index")J="a"[0]!="a";else if(I=="json")J=t("json-stringify")&&t("json-parse");else{var K,L='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if(I=="json-stringify"){var M=a.stringify,N=typeof M=="function"&&r;if(N){(K=function(){return 1}).toJSON=K;try{N=M(0)==="0"&&M(new la())==="0"&&M(new ma())=='""'&&M(n)===q&&M(q)===q&&M()===q&&M(K)==="1"&&M([K])=="[1]"&&M([q])=="[null]"&&M(null)=="null"&&M([q,n,null])=="[null,null,null]"&&M({a:[K,true,false,null,"\0\b\n\f\r\t"]})==L&&M(null,K)==="1"&&M([1,2],null,1)=="[\n 1,\n 2\n]"&&M(new m(-864e13))=='"-271821-04-20T00:00:00.000Z"'&&M(new m(864e13))=='"+275760-09-13T00:00:00.000Z"'&&M(new m(-621987552e5))=='"-000001-01-01T00:00:00.000Z"'&&M(new m(-1))=='"1969-12-31T23:59:59.999Z"'}catch(s){N=false}}J=N}if(I=="json-parse"){var O=a.parse;if(typeof O=="function")try{if(O("0")===0&&!O(false)){K=O(L);var P=K.a.length==5&&K.a[0]===1;if(P){try{P=!O('"\t"')}catch(s){}if(P)try{P=O("01")!==1}catch(s){}if(P)try{P=O("1.")!==1}catch(s){}}}}catch(s){P=false}J=P}}return t[I]=!!J}if(!t("json")){var u="[object Function]",sa="[object Date]",v="[object Number]",w="[object String]",x="[object Array]",ta="[object Boolean]",y=t("bug-string-char-index");if(!r)var z=qa.floor,ua=[0,31,59,90,120,151,181,212,243,273,304,334],A=function(I,J){return ua[J]+365*(I-1970)+z((I-1969+(J=+(J>1)))/4)-z((I-1901+J)/100)+z((I-1601+J)/400)};if(!(o=ra.hasOwnProperty))o=function(I){__p&&__p();var J={},K;if((J.__proto__=null,J.__proto__={toString:1},J).toString!=n)o=function(I){var L=this.__proto__,M=I in(this.__proto__=null,this);this.__proto__=L;return M};else{K=J.constructor;o=function(I){var L=(this.constructor||K).prototype;return I in this&&!(I in L&&this[I]===L[I])}}J=null;return o.call(this,I)};p=function(I,J){__p&&__p();var K=0,L,M,N;(L=function(){this.valueOf=0}).prototype.valueOf=0;M=new L();for(N in M)if(o.call(M,N))K++;L=M=null;if(!K){M=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];p=function(I,J){var O=n.call(I)==u,N,P,Q=!O&&typeof I.constructor!="function"&&e[typeof I.hasOwnProperty]&&I.hasOwnProperty||o;for(N in I)if(!(O&&N=="prototype")&&Q.call(I,N))J(N);for(P=M.length;N=M[--P];Q.call(I,N)&&J(N));}}else if(K==2)p=function(I,J){var M={},O=n.call(I)==u,N;for(N in I)if(!(O&&N=="prototype")&&!o.call(M,N)&&(M[N]=1)&&o.call(I,N))J(N)};else p=function(I,J){var O=n.call(I)==u,N,P;for(N in I)if(!(O&&N=="prototype")&&o.call(I,N)&&!(P=N==="constructor"))J(N);if(P||o.call(I,N="constructor"))J(N)};return p(I,J)};if(!t("json-stringify")){var va={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},wa="000000",B=function(I,J){return(wa+(J||0)).slice(-I)},xa="\\u00",ya=function(I){__p&&__p();var J='"',K=0,L=I.length,M=!y||L>10,N=M&&(y?I.split(""):I);for(;K<L;K++){var O=I.charCodeAt(K);switch(O){case 8:case 9:case 10:case 12:case 13:case 34:case 92:J+=va[O];break;default:if(O<32){J+=xa+B(2,O.toString(16));break}J+=M?N[K]:I.charAt(K)}}return J+'"'},C=function(I,J,K,L,M,N,O){__p&&__p();var P,Q,R,S,T,U,V,W,Da,Ea,X,Y,Z,$,Fa,Ga;try{P=J[I]}catch(s){}if(typeof P=="object"&&P){Q=n.call(P);if(Q==sa&&!o.call(P,"toJSON"))if(P>-1/0&&P<1/0){if(A){T=z(P/864e5);for(R=z(T/365.2425)+1970-1;A(R+1,0)<=T;R++);for(S=z((T-A(R,0))/30.42);A(R,S+1)<=T;S++);T=1+T-A(R,S);U=(P%864e5+864e5)%864e5;V=z(U/36e5)%24;W=z(U/6e4)%60;Da=z(U/1e3)%60;Ea=U%1e3}else{R=P.getUTCFullYear();S=P.getUTCMonth();T=P.getUTCDate();V=P.getUTCHours();W=P.getUTCMinutes();Da=P.getUTCSeconds();Ea=P.getUTCMilliseconds()}P=(R<=0||R>=1e4?(R<0?"-":"+")+B(6,R<0?-R:R):B(4,R))+"-"+B(2,S+1)+"-"+B(2,T)+"T"+B(2,V)+":"+B(2,W)+":"+B(2,Da)+"."+B(3,Ea)+"Z"}else P=null;else if(typeof P.toJSON=="function"&&(Q!=v&&Q!=w&&Q!=x||o.call(P,"toJSON")))P=P.toJSON(I)}if(K)P=K.call(J,I,P);if(P===null)return"null";Q=n.call(P);if(Q==ta)return""+P;else if(Q==v)return P>-1/0&&P<1/0?""+P:"null";else if(Q==w)return ya(""+P);if(typeof P=="object"){for($=O.length;$--;)if(O[$]===P)throw pa();O.push(P);X=[];Fa=N;N+=M;if(Q==x){for(Z=0,$=P.length;Z<$;Z++){Y=C(Z,P,K,L,M,N,O);X.push(Y===q?"null":Y)}Ga=X.length?M?"[\n"+N+X.join(",\n"+N)+"\n"+Fa+"]":"["+X.join(",")+"]":"[]"}else{p(L||P,function(I){var Y=C(I,P,K,L,M,N,O);if(Y!==q)X.push(ya(I)+":"+(M?" ":"")+Y)});Ga=X.length?M?"{\n"+N+X.join(",\n"+N)+"\n"+Fa+"}":"{"+X.join(",")+"}":"{}"}O.pop();return Ga}};a.stringify=function(I,J,K){__p&&__p();var L,M,N,O;if(e[typeof J]&&J)if((O=n.call(J))==u)M=J;else if(O==x){N={};for(var P=0,Q=J.length,R;P<Q;R=J[P++],(O=n.call(R),O==w||O==v)&&(N[R]=1));}if(K)if((O=n.call(K))==v){if((K-=K%1)>0)for(L="",K>10&&(K=10);L.length<K;L+=" ");}else if(O==w)L=K.length<=10?K:K.slice(0,10);return C("",(R={},R[""]=I,R),M,N,L,"",[])}}if(!t("json-parse")){var za=ma.fromCharCode,Aa={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},D,E,F=function(){D=E=null;throw oa()},G=function(){__p&&__p();var I=E,J=I.length,K,L,M,N,O;while(D<J){O=I.charCodeAt(D);switch(O){case 9:case 10:case 13:case 32:D++;break;case 123:case 125:case 91:case 93:case 58:case 44:K=y?I.charAt(D):I[D];D++;return K;case 34:for(K="@",D++;D<J;){O=I.charCodeAt(D);if(O<32)F();else if(O==92){O=I.charCodeAt(++D);switch(O){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:K+=Aa[O];D++;break;case 117:L=++D;for(M=D+4;D<M;D++){O=I.charCodeAt(D);if(!(O>=48&&O<=57||O>=97&&O<=102||O>=65&&O<=70))F()}K+=za("0x"+I.slice(L,D));break;default:F()}}else{if(O==34)break;O=I.charCodeAt(D);L=D;while(O>=32&&O!=92&&O!=34)O=I.charCodeAt(++D);K+=I.slice(L,D)}}if(I.charCodeAt(D)==34){D++;return K}F();default:L=D;if(O==45){N=true;O=I.charCodeAt(++D)}if(O>=48&&O<=57){if(O==48&&(O=I.charCodeAt(D+1),O>=48&&O<=57))F();N=false;for(;D<J&&(O=I.charCodeAt(D),O>=48&&O<=57);D++);if(I.charCodeAt(D)==46){M=++D;for(;M<J&&(O=I.charCodeAt(M),O>=48&&O<=57);M++);if(M==D)F();D=M}O=I.charCodeAt(D);if(O==101||O==69){O=I.charCodeAt(++D);if(O==43||O==45)D++;for(M=D;M<J&&(O=I.charCodeAt(M),O>=48&&O<=57);M++);if(M==D)F();D=M}return+I.slice(L,D)}if(N)F();if(I.slice(D,D+4)=="true"){D+=4;return true}else if(I.slice(D,D+5)=="false"){D+=5;return false}else if(I.slice(D,D+4)=="null"){D+=4;return null}F()}}return"$"},H=function(I){__p&&__p();var J,K;if(I=="$")F();if(typeof I=="string"){if((y?I.charAt(0):I[0])=="@")return I.slice(1);if(I=="["){J=[];for(;;K||(K=true)){I=G();if(I=="]")break;if(K)if(I==","){I=G();if(I=="]")F()}else F();if(I==",")F();J.push(H(I))}return J}else if(I=="{"){J={};for(;;K||(K=true)){I=G();if(I=="}")break;if(K)if(I==","){I=G();if(I=="}")F()}else F();if(I==","||typeof I!="string"||(y?I.charAt(0):I[0])!="@"||G()!=":")F();J[I.slice(1)]=H(G())}return J}F()}return I},Ba=function(I,J,K){var L=Ca(I,J,K);if(L===q)delete I[J];else I[J]=L},Ca=function(I,J,K){var L=I[J],M;if(typeof L=="object"&&L)if(n.call(L)==x)for(M=L.length;M--;)Ba(L,M,K);else p(L,function(J){Ba(L,J,K)});return K.call(I,J,L)};a.parse=function(I,J){var K,L;D=0;E=""+I;K=H(G());if(G()!="$")F();D=E=null;return J&&n.call(J)==u?Ca((L={},L[""]=K,L),"",J):K}}}a.runInContext=i;return a}if(f&&!ia)i(g,f);else{var j=g.JSON,ja=g.JSON3,ka=false,k=i(g,g.JSON3={noConflict:function(){if(!ka){ka=true;g.JSON=j;g.JSON3=ja;j=ja=null}return k}});g.JSON={parse:k.parse,stringify:k.stringify}}}).call(this)})();var ga=c.exports,ha=function(d){switch(d){case undefined:return ga}};fa.exports=ha}),null);
__d("json3",["json3-3.3.2"],(function a(b,c,d,e,f,g){f.exports=c("json3-3.3.2")()}),null);
__d("ES",["json3","ES5ArrayPrototype","ES5FunctionPrototype","ES5StringPrototype","ES5Array","ES5Object","ES5Date","ES6Array","ES6Object","ES6ArrayPrototype","ES6DatePrototype","ES6Number","ES7StringPrototype","ES7Object","ES7ArrayPrototype"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){__p&&__p();var w={}.toString,x={"JSON.stringify":h.stringify,"JSON.parse":h.parse},y={"Array.prototype":i,"Function.prototype":j,"String.prototype":k,Object:m,Array:l,Date:n},z={Object:p,"Array.prototype":q,"Date.prototype":r,Number:s,Array:o},A={Object:u,"String.prototype":t,"Array.prototype":v};function B(D){__p&&__p();for(var E in D){if(!Object.prototype.hasOwnProperty.call(D,E))continue;var F=D[E],G=E.split(".");if(G.length===2){var H=G[0],I=G[1];if(!H||!I||!window[H]||!window[H][I]){var J=H?window[H]:"-",K=H&&window[H]&&I?window[H][I]:"-";throw new Error("Unexpected state (t11975770): "+(H+", "+I+", "+J+", "+K+", "+E))}}var L=G.length===2?window[G[0]][G[1]]:window[E];for(var M in F){if(!Object.prototype.hasOwnProperty.call(F,M))continue;if(typeof F[M]!=="function"){x[E+"."+M]=F[M];continue}var N=L[M];x[E+"."+M]=N&&/\{\s+\[native code\]\s\}/.test(N)?N:F[M]}}}B(y);B(z);B(A);function C(D,E,F){var G=F?w.call(D).slice(8,-1)+".prototype":D,H=x[G+"."+E]||D[E];if(typeof H==="function"){for(var I=arguments.length,J=Array(I>3?I-3:0),K=3;K<I;K++)J[K-3]=arguments[K];return H.apply(D,J)}else if(H)return H;throw new Error("Polyfill "+G+" does not have implementation of "+E)}f.exports=C}),null);
__d("ES5FunctionPrototype",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};h.bind=function(i){if(typeof this!="function")throw new TypeError("Bind must be called on a function");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName="bound:"+(j.displayName||j.name||"(?)");l.toString=function m(){return"bound: "+j};return l};f.exports=h}),null);
__d("ie8DontEnum",[],(function a(b,c,d,e,f,g){var h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","prototypeIsEnumerable","constructor"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable("toString"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);
__d("ES5Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!="object"&&m!="function")throw new TypeError("Object prototype may only be a Object or null");k.prototype=l;return new k()};j.keys=function(l){__p&&__p();var m=typeof l;if(m!="object"&&m!="function"||l===null)throw new TypeError("Object.keys called on non-object");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);
__d("ES6Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={}.hasOwnProperty,j={assign:function k(l){__p&&__p();if(l==null)throw new TypeError("Object.assign target cannot be null or undefined");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);
__d("sdk.babelHelpers",["ES5FunctionPrototype","ES5Object","ES6Object"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={},l=Object.prototype.hasOwnProperty;k.inherits=function(m,n){j.assign(m,n);m.prototype=i.create(n&&n.prototype);m.prototype.constructor=m;m.__superConstructor__=n;return n};k._extends=j.assign;k["extends"]=k._extends;k.objectWithoutProperties=function(m,n){var o={};for(var p in m){if(!l.call(m,p)||n.indexOf(p)>=0)continue;o[p]=m[p]}return o};k.taggedTemplateLiteralLoose=function(m,n){m.raw=n;return m};k.bind=h.bind;f.exports=k}),null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      (function(a,b){var c="keys",d="values",e="entries",f=function(){var l=h(Array),m=void 0;if(!l)m=function(){function m(n,o){"use strict";this.$ArrayIterator1=n;this.$ArrayIterator2=o;this.$ArrayIterator3=0}m.prototype.next=function(){"use strict";if(this.$ArrayIterator1==null)return{value:b,done:true};var n=this.$ArrayIterator1,o=this.$ArrayIterator1.length,p=this.$ArrayIterator3,q=this.$ArrayIterator2;if(p>=o){this.$ArrayIterator1=b;return{value:b,done:true}}this.$ArrayIterator3=p+1;if(q===c)return{value:p,done:false};else if(q===d)return{value:n[p],done:false};else if(q===e)return{value:[p,n[p]],done:false}};m.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};return m}();return{keys:l?function(n){return n.keys()}:function(n){return new m(n,c)},values:l?function(n){return n.values()}:function(n){return new m(n,d)},entries:l?function(n){return n.entries()}:function(n){return new m(n,e)}}}(),g=function(){var l=h(String),m=void 0;if(!l)m=function(){function m(n){"use strict";this.$StringIterator1=n;this.$StringIterator2=0}m.prototype.next=function(){"use strict";if(this.$StringIterator1==null)return{value:b,done:true};var n=this.$StringIterator2,o=this.$StringIterator1,p=o.length;if(n>=p){this.$StringIterator1=b;return{value:b,done:true}}var q=void 0,r=o.charCodeAt(n);if(r<55296||r>56319||n+1===p)q=o[n];else{var s=o.charCodeAt(n+1);if(s<56320||s>57343)q=o[n];else q=o[n]+o[n+1]}this.$StringIterator2=n+q.length;return{value:q,done:false}};m.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};return m}();return{keys:function n(){throw TypeError("Strings default iterator doesn't implement keys.")},values:l?function(n){return n[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]()}:function(n){return new m(n)},entries:function n(){throw TypeError("Strings default iterator doesn't implement entries.")}}}();function h(l){return typeof l.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]==="function"&&typeof l.prototype.values==="function"&&typeof l.prototype.keys==="function"&&typeof l.prototype.entries==="function"}function i(l,m){"use strict";this.$ObjectIterator1=l;this.$ObjectIterator2=m;this.$ObjectIterator3=ES("Object","keys",false,l);this.$ObjectIterator4=0}i.prototype.next=function(){"use strict";var l=this.$ObjectIterator3.length,m=this.$ObjectIterator4,n=this.$ObjectIterator2,o=this.$ObjectIterator3[m];if(m>=l){this.$ObjectIterator1=b;return{value:b,done:true}}this.$ObjectIterator4=m+1;if(n===c)return{value:o,done:false};else if(n===d)return{value:this.$ObjectIterator1[o],done:false};else if(n===e)return{value:[o,this.$ObjectIterator1[o]],done:false}};i.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};var j={keys:function l(m){return new i(m,c)},values:function l(m){return new i(m,d)},entries:function l(m){return new i(m,e)}};function k(l,m){if(typeof l==="string")return g[m||d](l);else if(ES("Array","isArray",false,l))return f[m||d](l);else if(l[typeof Symbol==="function"?Symbol.iterator:"@@iterator"])return l[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();else return j[m||e](l)}ES("Object","assign",false,k,{KIND_KEYS:c,KIND_VALUES:d,KIND_ENTRIES:e,keys:function l(m){return k(m,c)},values:function l(m){return k(m,d)},entries:function l(m){return k(m,e)},generic:j.entries});a.FB_enumerate=k})(typeof global==="undefined"?this:global);
(function(a,b){var c=a.window||a;function d(){return"f"+(Math.random()*(1<<30)).toString(16).replace(".","")}function e(j){var k=j?j.ownerDocument||j:document,l=k.defaultView||c;return!!(j&&(typeof l.Node==="function"?j instanceof l.Node:typeof j==="object"&&typeof j.nodeType==="number"&&typeof j.nodeName==="string"))}function f(j){var k=c[j];if(k==null)return true;if(typeof c.Symbol!=="function")return true;var l=k.prototype;return k==null||typeof k!=="function"||typeof l.clear!=="function"||new k().size!==0||typeof l.keys!=="function"||typeof l.forEach!=="function"}var g=a.FB_enumerate,h=function(){if(!f("Map"))return c.Map;var j="key",k="value",l="key+value",m="$map_",n=void 0,o="IE_HASH_";function h(A){"use strict";if(!t(this))throw new TypeError("Wrong map object type.");s(this);if(A!=null){var B=g(A),C=void 0;while(!(C=B.next()).done){if(!t(C.value))throw new TypeError("Expected iterable items to be pair objects.");this.set(C.value[0],C.value[1])}}}h.prototype.clear=function(){"use strict";s(this)};h.prototype.has=function(A){"use strict";var B=q(this,A);return!!(B!=null&&this._mapData[B])};h.prototype.set=function(A,B){"use strict";var C=q(this,A);if(C!=null&&this._mapData[C])this._mapData[C][1]=B;else{C=this._mapData.push([A,B])-1;r(this,A,C);this.size+=1}return this};h.prototype.get=function(A){"use strict";var B=q(this,A);if(B==null)return b;else return this._mapData[B][1]};h.prototype["delete"]=function(A){"use strict";var B=q(this,A);if(B!=null&&this._mapData[B]){r(this,A,b);this._mapData[B]=b;this.size-=1;return true}else return false};h.prototype.entries=function(){"use strict";return new p(this,l)};h.prototype.keys=function(){"use strict";return new p(this,j)};h.prototype.values=function(){"use strict";return new p(this,k)};h.prototype.forEach=function(A,B){"use strict";if(typeof A!=="function")throw new TypeError("Callback must be callable.");var C=ES(A,"bind",true,B||b),D=this._mapData;for(var E=0;E<D.length;E++){var F=D[E];if(F!=null)C(F[1],F[0],this)}};h.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this.entries()};function p(A,B){"use strict";if(!(t(A)&&A._mapData))throw new TypeError("Object is not a map.");if(ES([j,l,k],"indexOf",true,B)===-1)throw new Error("Invalid iteration kind.");this._map=A;this._nextIndex=0;this._kind=B}p.prototype.next=function(){"use strict";if(!this instanceof h)throw new TypeError("Expected to be called on a MapIterator.");var A=this._map,B=this._nextIndex,C=this._kind;if(A==null)return u(b,true);var D=A._mapData;while(B<D.length){var E=D[B];B+=1;this._nextIndex=B;if(E)if(C===j)return u(E[0],false);else if(C===k)return u(E[1],false);else if(C)return u(E,false)}this._map=b;return u(b,true)};p.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};function q(A,B){if(t(B)){var C=y(B);return C?A._objectIndex[C]:b}else{var D=m+B;if(typeof B==="string")return A._stringIndex[D];else return A._otherIndex[D]}}function r(A,B,C){var D=C==null;if(t(B)){var E=y(B);if(!E)E=z(B);if(D)delete A._objectIndex[E];else A._objectIndex[E]=C}else{var F=m+B;if(typeof B==="string")if(D)delete A._stringIndex[F];else A._stringIndex[F]=C;else if(D)delete A._otherIndex[F];else A._otherIndex[F]=C}}function s(A){A._mapData=[];A._objectIndex={};A._stringIndex={};A._otherIndex={};A.size=0}function t(A){return A!=null&&(typeof A==="object"||typeof A==="function")}function u(A,B){return{value:A,done:B}}h.__isES5=function(){try{Object.defineProperty({},"__.$#x",{});return true}catch(A){return false}}();function v(A){if(!h.__isES5||!Object.isExtensible)return true;else return Object.isExtensible(A)}function w(A){var B=void 0;switch(A.nodeType){case 1:B=A.uniqueID;break;case 9:B=A.documentElement.uniqueID;break;default:return null}if(B)return o+B;else return null}var x=d();function y(A){if(A[x])return A[x];else if(!h.__isES5&&A.propertyIsEnumerable&&A.propertyIsEnumerable[x])return A.propertyIsEnumerable[x];else if(!h.__isES5&&e(A)&&w(A))return w(A);else if(!h.__isES5&&A[x])return A[x]}var z=function(){var A=Object.prototype.propertyIsEnumerable,B=0;return function z(C){if(v(C)){B+=1;if(h.__isES5)Object.defineProperty(C,x,{enumerable:false,writable:false,configurable:false,value:B});else if(C.propertyIsEnumerable){C.propertyIsEnumerable=function(){return A.apply(this,arguments)};C.propertyIsEnumerable[x]=B}else if(e(C))C[x]=B;else throw new Error("Unable to set a non-enumerable property on object.");return B}else throw new Error("Non-extensible objects are not allowed as keys.")}}();return __annotator(h,{name:"Map"})}(),i=function(){if(!f("Set"))return c.Set;function i(k){"use strict";if(this==null||typeof this!=="object"&&typeof this!=="function")throw new TypeError("Wrong set object type.");j(this);if(k!=null){var l=g(k),m=void 0;while(!(m=l.next()).done)this.add(m.value)}}i.prototype.add=function(k){"use strict";this._map.set(k,k);this.size=this._map.size;return this};i.prototype.clear=function(){"use strict";j(this)};i.prototype["delete"]=function(k){"use strict";var l=this._map["delete"](k);this.size=this._map.size;return l};i.prototype.entries=function(){"use strict";return this._map.entries()};i.prototype.forEach=function(k){"use strict";var l=arguments[1],m=this._map.keys(),n=void 0;while(!(n=m.next()).done)k.call(l,n.value,n.value,this)};i.prototype.has=function(k){"use strict";return this._map.has(k)};i.prototype.values=function(){"use strict";return this._map.values()};i.prototype.keys=function(){"use strict";return this.values()};i.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this.values()};function j(k){k._map=new h();k.size=k._map.size}return __annotator(i,{name:"Set"})}();a.Map=h;a.Set=i})(typeof global==="undefined"?this:global);      __d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","an_https":"an.facebook.com","fbcdn_http":"static.xx.fbcdn.net","fbcdn_https":"static.xx.fbcdn.net","cdn_http":"staticxx.facebook.com","cdn_https":"staticxx.facebook.com"});__d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"3461256"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"dialog_resize_refactor":true,"one_comment_controller":true,"allow_non_canvas_app_events":false,"event_subscriptions_log":{"rate":0.01,"value":10000},"should_force_single_dialog_instance":true,"js_sdk_force_status_on_load":true,"js_sdk_mbasic_share_plugin_init":true,"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"getloginstatus_tracking":{"rate":0.001},"xd_timeout":{"rate":4,"value":30000},"use_bundle":true,"launch_payment_dialog_via_pac":{"rate":100},"plugin_tags_blacklist":["recommendations_bar","registration","activity","recommendations","facepile"],"should_log_response_error":true},"api":{"mode":"warn","whitelist":["AppEvents","AppEvents.EventNames","AppEvents.ParameterNames","AppEvents.activateApp","AppEvents.logEvent","AppEvents.logPageView","AppEvents.logPurchase","AppEvents.setUserID","AppEvents.getUserID","AppEvents.clearUserID","AppEvents.updateUserProperties","Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.parse","Payment.setSize","Payment.unlockForProcessing","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui","AppEvents.setAppVersion","AppEvents.getAppVersion","AppEvents.clearAppVersion","RankingService.hidePlugin","RankingService.showPlugin"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=42","XdBundleUrl":"\/connect\/xd_arbiter\/r\/lY4eZXm_YWu.js?version=42","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yW\/r\/yOZN1vHw3Z_.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_loader{background-color:#f6f7f9;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;bottom:0;left:0;right:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #29487d;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f9;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yD\/r\/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50\u0025 50\u0025;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}\n.fb_invisible_flow{display:inherit;height:0;overflow-x:hidden;width:0}.fb_mobile_overlay_active{height:100\u0025;overflow:hidden;position:fixed;width:100\u0025}.fb_shrink_active{opacity:1;transform:scale(1, 1);transition-duration:200ms;transition-timing-function:ease-out}.fb_shrink_active:active{opacity:.5;transform:scale(.75, .75)}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget","css:fb.css.customer_chat_plugin_iframe"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yd\/r\/mxzow1Sdmxr.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466,768691303149786,320528941393723],"sampleRate":500});      __d("DOMWrapper",[],(function a(b,c,d,e,f,g){var h,i,j={setRoot:function k(l){h=l},getRoot:function k(){return h||document.body},setWindow:function k(l){i=l},getWindow:function k(){return i||self}};f.exports=j}),null);
__d("dotAccess",[],(function a(b,c,d,e,f,g){function h(i,j,k){var l=j.split(".");do{var m=l.shift();i=i[m]||k&&(i[m]={})}while(l.length&&i);return i}f.exports=h}),null);
__d("guid",[],(function a(b,c,d,e,f,g){function h(){return"f"+(Math.random()*(1<<30)).toString(16).replace(".","")}f.exports=h}),18);
__d("wrapFunction",[],(function a(b,c,d,e,f,g){var h={},i=function i(j,k,l){return function(){var m=k in h?h[k](j,l):j;for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m.apply(this,o)}};i.setWrapper=function(j,k){h[k]=j};f.exports=i}),null);
__d("GlobalCallback",["DOMWrapper","dotAccess","guid","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();var l,m,n={setPrefix:function o(p){l=i(h.getWindow(),p,true);m=p},create:function o(p,q){if(!l)this.setPrefix("__globalCallbacks");var r=j();l[r]=k(p,"entry",q||"GlobalCallback");return m+"."+r},remove:function o(p){var q=p.substring(m.length+1);delete l[q]}};f.exports=n}),null);
__d("sprintf",[],(function a(b,c,d,e,f,g){function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=0;return i.replace(/%s/g,function(){return String(k[m++])})}f.exports=h}),null);
__d("Log",["sprintf"],(function a(b,c,d,e,f,g,h){var i={DEBUG:3,INFO:2,WARNING:1,ERROR:0};function j(l,m){var n=Array.prototype.slice.call(arguments,2),o=h.apply(null,n),p=window.console;if(p&&k.level>=m)p[l in p?l:"log"](o)}var k={level:-1,Level:i,debug:ES(j,"bind",true,null,"debug",i.DEBUG),info:ES(j,"bind",true,null,"info",i.INFO),warn:ES(j,"bind",true,null,"warn",i.WARNING),error:ES(j,"bind",true,null,"error",i.ERROR)};f.exports=k}),null);
__d("ObservableMixin",[],(function a(b,c,d,e,f,g){__p&&__p();function h(){this.__observableEvents={}}h.prototype={inform:function i(j){__p&&__p();var k=Array.prototype.slice.call(arguments,1),l=Array.prototype.slice.call(this.getSubscribers(j));for(var m=0;m<l.length;m++){if(l[m]===null)continue;try{l[m].apply(this,k)}catch(n){setTimeout(function(){throw n},0)}}return this},getSubscribers:function i(j){return this.__observableEvents[j]||(this.__observableEvents[j]=[])},clearSubscribers:function i(j){if(j)this.__observableEvents[j]=[];return this},clearAllSubscribers:function i(){this.__observableEvents={};return this},subscribe:function i(j,k){var l=this.getSubscribers(j);l.push(k);return this},unsubscribe:function i(j,k){var l=this.getSubscribers(j);for(var m=0;m<l.length;m++)if(l[m]===k){l.splice(m,1);break}return this},monitor:function i(j,k){if(!k()){var i=ES(function(l){if(k.apply(k,arguments))this.unsubscribe(j,i)},"bind",true,this);this.subscribe(j,i)}return this}};f.exports=h}),null);
__d("UrlMap",["UrlMapConfig"],(function a(b,c,d,e,f,g,h){__p&&__p();var i={resolve:function j(k,l){var m=typeof l=="undefined"?location.protocol.replace(":",""):l?"https":"http";if(k in h)return m+"://"+h[k];if(typeof l=="undefined"&&k+"_"+m in h)return m+"://"+h[k+"_"+m];if(l!==true&&k+"_http"in h)return"http://"+h[k+"_http"];if(l!==false&&k+"_https"in h)return"https://"+h[k+"_https"]}};f.exports=i}),null);
__d("QueryString",[],(function a(b,c,d,e,f,g){__p&&__p();function h(l){__p&&__p();var m=[];ES(ES("Object","keys",false,l).sort(),"forEach",true,function(n){var o=l[n];if(typeof o==="undefined")return;if(o===null){m.push(n);return}m.push(encodeURIComponent(n)+"="+encodeURIComponent(o))});return m.join("&")}function i(l,m){__p&&__p();var n={};if(l==="")return n;var o=l.split("&");for(var p=0;p<o.length;p++){var q=o[p].split("=",2),r=decodeURIComponent(q[0]);if(m&&Object.prototype.hasOwnProperty.call(n,r))throw new URIError("Duplicate key: "+r);n[r]=q.length===2?decodeURIComponent(q[1]):null}return n}function j(l,m){return l+(ES(l,"indexOf",true,"?")!==-1?"&":"?")+(typeof m==="string"?m:k.encode(m))}var k={encode:h,decode:i,appendToUrl:j};f.exports=k}),null);
__d("ManagedError",[],(function a(b,c,d,e,f,g){function h(i,j){Error.prototype.constructor.call(this,i);this.message=i;this.innerError=j}h.prototype=new Error();h.prototype.constructor=h;f.exports=h}),null);
__d("AssertionError",["ManagedError"],(function a(b,c,d,e,f,g,h){function i(j){h.prototype.constructor.apply(this,arguments)}i.prototype=new h();i.prototype.constructor=i;f.exports=i}),null);
__d("Assert",["AssertionError","sprintf"],(function a(b,c,d,e,f,g,h,i){__p&&__p();function j(o,p){if(typeof o!=="boolean"||!o)throw new h(p);return o}function k(o,p,q){__p&&__p();var r;if(p===undefined)r="undefined";else if(p===null)r="null";else{var s=Object.prototype.toString.call(p);r=/\s(\w*)/.exec(s)[1].toLowerCase()}j(ES(o,"indexOf",true,r)!==-1,q||i("Expression is of type %s, not %s",r,o));return p}function l(o,p,q){j(p instanceof o,q||"Expression not instance of type");return p}function m(o,p){n["is"+o]=p;n["maybe"+o]=function(q,r){if(q!=null)p(q,r)}}var n={isInstanceOf:l,isTrue:j,isTruthy:function o(p,q){return j(!!p,q)},type:k,define:function o(p,q){p=p.substring(0,1).toUpperCase()+p.substring(1).toLowerCase();m(p,function(r,s){j(q(r),s)})}};ES(["Array","Boolean","Date","Function","Null","Number","Object","Regexp","String","Undefined"],"forEach",true,function(o){m(o,ES(k,"bind",true,null,o.toLowerCase()))});f.exports=n}),null);
__d("Type",["Assert"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(){var m=this.__mixins;if(m)for(var n=0;n<m.length;n++)m[n].apply(this,arguments)}function j(m,n){if(n instanceof m)return true;if(n instanceof i)for(var o=0;o<n.__mixins.length;o++)if(n.__mixins[o]==m)return true;return false}function k(m,n){__p&&__p();var o=m.prototype;if(!ES("Array","isArray",false,n))n=[n];for(var p=0;p<n.length;p++){var q=n[p];if(typeof q=="function"){o.__mixins.push(q);q=q.prototype}ES(ES("Object","keys",false,q),"forEach",true,function(r){o[r]=q[r]})}}function l(m,n,o){__p&&__p();var p=n&&Object.prototype.hasOwnProperty.call(n,"constructor")?n.constructor:function(){this.parent.apply(this,arguments)};h.isFunction(p);if(m&&m.prototype instanceof i===false)throw new Error("parent type does not inherit from Type");m=m||i;function q(){}q.prototype=m.prototype;p.prototype=new q();if(n)ES("Object","assign",false,p.prototype,n);p.prototype.constructor=p;p.parent=m;p.prototype.__mixins=m.prototype.__mixins?Array.prototype.slice.call(m.prototype.__mixins):[];if(o)k(p,o);p.prototype.parent=function(){this.parent=m.prototype.parent;m.apply(this,arguments)};p.prototype.parentCall=function(r){return m.prototype[r].apply(this,Array.prototype.slice.call(arguments,1))};p.extend=function(n,o){return l(this,n,o)};return p}ES("Object","assign",false,i.prototype,{instanceOf:function m(n){return j(n,this)}});ES("Object","assign",false,i,{extend:function m(n,o){return typeof n==="function"?l.apply(null,arguments):l(null,n,o)},instanceOf:j});f.exports=i}),null);
__d("sdk.Model",["Type","ObservableMixin"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=h.extend({constructor:function k(l){__p&&__p();this.parent();var m={},n=this;ES(ES("Object","keys",false,l),"forEach",true,function(o){m[o]=l[o];n["set"+o]=function(p){if(p===m[o])return this;m[o]=p;n.inform(o+".change",p);return n};n["get"+o]=function(){return m[o]}})}},i);f.exports=j}),null);
__d("sdk.Runtime",["sdk.Model","JSSDKRuntimeConfig"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},k=new h({AccessToken:"",AutoLogAppEvents:false,ClientID:"",CookieUserID:"",Environment:j.UNKNOWN,Initialized:false,IsVersioned:false,KidDirectedSite:undefined,Locale:i.locale,LoggedIntoFacebook:undefined,LoginStatus:undefined,Revision:i.revision,Rtl:i.rtl,Scope:undefined,Secure:undefined,UseCookie:false,UserID:"",Version:undefined});ES("Object","assign",false,k,{ENVIRONMENTS:j,isEnvironment:function l(m){var n=this.getEnvironment();return(m|n)===n},isCanvasEnvironment:function l(){return this.isEnvironment(j.CANVAS)||this.isEnvironment(j.PAGETAB)}});(function(){var l=/app_runner/.test(window.name)?j.PAGETAB:/iframe_canvas/.test(window.name)?j.CANVAS:j.UNKNOWN;if((l|j.PAGETAB)===l)l|=j.CANVAS;k.setEnvironment(l)})();f.exports=k}),null);
__d("sdk.Cookie",["QueryString","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=null;function k(n,o,p){n=n+i.getClientID();var q=j&&j!==".";if(q){document.cookie=n+"=; expires=Wed, 04 Feb 2004 08:00:00 GMT;";document.cookie=n+"=; expires=Wed, 04 Feb 2004 08:00:00 GMT;domain="+location.hostname+";"}var r=new Date(p).toGMTString();document.cookie=n+"="+o+(o&&p===0?"":"; expires="+r)+"; path=/"+(q?"; domain="+j:"")}function l(n){n=n+i.getClientID();var o=new RegExp("\\b"+n+"=([^;]*)\\b");return o.test(document.cookie)?RegExp.$1:null}var m={setDomain:function n(o){j=o;var p=h.encode({base_domain:j&&j!=="."?j:""}),q=new Date();q.setFullYear(q.getFullYear()+1);k("fbm_",p,q.getTime())},getDomain:function n(){return j},loadMeta:function n(){var o=l("fbm_");if(o){var p=h.decode(o);if(!j)j=p.base_domain;return p}},loadSignedRequest:function n(){return l("fbsr_")},setSignedRequestCookie:function n(o,p){if(!o)throw new Error("Value passed to Cookie.setSignedRequestCookie was empty.");k("fbsr_",o,p)},clearSignedRequestCookie:function n(){k("fbsr_","",0)},setRaw:k,getRaw:l};f.exports=m}),null);
__d("Miny",[],(function a(b,c,d,e,f,g){__p&&__p();var h="Miny1",i="wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split(""),j={encode:function k(l){__p&&__p();if(/^$|[~\\]|__proto__/.test(l))return l;var m=l.match(/\w+|\W+/g),n,o=ES("Object","create",false,null);for(n=0;n<m.length;n++)o[m[n]]=(o[m[n]]||0)+1;var p=ES("Object","keys",false,o);p.sort(function(s,t){return o[t]-o[s]});for(n=0;n<p.length;n++){var q=(n-n%32)/32;o[p[n]]=q?q.toString(32)+i[n%32]:i[n%32]}var r="";for(n=0;n<m.length;n++)r+=o[m[n]];p.unshift(h,p.length);p.push(r);return p.join("~")}};f.exports=j}),null);
__d("sdk.UA",[],(function a(b,c,d,e,f,g){__p&&__p();var h=navigator.userAgent,i={iphone:/\b(iPhone|iP[ao]d)/.test(h),ipad:/\b(iP[ao]d)/.test(h),android:/Android/i.test(h),nativeApp:/FBAN\/\w+;/i.test(h),nativeAndroidApp:/FB_IAB\/\w+;/i.test(h),nativeInstagramApp:/Instagram/i.test(h)},j=/Mobile/i.test(h),k={ie:"",firefox:"",chrome:"",webkit:"",osx:"",edge:"",operaMini:"",ucWeb:""},l=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(h);if(l){k.ie=l[1]?parseFloat(l[1]):l[4]?parseFloat(l[4]):"";k.firefox=l[2]||"";k.webkit=l[3]||"";if(l[3]){var m=/(?:Chrome\/(\d+\.\d+))/.exec(h);k.chrome=m?m[1]:"";var n=/(?:Edge\/(\d+\.\d+))/.exec(h);k.edge=n?n[1]:""}}var o=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(h);if(o)k.osx=o[1];var p=/(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(h);if(p)k.operaMini=p[1];var q=/(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(h);if(q)k.ucWeb=q[1]||"2.0";function r(t){return ES(t.split("."),"map",true,function(u){return parseFloat(u)})}var s={};ES(ES("Object","keys",false,k),"map",true,function(t){s[t]=function(){return parseFloat(k[t])};s[t].getVersionParts=function(){return r(k[t])}});ES(ES("Object","keys",false,i),"map",true,function(t){s[t]=function(){return i[t]}});s.mobile=function(){return i.iphone||i.ipad||i.android||j};s.mTouch=function(){return i.android||i.iphone||i.ipad};s.inAppBrowser=function(){return i.nativeApp||i.nativeAndroidApp||i.nativeInstagramApp};s.mBasic=function(){return!!(k.ucWeb||k.operaMini)};f.exports=s}),null);
__d("getBlankIframeSrc",["sdk.UA"],(function a(b,c,d,e,f,g,h){function i(){return h.ie()<10?"javascript:false":"about:blank"}f.exports=i}),null);
__d("insertIframe",["GlobalCallback","getBlankIframeSrc","guid"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();function k(l){__p&&__p();l.id=l.id||j();l.name=l.name||j();var m=false,n=false,o=function o(){if(m&&!n){n=true;l.onload&&l.onload(l.root.firstChild)}},p=h.create(o);if(document.attachEvent){var q='<iframe id="'+l.id+'" name="'+l.name+'"'+(l.title?' title="'+l.title+'"':"")+(l.className?' class="'+l.className+'"':"")+' style="border:none;'+(l.width?"width:"+l.width+"px;":"")+(l.height?"height:"+l.height+"px;":"")+'" src="'+i()+'" frameborder="0" scrolling="no" allowtransparency="true" onload="'+p+'()"></iframe>';l.root.innerHTML='<iframe src="'+i()+'" frameborder="0" scrolling="no" style="height:1px"></iframe>';m=true;setTimeout(function(){l.root.innerHTML=q;l.root.firstChild.src=l.url;l.onInsert&&l.onInsert(l.root.firstChild)},0)}else{var r=document.createElement("iframe");r.id=l.id;r.name=l.name;r.onload=o;r.scrolling="no";r.style.border="none";r.style.overflow="hidden";if(l.title)r.title=l.title;if(l.className)r.className=l.className;if(l.height!==undefined)r.style.height=l.height+"px";if(l.width!==undefined)if(l.width=="100%")r.style.width=l.width;else r.style.width=l.width+"px";l.root.appendChild(r);m=true;r.src=l.url;l.onInsert&&l.onInsert(r)}}f.exports=k}),null);
__d("sdk.domReady",["sdk.Runtime"],(function a(b,c,d,e,f,g,h){__p&&__p();var i,j="readyState"in document?/loaded|complete/.test(document.readyState):!!document.body;function k(){if(!i)return;var n;while(n=i.shift())n();i=null}function l(n){if(i){i.push(n);return}else n()}if(!j){i=[];if(document.addEventListener){document.addEventListener("DOMContentLoaded",k,false);window.addEventListener("load",k,false)}else if(document.attachEvent){document.attachEvent("onreadystatechange",k);window.attachEvent("onload",k)}if(document.documentElement.doScroll&&window==window.top){var m=function m(){try{h.getRtl()?document.documentElement.doScroll("right"):document.documentElement.doScroll("left")}catch(n){setTimeout(m,0);return}k()};m()}}f.exports=l}),3);
__d("sdk.Content",["Log","sdk.UA","sdk.domReady"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k,l,m={append:function n(o,p){__p&&__p();if(!p)if(!k){k=p=document.getElementById("fb-root");if(!p){h.warn('The "fb-root" div has not been created, auto-creating');k=p=document.createElement("div");p.id="fb-root";if(i.ie()||!document.body)j(function(){document.body.appendChild(p)});else document.body.appendChild(p)}p.className+=" fb_reset"}else p=k;if(typeof o=="string"){var q=document.createElement("div");p.appendChild(q).innerHTML=o;return q}else return p.appendChild(o)},appendHidden:function n(o){if(!l){var l=document.createElement("div"),p=l.style;p.position="absolute";p.top="-10000px";p.width=p.height=0;l=m.append(l)}return m.append(o,l)},submitToTarget:function n(o,p){__p&&__p();var q=document.createElement("form");q.action=o.url;q.target=o.target;q.method=p?"GET":"POST";m.appendHidden(q);for(var r in o.params)if(Object.prototype.hasOwnProperty.call(o.params,r)){var s=o.params[r];if(s!==null&&s!==undefined){var t=document.createElement("input");t.name=r;t.value=s;q.appendChild(t)}}q.submit();q.parentNode.removeChild(q)}};f.exports=m}),null);
__d("sdk.Impressions",["sdk.Content","Miny","QueryString","sdk.Runtime","UrlMap","getBlankIframeSrc","guid","insertIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){__p&&__p();function p(r){__p&&__p();var s=k.getClientID();if(!r.api_key&&s)r.api_key=s;r.kid_directed_site=k.getKidDirectedSite();var t=l.resolve("www",true)+"/impression.php/"+n()+"/",u=j.appendToUrl(t,r);if(u.length>2e3)if(r.payload&&typeof r.payload==="string"){var v=i.encode(r.payload);if(v&&v.length<r.payload.length){r.payload=v;u=j.appendToUrl(t,r)}}if(u.length<=2e3){var w=new Image();w.src=u}else{var x=n(),y=h.appendHidden("");o({url:m(),root:y,name:x,className:"fb_hidden fb_invisible",onload:function z(){y.parentNode.removeChild(y)}});h.submitToTarget({url:t,target:x,params:r})}}var q={log:function r(s,t){if(!t.source)t.source="jssdk";p({lid:s,payload:ES("JSON","stringify",false,t)})},impression:p};f.exports=q}),null);
__d("sdk.Scribe",["QueryString","sdk.Runtime","UrlMap"],(function a(b,c,d,e,f,g,h,i,j){function k(m,n){if(typeof n.extra=="object")n.extra.revision=i.getRevision();new Image().src=h.appendToUrl(j.resolve("www",true)+"/common/scribe_endpoint.php",{c:m,m:ES("JSON","stringify",false,n)})}var l={log:k};f.exports=l}),null);
__d("Base64",[],(function a(b,c,d,e,f,g){__p&&__p();var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function i(m){m=m.charCodeAt(0)<<16|m.charCodeAt(1)<<8|m.charCodeAt(2);return String.fromCharCode(h.charCodeAt(m>>>18),h.charCodeAt(m>>>12&63),h.charCodeAt(m>>>6&63),h.charCodeAt(m&63))}var j=">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";function k(m){m=j.charCodeAt(m.charCodeAt(0)-43)<<18|j.charCodeAt(m.charCodeAt(1)-43)<<12|j.charCodeAt(m.charCodeAt(2)-43)<<6|j.charCodeAt(m.charCodeAt(3)-43);return String.fromCharCode(m>>>16,m>>>8&255,m&255)}var l={encode:function m(n){n=unescape(encodeURI(n));var o=(n.length+2)%3;n=(n+"\0\0".slice(o)).replace(/[\s\S]{3}/g,i);return n.slice(0,n.length+o-2)+"==".slice(o)},decode:function m(n){n=n.replace(/[^A-Za-z0-9+\/]/g,"");var o=n.length+3&3;n=(n+"AAA".slice(o)).replace(/..../g,k);n=n.slice(0,n.length+o-3);try{return decodeURIComponent(escape(n))}catch(p){throw new Error("Not valid UTF-8")}},encodeObject:function m(n){return l.encode(ES("JSON","stringify",false,n))},decodeObject:function m(n){return ES("JSON","parse",false,l.decode(n))},encodeNums:function m(n){return String.fromCharCode.apply(String,ES(n,"map",true,function(o){return h.charCodeAt((o|-(o>63))&-(o>0)&63)}))}};f.exports=l}),null);
__d("sdk.SignedRequest",["Base64"],(function a(b,c,d,e,f,g,h){function i(k){if(!k)return null;var l=k.split(".",2)[1].replace(/\-/g,"+").replace(/\_/g,"/");return h.decodeObject(l)}var j={parse:i};f.exports=j}),null);
__d("URIRFC3986",[],(function a(b,c,d,e,f,g){__p&&__p();var h=new RegExp("^([^:/?#]+:)?(//([^\\\\/?#@]*@)?(\\[[A-Fa-f0-9:.]+\\]|[^\\/?#:]*)(:[0-9]*)?)?([^?#]*)(\\?[^#]*)?(#.*)?"),i={parse:function j(k){__p&&__p();if(ES(k,"trim",true)==="")return null;var l=k.match(h);if(l==null)return null;var m={};m.uri=l[0]?l[0]:null;m.scheme=l[1]?l[1].substr(0,l[1].length-1):null;m.authority=l[2]?l[2].substr(2):null;m.userinfo=l[3]?l[3].substr(0,l[3].length-1):null;m.host=l[2]?l[4]:null;m.port=l[5]?l[5].substr(1)?parseInt(l[5].substr(1),10):null:null;m.path=l[6]?l[6]:null;m.query=l[7]?l[7].substr(1):null;m.fragment=l[8]?l[8].substr(1):null;m.isGenericURI=m.authority===null&&!!m.scheme;return m}};f.exports=i}),18);
__d("createObjectFrom",[],(function a(b,c,d,e,f,g){function h(i,j){var k={},l=ES("Array","isArray",false,j);if(j===undefined)j=true;for(var m=i.length-1;m>=0;m--)k[i[m]]=l?j[m]:j;return k}f.exports=h}),18);
__d("URISchemes",["createObjectFrom"],(function a(b,c,d,e,f,g,h){var i=h(["blob","cmms","fb","fba","fbatwork","fb-ama","fb-workchat","fb-messenger","fb-messenger-public","fb-messenger-group-thread","fb-page-messages","fb-pma","fbcf","fbconnect","fbinternal","fbmobilehome","fbrpc","file","ftp","http","https","mailto","ms-app","intent","itms","itms-apps","itms-services","market","svn+ssh","fbstaging","tel","sms","pebblejs","sftp","whatsapp","moments","flash","fblite","chrome-extension","webcal","fb124024574287414","fb124024574287414rc","fb124024574287414master","fb1576585912599779","fb929757330408142","designpack","fbapi20130214","fb1196383223757595","tbauth","oculus","oculus.store","skype","callto"]),j={isAllowed:function k(l){if(!l)return true;return Object.prototype.hasOwnProperty.call(i,l.toLowerCase())}};f.exports=j}),18);
__d("eprintf",[],(function a(b,c,d,e,f,g){__p&&__p();function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=ES(k,"map",true,function(p){return String(p)}),n=i.split("%s").length-1;if(n!==m.length)return h("eprintf args number mismatch: %s",ES("JSON","stringify",false,[i].concat(m)));var o=0;return i.replace(/%s/g,function(){return String(m[o++])})}f.exports=h}),null);
__d("ex",["eprintf"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];var n=ES(l,"map",true,function(p){return String(p)}),o=j.split("%s").length-1;if(o!==n.length)return i("ex args number mismatch: %s",ES("JSON","stringify",false,[j].concat(n)));return i._prefix+ES("JSON","stringify",false,[j].concat(n))+i._suffix}i._prefix="<![EX[";i._suffix="]]>";f.exports=i}),null);
__d("invariant",["ex","sprintf"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j=h;function k(l,m){__p&&__p();if(!l){var n=void 0;if(m===undefined)n=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{for(var o=arguments.length,p=Array(o>2?o-2:0),q=2;q<o;q++)p[q-2]=arguments[q];n=new Error(j.apply(undefined,[m].concat(p)));n.name="Invariant Violation";n.messageWithParams=[m].concat(p)}n.framesToPop=1;throw n}}f.exports=k}),null);
__d("setHostSubdomain",[],(function a(b,c,d,e,f,g){function h(i,j){var k=i.split(".");if(k.length<3)k.unshift(j);else k[0]=j;return k.join(".")}f.exports=h}),null);
__d("URIBase",["URIRFC3986","URISchemes","ex","invariant","setHostSubdomain"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m=new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"),n=new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)");function o(r,s,t,u){__p&&__p();if(!s)return true;if(s instanceof q){r.setProtocol(s.getProtocol());r.setDomain(s.getDomain());r.setPort(s.getPort());r.setPath(s.getPath());r.setQueryData(u.deserialize(u.serialize(s.getQueryData())));r.setFragment(s.getFragment());r.setIsGeneric(s.getIsGeneric());r.setForceFragmentSeparator(s.getForceFragmentSeparator());return true}s=ES(s.toString(),"trim",true);var v=h.parse(s)||{fragment:null,scheme:null};if(!t&&!i.isAllowed(v.scheme))return false;r.setProtocol(v.scheme||"");if(!t&&m.test(v.host||""))return false;r.setDomain(v.host||"");r.setPort(v.port||"");r.setPath(v.path||"");if(t)r.setQueryData(u.deserialize(v.query||"")||{});else try{r.setQueryData(u.deserialize(v.query||"")||{})}catch(w){return false}r.setFragment(v.fragment||"");if(v.fragment==="")r.setForceFragmentSeparator(true);r.setIsGeneric(v.isGenericURI||false);if(v.userinfo!==null)if(t)throw new Error(j("URI.parse: invalid URI (userinfo is not allowed in a URI): %s",r.toString()));else return false;if(!r.getDomain()&&ES(r.getPath(),"indexOf",true,"\\")!==-1)if(t)throw new Error(j("URI.parse: invalid URI (no domain but multiple back-slashes): %s",r.toString()));else return false;if(!r.getProtocol()&&n.test(s))if(t)throw new Error(j("URI.parse: invalid URI (unsafe protocol-relative URLs): %s",r.toString()));else return false;if(r.getDomain()&&r.getPath()&&!ES(r.getPath(),"startsWith",true,"/"))if(t)throw new Error(j("URI.parse: invalid URI (domain and path where path lacks leading slash): %s",r.toString()));else return false;return true}var p=[];q.isValidURI=function(r,s){"use strict";return o(new q(null,s),r,false,s)};function q(r,s){"use strict";__p&&__p();s||k(0);this.$URIBase9=s;this.$URIBase7="";this.$URIBase1="";this.$URIBase6="";this.$URIBase5="";this.$URIBase3="";this.$URIBase4=false;this.$URIBase8={};this.$URIBase2=false;o(this,r,true,s)}q.prototype.setProtocol=function(r){"use strict";i.isAllowed(r)||k(0);this.$URIBase7=r;return this};q.prototype.getProtocol=function(){"use strict";return(this.$URIBase7||"").toLowerCase()};q.prototype.setSecure=function(r){"use strict";return this.setProtocol(r?"https":"http")};q.prototype.isSecure=function(){"use strict";return this.getProtocol()==="https"};q.prototype.setDomain=function(r){"use strict";if(m.test(r))throw new Error(j("URI.setDomain: unsafe domain specified: %s for url %s",r,this.toString()));this.$URIBase1=r;return this};q.prototype.getDomain=function(){"use strict";return this.$URIBase1};q.prototype.setPort=function(r){"use strict";this.$URIBase6=r;return this};q.prototype.getPort=function(){"use strict";return this.$URIBase6};q.prototype.setPath=function(r){"use strict";this.$URIBase5=r;return this};q.prototype.getPath=function(){"use strict";return this.$URIBase5};q.prototype.addQueryData=function(r,s){"use strict";if(Object.prototype.toString.call(r)==="[object Object]")ES("Object","assign",false,this.$URIBase8,r);else this.$URIBase8[r]=s;return this};q.prototype.setQueryData=function(r){"use strict";this.$URIBase8=r;return this};q.prototype.getQueryData=function(){"use strict";return this.$URIBase8};q.prototype.removeQueryData=function(r){"use strict";if(!ES("Array","isArray",false,r))r=[r];for(var s=0,t=r.length;s<t;++s)delete this.$URIBase8[r[s]];return this};q.prototype.setFragment=function(r){"use strict";this.$URIBase3=r;this.setForceFragmentSeparator(false);return this};q.prototype.getFragment=function(){"use strict";return this.$URIBase3};q.prototype.setForceFragmentSeparator=function(r){"use strict";this.$URIBase2=r;return this};q.prototype.getForceFragmentSeparator=function(){"use strict";return this.$URIBase2};q.prototype.setIsGeneric=function(r){"use strict";this.$URIBase4=r;return this};q.prototype.getIsGeneric=function(){"use strict";return this.$URIBase4};q.prototype.isEmpty=function(){"use strict";return!(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||ES("Object","keys",false,this.getQueryData()).length>0||this.getFragment())};q.prototype.toString=function(){"use strict";var r=this;for(var s=0;s<p.length;s++)r=p[s](r);return r.$URIBase10()};q.prototype.$URIBase10=function(){"use strict";__p&&__p();var r="",s=this.getProtocol();if(s)r+=s+":"+(this.getIsGeneric()?"":"//");var t=this.getDomain();if(t)r+=t;var u=this.getPort();if(u)r+=":"+u;var v=this.getPath();if(v)r+=v;else if(r)r+="/";var w=this.$URIBase9.serialize(this.getQueryData());if(w)r+="?"+w;var x=this.getFragment();if(x)r+="#"+x;else if(this.getForceFragmentSeparator())r+="#";return r};q.registerFilter=function(r){"use strict";p.push(r)};q.prototype.getOrigin=function(){"use strict";var r=this.getPort();return this.getProtocol()+"://"+this.getDomain()+(r?":"+r:"")};q.prototype.getQualifiedURIBase=function(){"use strict";return new q(this,this.$URIBase9).qualify()};q.prototype.qualify=function(){"use strict";if(!this.getDomain()){var r=new q(window.location.href,this.$URIBase9);this.setProtocol(r.getProtocol()).setDomain(r.getDomain()).setPort(r.getPort())}return this};q.prototype.setSubdomain=function(r){"use strict";var s=this.qualify().getDomain();return this.setDomain(l(s,r))};q.prototype.getSubdomain=function(){"use strict";if(!this.getDomain())return"";var r=this.getDomain().split(".");if(r.length<=2)return"";else return r[0]};f.exports=q}),null);
__d("sdk.URI",["Assert","QueryString","URIBase"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k,l,m=/\.facebook\.com$/,n={serialize:function p(q){return q?i.encode(q):""},deserialize:function p(q){return q?i.decode(q):{}}};k=babelHelpers.inherits(o,j);l=k&&k.prototype;function o(p){"use strict";h.isString(p,"The passed argument was of invalid type.");l.constructor.call(this,p,n)}o.prototype.isFacebookURI=function(){"use strict";return m.test(this.getDomain())};o.prototype.valueOf=function(){"use strict";return this.toString()};o.isValidURI=function(p){"use strict";return j.isValidURI(p,n)};f.exports=o}),null);
__d("Queue",[],(function a(b,c,d,e,f,g){__p&&__p();var h={};function i(j){"use strict";this._opts=babelHelpers["extends"]({interval:0,processor:null},j);this._queue=[];this._stopped=true}i.prototype._dispatch=function(j){"use strict";__p&&__p();if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error("No processor available")}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(ES(this._dispatch,"bind",true,this),this._opts.interval)}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift())};i.prototype.enqueue=function(j){"use strict";if(this._opts.processor&&!this._stopped)this._opts.processor.call(this,j);else this._queue.push(j);return this};i.prototype.start=function(j){"use strict";if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this};i.prototype.isStarted=function(){"use strict";return!this._stopped};i.prototype.dispatch=function(){"use strict";this._dispatch(true)};i.prototype.stop=function(j){"use strict";this._stopped=true;if(j)clearTimeout(this._timeout);return this};i.prototype.merge=function(j,k){"use strict";this._queue[k?"unshift":"push"].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this};i.prototype.getLength=function(){"use strict";return this._queue.length};i.get=function(j,k){"use strict";var l;if(j in h)l=h[j];else l=h[j]=new i(k);return l};i.exists=function(j){"use strict";return j in h};i.remove=function(j){"use strict";return delete h[j]};f.exports=i}),null);
__d("emptyFunction",[],(function a(b,c,d,e,f,g){__p&&__p();function h(j){return function(){return j}}var i=function i(){};i.thatReturns=h;i.thatReturnsFalse=h(false);i.thatReturnsTrue=h(true);i.thatReturnsNull=h(null);i.thatReturnsThis=function(){return this};i.thatReturnsArgument=function(j){return j};f.exports=i}),null);
__d("DOMEventListener",["emptyFunction","invariant","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k=false;try{var l=Object.defineProperty({},"passive",{get:function q(){k=true}});window.addEventListener("test",null,l)}catch(m){}var n=void 0,o=void 0;if(window.addEventListener){n=function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];t.wrapper=j(t,"entry","DOMEventListener.add "+s);r.addEventListener(s,t.wrapper,k?u:false)};o=function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];r.removeEventListener(s,t.wrapper,k?u:false)}}else if(window.attachEvent){n=function q(r,s,t){t.wrapper=j(t,"entry","DOMEventListener.add "+s);r.attachEvent||i(0);r.attachEvent("on"+s,t.wrapper)};o=function q(r,s,t){r.detachEvent||i(0);r.detachEvent("on"+s,t.wrapper)}}else o=n=h;var p={add:function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];n(r,s,t,u);return{remove:function v(){o(r,s,t,u)}}},remove:o};f.exports=p}),18);
__d("UserAgent_DEPRECATED",[],(function a(b,c,d,e,f,g){__p&&__p();var h=false,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){__p&&__p();if(h)return;h=true;var z=navigator.userAgent,A=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(z),B=/(Mac OS X)|(Windows)|(Linux)/.exec(z);t=/\b(iPhone|iP[ao]d)/.exec(z);u=/\b(iP[ao]d)/.exec(z);r=/Android/i.exec(z);v=/FBAN\/\w+;/i.exec(z);w=/Mobile/i.exec(z);s=!!/Win64/.exec(z);if(A){i=A[1]?parseFloat(A[1]):A[5]?parseFloat(A[5]):NaN;if(i&&document&&document.documentMode)i=document.documentMode;var C=/(?:Trident\/(\d+.\d+))/.exec(z);n=C?parseFloat(C[1])+4:i;j=A[2]?parseFloat(A[2]):NaN;k=A[3]?parseFloat(A[3]):NaN;l=A[4]?parseFloat(A[4]):NaN;if(l){A=/(?:Chrome\/(\d+\.\d+))/.exec(z);m=A&&A[1]?parseFloat(A[1]):NaN}else m=NaN}else i=j=k=m=l=NaN;if(B){if(B[1]){var D=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(z);o=D?parseFloat(D[1].replace("_",".")):true}else o=false;p=!!B[2];q=!!B[3]}else o=p=q=false}var y={ie:function z(){return x()||i},ieCompatibilityMode:function z(){return x()||n>i},ie64:function z(){return y.ie()&&s},firefox:function z(){return x()||j},opera:function z(){return x()||k},webkit:function z(){return x()||l},safari:function z(){return y.webkit()},chrome:function z(){return x()||m},windows:function z(){return x()||p},osx:function z(){return x()||o},linux:function z(){return x()||q},iphone:function z(){return x()||t},mobile:function z(){return x()||t||u||r||w},nativeApp:function z(){return x()||v},android:function z(){return x()||r},ipad:function z(){return x()||u}};f.exports=y}),18);
__d("htmlSpecialChars",[],(function a(b,c,d,e,f,g){__p&&__p();var h=/&/g,i=/</g,j=/>/g,k=/\"/g,l=/\'/g;function m(n){if(typeof n=="undefined"||n===null||!n.toString)return"";if(n===false)return"0";else if(n===true)return"1";return n.toString().replace(h,"&amp;").replace(k,"&quot;").replace(l,"&#039;").replace(i,"&lt;").replace(j,"&gt;")}f.exports=m}),null);
__d("Flash",["DOMEventListener","DOMWrapper","QueryString","UserAgent_DEPRECATED","guid","htmlSpecialChars"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n={},o,p=i.getWindow().document;function q(v){var w=p.getElementById(v);if(w)w.parentNode.removeChild(w);delete n[v]}function r(){for(var v in n)if(Object.prototype.hasOwnProperty.call(n,v))q(v)}function s(v){return v.replace(/\d+/g,function(w){return"000".substring(w.length)+w})}function t(v){if(!o){if(k.ie()>=9)h.add(window,"unload",r);o=true}n[v]=v}var u={embed:function v(w,x,y,z){__p&&__p();var A=l();w=m(w).replace(/&amp;/g,"&");y=babelHelpers["extends"]({allowscriptaccess:"always",flashvars:z,movie:w},y);if(typeof y.flashvars=="object")y.flashvars=j.encode(y.flashvars);var B=[];for(var C in y)if(Object.prototype.hasOwnProperty.call(y,C)&&y[C])B.push('<param name="'+m(C)+'" value="'+m(y[C])+'">');var D=x.appendChild(p.createElement("span")),E="<object "+(k.ie()?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':'type="application/x-shockwave-flash"')+'data="'+w+'" '+(y.height?'height="'+y.height+'" ':"")+(y.width?'width="'+y.width+'" ':"")+'id="'+A+'">'+B.join("")+"</object>";D.innerHTML=E;var F=D.firstChild;t(A);return F},remove:q,getVersion:function v(){__p&&__p();var w="Shockwave Flash",x="application/x-shockwave-flash",y="ShockwaveFlash.ShockwaveFlash",z;if(navigator.plugins&&typeof navigator.plugins[w]=="object"){var A=navigator.plugins[w].description;if(A&&navigator.mimeTypes&&navigator.mimeTypes[x]&&navigator.mimeTypes[x].enabledPlugin)z=A.match(/\d+/g)}if(!z)try{z=new ActiveXObject(y).GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/);z=Array.prototype.slice.call(z,1)}catch(B){}return z},getVersionString:function v(){var w=u.getVersion();return w?w.join("."):""},checkMinVersion:function v(w){var x=u.getVersion();if(!x)return false;return s(x.join("."))>=s(w)},isAvailable:function v(){return!!u.getVersion()}};f.exports=u}),null);
__d("XDM",["DOMEventListener","DOMWrapper","emptyFunction","Flash","GlobalCallback","guid","Log","UserAgent_DEPRECATED","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){__p&&__p();var q={},r={transports:[]},s=i.getWindow();function t(w){var x={},y=w.length,z=r.transports;while(y--)x[w[y]]=1;y=z.length;while(y--){var A=z[y],B=q[A];if(!x[A]&&B.isAvailable())return A}}var u={register:function w(x,y){n.debug("Registering %s as XDM provider",x);r.transports.push(x);q[x]=y},create:function w(x){__p&&__p();if(!x.whenReady&&!x.onMessage){n.error("An instance without whenReady or onMessage makes no sense");throw new Error("An instance without whenReady or onMessage makes no sense")}if(!x.channel){n.warn("Missing channel name, selecting at random");x.channel=m()}if(!x.whenReady)x.whenReady=j;if(!x.onMessage)x.onMessage=j;var y=x.transport||t(x.blacklist||[]),z=q[y];if(z&&z.isAvailable()){n.debug("%s is available",y);z.init(x);return y}}};u.register("flash",function(){__p&&__p();var w=false,x,y=false,z=15e3,A;return{isAvailable:function B(){return k.checkMinVersion("8.0.24")},init:function B(C){__p&&__p();n.debug("init flash: "+C.channel);var D={send:function G(H,I,J,K){n.debug("sending to: %s (%s)",I,K);x.postMessage(H,I,K)}};if(w){C.whenReady(D);return}var E=C.root.appendChild(s.document.createElement("div")),F=l.create(function(){__p&&__p();l.remove(F);clearTimeout(A);n.info("xdm.swf called the callback");var G=l.create(function(H,I){H=decodeURIComponent(H);I=decodeURIComponent(I);n.debug("received message %s from %s",H,I);C.onMessage(H,I)},"xdm.swf:onMessage");x.init(C.channel,G);C.whenReady(D)},"xdm.swf:load");x=k.embed(C.flashUrl,E,null,{protocol:location.protocol.replace(":",""),host:location.host,callback:F,log:y});A=setTimeout(function(){n.warn("The Flash component did not load within %s ms - verify that the container is not set to hidden or invisible using CSS as this will cause some browsers to not load the components",z)},z);w=true}}}());var v=/\.facebook\.com(\/|$)/;u.register("postmessage",function(){__p&&__p();var w=false;return{isAvailable:function x(){return!!s.postMessage},init:function x(y){__p&&__p();n.debug("init postMessage: "+y.channel);var z="_FB_"+y.channel,A={send:function B(C,D,E,F){__p&&__p();if(s===E){n.error("Invalid windowref, equal to window (self)");throw new Error()}n.debug("sending to: %s (%s)",D,F);var B=function B(){E.postMessage("_FB_"+F+C,D)};if(o.ie()==8||o.ieCompatibilityMode())setTimeout(B,0);else B()}};if(w){y.whenReady(A);return}h.add(s,"message",p(function(event){__p&&__p();var B=event.data,C=event.origin||"native";if(!/^(https?:\/\/|native$)/.test(C)){n.debug("Received message from invalid origin type: %s",C);return}if(C!=="native"&&!(v.test(location.hostname)||v.test(event.origin)))return;if(typeof B!="string"){n.warn("Received message of type %s from %s, expected a string",typeof B,C);return}n.debug("received message %s from %s",B,C);if(B.substring(0,z.length)==z)B=B.substring(z.length);y.onMessage(B,C)},"entry","onMessage"));y.whenReady(A);w=true}}}());f.exports=u}),null);
__d("isFacebookURI",[],(function a(b,c,d,e,f,g){__p&&__p();var h=null,i=["http","https"];function j(k){if(!h)h=new RegExp("(^|\\.)facebook\\.com$","i");if(k.isEmpty()&&k.toString()!=="#")return false;if(!k.getDomain()&&!k.getProtocol())return true;return ES(i,"indexOf",true,k.getProtocol())!==-1&&h.test(k.getDomain())}j.setRegex=function(k){h=k};f.exports=j}),null);
__d("sdk.Event",[],(function a(b,c,d,e,f,g){__p&&__p();var h={SUBSCRIBE:"event.subscribe",UNSUBSCRIBE:"event.unsubscribe",subscribers:function i(){if(!this._subscribersMap)this._subscribersMap={};return this._subscribersMap},subscribe:function i(j,k){var l=this.subscribers();if(!l[j])l[j]=[k];else if(ES(l[j],"indexOf",true,k)==-1)l[j].push(k);if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.SUBSCRIBE,j,l[j])},unsubscribe:function i(j,k){var l=this.subscribers()[j];if(l)ES(l,"forEach",true,function(m,n){if(m==k)l.splice(n,1)});if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.UNSUBSCRIBE,j,l)},monitor:function i(j,k){if(!k()){var l=this,m=function m(){if(k.apply(k,arguments))l.unsubscribe(j,m)};this.subscribe(j,m)}},clear:function i(j){delete this.subscribers()[j]},fire:function i(j){var k=Array.prototype.slice.call(arguments,1),l=this.subscribers()[j];if(l)ES(l,"forEach",true,function(m){if(m)m.apply(this,k)})}};f.exports=h}),null);
__d("JSONRPC",["Log"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){"use strict";this.$JSONRPC1=0;this.$JSONRPC2={};this.remote=ES(function(k){this.$JSONRPC3=k;return this.remote},"bind",true,this);this.local={};this.$JSONRPC4=j}i.prototype.stub=function(j){"use strict";__p&&__p();this.remote[j]=ES(function(){var k={jsonrpc:"2.0",method:j};for(var l=arguments.length,m=Array(l),n=0;n<l;n++)m[n]=arguments[n];if(typeof m[m.length-1]=="function"){k.id=++this.$JSONRPC1;this.$JSONRPC2[k.id]=m.pop()}k.params=m;this.$JSONRPC4(ES("JSON","stringify",false,k),this.$JSONRPC3||{method:j})},"bind",true,this)};i.prototype.read=function(j,k){"use strict";__p&&__p();var l=ES("JSON","parse",false,j),m=l.id;if(!l.method){if(!this.$JSONRPC2[m]){h.warn("Could not find callback %s",m);return}var n=this.$JSONRPC2[m];delete this.$JSONRPC2[m];delete l.id;delete l.jsonrpc;n(l);return}var o=this,p=this.local[l.method],q;if(m)q=function q(t,u){var v={jsonrpc:"2.0",id:m};v[t]=u;setTimeout(function(){o.$JSONRPC4(ES("JSON","stringify",false,v),k)},0)};else q=function q(){};if(!p){h.error('Method "%s" has not been defined',l.method);q("error",{code:-32601,message:"Method not found",data:l.method});return}l.params.push(ES(q,"bind",true,null,"result"));l.params.push(ES(q,"bind",true,null,"error"));try{var r=p.apply(k||null,l.params);if(typeof r!=="undefined")q("result",r)}catch(s){h.error("Invokation of RPC method %s resulted in the error: %s",l.method,s.message);q("error",{code:-32603,message:"Internal error",data:s.message})}};f.exports=i}),null);
__d("sdk.RPC",["Assert","JSONRPC","Queue"],(function a(b,c,d,e,f,g,h,i,j){var k=new j(),l=new i(function(n){k.enqueue(n)}),m={local:l.local,remote:l.remote,stub:ES(l.stub,"bind",true,l),setInQueue:function n(o){h.isInstanceOf(j,o);o.start(function(p){l.read(p)})},getOutQueue:function n(){return k}};f.exports=m}),null);
__d("hasNamePropertyBug",["guid","UserAgent_DEPRECATED"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=i.ie()?undefined:false;function k(){var m=document.createElement("form"),n=m.appendChild(document.createElement("input"));n.name=h();j=n!==m.elements[n.name];m=n=null;return j}function l(){return typeof j==="undefined"?k():j}f.exports=l}),null);
__d("isNumberLike",[],(function a(b,c,d,e,f,g){function h(i){return!isNaN(parseFloat(i))&&isFinite(i)}f.exports=h}),null);
__d("sdk.createIframe",["DOMEventListener","getBlankIframeSrc","guid","hasNamePropertyBug","isNumberLike"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();function m(n){__p&&__p();n=ES("Object","assign",false,{},n);var o,p=n.name||j(),q=n.root,r=n.style||{border:"none"},s=n.url,t=n.onload,u=n.onerror;if(k())o=document.createElement('<iframe name="'+p+'"/>');else{o=document.createElement("iframe");o.name=p}delete n.style;delete n.name;delete n.url;delete n.root;delete n.onload;delete n.onerror;var v=ES("Object","assign",false,{frameBorder:0,allowTransparency:true,allowFullscreen:true,scrolling:"no"},n);if(v.width&&l(v.width))o.width=v.width+"px";if(v.height&&l(v.height))o.height=v.height+"px";delete v.height;delete v.width;for(var w in v)if(Object.prototype.hasOwnProperty.call(v,w))o.setAttribute(w,v[w]);ES("Object","assign",false,o.style,r);o.src=i();q.appendChild(o);if(t)var x=h.add(o,"load",function(){x.remove();t()});if(u)var y=h.add(o,"error",function(){y.remove();u()});o.src=s;return o}f.exports=m}),null);
__d("sdk.FeatureFunctor",["invariant"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(k,l,m){if(k.features&&l in k.features){var n=k.features[l];if(typeof n==="object"&&typeof n.rate==="number")if(n.rate&&Math.random()*100<=n.rate)return n.value||true;else return n.value?null:false;else return n}return m}function j(k){return function(l,m){arguments.length>=2||h(0);return i(k,l,m)}}f.exports={create:j}}),null);
__d("sdk.feature",["sdk.FeatureFunctor","JSSDKConfig"],(function a(b,c,d,e,f,g,h,i){f.exports=h.create(i)}),null);
__d("sdk.XD",["sdk.Content","sdk.Event","Log","QueryString","Queue","sdk.RPC","sdk.Runtime","sdk.Scribe","sdk.URI","UrlMap","JSSDKXDConfig","XDM","isFacebookURI","sdk.createIframe","sdk.feature","guid"],(function a(b,c,d,e,f,aa,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){__p&&__p();var w=new k(),x=new k(),y=new k(),z,A,B=v(),C=q.useCdn?"cdn":"www",D=u("use_bundle",false)?q.XdBundleUrl:q.XdUrl,E=p.resolve(C,false)+D,F=p.resolve(C,true)+D,G=function G(){if("origin"in location)if(location.origin&&location.origin!=="null")return location.origin;else if(window!==window.parent)try{var U=parent.location.origin;if(U&&U!=="null")return U}catch(V){}return location.protocol+"//"+location.host},H=v(),I=G(),J,K=false,L="Facebook Cross Domain Communication Frame",M={},N=new k();l.setInQueue(N);function O(U){i.info("Remote XD can talk to facebook.com (%s)",U);m.setEnvironment(U==="canvas"?m.ENVIRONMENTS.CANVAS:m.ENVIRONMENTS.PAGETAB)}function P(U,V){__p&&__p();if(!V){i.error("No senderOrigin");throw new Error()}var W=/^https?/.exec(V)[0];switch(U.xd_action){case"proxy_ready":var X,Y;if(W=="https"){X=y;Y=A;m.setLoggedIntoFacebook(U.logged_in==="true")}else{X=x;Y=z}if(U.registered){O(U.registered);w=X.merge(w)}i.info("Proxy ready, starting queue %s containing %s messages",W+"ProxyQueue",X.getLength());X.start(function(U){J.send(typeof U==="string"?U:j.encode(U),V,Y.contentWindow,H+"_"+W)});break;case"plugin_ready":i.info("Plugin %s ready, protocol: %s",U.name,W);M[U.name]={protocol:W};if(k.exists(U.name)){var Z=k.get(U.name);i.debug("Enqueuing %s messages for %s in %s",Z.getLength(),U.name,W+"ProxyQueue");(W=="https"?y:x).merge(Z)}break}if(U.data)Q(U.data,V)}function Q(U,V){__p&&__p();if(V&&V!=="native"&&!s(new o(V)))return;if(typeof U=="string"){if(/^FB_RPC:/.test(U)){N.enqueue(U.substring(7));return}if(U.substring(0,1)=="{")try{U=ES("JSON","parse",false,U)}catch(W){i.warn("Failed to decode %s as JSON",U);return}else U=j.decode(U)}if(!V)if(U.xd_sig==B)V=U.xd_origin;if(U.xd_action){P(U,V);return}if(U.access_token)m.setSecure(/^https/.test(I));if(U.cb){var X=T._callbacks[U.cb];if(!T._forever[U.cb])delete T._callbacks[U.cb];if(X)X(U)}}function R(U,V){__p&&__p();if(U=="facebook"){V.relation="parent.parent";w.enqueue(V)}else{V.relation='parent.frames["'+U+'"]';var W=M[U];if(W){i.debug("Enqueuing message for plugin %s in %s",U,W.protocol+"ProxyQueue");(W.protocol=="https"?y:x).enqueue(V)}else{i.debug("Buffering message for plugin %s",U);k.get(U).enqueue(V)}}}l.getOutQueue().start(function(U){R("facebook","FB_RPC:"+U)});function S(U){__p&&__p();if(K)return;var V=g.appendHidden(document.createElement("div")),W=r.create({blacklist:null,root:V,channel:H,flashUrl:q.Flash.path,whenReady:function X(Y){J=Y;var Z={channel:H,origin:I,transport:W,xd_name:U},$="#"+j.encode(Z);if(m.getSecure()!==true)z=t({url:E+$,name:"fb_xdm_frame_http",id:"fb_xdm_frame_http",root:V,"aria-hidden":true,title:L,tabindex:-1});A=t({url:F+$,name:"fb_xdm_frame_https",id:"fb_xdm_frame_https",root:V,"aria-hidden":true,title:L,tabindex:-1})},onMessage:Q});if(!W)n.log("jssdk_error",{appId:m.getClientID(),error:"XD_TRANSPORT",extra:{message:"Failed to create a valid transport"}});K=true}var T={rpc:l,_callbacks:{},_forever:{},_channel:H,_origin:I,onMessage:Q,recv:Q,init:S,sendToFacebook:R,inform:function U(V,W,X,Y){R("facebook",{method:V,params:ES("JSON","stringify",false,W||{}),behavior:Y||"p",relation:X})},handler:function U(V,W,X,Y){var Z="#"+j.encode({cb:this.registerCallback(V,X,Y),origin:I+"/"+H,domain:location.hostname,relation:W||"opener"});return(location.protocol=="https:"?F:E)+Z},registerCallback:function U(V,W,X){X=X||v();if(W)T._forever[X]=true;T._callbacks[X]=V;return X},getXDArbiterURL:function U(V){return V?F:E}};h.subscribe("init:post",function(U){S(U.xdProxyName);var V=u("xd_timeout",false);if(V)setTimeout(function(){var W=A&&!!z==x.isStarted()&&!!A==y.isStarted();if(!W)n.log("jssdk_error",{appId:m.getClientID(),error:"XD_INITIALIZATION",extra:{message:"Failed to initialize in "+V+"ms"}})},V)});f.exports=T}),null);
__d("sdk.getContextType",["sdk.Runtime","sdk.UA"],(function a(b,c,d,e,f,g,h,i){function j(){if(i.nativeApp())return 3;if(i.mobile())return 2;if(h.isEnvironment(h.ENVIRONMENTS.CANVAS))return 5;return 1}f.exports=j}),null);
__d("sdk.Auth",["sdk.Cookie","sdk.createIframe","DOMWrapper","sdk.feature","sdk.getContextType","guid","sdk.Impressions","Log","ObservableMixin","sdk.Runtime","sdk.Scribe","sdk.SignedRequest","UrlMap","sdk.URI","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){__p&&__p();var w="fblo_",x=365*24*60*60*1e3,y,z,A=new p();function B(J,K){__p&&__p();var L=q.getUserID(),M="";if(J)if(J.userID)M=J.userID;else if(J.signedRequest){var N=s.parse(J.signedRequest);if(N&&N.user_id)M=N.user_id}var O=q.getLoginStatus(),P=O==="unknown"&&J||q.getUseCookie()&&q.getCookieUserID()!==M,Q=L&&!J,R=J&&L&&L!=M,S=J!=y,T=K!=(O||"unknown");q.setLoginStatus(K);q.setAccessToken(J&&J.accessToken||null);q.setUserID(M);y=J;var U={authResponse:J,status:K};if(Q||R)A.inform("logout",U);if(P||R)A.inform("login",U);if(S)A.inform("authresponse.change",U);if(T)A.inform("status.change",U);return U}function C(){return y}function D(J,K,L){__p&&__p();return function(M){__p&&__p();var N;if(M&&M.access_token){var O=s.parse(M.signed_request);K={accessToken:M.access_token,userID:O.user_id,expiresIn:parseInt(M.expires_in,10),signedRequest:M.signed_request};if(M.granted_scopes)K.grantedScopes=M.granted_scopes;if(q.getUseCookie()){var P=K.expiresIn===0?0:ES("Date","now",false)+K.expiresIn*1e3,Q=h.getDomain();if(!Q&&M.base_domain)h.setDomain("."+M.base_domain);h.setSignedRequestCookie(M.signed_request,P);E()}N="connected";B(K,N)}else if(L==="logout"||L==="login_status"){if(M.error&&M.error==="not_authorized")N="not_authorized";else N="unknown";B(null,N);if(q.getUseCookie())h.clearSignedRequestCookie();if(L==="logout"){F();r.log("jssdk_error",{appId:q.getClientID(),error:"PLATFORM_AUTH_LOGOUT",extra:{args:{fblo:true}}})}}if(M&&M.https==1)q.setSecure(true);if(J)J({authResponse:K,status:q.getLoginStatus()});return K}}function E(){h.setRaw(w,"",0)}function F(){h.setRaw(w,"y",ES("Date","now",false)+x)}function G(J){__p&&__p();var K,L=ES("Date","now",false);if(z){clearTimeout(z);z=null}var M=h.getRaw(w)==="y";if(k("getloginstatus_tracking",true))r.log("jssdk_error",{appId:q.getClientID(),error:"PLATFORM_AUTH_GETLOGINSTATUS",extra:{args:{fblo:M}}});if(M){var N="unknown";B(null,N);if(J)J({authResponse:null,status:N});return}var O=D(J,y,"login_status"),P=new u(t.resolve("www",true)+"/connect/ping").setQueryData({client_id:q.getClientID(),response_type:"token,signed_request,code",domain:location.hostname,origin:l(),redirect_uri:v.handler(function(Q){if(k("e2e_ping_tracking",true)){var R={init:L,close:ES("Date","now",false),method:"ping"};o.debug("e2e: %s",ES("JSON","stringify",false,R));n.log(114,{payload:R})}K.parentNode.removeChild(K);if(O(Q))z=setTimeout(function(){G(function(){})},12e5)},"parent"),sdk:"joey",kid_directed_site:q.getKidDirectedSite()});K=i({root:j.getRoot(),name:m(),url:P.toString(),style:{display:"none"}})}var H;function I(J,K){__p&&__p();if(!q.getClientID()){o.warn("FB.getLoginStatus() called before calling FB.init().");return}if(J)if(!K&&H=="loaded"){J({status:q.getLoginStatus(),authResponse:C()});return}else A.subscribe("FB.loginStatus",J);if(!K&&H=="loading")return;H="loading";var L=function L(M){H="loaded";A.inform("FB.loginStatus",M);A.clearSubscribers("FB.loginStatus")};G(L)}ES("Object","assign",false,A,{removeLogoutState:E,getLoginStatus:I,fetchLoginStatus:G,setAuthResponse:B,getAuthResponse:C,parseSignedRequest:s.parse,xdResponseWrapper:D});f.exports=A}),null);
__d("sdk.DOM",["Assert","sdk.UA","sdk.domReady"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={};function l(z,A){var B=z.getAttribute(A)||z.getAttribute(A.replace(/_/g,"-"))||z.getAttribute(A.replace(/-/g,"_"))||z.getAttribute(A.replace(/-/g,""))||z.getAttribute(A.replace(/_/g,""))||z.getAttribute("data-"+A)||z.getAttribute("data-"+A.replace(/_/g,"-"))||z.getAttribute("data-"+A.replace(/-/g,"_"))||z.getAttribute("data-"+A.replace(/-/g,""))||z.getAttribute("data-"+A.replace(/_/g,""));return B?String(B):null}function m(z,A){var B=l(z,A);return B?/^(true|1|yes|on)$/.test(B):null}function n(z,A){h.isTruthy(z,"element not specified");h.isString(A);try{return String(z[A])}catch(B){throw new Error("Could not read property "+A+" : "+B.message)}}function o(z,A){h.isTruthy(z,"element not specified");h.isString(A);try{z.innerHTML=A}catch(B){throw new Error("Could not set innerHTML : "+B.message)}}function p(z,A){h.isTruthy(z,"element not specified");h.isString(A);var B=" "+n(z,"className")+" ";return ES(B,"indexOf",true," "+A+" ")>=0}function q(z,A){h.isTruthy(z,"element not specified");h.isString(A);if(!p(z,A))z.className=n(z,"className")+" "+A}function r(z,A){h.isTruthy(z,"element not specified");h.isString(A);var B=new RegExp("\\s*"+A,"g");z.className=ES(n(z,"className").replace(B,""),"trim",true)}function s(z,A,B){__p&&__p();h.isString(z);A=A||document.body;B=B||"*";if(A.querySelectorAll)return ES("Array","from",false,A.querySelectorAll(B+"."+z));var C=A.getElementsByTagName(B),D=[];for(var E=0,F=C.length;E<F;E++)if(p(C[E],z))D[D.length]=C[E];return D}function t(z,A){h.isTruthy(z,"element not specified");h.isString(A);A=A.replace(/-(\w)/g,function(D,E){return E.toUpperCase()});var B=z.currentStyle||document.defaultView.getComputedStyle(z,null),C=B[A];if(/backgroundPosition?/.test(A)&&/top|left/.test(C))C="0%";return C}function u(z,A,B){h.isTruthy(z,"element not specified");h.isString(A);A=A.replace(/-(\w)/g,function(C,D){return D.toUpperCase()});z.style[A]=B}function v(z,A){__p&&__p();var B=true;for(var C=0,D;D=A[C++];)if(!(D in k)){B=false;k[D]=true}if(B)return;if(i.ie()<11)try{document.createStyleSheet().cssText=z}catch(E){if(document.styleSheets[0])document.styleSheets[0].cssText+=z}else{var F=document.createElement("style");F.type="text/css";F.textContent=z;document.getElementsByTagName("head")[0].appendChild(F)}}function w(){var z=document.documentElement&&document.compatMode=="CSS1Compat"?document.documentElement:document.body;return{scrollTop:z.scrollTop||document.body.scrollTop,scrollLeft:z.scrollLeft||document.body.scrollLeft,width:window.innerWidth?window.innerWidth:z.clientWidth,height:window.innerHeight?window.innerHeight:z.clientHeight}}function x(z){h.isTruthy(z,"element not specified");var A=0,B=0;do{A+=z.offsetLeft;B+=z.offsetTop}while(z=z.offsetParent);return{x:A,y:B}}var y={containsCss:p,addCss:q,removeCss:r,getByClass:s,getStyle:t,setStyle:u,getAttr:l,getBoolAttr:m,getProp:n,html:o,addCssRules:v,getViewportInfo:w,getPosition:x,ready:j};f.exports=y}),null);
__d("normalizeError",["sdk.UA"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j){__p&&__p();var k={line:j.lineNumber||j.line,message:j.message,name:j.name,script:j.fileName||j.sourceURL||j.script,stack:j.stackTrace||j.stack};k._originalError=j;var l=/([\w:\.\/]+\.js):(\d+)/.exec(j.stack);if(h.chrome()&&l){k.script=l[1];k.line=parseInt(l[2],10)}for(var m in k)k[m]==null&&delete k[m];return k}f.exports=i}),null);
__d("sdk.ErrorHandler",["ManagedError","normalizeError","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();function k(l,m){__p&&__p();var n="";function o(t){var u=t._originalError;delete t._originalError;m(t);throw u}function p(t,u){__p&&__p();return function(){__p&&__p();if(!l)return t.apply(this,arguments);try{n=u;return t.apply(this,arguments)}catch(v){if(v instanceof h)throw v;var w=i(v);w.entry=u;var x=ES(Array.prototype.slice.call(arguments),"map",true,function(y){var z=Object.prototype.toString.call(y);return/^\[object (String|Number|Boolean|Object|Date)\]$/.test(z)?y:y.toString()});w.args=ES("JSON","stringify",false,x).substring(0,200);o(w)}finally{n=""}}}function q(t){if(!t.__wrapper)t.__wrapper=function(){try{return t.apply(this,arguments)}catch(u){window.setTimeout(function(){throw u},0);return false}};return t.__wrapper}function r(t){try{return t&&t.callee&&t.callee.caller?t.callee.caller.name:""}catch(u){return""}}function s(t,u){return function(v,w){var x=u+":"+(n||"[global]")+":"+(v.name||"[anonymous]"+r(arguments));return t(j(v,"entry",x),w)}}if(l){setTimeout=s(setTimeout,"setTimeout");setInterval=s(setInterval,"setInterval");j.setWrapper(p,"entry")}return{guard:p,unguard:q}}f.exports={create:k}}),null);
__d("sdk.ErrorHandling",["sdk.ErrorHandler","sdk.Runtime","sdk.Scribe","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k){var l=k("error_handling",false);f.exports=h.create(l,function(m){j.log("jssdk_error",{appId:i.getClientID(),error:m.name||m.message,extra:m})})}),null);
__d("sdk.Insights",["sdk.Impressions"],(function a(b,c,d,e,f,g,h){var i={TYPE:{NOTICE:"notice",WARNING:"warn",ERROR:"error"},CATEGORY:{DEPRECATED:"deprecated",APIERROR:"apierror"},log:function j(k,l,m){var n={source:"jssdk",type:k,category:l,payload:m};h.log(113,n)},impression:h.impression};f.exports=i}),null);
__d("FB",["sdk.Auth","JSSDKCssConfig","dotAccess","sdk.domReady","sdk.DOM","sdk.ErrorHandling","sdk.Content","DOMWrapper","GlobalCallback","sdk.Insights","Log","sdk.Runtime","sdk.Scribe","JSSDKConfig"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){__p&&__p();var v=void 0,w=void 0,x=j(u,"api.mode"),y={};v=window.FB={};var z={};r.level=0;p.setPrefix("FB.__globalCallbacks");var A=document.createElement("div");o.setRoot(A);k(function(){r.info("domReady");n.appendHidden(A);if(i.rules)l.addCssRules(i.rules,i.components)});s.subscribe("AccessToken.change",function(D){if(!D&&s.getLoginStatus()==="connected")h.getLoginStatus(null,true)});if(j(u,"api.whitelist.length")){w={};ES(u.api.whitelist,"forEach",true,function(D){w[D]=1})}function B(D,E,F,G){__p&&__p();var H;if(/^_/.test(F))H="hide";else if(w&&!w[E])H=x;switch(H){case"hide":return;case"stub":return function(){r.warn("The method FB.%s has been removed from the JS SDK.",E)};default:return m.guard(function(){__p&&__p();if(H==="warn"){r.warn("The method FB.%s is not officially supported by Facebook and access to it will soon be removed.",E);if(!Object.prototype.hasOwnProperty.call(y,E)){q.log(q.TYPE.WARNING,q.CATEGORY.DEPRECATED,"FB."+E);t.log("jssdk_error",{appId:s.getClientID(),error:"Private method used",extra:{args:E}});y[E]=true}}function I(O){if(ES("Array","isArray",false,O))return ES(O,"map",true,I);if(O&&typeof O==="object"&&O.__wrapped)return O.__wrapped;return typeof O==="function"&&/^function/.test(O.toString())?m.unguard(O):O}var J=ES(Array.prototype.slice.call(arguments),"map",true,I),K=D.apply(G,J),L,M=true;if(K&&typeof K==="object"){L=ES("Object","create",false,K);L.__wrapped=K;for(var F in K){var N=K[F];if(typeof N!=="function"||F==="constructor")continue;M=false;L[F]=B(N,E+":"+F,F,K)}}if(!M)return L;return M?K:L},E)}}function C(D,E){__p&&__p();var F=D?j(v,D,true):v;ES(ES("Object","keys",false,E),"forEach",true,function(G){__p&&__p();var H=E[G];if(typeof H==="function"){var I=(D?D+".":"")+G,J=B(H,I,G,E);if(J)F[G]=J}else if(typeof H==="object"||typeof H==="number"){I=(D?D+".":"")+G;if(w&&w[I])F[G]=H}})}s.setSecure(function(){var D=/iframe_canvas|app_runner/.test(window.name),E=/dialog/.test(window.name);if(location.protocol=="https:"&&(window==top||!(D||E)))return true;if(/_fb_https?/.test(window.name))return ES(window.name,"indexOf",true,"_fb_https")!=-1}());ES("Object","assign",false,z,{provide:C});f.exports=z}),null);
__d("ArgumentError",["ManagedError"],(function a(b,c,d,e,f,g,h){function i(j,k){h.prototype.constructor.apply(this,arguments)}i.prototype=new h();i.prototype.constructor=i;f.exports=i}),null);
__d("flattenObject",[],(function a(b,c,d,e,f,g){__p&&__p();function h(i){__p&&__p();var j={};for(var k in i)if(Object.prototype.hasOwnProperty.call(i,k)){var l=i[k];if(null===l||undefined===l)continue;else if(typeof l=="string")j[k]=l;else j[k]=ES("JSON","stringify",false,l)}return j}f.exports=h}),null);
__d("ApiClientUtils",["ArgumentError","Assert","Log","sdk.URI","flattenObject","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n={get:true,post:true,"delete":true,put:true};function o(p){__p&&__p();var q=p.shift();i.isString(q,"Invalid path");if(!/^https?/.test(q)&&q.charAt(0)!=="/")q="/"+q;var r,s={};try{r=new k(q)}catch(t){throw new h(t.message,t)}ES(p,"forEach",true,function(x){return s[typeof x]=x});var u=(s.string||"get").toLowerCase();i.isTrue(Object.prototype.hasOwnProperty.call(n,u),m("Invalid method passed to ApiClient: %s",u));var v=s["function"];if(!v)j.warn("No callback passed to the ApiClient");if(s.object)r.addQueryData(l(s.object));var w=r.getQueryData();w.method=u;return{uri:r,callback:v,params:w}}f.exports={parseCallDataFromArgs:o}}),null);
__d("errorCode",[],(function a(b,c,d,e,f,g){"use strict";function h(i){throw new Error('errorCode("'+i+'"): This should not happen. Oh noes!')}f.exports=h}),null);
__d("sdk.safelyParseResponse",["errorCode"],(function a(b,c,d,e,f,g,h){"use strict";function i(k){try{return k===null?j:ES("JSON","parse",false,k)}catch(l){return j}}var j={error:{code:1,error_subcode:1357046,message:"Received Invalid JSON reply.",type:"http"}};i.ERROR=j;f.exports=i}),null);
__d("ApiBatcher",["ApiClientUtils","QueryString","invariant","sdk.safelyParseResponse"],(function a(b,c,d,e,f,g,h,i,j,k){"use strict";__p&&__p();var l=50,m=105440539523;function n(o,p){this.$ApiBatcher1=[];this.$ApiBatcher2=[];this.$ApiBatcher4=null;this.executeRequest=o;this.$ApiBatcher3=p}n.prototype.scheduleBatchCall=function(){__p&&__p();for(var o=arguments.length,p=Array(o),q=0;q<o;q++)p[q]=arguments[q];var r=n.prepareBatchParams(p),s=r.body,t=r.callback,u=r.method,v=r.relative_url,w={method:u,relative_url:v};if(s)w.body=s;this.$ApiBatcher1.push(w);this.$ApiBatcher2.push(t);if(this.$ApiBatcher1.length==l){if(this.$ApiBatcher4)clearTimeout(this.$ApiBatcher4);this.$ApiBatcher5()}else if(!this.$ApiBatcher4)this.$ApiBatcher4=setTimeout(ES(function(){this.$ApiBatcher5()},"bind",true,this),0)};n.prepareBatchParams=function(o){var p=h.parseCallDataFromArgs(o),q=p.uri,r=p.callback,s=p.params.method,t,u=q.removeQueryData("method").toString();if(s.toLowerCase()=="post"){t=i.encode(q.getQueryData());u=q.setQueryData({}).toString()}return{body:t,callback:r,method:s,relative_url:u}};n.prototype.$ApiBatcher5=function(){__p&&__p();this.$ApiBatcher1.length>0||j(0);this.$ApiBatcher1.length===this.$ApiBatcher2.length||j(0);var o=this.$ApiBatcher1,p=this.$ApiBatcher2;this.$ApiBatcher1=[];this.$ApiBatcher2=[];this.$ApiBatcher4=null;if(o.length===1){var q=o[0],r=p[0],s=q.body?i.decode(q.body):null;this.executeRequest(q.relative_url,q.method,s,r);return}this.executeRequest("/","POST",{batch:o,include_headers:false,batch_app_id:this.$ApiBatcher3||m},function(t){if(ES("Array","isArray",false,t))ES(t,"forEach",true,function(u,v){p[v](k(u&&u.body))});else ES(p,"forEach",true,function(r){return r({error:{message:"Fatal: batch call failed."}})})})};f.exports=n}),null);
__d("RequestConstants",["errorCode"],(function a(b,c,d,e,f,g,h){var i={code:1,error_subcode:1357045,message:"unknown error (empty response)",type:"http",status:0};f.exports={PARSE_ERROR_TEMPLATE:i}}),null);
__d("CORSRequest",["wrapFunction","QueryString","RequestConstants","sdk.safelyParseResponse"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();function l(o,p){__p&&__p();if(!self.XMLHttpRequest)return null;var q=new XMLHttpRequest(),r=function r(){};if("withCredentials"in q){q.open(o,p,true);q.setRequestHeader("Content-type","application/x-www-form-urlencoded")}else if(self.XDomainRequest){q=new XDomainRequest();try{q.open(o,p);q.onprogress=q.ontimeout=r}catch(s){return null}}else return null;var t={send:function w(x){q.send(x)}},u=h(function(){u=r;if("onload"in t)t.onload(q)},"entry","XMLHttpRequest:load"),v=h(function(){v=r;if("onerror"in t)t.onerror(q)},"entry","XMLHttpRequest:error");q.onload=function(){u()};q.onerror=function(){v()};q.onreadystatechange=function(){if(q.readyState==4)if(q.status==200)u();else v()};return t}function m(o,p,q,r){__p&&__p();q.suppress_http_code=1;var s=i.encode(q);if(p!="post"){o=i.appendToUrl(o,s);s=""}var t=l(p,o);if(!t)return false;t.onload=function(u){r(k(u.responseText))};t.onerror=function(u){if(u.responseText)r(k(u.responseText));else r({error:babelHelpers["extends"]({},j.PARSE_ERROR_TEMPLATE,{status:u.status})})};t.send(s);return true}var n={execute:m};f.exports=n}),null);
__d("GraphBatchConstants",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({FLUSH_DELIMITER:"\r\n"})}),null);
__d("ChunkedRequest",["GraphBatchConstants","QueryString","RequestConstants","sdk.safelyParseResponse","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();function m(){var q=arguments.length<=0||arguments[0]===undefined?h.FLUSH_DELIMITER:arguments[0];"use strict";this.offset=0;this.delimiter=h.FLUSH_DELIMITER;this.delimiter=q}m.prototype.parse=function(q){__p&&__p();var r=arguments.length<=1||arguments[1]===undefined?false:arguments[1];"use strict";var s=[],t=q.substring(this.offset),u=0,v=ES(t,"indexOf",true,this.delimiter,u);if(v===0){u=this.delimiter.length;v=ES(t,"indexOf",true,this.delimiter,u)}while(v>-1){var w=t.substring(u,v);if(w)s.push(w);u=v+this.delimiter.length;v=ES(t,"indexOf",true,this.delimiter,u)}this.offset+=u;if(r&&t&&v===-1){var x=q.substring(this.offset);s.push(x)}return s};function n(q,r){__p&&__p();if(!self.XMLHttpRequest)return null;var s=new XMLHttpRequest();if(!("withCredentials"in s))return null;s.open(q,r,true);s.setRequestHeader("Content-type","application/x-www-form-urlencoded");var t=new m(),u={send:function x(y){s.send(y)}},v=l(function(x){if(u.onchunk){var y=t.parse(x);ES(y,"forEach",true,function(z){return u.onchunk(z)})}},"entry","XMLHttpRequest:onchunk"),w=l(function(){if(u.onerror)u.onerror(s)},"entry","XMLHttpRequest:error");s.onerror=w;s.onreadystatechange=function(){if(s.readyState==4)if(s.status===200)v(s.responseText,true);else w();else if(s.readyState==3)v(s.responseText)};return u}function o(q,r,s,t){__p&&__p();s.suppress_http_code=1;var u=i.encode(s);if(r!="post"){q=i.appendToUrl(q,u);u=""}var v=n(r,q);if(!v)return false;v.onchunk=function(w){t(k(w))};v.onerror=function(w){if(w.responseText)t(k(w.responseText));else t({error:babelHelpers["extends"]({},j.PARSE_ERROR_TEMPLATE,{status:w.status})})};v.send(u);return true}var p={execute:o};f.exports=p}),null);
__d("FlashRequest",["DOMWrapper","Flash","GlobalCallback","QueryString","Queue"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m,n={},o,p;function q(){__p&&__p();if(!o)throw new Error("swfUrl has not been set");var t=j.create(function(){m.start(function(v){var w=p.execute(v.method,v.url,v.body);if(!w)throw new Error("Could create request");n[w]=v.callback})}),u=j.create(function(v,w,x){var y;try{y=ES("JSON","parse",false,decodeURIComponent(x))}catch(z){y={error:{type:"SyntaxError",message:z.message,status:w,raw:x}}}n[v](y);delete n[v]});p=i.embed(o,h.getRoot(),null,{log:false,initCallback:t,requestCallback:u})}function r(t,u,v,w){__p&&__p();v.suppress_http_code=1;if(!v.method)v.method=u;var x=k.encode(v);if(u==="get"&&t.length+x.length<2e3){t=k.appendToUrl(t,x);x=""}else u="post";if(!m){if(!i.isAvailable())return false;m=new l();q()}m.enqueue({method:u,url:t,body:x,callback:w});return true}var s={setSwfUrl:function t(u){o=u},execute:r};f.exports=s}),null);
__d("JSONPRequest",["DOMWrapper","GlobalCallback","QueryString"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k=2e3,l=false;function m(p,q,r,s){__p&&__p();var t=document.createElement("script"),u=function w(x){u=function w(){};i.remove(r.callback);s(x);t.parentNode.removeChild(t)};r.callback=i.create(u);if(!r.method)r.method=q;p=j.appendToUrl(p,r);if(!l&&p.length>k){i.remove(r.callback);return false}t.onerror=function(){u({error:{type:"http",message:"unknown error"}})};var v=function v(){setTimeout(function(){u({error:{type:"http",message:"unknown error"}})},0)};if(t.addEventListener)t.addEventListener("load",v,false);else t.onreadystatechange=function(){if(/loaded|complete/.test(this.readyState))v()};t.src=p;h.getRoot().appendChild(t);return true}function n(){l=true}var o={execute:m,ignoreMaxQuerystringLength:n,MAX_QUERYSTRING_LENGTH:k};f.exports=o}),null);
__d("ApiClient",["ApiBatcher","ApiClientUtils","Assert","ChunkedRequest","CORSRequest","FlashRequest","flattenObject","JSONPRequest","Log","ObservableMixin","QueryString","UrlMap","ApiClientConfig"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){__p&&__p();var u,v,w,x=o.MAX_QUERYSTRING_LENGTH,y={fql_query:true,fql_multiquery:true,friends_get:true,notifications_get:true,stream_get:true,users_getinfo:true},z=["jsonp","cors","flash"],A=0,B=[],C=0,D=0,E;function F(M,N,O,P){__p&&__p();var Q=C!==0&&A>=C;if(Q){B.push(function(){return F(M,N,O,P)});K.inform("request.queued",M,N,O);return}A++;if(w)O=ES("Object","assign",false,{},w,O);O.pretty=O.pretty||0;O=n(O);var R={jsonp:o,cors:l,flash:m,chunked:k},S={},T=O.access_token||u;if(T)S.access_token=T;var U=ES("Object","keys",false,S);if(U.length>0){M=r.appendToUrl(M,S);ES(U,"forEach",true,function(Z){return delete O[Z]})}var V;if(O.transport){V=[O.transport];delete O.transport}else V=z;for(var W=0;W<V.length;W++){var X=R[V[W]],Y=ES("Object","assign",false,{},O);if(X.execute(M,N,Y,P))return}P({error:{type:"no-transport",message:"Could not find a usable transport for request"}})}function G(M,N,O,P,Q,R,S){__p&&__p();if(S&&S.error)K.inform("request.error",N,O,P,S,ES("Date","now",false)-Q,R);K.inform("request.complete",N,O,P,S,ES("Date","now",false)-Q,R);A--;if(M)M(S);var T=B.length>0&&A<C;if(T){var U=B.shift();U()}}function H(){for(var M=arguments.length,N=Array(M),O=0;O<M;O++)N[O]=arguments[O];var P=i.parseCallDataFromArgs(N),Q=P.uri,R=P.callback,S=P.params,T=S.method;if(L(Q,T))T="post";var U=Q.getProtocol()&&Q.getDomain()?Q.setQueryData({}).toString():s.resolve("graph")+Q.getPath(),V=D++;K.inform("request.prepare",U,S,V);F(U,T=="get"?"get":"post",S,ES(G,"bind",true,null,R,Q.getPath(),T,S,ES("Date","now",false),V))}function I(){var M;if(!E)E=new h(H,v);(M=E).scheduleBatchCall.apply(M,arguments)}function J(M,N){j.isObject(M);j.isString(M.method,"method missing");if(!N)p.warn("No callback passed to the ApiClient");var O=M.method.toLowerCase().replace(".","_");M.format="json-strings";M.api_key=v;var P=O in y?"api_read":"api",Q=s.resolve(P)+"/restserver.php",R=D++,S=ES(G,"bind",true,null,N,"/restserver.php","get",M,ES("Date","now",false),R);F(Q,"get",M,S)}var K=ES("Object","assign",false,new q(),{setAccessToken:function M(N){u=N},setAccessTokenForClientID:function M(N,O){if(!(u&&v&&v!==O))u=N},getAccessToken:function M(){return u},setClientID:function M(N){v=N},setDefaultParams:function M(N){w=N},setDefaultTransports:function M(N){z=N},setMaxConcurrentRequests:function M(N){C=N},getCurrentlyExecutingRequestCount:function M(){return A},getQueuedRequestCount:function M(){return B.length},rest:J,graph:H,scheduleBatchCall:I,prepareBatchParams:h.prepareBatchParams});function L(M,N){return M.toString().length>x&&N==="get"}m.setSwfUrl(t.FlashRequest.swfUrl);f.exports=K}),null);
__d("sdk.PlatformVersioning",["sdk.Runtime","ManagedError"],(function a(b,c,d,e,f,g,h,i){var j=/^v\d+\.\d\d?$/,k={REGEX:j,assertVersionIsSet:function l(){if(!h.getVersion())throw new i("init not called with valid version")},assertValidVersion:function l(m){if(!j.test(m))throw new i("invalid version specified")}};f.exports=k}),null);
__d("sdk.api",["ApiClient","sdk.PlatformVersioning","sdk.Runtime","sdk.Scribe","sdk.URI","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n=m("should_log_response_error",false),o;j.subscribe("ClientID.change",function(q){return h.setClientID(q)});j.subscribe("AccessToken.change",function(q){o=q;h.setAccessToken(q)});h.setDefaultParams({sdk:"joey"});h.subscribe("request.complete",function(q,r,s,t){__p&&__p();var u=false;if(t&&typeof t=="object")if(t.error){if(t.error=="invalid_token"||t.error.type=="OAuthException"&&t.error.code==190)u=true}else if(t.error_code)if(t.error_code=="190")u=true;if(u&&o===j.getAccessToken())j.setAccessToken(null)});h.subscribe("request.complete",function(q,r,s,t){if((q=="/me/permissions"&&r==="delete"||q=="/restserver.php"&&s.method=="Auth.revokeAuthorization")&&t===true)j.setAccessToken(null)});h.subscribe("request.error",function(q,r,s,t){if(n&&t.error.type==="http")k.log("jssdk_error",{appId:j.getClientID(),error:"transport",extra:{name:"transport",message:ES("JSON","stringify",false,t.error)}})});function p(q){__p&&__p();if(typeof q==="string")if(j.getIsVersioned()){i.assertVersionIsSet();if(!/https?/.test(q)&&q.charAt(0)!=="/")q="/"+q;q=new l(q).setDomain(null).setProtocol(null).toString();if(!i.REGEX.test(q.substring(1,ES(q,"indexOf",true,"/",1))))q="/"+j.getVersion()+q;var r=[q].concat(Array.prototype.slice.call(arguments,1));h.graph.apply(h,r)}else h.graph.apply(h,arguments);else h.rest.apply(h,arguments)}f.exports=p}),null);
__d("legacy:fb.api",["FB","sdk.api"],(function a(b,c,d,e,f,g,h,i){h.provide("",{api:i})}),3);
__d("AppUserPropertyAPIBuiltinField",[],(function a(b,c,d,e,f,g){f.exports={GENDER:"$gender",CITY:"$city",STATE:"$state",ZIPCODE:"$zipcode",COUNTRY:"$country",LANGUAGE:"$language",CURRENCY:"$currency",INSTALL_SOURCE:"$install_source",USER_TYPE:"$user_type",ACCOUNT_CREATED_TIME:"$account_created_time"}}),null);
__d("FBEventsParamList",[],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h="deep",i="shallow";function j(){this.list=[]}j.prototype={append:function l(m,n){this._append(encodeURIComponent(m),n,h)},_append:function l(m,n,o){if(Object(n)!==n)this._appendPrimitive(m,n);else if(o===h)this._appendObject(m,n);else this._appendPrimitive(m,k(n))},_appendPrimitive:function l(m,n){if(n!=null)this.list.push([m,n])},_appendObject:function l(m,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var p=m+"["+encodeURIComponent(o)+"]";this._append(p,n[o],i)}},each:function l(m){var n=this.list;for(var o=0,p=n.length;o<p;o++)m(n[o][0],n[o][1])},toQueryString:function l(){var m=[];this.each(function(n,o){m.push(n+"="+encodeURIComponent(o))});return m.join("&")}};function k(l){if(typeof JSON==="undefined"||JSON===null||!ES("JSON","stringify",false))return Object.prototype.toString.call(l);else return ES("JSON","stringify",false,l)}f.exports=j}),null);
__d("FBEventsUtils",[],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h="console",i="error",j="Facebook Pixel Error",k="Facebook Pixel Warning",l="warn",m=Object.prototype.toString,n=!("addEventListener"in document),o=function o(){},p=window[h]||{},q=window.postMessage||o;function r(w){return ES("Array","isArray",false)?ES("Array","isArray",false,w):m.call(w)==="[object Array]"}function s(w){q({action:"FB_LOG",logType:j,logMessage:w},"*");if(i in p)p[i](j+": "+w)}function t(w){q({action:"FB_LOG",logType:k,logMessage:w},"*");if(l in p)p[l](k+": "+w)}function u(w,x,y){x=n?"on"+x:x;var z=n?"attachEvent":"addEventListener",A=n?"detachEvent":"removeEventListener",B=function B(){w[A](x,B,false);y()};w[z](x,B,false)}function v(w,x,y){var z=w[x];w[x]=function(){var A=z.apply(this,arguments);y.apply(this,arguments);return A}}g.isArray=r;g.logError=s;g.logWarning=t;g.listenOnce=u;g.injectMethod=v}),null);
__d("MobileDevSettingsKey",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({SETTING_SCREEN_DIMENSIONS:"MDEV_SCREEN_DIMENSIONS"})}),null);
__d("FBPixelEndpoint",["FBEventsParamList","FBEventsUtils","MobileDevSettingsKey"],(function a(b,c,d,e,f,g,h,i,j){"use strict";__p&&__p();var k="https://www.facebook.com/tr/",l=location.href,m=window.top!==window,n=document.referrer;function o(t,u,v,w){__p&&__p();w=w||{};var x=new h();x.append("id",t);x.append("ev",u);x.append("dl",l);x.append("rl",n);x.append("if",m);x.append("ts",new Date().valueOf());x.append("cd",v);x.append(j.SETTING_SCREEN_DIMENSIONS,window.screen.width+"x"+window.screen.height);for(var y in w)x.append(y,w[y]);return x}function p(t,u,v,w){var x=o(t,u,v,w),y=x.toQueryString();if(2048>(k+"?"+y).length)q(k,y);else r(k,x)}function q(t,u){var v=new Image();v.src=t+"?"+u}function r(t,u){__p&&__p();var v="fb"+Math.random().toString().replace(".",""),w=document.createElement("form");w.method="post";w.action=t;w.target=v;w.acceptCharset="utf-8";w.style.display="none";var x=!!(window.attachEvent&&!window.addEventListener),y=x?'<iframe name="'+v+'">':"iframe",z=document.createElement(y);z.src="javascript:false";z.id=v;z.name=v;w.appendChild(z);i.listenOnce(z,"load",function(){u.each(function(v,A){var B=document.createElement("input");B.name=v;B.value=A;w.appendChild(B)});i.listenOnce(z,"load",function(){w.parentNode.removeChild(w)});w.submit()});document.body.appendChild(w)}var s={sendEvent:p};f.exports=s}),null);
__d("FBAppEvents",["ApiClient","FBPixelEndpoint"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();function j(l,m,n,o,p){var q={};if(o!=null)q.vts=o.toString();if(p!=null)q.at=p;i.sendEvent(l.toString(),m,n,q)}function k(l,m,n,o){var p="/"+m+"/user_properties",q={data:[{user_unique_id:l,custom_data:n}]};h.graph(p,"post",q,o)}f.exports={logEvent:j,updateUserProperties:k}}),null);
__d("sdk.AppEvents",["AppUserPropertyAPIBuiltinField","Assert","sdk.Event","sdk.Impressions","sdk.Model","sdk.Runtime","FBAppEvents","sdk.Auth"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){__p&&__p();var p=Object.freeze({COMPLETED_REGISTRATION:"fb_mobile_complete_registration",VIEWED_CONTENT:"fb_mobile_content_view",SEARCHED:"fb_mobile_search",RATED:"fb_mobile_rate",COMPLETED_TUTORIAL:"fb_mobile_tutorial_completion",ADDED_TO_CART:"fb_mobile_add_to_cart",ADDED_TO_WISHLIST:"fb_mobile_add_to_wishlist",INITIATED_CHECKOUT:"fb_mobile_initiated_checkout",ADDED_PAYMENT_INFO:"fb_mobile_add_payment_info",ACHIEVED_LEVEL:"fb_mobile_level_achieved",UNLOCKED_ACHIEVEMENT:"fb_mobile_achievement_unlocked",PAGE_VIEW:"fb_page_view",SPENT_CREDITS:"fb_mobile_spent_credits"}),q=Object.freeze({ACTIVATED_APP:"fb_mobile_activate_app",PURCHASED:"fb_mobile_purchase"}),r=Object.freeze({APP_USER_ID:"_app_user_id",APP_VERSION:"_appVersion",CURRENCY:"fb_currency",REGISTRATION_METHOD:"fb_registration_method",CONTENT_TYPE:"fb_content_type",CONTENT_ID:"fb_content_id",SEARCH_STRING:"fb_search_string",SUCCESS:"fb_success",MAX_RATING_VALUE:"fb_max_rating_value",PAYMENT_INFO_AVAILABLE:"fb_payment_info_available",NUM_ITEMS:"fb_num_items",LEVEL:"fb_level",DESCRIPTION:"fb_description"}),s=/^[0-9a-zA-Z_][0-9a-zA-Z _-]{0,39}$/,t=40,u=s,v=t,w=100,x=100,y=100,z=100,A=ES("Object","values",false,h),B=new l({UserID:"",Version:""});function C(T,U,V,W){var X={ae:1,ev:U,vts:V,canvas:1};if(W)X.cd=W;k.impression({api_key:T,payload:ES("JSON","stringify",false,X)})}function D(T,U,V,W){var X=o.getAuthResponse(),Y=X&&X.accessToken?X.accessToken:null;n.logEvent(T,U,W||{},V,Y)}function E(T,U,V,W){__p&&__p();F(U);var X=B.getUserID();if(X!==""){W=W||{};W[r.APP_USER_ID]=X}var Y=B.getVersion();if(Y!==""){W=W||{};W[r.APP_VERSION]=Y}if(m.isCanvasEnvironment())C(T,U,V,W);else D(T,U,V,W)}function F(T){i.isTrue(s.test(T),"Invalid event name: "+T+". It must be between 1 and "+t+" characters, and must be contain only alphanumerics, _, - or spaces, starting with alphanumeric or _.")}function G(T,U,V,W){var X={};X[r.CURRENCY]=V;E(T,q.PURCHASED,U,babelHelpers["extends"]({},W,X))}function H(T){E(T,q.ACTIVATED_APP)}function I(T){E(T,p.PAGE_VIEW)}function J(T){i.isTrue(T.length!==0,"User ID must be set before updateUserProperties can be called.");i.isTrue(T.length<=w,"Invalid user ID: "+T+". It must be no longer than "+w+" characters.")}function K(T){J(T);B.setUserID(T)}function L(){return B.getUserID()}function M(){B.setUserID("")}function N(T){i.isTrue(T.length<=x,"Invalid app version: "+T+". It must be no longer than "+x+" characters.")}function O(T){N(T);B.setVersion(T)}function P(){return B.getVersion()}function Q(){B.setVersion("")}function R(T){i.isTrue(ES("Object","keys",false,T).length<=y,"The total number of user properties cannot exceed "+y+".");for(var U in T){i.isTrue(u.test(U)||ES(A,"includes",true,U),"Invalid user properties key name: "+U+". It must be between 1 and "+v+" characters, and must contain only alphanumerics, _, - or spaces, starting with alphanumeric or _. Or, it must be a pre-defined user property");i.isTrue(T[U].toString().length<=z,"Invalid user properties value: "+T[U]+". It must be no longer than "+z+" characters.")}}function S(T,U,V){var W=L();J(W);R(U);n.updateUserProperties(W,T,U,V)}j.subscribe("init:post",function(T){if(m.getClientID()){if(T.autoLogAppEvents!==undefined){i.isBoolean(T.autoLogAppEvents,"Type of property autoLogAppEvents must be boolean");m.setAutoLogAppEvents(T.autoLogAppEvents)}if(m.getAutoLogAppEvents())I(m.getClientID())}});f.exports={activateApp:H,logEvent:E,logPurchase:G,logPageView:I,assertValidEventName:F,EventNames:p,ParameterNames:r,assertValidUserID:J,setUserID:K,getUserID:L,clearUserID:M,assertValidUserProperties:R,updateUserProperties:S,setAppVersion:O,getAppVersion:P,clearAppVersion:Q,assertValidAppVersion:N}}),null);
__d("legacy:fb.appevents",["Assert","sdk.AppEvents","FB","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();function l(){var m=k.getClientID();h.isTrue(m!==null&&m.length>0,"You need to call FB.init() with App ID first.");return m}j.provide("AppEvents",{logEvent:function m(n,o,p){i.logEvent(l(),n,o,p)},logPurchase:function m(n,o,p){i.logPurchase(l(),n,o,p)},activateApp:function m(){i.activateApp(l())},logPageView:function m(){i.logPageView(l())},setUserID:function m(n){i.setUserID(n)},getUserID:function m(){return i.getUserID()},clearUserID:function m(){i.clearUserID()},updateUserProperties:function m(n,o){i.updateUserProperties(l(),n,o)},setAppVersion:function m(n){i.setAppVersion(n)},getAppVersion:function m(){return i.getAppVersion()},clearAppVersion:function m(){i.clearAppVersion()},EventNames:i.EventNames,ParameterNames:i.ParameterNames})}),3);
__d("resolveURI",[],(function a(b,c,d,e,f,g){function h(i){if(!i)return window.location.href;i=i.replace(/&/g,"&amp;").replace(/\"/g,"&quot;");var j=document.createElement("div");j.innerHTML='<a href="'+i+'"></a>';return j.firstChild.href}f.exports=h}),null);
__d("sdk.Canvas.Environment",["sdk.RPC"],(function a(b,c,d,e,f,g,h){function i(l){h.remote.getPageInfo(function(m){l(m.result)})}function j(l,m){h.remote.scrollTo({x:l||0,y:m||0})}h.stub("getPageInfo");h.stub("scrollTo");var k={getPageInfo:i,scrollTo:j};f.exports=k}),null);
__d("sdk.DialogUtils",["sdk.Content","sdk.DOM","DOMEventListener","sdk.UA","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l){"use strict";__p&&__p();var m={isOrientationPotrait:function n(){return window.innerWidth<window.innerHeight},addDoubleClickAction:function n(o,p,q){var r=null;return j.add(o,"click",function(){if(r!==null){clearTimeout(r);r=null;p()}r=setTimeout(function(){r=null},q)})},addIdleDesktopAction:function n(o,p,q){var r=void 0,event=void 0,s=function s(){r=setTimeout(p,q)};s();return j.add(o,"mouseenter",function(){clearTimeout(r);if(!event)event=j.add(o,"mouseleave",function(){s()})})},addMobileOrientationChangeAction:function n(o){if(!k.mobile())return null;var event="onorientationchange"in window?"orientationchange":"resize",p=function p(q){return setTimeout(function(q){return o(q)},50)};return j.add(window,event,p)},applyScreenDimensions:function n(o){if(o==null)return;var p=i.getViewportInfo();o.style.minHeight=p.height||p.width?p.height+"px":"";o.style.top=p.scrollTop?p.scrollTop+"px":""},setDialogPositionToCenter:function n(o,p,q){__p&&__p();var r=function r(B){return typeof B==="number"?B:parseInt(B,10)},s=i.getViewportInfo(),t=r(o.offsetWidth),u=r(o.offsetHeight),v=s.scrollLeft+(s.width-t)/2,w=(s.height-u)/2.5;if(v<w)w=v;var x=s.height-u-w,y=(s.height-u)/2;if(q)y=q.scrollTop-q.offsetTop+(q.clientHeight-u)/2;if(y<w)y=w;else if(y>x)y=x;y+=s.scrollTop;if(k.mobile()){var z=100;if(p){z+=(s.height-u)/2;i.addCss(document.body,"fb_reposition")}else{i.addCss(document.body,"fb_hidden");if(l("dialog_resize_refactor",false))document.body.style.width="auto";y=1e4}var A=i.getByClass("fb_dialog_padding",o);if(A.length)A[0].style.height=z+"px"}o.style.left=(v>0?v:0)+"px";o.style.top=(y>0?y:0)+"px"},setDialogPositionToTop:function n(o,p,q){this.setDialogPositionToCenter(o,p,q);var r=i.getViewportInfo(),s=r.scrollTop+(r.height-o.offsetHeight)*.05;i.setStyle(o,"top",s+"px")},setupNewDarkOverlay:function n(){var o=document.createElement("div");o.setAttribute("id","fb_dialog_ipad_overlay");this.applyScreenDimensions(o);return o},setupNewDialog:function n(o){__p&&__p();o=o||{};var p=document.createElement("div"),q=o,r=q.onClose;if(o.closeIcon&&r){var s=document.createElement("a");s.className="fb_dialog_close_icon";j.add(s,"click",r);p.appendChild(s)}var t="fb_dialog";t+=" "+(o.classes||"");if(k.ie()){t+=" fb_dialog_legacy";ES(["vert_left","vert_right","horiz_top","horiz_bottom","top_left","top_right","bottom_left","bottom_right"],"forEach",true,function(x){var y=document.createElement("span");y.className="fb_dialog_"+x;p.appendChild(y)})}else t+=k.mobile()?" fb_dialog_mobile":" fb_dialog_advanced";p.className=t;if(o.width){var u=parseInt(o.width,10);if(!isNaN(u))p.style.width=u+"px"}var v=document.createElement("div");if(o.content)h.append(o.content,v);v.className="fb_dialog_content";p.appendChild(v);if(k.mobile()){var w=document.createElement("div");w.className="fb_dialog_padding";p.appendChild(w)}return{dialogElement:p,contentRoot:v}},onDialogHideCleanup:function n(o){var p=document.body;if(o)i.removeCss(p,"fb_reposition");else i.removeCss(p,"fb_hidden")}};f.exports=m}),null);
__d("sdk.fbt",[],(function a(b,c,d,e,f,g){var h={_:function i(j){return typeof j==="string"?j:j[0]}};f.exports=h}),null);
__d("sdk.Dialog",["sdk.Canvas.Environment","sdk.Content","sdk.DialogUtils","sdk.DOM","DOMEventListener","ObservableMixin","sdk.Runtime","Type","sdk.UA","sdk.fbt","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){__p&&__p();var s=30,t=590,u=500,v=240,w=575;function x(){if(r("dialog_resize_refactor",false)){var A=k.getViewportInfo();if(A.height&&A.width)return{width:Math.min(A.width,u),height:Math.min(A.height,t)}}return null}var y=o.extend({constructor:function y(A,B){__p&&__p();this.parent();this.id=A;this.display=B;this._e2e={};if(!z._dialogs){z._dialogs={};z._addOrientationHandler()}z._dialogs[A]=this;this.trackEvent("init")},trackEvent:function A(B,C){if(this._e2e[B])return this;this._e2e[B]=C||ES("Date","now",false);if(B=="close")this.inform("e2e:end",this._e2e);return this},trackEvents:function A(B){if(typeof B==="string")B=ES("JSON","parse",false,B);for(var C in B)if(Object.prototype.hasOwnProperty.call(B,C))this.trackEvent(C,B[C]);return this}},m),z={newInstance:function A(B,C){return new y(B,C)},_dialogs:null,_lastYOffset:0,_overlayListeners:[],_loaderEl:null,_overlayEl:null,_stack:[],_active:null,_forceTabletStyle:null,_closeOnOverlayTap:null,_positionDialogAtTopWhenPortrait:null,get:function A(B){return z._dialogs[B]},_findRoot:function A(B){while(B){if(k.containsCss(B,"fb_dialog"))return B;B=B.parentNode}},_createWWWLoader:function A(B){B=B?B:460;return z.create({content:'<div class="dialog_title">  <a id="fb_dialog_loader_close">    <div class="fb_dialog_close_icon"></div>  </a>  <span>Facebook</span>  <div style="clear:both;"></div></div><div class="dialog_content"></div><div class="dialog_footer"></div>',width:B})},_createMobileLoader:function A(){var B;if(p.nativeApp())B='<div class="dialog_header"></div>';else if(z.isTabletStyle())B='<div class="overlayLoader"><div id="fb_dialog_loader_spinner"></div><a id="fb_dialog_loader_close" href="#">'+q._("Cancel")+"</a></div>";else B='<div class="dialog_header"><table>  <tbody>    <tr>      <td class="header_left">        <label class="touchable_button">          <input type="submit" value="'+q._("Cancel")+'"            id="fb_dialog_loader_close"/>        </label>      </td>      <td class="header_center">        <div>         '+q._("Loading...")+'        </div>      </td>      <td class="header_right">      </td>    </tr>  </tbody></table></div>';return z.create({classes:"loading"+(z.isTabletStyle()?" centered":""),content:B})},_setDialogOverlayStyle:function A(){j.applyScreenDimensions(z._overlayEl)},_showTabletOverlay:function A(B){__p&&__p();if(!z.isTabletStyle())return;if(!z._overlayEl){z._overlayEl=j.setupNewDarkOverlay();i.append(z._overlayEl,null)}if(z._closeOnOverlayTap){var C=j.addDoubleClickAction(z._overlayEl,ES(B,"bind",true,this),5e3);z._overlayListeners.push(C)}z._overlayEl.className=""},_hideTabletOverlay:function A(){if(z.isTabletStyle()){z._overlayEl.className="hidden";ES(z._overlayListeners,"forEach",true,function(B){return B.remove()});z._overlayListeners=[]}},showLoader:function A(B,C){__p&&__p();if(!B)B=function B(){};var D=function D(){z._hideLoader();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();B()};z._showTabletOverlay(D);if(!z._loaderEl)z._loaderEl=z._findRoot(p.mobile()?z._createMobileLoader():z._createWWWLoader(C));var E=document.getElementById("fb_dialog_loader_close");if(E){k.removeCss(E,"fb_hidden");var F=l.add(E,"click",D);z._overlayListeners.push(F)}z._makeActive(z._loaderEl)},setCloseOnOverlayTap:function A(B){z._closeOnOverlayTap=!!B},setPositionDialogAtTopWhenPortrait:function A(B){z._positionDialogAtTopWhenPortrait=!!B},_hideLoader:function A(){if(z._loaderEl&&z._loaderEl==z._active)z._loaderEl.style.top="-10000px"},_makeActive:function A(B){z._setDialogSizes();z._lowerActive();z._active=B;if(n.isEnvironment(n.ENVIRONMENTS.CANVAS))h.getPageInfo(function(C){z._centerActive(C)});z._centerActive()},_lowerActive:function A(){if(!z._active)return;z._active.style.top="-10000px";z._active=null},_removeStacked:function A(B){z._stack=ES(z._stack,"filter",true,function(C){return C!=B})},_centerActive:function A(B){var C=z._active;if(!C)return;if(z._positionDialogAtTopWhenPortrait&&j.isOrientationPotrait())j.setDialogPositionToTop(C,z.isTabletStyle(),B);else j.setDialogPositionToCenter(C,z.isTabletStyle(),B)},_setDialogSizes:function A(){__p&&__p();var B=arguments.length<=0||arguments[0]===undefined?false:arguments[0];if(!p.mobile())return;for(var C in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,C)){var D=document.getElementById(C);if(D){D.style.width=z.getDefaultSize().width+"px";if(!B)D.style.height=z.getDefaultSize().height+"px"}}},getDefaultSize:function A(){__p&&__p();if(p.mobile()){var B=x();if(B){if(k.getViewportInfo().width<=B.width)B.width=k.getViewportInfo().width-s;if(k.getViewportInfo().height<=B.height)B.height=k.getViewportInfo().height-s;return B}if(p.ipad())return{width:u,height:t};if(p.android())return{width:screen.availWidth,height:screen.availHeight};else{var C=window.innerWidth,D=window.innerHeight,E=C/D>1.2;return{width:C,height:Math.max(D,E?screen.width:screen.height)}}}return{width:w,height:v}},_handleOrientationChange:function A(){__p&&__p();var B=r("dialog_resize_refactor",false)?k.getViewportInfo().width:screen.availWidth;z._availScreenWidth=B;if(z.isTabletStyle()){z._setDialogSizes(true);z._centerActive();z._setDialogOverlayStyle()}else{var C=z.getDefaultSize().width;for(var D in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,D)){var E=document.getElementById(D);if(E)E.style.width=C+"px"}}},_addOrientationHandler:function A(){if(!p.mobile())return null;z._availScreenWidth=r("dialog_resize_refactor",false)?k.getViewportInfo().width:screen.availWidth;j.addMobileOrientationChangeAction(z._handleOrientationChange)},create:function A(B){var C=j.setupNewDialog(B);i.append(C.dialogElement);if(B.visible)z.show(C.dialogElement);if(typeof B.styles==="object")ES("Object","assign",false,C.dialogElement.style,B.styles);return C.contentRoot},show:function A(B){var C=z._findRoot(B);if(C){z._removeStacked(C);z._hideLoader();z._makeActive(C);z._stack.push(C);if("fbCallID"in B)z.get(B.fbCallID).inform("iframe_show").trackEvent("show")}},hide:function A(B){var C=z._findRoot(B);z._hideLoader();if(C==z._active){z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();if("fbCallID"in B)z.get(B.fbCallID).inform("iframe_hide").trackEvent("hide")}},remove:function A(B){__p&&__p();B=z._findRoot(B);if(B){var C=z._active==B;z._removeStacked(B);if(C){z._hideLoader();if(z._stack.length>0)z.show(z._stack.pop());else{z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay()}}else if(z._active===null&&z._stack.length>0)z.show(z._stack.pop());setTimeout(function(){B.parentNode.removeChild(B)},3e3)}},isActive:function A(B){var C=z._findRoot(B);return C&&C===z._active},setForceTabletStyle:function A(B){z._forceTabletStyle=!!B},isTabletStyle:function A(){__p&&__p();var B;if(!p.mobile())return false;if(z._forceTabletStyle)return true;if(r("dialog_resize_refactor",false)){var C=x();B=C&&(C.height>=t||C.width>=u)}else B=!!p.ipad();return B}};f.exports=z}),null);
__d("sdk.Extensions",["sdk.UA","JSONRPC","Queue"],(function a(b,c,d,e,f,g,h,i,j){"use strict";__p&&__p();var k=new j(),l=new i(function(o){k.enqueue(o)}),m=new j();m.start(function(o){l.read(o)});var n=window._FBSdkExtensions;if(n){window._FBBrowserCallbackHandler=function(o){m.enqueue(ES("JSON","stringify",false,o))};if(h.android())n.initializeCallbackHandler(ES("JSON","stringify",false,{name:"_FBBrowserCallbackHandler"}));k.start(function(o){if(n)n.jsonRPC(o)})}f.exports={local:l.local,remote:l.remote,stub:ES(l.stub,"bind",true,l),supportsExtension:function o(p){if(h.android()&&n)return n.supportsExtension(p);return false},supportsDialog:function o(p){if(h.android()&&n)return n.supportsDialog(p);return false}}}),null);
__d("sdk.Frictionless",["sdk.Auth","sdk.api","sdk.Event","sdk.Dialog"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();var l={_allowedRecipients:{},_useFrictionless:false,_updateRecipients:function m(){l._allowedRecipients={};i("/me/apprequestformerrecipients",function(n){if(!n||n.error)return;ES(n.data,"forEach",true,function(o){l._allowedRecipients[o.recipient_id]=true})})},init:function m(){l._useFrictionless=true;h.getLoginStatus(function(n){if(n.status=="connected")l._updateRecipients()});j.subscribe("auth.login",function(n){if(n.authResponse)l._updateRecipients()})},_processRequestResponse:function m(n,o){__p&&__p();return function(p){__p&&__p();var q=p&&p.updated_frictionless;if(l._useFrictionless&&q)l._updateRecipients();if(p){if(!o&&p.frictionless){k._hideLoader();k._restoreBodyPosition();k._hideIPadOverlay()}delete p.frictionless;delete p.updated_frictionless}n&&n(p)}},isAllowed:function m(n){__p&&__p();if(!n)return false;if(typeof n==="number")return n in l._allowedRecipients;if(typeof n==="string")n=n.split(",");n=ES(n,"map",true,function(q){return ES(String(q),"trim",true)});var o=true,p=false;ES(n,"forEach",true,function(q){o=o&&q in l._allowedRecipients;p=true});return o&&p}};j.subscribe("init:post",function(m){if(m.frictionlessRequests)l.init()});f.exports=l}),null);
__d("sdk.Native",["Log","sdk.UA"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j="fbNativeReady",k={onready:function l(m){__p&&__p();if(!i.nativeApp()){h.error("FB.Native.onready only works when the page is rendered in a WebView of the native Facebook app. Test if this is the case calling FB.UA.nativeApp()");return}if(window.__fbNative&&!this.nativeReady)ES("Object","assign",false,this,window.__fbNative);if(this.nativeReady)m();else{var n=function n(o){window.removeEventListener(j,n);this.onready(m)};window.addEventListener(j,n,false)}}};f.exports=k}),null);
__d("sdk.openMessenger",["sdk.UA"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i="https://itunes.apple.com/us/app/messenger/id454638411",j="https://play.google.com/store/apps/details?id=com.facebook.orca",k=3e3;function l(m){__p&&__p();var n=void 0,o=void 0,p=m.link,q=m.app_id;if(h.android()){n="intent://share/#Intent;package=com.facebook.orca;scheme=fb-messenger;S.android.intent.extra.TEXT="+encodeURIComponent(p)+";S.trigger=send_plugin;";if(q)n+="S.platform_app_id="+encodeURIComponent(q)+";";n+="end";o=j}else{n="fb-messenger://share?link="+encodeURIComponent(p);if(q)n+="&app_id="+encodeURIComponent(q);o=i}setTimeout(function(){window.location.href=o},k);window.location.href=n}f.exports=l}),null);
__d("sdk.UIServer",["sdk.Auth","sdk.Extensions","sdk.Content","sdk.DOM","sdk.Dialog","sdk.Event","sdk.Frictionless","Log","sdk.Native","QueryString","sdk.RPC","sdk.Runtime","JSSDKConfig","sdk.UA","UrlMap","sdk.XD","createObjectFrom","sdk.feature","sdk.fbt","flattenObject","sdk.getContextType","guid","insertIframe","sdk.openMessenger","resolveURI"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F){__p&&__p();var G={transform:function N(O){if(O.params.display==="touch"&&M.canIframe(O.params)&&window.postMessage){O.params.channel=M._xdChannelHandler(O.id,"parent");if(!u.nativeApp())O.params.in_iframe=1;return O}else return M.genericTransform(O)},getXdRelation:function N(O){var P=O.display;if(P==="touch"&&window.postMessage&&O.in_iframe)return"parent";return M.getXdRelation(O)}};function H(N){return N.method=="permissions.oauth"||N.method=="permissions.request"||N.method=="oauth"}var I={"stream.share":{size:{width:670,height:340},url:"sharer.php",transform:function N(O){if(!O.params.u)O.params.u=window.location.toString();O.params.display="popup";return O}},apprequests:{transform:function N(O){__p&&__p();O=G.transform(O);O.params.frictionless=n&&n._useFrictionless;if(O.params.frictionless){if(n.isAllowed(O.params.to)){O.params.display="iframe";O.params.in_iframe=true;O.hideLoader=true}O.cb=n._processRequestResponse(O.cb,O.hideLoader)}O.closeIcon=false;return O},getXdRelation:G.getXdRelation},"permissions.oauth":{url:"dialog/oauth",size:{width:u.mobile()?null:475,height:u.mobile()?null:183},transform:function N(O){__p&&__p();if(!s.getClientID()){o.error("FB.login() called before FB.init().");return}if(h.getAuthResponse()&&!O.params.scope&&!O.params.auth_type){o.error("FB.login() called when user is already connected.");O.cb&&O.cb({status:s.getLoginStatus(),authResponse:h.getAuthResponse()});return}var P=O.cb,Q=O.id;delete O.cb;var R=O.params.auth_type==="reauthenticate",S=ES("Object","keys",false,ES("Object","assign",false,O.params.response_type?x(O.params.response_type.split(",")):{},{token:true,signed_request:true})).join(",");if(O.params.display==="async"){ES("Object","assign",false,O.params,{client_id:s.getClientID(),origin:B(),response_type:S,domain:location.hostname});O.cb=h.xdResponseWrapper(P,h.getAuthResponse(),"permissions.oauth")}else{if(R)M._xdNextHandler(function(T){P({authResponse:null,status:"not_authorized"})},Q,"opener",true);ES("Object","assign",false,O.params,{client_id:s.getClientID(),redirect_uri:F(M.xdHandler(P,Q,"opener",h.getAuthResponse(),"permissions.oauth",!R)),origin:B(),response_type:S,domain:location.hostname})}return O}},"auth.logout":{url:"logout.php",transform:function N(O){if(!s.getClientID())o.error("FB.logout() called before calling FB.init().");else if(!h.getAuthResponse())o.error("FB.logout() called without an access token.");else{O.params.next=M.xdHandler(O.cb,O.id,"parent",h.getAuthResponse(),"logout",true);return O}}},"login.status":{url:"dialog/oauth",transform:function N(O){var P=O.cb,Q=O.id;delete O.cb;ES("Object","assign",false,O.params,{client_id:s.getClientID(),redirect_uri:M.xdHandler(P,Q,"parent",h.getAuthResponse(),"login_status",true),origin:B(),response_type:"token,signed_request,code",domain:location.hostname});return O}},pay:{size:{width:555,height:120},connectDisplay:"popup"},live_broadcast:{transform:function N(O){if(O.params.phase==="create")O.size={width:480,height:280};if(O.params.phase==="publish")O.size={width:772,height:540};return O},require_access_token:true},boost:{transform:function N(O){O.size={width:960,height:760};O.params.display="popup";return O}}},J={};function K(N,O){J[O]=true;return function(P){delete J[O];N(P)}}function L(N){if(!y("should_force_single_dialog_instance",true))return false;var O=N.method.toLowerCase();if(O==="pay"&&N.display==="async")return true;return false}var M={Methods:I,_loadedNodes:{},_defaultCb:{},_resultToken:'"xxRESULTTOKENxx"',genericTransform:function N(O){if(O.params.display=="dialog"||O.params.display=="iframe")ES("Object","assign",false,O.params,{display:"iframe",channel:M._xdChannelHandler(O.id,"parent.parent")},true);return O},checkOauthDisplay:function N(O){var P=O.scope||O.perms||s.getScope();if(!P)return O.display;var Q=P.split(/\s|,/g);for(var R=0;R<Q.length;R++)if(!t.initSitevars.iframePermissions[ES(Q[R],"trim",true)])return"popup";return O.display},prepareCall:function N(O,P){__p&&__p();var Q=O.method.toLowerCase(),R=Object.prototype.hasOwnProperty.call(M.Methods,Q)?ES("Object","assign",false,{},M.Methods[Q]):{},S=C(),T=s.getSecure()||Q!=="auth.status"&&Q!="login.status";ES("Object","assign",false,O,{app_id:s.getClientID(),locale:s.getLocale(),sdk:"joey",access_token:T&&s.getAccessToken()||undefined});if(Q==="share"||Q==="share_open_graph"){O.mobile_iframe=u.mobile()&&(O.mobile_iframe||O.iframe_test);if(O.mobile_iframe)R=ES("Object","assign",false,{},G)}O.display=M.getDisplayMode(R,O);if(!R.url)R.url="dialog/"+Q;if((R.url=="dialog/oauth"||R.url=="dialog/permissions.request")&&(O.display=="iframe"||O.display=="touch"&&O.in_iframe))O.display=M.checkOauthDisplay(O);if(O.display=="popup"&&!R.require_access_token)delete O.access_token;if(s.getIsVersioned()&&R.url.substring(0,7)==="dialog/")R.url=O.version+"/"+R.url;if(L(O)){if(J[Q]){var U='Dialog "'+Q+'" is trying to run more than once.';o.warn(U);P({error_code:-100,error_message:U});return}P=K(P,Q)}var V={cb:P,id:S,size:R.size||M.getDefaultSize(),url:v.resolve(O.display=="touch"?"m":"www",T)+"/"+R.url,params:O,name:Q,dialog:l.newInstance(S,O.display)},W=R.transform?R.transform:M.genericTransform;if(W){V=W(V);if(!V)return}if(O.display==="touch"&&O.in_iframe)V.params.parent_height=window.innerHeight;var X=R.getXdRelation||M.getXdRelation,Y=X(V.params);if(!(V.id in M._defaultCb)&&!("next"in V.params)&&!("redirect_uri"in V.params))V.params.next=M._xdResult(V.cb,V.id,Y,true);if(Y==="parent"||Y==="opener")ES("Object","assign",false,V.params,{channel_url:M._xdChannelHandler(S,Y==="parent"?"parent.parent":"opener")},true);V=M.prepareParams(V);return V},prepareParams:function N(O){__p&&__p();if(O.params.display!=="async")delete O.params.method;O.params.kid_directed_site=s.getKidDirectedSite()||O.params.kid_directed_site;O.params=A(O.params);var P=q.encode(O.params);if(!u.nativeApp()&&M.urlTooLongForIE(O.url+"?"+P))O.post=true;else if(P)O.url+="?"+P;return O},urlTooLongForIE:function N(O){return u.ie()&&u.ie()<=8&&O.length>2048},getDisplayMode:function N(O,P){__p&&__p();if(P.display==="hidden"||P.display==="none"||P.display==="native")return P.display;var Q=s.isEnvironment(s.ENVIRONMENTS.CANVAS)||s.isEnvironment(s.ENVIRONMENTS.PAGETAB);if(Q&&!P.display)return"async";if(H(P)&&i.supportsDialog("oauth"))return"async";if(u.mobile()||P.display==="touch")return"touch";if(P.display=="iframe"||P.display=="dialog")if(!M.canIframe(P)){o.error('"dialog" mode can only be used when the user is connected.');return"popup"}if(O.connectDisplay&&!Q)return O.connectDisplay;return P.display||(M.canIframe(P)?"dialog":"popup")},canIframe:function N(O){if(s.getAccessToken())return true;if(u.mobile()&&s.getLoggedIntoFacebook())return!!O.mobile_iframe;return false},getXdRelation:function N(O){var P=O.display;if(P==="popup"||P==="touch")return"opener";if(P==="dialog"||P==="iframe"||P==="hidden"||P==="none")return"parent";if(P==="async")return"parent.frames["+window.name+"]"},popup:function N(O){__p&&__p();var P=typeof window.screenX!="undefined"?window.screenX:window.screenLeft,Q=typeof window.screenY!="undefined"?window.screenY:window.screenTop,R=typeof window.outerWidth!="undefined"?window.outerWidth:document.documentElement.clientWidth,S=typeof window.outerHeight!="undefined"?window.outerHeight:document.documentElement.clientHeight-22,T=u.mobile()?null:O.size.width,U=u.mobile()?null:O.size.height,V=P<0?window.screen.width+P:P,W=parseInt(V+(R-T)/2,10),X=parseInt(Q+(S-U)/2.5,10),Y=[];if(T!==null)Y.push("width="+T);if(U!==null)Y.push("height="+U);Y.push("left="+W);Y.push("top="+X);Y.push("scrollbars=1");if(O.name=="permissions.request"||O.name=="permissions.oauth"){Y.push("toolbar=0");if(!u.chrome()||u.chrome()<59)Y.push("location=1")}Y=Y.join(",");var N;if(O.post){N=window.open("about:blank",O.id,Y);if(N){M.setLoadedNode(O,N,"popup");j.submitToTarget({url:O.url,target:O.id,params:O.params})}}else{N=window.open(O.url,O.id,Y);if(N)M.setLoadedNode(O,N,"popup")}if(!N)return;if(O.id in M._defaultCb)M._popupMonitor()},setLoadedNode:function N(O,P,Q){if(Q==="iframe")P.fbCallID=O.id;P={node:P,type:Q,fbCallID:O.id};M._loadedNodes[O.id]=P},getLoadedNode:function N(O){var P=typeof O=="object"?O.id:O,Q=M._loadedNodes[P];return Q?Q.node:null},hidden:function N(O){O.className="FB_UI_Hidden";O.root=j.appendHidden("");M._insertIframe(O)},iframe:function N(O){__p&&__p();O.className="FB_UI_Dialog";if(O.params.mobile_iframe){l.setForceTabletStyle(true);l.setCloseOnOverlayTap(true);l.setPositionDialogAtTopWhenPortrait(true)}var P=function P(){var R=ES("JSON","stringify",false,{error_code:4201,error_message:z._("User canceled the Dialog flow")});M._triggerDefault(O.id,R)},Q={onClose:P,closeIcon:O.closeIcon===undefined?true:O.closeIcon,classes:l.isTabletStyle()?"centered":""};if(O.params.mobile_iframe)Q.styles={"border-radius":"8px"};O.root=l.create(Q);if(!O.hideLoader)l.showLoader(P,O.size.width);k.addCss(O.root,"fb_dialog_iframe");M._insertIframe(O)},touch:function N(O){__p&&__p();if(O.params&&O.params.in_iframe)if(O.ui_created)l.showLoader(function(){M._triggerDefault(O.id,null)},0);else M.iframe(O);else if(u.nativeApp()&&!O.ui_created){O.frame=O.id;p.onready(function(){M.setLoadedNode(O,p.open(O.url+"#cb="+O.frameName),"native")});M._popupMonitor()}else if(!O.ui_created)M.popup(O)},async:function N(O){__p&&__p();O.params.redirect_uri=location.protocol+"//"+location.host+location.pathname;delete O.params.access_token;var P=function P(Q){var R=Q.result;if(R&&R.e2e){var S=l.get(O.id);S.trackEvents(R.e2e);S.trackEvent("close");delete R.e2e}O.cb(R)};if(H(O.params)&&i.supportsDialog("oauth")){O.params.method="oauth";O.params.redirect_uri=O.params.next;i.remote.showDialog(O.params,P)}else r.remote.showDialog(O.params,P)},"native":function N(O){E(O.params)},getDefaultSize:function N(){return l.getDefaultSize()},_insertIframe:function N(O){M._loadedNodes[O.id]=false;var P=function P(Q){if(O.id in M._loadedNodes)M.setLoadedNode(O,Q,"iframe")};if(O.post)D({url:"about:blank",root:O.root,className:O.className,width:O.size.width,height:O.size.height,id:O.id,onInsert:P,onload:function Q(R){j.submitToTarget({url:O.url,target:R.name,params:O.params})}});else D({url:O.url,root:O.root,className:O.className,width:O.size.width,height:O.size.height,id:O.id,name:O.frameName,onInsert:P})},_handleResizeMessage:function N(O,P){__p&&__p();var Q=M.getLoadedNode(O);if(!Q)return;if(P.height)Q.style.height=P.height+"px";if(P.width)Q.style.width=P.width+"px";w.inform("resize.ack",P||{},"parent.frames["+Q.name+"]");if(!l.isActive(Q))l.show(Q);else l._centerActive()},_triggerDefault:function N(O,P){var Q={frame:O};if(P)Q.result=P;M._xdRecv(Q,M._defaultCb[O]||function(){})},_popupMonitor:function N(){__p&&__p();var O;for(var P in M._loadedNodes)if(Object.prototype.hasOwnProperty.call(M._loadedNodes,P)&&P in M._defaultCb){var Q=M._loadedNodes[P];if(Q.type!="popup"&&Q.type!="native")continue;var R=Q.node;try{if(R.closed)M._triggerDefault(P,null);else O=true}catch(S){}}if(O&&!M._popupInterval)M._popupInterval=setInterval(M._popupMonitor,100);else if(!O&&M._popupInterval){clearInterval(M._popupInterval);M._popupInterval=null}},_xdChannelHandler:function N(O,P){__p&&__p();return w.handler(function(Q){__p&&__p();var R=M.getLoadedNode(O);if(!R)return;if(Q.type=="resize")M._handleResizeMessage(O,Q);else if(Q.type=="hide")l.hide(R);else if(Q.type=="rendered"){var S=l._findRoot(R);l.show(S)}else if(Q.type=="fireevent")m.fire(Q.event,Q)},P,true,null)},_xdNextHandler:function N(O,P,Q,R){if(R)M._defaultCb[P]=O;return w.handler(function(S){M._xdRecv(S,O)},Q)+"&frame="+P},_xdRecv:function N(O,P){__p&&__p();var Q=M.getLoadedNode(O.frame);if(Q)if(Q.close)try{Q.close();if(/iPhone.*Version\/(5|6)/.test(navigator.userAgent)&&RegExp.$1!=="5")window.focus();M._popupCount--}catch(R){}else if(k.containsCss(Q,"FB_UI_Hidden"))setTimeout(function(){Q.parentNode.parentNode.removeChild(Q.parentNode)},3e3);else if(k.containsCss(Q,"FB_UI_Dialog"))l.remove(Q);delete M._loadedNodes[O.frame];delete M._defaultCb[O.frame];if(O.e2e){var S=l.get(O.frame);S.trackEvents(O.e2e);S.trackEvent("close");delete O.e2e}P(O)},_xdResult:function N(O,P,Q,R){return M._xdNextHandler(function(S){O&&O(S.result&&S.result!=M._resultToken&&ES("JSON","parse",false,S.result))},P,Q,R)+"&result="+encodeURIComponent(M._resultToken)},xdHandler:function N(O,P,Q,R,S,T){return M._xdNextHandler(h.xdResponseWrapper(O,R,S),P,Q,T)}};i.stub("showDialog");r.stub("showDialog");f.exports=M}),null);
__d("sdk.ui",["Assert","sdk.Impressions","Log","sdk.PlatformVersioning","sdk.Runtime","sdk.UIServer","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();function o(p,q){__p&&__p();h.isObject(p);h.maybeFunction(q);if(l.getIsVersioned()){k.assertVersionIsSet();if(p.version)k.assertValidVersion(p.version);else p.version=l.getVersion()}p=ES("Object","assign",false,{},p);if(!p.method){j.error('"method" is a required parameter for FB.ui().');return null}if(p.method=="pay.prompt")p.method="pay";var r=p.method;if(p.redirect_uri){j.warn("When using FB.ui, you should not specify a redirect_uri.");delete p.redirect_uri}if((r=="permissions.request"||r=="permissions.oauth")&&(p.display=="iframe"||p.display=="dialog"))p.display=m.checkOauthDisplay(p);if(p.display==="native"&&r!=="send"){j.error('display type "native" not supported');return null}var s=n("e2e_tracking",true);if(s)p.e2e={};var t=m.prepareCall(p,q||function(){});if(!t)return null;var u=t.params.display;if(u==="dialog")u="iframe";else if(u==="none")u="hidden";var v=m[u];if(!v){j.error('"display" must be one of "popup", "dialog", "iframe", "touch", "async", "hidden", or "none"');return null}if(s)t.dialog.subscribe("e2e:end",function(w){w.method=r;w.display=u;j.debug("e2e: %s",ES("JSON","stringify",false,w));i.log(114,{payload:w})});v(t);return t.dialog}f.exports=o}),null);
__d("legacy:fb.auth",["sdk.Auth","sdk.Cookie","sdk.Event","FB","Log","sdk.Runtime","sdk.SignedRequest","sdk.ui"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){__p&&__p();k.provide("",{getLoginStatus:function p(){return h.getLoginStatus.apply(h,arguments)},getAuthResponse:function p(){return h.getAuthResponse()},getAccessToken:function p(){return m.getAccessToken()||null},getUserID:function p(){return m.getUserID()||m.getCookieUserID()},login:function p(q,r){if(r&&r.perms&&!r.scope){r.scope=r.perms;delete r.perms;l.warn("OAuth2 specification states that 'perms' should now be called 'scope'.  Please update.")}var s=m.isEnvironment(m.ENVIRONMENTS.CANVAS)||m.isEnvironment(m.ENVIRONMENTS.PAGETAB);o(babelHelpers["extends"]({method:"permissions.oauth",display:s?"async":"popup",domain:location.hostname},r||{}),q)},logout:function p(q){o({method:"auth.logout",display:"hidden"},q)}});h.subscribe("logout",ES(j.fire,"bind",true,j,"auth.logout"));h.subscribe("login",ES(j.fire,"bind",true,j,"auth.login"));h.subscribe("authresponse.change",ES(j.fire,"bind",true,j,"auth.authResponseChange"));h.subscribe("status.change",ES(j.fire,"bind",true,j,"auth.statusChange"));j.subscribe("init:post",function(p){__p&&__p();if(p.status)h.getLoginStatus();if(m.getClientID())if(p.authResponse)h.setAuthResponse(p.authResponse,"connected");else if(m.getUseCookie()){var q=i.loadSignedRequest(),r;if(q){try{r=n.parse(q)}catch(s){i.clearSignedRequestCookie()}if(r&&r.user_id)m.setCookieUserID(r.user_id)}i.loadMeta()}})}),3);
__d("sdk.Canvas.IframeHandling",["DOMWrapper","sdk.RPC"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=null,k;function l(){var p=h.getWindow().document,q=p.body,r=p.documentElement,s=Math.max(q.offsetTop,0),t=Math.max(r.offsetTop,0),u=q.scrollHeight+s,v=q.offsetHeight+s,w=r.scrollHeight+t,x=r.offsetHeight+t;return Math.max(u,v,w,x)}function m(p){__p&&__p();if(typeof p!="object")p={};var q=0,r=0;if(!p.height){p.height=l();q=16;r=4}if(!p.frame)p.frame=window.name||"iframe_canvas";if(k){var s=k.height,t=p.height-s;if(t<=r&&t>=-q)return false}k=p;i.remote.setSize(p);return true}function n(p,q){__p&&__p();if(q===undefined&&typeof p==="number"){q=p;p=true}if(p||p===undefined){if(j===null)j=setInterval(function(){m()},q||100);m()}else if(j!==null){clearInterval(j);j=null}}i.stub("setSize");var o={setSize:m,setAutoGrow:n};f.exports=o}),null);
__d("sdk.Canvas.Navigation",["sdk.RPC"],(function a(b,c,d,e,f,g,h){function i(k){h.local.navigate=function(l){k({path:l})};h.remote.setNavigationEnabled(true)}h.stub("setNavigationEnabled");var j={setUrlHandler:i};f.exports=j}),null);
__d("sdk.Canvas.Plugin",["Log","sdk.RPC","sdk.Runtime","sdk.UA","sdk.api"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m="CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000",n="CLSID:444785F1-DE89-4295-863A-D46C3A781394",o=null,p=k.osx()&&k.osx.getVersionParts(),q=!(p&&p[0]>10&&p[1]>10&&(k.chrome()>=31||k.webkit()>=537.71||k.firefox()>=25));function r(B){B._hideunity_savedstyle={};B._hideunity_savedstyle.left=B.style.left;B._hideunity_savedstyle.position=B.style.position;B._hideunity_savedstyle.width=B.style.width;B._hideunity_savedstyle.height=B.style.height;B.style.left="-10000px";B.style.position="absolute";B.style.width="1px";B.style.height="1px"}function s(B){if(B._hideunity_savedstyle){B.style.left=B._hideunity_savedstyle.left;B.style.position=B._hideunity_savedstyle.position;B.style.width=B._hideunity_savedstyle.width;B.style.height=B._hideunity_savedstyle.height}}function t(B){B._old_visibility=B.style.visibility;B.style.visibility="hidden"}function u(B){B.style.visibility=B._old_visibility||"";delete B._old_visibility}function v(B){__p&&__p();var C=B.type?B.type.toLowerCase():null,D=C==="application/x-shockwave-flash"||B.classid&&B.classid.toUpperCase()==m;if(!D)return false;var E=/opaque|transparent/i;if(E.test(B.getAttribute("wmode")))return false;for(var F=0;F<B.childNodes.length;F++){var G=B.childNodes[F];if(/param/i.test(G.nodeName)&&/wmode/i.test(G.name)&&E.test(G.value))return false}return true}function w(B){var C=B.type?B.type.toLowerCase():null;return C==="application/vnd.unity"||B.classid&&B.classid.toUpperCase()==n}function x(B){__p&&__p();var C=ES("Array","from",false,window.document.getElementsByTagName("object"));C=C.concat(ES("Array","from",false,window.document.getElementsByTagName("embed")));var D=false,E=false;ES(C,"forEach",true,function(G){__p&&__p();var H=v(G),I=q&&w(G);if(!H&&!I)return;D=D||H;E=E||I;var J=function J(){if(B.state==="opened")if(H)t(G);else r(G);else if(H)u(G);else s(G)};if(o){h.info("Calling developer specified callback");var K={state:B.state,elem:G};o(K);setTimeout(J,200)}else J()});if(Math.random()<=1/1e3){var F={unity:E,flash:D};l(j.getClientID()+"/occludespopups","post",F)}}i.local.hidePluginObjects=function(){h.info("hidePluginObjects called");x({state:"opened"})};i.local.showPluginObjects=function(){h.info("showPluginObjects called");x({state:"closed"})};i.local.showFlashObjects=i.local.showPluginObjects;i.local.hideFlashObjects=i.local.hidePluginObjects;function y(){t();r()}function z(){u();s()}var A={_setHidePluginCallback:function B(C){o=C},hidePluginElement:y,showPluginElement:z};f.exports=A}),null);
__d("sdk.Canvas.Tti",["sdk.RPC","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i){__p&&__p();function j(o,p){var q={appId:i.getClientID(),time:ES("Date","now",false),name:p},r=[q];if(o)r.push(function(s){o(s.result)});h.remote.logTtiMessage.apply(null,r)}function k(){j(null,"StartIframeAppTtiTimer")}function l(o){j(o,"StopIframeAppTtiTimer")}function m(o){j(o,"RecordIframeAppTti")}h.stub("logTtiMessage");var n={setDoneLoading:m,startTimer:k,stopTimer:l};f.exports=n}),null);
__d("legacy:fb.canvas",["Assert","sdk.Canvas.Environment","sdk.Event","FB","sdk.Canvas.IframeHandling","sdk.Canvas.Navigation","sdk.Canvas.Plugin","sdk.RPC","sdk.Runtime","sdk.Canvas.Tti"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){__p&&__p();k.provide("Canvas",{setSize:function r(s){h.maybeObject(s,"Invalid argument");return l.setSize.apply(null,arguments)},setAutoGrow:function r(){return l.setAutoGrow.apply(null,arguments)},getPageInfo:function r(s){h.isFunction(s,"Invalid argument");return i.getPageInfo.apply(null,arguments)},scrollTo:function r(s,t){h.maybeNumber(s,"Invalid argument");h.maybeNumber(t,"Invalid argument");return i.scrollTo.apply(null,arguments)},setDoneLoading:function r(s){h.maybeFunction(s,"Invalid argument");return q.setDoneLoading.apply(null,arguments)},startTimer:function r(){return q.startTimer.apply(null,arguments)},stopTimer:function r(s){h.maybeFunction(s,"Invalid argument");return q.stopTimer.apply(null,arguments)},getHash:function r(s){h.isFunction(s,"Invalid argument");return m.getHash.apply(null,arguments)},setHash:function r(s){h.isString(s,"Invalid argument");return m.setHash.apply(null,arguments)},setUrlHandler:function r(s){h.isFunction(s,"Invalid argument");return m.setUrlHandler.apply(null,arguments)}});o.local.fireEvent=ES(j.fire,"bind",true,j);j.subscribe("init:post",function(r){if(p.isEnvironment(p.ENVIRONMENTS.CANVAS)){h.isTrue(!r.hideFlashCallback||!r.hidePluginCallback,"cannot specify deprecated hideFlashCallback and new hidePluginCallback");n._setHidePluginCallback(r.hidePluginCallback||r.hideFlashCallback)}})}),3);
__d("legacy:fb.canvas.plugin",["FB","sdk.Canvas.Plugin"],(function a(b,c,d,e,f,g,h,i){h.provide("Canvas.Plugin",i)}),3);
__d("sdk.Canvas.Prefetcher",["JSSDKCanvasPrefetcherConfig","sdk.Runtime","sdk.api"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={AUTOMATIC:0,MANUAL:1},l=h.sampleRate,m=h.blacklist,n=k.AUTOMATIC,o=[];function p(){__p&&__p();var u={object:"data",link:"href",script:"src"};if(n==k.AUTOMATIC)ES(ES("Object","keys",false,u),"forEach",true,function(v){var w=u[v];ES(ES("Array","from",false,document.getElementsByTagName(v)),"forEach",true,function(x){if(x[w])o.push(x[w])})});if(o.length===0)return;j(i.getClientID()+"/staticresources","post",{urls:ES("JSON","stringify",false,o),is_https:location.protocol==="https:"});o=[]}function q(){if(!i.isEnvironment(i.ENVIRONMENTS.CANVAS)||!i.getClientID()||!l)return;if(Math.random()>1/l||m=="*"||~ES(m,"indexOf",true,i.getClientID()))return;setTimeout(p,3e4)}function r(u){n=u}function s(u){o.push(u)}var t={COLLECT_AUTOMATIC:k.AUTOMATIC,COLLECT_MANUAL:k.MANUAL,addStaticResource:s,setCollectionMode:r,_maybeSample:q};f.exports=t}),null);
__d("legacy:fb.canvas.prefetcher",["FB","sdk.Canvas.Prefetcher","sdk.Event","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k){h.provide("Canvas.Prefetcher",i);j.subscribe("init:post",function(l){if(k.isEnvironment(k.ENVIRONMENTS.CANVAS))i._maybeSample()})}),3);
__d("legacy:fb.canvas.presence",["sdk.RPC","sdk.Event"],(function a(b,c,d,e,f,g,h,i){__p&&__p();i.subscribe(i.SUBSCRIBE,j);i.subscribe(i.UNSUBSCRIBE,k);h.stub("useFriendsOnline");function j(l,m){if(l!="canvas.friendsOnlineUpdated")return;if(m.length===1)h.remote.useFriendsOnline(true)}function k(l,m){if(l!="canvas.friendsOnlineUpdated")return;if(m.length===0)h.remote.useFriendsOnline(false)}}),3);
__d("legacy:fb.canvas.syncrequests",["sdk.RPC","sdk.Event"],(function a(b,c,d,e,f,g,h,i){h.stub("initPendingSyncRequests");function j(k,l){if(k!="canvas.syncRequestUpdated")return;h.remote.initPendingSyncRequests();i.unsubscribe(i.SUBSCRIBE,j)}i.subscribe(i.SUBSCRIBE,j)}),3);
__d("legacy:fb.event",["FB","sdk.Event","sdk.Runtime","sdk.Scribe","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m=[],n=null,o=l("event_subscriptions_log",false);h.provide("Event",{subscribe:function p(q,r){if(o){m.push(q);if(!n)n=setTimeout(function(){k.log("jssdk_error",{appId:j.getClientID(),error:"EVENT_SUBSCRIPTIONS_LOG",extra:{line:0,name:"EVENT_SUBSCRIPTIONS_LOG",script:"N/A",stack:"N/A",message:m.sort().join(",")}});m.length=0;n=null},o)}return i.subscribe(q,r)},unsubscribe:ES(i.unsubscribe,"bind",true,i)})}),3);
__d("legacy:fb.frictionless",["FB","sdk.Frictionless"],(function a(b,c,d,e,f,g,h,i){h.provide("Frictionless",i)}),3);
__d("sdk.MBasicInitializer",["sdk.DOM","sdk.Runtime","sdk.UA","sdk.URI","UrlMap","sdk.fbt","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();var o=function o(){__p&&__p();function q(r){__p&&__p();if(!r)return;var s=r.parentNode;if(!s)return;var t=h.getAttr(r,"href")||window.location.href,u=new k(l.resolve("m"));u.setPath("/dialog/share");u.addQueryData("href",encodeURI(t));u.addQueryData("app_id",i.getClientID());u.addQueryData("mbasic_link",1);var v=document.createElement("a");v.style="display:inline-block; zoom:1;";v.textContent=m._("Share to Facebook");v.setAttribute("href",u.toString());v.setAttribute("target","_blank");s.insertBefore(v,r);s.removeChild(r)}if(!n("js_sdk_mbasic_share_plugin_init",false))return;ES(ES("Array","from",false,document.getElementsByTagName("fb:share-button")),"forEach",true,function(r){return q(r)});ES(ES("Array","from",false,document.getElementsByClassName("fb-share-button")),"forEach",true,function(r){return q(r)})};function p(){if(!j.mBasic())return;o()}f.exports={init:p}}),null);
__d("sdk.init",["sdk.Cookie","sdk.ErrorHandling","sdk.Event","sdk.Impressions","Log","ManagedError","sdk.MBasicInitializer","sdk.PlatformVersioning","QueryString","sdk.Runtime","sdk.UA","sdk.URI","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){__p&&__p();function u(w){var x=typeof w==="number"&&w>0||typeof w==="string"&&/^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(w);if(x)return w.toString();l.warn("Invalid App Id: Must be a number or numeric string representing the application id.");return null}function v(w){__p&&__p();if(q.getInitialized())l.warn("FB.init has already been called - this could indicate a problem");if(q.getIsVersioned()){if(Object.prototype.toString.call(w)!=="[object Object]")throw new m("Invalid argument");if(w.authResponse)l.warn("Setting authResponse is not supported");if(!w.version)w.version=new s(location.href).getQueryData().sdk_version;o.assertValidVersion(w.version);q.setVersion(w.version)}else{if(/number|string/.test(typeof w)){l.warn("FB.init called with invalid parameters");w={apiKey:w}}w=ES("Object","assign",false,{status:true},w||{})}var x=u(w.appId||w.apiKey);if(x!==null)q.setClientID(x);if("scope"in w)q.setScope(w.scope);if(w.cookie){q.setUseCookie(true);if(typeof w.cookie==="string")h.setDomain(w.cookie)}if(w.kidDirectedSite)q.setKidDirectedSite(true);q.setInitialized(true);if(t("js_sdk_impression_on_load",true))k.log(115,{});if(r.mBasic())n.init();j.fire("init:post",w)}setTimeout(function(){__p&&__p();var w=/(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;ES(ES("Array","from",false,fb_fif_window.document.getElementsByTagName("script")),"forEach",true,function(x){__p&&__p();if(x.src){var y=w.exec(x.src);if(y){var z=p.decode(y[2]);for(var A in z)if(Object.prototype.hasOwnProperty.call(z,A)){var B=z[A];if(B=="0")z[A]=0}v(z)}}});if(window.fbAsyncInit&&!window.fbAsyncInit.hasRun){window.fbAsyncInit.hasRun=true;i.unguard(window.fbAsyncInit)()}},0);f.exports=v}),null);
__d("legacy:fb.init",["FB","sdk.init"],(function a(b,c,d,e,f,g,h,i){h.provide("",{init:i})}),3);
__d("legacy:fb.ui",["FB","sdk.ui"],(function a(b,c,d,e,f,g,h,i){h.provide("",{ui:i})}),3);
__d("legacy:fb.versioned-sdk",["sdk.Runtime"],(function a(b,c,d,e,f,g,h){h.setIsVersioned(true)}),3);
__d("runOnce",[],(function a(b,c,d,e,f,g){function h(i){var j,k;return function(){if(!j){j=true;k=i()}return k}}f.exports=h}),null);
__d("XFBML",["Assert","sdk.DOM","Log","ObservableMixin","sdk.UA","runOnce"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){__p&&__p();var n={},o={},p=0,q=new k();function r(y,z){return ES(y[z]+"","trim",true)}function s(y){return y.scopeName?y.scopeName+":"+y.nodeName:""}function t(y){return n[r(y,"nodeName").toLowerCase()]||n[s(y).toLowerCase()]}function u(y){var z=ES(r(y,"className").split(/\s+/),"filter",true,function(A){return Object.prototype.hasOwnProperty.call(o,A)});if(z.length===0)return undefined;if(y.getAttribute("fb-xfbml-state")||!y.childNodes||y.childNodes.length===0||y.childNodes.length===1&&y.childNodes[0].nodeType===3||y.children.length===1&&r(y.children[0],"className")==="fb-xfbml-parse-ignore")return o[z[0]]}function v(y){var z={};ES(ES("Array","from",false,y.attributes),"forEach",true,function(A){z[r(A,"name")]=r(A,"value")});return z}function w(y,z,A){var B=document.createElement("div");i.addCss(y,z+"-"+A);ES(ES("Array","from",false,y.childNodes),"forEach",true,function(C){B.appendChild(C)});ES(ES("Array","from",false,y.attributes),"forEach",true,function(C){B.setAttribute(C.name,C.value)});y.parentNode.replaceChild(B,y);return B}function x(y,z,A){__p&&__p();h.isTrue(y&&y.nodeType&&y.nodeType===1&&!!y.getElementsByTagName,"Invalid DOM node passed to FB.XFBML.parse()");h.isFunction(z,"Invalid callback passed to FB.XFBML.parse()");var B=++p;j.info("XFBML Parsing Start %s",B);var C=1,D=0,E=function E(){C--;if(C===0){j.info("XFBML Parsing Finish %s, %s tags found",B,D);z();q.inform("render",B,D)}h.isTrue(C>=0,"onrender() has been called too many times")};ES(ES("Array","from",false,y.getElementsByTagName("*")),"forEach",true,function(G){__p&&__p();if(!A&&G.getAttribute("fb-xfbml-state"))return;if(G.nodeType!==1)return;var H=t(G)||u(G);if(!H)return;if(l.ie()<9&&G.scopeName)G=w(G,H.xmlns,H.localName);C++;D++;var I=new H.ctor(G,H.xmlns,H.localName,v(G));I.subscribe("render",m(function(){G.setAttribute("fb-xfbml-state","rendered");E()}));var J=function J(){if(G.getAttribute("fb-xfbml-state")=="parsed")q.subscribe("render.queue",J);else{G.setAttribute("fb-xfbml-state","parsed");I.process()}};J()});q.inform("parse",B,D);var F=3e4;setTimeout(function(){if(C>0)j.warn("%s tags failed to render in %s ms",C,F)},F);E()}q.subscribe("render",function(){var y=q.getSubscribers("render.queue");q.clearSubscribers("render.queue");ES(y,"forEach",true,function(z){z()})});ES("Object","assign",false,q,{registerTag:function y(z){var A=z.xmlns+":"+z.localName;h.isUndefined(n[A],A+" already registered");n[A]=z;o[z.xmlns+"-"+z.localName]=z},parse:function y(z,A){x(z||document.body,A||function(){},true)},parseNew:function y(){x(document.body,function(){},false)}});f.exports=q}),null);
__d("legacy:fb.xfbml",["Assert","sdk.Event","FB","XFBML","sdk.domReady","sdk.feature","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();j.provide("XFBML",{parse:function p(q){h.maybeXfbml(q,"Invalid argument");if(q&&q.nodeType===9)q=q.body;return k.parse.apply(null,arguments)}});k.subscribe("parse",ES(i.fire,"bind",true,i,"xfbml.parse"));k.subscribe("render",ES(i.fire,"bind",true,i,"xfbml.render"));i.subscribe("init:post",function(p){if(p.xfbml)setTimeout(n(ES(l,"bind",true,null,k.parse),"entry","init:post:xfbml.parse"),0)});h.define("Xfbml",function(p){return(p.nodeType===1||p.nodeType===9)&&typeof p.nodeName==="string"});try{if(document.namespaces&&!document.namespaces.item.fb)document.namespaces.add("fb")}catch(o){}}),3);
__d("IframePlugin",["sdk.Auth","sdk.DOM","sdk.Event","Log","ObservableMixin","sdk.PlatformVersioning","QueryString","sdk.Runtime","Type","sdk.UA","sdk.URI","UrlMap","sdk.XD","sdk.createIframe","sdk.feature","guid","resolveURI"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){__p&&__p();var y={skin:"string",font:"string",width:"string",height:"px",ref:"string",color_scheme:"string"};function z(H,I,J){if(I||I===0)if(I==="100%")H.style.width="100%";else H.style.width=I+"px";if(J||J===0)H.style.height=J+"px"}function A(H){return function(I){var J={width:I.width,height:I.height,pluginID:H};j.fire("xfbml.resize",J)}}var B={string:function H(I){return I},bool:function H(I){return I?/^(?:true|1|yes|on)$/i.test(I):undefined},url:function H(I){return x(I)},url_maybe:function H(I){return I?x(I):I},hostname:function H(I){return I||window.location.hostname},px:function H(I){return/^(\d+)(?:px)?$/.test(I)?parseInt(RegExp.$1,10):undefined},text:function H(I){return I}};function C(H,I){var J=H[I]||H[I.replace(/_/g,"-")]||H[I.replace(/_/g,"")]||H["data-"+I]||H["data-"+I.replace(/_/g,"-")]||H["data-"+I.replace(/_/g,"")]||undefined;return J}function D(H,I,J,K){ES(ES("Object","keys",false,H),"forEach",true,function(L){if(H[L]=="text"&&!J[L]){J[L]=I.textContent||I.innerText||"";I.setAttribute(L,J[L])}K[L]=B[H[L]](C(J,L))})}function E(H){if(H==="100%")return"100%";return H||H==="0"||H===0?parseInt(H,10):undefined}function F(H){if(H)z(H,0,0)}var G=p.extend({constructor:function H(I,J,K,L){__p&&__p();this.parent();K=K.replace(/-/g,"_");var M=C(L,"plugin_id");this.subscribe("xd.resize",A(M));this.subscribe("xd.resize.flow",A(M));this.subscribe("xd.resize.flow",ES(function(R){ES("Object","assign",false,this._iframeOptions.root.style,{verticalAlign:"bottom",overflow:""});z(this._iframeOptions.root,E(R.width),E(R.height));this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.resize",ES(function(R){ES("Object","assign",false,this._iframeOptions.root.style,{verticalAlign:"bottom",overflow:""});z(this._iframeOptions.root,E(R.width),E(R.height));z(this._iframe,E(R.width),E(R.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.resize.iframe",ES(function(R){if(R.reposition==="true"&&v("reposition_iframe",false))this.reposition(E(R.width));z(this._iframe,E(R.width),E(R.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.sdk_event",function(R){var S=ES("JSON","parse",false,R.data);S.pluginID=M;j.fire(R.event,S,I)});var N=s.resolve("www",true)+"/plugins/"+K+".php?",O={};D(this.getParams(),I,L,O);D(y,I,L,O);ES("Object","assign",false,O,{app_id:o.getClientID(),locale:o.getLocale(),sdk:"joey",kid_directed_site:o.getKidDirectedSite(),channel:t.handler(ES(function(R){return this.inform("xd."+R.type,R)},"bind",true,this),"parent.parent",true)});if(this.shouldIgnoreWidth())O.width=void 0;O.container_width=I.offsetWidth;i.addCss(I,"fb_iframe_widget");var P=w();this.subscribe("xd.verify",function(R){t.sendToFacebook(P,{method:"xd/verify",params:ES("JSON","stringify",false,R.token)})});this.subscribe("xd.refreshLoginStatus",ES(function(){h.removeLogoutState();h.getLoginStatus(ES(this.inform,"bind",true,this,"login.status"),true)},"bind",true,this));var Q=document.createElement("span");ES("Object","assign",false,Q.style,{verticalAlign:"top",width:"0px",height:"0px",overflow:"hidden"});this._element=I;this._ns=J;this._tag=K;this._params=O;this._config=this.getConfig();this._iframeOptions={root:Q,url:N+n.encode(O),name:P,width:this._config.mobile_fullsize&&q.mobile()?void 0:O.width||1e3,height:O.height||1e3,style:{border:"none",visibility:"hidden"},title:this._ns+":"+this._tag+" Facebook Social Plugin",onload:ES(function(){return this.inform("render")},"bind",true,this),onerror:ES(function(){return F(this._iframe)},"bind",true,this)};if(this.isFluid()&&O.width!=="auto"){i.addCss(this._element,"fb_iframe_widget_fluid_desktop");if(!O.width&&this._config.full_width){this._element.style.width="100%";this._iframeOptions.root.style.width="100%";this._iframeOptions.style.width="100%";this._params.container_width=this._element.offsetWidth;this._iframeOptions.url=N+n.encode(this._params)}}},shouldIgnoreWidth:function H(){return q.mobile()&&this.getConfig().mobile_fullsize},process:function H(){__p&&__p();if(o.getIsVersioned()){m.assertVersionIsSet();var I=new r(this._iframeOptions.url);this._iframeOptions.url=I.setPath("/"+o.getVersion()+I.getPath()).toString()}var J=ES("Object","assign",false,{},this._params);delete J.channel;var K=n.encode(J);if(this._element.getAttribute("fb-iframe-plugin-query")==K){k.info("Skipping render: %s:%s %s",this._ns,this._tag,K);this.inform("render");return}this._element.setAttribute("fb-iframe-plugin-query",K);this.subscribe("render",ES(function(){this._iframe.style.visibility="visible";if(!this._isIframeResized)F(this._iframe)},"bind",true,this));while(this._element.firstChild)this._element.removeChild(this._element.firstChild);this._element.appendChild(this._iframeOptions.root);var L=q.mobile()?120:45;this._timeoutID=setTimeout(ES(function(){F(this._iframe);k.warn("%s:%s failed to resize in %ss",this._ns,this._tag,L)},"bind",true,this),L*1e3);this._iframe=u(this._iframeOptions);if(q.mobile()||J.width==="auto"){i.addCss(this._element,"fb_iframe_widget_fluid");if(!this._iframeOptions.width){ES("Object","assign",false,this._element.style,{display:"block",width:"100%",height:"auto"});ES("Object","assign",false,this._iframeOptions.root.style,{width:"100%",height:"auto"});var M={height:"auto",position:"static",width:"100%"};if(q.iphone()||q.ipad())ES("Object","assign",false,M,{width:"220px","min-width":"100%"});ES("Object","assign",false,this._iframe.style,M)}}},getConfig:function H(){return{}},isFluid:function H(){var I=this.getConfig();return I.fluid},reposition:function H(I){__p&&__p();var J=i.getPosition(this._iframe).x,K=i.getViewportInfo().width,L=parseInt(i.getStyle(this._iframe,"width"),10),M={};if(J+I>K&&J>I){this._iframe.style.left=parseInt(i.getStyle(this._iframe,"width"),10)-I+"px";this._isRepositioned=true;M.type="reposition"}else if(this._isRepositioned&&L-I!==0){this._iframe.style.left="0px";this._isRepositioned=false;M.type="restore"}else return;t.sendToFacebook(this._iframe.name,{method:"xd/reposition",params:ES("JSON","stringify",false,M)})},updateLift:function H(){var I=this._iframe.style.width===this._iframeOptions.root.style.width&&this._iframe.style.height===this._iframeOptions.root.style.height;i[I?"removeCss":"addCss"](this._iframe,"fb_iframe_widget_lift")}},l);G.getVal=C;G.withParams=function(H,I){return G.extend({getParams:function J(){return H},getConfig:function J(){return I?I:{}}})};f.exports=G}),null);
__d("PluginConfig",["sdk.feature"],(function a(b,c,d,e,f,g,h){var i={comment_embed:{mobile_fullsize:true},messengerpreconfirmation:{mobile_fullsize:true},messengeraccountconfirmation:{mobile_fullsize:true},messengerbusinesslink:{mobile_fullsize:true},messengertoggle:{mobile_fullsize:true},messengermessageus:{mobile_fullsize:true},post:{fluid:h("fluid_embed",false),mobile_fullsize:true},send_to_messenger:{mobile_fullsize:true}};f.exports=i}),null);
__d("PluginTags",[],(function a(b,c,d,e,f,g){var h={comment_embed:{href:"url",include_parent:"bool"},composer:{action_type:"string",action_properties:"string"},create_event_button:{},follow:{href:"url",layout:"string",show_faces:"bool",size:"string"},like:{href:"url",layout:"string",show_faces:"bool",share:"bool",action:"string",send:"bool",size:"string"},like_box:{href:"string",show_faces:"bool",header:"bool",stream:"bool",force_wall:"bool",show_border:"bool",id:"string",connections:"string",profile_id:"string",name:"string"},page:{href:"string",hide_cta:"bool",hide_cover:"bool",small_header:"bool",adapt_container_width:"bool",show_facepile:"bool",show_posts:"bool",tabs:"string"},messenger_checkbox:{messenger_app_id:"string",page_id:"string",pixel_id:"string",prechecked:"bool",allow_login:"bool",size:"string",origin:"string",user_ref:"string",identity_match:"string"},messengerpreconfirmation:{messenger_app_id:"string",page_id:"string"},messengeraccountconfirmation:{messenger_app_id:"string",page_id:"string",state:"string"},messengerbusinesslink:{messenger_app_id:"string",page_id:"string",state:"string"},messengertoggle:{messenger_app_id:"string",page_id:"string",token:"string",psid:"string"},messengermessageus:{messenger_app_id:"string",page_id:"string",color:"string",size:"string"},send_to_messenger:{messenger_app_id:"string",page_id:"string",color:"string",size:"string",enforce_login:"bool",identity_match:"string",origin:"string"},page_events:{href:"url"},post:{href:"url",show_text:"bool"},profile_pic:{uid:"string",linked:"bool",href:"string",size:"string",facebook_logo:"bool"},send:{href:"url",size:"string"},send_to_mobile:{max_rows:"string",show_faces:"bool",size:"string"}},i={subscribe:"follow",fan:"like_box",likebox:"like_box"};ES(ES("Object","keys",false,i),"forEach",true,function(j){h[j]=h[i[j]]});f.exports=h}),null);
__d("sdk.Arbiter",[],(function a(b,c,d,e,f,g){var h={BEHAVIOR_EVENT:"e",BEHAVIOR_PERSISTENT:"p",BEHAVIOR_STATE:"s"};f.exports=h}),null);
__d("sdk.XFBML.Element",["sdk.DOM","Type","ObservableMixin"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k=i.extend({constructor:function l(m){this.parent();this.dom=m},fire:function l(){this.inform.apply(this,arguments)},getAttribute:function l(m,n,o){var p=h.getAttr(this.dom,m);return p?o?o(p):p:n},_getBoolAttribute:function l(m,n){var o=h.getBoolAttr(this.dom,m);return o===null?n:o},_getPxAttribute:function l(m,n){return this.getAttribute(m,n,function(o){var p=parseInt(o,10);return isNaN(p)?n:p})},_getLengthAttribute:function l(m,n){return this.getAttribute(m,n,function(o){if(o==="100%"||o==="auto")return o;var p=parseInt(o,10);return isNaN(p)?n:p})},_getAttributeFromList:function l(m,n,o){return this.getAttribute(m,n,function(p){p=p.toLowerCase();return ES(o,"indexOf",true,p)>-1?p:n})},isValid:function l(){for(var m=this.dom;m;m=m.parentNode)if(m==document.body)return true},clear:function l(){h.html(this.dom,"")}},j);f.exports=k}),null);
__d("sdk.XFBML.IframeWidget",["sdk.Arbiter","sdk.Auth","sdk.Content","sdk.DOM","sdk.Event","sdk.XFBML.Element","guid","insertIframe","QueryString","sdk.Runtime","sdk.ui","UrlMap","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){__p&&__p();var u=m.extend({_iframeName:null,_showLoader:true,_refreshOnAuthChange:false,_allowReProcess:false,_fetchPreCachedLoader:false,_visibleAfter:"load",_widgetPipeEnabled:false,_borderReset:false,_repositioned:false,getUrlBits:function w(){throw new Error("Inheriting class needs to implement getUrlBits().")},setupAndValidate:function w(){return true},oneTimeSetup:function w(){},getSize:function w(){},getIframeName:function w(){return this._iframeName},getIframeTitle:function w(){return"Facebook Social Plugin"},getChannelUrl:function w(){if(!this._channelUrl){var x=this;this._channelUrl=t.handler(function(y){x.fire("xd."+y.type,y)},"parent.parent",true)}return this._channelUrl},getIframeNode:function w(){return this.dom.getElementsByTagName("iframe")[0]},arbiterInform:function w(event,x,y){t.sendToFacebook(this.getIframeName(),{method:event,params:ES("JSON","stringify",false,x||{}),behavior:y||h.BEHAVIOR_PERSISTENT})},_arbiterInform:function w(event,x,y){var z='parent.frames["'+this.getIframeNode().name+'"]';t.inform(event,x,z,y)},getDefaultWebDomain:function w(){return s.resolve("www")},process:function w(x){__p&&__p();if(this._done){if(!this._allowReProcess&&!x)return;this.clear()}else this._oneTimeSetup();this._done=true;this._iframeName=this.getIframeName()||this._iframeName||n();if(!this.setupAndValidate()){this.fire("render");return}if(this._showLoader)this._addLoader();k.addCss(this.dom,"fb_iframe_widget");if(this._visibleAfter!="immediate")k.addCss(this.dom,"fb_hide_iframes");else this.subscribe("iframe.onload",ES(this.fire,"bind",true,this,"render"));var y=this.getSize()||{},z=this.getFullyQualifiedURL();if(y.width=="100%")k.addCss(this.dom,"fb_iframe_widget_fluid");this.clear();o({url:z,root:this.dom.appendChild(document.createElement("span")),name:this._iframeName,title:this.getIframeTitle(),className:q.getRtl()?"fb_rtl":"fb_ltr",height:y.height,width:y.width,onload:ES(this.fire,"bind",true,this,"iframe.onload")});this._resizeFlow(y);this.loaded=false;this.subscribe("iframe.onload",ES(function(){this.loaded=true;if(!this._isResizeHandled)k.addCss(this.dom,"fb_hide_iframes")},"bind",true,this))},generateWidgetPipeIframeName:function w(){v++;return"fb_iframe_"+v},getFullyQualifiedURL:function w(){__p&&__p();var x=this._getURL();x+="?"+p.encode(this._getQS());if(x.length>2e3){x="about:blank";var y=ES(function(){this._postRequest();this.unsubscribe("iframe.onload",y)},"bind",true,this);this.subscribe("iframe.onload",y)}return x},_getWidgetPipeShell:function w(){return s.resolve("www")+"/common/widget_pipe_shell.php"},_oneTimeSetup:function w(){__p&&__p();this.subscribe("xd.resize",ES(this._handleResizeMsg,"bind",true,this));this.subscribe("xd.resize",ES(this._bubbleResizeEvent,"bind",true,this));this.subscribe("xd.resize.iframe",ES(this._resizeIframe,"bind",true,this));this.subscribe("xd.resize.flow",ES(this._resizeFlow,"bind",true,this));this.subscribe("xd.resize.flow",ES(this._bubbleResizeEvent,"bind",true,this));this.subscribe("xd.refreshLoginStatus",function(){i.getLoginStatus(function(){},true)});this.subscribe("xd.logout",function(){r({method:"auth.logout",display:"hidden"},function(){})});if(this._refreshOnAuthChange)this._setupAuthRefresh();if(this._visibleAfter=="load")this.subscribe("iframe.onload",ES(this._makeVisible,"bind",true,this));this.subscribe("xd.verify",ES(function(x){this.arbiterInform("xd/verify",x.token)},"bind",true,this));this.oneTimeSetup()},_makeVisible:function w(){this._removeLoader();k.removeCss(this.dom,"fb_hide_iframes");this.fire("render")},_setupAuthRefresh:function w(){i.getLoginStatus(ES(function(x){var y=x.status;l.subscribe("auth.statusChange",ES(function(x){if(!this.isValid())return;if(y=="unknown"||x.status=="unknown")this.process(true);y=x.status},"bind",true,this))},"bind",true,this))},_handleResizeMsg:function w(x){__p&&__p();if(!this.isValid())return;this._resizeIframe(x);this._resizeFlow(x);if(!this._borderReset){this.getIframeNode().style.border="none";this._borderReset=true}this._isResizeHandled=true;this._makeVisible()},_bubbleResizeEvent:function w(x){var y={height:x.height,width:x.width,pluginID:this.getAttribute("plugin-id")};l.fire("xfbml.resize",y)},_resizeIframe:function w(x){var y=this.getIframeNode();if(x.reposition==="true")this._repositionIframe(x);x.height&&(y.style.height=x.height+"px");x.width&&(y.style.width=x.width+"px")},_resizeFlow:function w(x){var y=this.dom.getElementsByTagName("span")[0];x.height&&(y.style.height=x.height+"px");x.width&&(y.style.width=x.width+"px")},_repositionIframe:function w(x){__p&&__p();var y=this.getIframeNode(),z=parseInt(k.getStyle(y,"width"),10),A=k.getPosition(y).x,B=k.getViewportInfo().width,C=parseInt(x.width,10);if(A+C>B&&A>C){y.style.left=z-C+"px";this.arbiterInform("xd/reposition",{type:"horizontal"});this._repositioned=true}else if(this._repositioned){y.style.left="0px";this.arbiterInform("xd/reposition",{type:"restore"});this._repositioned=false}},_addLoader:function w(){if(!this._loaderDiv){k.addCss(this.dom,"fb_iframe_widget_loader");this._loaderDiv=document.createElement("div");this._loaderDiv.className="FB_Loader";this.dom.appendChild(this._loaderDiv)}},_removeLoader:function w(){if(this._loaderDiv){k.removeCss(this.dom,"fb_iframe_widget_loader");if(this._loaderDiv.parentNode)this._loaderDiv.parentNode.removeChild(this._loaderDiv);this._loaderDiv=null}},_getQS:function w(){return ES("Object","assign",false,{api_key:q.getClientID(),locale:q.getLocale(),sdk:"joey",kid_directed_site:q.getKidDirectedSite(),ref:this.getAttribute("ref")},this.getUrlBits().params)},_getURL:function w(){var x=this.getDefaultWebDomain(),y="";return x+"/plugins/"+y+this.getUrlBits().name+".php"},_postRequest:function w(){j.submitToTarget({url:this._getURL(),target:this.getIframeNode().name,params:this._getQS()})}}),v=0;f.exports=u}),null);
__d("sdk.XFBML.Comments",["sdk.Event","sdk.XFBML.IframeWidget","QueryString","sdk.Runtime","JSSDKConfig","sdk.UA","UrlMap"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();var o=320,p=i.extend({_visibleAfter:"immediate",_refreshOnAuthChange:true,setupAndValidate:function q(){__p&&__p();var r={channel_url:this.getChannelUrl(),colorscheme:this.getAttribute("colorscheme"),skin:this.getAttribute("skin"),numposts:this.getAttribute("num-posts",10),width:this._getLengthAttribute("width"),href:this.getAttribute("href"),permalink:this.getAttribute("permalink"),publish_feed:this.getAttribute("publish_feed"),order_by:this.getAttribute("order_by"),mobile:this._getBoolAttribute("mobile"),version:this.getAttribute("version")};if(!r.width&&!r.permalink)r.width=550;if(l.initSitevars.enableMobileComments&&m.mobile()&&r.mobile!==false)r.mobile=true;if(!r.skin)r.skin=r.colorscheme;if(!r.href){r.migrated=this.getAttribute("migrated");r.xid=this.getAttribute("xid");r.title=this.getAttribute("title",document.title);r.url=this.getAttribute("url",document.URL);r.quiet=this.getAttribute("quiet");r.reverse=this.getAttribute("reverse");r.simple=this.getAttribute("simple");r.css=this.getAttribute("css");r.notify=this.getAttribute("notify");if(!r.xid){var s=ES(document.URL,"indexOf",true,"#");if(s>0)r.xid=encodeURIComponent(document.URL.substring(0,s));else r.xid=encodeURIComponent(document.URL)}if(r.migrated)r.href=n.resolve("www")+"/plugins/comments_v1.php?app_id="+k.getClientID()+"&xid="+encodeURIComponent(r.xid)+"&url="+encodeURIComponent(r.url)}else{var t=this.getAttribute("fb_comment_id");if(!t){t=j.decode(document.URL.substring(ES(document.URL,"indexOf",true,"?")+1)).fb_comment_id;if(t&&ES(t,"indexOf",true,"#")>0)t=t.substring(0,ES(t,"indexOf",true,"#"))}if(t){r.fb_comment_id=t;this.subscribe("render",ES(function(){if(!window.location.hash)window.location.hash=this.getIframeNode().id},"bind",true,this))}}if(!r.version)r.version=k.getVersion();this._attr=r;return true},oneTimeSetup:function q(){this.subscribe("xd.sdk_event",function(r){h.fire(r.event,ES("JSON","parse",false,r.data))})},getSize:function q(){if(!this._attr.permalink)return{width:this._attr.mobile||this._attr.width==="auto"||this._attr.width==="100%"?"100%":Math.max(this._attr.width,o),height:100}},getUrlBits:function q(){return{name:"comments",params:this._attr}},getDefaultWebDomain:function q(){return n.resolve("www",true)}});f.exports=p}),null);
__d("sdk.XFBML.CommentsCount",["ApiClient","sdk.DOM","sdk.XFBML.Element","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k){__p&&__p();var l=j.extend({process:function m(){i.addCss(this.dom,"fb_comments_count_zero");var n=this.getAttribute("href",window.location.href);h.scheduleBatchCall("/v2.1/"+encodeURIComponent(n),{fields:"share"},ES(function(o){var p=o.share&&o.share.comment_count||0;i.html(this.dom,k('<span class="fb_comments_count">%s</span>',p));if(p>0)i.removeCss(this.dom,"fb_comments_count_zero");this.fire("render")},"bind",true,this))}});f.exports=l}),null);
__d("sdk.XFBML.CustomerChat",["sdk.Content","sdk.DialogUtils","sdk.DOM","sdk.Event","IframePlugin","QueryString","sdk.XD","sdk.createIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";__p&&__p();var p=l.extend({constructor:function q(r,s,t,u){__p&&__p();j.addCss(r,"fb_invisible_flow");this.parent(r,s,t,u);k.fire("livechatplugin:loaded");this.subscribe("xd.liveChatPluginGetBubbleIframe",ES(function(v){this._bubbleDialog=this.setupNewIframeDialog(v.fromIframe,ES("JSON","parse",false,v.isHTTPS));h.append(this._bubbleDialog);this.subscribe("xd.liveChatPluginShowBubbleIframe",ES(function(v){j.setStyle(this._bubbleDialog,"display","inline")},"bind",true,this))},"bind",true,this));this.subscribe("xd.liveChatPluginPrepareDesktopAnchorIframe",ES(function(v){if(this._iframe){ES("Object","assign",false,this._iframe.style,{borderRadius:"9pt",bottom:"72pt",boxShadow:"0 3pt 12pt rgba(0, 0, 0, 0.15)",display:ES("JSON","parse",false,v.dialogHidden)?"none":"inline",padding:"0",position:"fixed",right:"18pt",top:"auto",width:"270pt",zIndex:"2147483647"});if(ES("JSON","parse",false,v.chatStarted))ES("Object","assign",false,this._iframe.style,{height:"360pt"})}},"bind",true,this));this.subscribe("xd.liveChatPluginPrepareMobileAnchorIframe",ES(function(v){if(this._iframe){ES("Object","assign",false,this._iframe.style,{display:ES("JSON","parse",false,v.dialogHidden)?"none":"inline",padding:"0",position:"fixed",zIndex:"2147483647"});if(ES("JSON","parse",false,v.chatStarted))ES("Object","assign",false,this._iframe.style,{height:"100%",right:"0",top:"0",width:"100%"});else ES("Object","assign",false,this._iframe.style,{borderRadius:"9pt",bottom:"72pt",boxShadow:"0 3pt 12pt rgba(0, 0, 0, 0.15)",right:"12pt",top:"auto",width:"270pt"})}},"bind",true,this));this.subscribe("xd.liveChatPluginResizeAnchorIframe",ES(function(v){this._iframe&&j.setStyle(this._iframe,"height",ES("JSON","parse",false,v.height)+"px")},"bind",true,this));this.subscribe("xd.liveChatPluginExpandDesktopDialogIframe",ES(function(v){this._iframe&&j.setStyle(this._iframe,"height","360pt")},"bind",true,this));this.subscribe("xd.liveChatPluginExpandMobileDialogIframe",ES(function(v){if(this._iframe){j.setStyle(this._iframe,"border-radius","0");j.setStyle(this._iframe,"height","100%");j.setStyle(this._iframe,"right","0");j.setStyle(this._iframe,"top","0");j.setStyle(this._iframe,"width","100%")}this._setParentDocumentPositionFixed()},"bind",true,this));this.subscribe("xd.liveChatPluginShowDialogIframe",ES(function(v){this._iframe&&j.setStyle(this._iframe,"display","inline");if(ES("JSON","parse",false,v.isMobile)&&ES("JSON","parse",false,v.chatStarted))this._setParentDocumentPositionFixed()},"bind",true,this));this.subscribe("xd.liveChatPluginHideDialogIframe",ES(function(v){if(ES("JSON","parse",false,v.isMobile)&&ES("JSON","parse",false,v.chatStarted))this._resetParentDocumentPosition();this._iframe&&j.setStyle(this._iframe,"display","none")},"bind",true,this));k.subscribe("livechatplugin:loaded",ES(function(){r&&r.parentNode&&r.parentNode.removeChild(r);this._bubbleDialog&&this._bubbleDialog.parentNode&&this._bubbleDialog.parentNode.removeChild(this._bubbleDialog)},"bind",true,this))},setupNewIframeDialog:function q(r,s){var t="#"+m.encode({forIframe:r}),u=i.setupNewDialog();o({url:n.getXDArbiterURL(s)+t,name:"blank_"+this._iframeOptions.name,root:u.contentRoot,tabindex:-1,width:60});ES("Object","assign",false,u.dialogElement.style,{background:"none",borderRadius:"50%",bottom:"18pt",boxShadow:"0 3pt 12pt rgba(0, 0, 0, 0.15)",display:"none",height:"45pt",padding:"0",position:"fixed",right:"18pt",top:"auto",width:"45pt",zIndex:"2147483646"});j.addCss(u.dialogElement,"fb_shrink_active");return u.dialogElement},_setParentDocumentPositionFixed:function q(){this._savedScrollXPosition=window.pageXOffset!==undefined?window.pageXOffset:document.documentElement&&document.documentElement.scrollLeft;this._savedScrollYPosition=window.pageYOffset!==undefined?window.pageYOffset:document.documentElement&&document.documentElement.scrollTop;j.addCss(document.body,"fb_mobile_overlay_active")},_resetParentDocumentPosition:function q(){j.removeCss(document.body,"fb_mobile_overlay_active");window.scrollTo(this._savedScrollXPosition,this._savedScrollYPosition)},getParams:function q(){return{minimized:"bool",page_id:"string"}}});f.exports=p}),null);
__d("safeEval",[],(function a(b,c,d,e,f,g){function h(i,j){if(i===null||typeof i==="undefined")return;if(typeof i!=="string")return i;if(/^\w+$/.test(i)&&typeof window[i]==="function")return window[i].apply(null,j||[]);return Function('return eval("'+i.replace(/\"/g,'\\"')+'");').apply(null,j||[])}f.exports=h}),null);
__d("sdk.Helper",["sdk.ErrorHandling","sdk.Event","UrlMap","safeEval","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m={isUser:function n(o){return o<22e8||o>=1e14&&o<=100099999989999||o>=89e12&&o<=89999999999999||o>=6000001e7&&o<=60000019999999},upperCaseFirstChar:function n(o){if(o.length>0)return o.substr(0,1).toUpperCase()+o.substr(1);else return o},getProfileLink:function n(o,p,q){if(!q&&o)q=l("%s/profile.php?id=%s",j.resolve("www"),o.uid||o.id);if(q)p=l('<a class="fb_link" href="%s">%s</a>',q,p);return p},invokeHandler:function n(o,p,q){if(o)if(typeof o==="string")h.unguard(k)(o,q);else if(o.apply)h.unguard(o).apply(p,q||[])},fireEvent:function n(o,p){var q=p._attr.href;p.fire(o,q);i.fire(o,q,p)},executeFunctionByName:function n(o){var p=Array.prototype.slice.call(arguments,1),q=o.split("."),r=q.pop(),s=window;for(var t=0;t<q.length;t++)s=s[q[t]];return s[r].apply(this,p)}};f.exports=m}),null);
__d("sdk.XFBML.LoginButton",["sdk.Helper","IframePlugin","Log","sdk.ui","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();var m=i.extend({constructor:function n(o,p,q,r){__p&&__p();this.parent(o,p,q,r);var s=i.getVal(r,"on_login"),t=null,u=this._iframeOptions.name;if(s){t=function t(v){if(v.error_code){j.debug("Plugin Return Error (%s): %s",v.error_code,v.error_message||v.error_description);return}h.invokeHandler(s,null,[v])};this.subscribe("login.status",t)}this.subscribe("xd.login_button_dialog_open",function(v){k(ES("JSON","parse",false,v.params),function(w){h.invokeHandler(t,null,[w]);l.sendToFacebook(u,{method:"loginReload",params:ES("JSON","stringify",false,w)})})})},shouldIgnoreWidth:function n(){return false},getParams:function n(){return{scope:"string",perms:"string",size:"string",login_text:"text",show_faces:"bool",max_rows:"string",show_login_face:"bool",registration_url:"url_maybe",auto_logout_link:"bool",one_click:"bool",show_banner:"bool",auth_type:"string",default_audience:"string",use_continue_as:"bool",button_type:"string",width:"px",height:"px"}}});f.exports=m}),null);
__d("escapeHTML",[],(function a(b,c,d,e,f,g){var h=/[&<>\"\'\/]/g,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","/":"&#x2F;"};function j(k){return k.replace(h,function(l){return i[l]})}f.exports=j}),null);
__d("sdk.XFBML.Name",["ApiClient","escapeHTML","sdk.Event","sdk.XFBML.Element","sdk.Helper","Log","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){__p&&__p();var o={}.hasOwnProperty,p=k.extend({process:function q(){__p&&__p();ES("Object","assign",false,this,{_uid:this.getAttribute("uid"),_firstnameonly:this._getBoolAttribute("first-name-only"),_lastnameonly:this._getBoolAttribute("last-name-only"),_possessive:this._getBoolAttribute("possessive"),_reflexive:this._getBoolAttribute("reflexive"),_objective:this._getBoolAttribute("objective"),_linked:this._getBoolAttribute("linked",true),_subjectId:this.getAttribute("subject-id")});if(!this._uid){m.error('"uid" is a required attribute for <fb:name>');this.fire("render");return}var r=[];if(this._firstnameonly)r.push("first_name");else if(this._lastnameonly)r.push("last_name");else r.push("name");if(this._subjectId){r.push("gender");if(this._subjectId==n.getUserID())this._reflexive=true}j.monitor("auth.statusChange",ES(function(){__p&&__p();if(!this.isValid()){this.fire("render");return true}if(!this._uid||this._uid=="loggedinuser")this._uid=n.getUserID();if(!this._uid)return;h.scheduleBatchCall("/v1.0/"+this._uid,{fields:r.join(",")},ES(function(s){if(o.call(s,"error")){m.warn("The name is not found for ID: "+this._uid);return}if(this._subjectId==this._uid)this._renderPronoun(s);else this._renderOther(s);this.fire("render")},"bind",true,this))},"bind",true,this))},_renderPronoun:function q(r){__p&&__p();var s="",t=this._objective;if(this._subjectId){t=true;if(this._subjectId===this._uid)this._reflexive=true}if(this._uid==n.getUserID()&&this._getBoolAttribute("use-you",true))if(this._possessive)if(this._reflexive)s="your own";else s="your";else if(this._reflexive)s="yourself";else s="you";else switch(r.gender){case"male":if(this._possessive)s=this._reflexive?"his own":"his";else if(this._reflexive)s="himself";else if(t)s="him";else s="he";break;case"female":if(this._possessive)s=this._reflexive?"her own":"her";else if(this._reflexive)s="herself";else if(t)s="her";else s="she";break;default:if(this._getBoolAttribute("use-they",true))if(this._possessive)if(this._reflexive)s="their own";else s="their";else if(this._reflexive)s="themselves";else if(t)s="them";else s="they";else if(this._possessive)if(this._reflexive)s="his/her own";else s="his/her";else if(this._reflexive)s="himself/herself";else if(t)s="him/her";else s="he/she";break}if(this._getBoolAttribute("capitalize",false))s=l.upperCaseFirstChar(s);this.dom.innerHTML=s},_renderOther:function q(r){__p&&__p();var s="",t="";if(this._uid==n.getUserID()&&this._getBoolAttribute("use-you",true))if(this._reflexive)if(this._possessive)s="your own";else s="yourself";else if(this._possessive)s="your";else s="you";else if(r){if(null===r.first_name)r.first_name="";if(null===r.last_name)r.last_name="";if(this._firstnameonly&&r.first_name!==undefined)s=i(r.first_name);else if(this._lastnameonly&&r.last_name!==undefined)s=i(r.last_name);if(!s)s=i(r.name);if(s!==""&&this._possessive)s+="'s"}if(!s)s=i(this.getAttribute("if-cant-see","Facebook User"));if(s){if(this._getBoolAttribute("capitalize",false))s=l.upperCaseFirstChar(s);if(r&&this._linked)t=l.getProfileLink(r,s,this.getAttribute("href",null));else t=s}this.dom.innerHTML=t}});f.exports=p}),null);
__d("UnicodeUtils",["invariant"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i=55296,j=56319,k=56320,l=57343,m=/[\uD800-\uDFFF]/;function n(w){return i<=w&&w<=l}function o(w,x){0<=x&&x<w.length||h(0);if(x+1===w.length)return false;var y=w.charCodeAt(x),z=w.charCodeAt(x+1);return i<=y&&y<=j&&k<=z&&z<=l}function p(w){return m.test(w)}function q(w,x){return 1+n(w.charCodeAt(x))}function r(w){if(!p(w))return w.length;var x=0;for(var y=0;y<w.length;y+=q(w,y))x++;return x}function s(w,x,y){__p&&__p();x=x||0;y=y===undefined?Infinity:y||0;if(!p(w))return w.substr(x,y);var z=w.length;if(z<=0||x>z||y<=0)return"";var A=0;if(x>0){for(;x>0&&A<z;x--)A+=q(w,A);if(A>=z)return""}else if(x<0){for(A=z;x<0&&0<A;x++)A-=q(w,A-1);if(A<0)A=0}var B=z;if(y<z)for(B=A;y>0&&B<z;y--)B+=q(w,B);return w.substring(A,B)}function t(w,x,y){x=x||0;y=y===undefined?Infinity:y||0;if(x<0)x=0;if(y<0)y=0;var z=Math.abs(y-x);x=x<y?x:y;return s(w,x,z)}function u(w){var x=[];for(var y=0;y<w.length;y+=q(w,y))x.push(w.codePointAt(y));return x}var v={getCodePoints:u,getUTF16Length:q,hasSurrogateUnit:p,isCodeUnitInSurrogateRange:n,isSurrogatePair:o,strlen:r,substring:t,substr:s};f.exports=v}),null);
__d("isNode",[],(function a(b,c,d,e,f,g){function h(i){var j=i?i.ownerDocument||i:document,k=j.defaultView||window;return!!(i&&(typeof k.Node==="function"?i instanceof k.Node:typeof i==="object"&&typeof i.nodeType==="number"&&typeof i.nodeName==="string"))}f.exports=h}),18);
__d("isTextNode",["isNode"],(function a(b,c,d,e,f,g,h){function i(j){return h(j)&&j.nodeType==3}f.exports=i}),18);
__d("containsNode",["isTextNode"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j,k){__p&&__p();if(!j||!k)return false;else if(j===k)return true;else if(h(j))return false;else if(h(k))return i(j,k.parentNode);else if("contains"in j)return ES(j,"contains",true,k);else if(j.compareDocumentPosition)return!!(j.compareDocumentPosition(k)&16);else return false}f.exports=i}),18);
__d("sdk.XFBML.Quote",["sdk.DOM","DOMEventListener","IframePlugin","UnicodeUtils","sdk.UA","sdk.XD","containsNode","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";__p&&__p();var p="fb-quotable",q=155,r=70,s="",t=null,u=[],v=false,w=null,x=l.mobile();function y(D){var E=D.getRangeAt(0),F=E.startContainer;return F.nodeType===3?F.parentNode:F}function z(D){__p&&__p();if(!document.getSelection||x)return;var E=document.getSelection();if(E.rangeCount===0){B();return}var F=u.length;B();if(F){var G=false;for(var H=0;H<F;H++)if(n(u[H],E.focusNode)){G=true;break}if(!G)return}s=E.toString();if(s===""){B();return}s=ES(s.toString().replace(/\s+/g," "),"trim",true);var I=Number(o("sharequotelimit",500));if(k.strlen(s)>I)s=k.substr(s,0,I-3)+"...";else s=k.substr(s,0,I);if(!v&&w){y(E).appendChild(w);var J=A(E);w.style.left=J.x+"px";w.style.top=J.y+"px"}}function A(D){__p&&__p();var E=w&&w.offsetWidth,F=E?w.offsetHeight:r,G=E?w.offsetWidth:q,H=D.getRangeAt(0),I=document.createElement("span"),J=document.createElement("span"),K=document.createRange();K.setStart(H.startContainer,H.startOffset);K.insertNode(I);var L=document.createRange();L.setStart(H.endContainer,H.endOffset);L.insertNode(J);var M=I.offsetTop-F,N=I.offsetLeft+(J.offsetLeft-I.offsetLeft)/2-G/2;I.parentNode.removeChild(I);J.parentNode.removeChild(J);return{x:N,y:M}}function B(){s="";if(!v&&w)w.style.left="-9999px"}var C=j.extend({constructor:function D(E,F,G,H){__p&&__p();if(t)return t;this.parent(E,F,G,H);v=h.getAttr(E,"layout")==="button";w=E;w.style.position="absolute";w.style.display="";i.add(document,"keyup",z);i.add(document,"mouseup",z);this.subscribe("xd.getTextSelection",ES(function(){m.sendToFacebook(this._iframeOptions.name,{method:"setTextSelection",params:ES("JSON","stringify",false,{text:s})});B()},"bind",true,this));u=ES(ES("Array","from",false,document.getElementsByTagName("*")),"filter",true,function(I){return I.nodeName.toLowerCase()==="article"||h.containsCss(I,p)});B();t=this;return t},getParams:function D(){return{href:"url",layout:"string"}}});f.exports=C}),null);
__d("sdk.XFBML.Save",["sdk.Content","sdk.DialogUtils","sdk.DOM","sdk.Event","IframePlugin","QueryString","sdk.UA","sdk.XD","sdk.createIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";__p&&__p();var q=void 0,r=l.extend({constructor:function s(t,u,v,w){__p&&__p();this.parent(t,u,v,w);var x=n.mobile();this.subscribe("xd.savePluginGetBlankIframe",ES(function(y){__p&&__p();var z=void 0,A=void 0,B=void 0,C=function C(H){if(H)j.removeCss(H,"fb_invisible")},D=function D(H){if(H)j.addCss(H,"fb_invisible")};if(x){z=i.setupNewDarkOverlay();D(z);h.append(z);i.addDoubleClickAction(z,function(){return ES(B,"forEach",true,D)},5e3)}A=this.setupNewIframeDialog(ES("JSON","parse",false,y.data),y.fromIframe,ES("JSON","parse",false,y.isHTTPS));D(A);h.append(A);B=[A,z];var E=function E(){ES(B,"forEach",true,D);i.onDialogHideCleanup(x);clearInterval(q)},F=void 0;this.subscribe("xd.savePluginShowIframe",ES(function(){k.fire("savePlugin:hideDialog");ES(B,"forEach",true,C);this.positionOnScreen(A,z);if(!x&&!F)F=i.addIdleDesktopAction(A,E,7e3)},"bind",true,this));this.subscribe("xd.savePluginHideIframe",function(){return E()});k.subscribe("savePlugin:hideDialog",function(){return E()});var G=setInterval(function(){var H=document.getElementsByName(y.fromIframe);if(H.length===0){clearTimeout(G);E();ES(B,"forEach",true,function(t){t&&t.parentNode.removeChild(t)})}},500)},"bind",true,this))},positionOnScreen:function s(t,u){__p&&__p();var v,w=n.mobile();if(w)(function(){var x=function x(t,u){if(u!=null)i.setDialogPositionToCenter(u,w);i.setDialogPositionToCenter(t,w)};x(t,u);i.addMobileOrientationChangeAction(function(y){x(t,u)});q=setInterval(function(){return x(t,u)},100)})();else{j.setStyle(t,"position","fixed");j.setStyle(t,"top","20px");j.setStyle(t,"right","20px")}},setupNewIframeDialog:function s(t,u,v){__p&&__p();var w="#"+m.encode({forIframe:u}),x=i.setupNewDialog();p({url:o.getXDArbiterURL(v)+w,name:"blank_"+this._iframeOptions.name,root:x.contentRoot,tabindex:-1});j.addCss(x.contentRoot,"fb_dialog_iframe");ES("Object","assign",false,x.dialogElement.style,t.style||{});j.setStyle(x.dialogElement,"width",t.width+"px");j.setStyle(x.dialogElement,"height",t.height+"px");ES(t.classList,"forEach",true,function(y){return j.addCss(x.dialogElement,y)});j.removeCss(x.dialogElement,"fb_dialog_advanced");return x.dialogElement},getParams:function s(){return{uri:"url",url_category:"string",size:"string"}}});f.exports=r}),null);
__d("sdk.XFBML.ShareButton",["IframePlugin","sdk.UA","sdk.ui"],(function a(b,c,d,e,f,g,h,i,j){"use strict";var k=h.extend({constructor:function l(m,n,o,p){this.parent(m,n,o,p);this.subscribe("xd.shareTriggerMobileIframe",function(q){var r=ES("JSON","parse",false,q.data);j({method:"share",href:r.href,mobile_iframe:i.mobile()})})},getParams:function l(){return{href:"url",layout:"string",mobile_iframe:"bool",type:"string",size:"string"}}});f.exports=k}),null);
__d("sdk.XFBML.Video",["Assert","sdk.Event","IframePlugin","ObservableMixin","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l){__p&&__p();function m(p){"use strict";this.$VideoCache1=p.isMuted;this.$VideoCache2=p.volume;this.$VideoCache3=p.timePosition;this.$VideoCache4=p.duration}m.prototype.update=function(p){"use strict";if(p.isMuted!==undefined)this.$VideoCache1=p.isMuted;if(p.volume!==undefined)this.$VideoCache2=p.volume;if(p.timePosition!==undefined)this.$VideoCache3=p.timePosition;if(p.duration!==undefined)this.$VideoCache4=p.duration};m.prototype.isMuted=function(){"use strict";return this.$VideoCache1};m.prototype.getVolume=function(){"use strict";return this.$VideoCache1?0:this.$VideoCache2};m.prototype.getCurrentPosition=function(){"use strict";return this.$VideoCache3};m.prototype.getDuration=function(){"use strict";return this.$VideoCache4};function n(p,q,r){"use strict";this.$VideoController1=p;this.$VideoController2=q;this.$VideoController3=r}n.prototype.play=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"play",params:ES("JSON","stringify",false,{})})};n.prototype.pause=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"pause",params:ES("JSON","stringify",false,{})})};n.prototype.seek=function(p){"use strict";h.isNumber(p,"Invalid argument");l.sendToFacebook(this.$VideoController1,{method:"seek",params:ES("JSON","stringify",false,{target:p})})};n.prototype.mute=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"mute",params:ES("JSON","stringify",false,{})})};n.prototype.unmute=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"unmute",params:ES("JSON","stringify",false,{})})};n.prototype.setVolume=function(p){"use strict";h.isNumber(p,"Invalid argument");l.sendToFacebook(this.$VideoController1,{method:"setVolume",params:ES("JSON","stringify",false,{volume:p})})};n.prototype.isMuted=function(){"use strict";return this.$VideoController3.isMuted()};n.prototype.getVolume=function(){"use strict";return this.$VideoController3.getVolume()};n.prototype.getCurrentPosition=function(){"use strict";return this.$VideoController3.getCurrentPosition()};n.prototype.getDuration=function(){"use strict";return this.$VideoController3.getDuration()};n.prototype.subscribe=function(event,p){"use strict";h.isString(event,"Invalid argument");h.isFunction(p,"Invalid argument");this.$VideoController2.subscribe(event,p);return{release:ES(function(){this.$VideoController2.unsubscribe(event,p)},"bind",true,this)}};var o=j.extend({constructor:function p(q,r,s,t){__p&&__p();this.parent(q,r,s,t);this._videoController=null;this._sharedObservable=null;this._sharedVideoCache=null;this.subscribe("xd.onVideoAPIReady",function(u){this._sharedObservable=new k();this._sharedVideoCache=new m(ES("JSON","parse",false,u.data));this._videoController=new n(this._iframeOptions.name,this._sharedObservable,this._sharedVideoCache);i.fire("xfbml.ready",{type:"video",id:t.id,instance:this._videoController})});this.subscribe("xd.stateChange",function(u){this._sharedObservable.inform(u.state)});this.subscribe("xd.cachedStateUpdateRequest",function(u){this._sharedVideoCache.update(ES("JSON","parse",false,u.data))})},getParams:function p(){return{allowfullscreen:"bool",autoplay:"bool",controls:"bool",href:"url",show_captions:"bool",show_text:"bool"}},getConfig:function p(){return{fluid:true,full_width:true}}});f.exports=o}),null);
__d("legacy:fb.xfbml.plugins",["IframePlugin","PluginConfig","PluginTags","XFBML","sdk.feature","sdk.XFBML.CustomerChat","sdk.XFBML.Comments","sdk.XFBML.CommentsCount","sdk.XFBML.LoginButton","sdk.XFBML.Name","sdk.XFBML.Quote","sdk.XFBML.Save","sdk.XFBML.ShareButton","sdk.XFBML.Video"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m={customerchat:c("sdk.XFBML.CustomerChat"),comments:c("sdk.XFBML.Comments"),comments_count:c("sdk.XFBML.CommentsCount"),login_button:c("sdk.XFBML.LoginButton"),name:c("sdk.XFBML.Name"),quote:c("sdk.XFBML.Quote"),save:c("sdk.XFBML.Save"),share_button:c("sdk.XFBML.ShareButton"),video:c("sdk.XFBML.Video")},n=l("plugin_tags_blacklist",[]);ES(ES("Object","keys",false,j),"forEach",true,function(o){if(ES(n,"indexOf",true,o)!==-1)return;k.registerTag({xmlns:"fb",localName:o.replace(/_/g,"-"),ctor:h.withParams(j[o],i[o])})});ES(ES("Object","keys",false,m),"forEach",true,function(o){if(ES(n,"indexOf",true,o)!==-1)return;k.registerTag({xmlns:"fb",localName:o.replace(/_/g,"-"),ctor:m[o]})})}),3);
    }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src="http:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"3461256","namespace":"FB","message":"'+e.message+'"}}');}