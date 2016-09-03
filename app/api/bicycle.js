import express from 'express';
import {Bicycle} from '../db/schema';
import _ from 'lodash';
const router = express.Router();

router.post('/', function (req, res, next) {
    const bicycleId = req.body.bicycleId;
    const password = req.body.password;

    if (_.isEmpty(bicycleId)) {
        return res.status(400).send('你没有输入车牌号');
    }

    else {
        Bicycle.findOne({bicycleId: bicycleId}, (err, bicycleInfo) => {
            if (err) return next(err);

            if (bicycleInfo === null) {
                var bicycle = new Bicycle({
                    bicycleId: bicycleId,
                    password: password
                });
                bicycle.save(function (err) {
                    if (err) return next(err);
                    res.status(201).send('add success');
                });
            }
            else {
                res.status(409).send('is exist');
            }
        });
    }

});
router.get('/', function (req, res, next) {
    const bicycleId = req.query.bicycleId;
    Bicycle.findOne({bicycleId: bicycleId}, (err, bicycleInfo) => {
        if (err) return next(err);

        if (bicycleInfo === null) {
            res.status(401).send("暂时没有这辆车的密码");
        }
        else {
            res.status(201).send(bicycleInfo.password);
        }
    });

});
export default router;
