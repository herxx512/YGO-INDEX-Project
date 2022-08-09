const path = require('path');
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, '../public')))

app.use(cors());

app.use(express.json());

const {getCard, getMyDeck, addCard, deleteCard, serveHome, serveSequel, serveCards} = require('./controller')

app.get('/home', serveHome)

app.get('/sequel', serveSequel)

app.get('/cards', serveCards)

// Get A Card Feature:
app.get('/api/cards/:name', getCard)

// Get My Deck Feature:
app.get('/api/cards/', getMyDeck)

// Add Cards to My Deck Feature:
app.post('/api/cards/', addCard)

// Delete Cards from My Deck Feature:
app.delete('/api/cards/:id', deleteCard)

app.listen(4040, () => console.log('Server running on 4040'))