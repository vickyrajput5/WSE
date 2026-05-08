import { PropsWithChildren, useRef } from 'react';
import { Animated, Pressable, PressableProps } from 'react-native';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

export function AnimatedPressable({ children, onPressIn, onPressOut, style, ...rest }: PropsWithChildren<PressableProps>) {
  const scale = useRef(new Animated.Value(1)).current;
  const resolvedStyle = typeof style === 'function' ? style({ pressed: false }) : style;

  return (
    <AnimatedPressableBase
      {...rest}
      onPressIn={(event) => {
        Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 22, bounciness: 4 }).start();
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 22, bounciness: 6 }).start();
        onPressOut?.(event);
      }}
      style={[resolvedStyle, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedPressableBase>
  );
}
