"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const RoleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    department: String,
    agents_count: {
        type: Number,
        default: 0,
    },
    permissions: {
        type: [String],
        enum: types_1.Permissions
    },
});
const Roles = (0, mongoose_1.model)('Roles', RoleSchema);
exports.default = Roles;
