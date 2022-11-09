const shortenerForm = document.querySelector('#link-shortener-form');
const linkInput = document.querySelector('#link-input');
const errorMsg = document.querySelector('.error-msg');

let listStorage = [];

// Fires function on input submit if valid
shortenerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(linkInput.value.length > 1 && !listStorage.some(item => item.link === linkInput.value)) {
        fetchAPI();
        listStorage.push({ link: linkInput.value });
        linkInput.classList.remove('not-valid');
        errorMsg.style.display = 'none';
        console.log(listStorage);
    
    } else if(listStorage.some(item => item.link === linkInput.value)) {
        linkInput.classList.add('not-valid');
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Shortlink was already generated';

    } else {
        linkInput.classList.add('not-valid');
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Please add a link';
    }
});

// Connects to SHRTCODE API => https://shrtco.de/
async function fetchAPI() {
    try {
        const userInput = linkInput.value.trim().toLowerCase();
        const serviceUrl = 'https://api.shrtco.de/v2/shorten?url=';
        const response = await fetch(`${serviceUrl}${userInput}`);

        if(!response.ok) throw new Error(`HTTP error: ${response.error_code}`);

        const data = await response.json();
        const {short_link, original_link} = data.result;
        
        generateLink(original_link, short_link);
    }
    catch (error) {
        linkInput.classList.add('not-valid');
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'This is not a valid link!';
    }
}


// Creates dynamic list item for each new shortened link
function generateLink(longLink, shortLink) {
    const resultList = document.querySelector('.result-list');
    const listItem = document.createElement('li');
    const colLeft = document.createElement('p');
    const colRight = document.createElement('p');
    const oldLink = document.createElement('span');
    const newLink = document.createElement('a');
    const copyBtn = document.createElement('button');
    const deleteBtn = document.createElement('span');

    resultList.appendChild(listItem);
    listItem.appendChild(colLeft);
    listItem.appendChild(colRight);
    colLeft.appendChild(deleteBtn);
    colLeft.appendChild(oldLink);
    colRight.appendChild(newLink);
    colRight.appendChild(copyBtn);

    listItem.classList.add('list-item', 'animate__animated', 'animate__slideInUp', 'animate__faster'); 
    colLeft.classList.add('list-item-col', 'old-link-container');
    colRight.classList.add('list-item-col', 'new-link-container');
    newLink.classList.add('new-link');
    copyBtn.classList.add('copy-btn');
    deleteBtn.classList.add('delete-btn');

    oldLink.innerHTML = longLink;
    newLink.innerHTML = `https://${shortLink}`;
    copyBtn.innerHTML = 'Copy';
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
   
    newLink.setAttribute('href', `${newLink.innerHTML}`);
    newLink.setAttribute('target', '_blank');

    // Copy link to share
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(`${newLink.innerHTML}`).then(()=> {
            copyBtn.innerHTML = 'Copied!';
            copyBtn.style.background = 'hsl(257, 27%, 26%)';
        });
    });

    // Deletes item from list and from array
    deleteBtn.addEventListener('click', (event) => {
        let btn = event.target;
        btn.closest('li').remove();
        listStorage.splice(event.target, 1);
        return listStorage
    });
}


// Animate.css speed control
window.addEventListener('load', () => {
    document.documentElement.style.setProperty('--animate-duration', '.9s');
});

// Email Form validation ====================================================================================================
const subscribeForm = document.querySelector('.subscribe-form');
const emailInput = document.querySelector('.subscribe-input');
const emailErrorMsg = document.querySelector('.email-error-msg');
const emailSuccessMsg = document.querySelector('.email-success-msg');
const emailValidationChar = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

subscribeForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(emailInput.value.length < 1 || !emailInput.value.match(emailValidationChar)) {
        emailErrorMsg.style.display = 'block';
        emailErrorMsg.innerHTML = 'Please enter a valid email';
        emailInput.classList.add('not-valid');
        emailSuccessMsg.style.display = 'none';
    } else {
        emailInput.value = '';
        emailInput.classList.remove('not-valid');
        emailSuccessMsg.style.display = 'block';
        emailSuccessMsg.innerHTML = 'Thanks for subscribe!';
        emailErrorMsg.style.display = 'none';
    }
});