import express from 'express';
import UserController from './controllers/UserController';
import CompanyController from './controllers/CompanyController';
import { SearchController } from './controllers/SearchController';
import upload from './config/upload';
import { SessionConotrller } from './controllers/SessionController';
import auth from './middlewares/auth';
import FavoriteController from './controllers/FavoriteController';

const router = express.Router();

router.post('/sessions', SessionConotrller.store);

router.get('/companies', SearchController.index);

router.use(auth);

router.post('/users', UserController.store);

router.put('/users', UserController.update);

router.post('/companies', upload.single('thumbnail'), CompanyController.store);

router.post('/favorites', FavoriteController.store);

router.get('/favorites', FavoriteController.index);

export default router;