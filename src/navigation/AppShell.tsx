import React, {useEffect, useRef} from 'react';
import {
  Animated,
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
import {FadeSlideIn} from '../components/FadeSlideIn';
import {usePressScale} from '../hooks/usePressScale';
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

function TabBarButton({
  tab,
  isActive,
  onPress,
}: {
  tab: {name: AppTab; label: string; icon: string};
  isActive: boolean;
  onPress: () => void;
}) {
  const {scale, onPressIn, onPressOut} = usePressScale(0.9);
  const activeScale = useRef(new Animated.Value(isActive ? 1.12 : 1)).current;

  useEffect(() => {
    Animated.spring(activeScale, {
      toValue: isActive ? 1.12 : 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  }, [isActive, activeScale]);

  return (
    <TouchableOpacity
      style={styles.MainShellTab}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.7}>
      <Animated.View
        style={{transform: [{scale: Animated.multiply(scale, activeScale)}]}}>
        <Text style={styles.MainShellTabIcon}>{tab.icon}</Text>
      </Animated.View>
      <Text
        style={[
          styles.MainShellTabLabel,
          {color: isActive ? Colors.tabActive : Colors.tabInactive},
        ]}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
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
      <FadeSlideIn
        key={activeTab}
        style={styles.MainShellContent}
        duration={260}
        distance={12}>
        <TabContent />
      </FadeSlideIn>
      {hasOverlay && (
        <FadeSlideIn
          key={overlay.type}
          style={styles.MainShellOverlay}
          duration={300}
          distance={28}>
          <OverlayContent />
        </FadeSlideIn>
      )}
      {!hasOverlay && (
        <View style={styles.MainShellTabBar}>
          {TABS.map(tab => (
            <TabBarButton
              key={tab.name}
              tab={tab}
              isActive={tab.name === activeTab}
              onPress={() => selectTab(tab.name)}
            />
          ))}
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
