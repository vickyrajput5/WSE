import { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../hooks/useAppTheme';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCart, selectCartItems, selectCartSubtotal } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/format';
import { AnimatedPressable } from '../components/AnimatedPressable';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export function CheckoutScreen({ navigation }: Props) {
  const { colors, spacing, radius, typography } = useAppTheme();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple'>('apple');
  const [name, setName] = useState('Muhammad Waqar');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Cupertino');

  const shipping = useMemo(() => (items.length > 0 ? 19 : 0), [items.length]);
  const total = subtotal + shipping;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing(2), gap: spacing(2), paddingBottom: spacing(4) }}>
        <AnimatedPressable
          testID="checkout-back-to-products-button"
          onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: spacing(1.5),
            paddingVertical: spacing(1),
            borderRadius: radius.xl,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
          }}
        >
          <Text style={{ ...typography.caption, color: colors.text }}>← Back to Products</Text>
        </AnimatedPressable>
        <View style={{ gap: spacing(1) }}>
          <Text style={{ ...typography.subtitle, color: colors.text }}>Shipping Address</Text>
          <TextInput
            testID="checkout-name-input"
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor={colors.textMuted}
            style={{ borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing(1.5), color: colors.text }}
          />
          <TextInput
            testID="checkout-address-input"
            value={address}
            onChangeText={setAddress}
            placeholder="Street address"
            placeholderTextColor={colors.textMuted}
            style={{ borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing(1.5), color: colors.text }}
          />
          <TextInput
            testID="checkout-city-input"
            value={city}
            onChangeText={setCity}
            placeholder="City"
            placeholderTextColor={colors.textMuted}
            style={{ borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing(1.5), color: colors.text }}
          />
        </View>

        <View style={{ gap: spacing(1) }}>
          <Text style={{ ...typography.subtitle, color: colors.text }}>Payment</Text>
          <View style={{ flexDirection: 'row', gap: spacing(1) }}>
            {(['apple', 'card'] as const).map((method) => (
              <AnimatedPressable
                key={method}
                testID={`checkout-payment-${method}`}
                onPress={() => setPaymentMethod(method)}
                style={{
                  flex: 1,
                  paddingVertical: spacing(1.3),
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderColor: paymentMethod === method ? colors.primary : colors.border,
                  backgroundColor: paymentMethod === method ? colors.primarySoft : colors.surface,
                  alignItems: 'center',
                }}
              >
                <Text style={{ ...typography.body, color: colors.text }}>
                  {method === 'apple' ? 'Apple Pay' : 'Card'}
                </Text>
              </AnimatedPressable>
            ))}
          </View>
        </View>

        <View
          style={{
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: spacing(2),
            gap: spacing(1),
          }}
        >
          <Text style={{ ...typography.subtitle, color: colors.text }}>Order Summary</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ ...typography.body, color: colors.textMuted }}>Items</Text>
            <Text style={{ ...typography.body, color: colors.text }}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ ...typography.body, color: colors.textMuted }}>Shipping</Text>
            <Text style={{ ...typography.body, color: colors.text }}>{formatPrice(shipping)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ ...typography.subtitle, color: colors.text }}>Total</Text>
            <Text style={{ ...typography.subtitle, color: colors.primary }}>{formatPrice(total)}</Text>
          </View>
        </View>

        <AnimatedPressable
          testID="place-order-button"
          disabled={items.length === 0 || isPlacingOrder}
          onPress={async () => {
            setIsPlacingOrder(true);
            await new Promise((resolve) => setTimeout(resolve, 1100));
            const orderId = `ORD-${Math.floor(Math.random() * 900000 + 100000)}`;
            dispatch(clearCart());
            setIsPlacingOrder(false);
            navigation.replace('OrderSuccess', { orderId });
          }}
          style={{
            borderRadius: radius.md,
            paddingVertical: spacing(1.6),
            alignItems: 'center',
            backgroundColor: items.length === 0 ? colors.border : colors.primary,
            minHeight: 56,
            justifyContent: 'center',
          }}
        >
          {isPlacingOrder ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{ ...typography.subtitle, color: items.length === 0 ? colors.textMuted : '#FFF' }}>Place Order</Text>
          )}
        </AnimatedPressable>
      </ScrollView>
    </View>
  );
}
