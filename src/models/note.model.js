import mongoose from 'mongoose';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';

dotenv.config();

const cryptr = new Cryptr(process.env.SALT);

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
    ret.title = cryptr.decrypt(ret.title);
    ret.content = cryptr.decrypt(ret.content);
  }
});

NoteSchema.pre('save',
  function(next) {
    this.content = cryptr.encrypt(this.content);
    this.title = cryptr.encrypt(this.title);
    return next();
  },
  function(err) {
    next(err);
  }
);

const Note = mongoose.model('notes', NoteSchema);

export default Note;
