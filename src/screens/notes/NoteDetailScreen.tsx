import React from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ICON_SHARE} from '../../assets/trailImages';
import {AnimatedScreen} from '../../components/AnimatedScreen';
import {useAppNavigation} from '../../navigation/NavigationContext';
import {Colors} from '../../theme/colors';

export function NoteDetailScreen() {
  const {overlay, goBack} = useAppNavigation();

  if (overlay.type !== 'NoteDetail') {
    return null;
  }

  const {note} = overlay;

  const handleShare = () => {
    Share.share({
      title: note.title,
      message: `${note.title}\n\n${note.shortText}\n\n${note.fullText}`,
    });
  };

  return (
    <AnimatedScreen style={styles.NoteDetailScreenContainer}>
      <ScrollView
        bounces={false}
        style={styles.NoteDetailScreenScroll}
        contentContainerStyle={styles.NoteDetailScreenScrollContent}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.NoteDetailScreenBackBtn}
          onPress={goBack}>
          <Text style={styles.NoteDetailScreenBtnText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.NoteDetailScreenShareBtn}
          onPress={handleShare}>
          <Image source={ICON_SHARE} style={styles.NoteDetailScreenShareIcon} />
        </TouchableOpacity>

        <View style={styles.NoteDetailScreenHero}>
          <Image
            source={note.image}
            style={styles.NoteDetailScreenHeroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', Colors.appBg]}
            style={styles.NoteDetailScreenHeroGradBottom}
          />
          <View style={styles.NoteDetailScreenHeroTitleWrap}>
            <Text style={styles.NoteDetailScreenTitle}>{note.title}</Text>
          </View>
        </View>

        <View style={styles.NoteDetailScreenContent}>
          <Text style={styles.NoteDetailScreenAccent}>{note.shortText}</Text>
          <Text style={styles.NoteDetailScreenBody}>{note.fullText}</Text>
        </View>
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  NoteDetailScreenContainer: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },

  NoteDetailScreenBackBtn: {
    position: 'absolute',
    top: 63,
    left: 24,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  NoteDetailScreenShareBtn: {
    position: 'absolute',
    top: 63,
    right: 24,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  NoteDetailScreenShareIcon: {
    width: 20,
    height: 20,
  },
  NoteDetailScreenBtnText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  NoteDetailScreenScroll: {
    flex: 1,
  },
  NoteDetailScreenScrollContent: {
    paddingBottom: 40,
  },
  NoteDetailScreenHero: {
    width: '100%',
    height: 264,
  },
  NoteDetailScreenHeroImage: {
    width: '100%',
    height: '100%',
  },
  NoteDetailScreenHeroGradBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
  },

  NoteDetailScreenHeroTitleWrap: {
    position: 'absolute',
    bottom: 14,
    left: 24,
    right: 24,
  },

  NoteDetailScreenTitle: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 37,
    letterSpacing: -0.32,
  },
  NoteDetailScreenContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  NoteDetailScreenAccent: {
    color: Colors.textNoteAccent,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 17,
    letterSpacing: -0.32,
    marginBottom: 20,
  },
  NoteDetailScreenBody: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 20,
  },
});
