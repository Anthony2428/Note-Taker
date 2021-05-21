const express = require('express');

const routes = require('./public/routes')

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App is live on PORT: ${PORT}`);
});