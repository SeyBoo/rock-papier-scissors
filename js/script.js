//Hide / Show the modal
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal_wrapper');
const rules = document.querySelector('.rules');

modalClose.addEventListener('click', function() {
    modal.style.display="none";
});

rules.addEventListener('click', function() {
    modal.style.display="block"
});

function Roll() {
    //Generator a Random Number between 1 and 3
    var random = Math.floor(Math.random() * 3) + 1;
    return random;
}

function Create(e,type) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.className="icon-bg";

    switch (e) {
        case 1:
            img.src="../images/icon-paper.svg";
            if (type === "player") {
                document.querySelector('.player_result').id="paper"
            } else if (type === "house" ) {
                document.querySelector('.house_result').id="paper"
            }
            break;
        case 2:
            img.src="../images/icon-scissors.svg";
            if (type === "player") {
                document.querySelector('.player_result').id="scissors"
            } else if (type === "house" ) {
                document.querySelector('.house_result').id="scissors"
            }
            break;
        case 3:
            img.src="../images/icon-rock.svg";
            if (type === "player") {
                document.querySelector('.player_result').id="rock"
            } else if (type === "house") {
                document.querySelector('.house_result').id="rock"
            }
            break;
    }

    if (type === "player") {
        div.id="player"
        document.querySelector('.player_result').appendChild(div);
        document.querySelector('#player').appendChild(img);
    }
    if (type === "house") {
        div.id="house"
        document.querySelector('.house_result').appendChild(div);
        document.querySelector('#house').appendChild(img);
    }
}

const gameResult = document.querySelector('.game_result');
const gameWin = document.querySelector('.game-win');
const gameEqual = document.querySelector('.game-equal')

let winStreak = 0;
const score = document.querySelector('.point');
function Win() {
    document.querySelector(".player_pick").id='win';
    gameResult.style.display="block";
    gameWin.style.display="block";
    winStreak++;
    score.innerHTML = winStreak;
}

const gameLoose = document.querySelector('.game-loose');

function Loose() {
    document.querySelector(".house_pick").id='win';
    gameResult.style.display="block";
    gameLoose.style.display="block";
    winStreak--;
    score.innerHTML = winStreak;
}

function Equal() {
    gameResult.style.display="block";
    gameEqual.style.display="block";
}

function Game(e) {

    let random = Roll();
    
    let btn = e.id; //player btn
    if (btn === "paper") {
        btn = 1;
    } else if (btn === "scissors") {
        btn = 2;
    } else if (btn === "rock") {
        btn = 3;
    }
    Create(btn,"player");    
    setTimeout(function(){
        document.querySelector('.flip-card').style.display="none";
        document.querySelector('.house_result').style.display="block";
        Create(random,"house");
    }, 5000)
    setTimeout(function() {
        if (btn === 1 & random === 1) {
            Equal();
        } else if (btn === 2 & random === 2) {
            Equal();
        } else if ((btn === 3 & random === 3)) {
            Equal();
        } else {
            if (btn === 1 & random === 3) {
                Win();
            } else if (btn === 2 & random === 1) {
                Win();
            } else if (btn === 3 & random === 2) {
                Win();
            } else {
                Loose();
            }
        }
    }, 5250)
    //Create(random, "house");
    
}

const gameOption = document.querySelector('.game-option');
const gameIcon = document.querySelectorAll('.game-button');
const gamePick = document.querySelector('.game_pick');
    gameIcon.forEach(element => {
        element.addEventListener('click', function() {
            //Hide the Choice Picker
            gameOption.style.display="None";
            //Show the Game Pick panel
            gamePick.style.display="Flex";
            //Generate a random number
            Game(element);
        });
    });

function Reset() {
    gameOption.style.display="Flex";
    gameResult.style.display="none";
    gameWin.style.display="none";
    gameLoose.style.display="none";
    gamePick.style.display="none";
    gameEqual.style.display="none";

    const player = document.querySelector('#player');
    const house = document.querySelector('#house');
    player.remove();
    house.remove();
    document.querySelector(".player_pick").removeAttribute('id');
    document.querySelector(".house_pick").removeAttribute('id');
    document.querySelector('.flip-card').style.display="block";
    document.querySelector('.house_result').style.display="none";
}

const more = document.querySelector('.more');

if (more) {
    //When the buton more exist add a event listener
    more.addEventListener('click', function() {
        //If clicked restart the game
        Reset();
    });
}