import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {AnimatedScreen} from '../../components/AnimatedScreen';
import {TipCard} from '../../components/TipCard';
import {SAFETY_TIPS} from '../../data/tips';

import {Colors} from '../../theme/colors';

export function TipsScreen() {
  return (
    <AnimatedScreen style={styles.TipsScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.TipsScreenContent}>
        <Text style={styles.TipsScreenTitle}>Safety Tips</Text>
        <View style={styles.TipsScreenDivider} />

        <View style={styles.TipsScreenCards}>
          {SAFETY_TIPS.map(tip => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </View>
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  TipsScreenContainer: {flex: 1, backgroundColor: Colors.appBg},
  TipsScreenContent: {
    paddingTop: 60,
    paddingBottom: 24,
  },

  TipsScreenTitle: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  TipsScreenDivider: {
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 12,
  },
  TipsScreenCards: {
    paddingHorizontal: 14,
    gap: 12,
  },
});
