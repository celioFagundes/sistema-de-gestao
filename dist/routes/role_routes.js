"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role_controller");
const role_model_1 = __importDefault(require("../models/role_model"));
const router = (0, express_1.Router)();
router.get('/', (0, role_controller_1.findAllRoles)(role_model_1.default));
router.get('/paginated', (0, role_controller_1.findAllRolesPaginated)(role_model_1.default));
router.post('/', (0, role_controller_1.createRole)(role_model_1.default));
router.get('/:id', (0, role_controller_1.findRoleById)(role_model_1.default));
router.put('/:id', (0, role_controller_1.updateRole)(role_model_1.default));
router.delete('/:id', (0, role_controller_1.removeRole)(role_model_1.default));
exports.default = router;
