import React from 'react';
import {
  Animated,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ICON_SHARE} from '../assets/trailImages';
import {usePressScale} from '../hooks/usePressScale';
import {Colors} from '../theme/colors';
import type {SafetyTip} from '../types';

interface Props {
  tip: SafetyTip;
}

export function TipCard({tip}: Props) {
  const {scale, onPressIn, onPressOut} = usePressScale(0.85);

  const handleShare = () => {
    Share.share({
      title: tip.title,
      message: `${tip.title}\n\n${tip.fullText}`,
    });
  };

  return (
    <View style={styles.TipCardContainer}>
      <View style={styles.TipCardHeader}>
        <Text style={styles.TipCardTitle} numberOfLines={2}>
          {tip.title}
        </Text>
        <TouchableOpacity
          onPress={handleShare}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.7}
          hitSlop={{top: 8, right: 8, bottom: 8, left: 8}}>
          <Animated.View style={{transform: [{scale}]}}>
            <Image source={ICON_SHARE} style={styles.TipCardShareIcon} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Text style={styles.TipCardBody} numberOfLines={6}>
        {tip.fullText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  TipCardContainer: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    minHeight: 128,
  },

  TipCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },

  TipCardTitle: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
    lineHeight: 18,
  },
  TipCardShareIcon: {
    width: 18,
    height: 18,
    marginTop: 1,
  },

  TipCardBody: {
    color: Colors.textTips,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 15,
  },
});
