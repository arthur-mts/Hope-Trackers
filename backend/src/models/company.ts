import mongoose, {Document} from 'mongoose';
import PointSchema, {IPointSchema} from './util/point';
import mongoosePaginate from 'mongoose-paginate';

export interface ICompanySchema extends Document{
  name: String;
  register: String;
  description: String;
  phoneNumber: String;
  location: IPointSchema;
  category: String;
  schedule: [String];
  thumbnail: String;
}

const CompanySchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    register: { type: String, required: true },
    description: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
    category: String,
    schedule: [String],
    thumbnail: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

CompanySchema.plugin(mongoosePaginate);

CompanySchema.virtual('thunbnail_url').get(function (this: { thumbnail: String }) {
  return `https://localhost:8000/files/${this.thumbnail}`;
});

export const Company = mongoose.model<ICompanySchema>('Company', CompanySchema);