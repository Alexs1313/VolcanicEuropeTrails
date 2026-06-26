import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ONBOARDING_DONE: 'onboarding_done',
  SAVED_PLACE_IDS: 'saved_place_ids',
};

export const Storage = {
  async isOnboardingDone(): Promise<boolean> {
    try {
      const val = await AsyncStorage.getItem(KEYS.ONBOARDING_DONE);
      return val === 'true';
    } catch {
      return false;
    }
  },

  async setOnboardingDone(): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_DONE, 'true');
  },

  async getSavedPlaceIds(): Promise<string[]> {
    try {
      const raw = await AsyncStorage.getItem(KEYS.SAVED_PLACE_IDS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  async savePlaceId(id: string): Promise<void> {
    const existing = await Storage.getSavedPlaceIds();
    if (!existing.includes(id)) {
      existing.push(id);
      await AsyncStorage.setItem(KEYS.SAVED_PLACE_IDS, JSON.stringify(existing));
    }
  },

  async removePlaceId(id: string): Promise<void> {
    const existing = await Storage.getSavedPlaceIds();
    await AsyncStorage.setItem(
      KEYS.SAVED_PLACE_IDS,
      JSON.stringify(existing.filter(i => i !== id)),
    );
  },

  async isPlaceSaved(id: string): Promise<boolean> {
    const ids = await Storage.getSavedPlaceIds();
    return ids.includes(id);
  },
};
