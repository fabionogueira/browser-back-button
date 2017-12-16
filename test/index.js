import backButton from '../src/lib';

window.show = () => {
    let popup = document.querySelector('#popup');

    popup.style.display = 'block';

    backButton.on(()=>{
        popup.style.display = 'none';
    });
}
