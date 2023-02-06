const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const {body,validationResult}=require('express-validator')


// ROUTE 1: Get all the notes of the user: GET "/api/notes". login required
router.get("/fetchallnotes",fetchuser, async(req, res) => {
  try {
    const notes= await Notes.find({user:req.user.id})
    res.json(notes)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  }
});

// ROUTE 2: Add a new note : POST "/api/notes/addnote". login required
router.post('/addnote',fetchuser,[
  body('title','Enter a valid title').isLength({min:3}),
  body('description','Description must be atleat 5 characters').isLength({min:5})], async(req,res)=>{
    try {
      const {title,description,tag}=req.body;
      const errors=validationResult(req);
      if(!errors.isEmpty){
        return res.status(400).json({errors:errors.message})
      }
      const note=new Notes({
        title,description,tag,user:req.user.id
      })
      const savedNote=await note.save()
      res.json(savedNote)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever Error");
    }
  })

// ROUTE 3: Update an existing note using : PUTT "/api/notes/updatenote". login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body;
  try {
    const newNote={};
    if(title){
      newNote.title=title
    }
    if(description){
      newNote.description=description
    }
    if(tag){
      newNote.tag=tag
    }
    console.log(title,description,tag)
    console.log(req.params.id)
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found")
    }
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
  } catch (error) {
      console.log(error.message)
      res.status(500).send("Internal Sever Error")
  }
})
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  try {
    let note=await Notes.findById(req.params.id)
    if(!note){
      return res.status(404).send("Not Found")
    }
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
    }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note})
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
})
module.exports = router;
