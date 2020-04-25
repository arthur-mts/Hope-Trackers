import express from 'express';
import UserController from './controllers/UserController';
import CompanyController from './controllers/CompanyController';
import { SearchController } from './controllers/SearchController';

const router = express.Router();

router.post('/users', UserController.store);

router.post('/companies', CompanyController.store);

router.get('/companies', SearchController.index);

export default router;