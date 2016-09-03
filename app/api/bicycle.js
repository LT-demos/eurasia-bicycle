import express from 'express';
import {Bicycle} from '../db/schema';
const router = express.Router();


router.get('/', function (req, res, next) {
    const bicycleId = req.query.bicycleId;
    Bicycle.findOne({bicycleId: bicycleId}, (err, bicycleInfo) => {
        if (err) return next(err);

        res.json(bicycleInfo);
    });

});
export default router;
