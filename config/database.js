import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Connection {
  constructor() {
    const url = process.env.DB_CONNECT;
    console.log('\x1b[36m%s\x1b[0m',`[salvae] Connecting to Mongo...`);
    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(url);
  }
}

export default new Connection();
