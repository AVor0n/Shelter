import data from './../data/pets.json' assert { type: 'json' };

const slider = document.querySelector('.slider');
const [startBtn, prevBtn, nextBtn, endBtn] = document.querySelectorAll('.btn--circle');
const pageIndicator = document.querySelector('.nobtn');
const pagesData = [];
let currentPage = 0;
const countPages =
  document.body.clientWidth <= 760 ? 16 : document.body.clientWidth <= 1260 ? 8 : 6;
const countCards = 48 / countPages;

init(countPages);
startBtn.onclick = () => setPage(0);
prevBtn.onclick = () => setPage(currentPage - 1);
nextBtn.onclick = () => setPage(currentPage + 1);
endBtn.onclick = () => setPage(countPages - 1);

function setPage(page) {
  updatePage(page);
  currentPage = page;
  pageIndicator.textContent = page + 1;
  startBtn.disabled = false;
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  endBtn.disabled = false;
  if (page === 0) {
    startBtn.disabled = true;
    prevBtn.disabled = true;
  } else if (page === countPages - 1) {
    nextBtn.disabled = true;
    endBtn.disabled = true;
  }
}

function init(countPages) {
  for (let i = 0; i < countPages; i++) {
    data.sort(() => Math.random() - 0.5);
    pagesData.push(data.slice(0, countCards));
  }
  pagesData[0].forEach(it => slider.append(createCard(it.name)));
}

function createCard(name) {
  const imgSrc = data.find(it => it.name === name).img;
  const card = document.createElement('div');
  card.classList.add('flipper__container');
  card.innerHTML = `<div class="flipper" style="transform: rotateY(0)">
    <div class="slider__card front">
      <img src="${imgSrc}" alt="${name} photo" class="slider__card-img" />
      <p class="slider__card-title">${name}</p>
      <button class="btn">Learn more</button>
    </div>
    <div class="slider__card back">
    </div>
  </div>`;
  return card;
}

function updatePage(page) {
  slider.querySelectorAll('.flipper').forEach((card, idx) => {
    const img = card.querySelector('.slider__card-img');
    const angle = card.style.transform.match(/\d+/);
    card.style.transform = `rotateY(${+angle + 360}deg)`;
    setTimeout(() => {
      img.src = pagesData[page][idx].img;
    }, 400);
  });
}
