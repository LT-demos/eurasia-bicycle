import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const bicycleSchema = new Schema({
    bicycleId: Number,
    password: String
});

const userNumberSchema = new Schema({
    number: Number,
    userViewedCount: Number
});

const noPasswordBicycleSchema = new Schema({
    noPasswordBicycleId: Number
});
const voteSchema = new Schema({
    id: Number,
    voteCount: Number
});

const messageSchema = new Schema({
    id: Number,
    name: String,
    message: String,
    votes: Number
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);
const UserNumber = mongoose.model('UserNumber', userNumberSchema);
const NoPasswordBicycle = mongoose.model('noPasswordBicycle', noPasswordBicycleSchema);
const Vote = mongoose.model('vote', voteSchema);
const Message = mongoose.model('message', messageSchema);

export {
    Bicycle,
    UserNumber,
    NoPasswordBicycle,
    Vote,
    Message
};
