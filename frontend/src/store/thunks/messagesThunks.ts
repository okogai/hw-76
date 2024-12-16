import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosAPI from "../../utils/axiosAPI.ts";
import { IMessage, IMessageMutation } from '../../types';
import axiosAPI from '../../utils/axiosAPI.ts';

export const messagesFetch = createAsyncThunk<IMessage[]>(
  "messages/messagesFetch",
  async () => {
    const response = await AxiosAPI("/messages");
    return response.data;
  }
);

export const sendMessage = createAsyncThunk<void, IMessageMutation>(
  "messages/sendMessage",
  async (message: IMessageMutation) => {
    await axiosAPI.post('messages', message);
  }
);