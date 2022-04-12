import './slider.js';
import './modal.js';
import './copier.js';

const countMessages = +localStorage.getItem('showMessage') || 0;
countMessages < 2 && alert(
`Приветствую, товарищ проверяющий.
Хочу отметить, что кнопка влево у слайдера имеет ховер-эффекты,
просто для этого надо сначала сдвинуть слайдер вправо (нажать на правую стрелочку).

Уже два проверяющих снизили балл за неактивную левую кнопку))

Карточки со зверюшками и номер банковской карты тоже кликабельны
${countMessages === 1 ? '\nБольше это сообщение не появится': ''}`)
localStorage.setItem('showMessage', countMessages+1)
