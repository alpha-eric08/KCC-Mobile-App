import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { Play, Clock, Heart, Eye } from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { sermons } from "@/mocks/sermons";
import { router } from "expo-router";

export default function SermonsScreen() {
  const renderSermonItem = ({ item }) => (
    <TouchableOpacity style={styles.sermonCard}
     onPress={() => router.push(`/sermon/${item.id}`)}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: item.thumbnailUrl }} 
          style={styles.thumbnail} 
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Play size={24} color={colors.white} fill={colors.white} />
        </View>
      </View>
      <View style={styles.sermonInfo}>
        <Text style={styles.sermonTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.preacher}>{item.preacher}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.secondaryText} />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Eye size={14} color={theme.secondaryText} />
            <Text style={styles.metaText}>{item.views}</Text>
          </View>
          <View style={styles.metaItem}>
            <Heart size={14} color={theme.secondaryText} />
            <Text style={styles.metaText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sermons}
        renderItem={renderSermonItem}
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
  sermonCard: {
    backgroundColor: theme.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnailContainer: {
    width: 120,
    height: 120,
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  sermonInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  sermonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  preacher: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: theme.secondaryText,
  },
});