const router = require("express").Router()
const store = require("../db/store")
const fs = require("fs");
const uuid = require("uuid");

//get route
router.get("/notes", (req, res) => {
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
    });

 //post route
router.post("/notes/:id", (req, res) => {
    store
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
    
});

//delete route
router.delete("/notes/:id", (req, res) => {
    // this is the delete route where you will
    // utilize the removeNote() function
    store
        .removeNote(req.params.id)
        .then(() => res.json( { ok: true}))
        .catch(err => res.status(500).json(err));
})

module.exports = router;