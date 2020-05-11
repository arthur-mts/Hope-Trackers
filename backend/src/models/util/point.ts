import mongoose, { Document } from 'mongoose';

export interface IPointSchema {
  coordinates: [Number];
}

const PointSchema: mongoose.Schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default PointSchema;
