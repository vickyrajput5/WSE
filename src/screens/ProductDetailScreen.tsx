import { useMemo, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { formatPrice } from '../utils/format';
import { QuantitySelector } from '../components/QuantitySelector';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { addToCart } from '../store/slices/cartSlice';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const { colors, spacing, radius, typography } = useAppTheme();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.items.find((item) => item.id === productId));
  const [quantity, setQuantity] = useState(1);
  const [buttonScale] = useState(new Animated.Value(1));

  const total = useMemo(() => (product ? product.price * quantity : 0), [product, quantity]);

  if (!product) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing(4) }}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {product.images.map((image, index) => (
            <Image key={`${product.id}-${index}`} source={{ uri: image }} style={{ width, height: 350 }} resizeMode="cover" />
          ))}
        </ScrollView>
        <View style={{ padding: spacing(2), gap: spacing(2) }}>
          <View style={{ gap: spacing(0.7) }}>
            <Text style={{ ...typography.caption, color: colors.textMuted }}>{product.subtitle}</Text>
            <Text style={{ ...typography.title, color: colors.text }}>{product.title}</Text>
            <Text style={{ ...typography.subtitle, color: colors.primary }}>{formatPrice(product.price)}</Text>
            <Text style={{ ...typography.caption, color: colors.textMuted }}>Rating {product.rating}/5.0</Text>
          </View>
          <Text style={{ ...typography.body, color: colors.textMuted }}>{product.description}</Text>
          <QuantitySelector
            value={quantity}
            onIncrease={() => setQuantity((prev) => prev + 1)}
            onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
          />
        </View>
      </ScrollView>
      <Animated.View style={[{ padding: spacing(2), paddingTop: spacing(1.5), transform: [{ scale: buttonScale }] }]}>
        <AnimatedPressable
          testID="add-to-cart-button"
          onPress={() => {
            dispatch(addToCart({ product, quantity }));
            Animated.sequence([
              Animated.spring(buttonScale, { toValue: 1.07, useNativeDriver: true, speed: 22, bounciness: 4 }),
              Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, speed: 22, bounciness: 6 }),
            ]).start();
            navigation.navigate('Tabs', { screen: 'Cart' });
          }}
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={{
              borderRadius: radius.lg,
              paddingVertical: spacing(1.7),
              alignItems: 'center',
            }}
          >
            <Text style={{ ...typography.subtitle, color: '#FFF' }}>Add to Cart • {formatPrice(total)}</Text>
          </LinearGradient>
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
}
