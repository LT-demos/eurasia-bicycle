import async from 'async';
import db from '../app/db/db';
import {Bicycle} from '../app/db/schema';
import productData from './initData/product.json';


async.series([
  (cb) => {db.connect('bicycle',cb);},
  (cb) => Bicycle.find().remove(cb),
  (cb) => {console.log('--products delete');cb();},
  (cb) => Bicycle.create(productData,cb),
  (cb) => {console.log('--products created');cb();}
], () => {
  console.log('db init complete!');
});
