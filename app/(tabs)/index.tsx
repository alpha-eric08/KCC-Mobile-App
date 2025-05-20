import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Calendar, Video, ArrowRight, Bell, MapPin } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";

import { theme, colors } from "@/constants/colors";
import { announcements } from "@/mocks/announcements";
import { sermons } from "@/mocks/sermons";
import { events } from "@/mocks/events";
import { Announcement } from "@/types";
import { APP_NAME, CHURCH_LOCATION } from "@/constants/config";

const images = [
  require("@/assets/images/dad.jpg"),
  require("@/assets/images/dadd.jpg"),
  require("@/assets/images/daddy2.jpg"),
];

export default function HomeScreen() {
  const router = useRouter();

  const featuredSermon = sermons[0];
  const upcomingEvents = events.slice(0, 3);
  const latestAnnouncements = announcements.slice(0, 3);

  const renderAnnouncementItem = ({ item }: { item: Announcement }) => (
    <TouchableOpacity
      style={styles.announcementCard}
      onPress={() => router.push('/announcements')}
    >
      {item.important && (
        <View style={styles.importantBadge}>
          <Bell size={12} color={colors.white} />
          <Text style={styles.importantText}>Important</Text>
        </View>
      )}
      <Text style={styles.announcementTitle}>{item.title}</Text>
      <Text style={styles.announcementDate}>{item.date}</Text>
      <Text style={styles.announcementContent} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Banner */}
      <ImageBackground
        source={images[currentIndex]}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,85,255,0.6)"]}
          style={styles.overlay}
        >
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.churchName}>{APP_NAME}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.gray} />
            <Text style={styles.locationText}>{CHURCH_LOCATION.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Announcements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push("/announcements")}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ArrowRight size={16} color={theme.primaryText} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={latestAnnouncements}
          renderItem={renderAnnouncementItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.announcementsContainer}
        />
      </View>

      {/* Featured Sermon */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Sermon</Text>
        </View>

        <TouchableOpacity
          style={styles.featuredSermonCard}
          onPress={() => router.push(`/sermon/${featuredSermon.id}`)}
        >
          <View style={styles.thumbnailContainer}>
            <Image
              source={{ uri: featuredSermon.thumbnailUrl }}
              style={styles.sermonThumbnail}
            />
            <View style={styles.playButton}>
              <Video size={24} color={colors.white} fill={colors.white} />
            </View>
          </View>
          <View style={styles.sermonInfo}>
            <Text style={styles.sermonTitle}>{featuredSermon.title}</Text>
            <Text style={styles.preacherName}>{featuredSermon.preacher}</Text>
            <Text style={styles.sermonDate}>{featuredSermon.date}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push("/events")}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ArrowRight size={16} color={theme.primaryText} />
          </TouchableOpacity>
        </View>

        <View style={styles.eventsContainer}>
          {upcomingEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventItem}
              onPress={() => router.push("/events")}
            >
              <Image
                source={{ uri: event.imageUrl }}
                style={styles.eventImage}
              />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {event.title}
                </Text>
                <View style={styles.eventMeta}>
                  <Calendar size={14} color={theme.secondaryText} />
                  <Text style={styles.eventDate}>{event.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.quickLinksContainer}>
        <TouchableOpacity
          style={styles.quickLink}
          onPress={() => router.push("/give")}
        >
          <Text style={styles.quickLinkText}>Give</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickLink}
          onPress={() => router.push("/prayer")}
        >
          <Text style={styles.quickLinkText}>Prayer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickLink}
          onPress={() => router.push("/video-feed")}
        >
          <Text style={styles.quickLinkText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickLink}
          onPress={() => router.push("/map")}
        >
          <Text style={styles.quickLinkText}>Map</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 {APP_NAME}. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  imageBackground: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
  },
  imageStyle: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  churchName: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 4,
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 6,
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: theme.primaryText,
    marginRight: 4,
  },
  announcementsContainer: {
    paddingRight: 16,
  },
  announcementCard: {
    width: 280,
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  importantBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  importantText: {
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: theme.secondaryText,
    marginBottom: 8,
  },
  announcementContent: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
  },
  featuredSermonCard: {
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnailContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  sermonThumbnail: {
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
    padding: 16,
  },
  sermonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  preacherName: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 4,
  },
  sermonDate: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  eventsContainer: {
    gap: 12,
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  eventImage: {
    width: 100,
    height: 80,
  },
  eventInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  eventDate: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  quickLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  quickLink: {
    backgroundColor: theme.primaryText,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  quickLinkText: {
    color: colors.white,
    fontWeight: "500",
  },
  footer: {
    marginTop: 16,
    marginBottom: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: theme.secondaryText,
  },
});
