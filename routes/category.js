import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';

const router = routerx();

router.post('/add', categoryController.add);
router.get('/query', categoryController.query);
router.get('/list', categoryController.list);
router.put('/update', categoryController.update);
router.delete('/remove', categoryController.remove);
router.put('/activate', categoryController.activate);
router.put('/deactivate', categoryController.deactivate);

export default router;