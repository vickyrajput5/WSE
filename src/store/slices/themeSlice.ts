import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { ThemeMode, ThemePreference } from '../../types';
import { loadThemePreference, saveThemePreference } from '../../services/storage';
import type { RootState } from '../index';
import { darkTheme, lightTheme } from '../../theme/themes';

interface ThemeState {
  preference: ThemePreference;
  systemMode: ThemeMode;
}

const initialState: ThemeState = {
  preference: 'system',
  systemMode: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
};

export const bootstrapTheme = createAsyncThunk('theme/bootstrap', async () => {
  const preference = await loadThemePreference();
  return preference;
});

export const setThemePreference = createAsyncThunk('theme/setPreference', async (preference: ThemePreference) => {
  await saveThemePreference(preference);
  return preference;
});

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSystemMode: (state, action: PayloadAction<ThemeMode>) => {
      state.systemMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bootstrapTheme.fulfilled, (state, action) => {
      state.preference = action.payload;
    });
    builder.addCase(setThemePreference.fulfilled, (state, action) => {
      state.preference = action.payload;
    });
  },
});

export const { setSystemMode } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export const selectThemePreference = (state: RootState) => state.theme.preference;
export const selectResolvedThemeMode = (state: RootState): ThemeMode =>
  state.theme.preference === 'system' ? state.theme.systemMode : state.theme.preference;
export const selectResolvedTheme = (state: RootState) =>
  selectResolvedThemeMode(state) === 'dark' ? darkTheme : lightTheme;
