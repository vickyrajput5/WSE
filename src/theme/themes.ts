import { ThemeMode } from '../types';

export interface AppTheme {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    surfaceElevated: string;
    primary: string;
    primarySoft: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    danger: string;
    gradientStart: string;
    gradientEnd: string;
  };
  spacing: (multiplier: number) => number;
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    title: { fontSize: number; lineHeight: number; fontFamily: string };
    subtitle: { fontSize: number; lineHeight: number; fontFamily: string };
    body: { fontSize: number; lineHeight: number; fontFamily: string };
    caption: { fontSize: number; lineHeight: number; fontFamily: string };
  };
}

const spacing = (multiplier: number) => multiplier * 8;

const base = {
  spacing,
  radius: { sm: 12, md: 16, lg: 20, xl: 28 },
  typography: {
    title: { fontSize: 24, lineHeight: 30, fontFamily: 'Inter_700Bold' },
    subtitle: { fontSize: 18, lineHeight: 24, fontFamily: 'Inter_600SemiBold' },
    body: { fontSize: 15, lineHeight: 22, fontFamily: 'Inter_400Regular' },
    caption: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_500Medium' },
  },
};

export const lightTheme: AppTheme = {
  mode: 'light',
  ...base,
  colors: {
    background: '#F5F7FB',
    surface: '#FFFFFF',
    surfaceElevated: '#FDFDFE',
    primary: '#5567FF',
    primarySoft: '#E6E9FF',
    text: '#141723',
    textMuted: '#6D738A',
    border: '#E6EAF2',
    success: '#11C17B',
    danger: '#FF4D67',
    gradientStart: '#7D8BFF',
    gradientEnd: '#5567FF',
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  ...base,
  colors: {
    background: '#0E1119',
    surface: '#161A24',
    surfaceElevated: '#1B2130',
    primary: '#8A96FF',
    primarySoft: '#293255',
    text: '#F4F6FC',
    textMuted: '#A7AEC4',
    border: '#2A3043',
    success: '#25D78D',
    danger: '#FF6880',
    gradientStart: '#8894FF',
    gradientEnd: '#6676FF',
  },
};
