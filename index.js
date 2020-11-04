require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRouter = require('./views/auth');
const postsRouter = require('./views/posts');
const usersRouter = require('./views/users');

const app = express();

// DB Configuration
const dbConnect = require('./db');
dbConnect();

// Built-in Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// TODO -- Customized Middleware
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The Application Started on port: ${port}`));
