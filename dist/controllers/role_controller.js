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
exports.removeRole = exports.updateRole = exports.createRole = exports.findRoleById = exports.findAllRolesPaginated = exports.findAllRoles = void 0;
const mongoose_1 = require("mongoose");
const findAllRoles = (RolesModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requestSlug = req.query.slug || '';
    const options = requestSlug ? { department: requestSlug } : {};
    try {
        const results = yield RolesModel.find(options);
        res.send({ success: true, results });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.findAllRoles = findAllRoles;
const findAllRolesPaginated = (RolesModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requestPage = Number(req.query.page) || 1;
    let requestLimit = Number(req.query.limit) || 10;
    let requestField = req.query.field || 'id';
    let requestCriteria = req.query.criteria || 'asc';
    let requestSearch = req.query.slug || '';
    const options = {
        page: requestPage,
        limit: requestLimit,
        sort: { [requestField.toString()]: requestCriteria },
    };
    try {
        const results = yield RolesModel.paginate({
            $or: [{ name: { $regex: requestSearch, $options: 'i' } }],
        }, options);
        res.send({ success: true, results });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.findAllRolesPaginated = findAllRolesPaginated;
const findRoleById = (RolesModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const role = yield RolesModel.findById(req.params.id);
    if (!role) {
        return res.status(404).send({ success: false, errors: 'Role not found' });
    }
    res.send({ success: true, role });
});
exports.findRoleById = findRoleById;
const createRole = (RolesModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield RolesModel.create(Object.assign({}, req.body));
        res.send({ success: true, role: newRole });
    }
    catch (e) {
        res.send({ success: false, errors: e });
    }
});
exports.createRole = createRole;
const updateRole = (RolesModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const updateRole = yield RolesModel.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { runValidators: true });
    if (!updateRole) {
        return res.status(404).send({ success: false, errors: 'Role not found' });
    }
    res.send({ success: true, role: updateRole });
});
exports.updateRole = updateRole;
const removeRole = (RolesModel) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ success: false, errors: 'Id parameter not valid' });
    }
    const role = yield RolesModel.findById(req.params.id);
    if (!role) {
        res.status(404).send({ success: false, errors: 'Role not found' });
    }
    yield RolesModel.findByIdAndDelete(req.params.id);
    res.send({ success: true });
});
exports.removeRole = removeRole;
