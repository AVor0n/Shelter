const field = document.querySelector('.cardnum-field');
const cardnum = document.querySelector('.card-num');
const notification = document.querySelector('.cardnum-notification');

field.onclick = () => {
  window.navigator.clipboard.writeText(cardnum.textContent)
  notification.classList.add('visible');
  setTimeout(() => {
    notification.classList.remove('visible');
  }, 1000);
};
