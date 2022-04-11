import data from './../data/pets.json' assert {type: 'json'};
const cards = document.querySelectorAll('.slider__card');
const modal = document.querySelector('.modal');
const closeBtn = modal.querySelector('.btn');

closeBtn.onclick = () => modal.classList.add('hidden');

cards.forEach(card => {
  card.onclick = () => {
    const animName = card.querySelector('.slider__card-title').textContent;
    const animImgSrc = card.querySelector('.slider__card-img').src;
    const animInfo = data.find(it => it.name === animName);
    if (!animInfo) return;

    modal.querySelector('img').src = animImgSrc;
    const fields = modal.querySelectorAll('[data-prop]');
    fields.forEach(field => {
      field.textContent = animInfo[field.dataset.prop];
    });
    modal.classList.remove('hidden');
  };
});
