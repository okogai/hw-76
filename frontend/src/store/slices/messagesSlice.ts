import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { messagesFetch, sendMessage } from '../thunks/messagesThunks.ts';
import { IMessage } from '../../types';
import { RootState } from '../../app/store.ts';

interface messagesState {
  messages: IMessage[];
  fetchLoading: boolean;
  sendMessage: boolean;
}

const initialState: messagesState = {
  messages: [],
  fetchLoading: false,
  sendMessage: false,
};

export const messagesSelector = (state: RootState) => state.messages.messages;
export const fetchLoadingSelector = (state: RootState) => state.messages.fetchLoading;
export const sendMessageLoadingSelector = (state: RootState) => state.messages.sendMessage;

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(messagesFetch.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(messagesFetch.fulfilled,(state, action: PayloadAction<IMessage[]>) => {
          state.fetchLoading = false;
          state.messages = action.payload;
        },
      )
      .addCase(messagesFetch.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendMessage = true;
      })
      .addCase(sendMessage.fulfilled,(state) => {
          state.sendMessage = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.sendMessage = false;
      })
  },
});

export const messagesReducer = messagesSlice.reducer;
