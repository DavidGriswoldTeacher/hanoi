// shape: position 0 is the largest disk, position n is the smallest disk
// holds values 1, 2, or 3
var diskPositions = [];
var numDisks = 0;
//shape: each tower has an array of which disks it contains, from bottom to top
// it will be enforced that each is in ascending order
// and that this matches diskPositions
var towerDisks = [[], [], []];
var colors = ["navy",
    "crimson",
    "darkgreen",
    "darkviolet",
    "goldenrod",
    "darkorange",
    "darkgray",
    "brown",
    "black"
];

document.getElementById("numDisks").onchange = createDisks;
document.getElementById("runButton").onclick = runCode;
document.getElementById("resetButton").onclick=createDisks;
document.getElementById("code").onkeydown=checkKey;

createDisks();

function createDisks() {
    document.getElementById("errorArea").innerText="";
    numDisks = document.getElementById("numDisks").value;
    diskPositions = [];
    towerDisks = [[], [], []];
    for (var i = 0; i < numDisks; i++) {
        diskPositions[i]=1;
        towerDisks[0][i]=i;
    }

    drawTowers();
}

function drawTowers() {
    var canvas = document.getElementById("towerCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 300);
    ctx.fillStyle = "#613a02";
    ctx.fillRect(95, 100, 10, 200);
    ctx.fillRect(245, 100, 10, 200);
    ctx.fillRect(395, 100, 10, 200);
    ctx.font = "20px Consolas";
    ctx.textAlign = "center";
    ctx.fillText("Start",100,50);
    ctx.fillText("Free parking",250,50);
    ctx.fillText("Destination", 400,50);
    ctx.fillText("Tower 1", 100, 80);
    ctx.fillText("Tower 2",250, 80);
    ctx.fillText("Tower 3", 400, 80);
    for (var i = 0; i < diskPositions.length; i++) {
        var w = 120 - 12 * i;
        var h = 20;
        var towerIndex = diskPositions[i]-1
        var xpos = towerIndex*150 + 100 - w/2;
        var numOnTower = towerDisks[towerIndex].indexOf(i) + 1;
        var ypos = 300 - numOnTower*h;
        ctx.fillStyle=colors[i];
        ctx.fillRect(xpos, ypos, w, h);
        ctx.fillStyle = "#ffffff";
 
        ctx.font = "15px Consolas";
       ctx.fillText(i, xpos+w/2, ypos+15);

    }
}

function moveDisk(startTower, endTower) {

    var startArray = towerDisks[startTower-1];
    var diskNum = startArray[startArray.length-1];
    var endArray = towerDisks[endTower-1];
    if (endArray[endArray.length-1] > diskNum) {
        writeError("Cannot move larger disk " + 
        diskNum + "on top of a smaller disk " + 
        endArray[endArray.length-1] + ".");
    }else if (startArray.length == 0) {
        writeError("Tried to move a disk from tower " + startTower + " but no disks were there.")
    }else {
        diskPositions[diskNum] = endTower;
        startArray.pop();
        endArray.push(diskNum);
        drawTowers();
    }
}

function runCode() {
    document.getElementById("errorArea").innerText="";
    var code = document.getElementById("code").value;
    eval(code);
}

function writeError(error) {
    console.log(error);
    document.getElementById("errorArea").innerText+=error;
}

function checkKey(e) {
    if (e.ctrlKey && e.keyCode==13) {
        //ctrl-enter pressed
        preventDefault();
        runCode();
    }
}