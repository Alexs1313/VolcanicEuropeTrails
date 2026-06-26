import React, {useEffect} from 'react';
import {
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// screens
import {LoaderScreen} from '../screens/LoaderScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PlacesScreen} from '../screens/places/PlacesScreen';
import {PlaceDetailScreen} from '../screens/places/PlaceDetailScreen';
import {MapScreen} from '../screens/map/MapScreen';
import {SavedScreen} from '../screens/saved/SavedScreen';
import {NotesScreen} from '../screens/notes/NotesScreen';
import {NoteDetailScreen} from '../screens/notes/NoteDetailScreen';
import {TipsScreen} from '../screens/tips/TipsScreen';

//  context and types
import {Colors} from '../theme/colors';
import {useAppNavigation} from './NavigationContext';
import type {AppTab} from './types';

const TABS: {name: AppTab; label: string; icon: string}[] = [
  {name: 'PlacesTab', label: 'Places', icon: '📍'},
  {name: 'MapTab', label: 'Map', icon: '🗺'},
  {name: 'SavedTab', label: 'Saved', icon: '🔖'},
  {name: 'NotesTab', label: 'Notes', icon: '📖'},
  {name: 'TipsTab', label: 'Tips', icon: '⚠️'},
];

function TabContent() {
  const {activeTab} = useAppNavigation();
  switch (activeTab) {
    case 'PlacesTab':
      return <PlacesScreen />;
    case 'MapTab':
      return <MapScreen />;
    case 'SavedTab':
      return <SavedScreen />;
    case 'NotesTab':
      return <NotesScreen />;
    case 'TipsTab':
      return <TipsScreen />;
    default:
      return <PlacesScreen />;
  }
}

function OverlayContent() {
  const {overlay} = useAppNavigation();
  switch (overlay.type) {
    case 'PlaceDetail':
      return <PlaceDetailScreen />;
    case 'NoteDetail':
      return <NoteDetailScreen />;
    default:
      return null;
  }
}

function MainShell() {
  const {activeTab, overlay, selectTab, goBack} = useAppNavigation();
  const hasOverlay = overlay.type !== 'none';

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (hasOverlay) {
        goBack();
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, [hasOverlay, goBack]);

  return (
    <View style={styles.MainShellRoot}>
      <View style={styles.MainShellContent}>
        <TabContent />
      </View>
      {hasOverlay && (
        <View style={styles.MainShellOverlay}>
          <OverlayContent />
        </View>
      )}
      {!hasOverlay && (
        <View style={styles.MainShellTabBar}>
          {TABS.map(tab => {
            const isActive = tab.name === activeTab;
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.MainShellTab}
                onPress={() => selectTab(tab.name)}
                activeOpacity={0.7}>
                <Text style={styles.MainShellTabIcon}>{tab.icon}</Text>
                <Text
                  style={[
                    styles.MainShellTabLabel,
                    {color: isActive ? Colors.tabActive : Colors.tabInactive},
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

export function AppShell() {
  const {phase, finishLoader, finishOnboarding} = useAppNavigation();
  if (phase === 'Loader') {
    return <LoaderScreen onFinish={finishLoader} />;
  }
  if (phase === 'Onboarding') {
    return <OnboardingScreen onFinish={finishOnboarding} />;
  }
  return <MainShell />;
}

const styles = StyleSheet.create({
  MainShellRoot: {flex: 1, backgroundColor: Colors.appBg},
  MainShellContent: {flex: 1},
  MainShellOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.appBg,
  },
  MainShellTabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.tabBarBg,
    paddingBottom: Platform.OS === 'ios' ? 20 : 6,
    paddingTop: 6,
    height: Platform.OS === 'ios' ? 82 : 62,
  },
  MainShellTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  MainShellTabIcon: {fontSize: 20},
  MainShellTabLabel: {fontSize: 10, fontWeight: '400'},
});
