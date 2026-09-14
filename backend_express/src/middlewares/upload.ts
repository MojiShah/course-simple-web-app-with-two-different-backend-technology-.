import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    destination:(_req,_file,cb)=>{cb(null,"uploads/")},
    filename:(_req,_file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1e9)}`+path.extname(_file.originalname);
        cb(null,uniqueName)
    }
});

const upload = multer({
    storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:(_req,_file,cb)=>{
        const allowedTypes = ["image/jpeg","image/png","image/webp"];
        if(allowedTypes.includes(_file.mimetype))
            cb(null,true);
        else
            cb(new Error("Only image files are allowed"));
    }
});

export default upload;