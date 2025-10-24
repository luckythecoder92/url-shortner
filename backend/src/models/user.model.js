import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: function () {
      const hash = crypto
        .createHash('md5')
        .update(this.email.toLowerCase().trim())
        .digest('hex');
      return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
    }
  }

});

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  // Here you can add password hashing logic if needed
  this.password= await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
