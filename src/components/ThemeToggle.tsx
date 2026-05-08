import { Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectThemePreference, setThemePreference } from '../store/slices/themeSlice';
import { useAppTheme } from '../hooks/useAppTheme';
import { ThemePreference } from '../types';
import { AnimatedPressable } from './AnimatedPressable';

const orderedModes: ThemePreference[] = ['light', 'dark', 'system'];

const iconMap: Record<ThemePreference, string> = {
  light: '☀',
  dark: '☾',
  system: '⌨',
};

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const preference = useAppSelector(selectThemePreference);
  const { colors, radius } = useAppTheme();
  const nextMode = orderedModes[(orderedModes.indexOf(preference) + 1) % orderedModes.length];

  return (
    <AnimatedPressable
      testID="theme-toggle-cycle-button"
      onPress={() => dispatch(setThemePreference(nextMode))}
      style={{
        width: 56,
        height: 56,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text testID={`theme-toggle-icon-${preference}`} style={{ fontSize: 24, color: colors.text }}>
        {iconMap[preference]}
      </Text>
    </AnimatedPressable>
  );
}
