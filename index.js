const jsNumber = document.getElementsByClassName("jsNumber");
const jsDisplay = document.getElementById("jsDisplay");
const jsEraser = document.getElementById("jsEraser");
const jsPlus = document.getElementById("jsPlus");
const jsMinus = document.getElementById("jsMinus");
const jsMultiply = document.getElementById("jsMultiply");
const jsEqual = document.getElementById("jsEqual");
const jsDivision = document.getElementById("jsDivision");

let numberStorage = [];
let operation = null;
let result = 0;

const setEventListener = (target, preHandler, newHandler) => {
    if (preHandler) {
        target.removeEventListener("click", preHandler);
    }
    target.addEventListener("click", newHandler);
};

const setData = (_numberStorage, _result, _operation, _innerText) => {
    numberStorage = _numberStorage;
    result = _result;
    operation = _operation;
    jsDisplay.innerText = _innerText;
};

const handleOperation = (_operation) => {
    jsDisplay.innerText = "0";
    for (let i = 0; i < jsNumber.length; i++) {
        if (result) {
            break;
        }
        setEventListener(jsNumber[i], superHandler.handleClickFirst, superHandler.handleClickSecond);
    }
    if (operation) {
        setData([], null, null, "0");
        alert("You input too many operations in calculator!");
        alert("please restart again!");
        location.reload();
    } else {
        operation = _operation;
    }
};

const superHandler = {
    handleClickFirst: (e) => {
        e.preventDefault();
        const {
            target: { innerText: number },
        } = e;
        if (jsDisplay.innerText === "0") {
            jsDisplay.innerText = number;
        } else {
            jsDisplay.innerText += number;
        }
        numberStorage[0] = parseInt(jsDisplay.innerText);
    },
    handleClickSecond: (e) => {
        e.preventDefault();
        if (operation) {
            const {
                target: { innerText: number },
            } = e;
            if (jsDisplay.innerText === "0") {
                jsDisplay.innerText = number;
            } else {
                jsDisplay.innerText += number;
            }
            numberStorage[1] = parseInt(jsDisplay.innerText);
        } else {
            alert("You just add some numbers to result value");
            alert("please restart again!");
            location.reload();
        }
    },
    handleErase: (e) => {
        e.preventDefault();
        for (let i = 0; i < jsNumber.length; i++) {
            if (result || operation) {
                setEventListener(jsNumber[i], superHandler.handleClickSecond, superHandler.handleClickFirst);
            }
        }
        setData([], null, null, "0");
    },
    handlePlus: (e) => {
        e.preventDefault();
        handleOperation("+");
    },
    handleMinus: (e) => {
        e.preventDefault();
        handleOperation("-");
    },
    handleMultiply: (e) => {
        e.preventDefault();
        handleOperation("*");
    },
    handleDivision: (e) => {
        e.preventDefault();
        handleOperation("/");
    },
    handleEqual: (e) => {
        e.preventDefault();
        if (operation) {
            if (operation === "+") {
                result = numberStorage[0] + numberStorage[1];
            }
            if (operation === "-") {
                result = numberStorage[0] - numberStorage[1];
            }
            if (operation === "*") {
                result = numberStorage[0] * numberStorage[1];
            }
            if (operation === "/") {
                result = numberStorage[0] / numberStorage[1];
            }
            setData([], result, null, "");
            jsDisplay.innerText = result;
            numberStorage[0] = result;
        } else {
            alert("calc Error!");
            alert("please restart again!");
            location.reload();
        }
    },
};

const init = () => {
    // todo : when button is pressed, show number on display
    for (let i = 0; i < jsNumber.length; i++) {
        setEventListener(jsNumber[i], null, superHandler.handleClickFirst);
    }
    jsEraser.addEventListener("click", superHandler.handleErase);
    jsPlus.addEventListener("click", superHandler.handlePlus);
    jsMinus.addEventListener("click", superHandler.handleMinus);
    jsMultiply.addEventListener("click", superHandler.handleMultiply);
    jsEqual.addEventListener("click", superHandler.handleEqual);
    jsDivision.addEventListener("click", superHandler.handleDivision);
};

if (jsNumber && jsDisplay && jsEraser && jsPlus && jsMinus && jsMultiply && jsEqual && jsDivision) {
    init();
}
