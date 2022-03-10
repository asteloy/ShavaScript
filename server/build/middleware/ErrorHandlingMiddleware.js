"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError_1 = require("../error/ApiError");
function default_1(err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "Непредвиденная ошибка!" });
}
exports.default = default_1;
