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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = __importDefault(require("../dataBase"));
const cabinet = {
    // Get list of cabinets for a selected locker location
    getAllCabinets: (lockerNumber) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ?`;
            const result = yield dataBase_1.default.promise().query(query, [lockerNumber]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    }),
    //Get all cabinets in selected parcel locker waiting for delivery (has_dropoff_parcel)
    getDropoffCabinets: (lockerNumber) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ? AND cabinet_status = 'has_dropoff_parcel'`;
            const result = yield dataBase_1.default.promise().query(query, [lockerNumber]);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    }),
    //Change cabinet status "free" and parcel_id "NULL" based on id_cabinet
    freeCabinet: (cabinetId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `UPDATE locker SET cabinet_status = 'free', parcel_id = NULL WHERE id_cabinet = ?`;
            const result = yield dataBase_1.default.promise().query(query, [cabinetId]);
            return { success: true, message: 'Cabinet freed successfully' };
        }
        catch (e) {
            console.error(e.message);
            return { success: false, message: `Error from cabinet model: ${e.message}` };
        }
    }),
    // get locker numbers with free cabinets
    getFreeLockers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT DISTINCT locker_number FROM locker WHERE cabinet_status = 'free'`;
            const result = yield dataBase_1.default.promise().query(query);
            return result[0];
        }
        catch (e) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    }),
};
exports.default = cabinet;
