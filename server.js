const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(_dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`App is live on PORT: $(PORT}`);
});