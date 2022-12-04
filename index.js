import {Ghost, createBord, checkPos, findXYPos, makeMortal} from "./ghostClass.js";

window.addEventListener("DOMContentLoaded", () => {
const bord = document.querySelector(".bord");
const life = document.querySelector(".life");
const result = document.querySelector(".result");
const points = document.querySelector(".score");
const btn = document.querySelector(".reload");

let playing = true;
let b = 27;
let score = 0;
let bMan = 472;
let lp = 3;

const tileArr = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,3,2,2,2,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,2,2,2,3,0,
    0,2,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,2,0,
    0,2,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,2,0,
    0,2,0,0,0,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,0,0,0,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,0,
    0,0,0,0,0,0,0,0,1,0,0,0,4,4,4,0,0,0,1,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
    0,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,
    0,2,0,0,0,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,0,0,0,2,0,
    0,2,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,2,0,
    0,2,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,2,0,
    0,3,2,2,2,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,2,2,2,3,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0
]

const tiles = [];

createBord(tileArr, tiles, bord);

tiles[bMan].classList.add("bolMan");

function moveBolMan(e) {
    tiles[bMan].classList.remove("bolMan");

    switch(e.keyCode) {
        case 37:
            if(bMan % b > 0 && !tiles[bMan - 1].classList.contains("wall")  
            && !tiles[bMan - 1].classList.contains("gate")) {
                bMan -= 1;
                if(bMan === 351) bMan = 376;
            }
            break;
        case 38:
            if(bMan - b >= 0 && !tiles[bMan - b].classList.contains("wall")  
            && !tiles[bMan - b].classList.contains("gate")) {
                bMan -= b;
                if(bMan === 13) bMan = 688;
            }
            break;
        case 39:
            if(bMan % b < b - 1 && !tiles[bMan + 1].classList.contains("wall")  
            && !tiles[bMan + 1].classList.contains("gate")) {
                bMan += 1;
                if(bMan === 377) bMan = 352;
            }
            break;
        case 40:
            if(bMan + b < Math.pow(b, 2) && !tiles[bMan + b].classList.contains("wall")  
            && !tiles[bMan + b].classList.contains("gate")) {
                bMan += b;
                if(bMan === 715) bMan = 40;
            }
            break;
    }
    eatMini();
    eatPU();
    tiles[bMan].classList.add("bolMan");
    checklP();
    checkWin();
    console.log(score)
}

document.addEventListener("keydown", moveBolMan);
//eat mini's
function eatMini() {
    if(tiles[bMan].classList.contains("mini")) {
        tiles[bMan].classList.remove("mini");
        score +=10;
        points.innerText = score;
    }
}
//eat power up
function eatPU() {
    if(tiles[bMan].classList.contains("p-up")) {
        tiles[bMan].classList.remove("p-up");
        score +=50;
        points.innerText = score;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScare, 15000);
    }
}

//make ghosts unscared
function unScare() {
    ghosts.forEach(ghost => ghost.isScared = false);
}


const ghosts = [
    new Ghost("Ed", 335, 500),
    new Ghost("Edd", 339, 600),
    new Ghost("Eddy", 389, 650),
    new Ghost("Jake", 393, 675)
]

ghosts.forEach(ghost => {
    tiles[ghost.bgnPos].classList.add(ghost.name);
    tiles[ghost.bgnPos].classList.add("ghost");
});


function moveGhost(ghost) {
    const directions = [-1, -b, 1, b];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    
    ghost.timerId = setInterval(function() {
    if(!tiles[ghost.crntPos + direction].classList.contains("wall")
    && !tiles[ghost.crntPos + direction].classList.contains("ghost", "scared")) {
        tiles[ghost.crntPos].classList.remove("ghost", 'scared');
        tiles[ghost.crntPos].classList.remove(ghost.name);

        const [bManX, bManY] = findXYPos(bMan, b);
        const [ghostX, ghostY] = findXYPos(ghost.crntPos, b);
        const [ghostXNew, ghostYNew] = findXYPos(ghost.crntPos + direction, b);

        if(checkPos(bManX, ghostX, ghostXNew) 
        || checkPos(bManY, ghostY, ghostYNew)) {
            ghost.crntPos += direction;
        }
        else {
            direction = directions[Math.floor(Math.random() * directions.length)];
        }
        
        
        if(ghost.crntPos === 13) {
            ghost.crntPos = 688;
        }
        if(ghost.crntPos === 351) {
            ghost.crntPos = 376;
        }
        if(ghost.crntPos === 715) {
            ghost.crntPos = 40;
        }
        if(ghost.crntPos === 377) {
            ghost.crntPos = 352;
        }
        tiles[ghost.crntPos].classList.add("ghost", ghost.name);
    } else {
        direction = directions[Math.floor(Math.random() * directions.length)]
    }

    if(ghost.isScared) {
        tiles[ghost.crntPos].classList.add("scared");
    }

    if(ghost.isScared && tiles[bMan].classList.contains("ghost")) {
        tiles[ghost.crntPos].classList.remove("ghost", "scared", ghost.name);
        ghost.crntPos = ghost.bgnPos;
        tiles[ghost.crntPos].classList.add("ghost", ghost.name);
        score += 100;
        points.textContent = score;
    }
    
    checklP();
    checkWin();

    if(!playing) {
        clearInterval(ghost.timerId);
    }

    }, ghost.speed);
}

ghosts.forEach(ghost => moveGhost(ghost));


function checklP() {
    if(lp > 0) {
        if(tiles[bMan].classList.contains("ghost") 
        && !tiles[bMan].classList.contains("scared")
        && !tiles[bMan].classList.contains("invincible")) {
            lp--;
            life.textContent = lp;
            console.log(lp);
            tiles[bMan].classList.add("invincible");
            setTimeout(() => {makeMortal(tiles, bMan)}, 10000);
        }
    }
    else {
        document.removeEventListener("keydown", moveBolMan);
        result.innerHTML = "Game Over!";
        tiles[bMan].classList.remove("bolMan");
        playing = false;
    }
} 

function checkWin() {
    if(score >= 1000) {
        document.removeEventListener("keydown", moveBolMan);
        result.innerHTML = "You Win!";
        tiles[bMan].classList.remove("bolMan");
        playing = false;
    }
}

btn.addEventListener("click", () => {
    //reload the page if player wants to start over
    location.reload();
})

});