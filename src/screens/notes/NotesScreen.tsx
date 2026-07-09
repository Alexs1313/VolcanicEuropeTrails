import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {FadeSlideIn} from '../../components/FadeSlideIn';
import {NoteCard} from '../../components/NoteCard';
import {TRAVEL_NOTES} from '../../data/notes';
import {useAppNavigation} from '../../navigation/NavigationContext';
import {Colors} from '../../theme/colors';

export function NotesScreen() {
  const {openNoteDetail} = useAppNavigation();

  return (
    <View style={styles.NotesScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.NotesScreenContent}>
        <Text style={styles.NotesScreenTitle}>Travel Notes</Text>
        <View style={styles.NotesScreenDivider} />

        <View style={styles.NotesScreenCards}>
          {TRAVEL_NOTES.map((note, index) => (
            <FadeSlideIn key={note.id} delay={index * 60} duration={340}>
              <NoteCard note={note} onOpen={() => openNoteDetail(note)} />
            </FadeSlideIn>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  NotesScreenContainer: {flex: 1, backgroundColor: Colors.appBg},
  NotesScreenContent: {
    paddingTop: 60,
    paddingBottom: 24,
  },

  NotesScreenTitle: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  NotesScreenDivider: {
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 12,
  },
  NotesScreenCards: {
    paddingHorizontal: 14,
    gap: 12,
  },
});
