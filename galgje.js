
function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

function updateCharArray(abet, remlet) {
    for( var i = 0; i < abet.length; i++){ 
        if ( abet[i] === remlet) {
            abet.splice(i,1);
        }
    }
    return abet;
}

function RandomWords()  {
    var Words = ['Nederland','Kaas','Tosti','Bitterballen','Eierbal','Ei','Ui'];
    return Words[Math.floor(Math.random()*Words.length)];
}

function Droplist(abet) {
    // HTML element for dropdown list letters
    // Place inside "Letter Droplist" element
    var HTML = '<p>Kies een letter:</p>';
    HTML += '<select id="ChosenLetter">';                 
    for (var i=0; i<(a.length-1);i++) {
        HTML += "<option value="+a[i]+">"+a[i]+"</option>";
    }
    HTML += "</select>";
    HTML += "<input type='submit' value='Submit' onClick=GetLetter() >";

    document.getElementById("LetterDroplist").innerHTML = HTML;
}

function Stipjes_0() {
    Stipjes = [];
    for (var i=0; i<LengthG;i++) {
        Stipjes[i] = " .";
    }
    document.getElementById("HetWoord").innerHTML = Stipjes.join('');
}

function UpdateStipjes(letter) {
    wordarr = wordG.split("");
    for (var i=0; i<LengthG;i++) {
        if(wordarr[i]==letter) {
            Stipjes[i] = " " + letter;
        } 
    }
    document.getElementById("HetWoord").innerHTML = Stipjes.join('');

    // Alle letters ingevuld? Gefeliciteerd!
    if (!Stipjes.includes(" .")) {
        document.getElementById("LetterDroplist").innerHTML = "<br>";
        document.getElementById("ShowLetter").innerHTML = "<h3><b>Gefeliciteerd!!</b></h3>";
        throw new Error("Gefeliciteerd");
    }
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
    ctx.beginPath();
    ctx.moveTo($pathFromx, $pathFromy);
    ctx.lineTo($pathTox, $pathToy);
    ctx.stroke(); 
}

function UpdateHangman(ilives) {
    // Retrieve Canvas element

    frame1 = function() {
        draw (50, 140, 250, 140);
    };
    
    frame2 = function() {
        draw (50, 140, 50, 15);
    };
    
    frame3 = function() {
        draw (50, 15, 200, 15);
    };
    
    frame4 = function() {
        draw (200, 15, 200, 30);
    };
    
    torso = function() {
        draw (200, 40, 200, 75);
    };
    
    rightArm = function() {
        draw (200, 51, 240, 65);
    };
    
    leftArm = function() {
        draw (200, 51, 160, 65);
    };
    
    rightLeg = function() {
        draw (200, 75, 240, 105);
    };
    
    leftLeg = function() {
        draw (200, 75, 160, 105);
    };
    
    head = function(){
        ctx.beginPath();
        ctx.arc(200, 40, 10, 0, Math.PI*2, true);
        ctx.stroke();
    }
     
    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    for (i=(drawArray.length-1);i>=ilives;i--){
        console.log(i);
        drawArray[i]();
    } 
}

function GetLetter() {
    // Get selected letter from dropdown list element
    var Letter = document.getElementById("ChosenLetter");
    var Letval = Letter.options[Letter.selectedIndex].text;
    // Update alphabet list: remove chosen letter, update dropdown list
    a = updateCharArray(a, Letval); 
    Droplist(a);
    
    // HTML output to "ShowLetter"
    HTML = "You chose letter: "+Letval+"<br><hr><br>";
    if (wordG.includes(Letval)) {
        // Replace  . with letter(s)
        UpdateStipjes(Letval);
        HTML += "Letter "+ Letval + " has been found!<br>";
    } else {
        // Update badguesses and hangman figure
        HTML += "Letter "+ Letval + " has NOT been found!<br>";
        lives--;
        UpdateHangman(lives);
    }

    if (lives === 0) {
        document.getElementById("LetterDroplist").innerHTML = "<br>";
        document.getElementById("ShowLetter").innerHTML = "<h3 style='color: red;'><b>Helaas, volgende keer meer je best doen.</b></h3>";
        throw new Error("Helaas");
    }

    HTML += "You have " + lives + " guesses left.";
    HTML += document.getElementById("ShowLetter").innerHTML = HTML;
}

// Initialization
// Retrieve Canvas element for hangman 
var canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#00";
ctx.lineWidth = 2;

const totguess = 10;
var lives = totguess;
a = genCharArray('a', 'z'); 
wordG = RandomWords().toLowerCase();
LengthG = wordG.length;

// Initialization functions
Stipjes_0();
Droplist(a);

// Output to console
console.log("Het woord: " + wordG);
console.log("Woordlengte: " + LengthG);
