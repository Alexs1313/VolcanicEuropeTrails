import React, {useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ONBOARDING_IMAGES} from '../assets/trailImages';
import {FadeSlideIn} from '../components/FadeSlideIn';
import {usePressScale} from '../hooks/usePressScale';
import {Storage} from '../storage/storage';
import {Colors} from '../theme/colors';

const IMAGE_LAYOUTS = [
  {width: 320, height: 303},
  {width: 184, height: 334},
  {width: 315, height: 335},
  {width: 332, height: 276},
  {width: 350, height: 288},
] as const;

const PAGES = [
  {
    title: 'Discover Fiery Europe',
    subtitle:
      'Explore mountain peaks, volcanic trails, and dramatic natural landmarks across Europe.',
    button: 'Start Exploring',
  },
  {
    title: 'Follow Scenic Trails',
    subtitle:
      'Find trails through cliffs, craters, ridges, lakes, and panoramic mountain viewpoints.',
    button: 'View Trails',
  },
  {
    title: 'Explore Fiery Spots',
    subtitle:
      'Open detailed cards with descriptions, coordinates, and useful travel information.',
    button: 'Open Places',
  },
  {
    title: 'Save Future Trips',
    subtitle:
      'Keep your favorite peaks and volcanic landscapes ready for your next journey.',
    button: 'Save Places',
  },
  {
    title: 'Travel Prepared',
    subtitle:
      'Read safety notes and simple tips before visiting mountain and volcanic areas.',
    button: 'Enter App',
  },
];

interface Props {
  onFinish: () => void;
}

export function OnboardingScreen({onFinish}: Props) {
  const [page, setPage] = useState(0);
  const current = PAGES[page];
  const layout = IMAGE_LAYOUTS[page] ?? IMAGE_LAYOUTS[0];
  const skipScale = usePressScale(0.92);
  const nextScale = usePressScale(0.96);

  const complete = async () => {
    await Storage.setOnboardingDone();
    onFinish();
  };

  const next = () => {
    if (page < PAGES.length - 1) {
      setPage(p => p + 1);
    } else {
      complete();
    }
  };

  return (
    <ScrollView
      style={styles.OnboardingScreenScroll}
      contentContainerStyle={[styles.OnboardingScreenContent]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.OnboardingScreenSkipRow}>
        <TouchableOpacity
          onPress={complete}
          onPressIn={skipScale.onPressIn}
          onPressOut={skipScale.onPressOut}>
          <Animated.View
            style={[
              styles.OnboardingScreenSkipBtn,
              {transform: [{scale: skipScale.scale}]},
            ]}>
            <Text style={styles.OnboardingScreenSkipText}>Skip</Text>
            <Text style={styles.OnboardingScreenSkipArrow}> ›</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <FadeSlideIn
        key={`image-${page}`}
        style={styles.OnboardingScreenImageWrap}
        duration={420}
        distance={20}>
        <Image
          source={ONBOARDING_IMAGES[page]}
          style={{width: layout.width, height: layout.height}}
          resizeMode="contain"
        />
      </FadeSlideIn>

      <FadeSlideIn
        key={`card-${page}`}
        style={styles.OnboardingScreenCardWrap}
        duration={420}
        delay={80}
        distance={20}>
        <View style={styles.OnboardingScreenCard}>
          <Text style={styles.OnboardingScreenCardTitle}>{current.title}</Text>
          <Text style={styles.OnboardingScreenCardSubtitle}>
            {current.subtitle}
          </Text>
        </View>
      </FadeSlideIn>

      <FadeSlideIn
        key={`btn-${page}`}
        style={styles.OnboardingScreenBtnWrap}
        duration={420}
        delay={160}
        distance={20}>
        <TouchableOpacity
          onPress={next}
          onPressIn={nextScale.onPressIn}
          onPressOut={nextScale.onPressOut}
          activeOpacity={0.85}>
          <Animated.View
            style={[
              styles.OnboardingScreenBtn,
              {transform: [{scale: nextScale.scale}]},
            ]}>
            <Text style={styles.OnboardingScreenBtnText}>{current.button}</Text>
          </Animated.View>
        </TouchableOpacity>
      </FadeSlideIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenScroll: {
    backgroundColor: Colors.onboardingBg,
    flexGrow: 1,
  },
  OnboardingScreenContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  OnboardingScreenSkipRow: {
    paddingTop: 83,
    paddingLeft: 30,
  },

  OnboardingScreenSkipBtn: {
    width: 90,
    height: 32,
    backgroundColor: '#000000',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  OnboardingScreenSkipText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.32,
  },

  OnboardingScreenSkipArrow: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '400',
  },
  OnboardingScreenImageWrap: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 40,
  },
  OnboardingScreenCardWrap: {
    alignItems: 'center',
  },

  OnboardingScreenCard: {
    width: 285,
    height: 125,
    backgroundColor: Colors.onboardingCardBg,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(165, 5, 5, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    overflow: 'hidden',
    marginBottom: 30,
  },

  OnboardingScreenCardTitle: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 6,
    letterSpacing: -0.32,
  },

  OnboardingScreenCardSubtitle: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 17,
    letterSpacing: -0.32,
  },
  OnboardingScreenBtnWrap: {
    alignItems: 'center',
  },

  OnboardingScreenBtn: {
    width: 285,
    height: 43,
    backgroundColor: '#000000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },

  OnboardingScreenBtnText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.32,
  },
});
