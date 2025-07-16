import path from 'path';
import mongoose from 'mongoose';
const dotenv = require("dotenv");
console.log(path.resolve(__dirname, '../../.env'));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log(process.env);
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });


if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('.env file loaded successfully');
  }
// Load the .env file from the BACKEND folder
console.log("Loaded .env", process.env.ATLAS_URI)
const connectionString = process.env.MONGO_URI || process.env.ATLAS_URI || "";
const connectToDatabase = async () => {
    try{
        console.log("ATLAS_URI:", connectionString);
        await mongoose.connect(connectionString);
        console.log('MonogDB connected')
    }catch(e){
        console.error('Database connection error:',(e))
    }
}

export { connectToDatabase };