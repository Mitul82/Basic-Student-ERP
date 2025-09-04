require('dotenv').config();

const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const login = require('./routes/login.js');
const adminRoute = require('./routes/adminroutes.js');
const teacherRoute = require('./routes/teacherroutes.js');
const studentRoute = require('./routes/studentroutes.js');
const connectDB = require('./database/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(cors());
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"]
    }
  })
);

app.use(express.json());
app.use('/api/v1', login);
app.use('/api/v1', adminRoute);
app.use('/api/v1', teacherRoute);
app.use('/api/v1', studentRoute);

app.use(express.static('./frontend'));
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const sslServer = https.createServer({
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
}, app);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    sslServer.listen(port, () => {
      console.log(`SSL Server listening to port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => {
//       console.log(`Server is listening to port ${port}...`)
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// start();