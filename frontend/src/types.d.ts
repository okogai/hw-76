export interface IMessage {
  message: string;
  author: string;
  date: string;
  id: string;
}

export interface IMessageMutation {
  message: string;
  author: string;
}