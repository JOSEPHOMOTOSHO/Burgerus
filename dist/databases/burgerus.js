"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbUrl = process.env.Mongo_URI;
(0, mongoose_1.connect)(dbUrl)
    .then((connection) => {
    console.log("DB Connected");
})
    .catch((error) => {
    console.log("DB error", error);
});
//# sourceMappingURL=burgerus.js.map