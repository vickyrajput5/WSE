import { memo } from 'react';
import { Image, Text, View } from 'react-native';
import { Product } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import { formatPrice } from '../utils/format';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  product: Product;
  onPress: () => void;
}

export const ProductCard = memo(function ProductCard({ product, onPress }: Props) {
  const { colors, spacing, radius, typography } = useAppTheme();

  return (
    <View style={{ width: '48%' }}>
      <AnimatedPressable
        testID={`product-card-${product.id}`}
        onPress={onPress}
        style={{
          borderRadius: radius.lg,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        }}
      >
        <Image source={{ uri: product.images[0] }} style={{ width: '100%', height: 140 }} resizeMode="cover" />
        <View style={{ padding: spacing(1.5), gap: spacing(0.5) }}>
          <Text numberOfLines={1} style={{ ...typography.caption, color: colors.textMuted }}>
            {product.subtitle}
          </Text>
          <Text numberOfLines={1} style={{ ...typography.subtitle, color: colors.text }}>
            {product.title}
          </Text>
          <Text style={{ ...typography.subtitle, color: colors.primary }}>{formatPrice(product.price)}</Text>
        </View>
      </AnimatedPressable>
    </View>
  );
});
