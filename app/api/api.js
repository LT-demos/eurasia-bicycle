import express from 'express';
import bicycle from './bicycle';
import message from './message';


const router = express.Router();

router.use('/bicycle', bicycle);
router.use('/message', message);

export default router;
