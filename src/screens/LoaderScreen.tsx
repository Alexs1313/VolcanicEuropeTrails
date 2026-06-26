import React, {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {LOADER_ICON} from '../assets/trailImages';
import {Storage} from '../storage/storage';

import {Colors} from '../theme/colors';

interface Props {
  onFinish: (skipOnboarding: boolean) => void;
}

function Spinner12() {
  const SIZE = 54;
  const BAR_W = SIZE * 0.08;
  const BAR_H = SIZE * 0.245;
  const RADIUS = SIZE * 0.1;

  const ARM = SIZE * 0.3;

  const anims = useRef(
    Array.from({length: 12}, () => new Animated.Value(1)),
  ).current;

  const loops = useMemo(() => {
    const DURATION = 1000;
    return anims.map((a, i) => {
      const delay = Math.round(((12 - i) % 12) * (DURATION / 12));
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(a, {
            toValue: 0.25,
            duration: DURATION,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(a, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );
    });
  }, [anims]);

  useEffect(() => {
    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
  }, [loops]);

  return (
    <View style={{width: SIZE, height: SIZE}}>
      {anims.map((opacity, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const cx = SIZE / 2 + ARM * Math.sin(angle) - BAR_W / 2;
        const cy = SIZE / 2 - ARM * Math.cos(angle) - BAR_H / 2;
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: cx,
              top: cy,
              width: BAR_W,
              height: BAR_H,
              borderRadius: RADIUS,
              backgroundColor: '#808080',
              opacity,
              transform: [{rotate: `${i * 30}deg`}],
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 1,
            }}
          />
        );
      })}
    </View>
  );
}

export function LoaderScreen({onFinish}: Props) {
  useEffect(() => {
    Storage.isOnboardingDone().then(() => {
      const timer = setTimeout(() => onFinish(false), 2400);
      return () => clearTimeout(timer);
    });
  }, [onFinish]);

  return (
    <LinearGradient
      colors={[Colors.loaderBgStart, Colors.loaderBgEnd]}
      style={styles.LoaderScreenContainer}>
      <ScrollView
        contentContainerStyle={styles.LoaderScreenScroll}
        showsVerticalScrollIndicator={false}>
        <Image
          source={LOADER_ICON}
          style={styles.LoaderScreenIcon}
          resizeMode="cover"
        />
        <View style={styles.LoaderScreenTextBlock}>
          <Text style={styles.LoaderScreenTitle}>Preparing the Trail</Text>
          <View style={styles.LoaderScreenTitleGap} />
          <Text style={styles.LoaderScreenSubtitle}>
            Loading mountain trails, scenic views, and travel notes for your
            next European escape.
          </Text>
        </View>
        <View style={styles.LoaderScreenSpinner}>
          <Spinner12 />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  LoaderScreenContainer: {
    flex: 1,
  },
  LoaderScreenScroll: {
    paddingTop: 268,
    paddingBottom: 50,
    alignItems: 'center',
  },
  LoaderScreenIcon: {
    width: 180,
    height: 180,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#280202',
    shadowColor: 'rgba(186,5,5,1)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.37,
    shadowRadius: 18,
    elevation: 12,
  },
  LoaderScreenTextBlock: {
    marginTop: 65,
    width: 283,
    alignItems: 'center',
  },
  LoaderScreenTitle: {
    color: '#d2d2d2',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -0.32,
    textAlign: 'center',
  },
  LoaderScreenTitleGap: {
    height: 21,
  },
  LoaderScreenSubtitle: {
    color: '#979595',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.32,
    textAlign: 'center',
  },
  LoaderScreenSpinner: {
    marginTop: 87,
  },
});
