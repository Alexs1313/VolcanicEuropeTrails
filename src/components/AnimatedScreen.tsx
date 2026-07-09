import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
}

export function AnimatedScreen({
  style,
  children,
  distance = 16,
  duration = 420,
  pointerEvents,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [opacity, translateY, duration]);

  return (
    <Animated.View
      style={[style, {opacity, transform: [{translateY}]}]}
      pointerEvents={pointerEvents}>
      {children}
    </Animated.View>
  );
}
