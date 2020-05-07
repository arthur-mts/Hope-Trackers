import multer from 'multer';
import path from 'path';
import {PathLike, unlink} from 'fs';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

export function removeFile(filename: PathLike) {
  unlink(filename, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('succes');
    }
  });
}

const uploads = multer({
  storage,
});

export default uploads;
