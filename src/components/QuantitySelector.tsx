import { Text, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantitySelector({ value, onIncrease, onDecrease }: Props) {
  const { colors, spacing, radius, typography } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.xl,
        overflow: 'hidden',
      }}
    >
      <AnimatedPressable
        testID="quantity-decrease-button"
        onPress={onDecrease}
        style={{ paddingHorizontal: spacing(1.8), paddingVertical: spacing(1), backgroundColor: colors.surfaceElevated }}
      >
        <Text style={{ ...typography.subtitle, color: colors.text }}>-</Text>
      </AnimatedPressable>
      <View style={{ minWidth: 44, alignItems: 'center' }}>
        <Text style={{ ...typography.subtitle, color: colors.text }}>{value}</Text>
      </View>
      <AnimatedPressable
        testID="quantity-increase-button"
        onPress={onIncrease}
        style={{ paddingHorizontal: spacing(1.8), paddingVertical: spacing(1), backgroundColor: colors.surfaceElevated }}
      >
        <Text style={{ ...typography.subtitle, color: colors.text }}>+</Text>
      </AnimatedPressable>
    </View>
  );
}
