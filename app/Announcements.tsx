import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

const announcements = [
  {
    id: '1',
    title: 'Youth Revival Service',
    date: 'May 24, 2025',
    description: 'Join us for a powerful youth revival service at 5 PM. Don’t miss out on the blessings!',
  },
  {
    id: '2',
    title: 'Sunday School Picnic',
    date: 'May 26, 2025',
    description: 'All Sunday School children and parents are invited to a picnic at the church park from 9 AM.',
  },
  {
    id: '3',
    title: 'Tithes & Offering via Mobile Money',
    date: 'Ongoing',
    description: 'You can now give your tithes and offerings via MoMo. Dial *123# and follow the prompt.',
  },
  {
    id: '2',
    title: 'Sunday School Picnic',
    date: 'May 26, 2025',
    description: 'All Sunday School children and parents are invited to a picnic at the church park from 9 AM.',
  },
  {
    id: '3',
    title: 'Tithes & Offering via Mobile Money',
    date: 'Ongoing',
    description: 'You can now give your tithes and offerings via MoMo. Dial *123# and follow the prompt.',
  },
];

export default function AnnouncementScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.announcementCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Church Announcements</Text>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e40af',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
});
