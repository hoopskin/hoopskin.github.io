var firstType = 'Number';
var secondType = 'Number';
var answerType = 'Number';

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
	}
	if (secondType == 'Number') {
		answer+=parseInt(secondNum);
	} else {
		//Modify roman to numbers and add to answer
	}

	//Check if answerType is roman. Modify if needed
	if (answerType=='Roman') {

	}

	$('#answer').val(answer);
}

//Pulled from StackOverflow to check for empties. Need to 
function checkForEmpties() {
    var empty = $('.form-control').filter(function() {
        return this.value === "";
    });
    //-1 used because the 'answer' input will be blank. Remove this if 'answer' is no longer an input
    if(empty.length-1) {
        //At least one input is empty
        console.log("Error. Missing required field")
    	return false;
    }
    return true;
}