import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Switch, Alert, Platform } from "react-native";
import { Stack } from "expo-router";
import { 
  User, Settings, Edit, LogOut, Bell, Moon, 
  BookOpen, Heart, Calendar, MessageSquare, Camera
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

import { theme, colors } from "@/constants/colors";
import { useUserStore } from "@/store/user-store";

export default function ProfileScreen() {
  const { 
    name, 
    email, 
    photoUrl, 
    memberSince, 
    campus, 
    notifications, 
    darkMode, 
    bibleTranslation,
    toggleNotifications,
    toggleDarkMode,
    setBibleTranslation,
    updateProfile
  } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);

  const activityStats = [
    { icon: <BookOpen size={20} color={theme.primaryText} />, label: "Bible Plans", value: "3 Active" },
    { icon: <Heart size={20} color={theme.primaryText} />, label: "Prayer Requests", value: "12 Submitted" },
    { icon: <Calendar size={20} color={theme.primaryText} />, label: "Events Attended", value: "8 Events" },
    { icon: <MessageSquare size={20} color={theme.primaryText} />, label: "Connect Groups", value: "1 Group" },
  ];

  const bibleTranslations = ["KJV", "NIV", "ESV", "NASB", "NLT"];

  const handlePickImage = async () => {
    if (Platform.OS === "web") {
      Alert.alert("Not Available", "This feature is not available on web.");
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant permission to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateProfile({ photoUrl: result.assets[0].uri });
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => console.log("User logged out") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Edit size={20} color={theme.primaryText} />
            </TouchableOpacity>
          )
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ 
                uri: photoUrl || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              }} 
              style={styles.profileImage} 
            />
            {isEditing && (
              <TouchableOpacity 
                style={styles.cameraButton}
                onPress={handlePickImage}
              >
                <Camera size={20} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
          
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          
          <View style={styles.profileMeta}>
            {memberSince && (
              <Text style={styles.profileMetaText}>Member since {memberSince}</Text>
            )}
            {campus && (
              <Text style={styles.profileMetaText}>Campus: {campus}</Text>
            )}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
          
          <View style={styles.statsGrid}>
            {activityStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={styles.statIcon}>
                  {stat.icon}
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Bell size={22} color={theme.primaryText} />
              <Text style={styles.settingItemText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Moon size={22} color={theme.primaryText} />
              <Text style={styles.settingItemText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <BookOpen size={22} color={theme.primaryText} />
              <Text style={styles.settingItemText}>Bible Translation</Text>
            </View>
            <View style={styles.translationSelector}>
              {bibleTranslations.map((translation) => (
                <TouchableOpacity 
                  key={translation}
                  style={[
                    styles.translationOption,
                    bibleTranslation === translation && styles.activeTranslation
                  ]}
                  onPress={() => setBibleTranslation(translation)}
                >
                  <Text 
                    style={[
                      styles.translationText,
                      bibleTranslation === translation && styles.activeTranslationText
                    ]}
                  >
                    {translation}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={22} color={colors.red} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
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
  editButton: {
    marginRight: 16,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.primaryText,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: theme.secondaryText,
    marginBottom: 12,
  },
  profileMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  profileMetaText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginHorizontal: 8,
  },
  statsContainer: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  settingsContainer: {
    padding: 16,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemText: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 16,
  },
  translationSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  translationOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 4,
    backgroundColor: colors.lightGray,
  },
  activeTranslation: {
    backgroundColor: theme.primaryText,
  },
  translationText: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  activeTranslationText: {
    color: colors.white,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: colors.red,
    marginLeft: 8,
    fontWeight: "500",
  },
  footer: {
    marginBottom: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: theme.secondaryText,
  },
});