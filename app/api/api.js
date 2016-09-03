import express from 'express';
import bicycle from './bicycle';


const router = express.Router();

router.use('/bicycle',bicycle);

export default router;
