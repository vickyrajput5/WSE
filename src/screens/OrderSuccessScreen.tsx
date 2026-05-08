import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../hooks/useAppTheme';
import { RootStackParamList } from '../types';
import { AnimatedPressable } from '../components/AnimatedPressable';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSuccess'>;

export function OrderSuccessScreen({ route, navigation }: Props) {
  const { colors, spacing, radius, typography } = useAppTheme();
  const { orderId } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing(3), gap: spacing(2) }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 55,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.success,
        }}
      >
        <Text style={{ fontSize: 44, color: '#FFF' }}>✓</Text>
      </View>
      <View style={{ alignItems: 'center', gap: spacing(1) }}>
        <Text style={{ ...typography.title, color: colors.text }}>Order Confirmed</Text>
        <Text style={{ ...typography.body, color: colors.textMuted }}>Order ID {orderId}</Text>
      </View>
      <AnimatedPressable
        testID="continue-shopping-button"
        onPress={() => navigation.navigate('Tabs')}
        style={{
          marginTop: spacing(1),
          borderRadius: radius.md,
          paddingVertical: spacing(1.4),
          paddingHorizontal: spacing(3),
          backgroundColor: colors.primary,
        }}
      >
        <Text style={{ ...typography.subtitle, color: '#FFF' }}>Continue Shopping</Text>
      </AnimatedPressable>
    </View>
  );
}
