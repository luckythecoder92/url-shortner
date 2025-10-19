import mongoose from 'mongoose';
import crypto from 'crypto';

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



const User = mongoose.model('User', userSchema);

export default User;
