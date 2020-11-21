// DATA & SETUP & DRAWING

data = { 
    "notes": [],
    "status": [] 
}

tutorialData = "{\"notes\":[\"HOW TO USE THIS PROGRAM:\",\"type \\\"done 1\\\"\",\"type \\\"swap 3 4\\\"\",\"type \\\"prio 0\\\"\",\"type \\\"del 2\\\"\",\"type \\\"clear\\\"\"],\"status\":[0,0,0,0,0,0]}";
data = JSON.parse(tutorialData);

window.onload = init;

function init() {
    input = document.getElementById('in');
    main = document.getElementById('main');
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
    var s = "";
    for (i in data.notes) {
        if (data.notes[i] == "") { continue; }
        s += "<div id='note" + i + "' class='status"+data.status[i]+"'>"+i+": " + data.notes[i];
        //s += "<div class='button' onclick='deleteNote("+i+")'></div>";
        s += "</div>";
    }
    main.innerHTML = s;
}


// COMMAND-LINE FUNCTIONALITY

function cmdInput() {
    if (input.value == "") {
        input.focus();
        return;
    }
    command_array = input.value.split(" ");
    if (command_array[0] == "done") { doneWithNote(); return; }
    if (command_array[0] == "swap") { swapNotes(); return; }
    if (command_array[0] == "del") { deleteNote(); return; }
    if (command_array[0] == "prio") { prioritiseNote(); return; }
    if (command_array[0] == "clear") { clearData(); return; }
    newNote();
}

function newNote() {
    data.notes.push(input.value);
    data.status.push(0);
    drawMain();
    input.value = "";
}

function doneWithNote() {
    // validity check
    if (isNaN(command_array[1]) == true) { return; }
    // change style
    i = command_array[1];
    if (data.status[i] == 2) { 
        data.status[i] = 0; 
    } else {
        data.status[i] = 2;
    }
    id = "note" + i;
    document.getElementById(id).className = "status" + data.status[i];
    input.value = "";
}

function prioritiseNote() {
    // validity check
    if (isNaN(command_array[1]) == true) { return; }
    // change style
    i = command_array[1];
    if (data.status[i] != 1) { 
        data.status[i] = 1; 
    } else {
        data.status[i] = 0;
    }
    id = "note" + i;
    document.getElementById(id).className = "status" + data.status[i];
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

// function statusChange(i) {
//     data.status[i]++;
//     if (data.status[i] > 2) { data.status[i] = 0; }
//     // drawMain();
//     id = "note" + i;
//     document.getElementById(id).className = "status" + data.status[i];
// }

function deleteNote() {
    // validity check
    if (isNaN(command_array[1]) == true) { return; }
    // delete
    data.notes.splice(command_array[1],1);
    data.status.splice(command_array[1],1);
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