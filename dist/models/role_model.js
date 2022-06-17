"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const types_1 = require("../types");
const RoleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    department: String,
    permissions: {
        type: [String],
        enum: types_1.Permissions,
    },
});
RoleSchema.plugin(mongoose_paginate_v2_1.default);
const Roles = (0, mongoose_1.model)('Roles', RoleSchema);
exports.default = Roles;
