"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = __importDefault(require("../db/conn"));
const mongoose_1 = require("mongoose");
const User = conn_1.default.model("User", new mongoose_1.Schema({
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
}));
exports.default = User;
