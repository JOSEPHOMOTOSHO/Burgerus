"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3002;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.raw());
app.use(require('cors')());
//connect db
require("./databases/burgerus");
//successful connection
app.listen(PORT, () => {
    console.log(`Connection has been established successfully. App is listening to port ${PORT} \n 
    http://localhost:${PORT}`);
});
const index_1 = __importDefault(require("./routes/index"));
(0, index_1.default)(app);
app.all('*', (req, res) => {
    res.status(404).json({
        status: false,
        error: 'Seems you are lost 😀'
    });
});
//# sourceMappingURL=app.js.map