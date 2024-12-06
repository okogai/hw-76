import express from 'express';
import cors from 'cors';
import messageRouter from "./routers/messageRouter";
import fileDb from "./fileDb";
import * as fs from "node:fs";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messageRouter);

const run = async () => {
    if (fs.existsSync("./Db.json")) {
        await fileDb.init();
    } else {
        fs.writeFileSync("./Db.json", JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch((err) => {console.error(err)});

