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
exports.removeDepartment = exports.updateDepartment = exports.createDepartment = exports.findDepartmentsById = exports.findAllDepartments = void 0;
const mongoose_1 = require("mongoose");
const findAllDepartments = (DepartmentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requestPage = Number(req.query.page) || 1;
    let requestLimit = Number(req.query.limit) || 10;
    let requestField = req.query.field || "id";
    let requestCriteria = req.query.criteria || "asc";
    const options = {
        page: requestPage,
        limit: requestLimit,
        sort: { [requestField.toString()]: requestCriteria },
    };
    try {
        const results = yield DepartmentsModel.paginate({}, options);
        res.send({ success: true, results });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.findAllDepartments = findAllDepartments;
const findDepartmentsById = (DepartmentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const department = yield DepartmentsModel.findById(req.params.id);
    if (!department) {
        return res.status(404).send({ success: false, errors: 'Department not found' });
    }
    res.send({ success: true, department });
});
exports.findDepartmentsById = findDepartmentsById;
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
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const updateDepartment = yield DepartmentsModel.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { runValidators: true });
    if (!updateDepartment) {
        return res.status(404).send({ success: false, errors: 'Department not found' });
    }
    res.send({ success: true, department: updateDepartment });
});
exports.updateDepartment = updateDepartment;
const removeDepartment = (DepartmentsModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const department = yield DepartmentsModel.findById(req.params.id);
    if (!department) {
        return res.status(404).send({ success: false, errors: 'Department not found' });
    }
    yield DepartmentsModel.findByIdAndDelete(req.params.id);
    res.send({ success: true });
});
exports.removeDepartment = removeDepartment;
