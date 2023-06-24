import mongoose from "../db/conn";
import { Schema } from "mongoose";

const User = mongoose.model("User", new Schema({
    _id: {
        required: true,
        type: String
    },
    "salary": {
        required: true,
        type: Number
    },
    "inss_in_sheet": {
        required: true,
        type: Number
    },
    "transport": {
        required: true,
        type: Number
    },
    "snack": {
        required: true,
        type: Number
    },
    "vacation": {
        required: true,
        type: Number
    },
    "deci_3": {
        required: true,
        type: Number
    },
    "FGTS": {
        required: true,
        type: Number
    },
    "FGTS_prov": {
        required: true,
        type: Number
    },
    "deci_3_andOthers_prov": {
        required: true,
        type: Number
    },
    "inss_employer": {
        type: Number
    },
    "sat": {
        type: Number
    },
    "education_salary": {
        type: Number
    },
    "incra_sesi_senai": {
        type: Number
    }
}))

export default User
