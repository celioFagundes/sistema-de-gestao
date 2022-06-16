"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const PhoneSchema = new mongoose_1.Schema({
    ddd: String,
    ddi: String,
    number: String,
});
const DocumentSchema = new mongoose_1.Schema({
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
    document: DocumentSchema,
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
const Agents = (0, mongoose_1.model)('Agents', AgentSchema);
exports.default = Agents;
