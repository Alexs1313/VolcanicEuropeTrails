import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {Place, TravelNote} from '../types';
import type {AppOverlay, AppPhase, AppTab} from './types';

type NavigationContextValue = {
  phase: AppPhase;
  activeTab: AppTab;
  overlay: AppOverlay;
  finishLoader: (skipOnboarding: boolean) => void;
  finishOnboarding: () => void;
  selectTab: (tab: AppTab) => void;
  goBack: () => void;
  openPlaceDetail: (place: Place) => void;
  openNoteDetail: (note: TravelNote) => void;
  closeOverlay: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase, setPhase] = useState<AppPhase>('Loader');
  const [activeTab, setActiveTab] = useState<AppTab>('PlacesTab');
  const [overlay, setOverlay] = useState<AppOverlay>({type: 'none'});

  const finishLoader = useCallback((skipOnboarding: boolean) => {
    setPhase(skipOnboarding ? 'Main' : 'Onboarding');
  }, []);

  const finishOnboarding = useCallback(() => {
    setPhase('Main');
  }, []);

  const selectTab = useCallback((tab: AppTab) => {
    setActiveTab(tab);
    setOverlay({type: 'none'});
  }, []);

  const goBack = useCallback(() => {
    setOverlay({type: 'none'});
  }, []);

  const openPlaceDetail = useCallback((place: Place) => {
    setOverlay({type: 'PlaceDetail', place});
  }, []);

  const openNoteDetail = useCallback((note: TravelNote) => {
    setOverlay({type: 'NoteDetail', note});
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay({type: 'none'});
  }, []);

  const value = useMemo(
    () => ({
      phase,
      activeTab,
      overlay,
      finishLoader,
      finishOnboarding,
      selectTab,
      goBack,
      openPlaceDetail,
      openNoteDetail,
      closeOverlay,
    }),
    [
      phase,
      activeTab,
      overlay,
      finishLoader,
      finishOnboarding,
      selectTab,
      goBack,
      openPlaceDetail,
      openNoteDetail,
      closeOverlay,
    ],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
}
