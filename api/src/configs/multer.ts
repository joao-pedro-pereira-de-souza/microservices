import path from 'path';
import multer from 'multer';


export const dirUploads = path.resolve(__dirname, '../', '../', 'uploads');

const filesAutorized = ['application/pdf'];
const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, dirUploads)
   },
   filename: (req, file, callback) => {
      if (!filesAutorized.includes(file.mimetype)) {
         throw new Error('Not authorized')
      }


      const now = new Date().getTime();

      callback(null, `${now}_${file.originalname}`)
   }

});


export default multer({ storage });
