import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {PlaceCard} from '../../components/PlaceCard';
import {PLACES} from '../../data/places';
import {useAppNavigation} from '../../navigation/NavigationContext';
import {Storage} from '../../storage/storage';

import {Colors} from '../../theme/colors';

import type {PlaceCategory} from '../../types';

const CATEGORIES: {key: PlaceCategory; label: string; width: number}[] = [
  {key: 'VolcanoIcons', label: 'Active Sites', width: 124},
  {key: 'CraterLands', label: 'Crater Lands', width: 113},
  {key: 'HighPeaks', label: 'High Peaks', width: 104},
  {key: 'ScenicCliffs', label: 'Scenic Cliffs', width: 120},
];

export function PlacesScreen() {
  const {openPlaceDetail} = useAppNavigation();
  const [activeCategory, setActiveCategory] =
    useState<PlaceCategory>('VolcanoIcons');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    Storage.getSavedPlaceIds().then(setSavedIds);
  }, []);

  const toggleSave = useCallback(
    async (id: string) => {
      if (savedIds.includes(id)) {
        await Storage.removePlaceId(id);
        setSavedIds(prev => prev.filter(i => i !== id));
      } else {
        await Storage.savePlaceId(id);
        setSavedIds(prev => [...prev, id]);
      }
    },
    [savedIds],
  );

  const filtered = PLACES.filter(p => p.category === activeCategory);

  return (
    <View style={styles.PlacesScreenContainer}>
      <ScrollView
        style={styles.PlacesScreenScroll}
        contentContainerStyle={styles.PlacesScreenScrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.PlacesScreenTitle}>Volcano Places</Text>
        <View style={styles.PlacesScreenDivider} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.PlacesScreenChipBar}
          contentContainerStyle={styles.PlacesScreenChipBarContent}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.PlacesScreenChip,
                  {width: cat.width},
                  isActive && styles.PlacesScreenChipActive,
                ]}
                onPress={() => setActiveCategory(cat.key)}
                activeOpacity={0.8}>
                <Text
                  style={[
                    styles.PlacesScreenChipLabel,
                    isActive && styles.PlacesScreenChipLabelActive,
                  ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.PlacesScreenCards}>
          {filtered.map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              isSaved={savedIds.includes(place.id)}
              onPress={() => openPlaceDetail(place)}
              onToggleSave={() => toggleSave(place.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PlacesScreenContainer: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },
  PlacesScreenScroll: {
    flex: 1,
  },
  PlacesScreenScrollContent: {
    paddingTop: 60,
    paddingBottom: 24,
  },

  PlacesScreenTitle: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  PlacesScreenDivider: {
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 10,
  },
  PlacesScreenChipBar: {
    flexGrow: 0,
    marginBottom: 16,
  },
  PlacesScreenChipBarContent: {
    paddingLeft: 14,
    gap: 8,
    paddingRight: 14,
  },

  PlacesScreenChip: {
    height: 31,
    borderRadius: 20,
    backgroundColor: Colors.chipInactive,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  PlacesScreenChipActive: {
    backgroundColor: Colors.chipActive,
  },
  PlacesScreenChipLabel: {
    color: '#878787',
    fontSize: 14,
    fontWeight: '400',
  },
  PlacesScreenChipLabelActive: {
    color: Colors.textPrimary,
  },

  PlacesScreenCards: {
    paddingHorizontal: 14,
    gap: 15,
  },
});
