"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import cookieSession from 'cookie-session';
var express_session_1 = __importDefault(require("express-session"));
var AppRouter_1 = require("./AppRouter");
require("./controllers/UserController");
require("./controllers/ProductController");
require("./controllers/OrderController");
require("./controllers/ContactController");
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var ErrorHandlingMiddleware_1 = __importDefault(require("./middleware/ErrorHandlingMiddleware"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(cookieSession({ keys: ['asfadsfadfs'] }));
app.use((0, express_session_1.default)({
    secret: 'sjsjkfrjkfkrjf',
    resave: true,
    saveUninitialized: false,
}));
app.use(AppRouter_1.AppRouter.getInstance());
// app.use(express.static(path.resolve(__dirname, 'client/build'))) 
app.get('*', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, 'index.html'));
});
app.use(ErrorHandlingMiddleware_1.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
