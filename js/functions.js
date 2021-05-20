// info overlay show and hide functions
const popupOverlay = document.getElementById('popup-overlay');
const popupContainer = document.getElementById('popup-container');
const popupBlock = document.getElementById('popup-overlay-block');
const infoContainer = document.getElementById('info-container');
const cartContainer = document.getElementById('cart-container');
const hammerOverlay = new Hammer(popupOverlay);
const hammerBlock = new Hammer(popupBlock);

let overlayStatus = 'hidden';

hammerOverlay.get('pan').set({ direction: Hammer.DIRECTION_DOWN });
hammerBlock.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
hammerBlock.get('pan').set({ threshold: 100 });

document.getElementById('info-button').addEventListener("click", function() {
    infoContainer.classList.remove('hidden');
    openOverlay();
});

document.getElementById('cart-button').addEventListener("click", function() {
    cartContainer.classList.remove('hidden');
    openOverlay();
});

function openOverlay() {
    popupContainer.classList.add("animate__slideInUp");
    popupOverlay.classList.remove("hidden");
    overlayStatus = 'visible';
}

hammerOverlay.on('panstart', closeOverlay);
hammerBlock.on('panstart tap', closeOverlay);
document.getElementById('container-bar').addEventListener("click", closeOverlay);

function closeOverlay() {
    if (overlayStatus != 'hidden'){
        overlayStatus = 'hidden';
        hammerOverlay.get('pan').set({ enable: false });
        hammerBlock.get('pan').set({ enable: false });
        hammerBlock.get('tap').set({ enable: false });
        popupContainer.classList.add("animate__faster");
        popupContainer.classList.add("animate__slideOutDown");
    }
}

popupContainer.addEventListener('animationend', () => {
    if (overlayStatus === 'visible'){
        popupContainer.classList.remove("animate__slideInUp");
    }

    if (overlayStatus === 'hidden'){
        popupOverlay.classList.add("hidden");
        popupContainer.classList.remove("animate__slideOutDown");
        popupContainer.classList.remove("animate__faster");  
        if(!infoContainer.classList.contains('hidden')){
            infoContainer.classList.add('hidden');
        } else if (!cartContainer.classList.contains('hidden')){
            cartContainer.classList.add('hidden');
        }

        hammerOverlay.get('pan').set({ enable: true });
        hammerBlock.get('pan').set({ enable: true });
        hammerBlock.get('tap').set({ enable: true });

    }  
  });

const addCartBtn = document.getElementById('add-cart-btn') 
let cartBtnClicked = false;
const checkSVG = '<svg xmlns="http://www.w3.org/2000/svg" id="check-svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
const goToCart = document.getElementById('go-to-cart');

function addToCart() {
    if (!cartBtnClicked){
        cartBtnClicked = true;
        addCartBtn.classList.remove('text-white', 'bg-gray-600');
        addCartBtn.classList.add('text-gray-700', 'border', 'border-gray-600');

        setTimeout(function(){
            addCartBtn.innerHTML = 'Toegevoegd ' + checkSVG;
            addCartBtn.classList.remove('non-clicked-add-btn');
        }, 50);

        if (goToCart.classList.contains('hidden')){
            goToCart.classList.remove('hidden');
        }
        
        setTimeout(function(){
            addCartBtn.classList.remove('text-gray-700', 'border', 'border-gray-600');
            addCartBtn.classList.add('text-white', 'bg-gray-600');

            setTimeout(function(){
                addCartBtn.innerHTML = 'In winkelwagen';
                addCartBtn.classList.add('non-clicked-add-btn');
            }, 50);
            
            cartBtnClicked = false;
        }, 3000);

    }
}

addCartBtn.addEventListener('click', addToCart);

const placeBtn = document.getElementById('place-button');
const introTxt = document.getElementById('intro-txt');
var initSound  = new Audio('/assets/audio/init.mp3');
let introStatus = 0;

function toSecondIntro(){
    introStatus = 1;
    placeBtn.classList.add('pulse-shadow');
    initSound.play();

    introTxt.style.opacity = 0;

    setTimeout(function(){
        introTxt.innerHTML = "Plaats het product";
        introTxt.style.opacity = 1;
    }, 600);
}

var placeSound  = new Audio('/assets/audio/place.mp3');

function placeClick(){
    placeSound.play();
    toThirdIntro();
}

let firstTime = true;
function toThirdIntro(){
    if (firstTime == true){
            firstTime = false;
            introStatus = 2;
            placeBtn.classList.remove('pulse-shadow');
            introTxt.style.opacity = 0;
            setTimeout(function(){
                introTxt.innerHTML = "Swipe links of rechts om het product te draaien";
                introTxt.style.opacity = 1;
            }, 600);
        
            setTimeout(function() {
                removeIntro();
            }, 5000)
    }
}

let isTouched = false;
function removeIntro() {
    if (isTouched == false){
        introStatus = 3;
        isTouched = true;
        introTxt.style.opacity = 0;
        setTimeout(function(){
            introTxt.innerHTML = "Beweeg de camera langzaam heen en weer";
        }, 300);
    }
}

function resetVariables() {
    firstTime = true;
    isTouched = false;
    introStatus = 0;
}

function notSupported() {
    document.getElementById('ar-button').classList.remove('flex');
    document.getElementById('ar-button').classList.add('hidden');
    document.getElementById('not-supported').classList.remove('hidden');
    document.getElementById('not-supported').classList.add('flex');
    document.getElementById('ar-canvas').classList.add('hidden');
}

function closeModal() {
    document.getElementById('not-supported').classList.remove('flex');
    document.getElementById('not-supported').classList.add('hidden');
}