const seedMoney = document.querySelector(".seed-money");
const betMoney = document.querySelector(".bet-money");
const playBtn = document.querySelector(".play-btn");
const rightDice = document.querySelector(".right-dice");
const leftDice = document.querySelector(".left-dice");

// 2. 게임을 시작할 때 시드머니 1000으로 시작
let totalMoney = 1000;
let sameDicefailCount = 0;

let num1;
let num2;

playBtn.addEventListener("click", isvalidMoney);
window.addEventListener("load", enterEvent);

function enterEvent() {
    betMoney.onkeypress = function (event) {
        if (event.keyCode === 13 && isvalidMoney()) {
            startDiceGame();
        }
    };
}

function isvalidMoney() {
    // 판돈 양수 알럿
    let betMoneyVal = betMoney.value;
    if (betMoneyVal < 0) {
        alert("양수로 입력해주세요.");
        betMoney.value = "";
        return false;
    }
    return true;
}

function startDiceGame() {
    // 주사위 초기화
    rightDice.innerHTML = "";
    leftDice.innerHTML = "";

    increaseSameDicesPercent();
    createDicesDot();
    countMoney();
    document.querySelector(".bet-money").value = "";
}

// 3. 가지고 있는 시드머니 내에서 판돈을 걸고, 시드머니가 다 떨어질때까지 게임 가능
function countMoney() {
    let betMoneyVal = betMoney.value;

    // 판돈 차감
    totalMoney = totalMoney - betMoneyVal;
    seedMoney.innerHTML = totalMoney;

    if (num1 === num2) sameDices(betMoneyVal, num1);
    else sameDicefailCount = sameDicefailCount + 15;

    //4. 시드머니가 다 떨어지면 다시 처음부터 시작 가능
    if (totalMoney < 0) {
        totalMoney = 1000;
        seedMoney.innerHTML = totalMoney;
    }
}

// 5. 두 주사위의 숫자가 같으면 다음 조건에 따라 머니 지급
function sameDices(betMoney, num1) {
    betMoney = betMoney * num1;
    totalMoney = totalMoney + betMoney;
    seedMoney.innerHTML = totalMoney;
}

//6. 두 주사위의 숫자가 같지 않은 플레이 횟수가 많아질 수록 더 높은 숫자의 동일한 숫자가 나올 확률을 높임
function increaseSameDicesPercent() {
    if (sameDicefailCount <= 15) {
        return getRandom(7, 1);
    } else if (sameDicefailCount <= 30) {
        return getRandom(7, 2);
    } else if (sameDicefailCount <= 45) {
        return getRandom(7, 3);
    } else if (sameDicefailCount <= 60) {
        return getRandom(7, 4);
    } else if (sameDicefailCount <= 75) {
        return getRandom(7, 5);
    } else if (sameDicefailCount <= 90) {
        return getRandom(7, 6);
    } else {
        return getRandom(7, 1);
    }
}

function getRandom(max, min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    num1 = Math.floor(Math.random() * (max - min)) + min;
    num2 = Math.floor(Math.random() * (max - min)) + min;
}

function createDicesDot() {
    let diceNum1 = "";
    let diceNum2 = "";

    diceNum1 += `<div class="dice-num">${num1}</div>`;
    diceNum2 += `<div class="dice-num">${num2}</div>`;

    rightDice.innerHTML = diceNum1;
    leftDice.innerHTML = diceNum2;
}
