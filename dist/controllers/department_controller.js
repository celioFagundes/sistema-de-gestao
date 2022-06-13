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
exports.removeDepartment = exports.updateDepartment = exports.createDepartment = exports.findAllDepartments = void 0;
const findAllDepartments = (DepartmentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield DepartmentsModel.find({});
        res.send({ success: true, departments });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.findAllDepartments = findAllDepartments;
const createDepartment = (DepartmentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDepartment = yield DepartmentsModel.create(Object.assign({}, req.body));
        res.send({ success: true, department: newDepartment });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.createDepartment = createDepartment;
const updateDepartment = (DepartmentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateDepartment = yield DepartmentsModel.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { runValidators: true });
        res.send({ success: true, department: updateDepartment });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.updateDepartment = updateDepartment;
const removeDepartment = (DepartmentsModel, AgentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield DepartmentsModel.findById(req.params.id);
    if (department) {
        const agentsFromDepartment = yield AgentsModel.find({ department: department.name });
        if (agentsFromDepartment.length > 0) {
            res
                .status(424)
                .send({
                success: false,
                errors: 'Failed to delete department. There are agents that belongs to this department',
            });
        }
        if (agentsFromDepartment.length === 0) {
            yield DepartmentsModel.findByIdAndDelete(req.params.id);
            res.send({ success: true });
        }
    }
    if (!department) {
        res.status(404).send({ success: false, errors: 'Departament not found' });
    }
});
exports.removeDepartment = removeDepartment;
