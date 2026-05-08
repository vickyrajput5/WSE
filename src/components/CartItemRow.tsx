import { Image, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { CartItem } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import { formatPrice } from '../utils/format';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { colors, spacing, radius, typography } = useAppTheme();

  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={() => (
        <AnimatedPressable
          testID={`remove-cart-item-${item.product.id}`}
          onPress={onRemove}
          style={{
            width: 90,
            borderRadius: radius.lg,
            backgroundColor: colors.danger,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ ...typography.caption, color: '#FFF' }}>Remove</Text>
        </AnimatedPressable>
      )}
    >
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          padding: spacing(1.5),
          alignItems: 'center',
          gap: spacing(1.5),
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <AnimatedPressable
          testID={`remove-cart-item-cross-${item.product.id}`}
          onPress={onRemove}
          style={{
            position: 'absolute',
            top: spacing(1),
            right: spacing(1),
            width: 24,
            height: 24,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surfaceElevated,
            borderWidth: 1,
            borderColor: colors.border,
            zIndex: 2,
          }}
        >
          <Text style={{ ...typography.caption, color: colors.textMuted }}>✕</Text>
        </AnimatedPressable>
        <Image source={{ uri: item.product.images[0] }} style={{ width: 72, height: 72, borderRadius: radius.md }} />
        <View style={{ flex: 1, gap: spacing(0.3) }}>
          <Text numberOfLines={1} style={{ ...typography.subtitle, color: colors.text }}>
            {item.product.title}
          </Text>
          <Text style={{ ...typography.caption, color: colors.textMuted }}>{formatPrice(item.product.price)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(1) }}>
            <AnimatedPressable testID={`cart-decrease-${item.product.id}`} onPress={onDecrease}>
              <Text style={{ ...typography.subtitle, color: colors.text }}>-</Text>
            </AnimatedPressable>
            <Text style={{ ...typography.body, color: colors.text }}>{item.quantity}</Text>
            <AnimatedPressable testID={`cart-increase-${item.product.id}`} onPress={onIncrease}>
              <Text style={{ ...typography.subtitle, color: colors.text }}>+</Text>
            </AnimatedPressable>
          </View>
        </View>
        <Text style={{ ...typography.subtitle, color: colors.primary }}>
          {formatPrice(item.product.price * item.quantity)}
        </Text>
      </View>
    </Swipeable>
  );
}
