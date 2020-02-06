const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/super-cafe';

mongoose.connect(URI, { useFindAndModify: false, useNewParser: true, useCreateIndex: true })
    .then(db => console.log('DB is connectd'))
    .catch(err => console.log(err));

module.export = mongoose;