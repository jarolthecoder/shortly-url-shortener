const shortenerForm = document.querySelector('#link-shortener-form');
const linkInput = document.querySelector('#link-input');
const errorMsg = document.querySelector('.error-msg');
let listStorage = [];

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
        const userInput = linkInput.value.trim().toLowerCase();
        const serviceUrl = 'https://api.shrtco.de/v2/shorten?url=';
        const response = await fetch(`${serviceUrl}${userInput}`);

        if(!response.ok) throw new Error(`HTTP error: ${response.error_code}`);

        const data = await response.json();
        const {short_link, original_link} = data.result

        console.log(data);
        generateLink(original_link, short_link);
    }
    catch (error) {
        linkInput.classList.add('not-valid');
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'This is not a valid link!';
    }
}

// Creates container and generates new shortened link
function generateLink(longLink, shortLink) {
    const resultList = document.querySelector('.result-list');
    const listItem = document.createElement('li');
    const oldLink = document.createElement('span');
    const newLink = document.createElement('p');
    const link = document.createElement('a');
    const copyBtn = document.createElement('button');
    // const deleteBtn = document.createElement('span');

    resultList.appendChild(listItem);
    listItem.appendChild(oldLink);
    listItem.appendChild(newLink);
    newLink.appendChild(link);
    newLink.appendChild(copyBtn);
    // newLink.appendChild(deleteBtn);

    listItem.classList.add('list-item', 'animate__animated', 'animate__slideInUp', 'animate__faster'); 
    newLink.classList.add('new-link-container');
    link.classList.add('new-link');
    copyBtn.classList.add('copy-btn');

    oldLink.innerHTML = longLink;
    link.innerHTML = `https://${shortLink}`;
    copyBtn.innerHTML = 'Copy';
    // deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    // listItem.setAttribute('link-id', `${id}`);
    link.setAttribute('href', `${link.innerHTML}`);
    link.setAttribute('target', '_blank');

    // listStorage.push({link_code: id});
    // console.log(listStorage);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(`${link.innerHTML}`).then(()=> {
            copyBtn.innerHTML = 'Copied!';
            copyBtn.style.background = 'hsl(257, 27%, 26%)';
        });
    });

    // deleteBtn.addEventListener('click', (index)=> {
    //     listStorage.splice(index, 1);
    //     console.log(listStorage);
    // });
}

// Animate.css speed control
window.addEventListener('load', () => {
    document.documentElement.style.setProperty('--animate-duration', '.9s');
});