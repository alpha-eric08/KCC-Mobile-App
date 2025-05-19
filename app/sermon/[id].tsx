import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Share, Platform } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Heart, MessageSquare, Share2, Download, BookmarkPlus, Clock, Eye, ArrowLeft } from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { sermons } from "@/mocks/sermons";
import { Sermon } from "@/types";

export default function SermonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const foundSermon = sermons.find(s => s.id === id);
    if (foundSermon) {
      setSermon(foundSermon);
    }
  }, [id]);

  const handleShare = async () => {
    if (sermon) {
      try {
        await Share.share({
          message: `Check out this sermon: ${sermon.title} by ${sermon.preacher}`,
          url: sermon.videoUrl, // This will be ignored on Android
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (!sermon) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading sermon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.white} />
            </TouchableOpacity>
          )
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.videoContainer}>
          <Image 
            source={{ uri: sermon.thumbnailUrl }} 
            style={styles.thumbnail} 
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <View style={styles.playIcon}>
              {isPlaying ? (
                <View style={styles.pauseIcon}>
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </View>
              ) : (
                <View style={styles.triangleIcon} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{sermon.title}</Text>
          <Text style={styles.preacher}>{sermon.preacher}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={16} color={theme.secondaryText} />
              <Text style={styles.metaText}>{sermon.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Eye size={16} color={theme.secondaryText} />
              <Text style={styles.metaText}>{sermon.views} views</Text>
            </View>
            <Text style={styles.metaText}>{sermon.date}</Text>
          </View>

          <View style={styles.actionBar}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Heart 
                size={24} 
                color={isLiked ? colors.red : theme.secondaryText} 
                fill={isLiked ? colors.red : "none"} 
              />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push("/sermon-notes")}
            >
              <MessageSquare size={24} color={theme.secondaryText} />
              <Text style={styles.actionText}>Notes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={24} color={theme.secondaryText} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsBookmarked(!isBookmarked)}
            >
              <BookmarkPlus 
                size={24} 
                color={isBookmarked ? theme.primaryText : theme.secondaryText} 
                fill={isBookmarked ? theme.primaryText : "none"} 
              />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
            
            {Platform.OS !== "web" && (
              <TouchableOpacity style={styles.actionButton}>
                <Download size={24} color={theme.secondaryText} />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About this sermon</Text>
            <Text style={styles.description}>{sermon.description}</Text>
          </View>

          <View style={styles.tagsContainer}>
            {sermon.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.relatedContainer}>
            <Text style={styles.relatedTitle}>Related Sermons</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedList}
            >
              {sermons.filter(s => s.id !== sermon.id).slice(0, 5).map((relatedSermon) => (
                <TouchableOpacity 
                  key={relatedSermon.id}
                  style={styles.relatedItem}
                  onPress={() => router.push(`/sermon/${relatedSermon.id}`)}
                >
                  <Image 
                    source={{ uri: relatedSermon.thumbnailUrl }} 
                    style={styles.relatedThumbnail} 
                    resizeMode="cover"
                  />
                  <Text style={styles.relatedItemTitle} numberOfLines={2}>
                    {relatedSermon.title}
                  </Text>
                  <Text style={styles.relatedItemPreacher}>
                    {relatedSermon.preacher}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  videoContainer: {
    width: "100%",
    height: 240,
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
  },
  playIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  triangleIcon: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 15,
    borderTopWidth: 15,
    borderLeftColor: colors.white,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginLeft: 5,
  },
  pauseIcon: {
    flexDirection: "row",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseBar: {
    width: 6,
    height: 20,
    backgroundColor: colors.white,
    marginHorizontal: 3,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  preacher: {
    fontSize: 16,
    color: theme.secondaryText,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 4,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    color: theme.secondaryText,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.mediumGray,
    marginVertical: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.text,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  relatedContainer: {
    marginBottom: 24,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 16,
  },
  relatedList: {
    paddingRight: 16,
  },
  relatedItem: {
    width: 180,
    marginRight: 12,
  },
  relatedThumbnail: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  relatedItemPreacher: {
    fontSize: 12,
    color: theme.secondaryText,
  },
});