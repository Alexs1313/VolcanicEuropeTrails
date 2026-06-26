import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '../theme/colors';
import type {TravelNote} from '../types';

interface Props {
  note: TravelNote;
  onOpen: () => void;
}

export function NoteCard({note, onOpen}: Props) {
  return (
    <View style={styles.NoteCardContainer}>
      <View style={styles.NoteCardImageWrap}>
        <Image
          source={note.image}
          style={styles.NoteCardImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', Colors.cardBg]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.NoteCardImageGrad}
        />
      </View>
      <View style={styles.NoteCardContent}>
        <Text style={styles.NoteCardTitle} numberOfLines={2}>
          {note.title}
        </Text>
        <Text style={styles.NoteCardShort} numberOfLines={3}>
          {note.shortText}
        </Text>
        <TouchableOpacity
          style={styles.NoteCardOpenBtn}
          onPress={onOpen}
          activeOpacity={0.8}>
          <Text style={styles.NoteCardOpenBtnText}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  NoteCardContainer: {
    height: 128,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  NoteCardImageWrap: {
    width: 161,
    height: 128,
    marginLeft: -30,
    flexShrink: 0,
  },

  NoteCardImage: {
    width: '100%',
    height: 128,
  },
  NoteCardImageGrad: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 161,
    height: 128,
  },
  NoteCardContent: {
    flex: 1,
    paddingTop: 17,
    paddingLeft: 13,
    paddingRight: 14,
    paddingBottom: 14,
  },

  NoteCardTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  NoteCardShort: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '400',
    flex: 1,
    lineHeight: 14,
  },

  NoteCardOpenBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.chipActive,
    borderRadius: 20,
    width: 92,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 6,
  },
  NoteCardOpenBtnText: {
    color: Colors.textPrimary,
    fontSize: 10,
    fontWeight: '400',
  },
});
