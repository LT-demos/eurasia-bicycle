import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const bicycleSchema = new Schema({
    bicycleId: Number,
    password: String
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);


export {
    Bicycle
};
