import { connectToDatabase } from "./db/conn";
import express from 'express';
import cors from 'cors';

//const user = require("./routes/user");
//const display = require("./routes/display");
const app = express();
const PORT = process.env.PORT || 5000;





// Connect to MongoDB before starting the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to the database', error);
    process.exit(1);
  });

//app.use(cors());
//app.use(express.json());
// Routes 
//app.use('/user', user);
//app.route("/user")
 // .get(user)
  //.post(user);
//app.use('/display', display);
