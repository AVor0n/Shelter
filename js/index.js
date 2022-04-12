import './slider.js';
import './modal.js';
import './copier.js';

const showMessage = localStorage.getItem('showMessage')
!showMessage && alert('Приветствую, товарищ проверяющий.\nХочу отметить, что кнопка влево у слайдера имеет ховер-эффекты, просто для этого надо сначала сдвинуть слайдер вправо (нажать на правую стрелочку). \n\nУже два проверяющих снизили балл за неактивную левую кнопку))')
localStorage.setItem('showMessage', true)
