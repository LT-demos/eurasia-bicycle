import express from 'express';
import {Bicycle, UserNumber, NoPasswordBicycle, Vote} from '../db/schema';
import _ from 'lodash';
const router = express.Router();

router.post('/', function (req, res, next) {
    const bicycleId = req.body.bicycleId;
    const password = req.body.password;

    if (_.isEmpty(bicycleId.toString())) {
        if (err) return next(err);
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
                    NoPasswordBicycle.remove({noPasswordBicycleId: bicycleId}, (err) => {
                        NoPasswordBicycle.find({}, (err, data) => {
                            res.status(201).send('add success');
                        });
                    });
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
            var noPasswordBicycle = new NoPasswordBicycle({
                noPasswordBicycleId: bicycleId
            });
            NoPasswordBicycle.findOne({noPasswordBicycleId: bicycleId}, (err, data) => {
                if (data === null) {
                    noPasswordBicycle.save((err) => {
                        if (err) return next(err);
                    });
                }
                res.status(401).send("暂时没有这辆车的密码");
            });

        }
        else {
            UserNumber.findOne({id: 1}, (err, data) => {
                var oldNumber = data.number;
                var newNumber = oldNumber + 1;
                UserNumber.update({number: oldNumber}, {number: newNumber}, () => {
                    res.status(201).send({password: bicycleInfo.password, count: newNumber});
                });
            });
        }
    });

});

router.get('/userCount', function (req, res, next) {
    UserNumber.findOne({id: 1}, (err, data) => {
        res.status(200).send({count: data.number});
    });
});

router.get('/userViewdCount', (req, res, next) => {
    UserNumber.findOne({vId: 2}, (err, data) => {
        var oldUserViewdCount = data.userViewedCount;
        var newUserViewdCount = oldUserViewdCount + 1;
        UserNumber.update({userViewedCount: oldUserViewdCount}, {userViewedCount: newUserViewdCount}, () => {
            res.status(200).send({userViewedCount: newUserViewdCount});
        });
    });
});

router.get('/noPasswordBicycle', (req, res, next) => {
    NoPasswordBicycle.find({}, (err, data) => {
        res.status(200).send(data)
    });
});

router.delete('/delete', (req, res, next) => {
    const noPasswordBicycleId = req.body.noPasswordBicycleId;
    NoPasswordBicycle.remove({noPasswordBicycleId: noPasswordBicycleId}, (err) => {
        NoPasswordBicycle.find({}, (err, data) => {
            res.status(200).send(data);
        });
    });
});

router.get('/vote', (req, res, next) => {
    Vote.findOne({id: 3}, (err, data) => {
        res.status(200).send({voteCount: data.voteCount});
    });
});
router.post('/vote', (req, res, next) => {
    Vote.findOne({id: 3}, (err, data) => {
        var oldvoteCount = data.voteCount;
        var newvoteCount = oldvoteCount + 1;
        Vote.update({voteCount: oldvoteCount}, {voteCount: newvoteCount}, () => {
            res.status(200).send({voteCount: newvoteCount});
        });
    });
});

router.get('/findBicycleId', (req, res, next) => {
    const bicycleId = req.query.bicycleId;
    Bicycle.findOne({bicycleId: bicycleId}, (err, data) => {
        if (err) return next(err);

        if (data !== null) {
            console.log('已存在');
            res.status(409).send({bicycleId: data.bicycleId, password: data.password, message: 'is exist'});
        }
    });
});
export default router;



