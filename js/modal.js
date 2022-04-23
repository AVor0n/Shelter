import data from './../data/pets.json' assert { type: 'json' };
const cards = document.querySelectorAll('.slider__card');
const modal = document.querySelector('.modal');
const closeBtn = modal.querySelector('.btn');

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflowY = 'auto';
}

function openModal() {
  modal.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
}

function fillCardData(card) {
  const animName = card.querySelector('.slider__card-title').textContent;
  const animImgSrc = card.querySelector('.slider__card-img').src;
  const animInfo = data.find(it => it.name === animName);
  if (!animInfo) return;

  modal.querySelector('img').src = animImgSrc;
  const fields = modal.querySelectorAll('[data-prop]');
  fields.forEach(field => {
    field.textContent = animInfo[field.dataset.prop];
  });
}

cards.forEach(
  card =>
    (card.onclick = () => {
      fillCardData(card);
      openModal();
    }),
);

document.addEventListener('click', e => e.target.classList.contains('modal') && closeModal());
closeBtn.onclick = () => closeModal();
