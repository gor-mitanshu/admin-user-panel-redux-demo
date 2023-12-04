const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DBNAME}`)
     .then(() => {
          console.log(`Connection Established with Database`.bgGreen.black);
     })
     .catch((err) => {
          console.error(`${err.message}`.bgRed.black);
          process.exit(1);
     });
