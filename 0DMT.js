var i = 0;
var running = false;
var currentSpeed = 0;
var UniversalSpeed = 200;
var previousElement;
var jumbleFunctionList;
(function (jumbleFunctionList) {
    jumbleFunctionList[jumbleFunctionList["randomCharacters"] = 0] = "randomCharacters";
    jumbleFunctionList[jumbleFunctionList["randomAlphabets"] = 1] = "randomAlphabets";
    jumbleFunctionList[jumbleFunctionList["randomCapitals"] = 2] = "randomCapitals";
    jumbleFunctionList[jumbleFunctionList["randomLowerCase"] = 3] = "randomLowerCase";
})(jumbleFunctionList || (jumbleFunctionList = {}));
function defaultJumble(element, jumbleVar) {
    if (element === void 0) { element = previousElement; }
    if (jumbleVar === void 0) { jumbleVar = 0; }
    jumbleCharacters(element, returnNonNullTextContent(element.textContent), 10, UniversalSpeed, jumbleVar);
}
function defaultAdd(element, string) {
    if (element === void 0) { element = previousElement; }
    if (string === void 0) { string = "Hello World!"; }
    typeWriterAdd(element, string, UniversalSpeed);
}
function defaultDelete(element, places) {
    if (element === void 0) { element = previousElement; }
    if (places === void 0) { places = returnNonNullTextContent(element.textContent).length; }
    typeWriterDelete(element, places, UniversalSpeed);
}
function defaultChangeText(element, stringArray) {
    if (element === void 0) { element = previousElement; }
    if (stringArray === void 0) { stringArray = ["Hello!", "Goodbye!"]; }
    changeText(element, stringArray, UniversalSpeed);
}
function typeWriterAdd(element, string, speed) {
    i = 0;
    setTimeout(function () { addText(element, string, speed); }, currentSpeed);
    if (previousElement === element || previousElement === undefined) {
        currentSpeed += calculateSpeedString(string, speed);
    }
    else {
        currentSpeed = 0;
    }
    previousElement = element;
}
function typeWriterDelete(element, places, speed) {
    i = 0;
    setTimeout(function () { deleteText(element, places, speed); }, currentSpeed);
    if (previousElement === element || previousElement === undefined) {
        currentSpeed += calculateSpeed(places, speed);
    }
    else {
        currentSpeed = 0;
    }
    previousElement = element;
}
function addText(element, string, speed) {
    var arr = stringToArray(returnNonNullTextContent(element.textContent));
    var stringArray = [];
    for (var i_1 = 0; i_1 < string.length; i_1++) {
        arr.push(stringToArray(string)[i_1]);
        stringArray.push(arrayToString(arr));
    }
    i = 0;
    changeTextThenStop(element, stringArray, speed);
}
function deleteText(element, places, speed) {
    var arr = stringToArray(returnNonNullTextContent(element.textContent));
    var stringArray = [];
    for (var i_2 = 0; i_2 < places; i_2++) {
        arr.pop();
        stringArray.push(arrayToString(arr));
    }
    i = 0;
    changeTextThenStop(element, stringArray, speed);
}
function changeTextThenStop(element, stringArray, speed) {
    if (i < stringArray.length) {
        element.textContent = stringArray[i];
        previousElement = element;
        i++;
        setTimeout(function () { changeTextThenStop(element, stringArray, speed); }, speed);
    }
    else {
        i = 0;
        currentSpeed = 0;
        return;
    }
}
function changeText(element, stringArray, speed) {
    if (i < stringArray.length) {
        i++;
    }
    else {
        i = 0;
    }
    element.textContent = stringArray[i];
    previousElement = element;
    setTimeout(function () { changeText(element, stringArray, speed); }, speed);
}
function jumbleCharacters(element, string, timesJumbled, speed, randCharGen) {
    jumbleStringFunction(element, string, timesJumbled, speed, function () { return randTextGen(string.length, randCharGen); });
}
function jumbleStringFunction(element, string, timesJumbled, speed, jumbleFunction) {
    if (i < timesJumbled) {
        element.textContent = jumbleFunction(string.length);
        i++;
    }
    else {
        i = 0;
        element.textContent = string;
        previousElement = element;
        return;
    }
    setTimeout(function () { jumbleStringFunction(element, string, timesJumbled, speed, jumbleFunction); }, speed);
}
function randText(numberOfCharacters, targetString) {
    var randomString = "";
    for (var i_3 = 0; i_3 < numberOfCharacters; i_3++) {
        randomString += targetString.charAt(Math.floor(Math.random() * targetString.length));
    }
    return randomString;
}
function randTextGen(numberOfCharacters, randCharGen) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    switch (randCharGen) {
        case 1:
            return randText(numberOfCharacters, alphabets);
            break;
        case 2:
            return randText(numberOfCharacters, capitals);
            break;
        case 3:
            return randText(numberOfCharacters, lowercase);
            break;
        default:
            return randText(numberOfCharacters, characters);
    }
}
function stringToArray(string) {
    var array = [];
    for (var i_4 = 0; i_4 < string.length; i_4++) {
        array.push(string.charAt(i_4));
    }
    return array;
}
function arrayToString(arr) {
    var string = "";
    string = arr.join("");
    return string;
}
function calculateSpeed(places, speed) {
    var functionSpeed = places * speed;
    return functionSpeed;
}
function calculateSpeedString(string, speed) {
    return calculateSpeed(string.length, speed);
}
function returnNonNullTextContent(textContent) {
    if (textContent === null) {
        return "";
    }
    else {
        return textContent;
    }
}
