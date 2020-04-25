import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const uploads = multer({
  storage,
});

export default uploads;
