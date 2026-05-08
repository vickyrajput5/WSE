import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { TabParamList } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAppSelector } from '../store/hooks';
import { selectCartCount } from '../store/slices/cartSlice';

const Tab = createBottomTabNavigator<TabParamList>();

export function MainTabs() {
  const { colors, typography } = useAppTheme();
  const count = useAppSelector(selectCartCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { ...typography.caption },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⌂</Text>,
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>▦</Text>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: count > 0 ? count : undefined,
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🛍️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
