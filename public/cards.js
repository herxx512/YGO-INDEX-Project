const cardSection = document.querySelector('#cardsSection');
const deckSection = document.querySelector('#myDeck');
const input = document.querySelector('#in')

let cardsURL = '/api/all-cards/';
let localURL = '/api/cards/';

// Get A Card
const getCard = async (e) => {
    e.preventDefault()
    cardSection.innerHTML = ''

    await axios.get(`/api/cards/${input.value}`)
    .then(res => {
        let cardInfo = res.data

        const ygoCard = document.createElement('div')
        ygoCard.classList.add('ygoCard')

        let ygoImage = cardInfo.card_images[0].image_url
                
        let ygoName = cardInfo.name

        let ygoId = cardInfo.id

        ygoCard.innerHTML = `
            
            
            <img alt='card cover image' src=${ygoImage} class="card-cover-image"/>

            <button id="card-${ygoId}" class="addBtn">Add to My Deck</button>
            `
        cardSection.appendChild(ygoCard)
            
        document.getElementById(`card-${ygoId}`).addEventListener('click',() => {
            addCard({ygoImage,ygoName,ygoId})
        })
    })
    .catch(err => console.log(err))
};

const search = document.querySelector('button')
search.addEventListener('click', getCard)

// Getting Cards from My Deck
const getMyDeck = () => {
    axios.get(localURL)
    .then(cardCB)
    .catch(err => console.log(err))
};

// Adding Cards to My Deck
const addCard = body => {
    axios.post(localURL, body)
    .then(cardCB)
    .catch(err => console.log(err))
};

// Deleting Cards from My Deck
const deleteCard = id => {
    axios.delete(`${localURL}${id}`)
    .then(cardCB)
    .catch(err => console.log(err))
};


// Callback function to display My Deck (used in getMyDeck, addCard, & deleteCard)
const cardCB = (res) => displayCards(res.data)

function displayCards(arr){
    let cardInfo = arr

    deckSection.innerHTML = ''

    for(let i = 0; i < cardInfo.length; i++){
        const ygoCard = document.createElement('div')
        ygoCard.classList.add('ygoCard2')

        let img = cardInfo[i].ygoImage
                
        let name = cardInfo[i].ygoName

        let id = cardInfo[i].ygoId

        ygoCard.innerHTML = `
            <h1>${name}</h1>

            <img alt='card cover image' src=${img} style="width:100%;"/>

            <button onclick="deleteCard(${id})" class="deleteBtn">Remove</button>
            `
        deckSection.appendChild(ygoCard)
    }
};
