const burgerWrapper = document.querySelector('.burger__wrapper');
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav__link');

function close() {
  burgerWrapper.classList.remove('open');
  nav.classList.remove('open');
  document.body.style.overflow = ' auto';
}

function open() {
  burgerWrapper.classList.add('open');
  document.body.style.overflow = 'hidden';
  nav.classList.add('open');
}

links.forEach(link =>
  link.addEventListener('click', () => {
    links.forEach(it => it.classList.remove('link--active'));
    link.classList.add('link--active');
    close();
  }),
);

burgerWrapper.addEventListener('click', () => {
  burgerWrapper.classList.contains('open') ? close() : open();
});
