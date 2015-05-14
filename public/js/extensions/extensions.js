/// <reference path="../../../typings/json-fn/json-fn.d.ts" />
var jsonfn = require('json-fn');
var md5 = require('./md5');
// Alias Imports
var MD5 = md5.MD5;
var ObjectImpl = (function () {
    function ObjectImpl() {
    }
    /**
     * @description Makes a deep copy of an object
     * @memberof Object.extensions
     * @method clone
     * @param obj {*}The object to clone.
     * @returns {Object} The cloned object.
     */
    ObjectImpl.clone = function (obj) {
        return jsonfn.clone(obj, true);
    };
    /**
     * @description Makes a deep copy of an object
     * @memberof Object.extensions
     * @method equals
     * @param obj {*} The first object to compare.
     * @param other The second object to compare.
     * @returns {boolean} True if both objects are equal. False, otherwise.
     */
    ObjectImpl.equals = function (obj, other) {
        if (ObjectImpl.isNullOrUndefined(obj) || ObjectImpl.isNullOrUndefined(other)) {
            return (obj === null) && (other === null);
        }
        if (typeof (obj) === "string") {
            return obj === other;
        }
        if (typeof (obj) !== "object") {
            return obj === other;
        }
        return JSON.stringify(obj) === JSON.stringify(other);
    };
    /**
     * @description Generates a hash code for an Object.
     * @memberof Object.extensions
     * @method hashCode
     * @param obj {*} The object to generate a hashcode from.
     * @returns {int} The hashcode of the Object.
     */
    ObjectImpl.hashCode = function (obj) {
        if ((typeof obj === 'undefined') || (obj === null) || (obj.length === 0))
            return 0;
        var str = JSON.stringify(obj);
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
    /**
     * @description Determines if an Object is null or undefined.
     * @memberof Object.extensions
     * @method isNullOrUndefined
     * @param obj {*} The Object to test.
     * @returns {boolean} True if the Object is null or undefined. False otherwise.
     */
    ObjectImpl.isNullOrUndefined = function (obj) {
        return ((typeof obj == 'undefined') || (obj === null));
    };
    return ObjectImpl;
})();
exports.ObjectImpl = ObjectImpl;
var StringImpl = (function () {
    function StringImpl() {
    }
    /**
     * @description Returns a new string containing a copy of the current string.
     * @method clone
     * @memberof String.prototype
     * @param str {String} The string to clone.
     * @returns {String} A copy of the current string.
     * @example var newString = 'Hello World'.clone();
     */
    StringImpl.clone = function (str) {
        return ObjectImpl.clone(str);
    };
    /**
     * @description Compares two strings for equality.
     * @method equals
     * @memberof String
     * @param str {String} The first string to compare.
     * @param other {String} The second string to compare.
     * @returns {boolean} True if strings are equal. False otherwise.
     * @example var isEqual = String.equals('string', 'string');
     */
    StringImpl.equals = function (str, other) {
        return ObjectImpl.equals(str, other);
    };
    /**
     * @description Formats a string using numbered tokens e.g. 'Format string {0}, {1}, {2}'.
     * @method format
     * @memberof String
     * @param format {String} The format for the string.
     * @param params {...*} One or more parameters to format into the format string.
     * @returns {String} The formatted string.
     * @example String.format('Hello, my name is {0} {1}.', 'John', 'Doe');
     */
    StringImpl.format = function (format) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        var string = format;
        for (var i = 0; i < params.length; i++) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multi-line search
            var regEx = new RegExp("\\{" + (i) + "\\}", "gm");
            string = string.replace(regEx, params[i]);
        }
        return string;
    };
    /**
     * @description Generate a password.
     * @method generatePassword
     * @memberof String
     * @param length {int} Length of the new password.
     * @param inclNumbers {boolean} Whether to include numbers in the new password.
     * @param inclSymbols {boolean} Whether to include symbols in the new password.
     * @returns {string} A new randomly generated password.
     */
    StringImpl.generatePassword = function (length, inclNumbers, inclSymbols) {
        var vowels = 'aeiou'.split(StringImpl.EMPTY);
        var constonants = 'bcdfghjklmnpqrstvwxyz'.split(StringImpl.EMPTY);
        var symbols = '!@#$%^&*?'.split(StringImpl.EMPTY);
        var word = StringImpl.EMPTY, i, num;
        if (!length)
            length = 8;
        var inclOffset = 0;
        if (inclNumbers)
            inclOffset += 3;
        if (inclSymbols)
            inclOffset += 1;
        for (i = 0; i < (length - inclOffset); i++) {
            var letter;
            if (i % 2 == 0) {
                letter = vowels[Math.floor(Math.random() * 4)];
            }
            else {
                letter = constonants[Math.floor(Math.random() * 20)];
            }
            word += (i == 0) ? letter.toUpperCase() : letter;
        }
        if (inclNumbers) {
            num = Math.floor(Math.random() * 99) + StringImpl.EMPTY;
            if (num.length == 1)
                num = '00' + num;
            else if (num.length == 2)
                num = '0' + num;
            word += num;
        }
        if (inclSymbols) {
            word += symbols[Math.floor(Math.random() * 8)];
        }
        return word.substr(0, length);
    };
    /**
     * @description Generates a hashcode for the current string.
     * @method hashCode
     * @memberof String.prototype
     * @param str {String} The string to hash.
     * @returns {String} The hashcode for the current string.
     * @example 'Hello World'.hashCode();
     */
    StringImpl.hashCode = function (str) {
        return ObjectImpl.hashCode(str);
    };
    /**
     * @description Determine if a string is null, undefined, or zero length.
     * @method isNullOrEmpty
     * @memberof String
     * @param str {String} The string to check.
     * @returns {boolean} True if null, undefined, or zero length. False otherwise.
     */
    StringImpl.isNullOrEmpty = function (str) {
        return ObjectImpl.isNullOrUndefined(str);
    };
    /**
     * @description Creates a copy of the current string with the leading whitespace
     * removed.
     * @param str {String} The string to trim.
     * @method ltrim
     * @memberof String.prototype
     * @returns {String} The current string with the leading spaces removed.
     * @example '   Hello World'.ltrim();
     */
    StringImpl.ltrim = function (str) {
        return str.replace(/^\s+/, "");
    };
    /**
     * @description Generates a MD5 message digest for a string.
     * @method md5
     * @memberof String.prototype
     * @param str {String} The string to encode.
     * @returns {String} The MD5 message digest for the current string instance.
     * @example 'password'.md5();
     */
    StringImpl.md5 = function (str) {
        return MD5.computeDigest(str);
    };
    /**
     * @description Prints a formatted string.
     * @method print
     * @memberof String
     * @param format {String} The format for the string.
     * @param params {...*} One or more parameters to format into the format string.
     * @example String.print('Hello, my name is {0} {1}.', 'John', 'Doe');
     * @see String.format
     */
    StringImpl.print = function (format) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // prepend format
        var args = [format];
        for (var i = 0; i < params.length; ++i)
            args[i + 1] = params[i];
        console.log(StringImpl.format.apply(this, args));
    };
    /**
     * @description Prints a formatted string.
     * @method printf
     * @memberof String
     * @param format {String} The format for the string.
     * @param params {...*} One or more parameters to format into the format string.
     * @example String.printf('Hello, my name is %s %s, I am %d years old.', 'John', 'Doe', 46);
     * @see String.sprintf
     */
    StringImpl.printf = function (format) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // prepend format
        var args = [format];
        for (var i = 0; i < params.length; ++i)
            args[i + 1] = params[i];
        console.log(StringImpl.sprintf.apply(this, args));
    };
    /**
     * @description Creates a copy of the current string with the trailing whitespace
     * removed.
     * @method rtrim
     * @memberof String.prototype
     * @param str {String} The string to trim.
     * @returns {String} The current string with the trailing spaces removed.
     * @example 'Hello World   '.rtrim();
     */
    StringImpl.rtrim = function (str) {
        return str.replace(/\s+$/, "");
    };
    /**
     * @description Formats a string using tokens e.g. 'Format string %s, %d, %f'.
     * @method sprintf
     * @memberof String
     * @param format
     * The format string is composed of zero or more directives: ordinary characters (excluding %)
     * that are copied directly to the result, and conversion specifications, each of which results
     * in fetching its own parameter.<br/>
     * <br/>
     * Each conversion specification consists of a percent sign (%), followed by one or more of
     * these elements, in order:<br/>
     * <br/>
     * <ol style="padding-left: 20px;">
     *   <li>
     *   An optional sign specifier that forces a sign (- or +) to be used on a number. By default,
     *   only the - sign is used on a number if it's negative. This specifier forces positive numbers
     *   to have the + sign attached as well.
     *   </li>
     *   <li>
     *   An optional padding specifier that says what character will be used for padding the results
     *   to the right string size. This may be a space character or a 0 (zero character). The default
     *   is to pad with spaces. An alternate padding character can be specified by prefixing it with
     *   a single quote (').
     *   </li>
     *   <li>
     *   An optional alignment specifier that says if the result should be left-justified or
     *   right-justified. The default is right-justified; a - character here will make it left-justified.
     *   </li>
     *   <li>
     *   An optional number, a width specifier that says how many characters (minimum) this conversion
     *   should result in.
     *   </li>
     *   <li>
     *   An optional precision specifier in the form of a period (`.') followed by an optional
     *   decimal digit string that says how many decimal digits should be displayed for floating-point numbers.
     *   When using this specifier on a string, it acts as a cutoff point, setting a maximum character limit
     *   to the string.
     *   </li>
     *   <li>
     *     A type specifier that says what type the argument data should be treated as.
     *   </li>
     * </ol>
     * <span style="font-weight: bold; padding-left: 20px;">Possible types:</span>
     * <ul>
     *   <li>% - a literal percent character. No argument is required.</li>
     *   <li>b - the argument is treated as an integer, and presented as a binary number.</li>
     *   <li>c - the argument is treated as an integer, and presented as the character with that ASCII value.</li>
     *   <li>d - the argument is treated as an integer, and presented as a (signed) decimal number.</li>
     *   <li>e - the argument is treated as scientific notation (e.g. 1.2e+2). The precision specifier stands
     *     for the number of digits after the decimal point.</li>
     *   <li>E - like %e but uses uppercase letter (e.g. 1.2E+2).</li>
     *   <li>f - the argument is treated as a float, and presented as a floating-point number (locale aware).</li>
     *   <li>F - the argument is treated as a float, and presented as a floating-point number (non-locale aware).</li>
     *   <li>g - shorter of %e and %f.</li>
     *   <li>G - shorter of %E and %f.</li>
     *   <li>o - the argument is treated as an integer, and presented as an octal number.</li>
     *   <li>s - the argument is treated as and presented as a string.</li>
     *   <li>u - the argument is treated as an integer, and presented as an unsigned decimal number.</li>
     *   <li>x - the argument is treated as an integer and presented as a hexadecimal number (with lowercase letters).</li>
     *   <li>X - the argument is treated as an integer and presented as a hexadecimal number (with uppercase letters).</li>
     * </ul>
     * @param params {...*} One or more parameters to format into the format string.
     * @returns {String} The formatted string.
     */
    StringImpl.sprintf = function (format) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // Check for format definition
        if (typeof format != 'string') {
            throw "sprintf: The first arguments need to be a valid format string.";
        }
        /**
         * Define the regex to match a formatting string
         * The regex consists of the following parts:
         * percent sign to indicate the start
         * (optional) sign specifier
         * (optional) padding specifier
         * (optional) alignment specifier
         * (optional) width specifier
         * (optional) precision specifier
         * type specifier:
         *  % - literal percent sign
         *  b - binary number
         *  c - ASCII character represented by the given value
         *  d - signed decimal number
         *  f - floating point value
         *  o - octal number
         *  s - string
         *  x - hexadecimal number (lowercase characters)
         *  X - hexadecimal number (uppercase characters)
         */
        var r = new RegExp("%(\\+)?([0 ]|'(.))?(-)?([0-9]+)?(\\.([0-9]+))?([%bcdfosxX])", "g");
        /**
         * Each format string is split into the following parts:
         * 0: Full format string
         * 1: sign specifier (+)
         * 2: padding specifier (0/<space>/'<any char>)
         * 3: if the padding character starts with a ' this will be the real
         *    padding character
         * 4: alignment specifier
         * 5: width specifier
         * 6: precision specifier including the dot
         * 7: precision specifier without the dot
         * 8: type specifier
         */
        var parts = [];
        var paramIndex = 0;
        var part;
        while (part = r.exec(format)) {
            // Check if an input value has been provided, for the current
            // format string (no argument needed for %%)
            if ((paramIndex >= params.length) && (part[8] != '%')) {
                throw "sprintf: At least one argument was missing.";
            }
            parts[parts.length] = {
                /* beginning of the part in the string */
                begin: part.index,
                /* end of the part in the string */
                end: part.index + part[0].length,
                /* force sign */
                sign: (part[1] == '+'),
                /* is the given data negative */
                negative: (parseFloat(params[paramIndex]) < 0) ? true : false,
                /* padding character (default: <space>) */
                padding: (part[2] == undefined) ? (' ') : ((part[2].substring(0, 1) == "'") ? (part[3]) : (part[2])),
                /* should the output be aligned left?*/
                alignLeft: (part[4] == '-'),
                /* width specifier (number or false) */
                width: (part[5] != undefined) ? part[5] : false,
                /* precision specifier (number or false) */
                precision: (part[7] != undefined) ? part[7] : false,
                /* type specifier */
                type: part[8],
                /* the given data associated with this part converted to a string */
                data: (part[8] != '%') ? String(params[paramIndex++]) : false
            };
        }
        var newString = StringImpl.EMPTY;
        var start = 0;
        for (var i = 0; i < parts.length; ++i) {
            // Add first unformated string part
            newString += format.substring(start, parts[i].begin);
            // Mark the new string start
            start = parts[i].end;
            // Create the appropriate pre-format substitution
            // This substitution is only the correct type conversion. All the
            // different options and flags haven't been applied to it at this
            // point
            var preSubstitution = "";
            switch (parts[i].type) {
                case '%':
                    preSubstitution = "%";
                    break;
                case 'b':
                    preSubstitution = Math.abs(parseInt(parts[i].data)).toString(2);
                    break;
                case 'c':
                    preSubstitution = String.fromCharCode(Math.abs(parseInt(parts[i].data)));
                    break;
                case 'd':
                    preSubstitution = String(Math.abs(parseInt(parts[i].data)));
                    break;
                case 'f':
                    preSubstitution = (parts[i].precision === false) ? (String((Math.abs(parseFloat(parts[i].data))))) : (Math.abs(parseFloat(parts[i].data)).toFixed(parts[i].precision));
                    break;
                case 'o':
                    preSubstitution = Math.abs(parseInt(parts[i].data)).toString(8);
                    break;
                case 's':
                    preSubstitution = parts[i].data.substring(0, parts[i].precision ? parts[i].precision : parts[i].data.length); /* Cut if precision is defined */
                    break;
                case 'x':
                    preSubstitution = Math.abs(parseInt(parts[i].data)).toString(16).toLowerCase();
                    break;
                case 'X':
                    preSubstitution = Math.abs(parseInt(parts[i].data)).toString(16).toUpperCase();
                    break;
                default:
                    throw 'sprintf: Unknown type "' + parts[i].type + '" detected. This should never happen. Maybe the regex is wrong.';
            }
            // The % character is a special type and does not need further processing
            if (parts[i].type == "%") {
                newString += preSubstitution;
                continue;
            }
            // Modify the preSubstitution by taking sign, padding and width
            // into account
            // Pad the string based on the given width
            if (parts[i].width != false) {
                // Padding needed?
                if (parts[i].width > preSubstitution.length) {
                    var origLength = preSubstitution.length;
                    for (var j = 0; j < parts[i].width - origLength; ++j) {
                        preSubstitution = (parts[i].alignLeft == true) ? (preSubstitution + parts[i].padding) : (parts[i].padding + preSubstitution);
                    }
                }
            }
            // Add a sign symbol if necessary or enforced, but only if we are
            // not handling a string
            if (parts[i].type == 'b' || parts[i].type == 'd' || parts[i].type == 'o' || parts[i].type == 'f' || parts[i].type == 'x' || parts[i].type == 'X') {
                if (parts[i].negative == true) {
                    preSubstitution = "-" + preSubstitution;
                }
                else if (parts[i].sign == true) {
                    preSubstitution = "+" + preSubstitution;
                }
            }
            // Add the substitution to the new string
            newString += preSubstitution;
        }
        // Add the last part of the given format string, which may still be there
        newString += format.substring(start, format.length);
        return newString;
    };
    /**
     * @description Converts a string to a boolean.
     * @method toBoolean
     * @memberof String
     * @param str {String} The string to convert to boolean.
     * @returns {boolean} True if the string is 'true' or 'yes'. False otherwise.
     * @example var isTrue = String.toBoolean('true');
     */
    StringImpl.toBoolean = function (str) {
        return (str.toLowerCase() === "true") || (str.toLowerCase() === "yes");
    };
    /**
     * @description Creates a copy of the current string converted to title case.
     * @method toTitleCase
     * @memberof String.prototype
     * @param str {String} The string to convert case.
     * @returns {String} The current string converted to title case.
     * @example 'hello world'.toTitleCase();
     */
    StringImpl.toTitleCase = function (str) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|is|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
        return str.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
            if (index > 0 && index + match.length !== title.length && match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') && title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }
            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }
            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    };
    /**
     * @description An empty string.
     * @constant EMPTY
     * @type {String}
     * @memberof String
     */
    StringImpl.EMPTY = '';
    /**
     * @description Creates a copy of the current string converted to camel case
     * based on word breaks. The words may be separated with dash, underscore,
     * period, or space.
     * @method toCamelCase
     * @memberof String.prototype
     * @param str {String} THe string to convert case.
     * @returns {String} The current string converted to camel case.
     * @example 'hello_world'.toCamelCase();
     */
    StringImpl.toCamelCase = function (str) {
        // Where [-_ .] is the separator, you can add say '@' too
        // + is to handle repetition of separator
        // ? is to take care of preceding token
        // match nov(ember)? matches nov and november
        var result = this.replace(/[-_ .]+(.)?/g, function (match, p) {
            if (p) {
                return p.toUpperCase();
            }
            return StringImpl.EMPTY;
        }).replace(/[^\w]/gi, StringImpl.EMPTY); //strip unwanted characters
        return result;
    };
    return StringImpl;
})();
exports.StringImpl = StringImpl;
//# sourceMappingURL=extensions.js.map