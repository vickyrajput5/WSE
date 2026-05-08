import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectResolvedTheme } from '../store/slices/themeSlice';

export function useAppTheme() {
  const theme = useAppSelector(selectResolvedTheme);

  return useMemo(
    () => ({
      theme,
      colors: theme.colors,
      spacing: theme.spacing,
      radius: theme.radius,
      typography: theme.typography,
      isDark: theme.mode === 'dark',
    }),
    [theme],
  );
}
