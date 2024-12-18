const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");

const flipSound1 = document.querySelector("#flipSound1");
const flipSound2 = document.querySelector("#flipSound2");
const flipSound3 = document.querySelector("#flipSound3");
const flipSound4 = document.querySelector("#flipSound4");

const backgroundMusic = document.querySelector("#backgroundMusic");
const muteButton = document.querySelector("#muteButton");
const muteIcon = muteButton.querySelector("i");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
const numOfPapers = 4;
const maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-300px)";
    nextBtn.style.transform = "translateX(300px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0)";
    nextBtn.style.transform = "translateX(0)";
}

function initializeAudio() {
    backgroundMusic.volume = 0.05;
    
    backgroundMusic.play()
        .catch(e => {
            console.log("Auto-play failed, waiting for user interaction:", e);
            document.addEventListener('click', function startMusic() {
                backgroundMusic.play().catch(e => console.log("Audio play failed:", e));
                document.removeEventListener('click', startMusic);
            }, { once: true });
        });

    muteButton.addEventListener('click', () => {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            muteIcon.className = 'fas fa-volume-up';
        } else {
            backgroundMusic.muted = true;
            muteIcon.className = 'fas fa-volume-mute';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializePages();
    initializeAudio();
});
function playFlipSound(pageNum) {
    let sound;
    switch(pageNum) {
        case 1:
            sound = flipSound1;
            break;
        case 2:
            sound = flipSound2;
            break;
        case 3:
            sound = flipSound3;
            break;
        case 4:
            sound = flipSound4;
            break;
    }
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play failed:", e));
    }
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                playFlipSound(1);
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                playFlipSound(2);
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                playFlipSound(3);
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                closeBook(false);
                playFlipSound(4);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 4;
                playFlipSound(1);
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 3;
                playFlipSound(2);
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 2;
                playFlipSound(3);
                break;
            case 5:
                openBook();
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 1;
                playFlipSound(4);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation--;
    }
}

function initializePages() {
    paper1.style.zIndex = 4;
    paper2.style.zIndex = 3;
    paper3.style.zIndex = 2;
    paper4.style.zIndex = 1;
    
    paper1.classList.remove("flipped");
    paper2.classList.remove("flipped");
    paper3.classList.remove("flipped");
    paper4.classList.remove("flipped");
    
    currentLocation = 1;
    
    closeBook(true);
}

document.addEventListener('DOMContentLoaded', initializePages);