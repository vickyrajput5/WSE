import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, ThemePreference } from '../types';

const CART_KEY = '@testapp/cart';
const THEME_KEY = '@testapp/theme';

export async function saveCart(items: CartItem[]) {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
}

export async function loadCart() {
  const raw = await AsyncStorage.getItem(CART_KEY);
  if (!raw) {
    return [];
  }
  return JSON.parse(raw) as CartItem[];
}

export async function saveThemePreference(theme: ThemePreference) {
  await AsyncStorage.setItem(THEME_KEY, theme);
}

export async function loadThemePreference() {
  const raw = await AsyncStorage.getItem(THEME_KEY);
  if (!raw) {
    return 'system' as ThemePreference;
  }
  return raw as ThemePreference;
}
