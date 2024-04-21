import Multer from "multer";
import { NextFunction, Request, Response } from "express";
import enva from 'dotenv';
import { put } from "@vercel/blob";
import multer from "multer";

enva.config();

let uploadMiddleware: Function;

function genRandFileName(originalFilename: String) {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const editedFilename = uniqueSuffix + "-" + originalFilename;
  return editedFilename
}

if(process.env.BLOB_READ_WRITE_TOKEN === undefined) {
  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, cb) {
      // You can customize the filename here
      const randFileName = genRandFileName(file.originalname)
      cb(null, randFileName);
    }
  });
  
  const upload = multer({storage: storage});
  
  uploadMiddleware = function() {
    return function(req: Request, res: Response, next: NextFunction) {
  
      upload.single('file')(req, res, function(err) {
        if(err) {
          return  res.status(500).send("err")
        }
        const file = req.file
        if(!file) { return res.status(500).json({"success": "false", "msg": "File Not Uploaded!"}) }

        const filesize: number = file.size
        
        const MAX_UPLOADEDFILE_SIZE: number = parseInt(process.env.VERCEL_BLOB_MAX_UPLOADEDFILE_SIZE || '') || 150000000

        if(filesize > MAX_UPLOADEDFILE_SIZE) { return res.status(403).json({"success": "false", "msg": "File size cannot be more than 4.2 MB when working with Vercel Env!"}) }

        req.body.file = file.filename

        next()
      })
    }
  }
}
else {
  const upload = multer({storage: multer.memoryStorage()})
  uploadMiddleware = function() {
    return async function(req: Request, res: Response, next: NextFunction) {
      upload.single('file')(req, res, async function(err: any) {
        if(err) {
          return  res.status(500).send("err")
        }
        
        const file = req.file
        if(!file) { return res.status(500).json({"success": "false", "msg": "File Not Uploaded!"}) }

        const filesize: number = file.size
        const MAX_UPLOADEDFILE_SIZE: number = parseInt(process.env.MAX_UPLOADEDFILE_SIZE || '') || 4200000

        if(filesize > MAX_UPLOADEDFILE_SIZE) { return res.status(403).json({"success": "false", "msg": "File size cannot be more than 4.2 MB when working with Vercel Env!"}) }

        const randFileName = genRandFileName(file.originalname)
        const { url } = await put('uploads/'+randFileName, file.buffer, { access: 'public' });
        req.body.file = url

        next()
      })
    }
    
  }
}

export default uploadMiddleware;