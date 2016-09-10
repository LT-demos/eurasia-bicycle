import express from 'express';
import {Message} from '../db/schema';
import _ from 'lodash';
const router = express.Router();


router.post('/', (req, res, next) => {
    const {name, message} = req.body;

    if (_.isEmpty(name) || _.isEmpty(message)) {
        res.status(400).send('昵称或内容不能为空');
    }

    Message.find({}, (err, data) => {
        var messageData = new Message({
            id: data.length + 1,
            name: name,
            message: message,
            votes: 0
        });
        messageData.save((err) => {
            res.status(201).send('success');
        });
    });


});

router.get('/', (req, res, next) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

router.post('/vote', (req, res, next) => {

    const id = req.body.id;
    Message.findOne({id: id}, (err, data) => {
        const oldVotes = data.votes;
        const newVotes = oldVotes+1;
        Message.update({id: id}, {votes: newVotes}, () => {
            res.status(200).send('vote success');
        });
    });
});

export default router;
