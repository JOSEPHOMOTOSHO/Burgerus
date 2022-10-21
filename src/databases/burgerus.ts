import { connect } from "mongoose";

const dbUrl: string | any = process.env.Mongo_URI;

connect(dbUrl)
    .then((connection) => {
        console.log("DB Connected")
    })
    .catch((error) => {
        console.log("DB error", error)
    })