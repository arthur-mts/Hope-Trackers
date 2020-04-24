import mongoose from 'mongoose';

const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    cpf: String,
});

export const User = mongoose.model("User", UserSchema);