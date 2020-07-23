import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SimpleCrypto from 'simple-crypto-js';

dotenv.config();

const simpleCrypto = new SimpleCrypto(process.env.SALT);

const NoteSchema = new mongoose.Schema({
  userId:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  }
}, { timestamps: true });

NoteSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    ret.title = simpleCrypto.decrypt(ret.title);
    ret.content = simpleCrypto.decrypt(ret.content);
  }
});

NoteSchema.pre('save',
  function(next) {
    this.content = simpleCrypto.encrypt(this.content);
    this.title = simpleCrypto.encrypt(this.title);
    return next();
  },
  function(err) {
    next(err);
  }
);

const Note = mongoose.model('notes', NoteSchema);

export default Note;
