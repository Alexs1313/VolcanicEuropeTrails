import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {AnimatedScreen} from '../../components/AnimatedScreen';
import {NoteCard} from '../../components/NoteCard';
import {TRAVEL_NOTES} from '../../data/notes';
import {useAppNavigation} from '../../navigation/NavigationContext';
import {Colors} from '../../theme/colors';

export function NotesScreen() {
  const {openNoteDetail} = useAppNavigation();

  return (
    <AnimatedScreen style={styles.NotesScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.NotesScreenContent}>
        <Text style={styles.NotesScreenTitle}>Travel Notes</Text>
        <View style={styles.NotesScreenDivider} />

        <View style={styles.NotesScreenCards}>
          {TRAVEL_NOTES.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={() => openNoteDetail(note)}
            />
          ))}
        </View>
      </ScrollView>
    </AnimatedScreen>
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
