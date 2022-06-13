"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const agent_routes_1 = __importDefault(require("./routes/agent_routes"));
const department_routes_1 = __importDefault(require("./routes/department_routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI_LOCAL;
const DB_NAME = process.env.DB_NAME_LOCAL;
try {
    (0, mongoose_1.connect)(`${DB_URI}`, { dbName: DB_NAME }, () => console.log('Success connecting to database', DB_NAME));
}
catch (error) {
    console.log('Could not connect to database', DB_NAME);
    console.log(error);
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/agents', agent_routes_1.default);
app.use('/departments', department_routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.listen(port, () => {
    console.log('Listening on port : ', port);
});
