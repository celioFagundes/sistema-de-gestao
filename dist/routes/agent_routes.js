"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agent_controller_1 = require("../controllers/agent_controller");
const agent_model_1 = __importDefault(require("../models/agent_model"));
const router = express_1.default.Router();
router.get('/', (0, agent_controller_1.findAllAgents)(agent_model_1.default));
router.post('/', (0, agent_controller_1.createAgent)(agent_model_1.default));
router.get('/:id', (0, agent_controller_1.findAgentById)(agent_model_1.default));
router.put('/:id', (0, agent_controller_1.updateAgent)(agent_model_1.default));
router.delete('/:id', (0, agent_controller_1.removeAgent)(agent_model_1.default));
exports.default = router;
