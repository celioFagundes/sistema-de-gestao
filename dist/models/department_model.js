"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const DepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    branches: [String],
});
DepartmentSchema.plugin(mongoose_paginate_v2_1.default);
const Departments = (0, mongoose_1.model)('Departments', DepartmentSchema);
exports.default = Departments;
