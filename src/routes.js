import { Router } from 'express';
import multer from 'multer';
import DeliveryManController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import LoginController from './app/controllers/LoginController';
import OrderController from './app/controllers/OrderController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';
import adminMiddleware from './app/middlewares/admin';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/login', LoginController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', adminMiddleware, UserController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);

routes.get('/deliveryMan', adminMiddleware, DeliveryManController.index);
routes.post('/deliveryMan', adminMiddleware, DeliveryManController.store);
routes.put('/deliveryMan', adminMiddleware, DeliveryManController.update);
routes.delete(
  '/deliveryMan/:id',
  adminMiddleware,
  DeliveryManController.delete
);

routes.post('/orders', OrderController.store);

export default routes;
