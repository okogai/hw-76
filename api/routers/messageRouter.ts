import express from "express";
import fileDb from "../fileDb";
import dayjs from "dayjs";

const messagesRouter = express.Router();

const formatDate = (date: string) => {
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');
    const itemDate = dayjs(date);

    if (itemDate.isSame(today, 'day')) {
        return `Сегодня ${itemDate.format('HH:mm')}`;
    }

    if (itemDate.isSame(yesterday, 'day')) {
        return `Вчера ${itemDate.format('HH:mm')}`;
    }

    if (itemDate.isSame(today, 'year')) {
        return itemDate.format('DD.MM HH:mm');
    }

    return itemDate.format('DD.MM.YYYY HH:mm');
};

messagesRouter.get("/", async (req, res) => {
    const messages = await fileDb.getItems();
    const queryDate = req.query.datetime as string;
    console.log(queryDate)

    if (!queryDate) {
        const messagesToSend = messages.slice(-30);
        const formattedDateMessages = messagesToSend.map(message => {return {...message, date: formatDate(message.date)}});
        res.send(formattedDateMessages);
    } else {
        const date = new Date(queryDate);

        if (isNaN(date.getDate())) {
            res.status(400).send({"error": "Invalid Date"});
        }
        const filteredMessagesByDate = messages.filter(message => new Date(message.date).getTime() > date.getTime());
        const formattedDateMessages = filteredMessagesByDate.map(message => {return {...message, date: formatDate(message.date)}});
        res.send(formattedDateMessages);
    }
});

messagesRouter.post("/", async (req, res) => {
    const {message, author} = req.body;

    if (!message || !author) {
        res.status(400).send({"error": "Author and message must be present in request"});
    } else {
        const messageWithoutID = {message, author};
        const messageFromDb = await fileDb.addItem(messageWithoutID);

        res.send(messageFromDb);
    }
});

export default messagesRouter;
