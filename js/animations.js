const INCREASE_NUMBER_ANIMATION_SPEED = 50;
const header = document.querySelector('.header');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
let animationInited = false;

window.addEventListener('scroll', updateScroll);
document.querySelector('#budget').addEventListener('change', handleSelectChange);
anchorLinks.forEach(el => addSmoothScroll(el));

function addSmoothScroll(link) {
    link.addEventListener('click', onLinkClick);
}

function onLinkClick(event) {
    event.preventDefault();
    document.querySelector(event.target.getAttribute('href'))
    ?.scrollIntoView({ behavior: 'smooth' });
}

function updateScroll() {
    if (window.scrollY > 0) {
        header.classList.add('header__scrolled');
    } else {
        header.classList.remove('header__scrolled');
    }
    const windowBottomPosition = window.scrollY + window.innerHeight;
    const countElementPosition = document.querySelector('.features__clients-count').offsetTop;

    if(windowBottomPosition >= countElementPosition
        && !animationInited) {
        animationInited = true;
        initIncreaseNumberAnimation();
    }
}

function handleSelectChange(event) {
    if (event.target.value === 'other') {
        const formContainer = document.createElement('div');
        formContainer.classList.add('form__group', 'form__other-input');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Введите ваш вариант';

        formContainer.appendChild(input);
        document.getElementById('select-group').after(formContainer);
    } 
    const otherInput = document.querySelector('.form__other-input');
    if (event.target.value !== 'other' && otherInput) {
        otherInput.remove();
    }
}

function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
        element.innerText = i + '+';
        } else {
        element.innerText = i;
        }

        i+=100;
        setTimeout(() => {
            increaseNumberAnimationStep(i, element, endNumber);
        }, INCREASE_NUMBER_ANIMATION_SPEED);
    }
}

function initIncreaseNumberAnimation() {
    const numberContainer = document.querySelector('.features__clients-count');
     increaseNumberAnimationStep(0, numberContainer, 5000);
}