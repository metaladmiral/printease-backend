import Multer from "multer";
import { Request, Response } from "express";


const storage = Multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, 'uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Create the multer instance
const uploadMiddleware = Multer({ storage: storage });
  
export default uploadMiddleware;