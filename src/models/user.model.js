import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, { timestamps: true });

UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});

UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    return next();
  },
  function(err) {
    next(err);
  }
);

const User = mongoose.model('users', UserSchema);

export default User;
