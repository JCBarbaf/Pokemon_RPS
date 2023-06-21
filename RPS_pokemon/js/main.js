scores = [0,0];
scorePs = document.querySelectorAll("#scores span");
player1 = "";
player2 = "";
types = ["water","grass","fire","ground","ice","rock"];
img1 = document.querySelector("#type1 img");
img2 = document.querySelector("#type2 img");
p1 = document.querySelector("#type1 p:nth-of-type(2)");
p2 = document.querySelector("#type2 p:nth-of-type(2)");
winnerP = document.getElementById("winner");
typeButtons = document.querySelectorAll("#buttons button");
battlebtn = document.getElementById("battle");
replaybtn = document.getElementById("replay");
replaybtn.style.display = "none";
function RPS3(action,variant) {
    switch (action) {
        case "water":
            ChangeType(0,1);
            break;
        case "fire":
            ChangeType(2,1);
            break;
        case "grass":
            ChangeType(1,1);
            break;
        case "ground":
            ChangeType(3,1);
            break;
        case "ice":
            ChangeType(4,1);
            break;
        case "rock":
            ChangeType(5,1);
            break;      
        case "play":
            if (player1) {
                for (let i = 0; i < typeButtons.length; i++) {
                    typeButtons[i].disabled = true;
                }
                battlebtn.disabled = true;
                AnimPlayer2(variant);
                break;
            } else {
                winnerP.style.color =  "red";
                winnerP.innerHTML =  "Choose a type first.";
                setTimeout(() => {
                    winnerP.style.color =  "#d8edfa";
                    winnerP.innerHTML =  "";
                }, 600);
                break;
            }
        case "replay":
            for (let i = 0; i < typeButtons.length; i++) {
                typeButtons[i].disabled = false;
            }
            replaybtn.disabled = true;
            AnimBtn(replaybtn,battlebtn);
            player1="";
            img1.src = "../img/blank.svg";
            img2.src = "../img/blank.svg";
            winnerP.innerHTML =  "";
            p1.innerHTML = "";
            p2.innerHTML = "";
            break;
        default:
            alert("Error in action");
            break;
        }  
}
function Game(numtypes) {
    if (numtypes == 3) {
        draw = Math.floor(Math.random() * numtypes);
    } else if (numtypes == 5) {
        draw = Math.floor(Math.random() * numtypes)+1;
    } else {
        alert("Error in random");
    }
    ChangeType(draw,2);
    wins = WhoWins(numtypes);
    switch (wins) {
        case 0:
            winnerP.innerHTML =  "It's a tie.";
            break;
        case 1:
            winnerP.innerHTML =  "Player 1 wins!";
            scores[0]++;
            break;
        case 2:
            winnerP.innerHTML =  "Player 2 wins!";
            scores[1]++;
            break;
        default:
            alert("Error");
            break;
    }
    AnimBtn(battlebtn,replaybtn);
    for (let i = 0; i < scores.length; i++) {
        scorePs[i].innerHTML = scores[i];
    }
}
function ChangeType(typei, player) {
    if (player == 1) {
        img1.src = "../img/" + types[typei] +".svg";
        p1.innerHTML = types[typei];
        player1 = types[typei];
    } else {
        img2.src = "../img/" + types[typei] + ".svg";
        player2 = types[typei];
        p2.innerHTML = types[typei];
    }
}
function WhoWins(gamevar) {
    if (gamevar == 3) {
        if (player1=="grass" && player2=="grass" || player1=="fire" && player2=="fire" || player1=="water" && player2=="water") { 
            winner = 0;
        } else if (player1=="grass" && player2=="water" || player1=="fire" && player2=="grass" || player1=="water" && player2=="fire") {
            winner = 1;
        } else if(player1=="grass" && player2=="fire" || player1=="fire" && player2=="water" || player1=="water" && player2=="grass") {
            winner = 2;
        } else {
            alert("Error in gamevar 3");
        }
        return winner;
    } else if (gamevar == 5) {
        if (player1=="fire" && player2=="fire" || player1=="grass" && player2=="grass" || player1=="ground" && player2=="ground" || player1=="ice" && player2=="ice" || player1=="rock" && player2=="rock") {
            winner = 0;
        } else if (player1=="fire" && player2=="grass" || player1=="fire" && player2=="ice" || player1=="grass" && player2=="ground" || player1=="grass" && player2=="rock" || player1=="ground" && player2=="fire" || player1=="ground" && player2=="rock" || player1=="ice" && player2=="grass" || player1=="ice" && player2=="ground" || player1=="rock" && player2=="fire" || player1=="rock" && player2=="ice") {
            winner = 1;
        } else if (player1=="fire" && player2=="ground" || player1=="fire" && player2=="rock" || player1=="grass" && player2=="fire" || player1=="grass" && player2=="ice" || player1=="ground" && player2=="grass" || player1=="ground" && player2=="ice" || player1=="ice" && player2=="fire" || player1=="ice" && player2=="rock" || player1=="rock" && player2=="grass" || player1=="rock" && player2=="ground") {
            winner = 2;
        } else {
            alert("Error in gamevar 5");
        }
        return winner;
    } else {
        alert("Error in WhoWins");
    }   
}
// JS Animations
function AnimBtn(deac, ac) {
    posac = 90;
    posdeac = 0;
    ac.style.transform = "rotateY(" + posac + "deg)";
    btnflip = setInterval(flip, 1);
    function flip() {
        if (posac <= 0) {
            clearInterval(btnflip);
            deac.disabled = false;
            ac.disabled = false;
        } else if(posdeac >= 90){
            posac-=2; 
            ac.style.transform = "rotateY(" + posac + "deg)";
            ac.style.display = "inline";
            deac.style.display = "none";
        } else {
            posdeac+=2; 
            deac.style.transform = "rotateY(" + posdeac + "deg)";
        }
    }
}
function AnimPlayer2(typenum) {
    duration = 0;
    n = 0;
    choosing = setInterval(change, 50);
    function change() {
        if(duration >= 20){
            clearInterval(choosing);
            Game(typenum);
        } else {
            if (n >= typenum) {
                n = 0;
            }
            img2.src = "../img/" + types[n] + ".svg";
            n++;
        }
        duration++;
    }
}