import {IMessage, PostMessage} from "./types";
import {promises as fs} from 'fs';

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
        return data;
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