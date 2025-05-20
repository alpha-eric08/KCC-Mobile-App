import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";

import { events } from "@/mocks/events";
import { theme, colors } from "@/constants/colors";

export default function EventsScreen() {
  const router = useRouter();

  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.eventImage} 
        resizeMode="cover"
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventMeta}>
          <Calendar size={16} color={theme.primaryText} />
          <Text style={styles.eventDate}>{item.date} • {item.time}</Text>
        </View>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: theme.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 180,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 6,
  },
  eventDate: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  eventLocation: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
  },
});