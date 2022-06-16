"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    branches: [String],
});
const Departments = (0, mongoose_1.model)('Departments', DepartmentSchema);
exports.default = Departments;
