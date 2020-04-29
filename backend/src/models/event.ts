import {Document, Schema, Types, model} from 'mongoose';
import  PointSchema, {IPointSchema} from './util/point';
import mongoosePaginate from 'mongoose-paginate';

export interface IEventSchema extends Document {
  title: String;
  description: String;
  location: IPointSchema;
  owner: Types.ObjectId;
}

const EventSchema: Schema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId , ref: 'User'},
  location: {
    type: PointSchema,
    index: '2dsphere',
  }
});

EventSchema.plugin(mongoosePaginate);

export const Event = model<IEventSchema>('Event', EventSchema);
