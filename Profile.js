document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.grid');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  bgMusic.load();
  bgMusic.volume = 0.1;
  bgMusic.currentTime = 450;

  function toggleMusic() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = '🔊';
      musicToggle.classList.remove('muted');
    } else {
      bgMusic.pause();
      musicToggle.textContent = '🔈';
      musicToggle.classList.add('muted');
    }
  }

  musicToggle.addEventListener('click', toggleMusic);

  let scrollAmount = 0;
  const cardWidth = 300;
  const gap = 32;

  function updateSliderPosition() {
    requestAnimationFrame(() => {
      slider.style.transform = `translateX(-${scrollAmount}px)`;
    });
  }

  function getMaxScroll() {
    return slider.scrollWidth - slider.clientWidth;
  }

  function scrollNext() {
    scrollAmount += cardWidth + gap;
    if (scrollAmount > getMaxScroll()) {
      scrollAmount = getMaxScroll();
    }
    updateSliderPosition();
  }

  function scrollPrev() {
    scrollAmount -= cardWidth + gap;
    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
    updateSliderPosition();
  }

  nextBtn.addEventListener('click', scrollNext);
  prevBtn.addEventListener('click', scrollPrev);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') scrollNext();
    if (e.key === 'ArrowLeft') scrollPrev();
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      scrollAmount = 0;
      updateSliderPosition();
    }, 300);
  });

  updateSliderPosition();
});
