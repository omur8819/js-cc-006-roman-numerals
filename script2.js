var RomanNumbers = function() {

	var _letters = ["I", "V", "X", "L", "C", "D", "M", "(V)", "(X)", "(L)", "(C)", "(D)", "(M)"];
	var _regexp = /^((\(M\)){0,3})(\(C\)\(M\)|\(C\)\(D\)|(\(D\))?(\(C\)){0,3})(\(X\)\(C\)|\(X\)\(L\)|(\(L\))?(\(X\)){0,3})(M\(X\)|M\(V\)|(\(V\))?)(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

	//---Method to test a Roman numeral
	this.testRoman = function(roman) {

		return _regexp.test(roman);

	}

	//---Method to obtain a Roman numeral
	this.getRomanNumber = function(number) {

		if (number > 3999999) throw "Numbers higher than 3999999 can't be converted to Roman. Try a lower value!";

		var roman = "";
		var cant = String(number).length;
		var narray = String(number).split("").reverse();

		var parser = function(item, index, a) {
            
			switch(item) {

				case "0":
				case "1":
				case "2":
				case "3":
					roman = (new Array(Number(item) + 1).join(_letters[index * 2])) + roman;
				break;

				case "4":
					roman = _letters[index * 2] + _letters[index * 2 + 1] + roman;
				break;

				case "5":
				case "6":
				case "7":
				case "8":
					roman = _letters[index * 2 + 1] + (new Array(Number(item) - 4).join(_letters[index * 2])) + roman;
				break;

				case "9":
					roman = _letters[index * 2] + _letters[index * 2 + 2] + roman;
				break;

			}

		}

		narray.forEach(parser);

		return roman;

	}

	//---Method to obtain an Arabic number
	this.getArabicNumber = function (roman) {

		if (!this.testRoman(roman)) throw "You have entered an invalid Roman numeral. Please try with another value";

		var reg = /(\()(\w)(\))/g;
		var simple = "";
		var values = 0;
		var array = _regexp.exec(roman);

		array.splice(0, 1);
		array.splice(1, 1);
		array.splice(2, 2);
		array.splice(3, 2);
		array.splice(4, 1);

		var parser = function(item, index, a) {

			switch(index){

				case 0:
				case 1:
				case 2:
					simple = item.replace(reg, "$2");
					values += getValue(simple) * 1000;
				break;

				case 3:
					simple = item.replace(reg, "$2");
					values += ((simple.slice(0, 1) == "M") ? getValue(simple.slice(1, 2)) * 1000 - getValue(simple.slice(0, 1)) : getValue(simple) * 1000);
				break;

				case 4:
				case 5:
				case 6:
				case 7:
					values += getValue(item);
				break;

			}

		}

		array.forEach(parser);

		return values;

	}

	//---Private function to return a number from a Roman numeral string
	function getValue(str) {

		var cant = str.length;
		var chars = [];
		var ret = 0;

		switch(cant) {

			case 1:
				ret = getNumberByIndex(_letters.indexOf(str));
			break;

			case 2:
				chars = str.split("");
				ret = ((_letters.indexOf(chars[0]) < _letters.indexOf(chars[1])) ? getNumberByIndex(_letters.indexOf(chars[1])) - getNumberByIndex(_letters.indexOf(chars[0])) : getNumberByIndex(_letters.indexOf(chars[0])) + getNumberByIndex(_letters.indexOf(chars[1])));
			break;

			case 3:
				chars = str.split("");
				ret = sumAllNumbers(getNumberByIndex(_letters.indexOf(chars[0])), getNumberByIndex(_letters.indexOf(chars[1])), getNumberByIndex(_letters.indexOf(chars[2])));
			break;

			case 4:
				chars = str.split("");
				ret = sumAllNumbers(getNumberByIndex(_letters.indexOf(chars[0])), getNumberByIndex(_letters.indexOf(chars[1])), getNumberByIndex(_letters.indexOf(chars[2])), getNumberByIndex(_letters.indexOf(chars[3])));
			break;

		}

		return ret;

	}

	//---Private function to return a number taking into account the index in the letter Array
	function getNumberByIndex(index) {
		return ((index % 2 == 0) ? Math.pow(10, index / 2) : Math.pow(10, (index + 1) / 2) / 2);
	}

	//---Private function to sum multiple numbers
	function sumAllNumbers() {

		return Array.prototype.reduce.call(arguments, function (s, n) {
			return s + n;
		}, 0);

	}

}