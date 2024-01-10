import fs from 'fs';
import { dirUploads } from '@configs/multer';


fs.mkdirSync(dirUploads, { recursive: true });
