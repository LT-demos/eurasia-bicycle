var mongoose = require('mongoose');

module.exports = {
    connect: function (mode, callback) {
        let url = process.env.PROD_MONGODB || 'mongodb://localhost/eurasiaBicycle-db';
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
