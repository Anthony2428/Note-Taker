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
        let userNotes = await fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            return (JSON.parse(data));
        });
        const deleteNote = userNotes.forEach(note => {
            if (note.id === req.params.id) {
                let index = userNotes.indexOf(this);
                userNotes.splice(index, 1);
            };
        })
        .then(() => fs.writeFile('db/db.json', JSON.stringify(userNotes)))
    }
    catch (err) {
        if (err) throw err
    } 
});

module.exports = router;