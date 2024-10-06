import express from "express";

// controllers
import { 
    createNoteController, 
    getAllNoteController, 
    getAllNoteBydIdController, 
    updateNoteByIdController, 
    deleteNoteByIdController 
    } 
from "../controllers/index.js";


const router = express.Router();

router.post('/createNote', createNoteController);
router.get('/getAllNote', getAllNoteController);
router.get('/getNoteById/:id', getAllNoteBydIdController);
router.patch('/updateNoteById/:id', updateNoteByIdController);
router.post('/deleteNoteById', deleteNoteByIdController);

router.get("/", (req, res) => {
    res.status(200).json({ 
        message: "Hello World",
    });
});

export default router;