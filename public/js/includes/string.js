'use strict';

var impl = require('./../extensions').StringImpl;

if (!String) {
    // This will never execute. Hack to get extension method JSDoc to generate.
    (function() {
        /**
         * @description Placeholder for String class. The methods below are extension methods
         * for the builtin String type.
         * @returns {String}
         * @constructor String
         */
        function __String() {
            return this;
        }
    })();
}

if (!String.EMPTY) {
    /**
     * @description An empty string.
     * @constant EMPTY
     * @type {String}
     * @memberof String
     */
    String.EMPTY = impl.EMPTY;
}

if (!String.equals) {
    /**
     * @description Compares two strings for equality.
     * @method equals
     * @memberof String
     * @param string {String} The first string to compare.
     * @param other {String} The second string to compare.
     * @returns {boolean} True if strings are equal. False otherwise.
     * @example var isEqual = String.equals('string', 'string');
     */
    String.equals = function (string, other) {
        return impl.equals(string, other);
    }
}

if (!String.format) {
    /**
     * @description Formats a string using numbered tokens e.g. 'Format string {0}, {1}, {2}'.
     * @method format
     * @memberof String
     * @param format {String} The format for the string.
     * @param params {...*} One or more parameters to format into the format string.
     * @returns {String} The formatted string.
     * @example String.format('Hello, my name is {0} {1}.', 'John', 'Doe');
     */
    String.format = function(format) {
      // this is String
      return impl.format.apply(this, arguments);
    };
}

if (!String.generatePassword) {
    /**
     * @description Generate a password.
     * @method generatePassword
     * @memberof String
     * @param length {int} Length of the new password.
     * @param inclNumbers {boolean} Whether to include numbers in the new password.
     * @param inclSymbols {boolean} Whether to include symbols in the new password.
     * @returns {string} A new randomly generated password.
     */
    String.generatePassword = function (length, inclNumbers, inclSymbols) {
      return impl.generatePassword(length, inclNumbers, inclSymbols);
    };
}

if (!String.isNullOrEmpty) {
    /**
     * @description Determine if a string is null, undefined, or zero length.
     * @method isNullOrEmpty
     * @memberof String
     * @param string {String} The string to check.
     * @returns {boolean} True if null, undefined, or zero length. False otherwise.
     */
    String.isNullOrEmpty = function (string) {
        return impl.isNullOrEmpty(string);
    };
}

if (!String.md5) {
    /**
     * @description Generates a MD5 message digest for the current string instance.
     * @method md5
     * @memberof String
     * @param str {String} The string to compute digest.
     * @returns {String} The MD5 message digest for the current string instance.
     * @example 'password'.md5();
     */
    String.md5 = function (str) {
        return impl.md5(str);
    };
}

if (!String.print) {
    /**
     * @description Prints a formatted string.
     * @method print
     * @memberof String
     * @param format {String} The format for the string.
     * @param params {...*} One or more parameters to format into the format string.
     * @example String.print('Hello, my name is {0} {1}.', 'John', 'Doe');
     * @see String.format
     */
    String.print = function() {
        // Print
        impl.print.apply(this, arguments);
    };
}

if (!String.printf) {
    /**
     * @description Prints a formatted string.
     * @method printf
     * @memberof String
     * @param format {String} The format for the string.
     * @param params {...*} One or more parameters to format into the format string.
     * @example String.printf('Hello, my name is %s %s, I am %d years old.', 'John', 'Doe', 46);
     * @see String.sprintf
     */
    String.printf = function() {
        // Print
        impl.printf.apply(this, arguments);
    };
}

if (!String.sprintf) {
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
    String.sprintf = function(format) {
        // this is String
        return impl.sprintf.apply(this, arguments);
    };
}

if (!String.toBoolean) {
    /**
     * @description Converts a string to a boolean.
     * @method toBoolean
     * @memberof String
     * @param string {String} The string to convert to boolean.
     * @returns {boolean} True if the string is 'true' or 'yes'. False otherwise.
     * @example var isTrue = String.toBoolean('true');
     */
    String.toBoolean = function (string) {
        return (string.toLowerCase() === "true") ||
            (string.toLowerCase() === "yes");
    };
}

// Instance Extension Methods
if (!String.prototype.clone) {
    /**
     * @description Returns a new string containing a copy of the current string.
     * @method clone
     * @memberof String.prototype
     * @returns {String} A copy of the current string.
     * @example var newString = 'Hello World'.clone();
     */
    String.prototype.clone = function () {
        return String.clone.apply(this, this);
    };
}

if (!String.prototype.equals) {
    /**
     * @description Compares the current string to another string.
     * @method equals
     * @memberof String.prototype
     * @param other {String} The string to compare.
     * @returns {boolean} True if the current and other strings are equal. False otherwise.
     * @example var isEqual = 'string'.equals('string');
     */
    String.prototype.equals = function (other) {
        return String.equals(this, other);
    };
}

if (!String.prototype.format) {
    /**
     * @description Formats a string using the current string as the format string.
     * Numbered tokens are used to insert values e.g. 'Format string {0}, {1}, {2}'.
     * @method format The format string is composed of zero or more directives:
     * ordinary characters (excluding %) that are copied directly to the result, and
     * conversion specifications, each of which results in fetching its own parameter.
     * @memberof String.prototype
     * @param params {...*} One or more parameters to format into the format string.
     * @returns {String} The formatted string.
     * @see String.format
     * @example 'Hello, my name is {0} {1}.'.sprintf('John', 'Doe');
     */
    String.prototype.format = function() {
        var args = [ this ];
        for (var i = 0; i < arguments.length; i++)
            args.push(arguments[i]);

        return String.format.apply(this, args);
    };
}

if (!String.prototype.hashCode) {
    /**
     * @description Generates a hashcode for the current string.
     * @method hashCode
     * @memberof String.prototype
     * @returns {String} The hashcode for the current string.
     * @example 'Hello World'.hashCode();
     */
    String.prototype.hashCode = function () {
        return impl.hashCode(this);
    };
}

if (!String.prototype.ltrim) {
    /**
     * @description Creates a copy of the current string with the leading whitespace
     * removed.
     * @method ltrim
     * @memberof String.prototype
     * @returns {String} The current string with the leading spaces removed.
     * @example '   Hello World'.ltrim();
     */
    String.prototype.ltrim = function () {
        return this.replace(/^\s+/, "");
    };
}

if (!String.prototype.md5) {
    /**
     * @description Generates a MD5 message digest for the current string instance.
     * @method md5
     * @memberof String.prototype
     * @returns {String} The MD5 message digest for the current string instance.
     * @example 'password'.md5();
     */
    String.prototype.md5 = function () {
      return String.md5(this);
    };
}

if (!String.prototype.print) {
    /**
     * @description Prints a formatted string using the current string as the format string.
     * @method print
     * @memberof String.prototype
     * @param params {...*} One or more parameters to format into the format string.
     * @example 'Hello, my name is {0} {1}.'.print('John', 'Doe');
     * @see String.format
     */
    String.prototype.print = function() {
        var args = [ this ];
        for (var i = 0; i < arguments.length; i++)
            args.push(arguments[i]);

        String.print.apply(this, args);
    };
}

if (!String.prototype.printf) {
    /**
     * @description Prints a formatted string using the current string as the format string.
     * @method printf
     * @memberof String.prototype
     * @param params {...*} One or more parameters to format into the format string.
     * @example 'Hello, my name is %s %s, I am %d years old.'.printf('John', 'Doe', 46);
     * @see String.sprintf
     */
    String.prototype.printf = function() {
        var args = [ this ];
        for (var i = 0; i < arguments.length; i++)
            args.push(arguments[i]);

        String.printf.apply(this, args);
    };
}

if (!String.prototype.rtrim) {
    /**
     * @description Creates a copy of the current string with the trailing whitespace
     * removed.
     * @method rtrim
     * @memberof String.prototype
     * @returns {String} The current string with the trailing spaces removed.
     * @example 'Hello World   '.rtrim();
     */
    String.prototype.rtrim = function () {
        return this.replace(/\s+$/, "");
    };
}

if (!String.prototype.sprintf) {
    /**
     * @description Formats a string using the current string as the format string.
     * The format string uses tokens e.g. 'Format string %s, %d, %f'
     * @method sprintf
     * @memberof String.prototype
     * @param params {...*} One or more parameters to format into the format string.
     * @returns {String} The formatted string.
     * @see String.format
     * @example 'Hello, my name is %s %s, I am %d years old.'.sprintf('John', 'Doe', 46);
     */
    String.prototype.sprintf = function() {
        var args = [ this ];
        for (var i = 0; i < arguments.length; i++)
            args.push(arguments[i]);

        return String.sprintf.apply(this, args);
    };
}

if (!String.prototype.toCamelCase) {
    /**
     * @description Creates a copy of the current string converted to camel case
     * based on word breaks. The words may be separated with dash, underscore,
     * period, or space.
     * @method toCamelCase
     * @memberof String.prototype
     * @returns {String} The current string converted to camel case.
     * @example 'hello_world'.toCamelCase();
     */
    String.prototype.toCamelCase = function() {
        // Where [-_ .] is the separator, you can add say '@' too
        // + is to handle repetition of separator
        // ? is to take care of preceding token
        // match nov(ember)? matches nov and november
        var result = this.replace(/[-_ .]+(.)?/g,
            function (match, p) {
                if (p) {
                    return p.toUpperCase();
                }
                return String.EMPTY;
            }).replace(/[^\w]/gi, String.EMPTY); //strip unwanted characters
        return result;
    };
}

if (!String.prototype.toTitleCase) {
    /**
     * @description Creates a copy of the current string converted to title case.
     * @method toTitleCase
     * @memberof String.prototype
     * @returns {String} The current string converted to title case.
     * @example 'hello world'.toTitleCase();
     */
    String.prototype.toTitleCase = function () {
//    return this.replace(/\b\w/g,
//                        function (string) {
//                          return string.toUpperCase();
//                        });
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|is|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    };
}