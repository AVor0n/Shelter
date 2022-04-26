import data from './../data/pets.json' assert { type: 'json' };
const [prevBtn, nextBtn] = document.querySelectorAll('.slider > .btn');
const slideContainer = document.querySelector('.slider__container');

const cardWidth = 270;
const cardGap = 90;
const sliderPadding = 50;
let countVisibleCards =
  document.body.clientWidth <= 760 ? 1 : document.body.clientWidth <= 1260 ? 2 : 3;
let slideWidth = (cardWidth + cardGap) * countVisibleCards - cardGap + sliderPadding;
let visibleCards = [];
let currentSlide;

window.addEventListener(('resize'), () => {
  const newCountVisibleCards = document.body.clientWidth <= 760 ? 1 : document.body.clientWidth <= 1260 ? 2 : 3;
  if(countVisibleCards !== newCountVisibleCards){
    countVisibleCards = newCountVisibleCards;
    currentSlide = 0;
    visibleCards = [];
    slideWidth = (cardWidth + cardGap) * countVisibleCards - cardGap + sliderPadding;
    for(const it of slideContainer.children){
      it.remove()
    }
    init();
  }
})

export function init() {
  visibleCards = getNewSlideData();
  currentSlide = createSlide(visibleCards);
}

nextBtn.onclick = () => switchSlide('right');
prevBtn.onclick = () => switchSlide('left');

function switchSlide(direction) {
  const newSlideData = getNewSlideData();
  const newSlide = createSlide(newSlideData, direction);
  visibleCards = newSlideData;
  setTimeout(() => {
    currentSlide.style.left = direction === 'left' ? `${slideWidth}px` : `-${slideWidth}px`;
    newSlide.style.left = '0';
    const oldSlide = currentSlide;
    setTimeout(() => oldSlide.remove(), 1000);
    currentSlide = newSlide;
  }, 0);
}

function createCard(name) {
  const imgSrc = data.find(it => it.name === name).img;
  const card = document.createElement('div');
  card.classList.add('slider__card');
  card.innerHTML = `<img src="${imgSrc}" alt="${name} photo" class="slider__card-img" />
    <p class="slider__card-title">${name}</p>
    <button class="btn">Learn more</button>`;
  return card;
}

function getNewSlideData() {
  const allowedNames = data.filter(it => !visibleCards.includes(it.name));
  const nextCards = [];
  while (nextCards.length < countVisibleCards) {
    let nextCard = allowedNames[Math.floor(Math.random() * allowedNames.length)].name;
    if (!nextCards.includes(nextCard)) {
      nextCards.push(nextCard);
    }
  }
  return nextCards;
}

function createSlide(slideData, position) {
  const slide = document.createElement('div');
  slide.classList.add('slider__slide');
  slideData.forEach(it => slide.append(createCard(it)));
  if (position === 'left') slide.style.left = `-${slideWidth}px`;
  if (position === 'right') slide.style.left = `${slideWidth}px`;
  slideContainer.append(slide);
  return slide;
}
