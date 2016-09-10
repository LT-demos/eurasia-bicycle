import express from 'express';
import {Message} from '../db/schema';
import _ from 'lodash';
const router = express.Router();


router.post('/', (req, res, next) => {
    const {name, message} = req.body;
    var messageData = new Message({
        id: 0,
        name: name,
        message: message,
        votes: 0
    });
    messageData.save((err) => {
        res.status(201).send('success');
    });
});

router.get('/', (req, res, next) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});
export default router;
