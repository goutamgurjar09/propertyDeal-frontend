// // src/features/chat/messageSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Set your backend URL in .env file
// const API_URL = `${import.meta.env.VITE_API_ENDPOINT_BASE_URL}/messages`;

// // ✅ 1. Send message
// export const createMessage = createAsyncThunk(
//   'messages/create',
//   async ({ chatId, text }, thunkAPI) => {
//     try {
//       const res = await axios.post(
//         API_URL,
//         { chatId, text },
//         {
//          withCredentials: true,
//         }
//       );
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to send message');
//     }
//   }
// );

// // ✅ 2. Fetch messages for a chat
// export const fetchMessagesByChat = createAsyncThunk(
//   'messages/fetchByChat',
//   async (chatId, thunkAPI) => {
//     try {
//       const res = await axios.get(`${API_URL}/${chatId}`, {
//        withCredentials: true,
//       });
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch messages');
//     }
//   }
// );

// export const getOrCreateChatRoom = createAsyncThunk(
//   'chatRoom/getOrCreate',
//   async ({ userId1, userId2, propertyId }, thunkAPI) => {
//     try {
//       const res = await axios.post(`${API_URL}/chatroom`, { userId1, userId2, propertyId }, { withCredentials: true });
//       return res.data; // returns chatRoom object
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

// // ✅ Slice
// const messageSlice = createSlice({
//   name: 'messages',
//   initialState: {
//     messages: [],
//     currentRoom: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     addSocketMessage: (state, action) => {
//       state.messages.push(action.payload);
//     },
//     clearMessages: (state) => {
//       state.messages = [];
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch messages
//       .addCase(fetchMessagesByChat.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMessagesByChat.fulfilled, (state, action) => {
//         state.loading = false;
//         state.messages = action.payload;
//       })
//       .addCase(fetchMessagesByChat.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Create message
//       .addCase(createMessage.fulfilled, (state, action) => {
//         state.messages.push(action.payload);
//       })
//       .addCase(createMessage.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Get or create chat room
//        .addCase(getOrCreateChatRoom.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getOrCreateChatRoom.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentRoom = action.payload;
//       })
//       .addCase(getOrCreateChatRoom.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { addSocketMessage, clearMessages } = messageSlice.actions;
// export default messageSlice.reducer;



// src/features/chat/messageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend base URL from .env
const API_URL = `${import.meta.env.VITE_API_ENDPOINT_BASE_URL}/messages`;

// ✅ 1. Create or send a new message
export const createMessage = createAsyncThunk(
  'messages/create',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API_URL}`,
        data ,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to send message'
      );
    }
  }
);

// ✅ 2. Fetch all messages for a specific chat
export const fetchMessagesByChat = createAsyncThunk(
  'messages/fetchByChat',
  async (chatId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/${chatId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch messages'
      );
    }
  }
);

// ✅ 3. Get or create a chat room
export const getOrCreateChatRoom = createAsyncThunk(
  'chatRoom/getOrCreate',
  async ({ userId1, userId2, propertyId }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API_URL}/chatroom`,
        { userId1, userId2, propertyId },
        { withCredentials: true }
      );
      return res.data; // chat room object
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to get or create chat room'
      );
    }
  }
);

// ✅ Slice
const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    currentRoom: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Used when receiving a new message via WebSocket
    addSocketMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Clear messages and errors when switching rooms or logging out
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🚀 Fetch Messages
      .addCase(fetchMessagesByChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesByChat.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessagesByChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📨 Create Message
      .addCase(createMessage.fulfilled, (state, action) => {
        state.messages = action.payload.message;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🧱 Get or Create Chat Room
      .addCase(getOrCreateChatRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrCreateChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload;
      })
      .addCase(getOrCreateChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Exports
export const { addSocketMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
