"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const types_1 = require("../types");
const PhoneSchema = new mongoose_1.Schema({
    ddd: String,
    ddi: String,
    number: String,
});
const IdentificationSchema = new mongoose_1.Schema({
    type: String,
    number: String,
});
const AgentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    phones: [PhoneSchema],
    identification: IdentificationSchema,
    birth_date: Date,
    image: String,
    department: String,
    branch: String,
    role: String,
    status: {
        type: String,
        enum: types_1.Status,
    },
});
AgentSchema.plugin(mongoose_paginate_v2_1.default);
const Agents = (0, mongoose_1.model)('Agents', AgentSchema);
exports.default = Agents;
