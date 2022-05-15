import data from './../data/pets.json' assert { type: 'json' };

const [prevBtn, nextBtn] = document.querySelectorAll('.slider > .btn');
const slideContainer = document.querySelector('.slider__container');

const CARD_WIDTH = 270;
const CARD_GAP = 90;
const SLIDER_PADDING = 50;

let countVisibleCards =
  document.body.clientWidth <= 768 ? 1 : document.body.clientWidth <= 1280 ? 2 : 3;
let slideWidth = getSlideWidth(countVisibleCards);
let visibleCardNames = [];
let currentSlide;

window.addEventListener('load', () => init());
nextBtn.addEventListener('click', () => switchSlide('right'));
prevBtn.addEventListener('click', () => switchSlide('left'));
window.addEventListener('resize', () => {
  const newCountVisibleCards =
    document.body.clientWidth <= 760 ? 1 : document.body.clientWidth <= 1260 ? 2 : 3;
  if (countVisibleCards !== newCountVisibleCards) reInit(newCountVisibleCards);
});

function init() {
  visibleCardNames = getNewSlideData();
  currentSlide = createSlide(visibleCardNames);
}

function switchSlide(direction) {
  visibleCardNames = getNewSlideData();
  const newSlide = createSlide(visibleCardNames, direction);

  setTimeout(() => {
    currentSlide.style.left = direction === 'left' ? `${slideWidth}px` : `-${slideWidth}px`;
    newSlide.style.left = '0';

    const oldSlide = currentSlide;
    currentSlide = newSlide;

    setTimeout(() => oldSlide.remove(), 1000);
  }, 0);
}

function getSlideWidth(countVisibleCards) {
  return (CARD_WIDTH + CARD_GAP) * countVisibleCards - CARD_GAP + SLIDER_PADDING;
}

function getNewSlideData() {
  const allowedNames = data.filter(it => !visibleCardNames.includes(it.name));
  const nextCards = [];

  while (nextCards.length < countVisibleCards) {
    let nextCard = allowedNames[Math.floor(Math.random() * allowedNames.length)].name;
    if (!nextCards.includes(nextCard)) nextCards.push(nextCard);
  }
  return nextCards;
}

function createCard(name) {
  const imgSrc = data.find(it => it.name === name).img;
  const card = document.createElement('div');
  card.classList.add('slider__card');
  card.innerHTML = `
        <img src="${imgSrc}" alt="${name} photo" class="slider__card-img" />
        <p class="slider__card-title">${name}</p>
        <button class="btn">Learn more</button>
    `;
  return card;
}

function createSlide(slideData, position) {
  const slide = document.createElement('div');
  slide.classList.add('slider__slide');

  if (position === 'left') slide.style.left = `-${slideWidth}px`;
  if (position === 'right') slide.style.left = `${slideWidth}px`;

  slideData.forEach(it => slide.append(createCard(it)));
  slideContainer.append(slide);
  return slide;
}

function reInit(newCountVisibleCards) {
  Array.from(slideContainer.children).forEach(it => it.remove());
  slideWidth = getSlideWidth(newCountVisibleCards);
  countVisibleCards = newCountVisibleCards;
  visibleCardNames = [];
  currentSlide = null;
  init();
}
