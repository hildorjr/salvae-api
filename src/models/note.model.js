import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SimpleEncryptor from 'simple-encryptor';

dotenv.config();

const encryptor = SimpleEncryptor(process.env.SALT);

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

NoteSchema.pre('save', function(next) {
  var note = this;
  if (!note.isModified('title') && !note.isModified('content')) return next();
  note.title = encryptor.encrypt(note.title);
  note.content = encryptor.encrypt(note.content);
  next();
});

NoteSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    ret.title = encryptor.decrypt(ret.title);
    ret.content = encryptor.decrypt(ret.content);
  }
});

const Note = mongoose.model('notes', NoteSchema);

export default Note;
