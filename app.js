const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');



require('dotenv').config();

const app = express();

connectDB();

app.get('/', (req, res) => res.send('Hello world!'));
app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/api/exercises')
const usersRouter = require('./routes/api/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));