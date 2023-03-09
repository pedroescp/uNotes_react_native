import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NoteCharge() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>asdasdasdasdasd</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.content}>sdasdasdasdasd</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#303030',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    fontSize: 16,
    color: '#303030',
  },
});
