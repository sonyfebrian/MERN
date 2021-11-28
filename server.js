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
const PORT = process.env.PORT || 4000
app.use(cors());
app.use(express.json());
const dbo = require('./config/db')
const errorHandler = require("./middleware/error");

dbo();

 // Connecting Routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(()=> process.exit(1));
})