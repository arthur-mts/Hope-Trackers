import mongoose from 'mongoose';

const PointSchema: mongoose.Schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coodinates: {
        type: Number,
        required: true
    }
});

export const Point = mongoose.model('Point', PointSchema);