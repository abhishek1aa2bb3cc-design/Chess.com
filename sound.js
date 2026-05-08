const moveSound = new Audio(
"https://www.soundjay.com/button/sounds/button-16.mp3"
);

document.addEventListener("click", function () {

    moveSound.currentTime = 0;

    moveSound.play().catch(err => console.log(err));

}, true);