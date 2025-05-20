import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Image } from "react-native";
import { useRouter } from "expo-router";
import { 
  User, Settings, Heart, DollarSign, MapPin, 
  Bell, Moon, LogOut, ChevronRight, Radio, 
  BookOpen, MessageSquare, Calendar, Video,
  AlignHorizontalJustifyCenterIcon
} from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { APP_NAME } from "@/constants/config";
import { useUserStore } from "@/store/user-store";
import AnnouncementScreen from "./Announcements";

export default function ModalScreen() {
  const router = useRouter();
  const { darkMode, toggleDarkMode, notifications, toggleNotifications } = useUserStore();

  const menuItems = [
    {
      title: "Profile",
      icon: <User size={22} color={theme.primaryText} />,
      onPress: () => router.push("/profile"),
    },
    {
      title: "Bible Study",
      icon: <BookOpen size={22} color={theme.primaryText} />,
      onPress: () => router.push("/bible-study"),
    },
    {
      title: "Prayer Requests",
      icon: <Heart size={22} color={theme.primaryText} />,
      onPress: () => router.push("/prayer"),
    },
    {
      title: "Give",
      icon: <DollarSign size={22} color={theme.primaryText} />,
      onPress: () => router.push("/give"),
    },
    {
      title: "Live Radio",
      icon: <Radio size={22} color={theme.primaryText} />,
      onPress: () => router.push("/radio"),
    },
    {
      title: "Connect Groups",
      icon: <MessageSquare size={22} color={theme.primaryText} />,
      onPress: () => router.push("/connect"),
    },
    {
      title: "Events Calendar",
      icon: <Calendar size={22} color={theme.primaryText} />,
      onPress: () => router.push("/events-calendar"),
    },
    {
      title: "Live Stream",
      icon: <Video size={22} color={theme.primaryText} />,
      onPress: () => router.push("/live"),
    },
       {
      title: "Announcements",
      icon: <AlignHorizontalJustifyCenterIcon size={22} color={theme.primaryText} />,
      onPress: () => router.push("/announcements"),
    },
    {
      title: "Locations",
      icon: <MapPin size={22} color={theme.primaryText} />,
      onPress: () => router.push("/locations"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" }} 
          style={styles.headerBackground}
        />
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <ChevronRight size={20} color={theme.secondaryText} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.settingsSection}>
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
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={22} color={colors.red} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 {APP_NAME}. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    height: 180,
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 51, 204, 0.7)",
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 16,
  },
  settingsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red,
  },
  logoutText: {
    fontSize: 16,
    color: colors.red,
    marginLeft: 8,
    fontWeight: "500",
  },
  footer: {
    marginTop: 32,
    marginBottom: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: theme.secondaryText,
  },
});