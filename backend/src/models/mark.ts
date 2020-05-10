import { Schema, model, Document, Types } from 'mongoose';
import PointSchema, { IPointSchema } from './util/point';
import mongoosePaginate from 'mongoose-paginate';
import App from '../app';

export interface IMarkSchema extends Document {
  name: String;
  description: String;
  location: IPointSchema;
  category: String;
  thumbnail: String;
  owner: Types.ObjectId;
  thumbnail_url: String;
}

export const MarkSchema: Schema = new Schema(
  {
    name: String,
    description: String,
    type: {
      type: String,
      enum: ["Company", "Event"]
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    location: {
      type: PointSchema,
      index: '2dsphere'
    },

    // Company fields
    thumbnail: {
      required: false,
      type: String
    },
    category: {
      required: false,
      type: String
    },
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

MarkSchema.virtual('thumbnail_url').get(function (this: { thumbnail: String }) {
  return `https://${process.env.IP}:${process.env.HTTP_PORT}/files/${this.thumbnail}`;
});

MarkSchema.plugin(mongoosePaginate);


export const Mark = model<IMarkSchema>('Mark', MarkSchema);
