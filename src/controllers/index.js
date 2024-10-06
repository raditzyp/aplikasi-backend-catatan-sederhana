import prisma from "../utils/prisma.js";

export const createNoteController = async (req, res) => {
    try {
        // request
        const { title, description } = req.body;


        // validation
        // title
        if (title.length == 0) {
            return res.status(400).json({
                message: "Input title tidak boleh kosong!",
            });
        }

        if (title.length < 2) {
            return res.status(400).json({
                message: "Input title minimal 2 karakter!",
            })
        }

        const noteExists = await prisma.notes.findFirst({
            where: {
                title: title,
            },
        });

        if (noteExists) {
            return res.status(400).json({
                success: false,
                error: 400,
                message: "Data note ini sudah ada di database!",
            });
        };

        // description
        if (description.length === 0) {
            return res.status(400).json({
                message: "Input deskripsi tidak boleh kosong!",
            });
        }


        // send to database
        await prisma.notes.create({
            data: {
                title: title,
                description: description,
            },
        });


        return res.status(201).json({
            success: true,
            code: 201,
            message: "Data note berhasil ditambahkan",
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            Message: error.message,
        })
    }
};

export const getAllNoteController = async (req, res) => {
    try {
        // Validation
        const notes = await prisma.notes.findMany();
        if (notes.length === 0) {
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Data note tidak ditemukan",
            });
        } 
        res.status(200).json({
            success: true,
            code: 200,
            data: notes,
        })
    } catch (error) {
        return res.status(500).json({
            code: 500,
            Message: error.message,
        })
    }
};

export const getAllNoteBydIdController = async (req, res) => {
    try {
        // request
        const noteId = req.params.id;
        
        // validation
        const note = await prisma .notes.findUnique({
            where: {
                id: noteId,
            },
        });
        if (!note) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Id yang kamu kirim tidak ditemukan!",
            });
        }

        // send response
        res.status(200).json({
            success: true,
            code: 200,
            message: "Berhasil menggambil data note",
            data: note,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 500,
            message: error.message,
        });
    }
};

export const updateNoteByIdController = async (req, res) => {
    try {
    // request
    const reqId = req.params.id;
    const { title, description } = req.body;
    // validation
    const note = await prisma.notes.findUnique({
        where: {
            id: reqId,
        },
    });
    if (!note) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: `Id ${reqId} tidak ditemukan!`,
        });
    };

    // req body validation
    if (title.length === 0) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Input title tidak boleh kosong!",
        });
    }

    if (description.length === 0) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Input deskripsi tidak boleh kosong!",
        });
    }
    // console.log("Id tersebut ketemu^^");
    
    // update process
    await prisma.notes.update({
        where: {
            id: reqId,
        },
        data: {
            title: req.body.title,
            description: req.body.description,
        },
    });
    
    // send response
    res.status(200).json({
        success: true,
        code: 200,
        message: "Berhasil mengupdate data note",
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
        })
    }  
};

export const deleteNoteByIdController = async (req, res) => {
    try {


        // request
        const { noteId } = req.body;
        

        // validasi
        if (noteId.length < 24) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: "Id yang kamu kirim tidak valid!",
            });
        }
        // proses delete
        const note = await prisma.notes.delete({
            where: {
                id: noteId,
            },
        });
        // send response
        res.status(200).json({
            success: true,
            code: 200,
            message: "Data berhasi di hapus -_-",
            data: note, 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
        });
    };
}