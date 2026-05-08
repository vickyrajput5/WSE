import { Product, ProductType } from '../../types';

export const productTypes: ProductType[] = ['All', 'Phones', 'Laptops', 'Audio', 'Accessories', 'Wearables'];

const phoneBrands = ['Samsung', 'Oppo', 'Tecno', 'Infinix', 'Google Pixel', 'iPhone'] as const;
const laptopBrands = ['HP', 'Dell', 'MacBook', 'Lenovo', 'Asus'] as const;

const phoneImages = [
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1400',
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1400',
  'https://images.unsplash.com/photo-1583573636246-18cb2246697f?w=1400',
  'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1400',
  'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1400',
];

const laptopImages = [
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1400',
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1400',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1400',
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1400',
];

const accessoryImages = [
  'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=1400',
  'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=1400',
  'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1400',
  'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=1400',
];

const audioImages = [
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1400',
  'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1400',
  'https://images.unsplash.com/photo-1545127398-14699f92334b?w=1400',
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1400',
];

const wearableImages = [
  'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1400',
  'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1400',
  'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=1400',
];

let productCounter = 1;

const createProduct = (input: Omit<Product, 'id'>): Product => ({
  ...input,
  id: `p-${productCounter++}`,
});

const generateSeries = (
  type: Exclude<ProductType, 'All'>,
  brand: string,
  count: number,
  basePrice: number,
  imagePool: string[],
  subtitle: string,
  details: string,
) =>
  Array.from({ length: count }, (_, index) =>
    createProduct({
      type,
      brand,
      title: `${brand} ${type === 'Phones' ? 'Series' : 'Line'} ${index + 1}`,
      subtitle,
      description: `${brand} ${details} Variant ${index + 1} with premium build, reliable battery, and optimized performance.`,
      price: basePrice + index * 25,
      rating: Number((4.3 + ((index % 6) * 0.1)).toFixed(1)),
      images: [imagePool[index % imagePool.length]],
    }),
  );

const phoneProducts = phoneBrands.flatMap((brand, brandIndex) =>
  generateSeries('Phones', brand, 10, 399 + brandIndex * 120, phoneImages, 'Smartphone', 'smartphone built for daily speed and camera quality.'),
);

const laptopProducts = laptopBrands.flatMap((brand, brandIndex) =>
  generateSeries('Laptops', brand, 10, 799 + brandIndex * 150, laptopImages, 'Laptop', 'laptop engineered for creators, students, and professionals.'),
);

const audioProducts = ['Sony', 'JBL', 'Bose', 'Anker'].flatMap((brand, brandIndex) =>
  generateSeries('Audio', brand, 4, 129 + brandIndex * 40, audioImages, 'Audio Device', 'audio device with rich bass and clear calls.'),
);

const accessoryProducts = ['Ugreen', 'Spigen', 'Belkin', 'Logitech'].flatMap((brand, brandIndex) =>
  generateSeries('Accessories', brand, 3, 39 + brandIndex * 20, accessoryImages, 'Accessory', 'accessory designed for durability and sleek style.'),
);

const wearableProducts = ['Fitbit', 'Garmin', 'Huawei'].flatMap((brand, brandIndex) =>
  generateSeries('Wearables', brand, 3, 149 + brandIndex * 80, wearableImages, 'Wearable', 'wearable crafted for wellness and notifications.'),
);

export const products: Product[] = [
  ...phoneProducts,
  ...laptopProducts,
  ...audioProducts,
  ...accessoryProducts,
  ...wearableProducts,
];

export const featuredProducts = products.slice(0, 8);

export const productBrands = ['All', ...Array.from(new Set(products.map((product) => product.brand)))];
