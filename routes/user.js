import routerx from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', 
    auth.verifyAdministrador, //Control de rol. Solo podrá gestionar usuarios si es administrador.
    userController.add);
router.get('/query', auth.verifyAdministrador, userController.query);
router.get('/list', auth.verifyAdministrador, userController.list);
router.put('/update', auth.verifyAdministrador, userController.update);
router.delete('/remove', auth.verifyAdministrador, userController.remove);
router.put('/activate', auth.verifyAdministrador, userController.activate);
router.put('/deactivate', auth.verifyAdministrador, userController.deactivate);
router.post('/login', userController.login);

export default router;