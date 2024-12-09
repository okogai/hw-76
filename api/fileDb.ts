import {IMessage, PostMessage} from "./types";
import {promises as fs} from 'fs';
import dayjs from "dayjs";

const fileName = './Db.json';

let data: IMessage[] = [];

const fileDb = {
    init: async function () {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
        }
    },
    async getItems() {
        const today = dayjs();
        const yesterday = dayjs().subtract(1, "day");

        return data.map((item) => {
            const itemDate = dayjs(item.date);

            if (itemDate.isSame(today, "day")) {
                return {
                    ...item,
                    date: `Сегодня ${itemDate.format("HH:mm")}`,
                };
            }

            if (itemDate.isSame(yesterday, "day")) {
                return {
                    ...item,
                    date: `Вчера ${itemDate.format("HH:mm")}`,
                };
            }

            if (itemDate.isSame(today, "year")) {
                return {
                    ...item,
                    date: itemDate.format("DD.MM HH:mm"),
                };
            }

            return {
                ...item,
                date: itemDate.format("DD.MM.YYYY HH:mm"),
            };
        });
        },
    async addItem(messageWithoutID: PostMessage) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const message: IMessage = {...messageWithoutID, id, date};
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;