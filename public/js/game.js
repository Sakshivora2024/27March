var score = 0;
var timeleft = 45;
var elem = document.getElementById('Timer');
var scorepoint = document.getElementById('scoreCount');
var timerId = setInterval(countdown, 1000);

document.addEventListener("click", function (e) {
    const target = e.target.closest("#target");

    if (target) {
        countdown();
        add_row();
        add_column();
        add_color();
        opacity1();

        score += 1;
        scorepoint.innerHTML = "Score:" + score + "";
        target.removeAttribute("id");
    }
});

function add_color() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var bgcolor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("t1").style.background = bgcolor;
    var x = document.getElementById('t1').getElementsByTagName("td");
    for (var i = 0; i < x.length; i++) {
        x[i].style.opacity = 1.0;
    }
}

function opacity1() {
    var x = document.getElementById('t1').getElementsByTagName("td");
    var randomNum = Math.floor(Math.random() * (parseInt(x.length)));

    x[parseInt(randomNum)].style.opacity -= 0.9;
    x[parseInt(randomNum)].setAttribute('id', 'target');
}

function countdown() {
    if (timeleft == -1) {
        elem.inneHTML = 'Timeout';
        clearTimeout(timerId);
        document.getElementById("t1").style.pointerEvents = "none";
        alert("reload");
        location.reload();
    }
    else {
        elem.innerHTML = timeleft + ' second remaining';
        timeleft--;
    }
}

var counter = 5;
function add_row() {
    var tbl = document.getElementById("t1");
    var row_count = tbl.rows.length;
    var cols_count = tbl.rows[0].cells.length;
    var emptyRow = tbl.insertRow(row_count.length);
    var cell;
    for (var i = 0; i < cols_count; i++) {
        cell = emptyRow.insertCell(i);
        cell.id = counter.toString();
        counter++;
    }
}
function add_column() {
    var tbl = document.getElementById("t1");
    var row_count = tbl.rows.length;
    var cols_count = tbl.rows[0].cells.length;
    var rows = tbl.rows;
    for (var i = 0; i < row_count; i++) {
        cell = rows[i].insertCell(cols_count);
        cell.id = counter.toString();
        counter++;
    }
}