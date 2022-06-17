"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAgent = exports.updateAgent = exports.createAgent = exports.findAgentById = exports.findAllAgents = void 0;
const mongoose_1 = require("mongoose");
const findAllAgents = (AgentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        page: 6,
        limit: 5,
    };
    try {
        const results = yield AgentsModel.paginate({}, options);
        res.send({ success: true, results });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.findAllAgents = findAllAgents;
const findAgentById = (AgentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const agent = yield AgentsModel.findById(req.params.id);
    if (!agent) {
        return res.status(404).send({ success: false, errors: 'Agent not found' });
    }
    res.send({ success: true, agent });
});
exports.findAgentById = findAgentById;
const createAgent = (AgentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAgent = yield AgentsModel.create(Object.assign({}, req.body));
        res.send({ success: true, agent: newAgent });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.createAgent = createAgent;
const updateAgent = (AgentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const updateAgent = yield AgentsModel.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { runValidators: true });
    if (!updateAgent) {
        return res.status(404).send({ success: false, errors: 'Agent not found' });
    }
    res.send({ success: true, agent: updateAgent });
});
exports.updateAgent = updateAgent;
const removeAgent = (AgentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    try {
        yield AgentsModel.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
        });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.removeAgent = removeAgent;
