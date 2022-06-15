"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["Inactive"] = "inactive";
})(Status = exports.Status || (exports.Status = {}));
var Permissions;
(function (Permissions) {
    Permissions["Read"] = "read";
    Permissions["Write"] = "write";
    Permissions["Delete"] = "delete";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
