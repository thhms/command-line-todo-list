"use strict";

// DATA & SETUP & DRAWING

var data = { 
    "notes": [],
    "status": [] 
}

const tutorialData = "{\"notes\":[\"HOW TO USE THIS PROGRAM:\",\"type \\\"done 1\\\"\",\"type \\\"swap 3 4\\\"\",\"type \\\"prio 0\\\"\",\"type \\\"del 2\\\"\",\"type \\\"something\\\"\",\"type \\\"clear\\\"\"],\"status\":[\"0\",\"0\",\"0\",\"0\",\"0\",0,\"0\"]}";
data = JSON.parse(tutorialData);

var input = document.getElementById('in');
var main = document.getElementById('main');

window.onload = () => {
    drawMain();
    input.focus();
    // Event Handler for Keyboard Input
    document.body.onkeydown = function (ev) { 
        if(ev.key == "Enter") { cmdInput(); } 
        if(ev.key == "ArrowDown") {
            if(main.scrollTop < main.scrollTopMax) { main.scrollTop += 30; }
        }
        if(ev.key == "ArrowUp") {
            if(main.scrollTop > 0) { main.scrollTop -= 30; }
        }
    }
}

function drawMain() {
    var s = "<table>";
    for (var i in data.notes) {
        if (data.notes[i] == "") { continue; }
        s += "<tr id='note" + i + "'>"+
            // "<span class='status"+data.status[i]+"'>" + i + "</span>"+
            "<td><span class='status"+data.status[i]+"'>" + i + ":</span></td>"+
            "<td><div class='status"+data.status[i]+"'>" + data.notes[i] + "</div></td>"+
            "</tr>";
    }
    s += "</table>"
    main.innerHTML = s;
    addMouseFunctionality();
}


// COMMAND-LINE FUNCTIONALITY
let command_array = [];
function cmdInput() {
    if (input.value == "") {
        input.focus();
        return;
    }
    command_array = input.value.split(" ");
    if (command_array[0].toLowerCase() == "done") { doneWithNote(); return; }
    if (command_array[0].toLowerCase() == "swap") { swapNotes(); return; }
    if (command_array[0].toLowerCase() == "del") { deleteNote(); return; }
    if (command_array[0].toLowerCase() == "prio") { prioritiseNote(); return; }
    if (command_array[0].toLowerCase() == "clear") { clearData(); return; }
    if (command_array[0].toLowerCase() == "save") { saveData(); return; }
    if (command_array[0].toLowerCase() == "load") { loadData(); return; }
    newNote();
}

function newNote() {
    data.notes.push(input.value);
    data.status.push(0);
    drawMain();
    input.value = "";
    main.scrollTop = main.scrollTopMax;
}

function doneWithNote() {
    // validity check
    if (isNaN(command_array[1]) == true) { return; }
    // change style
    let i = command_array[1];
    if (data.status[i] == 2) { 
        data.status[i] = 0; 
    } else {
        data.status[i] = 2;
    }
    let id = "note" + i;
    document.getElementById(id).getElementsByTagName("div")[0].className = "status" + data.status[i];
    document.getElementById(id).getElementsByTagName("span")[0].className = "status" + data.status[i];
    input.value = "";
}

function prioritiseNote() {
    // validity check
    if (isNaN(command_array[1]) == true) { return; }
    // change style
    let i = command_array[1];
    if (data.status[i] != 1) { 
        data.status[i] = 1; 
    } else {
        data.status[i] = 0;
    }
    let id = "note" + i;
    document.getElementById(id).getElementsByTagName("div")[0].className = "status" + data.status[i];
    document.getElementById(id).getElementsByTagName("span")[0].className = "status" + data.status[i];
    input.value = "";
}

function swapNotes() {
    // validity check
    if (isNaN(command_array[1]) == true || isNaN(command_array[2]) == true) { return; }
    command_array[1] *= 1;
    command_array[2] *= 1;
    if (command_array[1] > data.notes.length-1 || command_array[2] > data.notes.length-1) { return; }
    // swap
    var swap = [];
    swap[0] = data.notes[command_array[1]];
    swap[1] = data.status[command_array[1]];
    data.notes[command_array[1]] = data.notes[command_array[2]]
    data.status[command_array[1]] = data.status[command_array[2]]
    data.notes[command_array[2]] = swap[0];
    data.status[command_array[2]] = swap[1];
    drawMain();
    input.value = "";
}

function deleteNote() {
    // validity check
    if (isNaN(command_array[1]) == true && command_array[1] != "done") { return; }
    // delete
    if (command_array[1] == "done") {
        let doneIndexes = [];
        for (var i in data.notes) {
            if (data.status[i] == 2) {
                doneIndexes.push(i);
            }
        }
        doneIndexes.reverse();
        for (var i in doneIndexes) {
            data.notes.splice(doneIndexes[i],1);
            data.status.splice(doneIndexes[i],1);
        }
    } else {
        data.notes.splice(command_array[1],1);
        data.status.splice(command_array[1],1);
    }
    drawMain();
    input.value = "";
}

function clearData() {
    data = { 
        "notes": [],
        "status": [] 
    }
    drawMain();
    input.value = "";
}

function saveData() {
    let saveStr = "";
    for (var i in data.notes) {
        saveStr += data.notes[i] + ",$" + data.status[i];
        if (i < data.notes.length-1) {
            saveStr += ",$";
        }
    }
    input.value = saveStr;
    input.select();
}

function loadData() {
    let loadStr = input.value;

    // if there are multiple "load " in the string & eliminate initial "load "
    loadStr = loadStr.slice(5);
        // let loadStrTemp = "";
        // for (var i in loadStr) {    // There must be an easier way to cut the first 5 chars from a string
        //     if (i>4) {
        //     loadStrTemp += loadStr[i];
        //     }
        // }
        // loadStr = loadStrTemp;
    loadStr = loadStr.split(",$");
    
    if (loadStr.length <= 1) {
        data.notes.push("LOAD DATA INVALID");
        data.status.push(0);
        drawMain();
    } else {
        clearData();
        for (var i=0;i<loadStr.length;i+=2) {
            data.notes[i/2] = loadStr[i];
            data.status[i/2] = loadStr[i+1]
        }
        drawMain();
        input.value = "";
    }
}


// MOUSE/TOUCH FUNCTIONALITY

function addMouseFunctionality() {
    for (var i=0; i<data.notes.length; i++) {
        document.getElementById("note"+i).children[0].onclick = function () { 
            statusChange(this.parentElement.id.split("note")[1],1); 
        }
        document.getElementById("note"+i).children[1].onclick = function () { 
            statusChange(this.parentElement.id.split("note")[1],2); 
        }
    }
}

function statusChange(i,s) {
    if (data.status[i] == s) {
        data.status[i] = 0;
    } else {
        data.status[i] = s;
    }
    let id = "note" + i;
    console.log(id)
    document.getElementById(id).getElementsByTagName("div")[0].className = "status" + data.status[i];
    document.getElementById(id).getElementsByTagName("span")[0].className = "status" + data.status[i];
}

// die funktionalität aufteilen: td[0] = prio & td[1] = done
// main.querySelectorAll("tr")[0].querySelectorAll("td")[0].onclick = function () { console.log("yo"); }
