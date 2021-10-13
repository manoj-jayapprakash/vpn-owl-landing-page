//Greeting
const greetingModal = document.querySelector('.greeting');
const overlay = document.querySelector('.overlay');
const greetingMessage = document.querySelector('.greeting__message');
const greetingMessageCloseIcon = document.querySelector('.greeting__close');
const mobileView = window.matchMedia('(max-width: 700px)').matches;
const logo = document.querySelector('.logo');

//Background color change input box
const bgColorInput = document.querySelector('#bgcolor__input');

//Navigation
const navItems = document.querySelectorAll('.nav__item');
const navMenu = document.querySelector('.nav__menu');
const hamburger = document.querySelector('.hamburger');

//Function Definitions
const renderGreeting = () => {
  const sessionStarted = sessionStorage.getItem('greetings');
  if (sessionStarted) return;
  const date = new Date();
  const hours = date.getHours();
  let greetings = 'Welcome!';
  if (hours > 5 && hours <= 12) greetings = 'Good morning, Guest!';
  else if (hours > 12 && hours <= 17) greetings = 'Good afternoon, Guest!';
  else if (hours > 17 && hours < 20) greetings = 'Good evening, Guest!';
  else greetings = 'Good night, Guest!';

  greetingMessage.innerHTML = greetings;
  greetingModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
  setTimeout(() => {
    closeGreeting();
  }, 10000);

  //Saving it to sessionStorage so that the greeting message will not be displayed on each refresh
  sessionStorage.setItem('greetings', true);
};

const closeGreeting = () => {
  greetingModal.classList.add('hidden');
  overlay.classList.add('hidden');
  document.body.style.overflowY = 'auto';
};

//Modifies the backgroundColor of the webpage as the inputs the hexcode
const changeBgColor = (e) => {
  const hexPattern = /^#[0-9a-fA-F]+$/;
  const enteredColor = e.target.value;
  if (hexPattern.test(enteredColor)) {
    document.body.style.backgroundColor = enteredColor;
  }
  if (enteredColor.length < 1) {
    document.body.style.backgroundColor = 'var(--clr-black)';
  }
};

const closeMobileMenu = () => {
  navMenu.classList.add('hidden');
  navMenu.classList.remove('nav__menu--active');
};

const openMobileNavMenu = () => {
  navMenu.classList.add('nav__menu--active');
  navMenu.classList.remove('hidden');
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

//Event Listeners

window.addEventListener('load', renderGreeting);
greetingMessageCloseIcon.addEventListener('click', closeGreeting);
bgColorInput.addEventListener('input', changeBgColor);
if (mobileView) {
  navItems.forEach((item) => {
    item.addEventListener('click', closeMobileMenu);
  });
}

hamburger.addEventListener('click', openMobileNavMenu);
logo.addEventListener('click', scrollToTop);
