(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SmUIControls"] = factory();
	else
		root["SmUIControls"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/css/dist/emotion-css.development.esm.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@emotion/css/dist/emotion-css.development.esm.js + 16 modules ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  cache: () => (/* binding */ cache),
  css: () => (/* binding */ css),
  cx: () => (/* binding */ cx),
  flush: () => (/* binding */ flush),
  getRegisteredStyles: () => (/* binding */ emotion_css_development_esm_getRegisteredStyles),
  hydrate: () => (/* binding */ hydrate),
  injectGlobal: () => (/* binding */ injectGlobal),
  keyframes: () => (/* binding */ keyframes),
  merge: () => (/* binding */ emotion_css_development_esm_merge),
  sheet: () => (/* binding */ sheet)
});

;// CONCATENATED MODULE: ./node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js
var isDevelopment = true;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  } // this function should always return with a value
  // TS can't understand it though so we make it stop complaining here


  return undefined;
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }

      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    this.tags.forEach(function (tag) {
      var _tag$parentNode;

      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();



;// CONCATENATED MODULE: ./node_modules/stylis/src/Utility.js
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var Utility_assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Tokenizer.js


var line = 1
var column = 1
var Tokenizer_length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return Utility_assign(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function Tokenizer_char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < Tokenizer_length ? charat(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, Tokenizer_length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: append(identifier(position - 1), children)
				break
			case 2: append(delimit(character), children)
				break
			default: append(from(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Enum.js
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'
var LAYER = '@layer'

;// CONCATENATED MODULE: ./node_modules/stylis/src/Serializer.js



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = sizeof(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: element.value = element.props.join(',')
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Prefixer.js



/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch (hash(value, length)) {
		// color-adjust
		case 5103:
			return WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return WEBKIT + value + value
		// tab-size
		case 4789:
			return MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return WEBKIT + value + MOZ + value + MS + value + value
		// writing-mode
		case 5936:
			switch (charat(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return WEBKIT + value + MS + value + value
		// order
		case 6165:
			return WEBKIT + value + MS + 'flex-' + value + value
		// align-items
		case 5187:
			return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/g, '') + (!match(value, /flex-|baseline/) ? MS + 'grid-row-' + replace(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value
		// cursor
		case 6187:
			return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value
		// justify-self
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + 'grid-column-align' + substr(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return MS + replace(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, match(element.props, /grid-\w+-end/) })) {
				return ~indexof(value + (children = children[length].value), 'span') ? value : (MS + replace(value, '-start', '') + value + MS + 'grid-row-span:' + (~indexof(children, 'span') ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ';')
			}
			return MS + replace(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return match(element.props, /grid-\w+-start/) })) ? value : MS + replace(replace(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if (strlen(value) - 1 - length > 6)
				switch (charat(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if (charat(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (MS + a + ':' + b + f) + (c ? (MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if (charat(value, length + 6) === 121)
				return replace(value, ':', ':' + WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return replace(value, ':', ':' + MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return replace(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Middleware.js






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case DECLARATION: element.return = prefix(element.value, element.length, children)
					return
				case KEYFRAMES:
					return serialize([copy(element, {value: replace(element.value, '@', '@' + WEBKIT)})], callback)
				case RULESET:
					if (element.length)
						return combine(element.props, function (value) {
							switch (match(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return serialize([copy(element, {props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return serialize([
										copy(element, {props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]}),
										copy(element, {props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]}),
										copy(element, {props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case RULESET:
			element.props = element.props.map(function (value) {
				return combine(tokenize(value), function (value, index, children) {
					switch (charat(value, 0)) {
						// \f
						case 12:
							return substr(value, 1, strlen(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + substr(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return sizeof(children) > 1 ? '' : value
								case index = sizeof(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}

;// CONCATENATED MODULE: ./node_modules/stylis/src/Parser.js




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous)
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7)
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '')
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next())

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = sizeof(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, from(Tokenizer_char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length)
}

;// CONCATENATED MODULE: ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var weakMemoize = function weakMemoize(func) {
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // Use non-null assertion because we just checked that the cache `has` it
      // This allows us to remove `undefined` from the return value
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};



;// CONCATENATED MODULE: ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}



;// CONCATENATED MODULE: ./node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js





var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (token(character)) {
      break;
    }

    next();
  }

  return slice(begin, position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses) {
      var isNested = !!element.parent; // in nested rules comments become children of the "auto-inserted" rule and that's always the `element.parent`
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? element.parent.children : // global rule at the root level
      children;

      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];

        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version


        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }

          break;
        }
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

/* eslint-disable no-fallthrough */

function emotion_cache_browser_development_esm_prefix(value, length) {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order

    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~indexof(value, 'stretch') ? emotion_cache_browser_development_esm_prefix(replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ':', ':' + WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return WEBKIT + value + MS + value + value;
  }

  return value;
}

var emotion_cache_browser_development_esm_prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case DECLARATION:
      element["return"] = emotion_cache_browser_development_esm_prefix(element.value, element.length);
      break;

    case KEYFRAMES:
      return serialize([copy(element, {
        value: replace(element.value, '@', '@' + WEBKIT)
      })], callback);

    case RULESET:
      if (element.length) return combine(element.props, function (value) {
        switch (match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return serialize([copy(element, {
              props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return serialize([copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var defaultStylisPlugins = [emotion_cache_browser_development_esm_prefixer];

var createCache = function
  /*: EmotionCache */
createCache(options
/*: Options */
) {
  var key = options.key;

  if (!key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node
    /*: HTMLStyleElement */
    ) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  {
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  /* : Node */

  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node
    /*: HTMLStyleElement */
    ) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;
  /*: (
  selector: string,
  serialized: SerializedStyles,
  sheet: StyleSheet,
  shouldCache: boolean
  ) => string | void */


  var omnipresentPlugins = [compat, removeLabel];

  {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stringify, function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } ];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return serialize(compile(styles), serializer);
    };

    _insert = function
      /*: void */
    insert(selector
    /*: string */
    , serialized
    /*: SerializedStyles */
    , sheet
    /*: StyleSheet */
    , shouldCache
    /*: boolean */
    ) {
      currentSheet = sheet;

      if (serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule
          /*: string */
          ) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache
  /*: EmotionCache */
  = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};



;// CONCATENATED MODULE: ./node_modules/@emotion/hash/dist/emotion-hash.esm.js
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}



;// CONCATENATED MODULE: ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};



;// CONCATENATED MODULE: ./node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js




var emotion_serialize_development_esm_isDevelopment = true;

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

{
  var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  var componentSelector = interpolation;

  if (componentSelector.__emotion_styles !== undefined) {
    if (String(componentSelector) === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return componentSelector;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        var keyframes = interpolation;

        if (keyframes.anim === 1) {
          cursor = {
            name: keyframes.name,
            styles: keyframes.styles,
            next: cursor
          };
          return keyframes.name;
        }

        var serializedStyles = interpolation;

        if (serializedStyles.styles !== undefined) {
          var next = serializedStyles.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = serializedStyles.styles + ";";

          if (serializedStyles.map !== undefined) {
            styles += serializedStyles.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (_match, _p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join('\n') + "\n\nYou should wrap it with `css` like this:\n\ncss`" + replaced + "`");
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  var asString = interpolation;

  if (registered == null) {
    return asString;
  }

  var cached = registered[asString];
  return cached !== undefined ? cached : asString;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value !== 'object') {
        var asString = value;

        if (registered != null && registered[asString] !== undefined) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === 'NO_COMPONENT_SELECTOR' && emotion_serialize_development_esm_isDevelopment) {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

{
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;

    if (asTemplateStringsArr[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += asTemplateStringsArr[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      var templateStringsArr = strings;

      if (templateStringsArr[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += templateStringsArr[i];
    }
  }

  var sourceMap;

  {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + match[1];
  }

  var name = murmur2(styles) + identifierName;

  {
    var devStyles = {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
    return devStyles;
  }
}



;// CONCATENATED MODULE: ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser = true;

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};



;// CONCATENATED MODULE: ./node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.development.esm.js




function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var createEmotion = function createEmotion(options) {
  var cache = createCache(options);

  cache.sheet.speedy = function (value) {
    if (this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted');
    }

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered, undefined);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = serializeStyles(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var serialized = serializeStyles(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };

  var cx = function cx() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return merge(cache.registered, css, classnames(args));
  };

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function (key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  };
};

var classnames = function classnames(args) {
  var cls = '';

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};



;// CONCATENATED MODULE: ./node_modules/@emotion/css/dist/emotion-css.development.esm.js





var _createEmotion = createEmotion({
  key: 'css'
}),
    flush = _createEmotion.flush,
    hydrate = _createEmotion.hydrate,
    cx = _createEmotion.cx,
    emotion_css_development_esm_merge = _createEmotion.merge,
    emotion_css_development_esm_getRegisteredStyles = _createEmotion.getRegisteredStyles,
    injectGlobal = _createEmotion.injectGlobal,
    keyframes = _createEmotion.keyframes,
    css = _createEmotion.css,
    sheet = _createEmotion.sheet,
    cache = _createEmotion.cache;




/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/***/ ((module) => {



var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/animate.css/animate.css":
/*!**********************************************!*\
  !*** ./node_modules/animate.css/animate.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/class/BaseComponent/index.ts":
/*!******************************************!*\
  !*** ./src/class/BaseComponent/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class BaseComponent {
    id;
    apiPlayer;
    classes;
    containerElement = null;
    _state;
    initiated = false;
    get state() {
        return (this._state || {});
    }
    set state(value) {
        this._state = value;
        if (this.initiated) {
            this.unregisterListener();
        }
        this.render();
        this.registerListener();
        this.initiated = true;
    }
    constructor(props, initState) {
        const { id, classes, apiPlayer } = props;
        this.id = id;
        this.apiPlayer = apiPlayer;
        this.classes = classes;
        this.containerElement = document.getElementById(id);
        this.state = initState;
    }
    registerListener() {
        // Ex:
        // this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.handleLoaded);
    }
    unregisterListener() {
        // Ex:
        // this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.handleLoaded);
    }
    render() {
        // Ex:
        // if (this.containerElement) {
        //   this.containerElement.innerHTML = `<div></div>`;
        // }
    }
    destroy() {
        this.unregisterListener();
        this.containerElement = null;
    }
}
exports["default"] = BaseComponent;


/***/ }),

/***/ "./src/class/Components/ButtonExitFullScreen/index.ts":
/*!************************************************************!*\
  !*** ./src/class/Components/ButtonExitFullScreen/index.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ButtonExitFullScreen extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.exitFullScreenIcon;
        }
    }
    registerListener() {
        this.containerElement?.addEventListener('click', (event) => this.handleContainerClick(event));
    }
    unregisterListener() {
        // FIXME: this function not working?
        // this.containerElement?.removeEventListener('click', this.handleContainerClick);
    }
    handleContainerClick(event) {
        const { apiPlayer } = this;
        event.preventDefault();
        event.stopPropagation();
        if (apiPlayer.isFullScreen()) {
            apiPlayer.exitFullScreen();
        }
    }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.taskbarGroupBtn;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
}
exports["default"] = ButtonExitFullScreen;


/***/ }),

/***/ "./src/class/Components/ButtonFullScreen/index.ts":
/*!********************************************************!*\
  !*** ./src/class/Components/ButtonFullScreen/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ButtonFullScreen extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.fullScreenIcon;
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
    registerListener() {
        if (!this.containerElement)
            return;
        this.containerElement.onclick = (event) => this.handleContainerClick(event);
    }
    unregisterListener() { }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.taskbarGroupBtn;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
    handleContainerClick = (event) => {
        const { apiPlayer } = this;
        event.preventDefault();
        event.stopPropagation();
        if (apiPlayer.isFullScreen()) {
            apiPlayer.exitFullScreen();
        }
        else {
            apiPlayer.enterFullScreen();
        }
    };
}
exports["default"] = ButtonFullScreen;


/***/ }),

/***/ "./src/class/Components/ButtonMute/index.ts":
/*!**************************************************!*\
  !*** ./src/class/Components/ButtonMute/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ButtonMute extends BaseComponent_1.default {
    handleButtonClick;
    constructor(props) {
        super(props);
        this.handleButtonClick = props.handleButtonClick;
    }
    render() {
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.muteIcon;
            // this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
    registerListener() {
        this.containerElement?.addEventListener('click', (event) => this.handleButtonClick(event));
    }
    unregisterListener() {
        // FIXME: this function not working?
        // this.containerElement?.removeEventListener('click', this.handleContainerClick);
    }
    // handleContainerClick(event: MouseEvent) {
    //   const { apiPlayer } = this;
    //   event.preventDefault();
    //   event.stopPropagation();
    //   apiPlayer.updateVolume(1);
    // }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.taskbarGroupBtn;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
}
exports["default"] = ButtonMute;


/***/ }),

/***/ "./src/class/Components/ButtonPauseSecondary/index.ts":
/*!************************************************************!*\
  !*** ./src/class/Components/ButtonPauseSecondary/index.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
class ButtonPauseSecondary extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.pausedIcon;
        }
    }
    registerListener() {
        // this.containerElement?.addEventListener('click', (event) => this.handleContainerClick(event));
    }
    unregisterListener() {
        // FIXME: this function not working?
        // this.containerElement?.removeEventListener('click', this.handleContainerClick);
    }
    handleContainerClick(event) {
        const { apiPlayer } = this;
        event.preventDefault();
        event.stopPropagation();
        if (!apiPlayer.isPlay()) {
            apiPlayer.play();
        }
    }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.taskbarGroupBtn;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
}
exports["default"] = ButtonPauseSecondary;


/***/ }),

/***/ "./src/class/Components/ButtonPlayPrimary/index.ts":
/*!*********************************************************!*\
  !*** ./src/class/Components/ButtonPlayPrimary/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ButtonPlayPrimary extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.buttonPlayPrimaryEnable);
        }
    }
    registerListener() {
        if (!this.containerElement)
            return;
        this.containerElement.onclick = (event) => this.handleContainerClick(event);
    }
    unregisterListener() { }
    handleContainerClick(event) {
        const { apiPlayer } = this;
        event.preventDefault();
        event.stopPropagation();
        if (!apiPlayer.isPlay()) {
            apiPlayer.play();
        }
    }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.buttonPlayPrimary;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.buttonPlayPrimaryEnable);
        }
    }
}
exports["default"] = ButtonPlayPrimary;


/***/ }),

/***/ "./src/class/Components/ButtonPlaySecondary/index.ts":
/*!***********************************************************!*\
  !*** ./src/class/Components/ButtonPlaySecondary/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ButtonPlaySecondary extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.playIcon;
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
            this.containerElement.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!this.apiPlayer.isPlay()) {
                    this.apiPlayer.play();
                }
            });
        }
    }
    registerListener() {
        const { apiPlayer } = this;
        this.containerElement?.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!apiPlayer.isPlay()) {
                apiPlayer.play();
            }
        });
    }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.taskbarGroupBtn;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
}
exports["default"] = ButtonPlaySecondary;


/***/ }),

/***/ "./src/class/Components/ButtonVolume/index.ts":
/*!****************************************************!*\
  !*** ./src/class/Components/ButtonVolume/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ButtonVolume extends BaseComponent_1.default {
    handleButtonClick;
    constructor(props) {
        super(props);
        this.handleButtonClick = props.handleButtonClick;
    }
    render() {
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.volumeIcon;
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
    registerListener() {
        this.containerElement?.addEventListener('click', (event) => this.handleButtonClick(event));
    }
    unregisterListener() { }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.taskbarGroupBtn;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
        }
    }
}
exports["default"] = ButtonVolume;


/***/ }),

/***/ "./src/class/Components/CurrentTime/index.ts":
/*!***************************************************!*\
  !*** ./src/class/Components/CurrentTime/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/utils.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class CurrentTime extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.containerElement) {
            const timerCurrentTime = this.apiPlayer.getCurrentTime();
            this.containerElement.innerHTML =
                timerCurrentTime && !Number.isNaN(timerCurrentTime) ? `<spam>${(0, utils_1.formatTime)(timerCurrentTime)}</span> ` : '00:00';
        }
    }
    registerListener() { }
    unregisterListener() { }
    hide() { }
    show() { }
}
exports["default"] = CurrentTime;


/***/ }),

/***/ "./src/class/Components/LiveStream/index.ts":
/*!**************************************************!*\
  !*** ./src/class/Components/LiveStream/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class LiveStream extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this;
        if (this.containerElement) {
            this.containerElement.innerHTML =
                this.containerElement.innerHTML = `<div class="${classes.liveStreamDot}"></div><spam>Trực tiếp</span>`;
        }
    }
    registerListener() {
        if (this.containerElement) {
            this.containerElement.addEventListener('click', (e) => {
                console.log('run');
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }
    unregisterListener() { }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = `${this.classes.taskbarLiveStream}`;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarLiveStreamEnable);
        }
    }
}
exports["default"] = LiveStream;


/***/ }),

/***/ "./src/class/Components/SelectVolumeRange/index.ts":
/*!*********************************************************!*\
  !*** ./src/class/Components/SelectVolumeRange/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class SelectVolumeRange extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const volume = this.apiPlayer.getVolume();
        if (this.containerElement) {
            this.containerElement.innerHTML = `<input  id=${constants_1.ids.smInputVolumeRange}
       class="${this.classes.taskbarVolumeSlider}" type="range" min="0" max="1" step="0.01" 
       value=${volume}>
      `;
        }
        this.updateSliderHighlight(volume);
    }
    update(value) {
        const inputVolRangeEle = document.getElementById(constants_1.ids.smInputVolumeRange);
        if (inputVolRangeEle) {
            inputVolRangeEle.value = value.toString();
            inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width', `${value * 100}%`);
        }
    }
    registerListener() {
        const inputVolRangeEle = document.getElementById(constants_1.ids.smInputVolumeRange);
        if (inputVolRangeEle) {
            inputVolRangeEle.addEventListener('input', (event) => {
                const { value } = event.target;
                this.apiPlayer.updateVolume(parseFloat(value));
                this.updateSliderHighlight(parseFloat(value));
            });
        }
    }
    updateSliderHighlight(volume) {
        const percentage = volume * 100;
        const inputVolRangeEle = document.getElementById(constants_1.ids.smInputVolumeRange);
        inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width', `${percentage}%`);
    }
    unregisterListener() { }
    hide = () => {
        const inputVolRangeEle = document.getElementById(constants_1.ids.smInputVolumeRange);
        if (inputVolRangeEle) {
            inputVolRangeEle.className = this.classes.taskbarVolumeSlider;
        }
    };
    show = () => {
        const inputVolRangeEle = document.getElementById(constants_1.ids.smInputVolumeRange);
        if (inputVolRangeEle) {
            inputVolRangeEle.classList.toggle(this.classes.taskbarVolumeSliderEnable);
        }
    };
}
exports["default"] = SelectVolumeRange;


/***/ }),

/***/ "./src/class/Components/SettingIconButton/index.ts":
/*!*********************************************************!*\
  !*** ./src/class/Components/SettingIconButton/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const type_1 = __webpack_require__(/*! ../../../type */ "./src/type.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class SettingIconButton extends BaseComponent_1.default {
    constructor(props) {
        super(props, { visible: false });
        this.handleSettingPanelVisible = this.handleSettingPanelVisible.bind(this);
    }
    render() {
        const { classes } = this;
        const { visible } = this.state;
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.settingIcon;
            this.containerElement.style.display = 'block';
            this.containerElement.className = `${classes.taskbarGroupBtn} ${visible ? classes.taskbarIconActive : ''}`;
        }
    }
    registerListener() {
        if (this.containerElement) {
            this.containerElement.onclick = (event) => this.handleContainerClick(event);
        }
        this.apiPlayer.eventemitter.on(type_1.EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
    }
    unregisterListener() {
        if (!this.containerElement)
            return;
        this.apiPlayer.eventemitter.off(type_1.EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
    }
    handleSettingPanelVisible(event, data) {
        const { visible } = data;
        this.state = { ...this.state, visible };
    }
    handleContainerClick(event) {
        const { apiPlayer } = this;
        event.preventDefault();
        event.stopPropagation();
        apiPlayer.eventemitter.trigger(type_1.EEVentName.SETTING_PANEL_VISIBLE, { visible: !this.state.visible });
    }
}
exports["default"] = SettingIconButton;


/***/ }),

/***/ "./src/class/Components/TimeDuration/index.ts":
/*!****************************************************!*\
  !*** ./src/class/Components/TimeDuration/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(/*! ../../../utils */ "./src/utils.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class TimeDuration extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const timeDuration = this.apiPlayer.getDuration();
        if (this.containerElement) {
            this.containerElement.innerHTML = `/ <spam>${(0, utils_1.formatTime)(timeDuration)}</span>`;
        }
    }
    registerListener() { }
    unregisterListener() { }
    hide() { }
    show() { }
}
exports["default"] = TimeDuration;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/BodyController/SettingsController/index.ts":
/*!*********************************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/BodyController/SettingsController/index.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable no-restricted-globals */
const icons_1 = __webpack_require__(/*! ./../../../../../icons */ "./src/icons.ts");
const constants_1 = __webpack_require__(/*! ../../../../../constants */ "./src/constants.ts");
const type_1 = __webpack_require__(/*! ../../../../../type */ "./src/type.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const autoTrack = { id: -1, label: 'Auto', bandwidth: 0 };
const initState = {
    visible: false,
    playbackRate: 1,
    currentTab: 'default',
    previousTab: 'default',
    tracks: [autoTrack],
    activeTrack: autoTrack,
};
class SettingsController extends BaseComponent_1.default {
    constructor(props) {
        super(props, initState);
        this.handleSettingContainerClickOut = this.handleSettingContainerClickOut.bind(this);
        this.handleQualityChange = this.handleQualityChange.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleSettingPanelVisible = this.handleSettingPanelVisible.bind(this);
    }
    generatePlaybackItemId(index) {
        return `${constants_1.ids.smSettingPlaybackSpeedItemPrefix}-${index}`;
    }
    generateQualityItemId(index) {
        return `${constants_1.ids.smSettingQualityItemPrefix}-${index}`;
    }
    registerListener() {
        const { apiPlayer, state, containerElement } = this;
        const smPlaybackSpeedElement = document.getElementById(constants_1.ids.smPlaybackSpeed);
        const smQualityElement = document.getElementById(constants_1.ids.smQuality);
        const smSettingDetailGoBackIconElement = document.getElementById(constants_1.ids.smSettingDetailGoBackIcon);
        const smSettingDetailTitleElement = document.getElementById(constants_1.ids.smSettingDetailTitle);
        if (smPlaybackSpeedElement) {
            smPlaybackSpeedElement.onclick = (event) => this.goToPlaybackSpeedTab(event);
        }
        if (smQualityElement) {
            smQualityElement.onclick = (event) => this.goToQualityTab(event);
        }
        if (smSettingDetailGoBackIconElement) {
            smSettingDetailGoBackIconElement.onclick = (event) => this.goToTab('default');
        }
        if (smSettingDetailTitleElement) {
            smSettingDetailTitleElement.onclick = (event) => this.goToTab('default');
        }
        PLAYBACK_SPEEDS.forEach((pbrValue, index) => {
            const id = this.generatePlaybackItemId(index);
            const playbackSpeedValueElement = document.getElementById(id);
            if (playbackSpeedValueElement) {
                playbackSpeedValueElement.onclick = (event) => this.changePlaybackRate(pbrValue);
            }
        });
        state?.tracks?.forEach((track, index) => {
            const id = this.generateQualityItemId(index);
            const qualitiesValueElement = document.getElementById(id);
            if (qualitiesValueElement) {
                qualitiesValueElement.onclick = (event) => this.changeQuality(track);
            }
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
        apiPlayer.eventemitter.on(type_1.EEVentName.RATE_CHANGE, this.handleRateChange, this);
        apiPlayer.eventemitter.on(type_1.EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
        if (containerElement) {
            containerElement.onclick = (e) => {
                e.stopPropagation();
            };
            window.addEventListener('click', this.handleSettingContainerClickOut);
        }
    }
    unregisterListener() {
        const { apiPlayer } = this;
        apiPlayer.eventemitter.off(type_1.EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
        apiPlayer.eventemitter.off(type_1.EEVentName.RATE_CHANGE, this.handleRateChange, this);
        apiPlayer.eventemitter.off(type_1.EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
        if (this.containerElement) {
            window.removeEventListener('click', this.handleSettingContainerClickOut);
        }
    }
    goToPlaybackSpeedTab(event) {
        this.state = { ...this.state, currentTab: 'playbackRate' };
    }
    goToQualityTab(event) {
        this.state = { ...this.state, currentTab: 'quality' };
    }
    goToTab(tabName) {
        this.state = { ...this.state, currentTab: tabName };
    }
    changeQuality(track) {
        this.apiPlayer.selectVariantTrack(track);
        this.apiPlayer.eventemitter.trigger(type_1.EEVentName.SETTING_PANEL_VISIBLE, { visible: false });
    }
    handleQualityChange(event, data) {
        const { tracks } = data;
        const isAuto = tracks[tracks.length - 1].active;
        let activeTrack = tracks[tracks.length - 1];
        if (!isAuto) {
            for (let index = 0; index < tracks.length - 1; index += 1) {
                const track = tracks[index];
                if (track.active) {
                    activeTrack = track;
                    break;
                }
            }
        }
        this.state = { ...this.state, tracks, activeTrack };
    }
    changePlaybackRate(value) {
        this.apiPlayer.playbackRate = value;
        this.goToTab('default');
    }
    handleRateChange(event, data) {
        const { playbackRate } = data;
        // playbackRate = 0 is loading...
        if (playbackRate > 0) {
            this.state = { ...this.state, playbackRate };
        }
    }
    handleSettingPanelVisible(event, data) {
        const { visible } = data;
        this.state = { ...this.state, visible, currentTab: 'default' };
    }
    handleSettingContainerClickOut(event) {
        if (this.containerElement?.style.display === 'flex' && event.target !== this.containerElement) {
            this.state = { ...this.state, visible: false };
            this.apiPlayer.eventemitter.trigger(type_1.EEVentName.SETTING_PANEL_VISIBLE, { visible: false });
        }
    }
    renderDefaultTab() {
        const { classes, state } = this;
        const settingItems = [
            {
                title: 'Tốc độ phát',
                id: constants_1.ids.smPlaybackSpeed,
                icon: icons_1.playbackSpeedIcon,
                value: `<div class=${classes.settingItemValue}>
          <div>${state.playbackRate === 1 ? 'Bình thường' : state.playbackRate}</div>
          <div class=${classes.settingItemIconSecondary}>${icons_1.chevronRightIcon}</div>
        </div>`,
            },
            {
                title: 'Chất lượng',
                id: constants_1.ids.smQuality,
                icon: icons_1.qualityIcon,
                value: `<div class=${classes.settingItemValue}>
          <div>${this.getQualityLabel(this.state.activeTrack, this.state.tracks)}</div>
          <div class=${classes.settingItemIconSecondary}>${icons_1.chevronRightIcon}</div>
        </div>`,
            },
        ];
        return settingItems
            .map(({ title, id, icon, value }) => {
            return `<div class=${classes.settingItem} id=${id}>
        <div class=${classes.settingItemIcon}>${icon}</div>
        <div class=${classes.settingItemTitle}>${title}</div>
        <div class=${classes.settingItemValue}>${value}</div>
      </div>`;
        })
            .join('');
    }
    renderPlaybackSpeedTab() {
        const { classes, state } = this;
        const header = `
    <div class=${classes.settingHeader}>
      <div class=${classes.settingItemIcon} id=${constants_1.ids.smSettingDetailGoBackIcon}>${icons_1.chevronLeftIcon}</div>
      <div class=${classes.settingItemTitle} id=${constants_1.ids.smSettingDetailTitle}>Tốc độ phát</div>
    </div>`;
        const body = PLAYBACK_SPEEDS.map((pbrValue, index) => {
            const id = this.generatePlaybackItemId(index);
            const isActive = state.playbackRate === pbrValue;
            return `<div class="${`${classes.settingDetailItem} ${classes.settingItemDivider}`}" id=${id}>
        <div class=${classes.settingItemIcon}>${isActive ? icons_1.checkedIcon : ''}</div>
        <div class=${isActive ? classes.settingTitleActive : classes.settingTitleNormal}>${pbrValue === 1 ? 'Bình thường' : `${pbrValue}`}</div>
      </div>`;
        }).join('');
        return header + body;
    }
    getQualityLabel(track, tracks) {
        if (track.id === -1) {
            return 'Tự dộng';
        }
        const trackHeight = track.height || 0;
        const trackWidth = track.width || 0;
        let height = trackHeight;
        const aspectRatio = trackWidth / trackHeight;
        if (aspectRatio > 16 / 9) {
            height = Math.round((trackWidth * 9) / 16);
        }
        let text = height + 'p';
        if (height == 2160) {
            text = '4K';
        }
        const frameRate = track.frameRate;
        if (frameRate && (frameRate >= 50 || frameRate <= 20)) {
            text += Math.round(track.frameRate || 0);
        }
        if (track.hdr == 'PQ' || track.hdr == 'HLG') {
            text += ' (HDR)';
        }
        if (track.videoLayout == 'CH-STEREO') {
            text += ' (3D)';
        }
        const hasDuplicateResolution = tracks.some((otherTrack) => {
            return otherTrack != track && otherTrack.height == track.height;
        });
        if (hasDuplicateResolution) {
            const bandwidth = track.videoBandwidth || track.bandwidth;
            text += ' (' + Math.round(bandwidth / 1000) + ' kbits/s)';
        }
        return text;
    }
    renderQualityTab() {
        const { classes, state } = this;
        const { tracks } = state;
        const header = `
    <div class=${classes.settingHeader}>
      <div class=${classes.settingItemIcon} id=${constants_1.ids.smSettingDetailGoBackIcon}>${icons_1.chevronLeftIcon}</div>
      <div class=${classes.settingItemTitle} id=${constants_1.ids.smSettingDetailTitle}>Chất lượng</div>
    </div>`;
        const body = tracks
            .map((track, index) => {
            const id = this.generateQualityItemId(index);
            const isActive = track === state.activeTrack;
            const label = this.getQualityLabel(track, tracks);
            return `<div class="${`${classes.settingDetailItem} ${classes.settingItemDivider}`}" id=${id}>
        <div class=${classes.settingItemIcon}>${isActive ? icons_1.checkedIcon : ''}</div>
        <div class=${isActive ? classes.settingTitleActive : classes.settingTitleNormal}>${label}</div>
      </div>`;
        })
            .join('');
        return header + body;
    }
    renderSettingContent() {
        switch (this.state?.currentTab) {
            case 'playbackRate':
                return this.renderPlaybackSpeedTab();
            case 'quality':
                return this.renderQualityTab();
            default:
                return this.renderDefaultTab();
        }
    }
    render() {
        const { classes, state: { visible }, } = this;
        if (this.containerElement) {
            this.containerElement.innerHTML = `<div class=${classes.settingsContent}>
        ${this.renderSettingContent()}
      </div>`;
            this.containerElement.style.display = visible ? 'flex' : 'none';
        }
    }
}
exports["default"] = SettingsController;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/BodyController/index.ts":
/*!**************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/BodyController/index.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const constants_1 = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
const icons_1 = __webpack_require__(/*! ../../../../icons */ "./src/icons.ts");
const type_1 = __webpack_require__(/*! ../../../../type */ "./src/type.ts");
const ButtonPlayPrimary_1 = __webpack_require__(/*! ../../../Components/ButtonPlayPrimary */ "./src/class/Components/ButtonPlayPrimary/index.ts");
const SettingsController_1 = __webpack_require__(/*! ./SettingsController */ "./src/class/Containers/ControllerContainer/BodyController/SettingsController/index.ts");
class BodyController extends BaseComponent_1.default {
    buttonPrimary;
    settingsController;
    constructor(props) {
        const { classes, apiPlayer } = props;
        super(props);
        this.buttonPrimary = new ButtonPlayPrimary_1.default({
            id: constants_1.ids.smButtonPlayPrimary,
            classes,
            apiPlayer,
        });
        this.settingsController = new SettingsController_1.default({
            id: constants_1.ids.smSettingsContainer,
            classes,
            apiPlayer,
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.PLAY, () => {
            if (this.buttonPrimary) {
                this.buttonPrimary.hide();
            }
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.PAUSE, () => {
            if (this.buttonPrimary) {
                this.buttonPrimary.show();
            }
        });
    }
    render() {
        if (this.containerElement) {
            const { classes } = this;
            const htmlString = `
      <div class=${classes.buttonPlayPrimary} id=${constants_1.ids.smButtonPlayPrimary}>
        ${icons_1.playIcon}
      </div>
      <div class=${classes.settingsContainer} id=${constants_1.ids.smSettingsContainer}>
      </div>
      `;
            this.containerElement.innerHTML = htmlString;
        }
    }
    destroy() {
        this.settingsController.destroy();
    }
}
exports["default"] = BodyController;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/FooterController/SeekBarController/index.ts":
/*!**********************************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/FooterController/SeekBarController/index.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class SeekBarController extends BaseComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.containerElement) {
            const htmlString = `<div>SeekBarController</div>`;
            this.containerElement.innerHTML = htmlString;
        }
    }
}
exports["default"] = SeekBarController;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/FooterController/TaskbarController/TimeBarContainer/index.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/FooterController/TaskbarController/TimeBarContainer/index.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ../../../../../../constants */ "./src/constants.ts");
const type_1 = __webpack_require__(/*! ../../../../../../type */ "./src/type.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const CurrentTime_1 = __webpack_require__(/*! ../../../../../Components/CurrentTime */ "./src/class/Components/CurrentTime/index.ts");
const TimeDuration_1 = __webpack_require__(/*! ../../../../../Components/TimeDuration */ "./src/class/Components/TimeDuration/index.ts");
class TimeBarContainer extends BaseComponent_1.default {
    currentTime;
    timeDuration;
    constructor(props) {
        const { classes, apiPlayer } = props;
        super(props);
        this.currentTime = new CurrentTime_1.default({
            id: constants_1.ids.smTimeCurrent,
            classes,
            apiPlayer,
        });
        this.timeDuration = new TimeDuration_1.default({
            id: constants_1.ids.smTimeDuration,
            classes,
            apiPlayer,
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.TIME_UPDATE, () => {
            if (this.currentTime) {
                this.currentTime.render();
            }
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.LOADED_META_DATA, (e, data) => {
            if (this.timeDuration) {
                this.timeDuration.render();
            }
        });
    }
    render() {
        const { classes } = this;
        if (this.containerElement) {
            if (this.containerElement) {
                const htmlString = `<div class=${classes.taskbarTimeCurrent} id=${constants_1.ids.smTimeCurrent}></div>
        <div class=${classes.taskbarTimeDuration} id=${constants_1.ids.smTimeDuration}></div>`;
                this.containerElement.innerHTML = htmlString;
            }
        }
    }
    registerListener() {
        if (this.containerElement) {
            this.containerElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }
    unregisterListener() { }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.taskbarTimeBarContainer;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.taskbarTimeBarContainerEnable);
        }
    }
}
exports["default"] = TimeBarContainer;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/FooterController/TaskbarController/VolumeContainer/index.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/FooterController/TaskbarController/VolumeContainer/index.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ../../../../../../constants */ "./src/constants.ts");
const type_1 = __webpack_require__(/*! ../../../../../../type */ "./src/type.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const ButtonMute_1 = __webpack_require__(/*! ../../../../../Components/ButtonMute */ "./src/class/Components/ButtonMute/index.ts");
const ButtonVolume_1 = __webpack_require__(/*! ../../../../../Components/ButtonVolume */ "./src/class/Components/ButtonVolume/index.ts");
const SelectVolumeRange_1 = __webpack_require__(/*! ../../../../../Components/SelectVolumeRange */ "./src/class/Components/SelectVolumeRange/index.ts");
class VolumeContainer extends BaseComponent_1.default {
    buttonVolume;
    buttonMute;
    selectVolumeRange;
    constructor(props) {
        const { classes, apiPlayer } = props;
        super(props);
        this.buttonVolume = new ButtonVolume_1.default({
            id: constants_1.ids.smButtonVolume,
            classes,
            apiPlayer,
            handleButtonClick: this.handleButtonClick,
        });
        this.buttonMute = new ButtonMute_1.default({
            id: constants_1.ids.smButtonMute,
            classes,
            apiPlayer,
            handleButtonClick: this.handleButtonClick,
        });
        this.selectVolumeRange = new SelectVolumeRange_1.default({
            id: constants_1.ids.smSelectVolumeRange,
            classes,
            apiPlayer,
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.VOLUME_CHANGE, () => {
            const volume = this.apiPlayer.getVolume();
            if (volume <= 0) {
                this.buttonMute?.show();
                this.buttonVolume?.hide();
            }
            else {
                this.buttonMute?.hide();
                this.buttonVolume?.show();
            }
            this.selectVolumeRange?.update(volume);
        });
    }
    handleButtonClick(event) {
        // const { apiPlayer } = this;
        // event.preventDefault();
        // event.stopPropagation();
        // const volume = apiPlayer.getVolume();
        // if (volume > 0) {
        //   apiPlayer.updateVolume(0);
        //   return;
        // }
        // apiPlayer.updateVolume(1);
        console.log('run Button volume Click');
    }
    render() {
        if (this.containerElement) {
            const { classes } = this;
            const htmlString = `<div class=${classes.taskbarGroupBtn} id=${constants_1.ids.smButtonVolume}></div>
      <div class=${classes.taskbarGroupBtn} id=${constants_1.ids.smButtonMute}></div>
        <div class=${classes.smSelectVolumeRangeContainer} id=${constants_1.ids.smSelectVolumeRange}></div>`;
            this.containerElement.innerHTML = htmlString;
        }
    }
    registerListener() {
        if (this.containerElement) {
            this.containerElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            this.containerElement.addEventListener('mouseover', (e) => {
                console.log('run');
                if (this.selectVolumeRange) {
                    this.selectVolumeRange.show();
                }
                e.preventDefault();
                e.stopPropagation();
            });
            this.containerElement.addEventListener('mouseout', (e) => {
                console.log('run');
                if (this.selectVolumeRange) {
                    this.selectVolumeRange.hide();
                }
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }
    unregisterListener() { }
}
exports["default"] = VolumeContainer;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/FooterController/TaskbarController/index.ts":
/*!**********************************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/FooterController/TaskbarController/index.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const type_1 = __webpack_require__(/*! ../../../../../type */ "./src/type.ts");
const ButtonFullScreen_1 = __webpack_require__(/*! ../../../../Components/ButtonFullScreen */ "./src/class/Components/ButtonFullScreen/index.ts");
const constants_1 = __webpack_require__(/*! ../../../../../constants */ "./src/constants.ts");
const ButtonPlaySecondary_1 = __webpack_require__(/*! ../../../../Components/ButtonPlaySecondary */ "./src/class/Components/ButtonPlaySecondary/index.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const ButtonPauseSecondary_1 = __webpack_require__(/*! ../../../../Components/ButtonPauseSecondary */ "./src/class/Components/ButtonPauseSecondary/index.ts");
const ButtonExitFullScreen_1 = __webpack_require__(/*! ../../../../Components/ButtonExitFullScreen */ "./src/class/Components/ButtonExitFullScreen/index.ts");
const SettingIconButton_1 = __webpack_require__(/*! ../../../../Components/SettingIconButton */ "./src/class/Components/SettingIconButton/index.ts");
const VolumeContainer_1 = __webpack_require__(/*! ./VolumeContainer */ "./src/class/Containers/ControllerContainer/FooterController/TaskbarController/VolumeContainer/index.ts");
const TimeBarContainer_1 = __webpack_require__(/*! ./TimeBarContainer */ "./src/class/Containers/ControllerContainer/FooterController/TaskbarController/TimeBarContainer/index.ts");
const LiveStream_1 = __webpack_require__(/*! ../../../../Components/LiveStream */ "./src/class/Components/LiveStream/index.ts");
class TaskbarController extends BaseComponent_1.default {
    buttonFullScreen;
    buttonPlaySecondary;
    buttonPauseSecondary;
    volumeContainer;
    buttonExitFullScreen;
    settingIconButton;
    timeBarContainer;
    liveStream;
    constructor(props) {
        super(props);
        const { classes, apiPlayer } = props;
        this.buttonFullScreen = new ButtonFullScreen_1.default({
            id: constants_1.ids.smButtonFullScreen,
            classes,
            apiPlayer,
        });
        this.buttonPlaySecondary = new ButtonPlaySecondary_1.default({
            id: constants_1.ids.smButtonPlaySecondary,
            classes,
            apiPlayer,
        });
        this.buttonPauseSecondary = new ButtonPauseSecondary_1.default({
            id: constants_1.ids.smButtonPauseSecondary,
            classes,
            apiPlayer,
        });
        this.buttonExitFullScreen = new ButtonExitFullScreen_1.default({
            id: constants_1.ids.smButtonExitFullScreen,
            classes,
            apiPlayer,
        });
        this.settingIconButton = new SettingIconButton_1.default({
            id: constants_1.ids.smSettingIconButton,
            classes,
            apiPlayer,
        });
        this.volumeContainer = new VolumeContainer_1.default({
            id: constants_1.ids.smVolumeContainer,
            classes,
            apiPlayer,
        });
        this.liveStream = new LiveStream_1.default({
            id: constants_1.ids.smTaskbarLiveStream,
            classes,
            apiPlayer,
        });
        this.timeBarContainer = new TimeBarContainer_1.default({
            id: constants_1.ids.smTimeBarContainer,
            classes,
            apiPlayer,
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.PLAY, () => {
            if (this.buttonPauseSecondary) {
                this.buttonPauseSecondary.show();
            }
            if (this.buttonPlaySecondary) {
                this.buttonPlaySecondary.hide();
            }
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.PAUSE, () => {
            if (this.buttonPauseSecondary) {
                this.buttonPauseSecondary.hide();
            }
            if (this.buttonPlaySecondary) {
                this.buttonPlaySecondary.show();
            }
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.LOADED, () => {
            // this.show();
            if (this.buttonPlaySecondary) {
                this.buttonPlaySecondary.show();
            }
            if (this.buttonPauseSecondary) {
                this.buttonPauseSecondary.hide();
            }
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.FULL_SCREEN_CHANGE, () => {
            if (this.apiPlayer.isFullScreen()) {
                if (this.buttonExitFullScreen) {
                    this.buttonExitFullScreen.show();
                }
                if (this.buttonFullScreen) {
                    this.buttonFullScreen.hide();
                }
            }
            else {
                if (this.buttonExitFullScreen) {
                    this.buttonExitFullScreen.hide();
                }
                if (this.buttonFullScreen) {
                    this.buttonFullScreen.show();
                }
            }
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.LOADED, () => {
            const isLive = this.apiPlayer.isLive();
            if (isLive) {
                if (this.liveStream) {
                    this.liveStream.show();
                }
                if (this.timeBarContainer) {
                    this.timeBarContainer.hide();
                }
            }
            else {
                if (this.liveStream) {
                    this.liveStream.hide();
                }
                if (this.timeBarContainer) {
                    this.timeBarContainer.show();
                }
            }
        });
    }
    render() {
        if (this.containerElement) {
            const { classes } = this;
            const htmlString = `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${constants_1.ids.smButtonPlaySecondary}></div>
      <div class=${classes.taskbarGroupBtn} id=${constants_1.ids.smButtonPauseSecondary}></div>
      <div class=${classes.taskbarVolumeContainer} id=${constants_1.ids.smVolumeContainer}></div>
     <div class=${classes.taskbarTimeBarContainer} id=${constants_1.ids.smTimeBarContainer}></div>
     <div class=${classes.taskbarLiveStream} id=${constants_1.ids.smTaskbarLiveStream}></div>
  </div>
  <div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${constants_1.ids.smSettingIconButton}></div>
      <div class=${classes.taskbarGroupBtn} id=${constants_1.ids.smButtonFullScreen}></div>
      <div class=${classes.taskbarGroupBtn} id=${constants_1.ids.smButtonExitFullScreen}></div>
  </div>`;
            this.containerElement.innerHTML = htmlString;
        }
    }
}
exports["default"] = TaskbarController;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/FooterController/index.ts":
/*!****************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/FooterController/index.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const constants_1 = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
const SeekBarController_1 = __webpack_require__(/*! ./SeekBarController */ "./src/class/Containers/ControllerContainer/FooterController/SeekBarController/index.ts");
const TaskbarController_1 = __webpack_require__(/*! ./TaskbarController */ "./src/class/Containers/ControllerContainer/FooterController/TaskbarController/index.ts");
class FooterController extends BaseComponent_1.default {
    seekBarController;
    taskbarController;
    constructor(props) {
        const { classes, apiPlayer } = props;
        super(props);
        this.seekBarController = new SeekBarController_1.default({
            id: constants_1.ids.smSeekBarController,
            classes,
            apiPlayer,
        });
        this.taskbarController = new TaskbarController_1.default({
            id: constants_1.ids.smTaskbarController,
            classes,
            apiPlayer,
        });
    }
    render() {
        if (this.containerElement) {
            const { classes } = this;
            const htmlString = `<div class=${classes.seekBarController} id=${constants_1.ids.smSeekBarController}></div>
      <div class=${classes.taskbarController} id=${constants_1.ids.smTaskbarController}></div>`;
            this.containerElement.innerHTML = htmlString;
        }
    }
}
exports["default"] = FooterController;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/HeadController/index.ts":
/*!**************************************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/HeadController/index.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const type_1 = __webpack_require__(/*! ../../../../type */ "./src/type.ts");
class HeadController extends BaseComponent_1.default {
    videoInfo;
    constructor(props) {
        const { videoInfo, ...baseProps } = props;
        super(baseProps);
        this.videoInfo = videoInfo;
        baseProps.apiPlayer.eventemitter.on(type_1.EEVentName.LOADED, () => {
            this.render();
        });
    }
    render() {
        if (this.containerElement) {
            const videoName = this.videoInfo?.name ?? '';
            const { classes } = this;
            const htmlString = `${videoName && `<p class=${classes.headControllerTitle}>${videoName}</p>`}`;
            this.containerElement.innerHTML = htmlString;
        }
    }
}
exports["default"] = HeadController;


/***/ }),

/***/ "./src/class/Containers/ControllerContainer/index.ts":
/*!***********************************************************!*\
  !*** ./src/class/Containers/ControllerContainer/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const HeadController_1 = __webpack_require__(/*! ./HeadController */ "./src/class/Containers/ControllerContainer/HeadController/index.ts");
const BodyController_1 = __webpack_require__(/*! ./BodyController */ "./src/class/Containers/ControllerContainer/BodyController/index.ts");
const FooterController_1 = __webpack_require__(/*! ./FooterController */ "./src/class/Containers/ControllerContainer/FooterController/index.ts");
const constants_1 = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
const type_1 = __webpack_require__(/*! ../../../type */ "./src/type.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ControllerContainer extends BaseComponent_1.default {
    headController;
    bodyController;
    footerController;
    constructor(props) {
        const { classes, videoInfo, apiPlayer } = props;
        super(props);
        this.headController = new HeadController_1.default({ id: constants_1.ids.smHeadController, classes, videoInfo, apiPlayer });
        this.bodyController = new BodyController_1.default({ id: constants_1.ids.smBodyController, classes, apiPlayer });
        this.footerController = new FooterController_1.default({ id: constants_1.ids.smFooterController, classes, apiPlayer });
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    render() {
        const { classes } = this;
        const htmlContentString = `
      <div class=${classes.headController} id=${constants_1.ids.smHeadController}></div>
      <div class=${classes.bodyController} id=${constants_1.ids.smBodyController}></div>
      <div class=${classes.footerController} id=${constants_1.ids.smFooterController}></div>
     `;
        if (this.containerElement) {
            this.containerElement.innerHTML = htmlContentString;
        }
    }
    registerListener() {
        this.containerElement?.addEventListener('click', (event) => this.handleClickContainer(event));
        this.apiPlayer.eventemitter.on(type_1.EEVentName.LOADED, this.show, this);
        this.apiPlayer.eventemitter.on(type_1.EEVentName.ERROR, this.hide, this);
    }
    unregisterListener() {
        this.apiPlayer.eventemitter.off(type_1.EEVentName.LOADED, this.show, this);
        this.apiPlayer.eventemitter.off(type_1.EEVentName.ERROR, this.hide, this);
    }
    handleClickContainer = (event) => {
        const { apiPlayer } = this;
        event.preventDefault();
        // FIXME: do not use this method.
        // event.stopPropagation();
        if (apiPlayer.isPlay()) {
            apiPlayer.pause();
        }
        else {
            apiPlayer.play();
        }
    };
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.controllerContent;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.controllerContentEnable);
        }
    }
}
exports["default"] = ControllerContainer;


/***/ }),

/***/ "./src/class/Containers/ErrorContainer/index.ts":
/*!******************************************************!*\
  !*** ./src/class/Containers/ErrorContainer/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const type_1 = __webpack_require__(/*! ../../../type */ "./src/type.ts");
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
class ErrorContainer extends BaseComponent_1.default {
    constructor(props) {
        const { apiPlayer } = props;
        super(props);
        apiPlayer.eventemitter.on(type_1.EEVentName.LOADED, () => {
            this.hide();
        });
        apiPlayer.eventemitter.on(type_1.EEVentName.ERROR, (event, data) => {
            if (data) {
                this.show(data);
            }
        });
    }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.errorContainer;
        }
    }
    show = (data) => {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.loadingContainerEnable);
            const htmlString = this.generateHtml(data);
            this.containerElement.innerHTML = htmlString;
        }
    };
    generateHtml = (dataEvent) => {
        const htmlString = `<div class="${this.classes.errorIconWrap}">
        ${icons_1.infoIcon}
    </div>
    <div class="${this.classes.flexColumnStartCenter}">
      <h2 style="margin:0px">${dataEvent.data.errorCode}</h2>
      <h3 style="margin:0px">${dataEvent.data.message}</h3>
    </div>
    `;
        return htmlString;
    };
}
exports["default"] = ErrorContainer;


/***/ }),

/***/ "./src/class/Containers/LoadingContainer/index.ts":
/*!********************************************************!*\
  !*** ./src/class/Containers/LoadingContainer/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseComponent_1 = __webpack_require__(/*! ../../BaseComponent */ "./src/class/BaseComponent/index.ts");
const icons_1 = __webpack_require__(/*! ../../../icons */ "./src/icons.ts");
const type_1 = __webpack_require__(/*! ../../../type */ "./src/type.ts");
class LoadingContainer extends BaseComponent_1.default {
    constructor(props) {
        const { apiPlayer } = props;
        super(props);
        apiPlayer.eventemitter.on(type_1.EEVentName.LOADED, () => this.hide());
        apiPlayer.eventemitter.on(type_1.EEVentName.ERROR, () => this.hide());
    }
    render() {
        this.containerElement?.classList.add(this.classes.loadingContainerEnable);
        if (this.containerElement) {
            this.containerElement.innerHTML = icons_1.loadingIcon;
        }
    }
    hide() {
        if (this.containerElement) {
            this.containerElement.className = this.classes.errorContainer;
        }
    }
    show() {
        if (this.containerElement) {
            this.containerElement.classList.add(this.classes.loadingContainerEnable);
        }
    }
}
exports["default"] = LoadingContainer;


/***/ }),

/***/ "./src/class/SmApiPlayer/index.ts":
/*!****************************************!*\
  !*** ./src/class/SmApiPlayer/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertDataEventLoadedMetaData = exports.convertDataEventFullScreenChange = exports.convertDataEventPause = exports.convertDataEventTimeUpdate = exports.convertDataEventVolumeChange = exports.convertDataEventPlay = exports.convertDataEventError = exports.convertDataEventLoaded = void 0;
/* eslint-disable no-restricted-properties */
const constants_1 = __webpack_require__(/*! ../../constants */ "./src/constants.ts");
const type_1 = __webpack_require__(/*! ../../type */ "./src/type.ts");
const SmEventEmitter_1 = __webpack_require__(/*! ../SmEventEmitter/SmEventEmitter */ "./src/class/SmEventEmitter/SmEventEmitter.ts");
class SmApiPlayer {
    player;
    video;
    typePlayer;
    version;
    eventemitter;
    constructor(props) {
        this.player = props.player;
        this.video = props.video;
        this.typePlayer = props.typePlayer;
        this.version = props.version;
        this.eventemitter = new SmEventEmitter_1.default();
        this.emitTracksChangeEvent = this.emitTracksChangeEvent.bind(this);
        this.emitRateChange = this.emitRateChange.bind(this);
        this.registerListener();
    }
    registerListener() {
        const { player } = this;
        player.addEventListener('adaptation', this.emitTracksChangeEvent);
        player.addEventListener('variantchanged', this.emitTracksChangeEvent);
        player.addEventListener('abrstatuschanged', this.emitTracksChangeEvent);
        player.addEventListener('trackschanged', this.emitTracksChangeEvent);
        this.video?.addEventListener('ratechange', this.emitRateChange);
    }
    unregisterListener() {
        const { player } = this;
        player.addEventListener('adaptation', this.emitTracksChangeEvent);
        player.addEventListener('variantchanged', this.emitTracksChangeEvent);
        player.addEventListener('abrstatuschanged', this.emitTracksChangeEvent);
        player.addEventListener('trackschanged', this.emitTracksChangeEvent);
        this.video?.removeEventListener('ratechange', this.emitRateChange);
    }
    getVariantTracks() {
        const tracks = this.player.getVariantTracks();
        const selectedTrack = tracks.find((track) => track.active);
        let filteredTracks = tracks;
        if (selectedTrack) {
            filteredTracks = tracks.filter((track) => track.language === selectedTrack.language && track.channelsCount === selectedTrack.channelsCount);
        }
        filteredTracks = filteredTracks.filter((track, idx) => {
            const otherIdx = this.player.isAudioOnly()
                ? filteredTracks.findIndex((t) => t.bandwidth === track.bandwidth)
                : filteredTracks.findIndex((t) => t.height === track.height);
            return otherIdx === idx;
        });
        if (this.player.isAudioOnly()) {
            filteredTracks.sort((t1, t2) => t2.bandwidth - t1.bandwidth);
        }
        else {
            filteredTracks.sort((t1, t2) => t2.height - t1.height);
        }
        const isAuto = this.player.getConfiguration().abr.enabled;
        const autoTrack = {
            id: -1,
            label: 'Auto',
            bandwidth: 0,
            active: isAuto,
        };
        return { tracks: [...filteredTracks, autoTrack] };
    }
    selectVariantTrack(track) {
        if (track.id === -1) {
            // Enable ABR (Adaptive Bitrate)
            this.player.configure({ abr: { enabled: true } });
        }
        else {
            this.player.configure({ abr: { enabled: false } });
            this.player.selectVariantTrack(track, /* clearBuffer= */ true);
        }
    }
    emitTracksChangeEvent() {
        const data = this.getVariantTracks();
        this.eventemitter.trigger(type_1.EEVentName.TRACKS_CHANGED, data);
    }
    emitRateChange() {
        const playbackRate = this.video?.playbackRate || 0;
        this.eventemitter.trigger(type_1.EEVentName.RATE_CHANGE, { playbackRate });
    }
    play() {
        const { video } = this;
        return video?.play();
    }
    pause() {
        const { video } = this;
        video?.pause();
    }
    isPlay() {
        const { video } = this;
        if (video) {
            return !video.paused;
        }
        return false;
    }
    isFullScreen() {
        const isFullscreen = document.fullscreenElement;
        if (isFullscreen) {
            return true;
        }
        else {
            return false;
        }
    }
    enterFullScreen() {
        const { video } = this;
        if (video) {
            const videoContainer = video.parentElement;
            if (videoContainer) {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                }
                else if (videoContainer.mozRequestFullScreen) {
                    // Firefox
                    videoContainer.mozRequestFullScreen();
                }
                else if (videoContainer.webkitRequestFullscreen) {
                    // Chrome, Safari and Opera
                    videoContainer.webkitRequestFullscreen();
                }
                else if (videoContainer.msRequestFullscreen) {
                    // IE/Edge
                    videoContainer.msRequestFullscreen();
                }
            }
        }
    }
    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    set playbackRate(value) {
        if (this.video) {
            this.video.playbackRate = value;
        }
    }
    get playbackRate() {
        return this.video?.playbackRate || 1;
    }
    updateVolume(value) {
        const { video } = this;
        if (video) {
            return (video.volume = value);
        }
    }
    getVolume() {
        const { video } = this;
        if (video) {
            return video.volume;
        }
        return 0;
    }
    getDuration() {
        const { video } = this;
        if (video) {
            return video.duration;
        }
        return 0;
    }
    getCurrentTime() {
        const { video } = this;
        if (video) {
            return video.currentTime;
        }
        return 0;
    }
    isLive() {
        const { player } = this;
        return player?.isLive();
    }
    addEventListener(evtName, clb, context) {
        const { typePlayer, video, player, version } = this;
        if (typePlayer === constants_1.ETypePlayer.SHAKA) {
            switch (evtName) {
                case type_1.EEVentName.PLAY:
                    video?.addEventListener(evtName, (data) => {
                        const dataConvert = (0, exports.convertDataEventPlay)(data);
                        clb.call(context, dataConvert);
                    });
                    break;
                case type_1.EEVentName.PAUSE:
                    video?.addEventListener(evtName, (data) => {
                        const dataConvert = (0, exports.convertDataEventPause)(data);
                        clb.call(context, dataConvert);
                    });
                    break;
                case type_1.EEVentName.LOADED:
                    // TODO: check api version document
                    if (version) {
                        //check version
                    }
                    player.addEventListener(evtName, (data) => {
                        const dataConvert = (0, exports.convertDataEventLoaded)(data);
                        clb.call(context, dataConvert);
                    });
                    break;
                case type_1.EEVentName.ERROR:
                    player.addEventListener(evtName, (data) => {
                        const dataConvert = (0, exports.convertDataEventError)(data);
                        clb.call(context, dataConvert);
                    });
                    break;
                case type_1.EEVentName.FULL_SCREEN_CHANGE:
                    document.addEventListener(evtName, (data) => {
                        const dataConvert = (0, exports.convertDataEventFullScreenChange)(data);
                        clb.call(context, dataConvert);
                    });
                    break;
                case type_1.EEVentName.ADAPTATION:
                case type_1.EEVentName.TRACKS_CHANGED:
                case type_1.EEVentName.ABR_STATUS_CHANGED:
                case type_1.EEVentName.VARIANT_CHANGED:
                    player.addEventListener(evtName, (data) => {
                        clb.call(context, data);
                    });
                    break;
                case type_1.EEVentName.VOLUME_CHANGE:
                    if (video) {
                        video.addEventListener(evtName, (data) => {
                            const dataConvert = (0, exports.convertDataEventVolumeChange)(data);
                            clb.call(context, dataConvert);
                        });
                    }
                    break;
                case type_1.EEVentName.TIME_UPDATE:
                    if (video) {
                        video.addEventListener(evtName, (data) => {
                            const dataConvert = (0, exports.convertDataEventTimeUpdate)(data);
                            clb.call(context, dataConvert);
                        });
                    }
                    break;
                case type_1.EEVentName.LOADED_META_DATA:
                    if (video) {
                        video.addEventListener(evtName, (data) => {
                            const dataConvert = (0, exports.convertDataEventLoadedMetaData)(data);
                            clb.call(context, dataConvert);
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }
    removeEventListener(evtName, clb, context) {
        const { player, typePlayer } = this;
        if (typePlayer === constants_1.ETypePlayer.SHAKA) {
            switch (evtName) {
                case type_1.EEVentName.LOADED:
                    player.removeEventListener(evtName, clb, context);
                    break;
                case type_1.EEVentName.ERROR:
                    player.removeEventListener(evtName, clb, context);
                    break;
                default:
                    player.removeEventListener(evtName, clb, context);
                    break;
            }
        }
    }
    destroy() {
        this.unregisterListener();
        this.eventemitter.removeAllListeners();
    }
}
exports["default"] = SmApiPlayer;
const convertDataEventLoaded = (data) => {
    return {
        event: type_1.EEVentName.LOADED,
        data: {
            ...data,
        },
    };
};
exports.convertDataEventLoaded = convertDataEventLoaded;
const convertDataEventError = (data) => {
    return {
        event: type_1.EEVentName.ERROR,
        data: {
            errorCode: data.detail.code,
            message: data.detail.message,
        },
    };
};
exports.convertDataEventError = convertDataEventError;
const convertDataEventPlay = (data) => {
    return {
        event: type_1.EEVentName.PLAY,
        data: {
            ...data,
        },
    };
};
exports.convertDataEventPlay = convertDataEventPlay;
const convertDataEventVolumeChange = (data) => {
    return {
        event: type_1.EEVentName.VARIANT_CHANGED,
        data: {
            ...data,
        },
    };
};
exports.convertDataEventVolumeChange = convertDataEventVolumeChange;
const convertDataEventTimeUpdate = (data) => {
    return {
        event: type_1.EEVentName.TIME_UPDATE,
        data: {
            ...data,
        },
    };
};
exports.convertDataEventTimeUpdate = convertDataEventTimeUpdate;
const convertDataEventPause = (data) => {
    return {
        event: type_1.EEVentName.PAUSE,
        data: {
            ...data,
        },
    };
};
exports.convertDataEventPause = convertDataEventPause;
const convertDataEventFullScreenChange = (data) => {
    return {
        event: type_1.EEVentName.FULL_SCREEN_CHANGE,
        data: {
            ...data,
        },
    };
};
exports.convertDataEventFullScreenChange = convertDataEventFullScreenChange;
const convertDataEventLoadedMetaData = (data) => {
    return {
        event: type_1.EEVentName.LOADED_META_DATA,
        data: {
            ...data,
        },
    };
};
exports.convertDataEventLoadedMetaData = convertDataEventLoadedMetaData;


/***/ }),

/***/ "./src/class/SmEventEmitter/SmEventEmitter.ts":
/*!****************************************************!*\
  !*** ./src/class/SmEventEmitter/SmEventEmitter.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
class SmEventEmitter {
    eventEmitter = new eventemitter3_1.EventEmitter();
    on(event, listener, context) {
        this.eventEmitter.on(event, listener, context);
    }
    once(event, listener, context) {
        this.eventEmitter.once(event, listener, context);
    }
    removeAllListeners(event) {
        this.eventEmitter.removeAllListeners(event);
    }
    off(event, listener, context, once) {
        this.eventEmitter.off(event, listener, context, once);
    }
    listeners(event) {
        return this.eventEmitter.listeners(event);
    }
    emit(event, name, eventObject) {
        return this.eventEmitter.emit(event, name, eventObject);
    }
    trigger(event, eventObject) {
        return this.emit(event, event, eventObject);
    }
    listenerCount(event) {
        return this.eventEmitter.listenerCount(event);
    }
}
exports["default"] = SmEventEmitter;


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.primaryColorDef = exports.typePlayerDef = exports.ETypePlayer = exports.versionDef = exports.ids = void 0;
exports.ids = {
    smControllerContainer: 'sm-controller-container',
    smControllerContent: 'sm-controller-content',
    smLoading: 'sm-loading',
    smError: 'sm-error',
    smHeadController: 'sm-head-controller',
    smBodyController: 'sm-body-controller',
    smButtonPlayPrimary: 'sm-button-play-primary',
    smSettingsContainer: 'sm-settings-container',
    smSettingsContainerMask: 'sm-settings-container-mask',
    smSettingDetailTitle: 'sm-settings-detail-title',
    smSettingDetailGoBackIcon: 'sm-settings-detail-go-back-icon',
    smSettingPlaybackSpeedItemPrefix: 'sm-settings-playback-speed-item',
    smSettingQualityItemPrefix: 'sm-settings-quality-item',
    smFooterController: 'sm-footer-controller',
    smTaskbarController: 'sm-taskbar-controller',
    smSeekBarController: 'sm-seek-bar-controller',
    smButtonFullScreen: 'sm-button-full-screen',
    smButtonPlaySecondary: 'sm-button-play-secondary',
    smButtonPauseSecondary: 'sm-button-pause-secondary',
    smButtonForward: 'sm-button-forward',
    smButtonReply: 'sm-button-reply',
    smButtonExitFullScreen: 'sm-button-exit-full-screen',
    smButtonVolume: 'sm-button-volume',
    smButtonMute: 'sm-button-mute',
    smSelectVolumeRange: 'sm-select-volume-range',
    smInputVolumeRange: 'sm-input-volume-range',
    smVolumeContainer: 'sm-volume-container',
    smPlaybackSpeed: 'sm-playback-rate-controller',
    smQuality: 'sm-quality-controller',
    smSettingIconButton: 'sm-setting-icon-button',
    smTimeBarContainer: 'sm-time-bar-container',
    smTaskbarLiveStream: 'sm-taskbar-live-stream',
    smTimeCurrent: 'sm-time-current',
    smTimeDuration: 'sm-time-duration',
};
exports.versionDef = '4.10.0';
var ETypePlayer;
(function (ETypePlayer) {
    ETypePlayer["SHAKA"] = "SHAKA";
    ETypePlayer["VIDEOSJS"] = "VIDEOSJS";
})(ETypePlayer || (exports.ETypePlayer = ETypePlayer = {}));
exports.typePlayerDef = ETypePlayer.SHAKA;
exports.primaryColorDef = '#F58220';


/***/ }),

/***/ "./src/icons.ts":
/*!**********************!*\
  !*** ./src/icons.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.playbackSpeedIcon = exports.checkedIcon = exports.chevronRightIcon = exports.chevronLeftIcon = exports.qualityIcon = exports.exitFullScreenIcon = exports.settingIcon = exports.subtitleIcon = exports.speedIcon = exports.fullScreenIcon = exports.muteIcon = exports.volumeIcon = exports.pausedIcon = exports.forwardIcon = exports.replyIcon = exports.infoIcon = exports.loadingIcon = exports.playIcon = void 0;
exports.playIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.2812 10.7188C17.7396 11.0312 17.9792 11.4583 18 12C17.9792 12.5625 17.7396 12.9792 17.2812 13.25L8.28125 18.75C7.78125 19.0625 7.28125 19.0833 6.78125 18.8125C6.28125 18.5208 6.02083 18.0833 6 17.5V6.5C6.02083 5.91667 6.28125 5.47917 6.78125 5.1875C7.28125 4.91667 7.78125 4.92708 8.28125 5.21875L17.2812 10.7188Z" />
  </svg>`;
exports.loadingIcon = `
  <div  class="sm-loading-ss">
    <div class="sm-ss-loading sm-ss-medium">
      <div class="sm-ss-container">
        <div class="sm-ss-top">
          <div class="sm-ss-circle"></div>
        </div>
      </div>
      <div class="sm-ss-container">
        <div class="sm-ss-bottom">
          <div class="sm-ss-circle"></div>
        </div>
      </div>
    </div>
  </div> `;
exports.infoIcon = `
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M12 4C13.5 4.02083 14.8438 4.38542 16.0312 5.09375C17.2396 5.80208 18.1979 6.76042 18.9062 7.96875C19.6146 9.15625 19.9792 10.5 20 12C19.9792 13.5 19.6146 14.8438 18.9062 16.0312C18.1979 17.2396 17.2396 18.1979 16.0312 18.9062C14.8438 19.6146 13.5 19.9792 12 20C10.5 19.9792 9.15625 19.6146 7.96875 18.9062C6.76042 18.1979 5.80208 17.2396 5.09375 16.0312C4.38542 14.8438 4.02083 13.5 4 12C4.02083 10.5 4.38542 9.15625 5.09375 7.96875C5.80208 6.76042 6.76042 5.80208 7.96875 5.09375C9.15625 4.38542 10.5 4.02083 12 4ZM12 8C11.7083 8 11.4688 8.09375 11.2812 8.28125C11.0938 8.46875 11 8.70833 11 9C11 9.29167 11.0938 9.53125 11.2812 9.71875C11.4688 9.90625 11.7083 10 12 10C12.2917 10 12.5312 9.90625 12.7188 9.71875C12.9062 9.53125 13 9.29167 13 9C13 8.70833 12.9062 8.46875 12.7188 8.28125C12.5312 8.09375 12.2917 8 12 8ZM13.25 16C13.7083 15.9583 13.9583 15.7083 14 15.25C13.9583 14.7917 13.7083 14.5417 13.25 14.5H12.75V11.75C12.7083 11.2917 12.4583 11.0417 12 11H11C10.5417 11.0417 10.2917 11.2917 10.25 11.75C10.2917 12.2083 10.5417 12.4583 11 12.5H11.25V14.5H10.75C10.2917 14.5417 10.0417 14.7917 10 15.25C10.0417 15.7083 10.2917 15.9583 10.75 16H13.25Z" />
  </svg>`;
exports.replyIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.5 11H5.25C4.8125 11 4.5 10.6875 4.5 10.25V6.25C4.5 5.96875 4.65625 5.6875 4.9375 5.5625C5.21875 5.46875 5.5625 5.53125 5.78125 5.71875L7.0625 7.03125C9.8125 4.34375 14.2188 4.34375 16.9375 7.0625C19.6562 9.8125 19.6562 14.2188 16.9375 16.9688C14.1875 19.6875 9.78125 19.6875 7.03125 16.9688C6.65625 16.5625 6.65625 15.9375 7.03125 15.5625C7.4375 15.1562 8.0625 15.1562 8.4375 15.5625C10.4062 17.5 13.5625 17.5 15.5312 15.5625C17.4688 13.5938 17.4688 10.4375 15.5312 8.46875C13.5938 6.53125 10.4375 6.53125 8.46875 8.4375L9.78125 9.71875C9.96875 9.9375 10.0312 10.2812 9.9375 10.5625C9.8125 10.8438 9.53125 11 9.25 11H5.5Z"/>
  </svg>`;
exports.forwardIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path d="M18.4688 11H14.75C14.4375 11 14.1562 10.8438 14.0312 10.5625C13.9375 10.2812 14 9.9375 14.2188 9.71875L15.5 8.4375C13.5312 6.53125 10.4062 6.53125 8.4375 8.46875C6.5 10.4375 6.5 13.5938 8.4375 15.5625C10.4062 17.5 13.5625 17.5 15.5312 15.5625C15.9062 15.1562 16.5312 15.1562 16.9375 15.5625C17.3125 15.9375 17.3125 16.5625 16.9375 16.9688C14.1875 19.6875 9.78125 19.6875 7.03125 16.9688C4.3125 14.2188 4.3125 9.8125 7.03125 7.0625C9.75 4.34375 14.1562 4.34375 16.9062 7.03125L18.2188 5.71875C18.4062 5.53125 18.75 5.46875 19.0312 5.5625C19.3125 5.6875 19.5 5.96875 19.5 6.25V10.25C19.5 10.6875 19.1562 11 18.75 11H18.4688Z"/>
  </svg>`;
exports.pausedIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path d="M15.5 5.96875C15.9167 5.98958 16.2708 6.14583 16.5625 6.4375C16.8333 6.72917 16.9792 7.08333 17 7.5V16.5C16.9792 16.9167 16.8333 17.2708 16.5625 17.5625C16.2708 17.8333 15.9167 17.9792 15.5 18L14.5 17.9375C14.0833 17.9375 13.7292 17.7917 13.4375 17.5C13.1667 17.2292 13.0208 16.875 13 16.4375V7.4375C13.0208 7.02083 13.1667 6.67708 13.4375 6.40625C13.7292 6.13542 14.0833 5.98958 14.5 5.96875H15.5ZM9.5 5.96875C9.91667 5.98958 10.2708 6.14583 10.5625 6.4375C10.8333 6.72917 10.9792 7.08333 11 7.5V16.5C10.9792 16.9167 10.8333 17.2708 10.5625 17.5625C10.2708 17.8333 9.91667 17.9792 9.5 18H8.5C8.08333 18 7.72917 17.8542 7.4375 17.5625C7.16667 17.2708 7.02083 16.9062 7 16.4688V7.46875C7.02083 7.05208 7.16667 6.69792 7.4375 6.40625C7.72917 6.13542 8.08333 5.98958 8.5 5.96875H9.5Z"/>
  </svg>`;
exports.volumeIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path d="M13.4062 5.09375C13.75 5.25 14 5.625 14 6V18C14 18.4062 13.75 18.75 13.4062 18.9375C13.0312 19.0938 12.625 19.0312 12.3125 18.75L8.09375 15H6C4.875 15 4 14.125 4 13V11C4 9.90625 4.875 9 6 9H8.09375L12.3125 5.28125C12.625 5 13.0312 4.9375 13.4062 5.09375ZM18.7812 7.34375C20.125 8.46875 21 10.125 21 12C21 13.9062 20.125 15.5625 18.7812 16.6562C18.4375 16.9375 17.9688 16.875 17.7188 16.5625C17.4375 16.25 17.5 15.7812 17.8125 15.5C18.8438 14.6875 19.5 13.4375 19.5 12C19.5 10.5938 18.8438 9.34375 17.8125 8.53125C17.5 8.25 17.4688 7.78125 17.7188 7.46875C17.9688 7.15625 18.4375 7.09375 18.7812 7.34375ZM16.875 9.6875C17.5625 10.25 18 11.0625 18 12C18 12.9688 17.5625 13.7812 16.875 14.3438C16.5625 14.5938 16.0938 14.5625 15.8125 14.2188C15.5625 13.9062 15.625 13.4375 15.9375 13.1875C16.2812 12.9062 16.5 12.4688 16.5 12C16.5 11.5312 16.2812 11.125 15.9375 10.8438C15.625 10.5938 15.5625 10.125 15.8125 9.78125C16.0938 9.46875 16.5625 9.4375 16.875 9.6875Z"/>
  </svg>`;
exports.muteIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    >
   <path d="M3.1875 4.1875L8.15625 8.0625L11.3125 5.28125C11.625 5 12.0312 4.9375 12.4062 5.09375C12.75 5.25 13 5.625 13 6V11.8438L14.8125 13.2812C14.8438 13.25 14.9062 13.2188 14.9375 13.1875C15.2812 12.9062 15.5 12.4688 15.5 12C15.5 11.5312 15.2812 11.125 14.9375 10.8438C14.625 10.5938 14.5625 10.125 14.8125 9.78125C15.0938 9.46875 15.5625 9.4375 15.875 9.6875C16.5625 10.25 17 11.0625 17 12C17 12.875 16.625 13.6875 16.0312 14.2188L17.2188 15.1562C18 14.3438 18.5 13.25 18.5 12C18.5 10.5938 17.8438 9.34375 16.8125 8.53125C16.5 8.25 16.4375 7.78125 16.7188 7.46875C16.9688 7.15625 17.4375 7.09375 17.7812 7.34375C19.125 8.46875 20 10.125 20 12C20 13.5938 19.375 15 18.4062 16.0938L21.6875 18.6875C22.0312 18.9375 22.0938 19.4062 21.8125 19.7188C21.5625 20.0625 21.0938 20.125 20.7812 19.8438L2.28125 5.34375C1.9375 5.09375 1.875 4.625 2.15625 4.3125C2.40625 3.96875 2.875 3.90625 3.1875 4.1875ZM13 15.6875V18C13 18.4062 12.75 18.7812 12.4062 18.9375C12.0312 19.0938 11.625 19.0312 11.3125 18.75L7.09375 15H5C3.875 15 3 14.125 3 13V11C3 10.0625 3.65625 9.25 4.5625 9.0625L13 15.6875Z"/>
   </svg>`;
exports.fullScreenIcon = `
 <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.25 5C9.65625 5 10 5.34375 10 5.75C10 6.1875 9.65625 6.5 9.25 6.5H6.5V9.25C6.5 9.6875 6.15625 10 5.75 10C5.3125 10 5 9.6875 5 9.25V5.75C5 5.34375 5.3125 5 5.75 5H9.25ZM5 14.75C5 14.3438 5.3125 14 5.75 14C6.15625 14 6.5 14.3438 6.5 14.75V17.5H9.25C9.65625 17.5 10 17.8438 10 18.25C10 18.6875 9.65625 19 9.25 19H5.75C5.3125 19 5 18.6875 5 18.25V14.75ZM18.25 5C18.6562 5 19 5.34375 19 5.75V9.25C19 9.6875 18.6562 10 18.25 10C17.8125 10 17.5 9.6875 17.5 9.25V6.5H14.75C14.3125 6.5 14 6.1875 14 5.75C14 5.34375 14.3125 5 14.75 5H18.25ZM17.5 14.75C17.5 14.3438 17.8125 14 18.25 14C18.6562 14 19 14.3438 19 14.75V18.25C19 18.6875 18.6562 19 18.25 19H14.75C14.3125 19 14 18.6875 14 18.25C14 17.8438 14.3125 17.5 14.75 17.5H17.5V14.75Z"/>
  </svg>`;
exports.speedIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 5.5C9.65625 5.5 7.53125 6.75 6.34375 8.75C5.1875 10.7812 5.1875 13.25 6.34375 15.25C7.53125 17.2812 9.65625 18.5 12 18.5C14.3125 18.5 16.4375 17.2812 17.625 15.25C18.7812 13.25 18.7812 10.7812 17.625 8.75C16.4375 6.75 14.3125 5.5 12 5.5ZM12 20C9.125 20 6.5 18.5 5.0625 16C3.625 13.5312 3.625 10.5 5.0625 8C6.5 5.53125 9.125 4 12 4C14.8438 4 17.4688 5.53125 18.9062 8C20.3438 10.5 20.3438 13.5312 18.9062 16C17.4688 18.5 14.8438 20 12 20ZM13 7.5C13 8.0625 12.5312 8.5 12 8.5C11.4375 8.5 11 8.0625 11 7.5C11 6.96875 11.4375 6.5 12 6.5C12.5312 6.5 13 6.96875 13 7.5ZM12 16.75C11.0312 16.75 10.25 15.9688 10.25 15C10.25 14.0625 11 13.2812 11.9375 13.25L14.0625 8.46875C14.2188 8.09375 14.6562 7.90625 15.0312 8.09375C15.4062 8.25 15.5938 8.6875 15.4375 9.0625L13.3125 13.875C13.5625 14.1875 13.75 14.5625 13.75 15C13.75 15.9688 12.9375 16.75 12 16.75ZM10 9C10 9.5625 9.53125 10 9 10C8.4375 10 8 9.5625 8 9C8 8.46875 8.4375 8 9 8C9.53125 8 10 8.46875 10 9ZM7.5 13C6.9375 13 6.5 12.5625 6.5 12C6.5 11.4688 6.9375 11 7.5 11C8.03125 11 8.5 11.4688 8.5 12C8.5 12.5625 8.03125 13 7.5 13ZM17.5 12C17.5 12.5625 17.0312 13 16.5 13C15.9375 13 15.5 12.5625 15.5 12C15.5 11.4688 15.9375 11 16.5 11C17.0312 11 17.5 11.4688 17.5 12Z"/>
  </svg>`;
exports.subtitleIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
  <path d="M5 6.5C4.71875 6.5 4.5 6.75 4.5 7V17C4.5 17.2812 4.71875 17.5 5 17.5H19C19.25 17.5 19.5 17.2812 19.5 17V7C19.5 6.75 19.25 6.5 19 6.5H5ZM3 7C3 5.90625 3.875 5 5 5H19C20.0938 5 21 5.90625 21 7V17C21 18.125 20.0938 19 19 19H5C3.875 19 3 18.125 3 17V7ZM6.75 11.5H12.25C12.6562 11.5 13 11.8438 13 12.25C13 12.6875 12.6562 13 12.25 13H6.75C6.3125 13 6 12.6875 6 12.25C6 11.8438 6.3125 11.5 6.75 11.5ZM14.75 11.5H17.25C17.6562 11.5 18 11.8438 18 12.25C18 12.6875 17.6562 13 17.25 13H14.75C14.3125 13 14 12.6875 14 12.25C14 11.8438 14.3125 11.5 14.75 11.5ZM6.75 14.5H9.25C9.65625 14.5 10 14.8438 10 15.25C10 15.6875 9.65625 16 9.25 16H6.75C6.3125 16 6 15.6875 6 15.25C6 14.8438 6.3125 14.5 6.75 14.5ZM11.75 14.5H17.25C17.6562 14.5 18 14.8438 18 15.25C18 15.6875 17.6562 16 17.25 16H11.75C11.3125 16 11 15.6875 11 15.25C11 14.8438 11.3125 14.5 11.75 14.5Z"/>
  </svg>`;
exports.settingIcon = `
   <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4C12.5312 4 13.0312 4.0625 13.5312 4.15625C13.7812 4.21875 14.2188 4.34375 14.4688 4.78125C14.5312 4.90625 14.5625 5.03125 14.5938 5.15625L14.9062 6.375C14.9375 6.53125 15.25 6.71875 15.4375 6.65625L16.625 6.3125C16.75 6.28125 16.875 6.25 17 6.25C17.5 6.25 17.8438 6.5625 18 6.75C18.6875 7.53125 19.2188 8.4375 19.5625 9.4375C19.6562 9.6875 19.75 10.125 19.4688 10.5312C19.4062 10.6562 19.3125 10.75 19.2188 10.8438L18.3438 11.7188C18.1875 11.8438 18.1875 12.1875 18.3438 12.3125L19.2188 13.1875C19.3125 13.2812 19.4062 13.375 19.4688 13.5C19.7188 13.9062 19.625 14.3438 19.5625 14.5938C19.2188 15.5938 18.6875 16.5 18 17.2812C17.8438 17.4688 17.5 17.7812 17 17.7812C16.875 17.7812 16.75 17.75 16.625 17.7188L15.4375 17.3438C15.25 17.3125 14.9375 17.4688 14.9062 17.6562L14.5938 18.875C14.5625 19 14.5312 19.125 14.4688 19.25C14.2188 19.6875 13.7812 19.8125 13.5312 19.875C13.0312 19.9688 12.5312 20 12 20C11.4688 20 10.9375 19.9688 10.4375 19.875C10.1875 19.8125 9.75 19.6875 9.5 19.25C9.4375 19.125 9.40625 19 9.375 18.875L9.0625 17.6562C9.03125 17.4688 8.71875 17.3125 8.5625 17.3438L7.375 17.7188C7.25 17.75 7.09375 17.75 6.96875 17.7812C6.46875 17.7812 6.125 17.4688 5.96875 17.2812C5.28125 16.5 4.75 15.5938 4.40625 14.5938C4.34375 14.3438 4.25 13.9062 4.5 13.4688C4.5625 13.375 4.65625 13.25 4.75 13.1562L5.65625 12.3125C5.78125 12.1875 5.78125 11.8438 5.65625 11.7188L4.75 10.8438C4.65625 10.75 4.5625 10.6562 4.5 10.5312C4.25 10.125 4.34375 9.6875 4.40625 9.4375C4.75 8.4375 5.28125 7.53125 5.96875 6.75C6.125 6.5625 6.46875 6.25 6.96875 6.25C7.09375 6.25 7.25 6.28125 7.375 6.3125L8.5625 6.65625C8.71875 6.71875 9.03125 6.53125 9.0625 6.375L9.375 5.15625C9.40625 5.03125 9.4375 4.90625 9.5 4.78125C9.75 4.34375 10.1875 4.21875 10.4375 4.15625C10.9375 4.0625 11.4688 4 12 4ZM10.8125 5.625L10.5312 6.71875C10.2812 7.71875 9.125 8.40625 8.125 8.125L7.03125 7.78125C6.53125 8.40625 6.125 9.09375 5.84375 9.84375L6.6875 10.625C7.4375 11.3438 7.4375 12.6875 6.6875 13.4062L5.84375 14.1875C6.125 14.9375 6.53125 15.625 7.03125 16.25L8.125 15.9062C9.125 15.625 10.2812 16.3125 10.5312 17.3125L10.8125 18.4062C11.5625 18.5625 12.4062 18.5625 13.1875 18.4062L13.4375 17.3125C13.6875 16.3125 14.8438 15.625 15.8438 15.9062L16.9375 16.25C17.4375 15.625 17.8438 14.9375 18.125 14.1875L17.3125 13.4062C16.5625 12.6875 16.5625 11.3438 17.3125 10.625L18.125 9.84375C17.8438 9.09375 17.4375 8.40625 16.9375 7.78125L15.8438 8.125C14.875 8.40625 13.6875 7.71875 13.4375 6.71875L13.1875 5.625C12.4062 5.46875 11.5625 5.46875 10.8125 5.625ZM10.5 12C10.5 12.5625 10.7812 13.0312 11.25 13.3125C11.6875 13.5938 12.2812 13.5938 12.75 13.3125C13.1875 13.0312 13.5 12.5625 13.5 12C13.5 11.4688 13.1875 11 12.75 10.7188C12.2812 10.4375 11.6875 10.4375 11.25 10.7188C10.7812 11 10.5 11.4688 10.5 12ZM12 15C10.9062 15 9.9375 14.4375 9.375 13.5C8.84375 12.5938 8.84375 11.4375 9.375 10.5C9.9375 9.59375 10.9062 9 12 9C13.0625 9 14.0312 9.59375 14.5938 10.5C15.125 11.4375 15.125 12.5938 14.5938 13.5C14.0312 14.4375 13.0625 15 12 15Z"/>
  </svg>`;
exports.exitFullScreenIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 5.75V9.25C10 9.6875 9.65625 10 9.25 10H5.75C5.3125 10 5 9.6875 5 9.25C5 8.84375 5.3125 8.5 5.75 8.5H8.5V5.75C8.5 5.34375 8.8125 5 9.25 5C9.65625 5 10 5.34375 10 5.75ZM5.75 14H9.25C9.65625 14 10 14.3438 10 14.75V18.25C10 18.6875 9.65625 19 9.25 19C8.8125 19 8.5 18.6875 8.5 18.25V15.5H5.75C5.3125 15.5 5 15.1875 5 14.75C5 14.3438 5.3125 14 5.75 14ZM15.5 5.75V8.5H18.25C18.6562 8.5 19 8.84375 19 9.25C19 9.6875 18.6562 10 18.25 10H14.75C14.3125 10 14 9.6875 14 9.25V5.75C14 5.34375 14.3125 5 14.75 5C15.1562 5 15.5 5.34375 15.5 5.75ZM14.75 14H18.25C18.6562 14 19 14.3438 19 14.75C19 15.1875 18.6562 15.5 18.25 15.5H15.5V18.25C15.5 18.6875 15.1562 19 14.75 19C14.3125 19 14 18.6875 14 18.25V14.75C14 14.3438 14.3125 14 14.75 14Z"/>
  </svg>`;
exports.qualityIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.5 14.5C5.9375 14.5 5.5 14.9688 5.5 15.5C5.5 16.0625 5.9375 16.5 6.5 16.5C7.03125 16.5 7.5 16.0625 7.5 15.5C7.5 14.9688 7.03125 14.5 6.5 14.5ZM8.875 14.75H19.25C19.6562 14.75 20 15.0938 20 15.5C20 15.9375 19.6562 16.25 19.25 16.25H8.875C8.5625 17.2812 7.59375 18 6.5 18C5.09375 18 4 16.9062 4 15.5C4 14.125 5.09375 13 6.5 13C7.59375 13 8.5625 13.75 8.875 14.75ZM16.5 8.5C16.5 9.0625 16.9375 9.5 17.5 9.5C18.0312 9.5 18.5 9.0625 18.5 8.5C18.5 7.96875 18.0312 7.5 17.5 7.5C16.9375 7.5 16.5 7.96875 16.5 8.5ZM15.0938 7.75C15.4062 6.75 16.375 6 17.5 6C18.875 6 20 7.125 20 8.5C20 9.90625 18.875 11 17.5 11C16.375 11 15.4062 10.2812 15.0938 9.25H4.75C4.3125 9.25 4 8.9375 4 8.5C4 8.09375 4.3125 7.75 4.75 7.75H15.0938Z"/>
  </svg>`;
exports.chevronLeftIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 19C13.7292 19 13.4896 18.9062 13.2812 18.7188L7.28125 12.7188C7.09375 12.5104 7 12.2708 7 12C7 11.7292 7.09375 11.4896 7.28125 11.2812L13.2812 5.28125C13.4896 5.09375 13.7292 5 14 5C14.2708 5 14.5104 5.09375 14.7188 5.28125C14.9062 5.48958 15 5.72917 15 6C15 6.27083 14.9062 6.51042 14.7188 6.71875L9.40625 12L14.7188 17.2812C14.9062 17.4896 15 17.7292 15 18C15 18.2708 14.9062 18.5104 14.7188 18.7188C14.5104 18.9062 14.2708 19 14 19Z"/>
  </svg>`;
exports.chevronRightIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.5312 11.4688C16.8125 11.7812 16.8125 12.25 16.5312 12.5312L10.5312 18.5312C10.2188 18.8438 9.75 18.8438 9.46875 18.5312C9.15625 18.25 9.15625 17.7812 9.46875 17.5L14.9375 12.0312L9.46875 6.53125C9.15625 6.25 9.15625 5.78125 9.46875 5.5C9.75 5.1875 10.2188 5.1875 10.5 5.5L16.5312 11.4688Z"/>
  </svg>`;
exports.checkedIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.7188 7.28125C18.9062 7.48958 19 7.72917 19 8C19 8.27083 18.9062 8.51042 18.7188 8.71875L10.7188 16.7188C10.5104 16.9062 10.2708 17 10 17C9.72917 17 9.48958 16.9062 9.28125 16.7188L5.28125 12.7188C5.09375 12.5104 5 12.2708 5 12C5 11.7292 5.09375 11.4896 5.28125 11.2812C5.48958 11.0938 5.72917 11 6 11C6.27083 11 6.51042 11.0938 6.71875 11.2812L9.96875 14.5938L17.2812 7.28125C17.4896 7.09375 17.7292 7 18 7C18.2708 7 18.5104 7.09375 18.7188 7.28125Z"
    />
  </svg>`;
exports.playbackSpeedIcon = `
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 5.5C9.65625 5.5 7.53125 6.75 6.34375 8.75C5.1875 10.7812 5.1875 13.25 6.34375 15.25C7.53125 17.2812 9.65625 18.5 12 18.5C14.3125 18.5 16.4375 17.2812 17.625 15.25C18.7812 13.25 18.7812 10.7812 17.625 8.75C16.4375 6.75 14.3125 5.5 12 5.5ZM12 20C9.125 20 6.5 18.5 5.0625 16C3.625 13.5312 3.625 10.5 5.0625 8C6.5 5.53125 9.125 4 12 4C14.8438 4 17.4688 5.53125 18.9062 8C20.3438 10.5 20.3438 13.5312 18.9062 16C17.4688 18.5 14.8438 20 12 20ZM13 7.5C13 8.0625 12.5312 8.5 12 8.5C11.4375 8.5 11 8.0625 11 7.5C11 6.96875 11.4375 6.5 12 6.5C12.5312 6.5 13 6.96875 13 7.5ZM12 16.75C11.0312 16.75 10.25 15.9688 10.25 15C10.25 14.0625 11 13.2812 11.9375 13.25L14.0625 8.46875C14.2188 8.09375 14.6562 7.90625 15.0312 8.09375C15.4062 8.25 15.5938 8.6875 15.4375 9.0625L13.3125 13.875C13.5625 14.1875 13.75 14.5625 13.75 15C13.75 15.9688 12.9375 16.75 12 16.75ZM10 9C10 9.5625 9.53125 10 9 10C8.4375 10 8 9.5625 8 9C8 8.46875 8.4375 8 9 8C9.53125 8 10 8.46875 10 9ZM7.5 13C6.9375 13 6.5 12.5625 6.5 12C6.5 11.4688 6.9375 11 7.5 11C8.03125 11 8.5 11.4688 8.5 12C8.5 12.5625 8.03125 13 7.5 13ZM17.5 12C17.5 12.5625 17.0312 13 16.5 13C15.9375 13 15.5 12.5625 15.5 12C15.5 11.4688 15.9375 11 16.5 11C17.0312 11 17.5 11.4688 17.5 12Z"/>
  </svg>
`;


/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateHtmlContentControllerString = exports.generateHtmlContentContainerString = exports.createElementFromHTML = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const createElementFromHTML = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();
    return tempDiv.firstChild;
};
exports.createElementFromHTML = createElementFromHTML;
const generateHtmlContentContainerString = (classes) => {
    return `
    <div class=${classes.controllerContent}  id=${constants_1.ids.smControllerContent}>
    </div>
    <div class=${classes.loadingContainer} id=${constants_1.ids.smLoading}>
    </div>
    <div class=${classes.errorContainer} id=${constants_1.ids.smError}>
    </div>
    `;
};
exports.generateHtmlContentContainerString = generateHtmlContentContainerString;
const generateHtmlContentControllerString = (classes) => { };
exports.generateHtmlContentControllerString = generateHtmlContentControllerString;


/***/ }),

/***/ "./src/style.ts":
/*!**********************!*\
  !*** ./src/style.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const css_1 = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/emotion-css.development.esm.js");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const generateStyles = (props) => {
    const { primaryColor = constants_1.primaryColorDef, logo } = props || {};
    return {
        container: (0, css_1.css) `
      font-family: 'Be Vietnam Pro';
      background: black;
      color: white;
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      background: transparent;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      overflow: hidden;
      color: white;
      ::-webkit-scrollbar,
      *::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track,
      *::-webkit-scrollbar-track {
        border-radius: 8px;
        background-color: transparent;
        border: 1px solid transparent;
      }

      ::-webkit-scrollbar-thumb,
      *::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: #888888;
      }
    `,
        controllerContent: (0, css_1.css) `
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: transparent;
      display: none;
    `,
        controllerContentEnable: (0, css_1.css) `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `,
        headController: (0, css_1.css) `
      background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      width: 100%;
      // height: 16%;
      // min-height: 50px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 8px 12px;
      overflow: hidden;
      animation-name: fadeInDown;
    `,
        headControllerTitle: (0, css_1.css) `
      width: 80%;
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
        bodyController: (0, css_1.css) `
      position: relative;
      background: transparent;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
        buttonPlayPrimary: (0, css_1.css) `
      background: rgba(0, 0, 0, 0.48);
      backdrop-filter: blur(25px);
      border-radius: 50%;
      width: 56px;
      height: 56px;
      cursor: pointer;
      color: white;
      display: none;
      padding: 8px;
      box-sizing: border-box;
      cursor: pointer;
    `,
        settingsContainer: (0, css_1.css) `
      position: absolute;
      bottom: 0;
      right: 12px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.64);
      backdrop-filter: blur(25px);
      display: flex;
      flex-direction: column;
      gap: 0px;
      max-height: 100%;
      overflow: hidden;
    `,
        settingsContainerMask: (0, css_1.css) `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: transparent;
      pointer-events: none;
      z-index: 99999999;
    `,
        settingsContent: (0, css_1.css) `
      min-width: 280px;
      max-width: 300px;
      overflow-y: auto;
    `,
        settingHeader: (0, css_1.css) `
      box-sizing: border-box;
      height: 48px;
      display: flex;
      padding: 8px 12px;
      align-items: center;
      gap: 12px;
      align-self: stretch;
      background-color: rgba(255, 255, 255, 0.04);
    `,
        settingItem: (0, css_1.css) `
      height: 48px;
      box-sizing: border-box;
      display: flex;
      padding: 8px 12px;
      align-items: center;
      gap: 12px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        cursor: pointer;
      }
    `,
        settingDetailItem: (0, css_1.css) `
      height: 40px;
      box-sizing: border-box;
      display: flex;
      padding: 8px 12px;
      align-items: center;
      gap: 12px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        cursor: pointer;
      }
    `,
        settingItemDivider: (0, css_1.css) `
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    `,
        settingTitleActive: (0, css_1.css) `
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    `,
        settingTitleNormal: (0, css_1.css) `
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    `,
        settingItemIcon: (0, css_1.css) `
      width: 24px;
      height: 24px;
      cursor: pointer;
    `,
        settingItemIconSecondary: (0, css_1.css) `
      width: 20px;
      height: 20px;
      color: rgba(255, 255, 255, 0.64);
    `,
        settingItemTitle: (0, css_1.css) `
      flex: 1;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      cursor: pointer;
    `,
        settingItemValue: (0, css_1.css) `
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    `,
        buttonPlayPrimaryEnable: (0, css_1.css) `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      // &:hover {
      //   box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.3);
      // }
    `,
        footerController: (0, css_1.css) `
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      width: 100%;
      // height: 20%;
      min-height: 80px;
      padding: 8px 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      overflow: hidden;
    `,
        seekBarController: (0, css_1.css) `
      background: green;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
        taskbarController: (0, css_1.css) `
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
        taskbarGroup: (0, css_1.css) `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    `,
        taskbarGroupBtn: (0, css_1.css) `
      width: 40px;
      height: 40px;
      padding: 2px;
      box-sizing: border-box;
      display: none;
      border-radius: 50%;
      cursor: pointer;
      // &:hover {
      //   box-shadow: 0px 0px 8px 8px rgba(255, 255, 255, 0.1);
      //   background: rgba(255, 255, 255, 0.1);
      // }
    `,
        taskbarIconActive: (0, css_1.css) `
      color: ${constants_1.primaryColorDef};
    `,
        taskbarGroupBtnEnable: (0, css_1.css) `
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `,
        taskbarVolumeContainer: (0, css_1.css) `
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px;
    `,
        taskbarTimeBarContainer: (0, css_1.css) `
      display: none;
    `,
        taskbarTimeBarContainerEnable: (0, css_1.css) `
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px;
      font-size: 12px;
      gap: 4px;
    `,
        taskbarLiveStream: (0, css_1.css) `
      display: none;
    `,
        liveStreamDot: (0, css_1.css) `
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: red;
      margin-right: 4px;
      box-shadow: 0px 0px 4px 4px rgba(255, 0, 0, 0.2);
    `,
        taskbarLiveStreamEnable: (0, css_1.css) `
      display: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px;
      font-size: 12px;
      gap: 4px;
    `,
        taskbarTimeCurrent: (0, css_1.css) ``,
        taskbarTimeDuration: (0, css_1.css) ``,
        smSelectVolumeRangeContainer: (0, css_1.css) `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-left: 8px;
    `,
        taskbarVolumeSliderEnable: (0, css_1.css) `
      height: 40px;
      display: block !important;
      width: 100%;
      animation: scaleUpHorizontalLeft 0.1s ease-in-out forwards;
    `,
        taskbarVolumeSlider: (0, css_1.css) `
      height: 40px;
      display: none;
      width: 0px;
      animation: scaleDownHorizontalLeft 0.1s ease-in-out forwards;
      -webkit-appearance: none;
      height: 6px;
      border-radius: 16px;
      background: #ddd;
      outline: none;
      opacity: 0.7;
      transition: opacity 0.2s;
      position: relative;
      overflow: visible;

      ::-webkit-slider-runnable-track {
        width: 100%;
        border-radius: 18px;
        height: 6px;
        cursor: pointer;
        background: #ddd;
      }

      ::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: #ddd;
      }

      ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        margin-top: -4px;
        border-radius: 50%;
        background: ${primaryColor};
        cursor: pointer;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2;
      }

      ::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: ${primaryColor};
        cursor: pointer;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2;
      }

      ::before {
        content: '';
        height: 100%;
        width: var(--highlight-width);
        background: ${primaryColor};
        position: absolute;
        left: 0;
        border-radius: 18px;
        top: 0;
        z-index: 1;
      }

      :hover {
        opacity: 1;
      }
    `,
        loadingContainer: (0, css_1.css) `
      background: rgb(119 119 119 / 50%);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      overflow: hidden;
      display: none;
    `,
        loadingContainerEnable: (0, css_1.css) `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
        errorContainer: (0, css_1.css) `
      background: rgb(119 119 119 / 50%);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      overflow: hidden;
      display: none;
    `,
        errorContainerEnable: (0, css_1.css) `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 40px;
    `,
        errorIconWrap: (0, css_1.css) `
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
        flexColumnStartCenter: (0, css_1.css) `
      display: column;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    `,
    };
};
exports["default"] = generateStyles;


/***/ }),

/***/ "./src/type.ts":
/*!*********************!*\
  !*** ./src/type.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RESOLUTION_LABEL = exports.EEVentName = void 0;
var EEVentName;
(function (EEVentName) {
    EEVentName["LOADED"] = "loaded";
    EEVentName["ERROR"] = "error";
    EEVentName["PLAY"] = "play";
    EEVentName["PAUSE"] = "pause";
    EEVentName["FULL_SCREEN_CHANGE"] = "fullscreenchange";
    EEVentName["LOADING"] = "loading";
    EEVentName["TRACKS_CHANGED"] = "trackschanged";
    EEVentName["ADAPTATION"] = "adaptation";
    EEVentName["RATE_CHANGE"] = "ratechange";
    EEVentName["SETTING_PANEL_VISIBLE"] = "settingPanelVisible";
    EEVentName["VARIANT_CHANGED"] = "variantchanged";
    EEVentName["ABR_STATUS_CHANGED"] = "abrstatuschanged";
    EEVentName["VOLUME_CHANGE"] = "volumechange";
    EEVentName["TIME_UPDATE"] = "timeupdate";
    EEVentName["LOADED_META_DATA"] = "loadedmetadata";
})(EEVentName || (exports.EEVentName = EEVentName = {}));
exports.RESOLUTION_LABEL = {
    AUTO: 'Auto',
    SD: 'SD',
    HD: 'HD',
    FullHD: 'FullHD',
    '2K': '2K',
    '4K': '4K',
    '8K': '8K',
};
var AccessibilityPurpose;
(function (AccessibilityPurpose) {
    AccessibilityPurpose["HARD_OF_HEARING"] = "hard of hearing";
    AccessibilityPurpose["VISUALLY_IMPAIRED"] = "visually impaired";
})(AccessibilityPurpose || (AccessibilityPurpose = {}));


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatTime = void 0;
function formatTime(seconds) {
    if (seconds >= 3600) {
        // Format as HH:mm:ss
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const hoursFormatted = hours.toString().padStart(2, '0');
        const minutesFormatted = minutes.toString().padStart(2, '0');
        const secondsFormatted = secs.toString().padStart(2, '0');
        return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
    }
    else {
        // Format as mm:ss
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const minutesFormatted = minutes.toString().padStart(2, '0');
        const secondsFormatted = secs.toString().padStart(2, '0');
        return `${minutesFormatted}:${secondsFormatted}`;
    }
}
exports.formatTime = formatTime;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const type_1 = __webpack_require__(/*! ./type */ "./src/type.ts");
const ControllerContainer_1 = __webpack_require__(/*! ./class/Containers/ControllerContainer */ "./src/class/Containers/ControllerContainer/index.ts");
const ErrorContainer_1 = __webpack_require__(/*! ./class/Containers/ErrorContainer */ "./src/class/Containers/ErrorContainer/index.ts");
const LoadingContainer_1 = __webpack_require__(/*! ./class/Containers/LoadingContainer */ "./src/class/Containers/LoadingContainer/index.ts");
const services_1 = __webpack_require__(/*! ./services */ "./src/services.ts");
__webpack_require__(/*! animate.css */ "./node_modules/animate.css/animate.css");
__webpack_require__(/*! ./index.css */ "./src/index.css");
const style_1 = __webpack_require__(/*! ./style */ "./src/style.ts");
const SmApiPlayer_1 = __webpack_require__(/*! ./class/SmApiPlayer */ "./src/class/SmApiPlayer/index.ts");
const classes = (0, style_1.default)();
class SmUIControls {
    apiPlayer;
    isInit = false;
    controllerContainer;
    errorContainer;
    loadingContainer;
    constructor(props) {
        const { player, video, idVideoContainer, typePlayer = constants_1.typePlayerDef, version = constants_1.versionDef, videoInfo } = props;
        const htmlContentString = (0, services_1.generateHtmlContentContainerString)(classes);
        const apiPlayer = (this.apiPlayer = new SmApiPlayer_1.default({ player, video, typePlayer, version }));
        const VideoContainerElement = document.getElementById(idVideoContainer);
        if (!this.isInit) {
            this.isInit = true;
            if (VideoContainerElement) {
                VideoContainerElement.style.position = 'relative';
                const smControllerContainerEle = document.createElement('div');
                smControllerContainerEle.className = classes.container;
                smControllerContainerEle.id = constants_1.ids.smControllerContainer;
                smControllerContainerEle.innerHTML = htmlContentString;
                VideoContainerElement.appendChild(smControllerContainerEle);
                this.controllerContainer = new ControllerContainer_1.default({
                    id: constants_1.ids.smControllerContent,
                    classes,
                    videoInfo,
                    apiPlayer,
                });
                this.errorContainer = new ErrorContainer_1.default({ id: constants_1.ids.smError, classes, apiPlayer });
                this.loadingContainer = new LoadingContainer_1.default({ id: constants_1.ids.smLoading, classes, apiPlayer });
                apiPlayer.addEventListener(type_1.EEVentName.LOADED, (data) => {
                    console.log('addEventListener', type_1.EEVentName.LOADED, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.LOADED, data);
                });
                apiPlayer.addEventListener(type_1.EEVentName.ERROR, (data) => {
                    console.log('addEventListener', type_1.EEVentName.ERROR, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.ERROR, data);
                });
                apiPlayer.addEventListener(type_1.EEVentName.PLAY, (data) => {
                    console.log('addEventListener', type_1.EEVentName.PLAY, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.PLAY, data);
                });
                apiPlayer.addEventListener(type_1.EEVentName.PAUSE, (data) => {
                    console.log('addEventListener', type_1.EEVentName.PAUSE, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.PAUSE, data);
                });
                apiPlayer.addEventListener(type_1.EEVentName.FULL_SCREEN_CHANGE, (data) => {
                    console.log('addEventListener', type_1.EEVentName.FULL_SCREEN_CHANGE, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.FULL_SCREEN_CHANGE, data);
                });
                apiPlayer.addEventListener(type_1.EEVentName.VOLUME_CHANGE, (data) => {
                    console.log('addEventListener', type_1.EEVentName.VOLUME_CHANGE, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.VOLUME_CHANGE, data);
                });
                apiPlayer.addEventListener(type_1.EEVentName.TIME_UPDATE, (data) => {
                    console.log('addEventListener', type_1.EEVentName.TIME_UPDATE, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.TIME_UPDATE, data);
                });
                apiPlayer.addEventListener(type_1.EEVentName.LOADED_META_DATA, (data) => {
                    console.log('addEventListener', type_1.EEVentName.LOADED_META_DATA, data);
                    apiPlayer.eventemitter.trigger(type_1.EEVentName.LOADED_META_DATA, data);
                });
            }
        }
    }
    destroy() {
        this.controllerContainer?.destroy();
        this.errorContainer?.destroy();
        this.loadingContainer?.destroy();
        this.apiPlayer = null;
        this.isInit = false;
    }
}
exports["default"] = SmUIControls;

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=sm-ui-controls.js.map