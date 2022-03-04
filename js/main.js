const seedMoney = document.querySelector(".seed-money");
const betMoney = document.querySelector(".bet-money");
const playBtn = document.querySelector(".play-btn");
const rightDice = document.querySelector(".right-dice");
const leftDice = document.querySelector(".left-dice");

let totalMoney = 1000;
let isFalseSameDice = 0;

playBtn.addEventListener("click", isTrueMoney);
window.addEventListener("load", enterEvent);

function enterEvent() {
    betMoney.onkeypress = function (event) {
        if (event.keyCode == 13) {
            isTrueMoney();
        }
    };
}

function isTrueMoney() {
    // 판돈 양수 알럿
    let betMoney = document.querySelector(".bet-money").value;
    if (betMoney < 0) {
        alert("양수로 입력해주세요.");
        document.querySelector(".bet-money").value = "";
        return;
    }

    startDiceGame();
}

function startDiceGame() {
    // 주사위 초기화
    rightDice.innerHTML = "";
    leftDice.innerHTML = "";

    let num1 = Math.floor(Math.random() * 6 + 1);
    let num2 = Math.floor(Math.random() * 6 + 1);

    console.log("주사위 값: ", num1, num2);
    console.log("동일한 숫자가 아닌 경우: ", isFalseSameDice);

    increateSameDicesPercent();
    changeDices(num1, num2);
    countMoney(num1, num2);
    document.querySelector(".bet-money").value = "";
}

function countMoney(num1, num2) {
    let betMoney = document.querySelector(".bet-money").value;

    // 판돈 차감
    totalMoney = totalMoney - betMoney;
    seedMoney.innerHTML = totalMoney;
    console.log("현재 시드머니:", totalMoney);

    //두 주사위의 숫자가 같으면 다음 조건에 따라 머니 지급
    if (num1 === num2) sameDices(betMoney, num1);
    else isFalseSameDice = isFalseSameDice + 15;

    //시드머니가 다 떨어지면 다시 처음부터 시작 가능
    if (totalMoney < 0) {
        totalMoney = 1000;
        seedMoney.innerHTML = totalMoney;
    }
}

function sameDices(betMoney, num1) {
    betMoney = betMoney * num1;
    totalMoney = totalMoney + betMoney;
    seedMoney.innerHTML = totalMoney;

    console.log("판돈*동일한숫자:", betMoney);
    console.log("시드머니+판돈:", totalMoney);
}

function changeDices(num1, num2) {
    let diceNum1 = "";
    let diceNum2 = "";

    for (let i = 1; i <= num1; i++) {
        diceNum1 += '<div class="dice-num dice-num' + i + '"></div>';
    }
    rightDice.insertAdjacentHTML("beforeend", diceNum1);

    for (let i = 1; num2 >= i; i++) {
        diceNum2 += '<div class="dice-num dice-num' + i + '"></div>';
    }
    leftDice.insertAdjacentHTML("beforeend", diceNum2);
}

//플레이 횟수가 많아질 수록 더 높은 숫자의 동일한 숫자가 나올 확률을 높임
function increateSameDicesPercent() {
    if (isFalseSameDice <= 15) {
        countRandom(6, 1);
    } else if (isFalseSameDice <= 30) {
        countRandom(6, 2);
    } else if (isFalseSameDice <= 45) {
        countRandom(6, 3);
    } else if (isFalseSameDice <= 60) {
        countRandom(6, 4);
    } else if (isFalseSameDice <= 75) {
        countRandom(6, 5);
    } else if (isFalseSameDice <= 90) {
        countRandom(6, 6);
    }
}

function countRandom(max, min) {
    Math.floor(Math.random() * max) + min;
}
