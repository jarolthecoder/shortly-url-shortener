const shortenerForm = document.querySelector('#link-shortener-form');
const linkInput = document.querySelector('#link-input');
const errorMsg = document.querySelector('.error-msg');

// Fires function on input submit if valid
shortenerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(linkInput.value.length > 1) {
        fetchAPI();
        linkInput.classList.remove('not-valid');
        errorMsg.style.display = 'none';
    } else {
        linkInput.classList.add('not-valid');
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'Please add a link';
    }
});

// Connects to SHRTCODE API => https://shrtco.de/
async function fetchAPI() {
    try {
        const userInput = linkInput.value;
        const serviceUrl = 'https://api.shrtco.de/v2/shorten?url=';
        const response = await fetch(`${serviceUrl}${userInput}`);

        if(!response.ok) throw new Error(`HTTP error: ${response.error_code}`);

        const data = await response.json();
        const {short_link, original_link} = data.result

        createLink(original_link, short_link);
    }
    catch (error) {
        linkInput.classList.add('not-valid');
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'This is not a valid link!';
    }
}

// Creates container and generates new shortened link
function createLink(longLink, shortLink) {
    const resultList = document.querySelector('.result-list');
    const listItem = document.createElement('li');
    const oldLink = document.createElement('span');
    const newLink = document.createElement('p');
    const link = document.createElement('a');
    const copyBtn = document.createElement('button');

    resultList.appendChild(listItem);
    listItem.appendChild(oldLink);
    listItem.appendChild(newLink);
    newLink.appendChild(link);
    newLink.appendChild(copyBtn);

    listItem.classList.add('list-item', 'animate__animated', 'animate__slideInUp', 'animate__faster'); 
    newLink.classList.add('new-link-container');
    link.classList.add('new-link');
    copyBtn.classList.add('copy-btn');

    oldLink.innerHTML = longLink;
    link.innerHTML = `https://${shortLink}`;
    copyBtn.innerHTML = 'Copy';

    link.setAttribute('href', `${link.innerHTML}`);
    link.setAttribute('target', '_blank');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(`${link.innerHTML}`).then(()=> {
            copyBtn.innerHTML = 'Copied!';
            copyBtn.style.background = 'hsl(257, 27%, 26%)';
        });
    });
}

// Animate.css speed control
window.addEventListener('load', () => {
    document.documentElement.style.setProperty('--animate-duration', '.9s');
});