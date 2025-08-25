//random indexes
import { generateRandomBombIndex,generateRandomCapiIndex } from "./rndIndexes.js";
//rnd spawn time
import { generateRandomBombTime,generateRandomCapiTime } from "./rndSpawnTime.js";
//dom elements
import { capi,bomb,puddle,stars,life,button } from "./domElements.js";
//audio
import { win,defeat,blast,strike, } from "./soundEffects.js";


let gameOver=false
let indexBomb=0
let indexCapi=0
let score =0
let err=0

button.addEventListener("click",start)
function start() {
    button.style.visibility="hidden"
    spawnCapi();
    spawnBomb()
} //game begins


function spawnCapi() {
    indexCapi = generateRandomCapiIndex();
    if (indexBomb !== indexCapi) {
        capi[indexCapi].classList.add("hit");
    }

    const point = () => {
        capi[indexCapi].classList.remove("hit");
        score++;
        stars[score - 1].classList.remove("is-transparent");
        capi[indexCapi].removeEventListener("click", point); // cleanup

        if (score === 4) {
            win.currentTime = 0;
            button.style.visibility="visible"
            win.play();
            window.location.href="win.html"
        } else {
            strike.currentTime = 0;
            strike.play();
        }
    };

    capi[indexCapi].addEventListener("click", point);

    const visibleTime = generateRandomCapiTime(1000, 1800);
    setTimeout(() => {
        capi[indexCapi].classList.remove("hit");
        capi[indexCapi].removeEventListener("click", point); // cleanup even if not clicked

        if (!gameOver) {
            setTimeout(spawnCapi, generateRandomCapiTime(1000, 2000));
        }
    }, visibleTime);
}



function spawnBomb() {
    indexBomb = generateRandomBombIndex();
    if (indexBomb !== indexCapi) {
        bomb[indexBomb].style.visibility = "visible";
        bomb[indexBomb].classList.add("hit");
    }

    const explode = () => {
        bomb[indexBomb].classList.remove("hit");
        err++;
        life[err - 1].classList.add("is-empty");
        bomb[indexBomb].removeEventListener("click", explode); // cleanup

        if (err === 3) {
            defeat.currentTime = 0;
            button.style.visibility="visible"
            defeat.play();
            gameOver = true;
            window.location.href="defeat.html"
        } else {
            blast.currentTime = 0;
            blast.play();
        }
    };

    bomb[indexBomb].addEventListener("click", explode);

    const visibleTime = generateRandomBombTime(1500, 2200);
    setTimeout(() => {
        bomb[indexBomb].classList.remove("hit");
        bomb[indexBomb].style.visibility = "hidden";
        bomb[indexBomb].removeEventListener("click", explode); // cleanup even if not clicked

        if (!gameOver) {
            setTimeout(spawnBomb, generateRandomBombTime(4000, 6000));
        }
    }, visibleTime);
}