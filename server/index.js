const express = require('express');
const morgan = require('morgan');

const app = express();
const { mongoose } = require('./database');

app.set('port', process.env.PORT || 3200);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


app.use('/api/users', require('./routes/user.routes'));

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
})