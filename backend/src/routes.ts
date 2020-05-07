import express from 'express';

import UserController from './controllers/UserController';
import CompanyController from './controllers/CompanyController';
import upload from './config/upload';
import SessionConotrller from './controllers/SessionController';
import auth from './middlewares/auth';
import FavoriteController from './controllers/FavoriteController';
import ChatController from './controllers/ChatController';
import MessageController from './controllers/MessageController';
import EventController from './controllers/EventController';
import MarkController from './controllers/MarkController';

const router = express.Router();


router.post('/users', UserController.store);

router.post('/users/sessions/:id', SessionConotrller.store);

router.get('/companies', CompanyController.index);

router.get('/events', EventController.index);

router.get('/marks', MarkController.index);

router.use(auth);

router.post('/companies', upload.single('thumbnail'), CompanyController.store);

router.put('/companies/:id', upload.single('thumbnail'), CompanyController.update);

router.put('/users', UserController.update);

router.post('/favorites/:id', FavoriteController.store);

router.get('/favorites', FavoriteController.index);

router.delete('/favorites/:id', FavoriteController.remove);

router.post('/chats/:destiny', ChatController.store);

router.get('/chats/:destiny', ChatController.index);

router.get('/chats', ChatController.list);

router.post('/message/:destiny', MessageController.store);

router.post('/events', EventController.store)

router.delete('/events/:id', EventController.remove);

export default router;