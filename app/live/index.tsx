import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Stack } from "expo-router";
import { Play, Users, Calendar, Clock, Bell, Share2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme, colors } from "@/constants/colors";
import { liveStreams } from "@/mocks/live-streams";

export default function LiveScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  
  const currentLiveStream = liveStreams.find(stream => stream.isLive);
  const upcomingStreams = liveStreams.filter(stream => !stream.isLive);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Live Stream" }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {currentLiveStream ? (
          <View style={styles.liveContainer}>
            <View style={styles.videoContainer}>
              <Image 
                source={{ uri: currentLiveStream.thumbnailUrl }} 
                style={styles.thumbnail} 
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradientOverlay}
              />
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
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
              <View style={styles.viewerCount}>
                <Users size={16} color={colors.white} />
                <Text style={styles.viewerCountText}>{currentLiveStream.viewers} watching</Text>
              </View>
            </View>

            <View style={styles.liveInfo}>
              <Text style={styles.liveTitle}>{currentLiveStream.title}</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Share2 size={20} color={theme.secondaryText} />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.noLiveContainer}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }} 
              style={styles.noLiveThumbnail} 
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.noLiveGradient}
            />
            <View style={styles.noLiveContent}>
              <Text style={styles.noLiveTitle}>No Live Stream Right Now</Text>
              <Text style={styles.noLiveText}>
                Check the schedule below for upcoming live streams or watch our previous services.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.upcomingContainer}>
          <Text style={styles.sectionTitle}>Upcoming Live Streams</Text>
          
          {upcomingStreams.map((stream) => (
            <View key={stream.id} style={styles.upcomingItem}>
              <Image 
                source={{ uri: stream.thumbnailUrl }} 
                style={styles.upcomingThumbnail} 
              />
              
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingTitle}>{stream.title}</Text>
                
                <View style={styles.upcomingMeta}>
                  <View style={styles.metaItem}>
                    <Calendar size={14} color={theme.secondaryText} />
                    <Text style={styles.metaText}>{stream.startTime.split(' ')[0]}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={theme.secondaryText} />
                    <Text style={styles.metaText}>{stream.startTime.split(' ')[1]}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.notifyButton,
                    isNotifying && styles.notifyingButton
                  ]}
                  onPress={() => setIsNotifying(!isNotifying)}
                >
                  <Bell 
                    size={16} 
                    color={isNotifying ? colors.white : theme.primaryText} 
                  />
                  <Text 
                    style={[
                      styles.notifyButtonText,
                      isNotifying && styles.notifyingButtonText
                    ]}
                  >
                    {isNotifying ? "Reminder Set" : "Set Reminder"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.pastServicesContainer}>
          <Text style={styles.sectionTitle}>Past Services</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pastServicesList}
          >
            {[...liveStreams].reverse().map((stream) => (
              <TouchableOpacity key={stream.id} style={styles.pastServiceItem}>
                <Image 
                  source={{ uri: stream.thumbnailUrl }} 
                  style={styles.pastServiceThumbnail} 
                />
                <View style={styles.playOverlay}>
                  <Play size={24} color={colors.white} fill={colors.white} />
                </View>
                <Text style={styles.pastServiceTitle} numberOfLines={2}>
                  {stream.title}
                </Text>
                <Text style={styles.pastServiceDate}>
                  {stream.startTime.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About Our Live Streams</Text>
          <Text style={styles.infoText}>
            Join us for our live services every Sunday at 10:00 AM. We also broadcast special events, Bible studies, and prayer meetings throughout the week.
          </Text>
          <Text style={styles.infoText}>
            If you're having technical difficulties, please contact our tech team at tech@gracechurch.org or call (555) 123-4567.
          </Text>
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
  liveContainer: {
    marginBottom: 24,
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
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  liveIndicator: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
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
  viewerCount: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewerCountText: {
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
  liveInfo: {
    padding: 16,
  },
  liveTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  actionButtonText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  noLiveContainer: {
    height: 200,
    position: "relative",
    marginBottom: 24,
  },
  noLiveThumbnail: {
    width: "100%",
    height: "100%",
  },
  noLiveGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  noLiveContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  noLiveTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  noLiveText: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  upcomingContainer: {
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 16,
  },
  upcomingItem: {
    flexDirection: "row",
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingThumbnail: {
    width: 120,
    height: 120,
  },
  upcomingInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  upcomingMeta: {
    flexDirection: "row",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: theme.secondaryText,
    marginLeft: 4,
  },
  notifyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.primaryText,
    alignSelf: "flex-start",
  },
  notifyingButton: {
    backgroundColor: theme.primaryText,
    borderColor: theme.primaryText,
  },
  notifyButtonText: {
    fontSize: 12,
    color: theme.primaryText,
    marginLeft: 4,
  },
  notifyingButtonText: {
    color: colors.white,
  },
  pastServicesContainer: {
    padding: 16,
    marginBottom: 24,
  },
  pastServicesList: {
    paddingRight: 16,
  },
  pastServiceItem: {
    width: 180,
    marginRight: 12,
  },
  pastServiceThumbnail: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    position: "relative",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
  },
  pastServiceTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  pastServiceDate: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  infoContainer: {
    padding: 16,
    marginBottom: 32,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 8,
    lineHeight: 20,
  },
});