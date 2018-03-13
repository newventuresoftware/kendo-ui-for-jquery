import { Router } from 'express';
import user from './employees';

const router = new Router();

router.use('/api/employees', user);

export default router;
