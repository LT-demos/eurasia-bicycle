import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const bicycleSchema = new Schema({
    bicycleId: Number,
    password: String
});

const userNumberSchema = new Schema({
    number: Number
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);
const UserNumber = mongoose.model('UserNumber', userNumberSchema);


export {
    Bicycle,
    UserNumber
};
