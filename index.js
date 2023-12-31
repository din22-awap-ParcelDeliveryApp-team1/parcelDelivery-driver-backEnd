"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cabinet_controller_1 = __importDefault(require("./controllers/cabinet_controller"));
const parcel_controller_1 = __importDefault(require("./controllers/parcel_controller"));
const robot_controller_1 = __importDefault(require("./controllers/robot_controller"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/cabinet', cabinet_controller_1.default);
app.use('/parcel', parcel_controller_1.default);
app.use('/robot', robot_controller_1.default);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
