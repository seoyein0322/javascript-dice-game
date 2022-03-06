const seedMoney = document.querySelector(".seed-money");
const betMoney = document.querySelector(".bet-money");
const playBtn = document.querySelector(".play-btn");
const rightDice = document.querySelector(".right-dice");
const leftDice = document.querySelector(".left-dice");

// 2. 게임을 시작할 때 시드머니 1000으로 시작
let totalMoney = 1000;
let isFalseSameDice = 0;

let num1;
let num2;

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

    increaseSameDicesPercent();
    console.log("주사위 값: ", num1, num2);
    console.log("동일한 숫자가 아닌 경우: ", isFalseSameDice);
    changeDices(num1, num2);
    countMoney(num1, num2);
    document.querySelector(".bet-money").value = "";
}

// 3. 가지고 있는 시드머니 내에서 판돈을 걸고, 시드머니가 다 떨어질때까지 게임 가능
function countMoney(num1, num2) {
    let betMoney = document.querySelector(".bet-money").value;

    // 판돈 차감
    totalMoney = totalMoney - betMoney;
    seedMoney.innerHTML = totalMoney;
    console.log("현재 시드머니:", totalMoney);

    if (num1 === num2) sameDices(betMoney, num1);
    else isFalseSameDice = isFalseSameDice + 15;

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

//6. 두 주사위의 숫자가 같지 않은 플레이 횟수가 많아질 수록 더 높은 숫자의 동일한 숫자가 나올 확률을 높임
function increaseSameDicesPercent() {
    if (isFalseSameDice <= 15) {
        return getRandom(7, 1);
    } else if (isFalseSameDice <= 30) {
        return getRandom(7, 2);
    } else if (isFalseSameDice <= 45) {
        return getRandom(7, 3);
    } else if (isFalseSameDice <= 60) {
        return getRandom(7, 4);
    } else if (isFalseSameDice <= 75) {
        return getRandom(7, 5);
    } else if (isFalseSameDice <= 90) {
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
