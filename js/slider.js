const [prevBtn, nextBtn] = document.querySelectorAll('.slider > .btn');
const slideContainer = document.querySelector('.slider__container');
const countSlides = document.querySelectorAll('.slider__card').length;

const cardWidth = 270;
const cardGap = 90;
const countVisibleCards = 3;
let currentSlide = 0;

prevBtn.onclick = () => setSlide(--currentSlide);
nextBtn.onclick = () => setSlide(++currentSlide);

function setSlide(slideIdx) {
  const offsetX = slideIdx * (cardWidth + cardGap);
  slideContainer.style.left = `-${offsetX}px`;

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === countSlides - countVisibleCards;
}
