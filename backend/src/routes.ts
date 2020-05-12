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
import SearchController from './controllers/SearchController';

const router = express.Router();

router.post('/users', UserController.store);

router.post('/users/sessions', SessionConotrller.store);

router.get('/users/:phoneNumber', UserController.index);

router.get('/search/companies', SearchController.indexCompany);

router.get('/search/events', SearchController.indexEvent);

router.get('/search/marks', SearchController.indexMark);

router.use(auth);

router.get('/companies', CompanyController.index);

router.get('/events', EventController.index);




router.post('/companies', upload.single('thumbnail'), CompanyController.store);

router.delete('/companies/:id', CompanyController.remove);

router.put('/companies/:id', upload.single('thumbnail'), CompanyController.update);

router.put('/users', UserController.update);

router.delete('/users', UserController.remove);

router.post('/favorites/:id', FavoriteController.store);

router.get('/favorites', FavoriteController.index);

router.delete('/favorites/:id', FavoriteController.remove);

router.post('/chats/:destiny', ChatController.store);

router.get('/chats/:destiny', ChatController.index);

router.get('/chats', ChatController.list);

router.post('/message/:destiny', MessageController.store);

router.post('/events', EventController.store);

router.delete('/events/:id', EventController.remove);

router.put('/events/:id', EventController.update);

export default router;
