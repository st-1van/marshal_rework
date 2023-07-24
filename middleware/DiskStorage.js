import multer from 'multer';
import { mkdirSync } from 'fs';
import { extname } from 'path';

// створення правильних папок і назв фото
/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = `uploads/${req.session.currentCarNumber}/`;
    mkdirSync(folderPath, { recursive: true }); // Створити папку рекурсивно
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const currentDate = new Date();
    const uniqueSuffix = req.session.currentCarBrand + "_" + req.session.currentCarNumber + "_" + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '_' + currentDate.getHours() + '-' + currentDate.getMinutes() + "_" + Math.round(Math.random() * 1E9);
    const fileExtension = extname(file.originalname);
    cb(null, file.fieldname + '_' + uniqueSuffix + fileExtension);
  }
}); */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = `uploads/${req.userId}/`;
    mkdirSync(folderPath, { recursive: true }); // Створити папку рекурсивно
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const currentDate = new Date();
    const uniqueSuffix = req.userId + "_" + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '_' + currentDate.getHours() + '-' + currentDate.getMinutes() + "_" + Math.round(Math.random() * 1E9);
    const fileExtension = extname(file.originalname);
    cb(null, file.fieldname + '_' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } })

export default upload;

