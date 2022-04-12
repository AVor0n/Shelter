const field = document.querySelector('.cardnum-field');
console.log("🚀 ~ file: copier.js ~ line 2 ~ field", field)
const notification = document.querySelector('.cardnum-notification');
console.log("🚀 ~ file: copier.js ~ line 4 ~ notification", notification)

field.onclick = () => {
  document.execCommand("copy");
  notification.classList.add('visible');
  setTimeout(() => {
    notification.classList.remove('visible');
  }, 1500);
};
