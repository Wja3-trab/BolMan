export {Ghost, createBord, checkPos, findXYPos, makeMortal};
/*
export {createBord};
export {checkPos};
export {findXYPos};
export {makeMortal};*/
//our ghost class
class Ghost{
    constructor(name, bgnPos, speed) {
        this.name = name;
        this.bgnPos = bgnPos;
        this.speed = speed;
        this.isScared = false;
        this.crntPos = bgnPos;
        this.timerId = null;
    }
}

//function to create our game board
function createBord(arr1, arr2, bord) {
    for(let i = 0; i < arr1.length; i++) {
        const tile = document.createElement("div");
        bord.appendChild(tile);
        arr2.push(tile);

        if(arr1[i] === 0) {
            arr2[i].classList.add("wall");
        }
        else if(arr1[i] === 2) {
            arr2[i].classList.add("mini");
        }
        else if(arr1[i] === 3) {
            arr2[i].classList.add("p-up");
        }
        else if(arr1[i] === 4) {
            arr2[i].classList.add("gate");
        }
    }
}

//get coördinates x & y
function findXYPos(temp, numb) {
    return [temp % numb, Math.floor(temp / numb)];
}

//to see which target is closer x & y should be inputted separately
function checkPos(a, b, c) {
    if(Math.abs(b - a) > Math.abs(c - a)) {
        return true;
    }
    return false;
}

//make character invincible
function makeMortal(arr, x) {
    arr[x].classList.remove("invincible");
}
