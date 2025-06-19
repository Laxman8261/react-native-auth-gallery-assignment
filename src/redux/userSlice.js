import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser as loginAPI } from '../services/api';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Async login thunk
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const user = await loginAPI({ email, password });
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Load user from AsyncStorage
export const loadUser = createAsyncThunk('user/loadUser', async () => {
    const storedUser = await AsyncStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
});

// Logout
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    await AsyncStorage.removeItem('user');
    return null;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = null; // you can store token here if needed
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // load user
            .addCase(loadUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            // logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.loading = false;
                state.error = null;
            });
    },
});

export default userSlice.reducer;
