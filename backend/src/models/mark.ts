import { Schema, model, Document } from 'mongoose';
import PointSchema, { IPointSchema } from './util/point';
import mongoosePaginate from 'mongoose-paginate';

export interface IMarkSchema extends Document {
  title: String;
  description: String;
  location: IPointSchema;
  category: String;
  thunbnail: String;
  owner: Schema.Types.ObjectId;
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
    thunbnail: {
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

MarkSchema.virtual('thunbnail_url').get(function (this: { thumbnail: String }) {
  return `https://localhost:8000/files/${this.thumbnail}`;
});

MarkSchema.plugin(mongoosePaginate);


export const Mark = model<IMarkSchema>('Mark', MarkSchema);
