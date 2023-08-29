const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const todoRouter = require('./routes/todoRoute');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// app.use(express.urlencoded);
app.use(express.json());
app.use(cors());
// if (process.env.NODE_ENV === 'production') {
//   app.use(morgan('dev'));
// }

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/todo', todoRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
