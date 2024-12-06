import express, {query} from "express";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    const messages = await fileDb.getItems();
    const queryDate = req.query.datetime as string;

    if (!queryDate) {
        res.send(messages.slice(-30));
    }

    const date = new Date(queryDate);

    if (isNaN(date.getDate())) {
        res.status(400).send({"error": "Invalid Date"});
    }

    const filteredMessagesByDate = messages.filter(message => new Date(message.date).getTime() > date.getTime());
    res.send(filteredMessagesByDate);
});

messagesRouter.post("/", async (req, res) => {
    const {message, author} = req.body;

    if (!message || !author) {
        res.status(400).send({"error": "Author and message must be present in request"});
    }

    const messageWithoutID = {message, author};
    const messageFromDb = await fileDb.addItem(messageWithoutID);

    res.send(messageFromDb);
});

export default messagesRouter;
