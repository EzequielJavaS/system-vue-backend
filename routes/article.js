import routerx from 'express-promise-router';
import articleController from '../controllers/ArticleController';

const router = routerx();

router.post('/add', articleController.add);
router.get('/query', articleController.query);
router.get('/list', articleController.list);
router.put('/update', articleController.update);
router.delete('/remove', articleController.remove);
router.put('/activate', articleController.activate);
router.put('/deactivate', articleController.deactivate);

export default router;