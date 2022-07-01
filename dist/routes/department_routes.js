"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("../controllers/department_controller");
const department_model_1 = __importDefault(require("../models/department_model"));
const router = (0, express_1.Router)();
router.get('/', (0, department_controller_1.findAllDepartments)(department_model_1.default));
router.get('/paginated', (0, department_controller_1.findAllDepartmentsPaginated)(department_model_1.default));
router.post('/', (0, department_controller_1.createDepartment)(department_model_1.default));
router.get('/:id', (0, department_controller_1.findDepartmentsById)(department_model_1.default));
router.put('/:id', (0, department_controller_1.updateDepartment)(department_model_1.default));
router.delete('/:id', (0, department_controller_1.removeDepartment)(department_model_1.default));
exports.default = router;
