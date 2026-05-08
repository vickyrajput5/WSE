import { Image, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../hooks/useAppTheme';
import { RootStackParamList } from '../types';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { ThemeToggle } from '../components/ThemeToggle';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { featuredProducts, productTypes } from '../assets/data/products';

export function HomeScreen() {
  const { colors, spacing, typography } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing(2), gap: spacing(2), paddingBottom: spacing(5), paddingTop: insets.top + spacing(0.5) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ ...typography.title, color: colors.text }}>Discover</Text>
          <ThemeToggle />
        </View>
        <FeaturedCarousel />
        <View style={{ gap: spacing(1), paddingVertical: spacing(0.5) }}>
          <Text style={{ ...typography.subtitle, color: colors.text }}>Shop by Type</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1) }}>
            {productTypes
              .filter((type) => type !== 'All')
              .map((type) => (
                <AnimatedPressable
                  key={type}
                  testID={`home-type-${type.toLowerCase()}`}
                  onPress={() => navigation.navigate('Tabs', { screen: 'Products' })}
                  style={{
                    paddingHorizontal: spacing(1.6),
                    paddingVertical: spacing(1),
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  }}
                >
                  <Text style={{ ...typography.caption, color: colors.text }}>{type}</Text>
                </AnimatedPressable>
              ))}
          </View>
        </View>
        <View style={{ gap: spacing(1) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ ...typography.subtitle, color: colors.text }}>Trending Products</Text>
            <AnimatedPressable testID="home-see-all-products" onPress={() => navigation.navigate('Tabs', { screen: 'Products' })}>
              <Text style={{ ...typography.caption, color: colors.primary }}>See All</Text>
            </AnimatedPressable>
          </View>
          {featuredProducts.slice(0, 4).map((product) => (
            <AnimatedPressable
              key={product.id}
              testID={`home-featured-${product.id}`}
              onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing(1.2),
                padding: spacing(1.2),
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              }}
            >
              <Image source={{ uri: product.images[0] }} style={{ width: 62, height: 62, borderRadius: 12 }} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ ...typography.subtitle, color: colors.text }}>
                  {product.title}
                </Text>
                <Text style={{ ...typography.caption, color: colors.textMuted }}>{product.brand}</Text>
              </View>
              <Text style={{ ...typography.subtitle, color: colors.primary }}>${product.price}</Text>
            </AnimatedPressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
