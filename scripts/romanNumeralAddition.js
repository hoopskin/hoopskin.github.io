var firstType = 'Number';
var secondType = 'Number';
var answerType = 'Number';
var conversionLetters = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
var conversionNumbers = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
var conversionLength = conversionNumbers.length;

//Reversed versions for roman -> number
var revConversionNumbers = conversionNumbers.reverse()
var revConversionLetters = conversionLetters.reverse()

function changeType(romanOrNumber, partIdx) {
	//TODO: Change dropdown name to 'Roman' or 'Number'

	//Modify global var to match
	if (partIdx == 1) {
		firstType = romanOrNumber;
	} else if (partIdx == 2) {
		secondType = romanOrNumber;
	} else {
		answerType = romanOrNumber;
	}
}

function romanToNumber(romanNumber) {
	var rtn = 0;
	//While there are still letters in romanNumber
	while(romanNumber.length > 0) {
		var idx = -1;
		//Check if first two letters are in conversionLetters (could be rev)
		if (conversionLetters.indexOf(romanNumber.substr(0,2)) != -1) {
			idx = conversionLetters.indexOf(romanNumber.substr(0,2));
			romanNumber = romanNumber.substr(2)
		} else {
			//If it isn't, take first letter and find index in conversionLetters
			idx = conversionLetters.indexOf(romanNumber.substr(0,1));
			romanNumber = romanNumber.substr(1)
		}
		//use that index to get number, add to rtn
		rtn+=conversionNumbers[idx]

	}

	return rtn;
}

function numberToRoman(numToConvert) {
	var rtn = "";
	for (var i = 0; i < conversionLength; i++) {
		var curNum = revConversionNumbers[i];
		var occurrances = Math.floor(numToConvert/curNum);
		if (occurrances > 0) {
			var letter = revConversionLetters[revConversionNumbers.indexOf(curNum)];
			rtn = rtn.concat(letter.repeat(occurrances))
			numToConvert-=(curNum*occurrances)
		}
	}
	return rtn;
}

function performMath() {
	if (!checkForEmpties()) {
		return;
	}
	var firstNum = $('#firstValue').val();
	var secondNum = $('#secondValue').val();
	var answer = 0;

	//Check if firstType or secondType is 'Number'. If it is, add to answer
	if (firstType == 'Number') {
		answer+=parseInt(firstNum);
	} else {
		//Modify roman to numbers and add to answer
		answer+=romanToNumber(firstNum)
	}
	if (secondType == 'Number') {
		answer+=parseInt(secondNum);
	} else {
		//Modify roman to numbers and add to answer
		answer+=romanToNumber(secondNum)
	}

	//Check if answerType is roman. Modify if needed
	if (answerType=='Roman') {
		answer = numberToRoman(answer)
	}

	$('#answer').val(answer);
}

function checkForEmpties() {
	var empty = $('.form-control').filter(function() {
		return this.value === "";
	});

	//-1 used because the 'answer' input will be blank at beginning. Remove this if 'answer' is no longer an input
	if(empty.length-1 > 0) {
		//At least one input is empty
		console.log("Error. Missing required field")
		return false;
	}
	return true;
}