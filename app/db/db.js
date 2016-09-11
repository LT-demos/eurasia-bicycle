var mongoose = require('mongoose');

module.exports = {
    connect: function (mode, callback) {
        // let url = process.env.PROD_MONGODB || 'mongodb://localhost/eurasiaBicycle-db';
        let url = process.env.PROD_MONGODB || 'mongodb://Leonard:liutao19950414@ds019946.mlab.com:19946/eurasiabicycle';
        if (mode === 'test') {
            url = 'mongodb://localhost/eurasiaBicycle-test-db';
        }
        console.log('--db connect success');
        mongoose.connect(url, callback);
    },
    close: function (callback) {
        mongoose.connection.close(callback);
    }
};
