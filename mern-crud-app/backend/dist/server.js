"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var items_1 = __importDefault(require("./routes/items"));
var app = (0, express_1.default)();
var PORT = 5000;
var DB_URI = 'mongodb://localhost:27017/mern-crud';
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use('/api/items', items_1.default);
// Connect to MongoDB and start the server
mongoose_1.default.connect(DB_URI)
    .then(function () {
    app.listen(PORT, function () { return console.log("Server running on http://localhost:".concat(PORT)); });
})
    .catch(function (error) { return console.error('MongoDB connection error:', error); });
