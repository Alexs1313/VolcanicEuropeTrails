import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker} from 'react-native-maps';

import {MAP_PIN} from '../../assets/trailImages';
import {PLACES} from '../../data/places';
import {useAppNavigation} from '../../navigation/NavigationContext';
import {Colors} from '../../theme/colors';
import type {Place} from '../../types';

const INITIAL_REGION = {
  latitude: 46,
  longitude: 12,
  latitudeDelta: 22,
  longitudeDelta: 30,
};

export function MapScreen() {
  const {openPlaceDetail} = useAppNavigation();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <View style={styles.MapScreenContainer}>
      <View style={styles.MapScreenHeader}>
        <Text style={styles.MapScreenTitle}>Interactive Map</Text>
      </View>

      <View style={styles.MapScreenMapWrap}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={INITIAL_REGION}
          onPress={() => setSelectedPlace(null)}>
          {PLACES.map(place => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.coordinates.lat,
                longitude: place.coordinates.lon,
              }}
              onPress={e => {
                e.stopPropagation();
                setSelectedPlace(place);
              }}>
              <Image source={MAP_PIN} style={styles.MapScreenPin} />
            </Marker>
          ))}
        </MapView>

        {selectedPlace !== null && (
          <View style={styles.MapScreenCardWrap} pointerEvents="box-none">
            <View style={styles.MapScreenCard}>
              <View style={styles.MapScreenCardImageWrap}>
                <Image
                  source={selectedPlace.image}
                  style={styles.MapScreenCardImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', Colors.cardBg]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.MapScreenCardImageGrad}
                />
              </View>
              <View style={styles.MapScreenCardContent}>
                <Text style={styles.MapScreenCardTitle} numberOfLines={1}>
                  {selectedPlace.title}
                </Text>
                <Text style={styles.MapScreenCardCountry}>
                  Country: {selectedPlace.country}
                </Text>
                <Text style={styles.MapScreenCardDesc} numberOfLines={2}>
                  {selectedPlace.shortDescription}
                </Text>
                <TouchableOpacity
                  style={styles.MapScreenCardOpenBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    const place = selectedPlace;
                    setSelectedPlace(null);
                    openPlaceDetail(place);
                  }}>
                  <Text style={styles.MapScreenCardOpenBtnText}>Open</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MapScreenContainer: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },
  MapScreenHeader: {
    backgroundColor: Colors.appBg,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  MapScreenTitle: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '500',
  },

  MapScreenPin: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  MapScreenMapWrap: {
    flex: 1,
  },
  MapScreenCardWrap: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
    elevation: 20,
  },

  MapScreenCard: {
    width: 365,
    height: 128,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  MapScreenCardImageWrap: {
    width: 161,
    height: 128,
    marginLeft: -30,
    flexShrink: 0,
  },
  MapScreenCardImage: {
    width: '100%',
    height: 128,
  },
  MapScreenCardImageGrad: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 161,
    height: 128,
  },
  MapScreenCardContent: {
    flex: 1,
    paddingTop: 9,
    paddingLeft: 13,
    paddingRight: 12,
    paddingBottom: 10,
  },

  MapScreenCardTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 5,
  },
  MapScreenCardCountry: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '400',
    marginBottom: 5,
  },
  MapScreenCardDesc: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
    flex: 1,
  },

  MapScreenCardOpenBtn: {
    alignSelf: 'flex-start',
    width: 92,
    height: 24,
    backgroundColor: Colors.chipActive,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    overflow: 'hidden',
  },
  MapScreenCardOpenBtnText: {
    color: Colors.textPrimary,
    fontSize: 10,
    fontWeight: '400',
  },
});
