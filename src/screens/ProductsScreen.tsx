import { useMemo, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../hooks/useAppTheme';
import { RootStackParamList, ProductType } from '../types';
import { useAppSelector } from '../store/hooks';
import { SearchBar } from '../components/SearchBar';
import { CategoryChips } from '../components/CategoryChips';
import { ProductCard } from '../components/ProductCard';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { productBrands } from '../assets/data/products';

export function ProductsScreen() {
  const { colors, spacing, typography } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ProductType>('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const products = useAppSelector((state) => state.products.items);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const typeMatch = selectedType === 'All' || product.type === selectedType;
      const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
      const searchMatch =
        normalized.length === 0 ||
        product.title.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.subtitle.toLowerCase().includes(normalized);
      return typeMatch && brandMatch && searchMatch;
    });
  }, [products, query, selectedType, selectedBrand]);

  const visibleBrands = useMemo(() => {
    if (selectedType === 'All') {
      return productBrands;
    }
    const brandSet = new Set(products.filter((product) => product.type === selectedType).map((product) => product.brand));
    return ['All', ...Array.from(brandSet)];
  }, [products, selectedType]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={{ padding: spacing(2), gap: spacing(2), paddingBottom: spacing(5), paddingTop: insets.top + spacing(0.5) }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={{ gap: spacing(1.5), marginBottom: spacing(2) }}>
            <Text style={{ ...typography.title, color: colors.text }}>All Products</Text>
            <SearchBar value={query} onChangeText={setQuery} />
            <CategoryChips selected={selectedType} onSelect={setSelectedType} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing(1) }}>
              {visibleBrands.map((brand) => {
                const isActive = brand === selectedBrand;
                return (
                  <AnimatedPressable
                    key={brand}
                    testID={`brand-chip-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                    onPress={() => setSelectedBrand(brand)}
                    style={{
                      paddingHorizontal: spacing(1.6),
                      paddingVertical: spacing(0.9),
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: isActive ? colors.primary : colors.border,
                      backgroundColor: isActive ? colors.primary : colors.surface,
                    }}
                  >
                    <Text style={{ ...typography.caption, color: isActive ? '#FFF' : colors.text }}>{brand}</Text>
                  </AnimatedPressable>
                );
              })}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={12}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
}
