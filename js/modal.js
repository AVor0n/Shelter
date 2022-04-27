import data from './../data/pets.json' assert { type: 'json' };
const slider = document.querySelector('.slider');
const modal = document.querySelector('.modal');
const wrapper = document.querySelector('.modal .wrapper');
const closeBtn = modal.querySelector('.btn');

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflowY = 'auto';
  disableHoverEffect();
  wrapper.removeEventListener('mouseenter', disableHoverEffect);
  wrapper.removeEventListener('mouseleave', enableHoverEffect);
}

function openModal(e) {
  modal.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
  wrapper.addEventListener('mouseenter', disableHoverEffect);
  wrapper.addEventListener('mouseleave', enableHoverEffect);
  setTimeout(() => {
    const elUnderMouse = document.elementFromPoint(e.pageX, e.pageY);
    if (elUnderMouse.classList.contains('modal')) enableHoverEffect();
  }, 500);
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

slider.addEventListener('click', e => {
  const card = e.target;
  if (!card.classList.contains('slider__card')) return;
  fillCardData(card);
  openModal(e);
});

const enableHoverEffect = () => hoverEffect(true);
const disableHoverEffect = () => hoverEffect(false);

function hoverEffect(enable) {
  closeBtn.style.background = enable ? '#fddcc4' : null;
  modal.style.cursor = enable ? 'pointer' : 'default';
}

document.addEventListener('click', e => e.target.classList.contains('modal') && closeModal());
closeBtn.onclick = () => closeModal();
