// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');



// require('dotenv').config();

// const app = express();

// connectDB();

// app.get('/', (req, res) => res.send('Hello world!'));
// app.use(cors());
// app.use(express.json());

// const exercisesRouter = require('./routes/api/exercises')
// const usersRouter = require('./routes/api/users')

// app.use('/exercises', exercisesRouter)
// app.use('/users', usersRouter)



// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server running on port ${port}`));
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: "./.env"});
const PORT = process.env.PORT || 6000
app.use(cors());
app.use(express.json());
const dbo = require('./config/db')
 
app.use('/api/auth', require('./routes/auth'));

const server = app.listen(PORT, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(()=> process.exit(1));
})