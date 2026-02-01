function v(id) {
    return Number(document.getElementById(id).value) || 0;
}

function format(n) {
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function calc() {
    const earnings =
        v("basic") +
        v("hra") +
        v("other") +
        v("bonus");

    document.getElementById("earnings").value = format(earnings);

    // const pf = Math.round(v("basic") * 0.12);
    // document.getElementById("pf").value = format(pf);
    // document.getElementById("contri").value = format(pf);

    // const tax = v("tax");
    // document.getElementById("taxTotal").value = format(tax);


    const net = earnings - document.getElementById("pf").value - document.getElementById("tax").value;
    console.log(net);
    document.getElementById("net").value = format(net);
    document.getElementById("words").innerText = numberToWords(net);
}

function getAllocation(total, percentage) {
    return Math.trunc(total * percentage / 100) || 0;
}

function calculate() {
    // const earnings =
    //     v("basic") +
    //     v("hra") +
    //     v("other") +
    //     v("bonus");

    var net = v("takeHome");
    const earnings = net + v("pf") + v("tax") + v("lwf");
    const basic = getAllocation(earnings, 49);//basic
    const hra = getAllocation(earnings, 14);//hra
    const other = earnings - basic - hra;
    console.log(earnings, basic, hra, other);
    document.getElementById("basic").value = basic;
    document.getElementById("hra").value = hra;
    document.getElementById("other").value = other;
    document.getElementById("earnings").value = format(earnings);
    net = Number(net) + v("bonus");
    document.getElementById("net").value = format(net);
    document.getElementById("words").innerText = numberToWords(net);
}


document.getElementById("logoInput").addEventListener("change", e => {
    const box = document.getElementById("logoPreview");
    box.innerHTML = "";
    [...e.target.files].forEach(f => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(f);
        box.appendChild(img);
    });
});

function numberToWords(num) {
    if (!num) return "";
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const two = n => n < 20 ? a[n] : b[Math.floor(n / 10)] + " " + a[n % 10];
    const three = n => n >= 100 ? a[Math.floor(n / 100)] + " Hundred " + two(n % 100) : two(n);

    let str = "";
    const lakh = Math.floor(num / 100000); num %= 100000;
    const thou = Math.floor(num / 1000); num %= 1000;

    if (lakh) str += three(lakh) + " Lakh ";
    if (thou) str += three(thou) + " Thousand ";
    if (num) str += three(num);

    return str.trim() + " Rupees Only";
}
