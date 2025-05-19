import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Stack } from "expo-router";
import { Play, Pause, SkipForward, SkipBack, Volume2, Radio, Clock, Calendar } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme, colors } from "@/constants/colors";
import { radioPrograms } from "@/mocks/radio";

export default function RadioScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState(0);
  const [volume, setVolume] = useState(80);

  const stations = [
    { name: "Grace FM", frequency: "98.5", logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
    { name: "Worship Radio", frequency: "103.7", logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { name: "Gospel Hits", frequency: "105.3", logo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
  ];

  const currentProgramIndex = 0; // In a real app, this would be determined by the current time
  const currentProgram = radioPrograms[currentProgramIndex];
  const nextProgram = radioPrograms[(currentProgramIndex + 1) % radioPrograms.length];

  const handlePlayPause = () => {
    // In a real app, this would control the audio playback
    setIsPlaying(!isPlaying);
  };

  const handleStationChange = (index: number) => {
    setCurrentStation(index);
    setIsPlaying(true);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Live Radio" }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.primary, '#0055FF']}
          style={styles.playerContainer}
        >
          <View style={styles.stationInfo}>
            <Image 
              source={{ uri: stations[currentStation].logo }} 
              style={styles.stationLogo} 
            />
            <View>
              <Text style={styles.stationName}>{stations[currentStation].name}</Text>
              <Text style={styles.stationFrequency}>{stations[currentStation].frequency} FM</Text>
            </View>
          </View>

          <View style={styles.nowPlaying}>
            <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
            <Text style={styles.programTitle}>{currentProgram.title}</Text>
            <Text style={styles.programHost}>with {currentProgram.host}</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => {
                const prevStation = (currentStation - 1 + stations.length) % stations.length;
                handleStationChange(prevStation);
              }}
            >
              <SkipBack size={24} color={colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.playPauseButton}
              onPress={handlePlayPause}
            >
              {isPlaying ? (
                <Pause size={32} color={colors.primary} />
              ) : (
                <Play size={32} color={colors.primary} fill={colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => {
                const nextStation = (currentStation + 1) % stations.length;
                handleStationChange(nextStation);
              }}
            >
              <SkipForward size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          {Platform.OS !== "web" && (
            <View style={styles.volumeContainer}>
              <Volume2 size={20} color={colors.white} />
              <View style={styles.volumeSlider}>
                <View style={[styles.volumeProgress, { width: `${volume}%` }]} />
              </View>
            </View>
          )}
        </LinearGradient>

        <View style={styles.stationsContainer}>
          <Text style={styles.sectionTitle}>All Stations</Text>
          
          {stations.map((station, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.stationItem,
                currentStation === index && styles.activeStationItem
              ]}
              onPress={() => handleStationChange(index)}
            >
              <Image 
                source={{ uri: station.logo }} 
                style={styles.stationItemLogo} 
              />
              <View style={styles.stationItemInfo}>
                <Text style={styles.stationItemName}>{station.name}</Text>
                <Text style={styles.stationItemFrequency}>{station.frequency} FM</Text>
              </View>
              <Radio 
                size={20} 
                color={currentStation === index ? theme.primaryText : theme.secondaryText} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          
          {radioPrograms.map((program, index) => (
            <View 
              key={index}
              style={[
                styles.scheduleItem,
                index === currentProgramIndex && styles.activeScheduleItem
              ]}
            >
              <View style={styles.scheduleTime}>
                <Clock size={16} color={theme.secondaryText} />
                <Text style={styles.scheduleTimeText}>{program.time}</Text>
              </View>
              
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTitle}>{program.title}</Text>
                <Text style={styles.scheduleHost}>with {program.host}</Text>
                <Text style={styles.scheduleDescription} numberOfLines={2}>
                  {program.description}
                </Text>
              </View>
              
              {index === currentProgramIndex && (
                <View style={styles.liveBadge}>
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.upcomingContainer}>
          <Text style={styles.sectionTitle}>Upcoming Shows</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.upcomingList}
          >
            {radioPrograms.slice(1).map((program, index) => (
              <View key={index} style={styles.upcomingItem}>
                <View style={styles.upcomingHeader}>
                  <Calendar size={16} color={theme.secondaryText} />
                  <Text style={styles.upcomingDay}>Tomorrow</Text>
                </View>
                <Text style={styles.upcomingTime}>{program.time}</Text>
                <Text style={styles.upcomingTitle}>{program.title}</Text>
                <Text style={styles.upcomingHost}>with {program.host}</Text>
              </View>
            ))}
          </ScrollView>
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
  playerContainer: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  stationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  stationLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.white,
  },
  stationName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  stationFrequency: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  nowPlaying: {
    alignItems: "center",
    marginBottom: 24,
  },
  nowPlayingLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.7,
    marginBottom: 8,
  },
  programTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginBottom: 4,
  },
  programHost: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  volumeSlider: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    marginLeft: 12,
  },
  volumeProgress: {
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  stationsContainer: {
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 16,
  },
  stationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: theme.card,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeStationItem: {
    borderColor: theme.primaryText,
    borderWidth: 1,
  },
  stationItemLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  stationItemInfo: {
    flex: 1,
  },
  stationItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  stationItemFrequency: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  scheduleContainer: {
    padding: 16,
  },
  scheduleItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: theme.card,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeScheduleItem: {
    borderColor: theme.primaryText,
    borderWidth: 1,
  },
  scheduleTime: {
    alignItems: "center",
    marginRight: 16,
  },
  scheduleTimeText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginTop: 4,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  scheduleHost: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 8,
  },
  scheduleDescription: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
  },
  liveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.red,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  liveText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
  },
  upcomingContainer: {
    padding: 16,
    marginBottom: 24,
  },
  upcomingList: {
    paddingRight: 16,
  },
  upcomingItem: {
    width: 160,
    padding: 16,
    backgroundColor: theme.card,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  upcomingDay: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  upcomingTime: {
    fontSize: 14,
    color: theme.primaryText,
    fontWeight: "500",
    marginBottom: 8,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  upcomingHost: {
    fontSize: 14,
    color: theme.secondaryText,
  },
});