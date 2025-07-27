let time = 10; // seconds
const timerElement = document.getElementById("timer");

const countdown = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let display = `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
    
    timerElement.textContent = display;
    
    if (time <= 0) {
        clearInterval(countdown);
        timerElement.textContent = "00:00:00";
        alert("Your egg has hatched! Check your email.");
    }
    time--;
}, 1000) ;




const animation = lottie.loadAnimation({
  container: document.getElementById('egg'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/animation.json'
});

document.getElementById('egg').addEventListener('click', () => {
  animation.play();
  document.getElementById('hatchText').style.opacity = 0;
  setTimeout(() => {
    document.getElementById('letter').style.display = 'block';
    confetti();
  }, 2500);
});
