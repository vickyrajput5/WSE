import { NavigatorScreenParams } from '@react-navigation/native';

export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';

export type ProductType = 'All' | 'Phones' | 'Laptops' | 'Audio' | 'Accessories' | 'Wearables';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  type: Exclude<ProductType, 'All'>;
  brand: string;
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type TabParamList = {
  Home: undefined;
  Products: undefined;
  Cart: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  ProductDetail: { productId: string };
  Checkout: undefined;
  OrderSuccess: { orderId: string };
};
