import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const bicycleSchema = new Schema({
    bicycleId: Number,
    password: String
});

const userNumberSchema = new Schema({
    number: Number
});

const noPasswordBicycleSchema = new Schema({
    noPasswordBicycleId: Number
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);
const UserNumber = mongoose.model('UserNumber', userNumberSchema);
const NoPasswordBicycle = mongoose.model('noPasswordBicycle', noPasswordBicycleSchema);


export {
    Bicycle,
    UserNumber,
    NoPasswordBicycle
};
