const router = require('express').Router();
const fs = require('fs/promises');
const {uid} = require('uid');

router.get('/notes', async (req, res) => {
    try {
        const userNotes = await fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            return (JSON.parse(data));
        });
        res.json(JSON.parse(userNotes));
    }
    catch (err) {
        if (err) throw err
    } 
});

router.post('/notes', async (req, res) => {
    try {
        const userNotes = await fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            return (JSON.parse(data));
        });
        const newNote = req.body;
        newNote.id = uid();
        const newUserNotes = [].concat(JSON.parse(userNotes))
        newUserNotes.push(newNote);        

        await fs.writeFile('db/db.json', JSON.stringify(newUserNotes))

        res.json(newNote);
    }
    catch (err) {
        if (err) throw err
    } 
});
router.delete('/notes/:id', async (req, res) => {
    try {
        const userNotes = await fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            return (JSON.parse(data));
        });
        const newList = JSON.parse(userNotes);
        
        newList.forEach(note => {
            if (note.id === req.params.id) {
                let index = newList.indexOf(note);
                newList.splice(index, 1);
            };
        });

        await fs.writeFile('db/db.json', JSON.stringify(newList));
    }
    catch (err) {
        if (err) throw err
    } 
    res.redirect('/notes');
});

module.exports = router;