import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {SAVED_EMPTY_IMAGE} from '../../assets/trailImages';

import {FadeSlideIn} from '../../components/FadeSlideIn';
import {PlaceCard} from '../../components/PlaceCard';
import {PLACES} from '../../data/places';
import {usePressScale} from '../../hooks/usePressScale';
import {useAppNavigation} from '../../navigation/NavigationContext';
import {Storage} from '../../storage/storage';

import {Colors} from '../../theme/colors';

export function SavedScreen() {
  const {openPlaceDetail, overlay, selectTab} = useAppNavigation();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const {scale, onPressIn, onPressOut} = usePressScale(0.96);

  useEffect(() => {
    Storage.getSavedPlaceIds().then(setSavedIds);
  }, [overlay]);

  const savedPlaces = PLACES.filter(p => savedIds.includes(p.id));

  return (
    <View style={styles.SavedScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.SavedScreenContent}>
        <Text style={styles.SavedScreenTitle}>Saved Spots</Text>
        <View style={styles.SavedScreenDivider} />

        {savedPlaces.length === 0 ? (
          <FadeSlideIn style={styles.SavedScreenEmpty} duration={420}>
            <Image
              source={SAVED_EMPTY_IMAGE}
              style={styles.SavedScreenEmptyImage}
              resizeMode="contain"
            />
            <Text style={styles.SavedScreenEmptyTitle}>No Saved Spots Yet</Text>
            <Text style={styles.SavedScreenEmptySubtitle}>
              Your favorite places, mountain viewpoints, and scenic spots
              will appear here once you save them.
            </Text>
            <TouchableOpacity
              onPress={() => selectTab('PlacesTab')}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              activeOpacity={0.85}>
              <Animated.View style={{transform: [{scale}]}}>
                <LinearGradient
                  colors={['#930000', '#EA0201', '#FA3502', '#FB8300', '#FDC301']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.SavedScreenExploreBtn}>
                  <Text style={styles.SavedScreenExploreBtnText}>
                    Explore Places
                  </Text>
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          </FadeSlideIn>
        ) : (
          <View style={styles.SavedScreenCards}>
            {savedPlaces.map((place, index) => (
              <FadeSlideIn key={place.id} delay={index * 60} duration={340}>
                <PlaceCard
                  place={place}
                  isSaved={true}
                  onPress={() => openPlaceDetail(place)}
                  onToggleSave={async () => {
                    await Storage.removePlaceId(place.id);
                    setSavedIds(prev => prev.filter(i => i !== place.id));
                  }}
                />
              </FadeSlideIn>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SavedScreenContainer: {flex: 1, backgroundColor: Colors.appBg},
  SavedScreenContent: {
    paddingTop: 60,
    paddingBottom: 24,
    flexGrow: 1,
  },
  SavedScreenTitle: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  SavedScreenDivider: {
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 12,
  },

  SavedScreenEmpty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 55,
  },
  SavedScreenEmptyImage: {
    width: 222,
    height: 253,
    marginBottom: 50,
    marginTop: 20,
  },
  SavedScreenEmptyTitle: {
    color: '#d2d2d2',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 8,
  },

  SavedScreenEmptySubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 32,
    letterSpacing: -0.32,
  },
  SavedScreenExploreBtn: {
    width: 283,
    height: 58,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  SavedScreenExploreBtnText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  SavedScreenCards: {
    paddingHorizontal: 14,
    gap: 15,
  },
});
