//Function to generate alphabet array given first and last letter arguments
function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

//Function to remove letters from alphabet array (after being chosen by user to guess the word)
function updateCharArray(abet, remlet) {
    for( var i = 0; i < abet.length; i++){ 
        if ( abet[i] === remlet) {
            abet.splice(i,1);
        }
    }
    return abet;
}

//Random word generator for Hangman
function RandomWords()  {
    //var Words = ['Nederland','Kaas','Tosti','Bitterballen','Eierbal','Ei','Ui','Amsterdam','Xylofoon','Papierfabriek','Schrift'];
    var Words = ['pannenkoekenschipvaarbewijs','aansprakelijkheidsverzekering','carnavaloptochtgebeuren','boerenkaasschaafverpakking','uitkeringsverstrekker','Gasselterboerveenschemond','klimaatveranderingdiscussie'];
    return Words[Math.floor(Math.random()*Words.length)];
}

// Generate HTML code for dropdown list element on website
// Input: list of characters in alphabetic order
function Droplist(abet) {
    HTML = "<hr>";
    HTML += '<p>Kies een letter:</p>';
    HTML += '<select id="ChosenLetter">';                 
    for (var i=0; i<(a.length-1);i++) {
        HTML += "<option value="+a[i]+">"+a[i]+"</option>";
    }
    HTML += "</select>";
    HTML += "<input type='submit' value='Submit' onClick=Main_Update() ><br><br>";
    HTML += "Of raad de oplossing:<br> <input id='usersol' size='30%' type='text' placeholder='Typ jouw oplossing + <enter>'>";

    document.getElementById("LetterDroplist").innerHTML = HTML;
}

// Initial sequence of dots (not guessed yet)
function Dots_0() {
    Dots = [];
    for (var i=0; i<LengthG;i++) {
        Dots[i] = " .";
    }
    document.getElementById("HangmanWord").innerHTML = Dots.join('');
}

// Update dot sequence; replace dots by rightfull character
function UpdateDots(letter) {
    wordarr = wordG.split("");
    for (var i=0; i<LengthG;i++) {
        if(wordarr[i]==letter) {
            Dots[i] = " " + letter;
        } 
    }
    document.getElementById("HangmanWord").innerHTML = Dots.join('');

    // IF statement: no more dots left === user has guessed the word. Change HTML on page.
    if (!Dots.includes(" .")) {
        $('p#HangmanWord').css({
            "font-size": "150%",
            "font-family": "arial",
            "display": "inline",
            "border": "5px solid red"
        });
        document.getElementById("LetterDroplist").innerHTML = "<br>";
        document.getElementById("ShowLetter").innerHTML = "<h3><b>Gefeliciteerd!!</b></h3>";
        throw new Error("Gefeliciteerd");
    }
}

//Function where user input (whole word) is handled
function UserInsert() {
    // jquery tryout
    $('#usersol').on('keypress',function(e) {
        if (e.which == 13) {
            var wguess = $(this).val();
            CheckSolution(wguess);
        }
    })
}

//Function to be called when user has inserted whole word in input text field.
function CheckSolution(wguess) {
    //Correct! > replace all the dots by final word and replace HTML.
    if(wordG===wguess) {
        for (var i=0; i<LengthG;i++) {
            UpdateDots(wordG[i]);
        }
        document.getElementById("LetterDroplist").innerHTML = "<br>";
        document.getElementById("ShowLetter").innerHTML = "<h3><b>Gefeliciteerd!!</b></h3>";
        throw new Error("Gefeliciteerd");   
    } else {
    //Wrong! If no lives left then end the game. Update HTML.
        alert("FOUT!!!");
        // Update badguesses and hangman figure
        lives--;
        UpdateHangman(lives);

        if (lives === 0) {
            document.getElementById("LetterDroplist").innerHTML = "<br>";
            document.getElementById("ShowLetter").innerHTML = "<h3 style='color: red;'><b>Helaas... volgende keer beter.</b></h3>";
            throw new Error("Helaas");
        }
    
        HTML = "U heeft " + lives + " pogingen over.";
        HTML += document.getElementById("ShowLetter").innerHTML = HTML;
    }
}

// Draw function based on given coordinates in given canvas HTML space
function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
    ctx.beginPath();
    ctx.moveTo($pathFromx, $pathFromy);
    ctx.lineTo($pathTox, $pathToy);
    ctx.stroke(); 
}

//Draw Hangman figure..
//Generate function array with all individual 10 elements of the hangman and draw the ones necessary given the lives left by user.
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
        draw (200, 50, 200, 75);
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

    for (i=(drawArray.length-1);i>=ilives*2;i--){
        if (ilives===0 & i===5) {//red head
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 4;
            drawArray[i]();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
        } else {
            drawArray[i]();
        }
    } 
}

//Retrieve letter from Dropdown list and go through main update procedure.
function Main_Update() {
    // Get selected letter from dropdown list element
    var Letter = document.getElementById("ChosenLetter");
    var Letval = Letter.options[Letter.selectedIndex].text;
    // Update alphabet list: remove chosen letter, update dropdown list
    a = updateCharArray(a, Letval); 
    Droplist(a);
    
    // HTML output to page
    HTML = "U hebt gekozen voor de letter: "+Letval+"<br><hr><br>";
    //CASE 1: letter found within word
    if (wordG.includes(Letval)) {
        // Replace  . with letter(s)
        UpdateDots(Letval);
        HTML += "Letter "+ Letval + " is gevonden.<br>";
    } else { // CASE 2: letter not found in word
        // Update lives left and hangman figure
        HTML += "Letter "+ Letval + " is helaas niet gevonden!<br>";
        lives--;
        UpdateHangman(lives);
    }

    //CASE: no more lives left, change HTML and end the game
    //To be done: add refresh button
    if (lives === 0) {
        document.getElementById("LetterDroplist").innerHTML = "<br>";
        document.getElementById("ShowLetter").innerHTML = "<h3 style='color: red;'><b>Helaas... volgende keer beter.</b></h3>";
        throw new Error("Helaas");
    }

    HTML += "U heeft " + lives + " pogingen over.";
    HTML += document.getElementById("ShowLetter").innerHTML = HTML;

    // Activate jquery functionality to insert whole word
    UserInsert();
}

// Initialization
// Retrieve Canvas element for hangman 
var canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#00";
ctx.lineWidth = 2;

const totguess = 5;
var lives = totguess;
a = genCharArray('a', 'z'); 
wordG = RandomWords().toLowerCase();
LengthG = wordG.length;

// Initialization functions
Dots_0();
Droplist(a);
UserInsert();

// Output to console
console.log("Het woord: " + wordG);
console.log("Woordlengte: " + LengthG);



