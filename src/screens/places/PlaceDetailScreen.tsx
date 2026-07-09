import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ICON_SAVE, ICON_SAVED, ICON_SHARE} from '../../assets/trailImages';
import {usePressScale} from '../../hooks/usePressScale';
import {useAppNavigation} from '../../navigation/NavigationContext';
import {Storage} from '../../storage/storage';
import {Colors} from '../../theme/colors';

export function PlaceDetailScreen() {
  const {overlay, goBack, selectTab} = useAppNavigation();
  const [isSaved, setIsSaved] = useState(false);
  const backScale = usePressScale(0.88);
  const shareScale = usePressScale(0.88);
  const saveScale = usePressScale(0.85);
  const mapBtnScale = usePressScale(0.97);

  useEffect(() => {
    if (overlay.type !== 'PlaceDetail') {
      return;
    }
    Storage.isPlaceSaved(overlay.place.id).then(setIsSaved);
  }, [overlay]);

  if (overlay.type !== 'PlaceDetail') {
    return null;
  }

  const {place} = overlay;

  const handleShare = () => {
    Share.share({
      title: place.title,
      message: `${place.title}\n${place.country}, ${place.region}\n\n${place.shortDescription}\n\nAddress: ${place.address}\nCoordinates: ${place.coordinates.lat}, ${place.coordinates.lon}`,
    });
  };

  const toggleSave = async () => {
    if (isSaved) {
      await Storage.removePlaceId(place.id);
      setIsSaved(false);
    } else {
      await Storage.savePlaceId(place.id);
      setIsSaved(true);
    }
  };

  return (
    <View style={styles.PlaceDetailScreenContainer}>
      <ScrollView
        bounces={false}
        style={styles.PlaceDetailScreenScroll}
        contentContainerStyle={styles.PlaceDetailScreenScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.PlaceDetailScreenHeaderRow}>
          <TouchableOpacity
            onPress={goBack}
            onPressIn={backScale.onPressIn}
            onPressOut={backScale.onPressOut}>
            <Animated.View
              style={[
                styles.PlaceDetailScreenCircleBtn,
                {transform: [{scale: backScale.scale}]},
              ]}>
              <Text style={styles.PlaceDetailScreenCircleBtnText}>←</Text>
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.PlaceDetailScreenHeaderRight}>
            <TouchableOpacity
              onPress={handleShare}
              onPressIn={shareScale.onPressIn}
              onPressOut={shareScale.onPressOut}>
              <Animated.View
                style={[
                  styles.PlaceDetailScreenCircleBtn,
                  {transform: [{scale: shareScale.scale}]},
                ]}>
                <Image
                  source={ICON_SHARE}
                  style={styles.PlaceDetailScreenBtnIcon}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleSave}
              onPressIn={saveScale.onPressIn}
              onPressOut={saveScale.onPressOut}>
              <Animated.View
                style={[
                  styles.PlaceDetailScreenCircleBtn,
                  {transform: [{scale: saveScale.scale}]},
                ]}>
                <Image
                  source={isSaved ? ICON_SAVED : ICON_SAVE}
                  style={styles.PlaceDetailScreenBtnIcon}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.PlaceDetailScreenHero}>
          <Image
            source={place.image}
            style={styles.PlaceDetailScreenHeroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', Colors.appBg]}
            style={styles.PlaceDetailScreenHeroGrad}
          />
        </View>
        <View style={styles.PlaceDetailScreenContent}>
          <Text style={styles.PlaceDetailScreenName}>{place.title}</Text>
          <Text style={styles.PlaceDetailScreenShort}>
            {place.shortDescription}
          </Text>
          <Text style={styles.PlaceDetailScreenBody}>
            {place.fullDescription}
          </Text>
          <View style={styles.PlaceDetailScreenInfoCard}>
            <Text style={styles.PlaceDetailScreenInfoText}>
              {'Country: '}
              {place.country}
              {'\n'}
              {'City: '}
              {place.region}
              {'\n'}
              {'Address: '}
              {place.address}
              {'\n'}
              {'Coordinates: '}
              {place.coordinates.lat.toFixed(4)},{' '}
              {place.coordinates.lon.toFixed(4)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              goBack();
              selectTab('MapTab');
            }}
            onPressIn={mapBtnScale.onPressIn}
            onPressOut={mapBtnScale.onPressOut}
            activeOpacity={0.85}>
            <Animated.View style={{transform: [{scale: mapBtnScale.scale}]}}>
              <LinearGradient
                colors={['#930000', '#EA0201', '#FA3502', '#FB8300', '#FDC301']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.PlaceDetailScreenMapBtn}>
                <Text style={styles.PlaceDetailScreenMapBtnText}>
                  View on Map
                </Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PlaceDetailScreenContainer: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },
  PlaceDetailScreenHeaderRow: {
    position: 'absolute',
    top: 63,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  PlaceDetailScreenHeaderRight: {
    flexDirection: 'row',
    gap: 10,
  },

  PlaceDetailScreenCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  PlaceDetailScreenCircleBtnText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  PlaceDetailScreenBtnIcon: {
    width: 20,
    height: 20,
  },
  PlaceDetailScreenScroll: {
    flex: 1,
  },
  PlaceDetailScreenScrollContent: {
    paddingBottom: 40,
  },
  PlaceDetailScreenHero: {
    width: '100%',
    height: 264,
  },
  PlaceDetailScreenHeroImage: {
    width: '100%',
    height: '100%',
  },
  PlaceDetailScreenHeroGrad: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
  },

  PlaceDetailScreenContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  PlaceDetailScreenName: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 37,
    letterSpacing: -0.32,
    marginBottom: 14,
  },
  PlaceDetailScreenShort: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 17,
    letterSpacing: -0.32,
    marginBottom: 22,
  },

  PlaceDetailScreenBody: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.32,
    marginBottom: 20,
  },
  PlaceDetailScreenInfoCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  PlaceDetailScreenInfoText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 18,
  },

  PlaceDetailScreenMapBtn: {
    height: 47,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PlaceDetailScreenMapBtnText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
