import { useEffect, useRef, useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../hooks/useAppTheme';

const banners = [
  { id: 'b1', title: 'Spring Tech Drop', subtitle: 'Up to 25% off premium picks', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600' },
  { id: 'b2', title: 'Audio Week', subtitle: 'Spatial sound essentials', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1600' },
  { id: 'b3', title: 'Smart Living', subtitle: 'Upgrade your daily setup', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600' },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export function FeaturedCarousel() {
  const { colors, spacing, radius, typography } = useAppTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (active + 1) % banners.length;
      scrollRef.current?.scrollTo({ x: next * (CARD_WIDTH + spacing(1.5)), animated: true });
      setActive(next);
    }, 3500);
    return () => clearInterval(interval);
  }, [active, spacing]);

  return (
    <View style={{ gap: spacing(1) }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + spacing(1.5)}
        decelerationRate="fast"
        contentContainerStyle={{ gap: spacing(1.5) }}
      >
        {banners.map((banner) => (
          <ImageBackground
            key={banner.id}
            source={{ uri: banner.image }}
            style={{ width: CARD_WIDTH, height: 170, overflow: 'hidden', borderRadius: radius.lg }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.65)']}
              style={{ flex: 1, justifyContent: 'flex-end', padding: spacing(2) }}
            >
              <Text style={{ ...typography.title, color: '#FFF' }}>{banner.title}</Text>
              <Text style={{ ...typography.body, color: '#E8EBFF' }}>{banner.subtitle}</Text>
            </LinearGradient>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing(0.8) }}>
        {banners.map((banner, index) => (
          <View
            key={banner.id}
            style={{
              width: active === index ? 18 : 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: active === index ? colors.primary : colors.border,
            }}
          />
        ))}
      </View>
    </View>
  );
}
