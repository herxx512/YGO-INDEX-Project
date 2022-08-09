const path = require('path')
const axios = require('axios')
let cardsDB = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
let myDeck = [];
let upcomingId = 1;

module.exports = {
    serveHome: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/home.html'))
    },
    
    serveSequel: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/sequel.html'))
    },

    serveCards: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/cards.html'))
    },

    getCard: (req,res) => {
        const {name} = req.params
        axios.get(`${cardsDB}?name=${name}`)
        .then(resp => res.status(200).send(resp.data.data[0]))
        .catch(err => console.log(err))
    },

    getMyDeck: (req,res) => {
        res.status.send(myDeck)
    },

    addCard: (req,res) => {
        const {ygoImage, ygoName, ygoId} = req.body;

        let newCard = {
            id: upcomingId,
            ygoImage,
            ygoName,
            ygoId
        }

        myDeck.push(newCard)
        upcomingId++
        res.status(200).send(myDeck)
    },

    deleteCard: (req,res) => {
        let index = myDeck.findIndex(elem => elem.ygoId === +req.params.id)
        myDeck.splice(index,1);
        res.status(200).send(myDeck)
    }
}