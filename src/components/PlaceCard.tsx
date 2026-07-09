import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ICON_SAVE, ICON_SAVED} from '../assets/trailImages';
import {usePressScale} from '../hooks/usePressScale';
import {Colors} from '../theme/colors';
import type {Place} from '../types';

interface Props {
  place: Place;
  isSaved: boolean;
  onPress: () => void;
  onToggleSave: () => void;
}

export function PlaceCard({place, isSaved, onPress, onToggleSave}: Props) {
  const {scale, onPressIn, onPressOut} = usePressScale(0.97);

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <TouchableOpacity
        style={styles.PlaceCardContainer}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.8}>
        <View style={styles.PlaceCardImageWrap}>
          <Image
            source={place.image}
            style={styles.PlaceCardImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', Colors.cardBg]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.PlaceCardImageGrad}
          />
        </View>

        <View style={styles.PlaceCardContent}>
          <Text style={styles.PlaceCardTitle} numberOfLines={1}>
            {place.title}
          </Text>
          <Text style={styles.PlaceCardCountry}>Country: {place.country}</Text>
          <Text style={styles.PlaceCardDesc} numberOfLines={3}>
            {place.shortDescription}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.PlaceCardBookmark}
          onPress={onToggleSave}
          hitSlop={{top: 8, right: 8, bottom: 8, left: 8}}>
          <Image
            source={isSaved ? ICON_SAVED : ICON_SAVE}
            style={styles.PlaceCardBookmarkIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  PlaceCardContainer: {
    height: 109,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  PlaceCardImageWrap: {
    width: 161,
    height: 109,
  },
  PlaceCardImage: {
    width: '100%',
    height: '100%',
  },
  PlaceCardImageGrad: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 161,
    height: 109,
  },
  PlaceCardContent: {
    flex: 1,
    paddingTop: 9,
    paddingLeft: 5,
    paddingRight: 28,
  },
  PlaceCardTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 5,
  },

  PlaceCardCountry: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '400',
    marginBottom: 6,
  },
  PlaceCardDesc: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
  },
  PlaceCardBookmark: {
    position: 'absolute',
    right: 13,
    top: 9,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  PlaceCardBookmarkIcon: {
    width: 18,
    height: 18,
  },
});
