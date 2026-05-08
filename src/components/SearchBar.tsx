import { useRef, useState } from 'react';
import { Animated, Easing, TextInput } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: Props) {
  const { colors, spacing, radius, typography, isDark } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: isFocused ? (isDark ? '#AAB4FF' : colors.primary) : colors.border,
          borderRadius: radius.md,
          paddingHorizontal: spacing(2),
          paddingVertical: spacing(1.5),
        },
        { transform: [{ scale }] },
      ]}
    >
      <TextInput
        testID="home-search-input"
        placeholder="Search products"
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setIsFocused(true);
          Animated.timing(scale, { toValue: 1.01, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
        }}
        onBlur={() => {
          setIsFocused(false);
          Animated.timing(scale, { toValue: 1, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
        }}
        style={{
          color: colors.text,
          ...typography.body,
          padding: 0,
        }}
      />
    </Animated.View>
  );
}
