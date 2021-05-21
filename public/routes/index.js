const router = require('express').Router();
const api = require('./api/api');
const path = require('path');

router.use('/api', api);

router.use('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './html/notes.html'));
});

router.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './html/index.html'));
});


module.exports = router;