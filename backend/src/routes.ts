import express from 'express';
import UserController from './controllers/UserController';
import CompanyController from './controllers/CompanyController';
import { SearchController } from './controllers/SearchController';
import upload from './config/upload';
import { SessionConotrller } from './controllers/SessionController';
import auth from './middlewares/auth';
import FavoriteController from './controllers/FavoriteController';
import ChatController from './controllers/ChatController';
import MessageController from './controllers/MessageController';

const router = express.Router();

router.post('/companies', upload.single('thumbnail'), CompanyController.store);

router.post('/users', UserController.store);

router.post('/sessions', SessionConotrller.store);

router.get('/companies', SearchController.index);

router.use(auth);

router.put('/users', UserController.update);

router.post('/favorites', FavoriteController.store);

router.get('/favorites', FavoriteController.index);

router.delete('/favorites', FavoriteController.remove);

router.post('/chat/:destiny', ChatController.store);

router.get('/chat/:destiny', ChatController.index);

router.post('/message', MessageController.store);

export default router;