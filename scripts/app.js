const shortenerForm = document.querySelector('#link-shortener-form');
const linkInput = document.querySelector('.link-input');

async function fetchAPI() {
    try {
        const serviceUrl = 'https://api.shrtco.de/v2/shorten?url=';
        const longLink = linkInput.value;
        const response = await fetch(`${serviceUrl}${longLink}`);

        if (!response.ok) throw new Error(`HTTP error: ${response.error_code}`);

        const data = await response.json();
        const {short_link, original_link} = data.result
        console.log(data);
        console.log('Short Link: ' + short_link);
        console.log('Original Link: ' + original_link);
        createLink(short_link);
    }
    catch (error) {
        error = 'Link not valid';
        console.log(error);
    }
}

function createLink(shortLink) {
    const resultList = document.querySelector('.result-list');
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerHTML = shortLink;
    resultList.appendChild(listItem);
}


shortenerForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    fetchAPI();
})

// function fetchAPI() {
//     const serviceUrl = 'https://api.shrtco.de/v2/shorten?url=';
//     const longLink = linkInput.value;
    
//     fetch(`${serviceUrl}${longLink}`)
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(`HTTP error: ${response.status}`);
//             }
//             resp.json()
//         })
//         .then(data => console.log(data))
//         .catch(error => {
//             error = 'Link not valid';
//             console.log(error);
//         })
    
// }