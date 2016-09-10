import express from 'express';
import {Message} from '../db/schema';
import _ from 'lodash';
const router = express.Router();


router.post('/', (req, res, next) => {
    const {name, message} = req.body;

    if (_.isEmpty(name.toString()) || _.isEmpty(message.toString())) {
        res.status(400).send('昵称或内容不能为空');
    }

    else {
        Message.find({}, (err, data) => {
            if (err) return next(err);

            var messageData = new Message({
                id: data.length + 1,
                name: name,
                message: message,
                votes: 0
            });
            messageData.save((err) => {
                if (err) return next(err);

                res.status(201).send('success');
            });
        });
    }


});

router.get('/', (req, res, next) => {
    Message.find({}, (err, messages) => {
        if (err) return next(err);

        res.send(messages);
    });
});

router.post('/vote', (req, res, next) => {

    const id = req.body.id;
    Message.findOne({id: id}, (err, data) => {
        if (err) return next(err);

        const oldVotes = data.votes;
        const newVotes = oldVotes + 1;
        Message.update({id: id}, {votes: newVotes}, () => {
            if (err) return next(err);
            res.status(200).send({votes: newVotes});
        });
    });
});

export default router;
