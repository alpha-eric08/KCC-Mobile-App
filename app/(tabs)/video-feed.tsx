import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import { Stack } from "expo-router";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme, colors } from "@/constants/colors";
import { ShortVideo } from "@/types";
import { shortVideos } from "@/mocks/short-videos";

const { width, height } = Dimensions.get("window");
const ITEM_HEIGHT = Platform.OS === "web" ? height * 0.8 : height;

export default function VideoFeedScreen() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});
  const [bookmarkedVideos, setBookmarkedVideos] = useState<
    Record<string, boolean>
  >({});

  const flatListRef = useRef<FlatList>(null);

  const toggleLike = (videoId: string) => {
    setLikedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const toggleBookmark = (videoId: string) => {
    setBookmarkedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  };

  const renderVideoItem = ({ item }: { item: ShortVideo }) => {
    const isActive = shortVideos[activeVideoIndex].id === item.id;
    const isLiked = likedVideos[item.id] || false;
    const isBookmarked = bookmarkedVideos[item.id] || false;

    return (
      <View style={styles.videoItem}>
        <Image 
          source={{ uri: item.thumbnailUrl }} 
          style={styles.videoBackground}
          resizeMode="cover"
        />
        {/* <Video
          source={{ uri: item.videoUrl }} 
          style={styles.videoBackground}
          shouldPlay
          isLooping
          isMuted
          resizeMode="cover"
        /> */}

        {/* Video Controls Overlay */}
        <TouchableOpacity
          style={styles.videoOverlay}
          activeOpacity={1}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && (
            <View style={styles.playIconContainer}>
              <Play size={50} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>

        {/* Video Info Gradient */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.videoInfoGradient}
        >
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoCreator}>@{item.creator}</Text>
            <Text style={styles.videoDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </LinearGradient>

        {/* Right Side Actions */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleLike(item.id)}
          >
            <Heart
              size={28}
              color={isLiked ? colors.red : colors.white}
              fill={isLiked ? colors.red : "none"}
            />
            <Text style={styles.actionText}>
              {item.likes + (isLiked ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={28} color={colors.white} />
            <Text style={styles.actionText}>Comments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={28} color={colors.white} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleBookmark(item.id)}
          >
            <Bookmark
              size={28}
              color={colors.white}
              fill={isBookmarked ? colors.white : "none"}
            />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX size={28} color={colors.white} />
            ) : (
              <Volume2 size={28} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <FlatList
        ref={flatListRef}
        data={shortVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={handleViewableItemsChanged}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  videoItem: {
    width: width,
    height: ITEM_HEIGHT,
    position: "relative",
  },
  videoBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  playIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  videoInfoGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  videoInfo: {
    maxWidth: "70%",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 4,
  },
  videoCreator: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  actionContainer: {
    position: "absolute",
    right: 16,
    bottom: 100,
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 16,
  },
  actionText: {
    color: colors.white,
    fontSize: 12,
    marginTop: 4,
  },
});
