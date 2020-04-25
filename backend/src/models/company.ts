import mongoose from 'mongoose';
import PointSchema from './util/point';

const CompanyScheema: mongoose.Schema = new mongoose.Schema({
    name: {type: String, required: true},
    cnpj: {type: String, required: true},
    description: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
    category: String,
    schedule: String,
});

export const Company = mongoose.model('Company', CompanyScheema);