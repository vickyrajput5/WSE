import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { decrementQuantity, incrementQuantity, removeFromCart, selectCartItems, selectCartSubtotal } from '../store/slices/cartSlice';
import { CartItemRow } from '../components/CartItemRow';
import { RootStackParamList } from '../types';
import { formatPrice } from '../utils/format';
import { AnimatedPressable } from '../components/AnimatedPressable';

export function CartScreen() {
  const { colors, spacing, radius, typography } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={{ padding: spacing(2), gap: spacing(1.5), paddingBottom: spacing(16), paddingTop: insets.top + spacing(0.5) }}
        ListHeaderComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(0.5) }}>
            <AnimatedPressable
              testID="cart-back-button"
              onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
              style={{
                paddingHorizontal: spacing(1.5),
                paddingVertical: spacing(1),
                borderRadius: radius.xl,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              }}
            >
              <Text style={{ ...typography.caption, color: colors.text }}>← Back</Text>
            </AnimatedPressable>
            <Text style={{ ...typography.subtitle, color: colors.text }}>Cart</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrease={() => dispatch(incrementQuantity(item.product.id))}
            onDecrease={() => dispatch(decrementQuantity(item.product.id))}
            onRemove={() => dispatch(removeFromCart(item.product.id))}
          />
        )}
        ListEmptyComponent={
          <View style={{ paddingVertical: spacing(7), alignItems: 'center' }}>
            <Text style={{ ...typography.subtitle, color: colors.textMuted }}>Your cart is empty</Text>
          </View>
        }
      />
      <View
        style={{
          position: 'absolute',
          left: spacing(2),
          right: spacing(2),
          bottom: spacing(2),
          borderRadius: radius.lg,
          padding: spacing(2),
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          gap: spacing(1.5),
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ ...typography.body, color: colors.textMuted }}>Subtotal</Text>
          <Text style={{ ...typography.subtitle, color: colors.text }}>{formatPrice(subtotal)}</Text>
        </View>
        <AnimatedPressable
          testID="cart-checkout-button"
          onPress={() => navigation.navigate('Checkout')}
          disabled={items.length === 0}
          style={{
            borderRadius: radius.md,
            paddingVertical: spacing(1.5),
            alignItems: 'center',
            backgroundColor: items.length === 0 ? colors.border : colors.primary,
          }}
        >
          <Text style={{ ...typography.subtitle, color: items.length === 0 ? colors.textMuted : '#FFF' }}>Checkout</Text>
        </AnimatedPressable>
      </View>
    </View>
  );
}
