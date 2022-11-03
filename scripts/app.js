const shortenerForm = document.querySelector('#link-shortener-form');
const linkInput = document.querySelector('.link-input');

// Fires function on input submit
shortenerForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    fetchAPI();
});

// Connects to SHRTCO API => https://shrtco.de/
async function fetchAPI() {
    try {
        const serviceUrl = 'https://api.shrtco.de/v2/shorten?url=';
        const longLink = linkInput.value;
        const response = await fetch(`${serviceUrl}${longLink}`);

        if(!response.ok) throw new Error(`HTTP error: ${response.error_code}`);

        const data = await response.json();
        const {short_link, original_link} = data.result

        createLink(original_link, short_link);
    }
    catch (error) {
        error = 'Link not valid';
        console.log(error);
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

    listItem.classList.add('list-item'); 
    newLink.classList.add('new-link-container');
    link.classList.add('new-link');
    copyBtn.classList.add('copy-btn');

    oldLink.innerHTML = longLink;
    link.innerHTML = `https://${shortLink}`;
    copyBtn.innerHTML = 'Copy';

    link.setAttribute('href', `${link.innerHTML}`);
    link.setAttribute('target', '_blank');

    copyBtn.addEventListener('click', ()=> {
        navigator.clipboard.writeText(`${link.innerHTML}`).then(()=> {
            copyBtn.innerHTML = 'Copied!';
            copyBtn.style.background = 'hsl(257, 27%, 26%)';
        })
    });
}
