const amountEl = document.querySelector("#amount");
const yearsEl = document.querySelector("#years");
const rateEl = document.querySelector("#rate");
const payment1El = document.querySelector("#payment1");
const payment2El = document.querySelector("#payment2");
const feeEl = document.querySelector("#fee");
const calcEl = document.querySelector("#calc");
const tableEl = document.querySelector("#table tbody");
console.log(tableEl)

calcEl.addEventListener("click", calcLoan);

function calcLoan() {
    let amount = amountEl.value * 10000;
    let years = yearsEl.value;
    let rate = rateEl.value;
    // if feeEl is checked then 5000 else 0
    let fee = feeEl.checked ? 5000 : 0;
    let rule = payment1El.checked ? 1 : 2;

    let result;
    if (rule == 1) {
        result = rule1(amount, years, rate);
        console.log(result);
    } else {
        alert("功能製作中...");
        return;
    }

    let totalInterest = result[1];
    let totalAmount = amount + totalInterest + fee;
    console.log(amount, years, fee, rule, totalAmount, totalInterest)
    document.querySelector(".totalAmount").innerText = totalAmount + (fee == 0 ? "" : "(含手續費)");
    document.querySelector(".totalInterest").innerText = totalInterest;
    const resultEl = document.querySelector("#result");
    resultEl.style.display = "none";
    setTimeout(function () {
        resultEl.style.display = "block";
    }, 500);

    drawtable(result[0]);
}

function drawtable(datas) {
    let tableStr = "";
    for (let i = 0; i < datas.length; i++) {
        tableStr += "<tr>";
        for (let j = 0; j < datas[i].length; j++) {
            tableStr += `<td>${datas[i][j]}</td>`;
        }
        tableStr += "</tr>";
    }

    /**for (let i = 0; i < datas.length; i++) {
        console.log(datas[i].join(","));
        tableStr += `<li>${datas[i].join(",")}</li>`;
    }
    tableStr += "</ul>"
    console.log(tableStr);**/
    tableEl.innerHTML = tableStr;
}

function rule1(total_amount, years, rate) {
    let amount = total_amount;
    let period = years * 12;
    let month_rate = rate / 100 / 12;
    let month_pay = parseInt(amount / period);

    let datas = [];
    let totalInterest = 0;
    for (let i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate);
        amount -= month_pay
        //最後一期
        if (i == period - 1) {
            datas.push([i + 1, month_pay + amount, interest, month_pay + interest, 0]);
        } else {
            datas.push([i + 1, month_pay, interest, month_pay + interest, amount]);
        }
        totalInterest += interest;
    }
    //console.log(datas);
    return [datas, totalInterest];
}