"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("../controllers/department_controller");
const department_model_1 = __importDefault(require("../models/department_model"));
const agent_model_1 = __importDefault(require("../models/agent_model"));
const router = express_1.default.Router();
router.get('/', (0, department_controller_1.findAllDepartments)(department_model_1.default));
router.post('/', (0, department_controller_1.createDepartment)(department_model_1.default));
router.put('/:id', (0, department_controller_1.updateDepartment)(department_model_1.default));
router.put('/:id/count/:operation', (0, department_controller_1.updateDepartmentCount)(department_model_1.default));
router.delete('/:id', (0, department_controller_1.removeDepartment)(department_model_1.default, agent_model_1.default));
exports.default = router;
