import mongoose from 'mongoose';
import { Point } from './util/point';

const CompanyScheema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    cnpj: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        type: Point,
        index: "2dsphere"
    },
    category: String,
    schedule: String
})