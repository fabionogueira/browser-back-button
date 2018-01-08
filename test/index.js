import backButton from '../src/lib';

window.show = () => {
    let popup = document.querySelector('#popup');

    popup.style.display = 'block';

    backButton.on(1, ()=>{
        popup.style.display = 'none';
    });
};
window.close = () => {
    let popup = document.querySelector('#popup');

    popup.style.display = 'none';

    backButton.off(1);
};

window.show2 = () => {
    let popup = document.querySelector('#popup2');

    popup.style.display = 'block';

    backButton.on(2, ()=>{
        popup.style.display = 'none';
    });
};
window.close2 = () => {
    let popup = document.querySelector('#popup2');

    popup.style.display = 'none';

    backButton.off(2);
};


