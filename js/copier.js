const field = document.querySelector('.cardnum-field');
const cardNum = document.querySelector('.card-num');
const notification = document.querySelector('.cardnum-notification');

field.onclick = () => {
  window.navigator.clipboard.writeText(cardNum.textContent)
  notification.classList.add('visible');
  setTimeout(() => {
    notification.classList.remove('visible');
  }, 1000);
};
