import { ScrollView, Text } from 'react-native';
import { productTypes } from '../assets/data/products';
import { ProductType } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  selected: ProductType;
  onSelect: (category: ProductType) => void;
}

export function CategoryChips({ selected, onSelect }: Props) {
  const { colors, spacing, radius, typography } = useAppTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing(1) }}>
      {productTypes.map((category) => {
        const isActive = selected === category;
        return (
          <AnimatedPressable
            testID={`category-chip-${category.toLowerCase()}`}
            key={category}
            onPress={() => onSelect(category)}
            style={{
              paddingHorizontal: spacing(2),
              paddingVertical: spacing(1),
              borderRadius: radius.xl,
              backgroundColor: isActive ? colors.primary : colors.surface,
              borderWidth: 1,
              borderColor: isActive ? colors.primary : colors.border,
            }}
          >
            <Text style={{ ...typography.caption, color: isActive ? '#FFFFFF' : colors.text }}>{category}</Text>
          </AnimatedPressable>
        );
      })}
    </ScrollView>
  );
}
