import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ONBOARDING_IMAGES, QUIZ_INTRO_IMAGE} from '../assets/trailImages';
import {Storage} from '../storage/storage';
import {AnimatedScreen} from '../components/AnimatedScreen';
import {Colors} from '../theme/colors';

const PAGES = [
  {
    image: ONBOARDING_IMAGES[0],
    layout: {width: 320, height: 303},
    title: 'Discover Fiery Europe',
    subtitle:
      'Explore mountain peaks, volcanic trails, and dramatic natural landmarks across Europe.',
    button: 'Start Exploring',
  },
  {
    image: ONBOARDING_IMAGES[1],
    layout: {width: 184, height: 334},
    title: 'Follow Scenic Trails',
    subtitle:
      'Find trails through cliffs, craters, ridges, lakes, and panoramic mountain viewpoints.',
    button: 'View Trails',
  },
  {
    image: ONBOARDING_IMAGES[2],
    layout: {width: 315, height: 335},
    title: 'Explore Fiery Spots',
    subtitle:
      'Open detailed cards with descriptions, coordinates, and useful travel information.',
    button: 'Open Places',
  },
  {
    image: ONBOARDING_IMAGES[3],
    layout: {width: 332, height: 276},
    title: 'Save Future Trips',
    subtitle:
      'Keep your favorite peaks and volcanic landscapes ready for your next journey.',
    button: 'Save Places',
  },
  {
    image: QUIZ_INTRO_IMAGE,
    layout: {width: 280, height: 248},
    title: 'Test the Volcanic Trail',
    subtitle:
      'Answer quiz questions about Europe’s volcanoes, mountain peaks, crater lands, scenic routes, maps, and travel safety.',
    button: 'Start Quiz',
  },
  {
    image: ONBOARDING_IMAGES[4],
    layout: {width: 350, height: 288},
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
          style={styles.OnboardingScreenSkipBtn}
          onPress={complete}>
          <Text style={styles.OnboardingScreenSkipText}>Skip</Text>
          <Text style={styles.OnboardingScreenSkipArrow}> ›</Text>
        </TouchableOpacity>
      </View>

      <AnimatedScreen key={page} distance={24}>
        <View style={styles.OnboardingScreenImageWrap}>
          <Image
            source={current.image}
            style={{width: current.layout.width, height: current.layout.height}}
            resizeMode="contain"
          />
        </View>

        <View style={styles.OnboardingScreenCardWrap}>
          <View style={styles.OnboardingScreenCard}>
            <Text style={styles.OnboardingScreenCardTitle}>
              {current.title}
            </Text>
            <Text style={styles.OnboardingScreenCardSubtitle}>
              {current.subtitle}
            </Text>
          </View>
        </View>

        <View style={styles.OnboardingScreenBtnWrap}>
          <TouchableOpacity
            style={styles.OnboardingScreenBtn}
            onPress={next}
            activeOpacity={0.85}>
            <Text style={styles.OnboardingScreenBtnText}>{current.button}</Text>
          </TouchableOpacity>
        </View>
      </AnimatedScreen>
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
