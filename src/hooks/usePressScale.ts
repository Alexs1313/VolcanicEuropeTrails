import {useRef} from 'react';
import {Animated} from 'react-native';

export function usePressScale(activeScale = 0.95) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: activeScale,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return {scale, onPressIn, onPressOut};
}
