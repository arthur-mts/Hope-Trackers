import express from 'express';
import UserController from './controllers/UserController';
import CompanyController from './controllers/CompanyController';
import  SearchController  from './controllers/SearchController';
import upload from './config/upload';
import  SessionConotrller  from './controllers/SessionController';
import auth from './middlewares/auth';
import FavoriteController from './controllers/FavoriteController';
import ChatController from './controllers/ChatController';
import MessageController from './controllers/MessageController';
import EventController from './controllers/EventController';

const router = express.Router();

router.post('/companies', upload.single('thumbnail'), CompanyController.store);

router.post('/users', UserController.store);

router.post('/users/sessions', SessionConotrller.storeUser);

router.post('/companies/sessions', SessionConotrller.storeCompany);

router.get('/companies', SearchController.index);

router.get('/events', EventController.index);

router.use(auth);

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