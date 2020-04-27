import mongoose from 'mongoose';

const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  cpf: String,
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
});

export const User = mongoose.model('User', UserSchema);