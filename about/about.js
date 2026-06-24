const initCarousel = (slideSelector, buttonSelector, intervalMs = 4500) => {
  const slides = Array.from(document.querySelectorAll(slideSelector));
  const buttons = Array.from(document.querySelectorAll(buttonSelector));

  if (!slides.length || !buttons.length) return;

  let activeIndex = 0;
  let timer;

  const showSlide = index => {
    activeIndex = index;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === activeIndex));
    buttons.forEach((button, i) => button.classList.toggle('active', i === activeIndex));
  };

  const startTimer = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, intervalMs);
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      showSlide(index);
      startTimer();
    });
  });

  startTimer();
};

initCarousel('.book-slide', '.book-controls button', 4500);
initCarousel('.show-slide', '.show-controls button', 4200);
initCarousel('.movie-slide', '.movie-controls button', 4300);
