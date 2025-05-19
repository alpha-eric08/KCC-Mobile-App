import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Switch, Image } from "react-native";
import { Stack } from "expo-router";
import { Heart, Plus, Filter, Send, User, Lock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme, colors } from "@/constants/colors";
import { prayerRequests } from "@/mocks/prayer-requests";

export default function PrayerScreen() {
  const [showForm, setShowForm] = useState(false);
  const [prayerTitle, setPrayerTitle] = useState("");
  const [prayerContent, setPrayerContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [filter, setFilter] = useState("all"); // all, mine, prayed

  const filteredRequests = prayerRequests.filter(request => {
    if (filter === "all") return true;
    if (filter === "mine") return !request.isAnonymous; // In a real app, check if userId matches current user
    if (filter === "prayed") return request.isPrayed;
    return true;
  });

  const handleSubmit = () => {
    // In a real app, this would submit the prayer request to a backend
    console.log({ prayerTitle, prayerContent, isAnonymous });
    setPrayerTitle("");
    setPrayerContent("");
    setIsAnonymous(false);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: "Prayer Requests",
        headerRight: () => (
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setShowForm(!showForm)}
          >
            <Plus size={24} color={theme.primaryText} />
          </TouchableOpacity>
        )
      }} />

      <LinearGradient
        colors={[colors.primary, '#0055FF']}
        style={styles.banner}
      >
        <Text style={styles.bannerTitle}>Community Prayer Wall</Text>
        <Text style={styles.bannerText}>
          "And pray in the Spirit on all occasions with all kinds of prayers and requests." - Ephesians 6:18
        </Text>
      </LinearGradient>

      {showForm ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Submit a Prayer Request</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a title for your prayer request"
              value={prayerTitle}
              onChangeText={setPrayerTitle}
              placeholderTextColor={theme.secondaryText}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Request</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Share your prayer request here..."
              value={prayerContent}
              onChangeText={setPrayerContent}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              placeholderTextColor={theme.secondaryText}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              <Lock size={20} color={theme.text} />
              <Text style={styles.switchText}>Submit anonymously</Text>
            </View>
            <Switch
              value={isAnonymous}
              onValueChange={setIsAnonymous}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          
          <View style={styles.formButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowForm(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
              <Send size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[
                styles.filterButton,
                filter === "all" && styles.activeFilterButton
              ]}
              onPress={() => setFilter("all")}
            >
              <Text 
                style={[
                  styles.filterText,
                  filter === "all" && styles.activeFilterText
                ]}
              >
                All Requests
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.filterButton,
                filter === "mine" && styles.activeFilterButton
              ]}
              onPress={() => setFilter("mine")}
            >
              <Text 
                style={[
                  styles.filterText,
                  filter === "mine" && styles.activeFilterText
                ]}
              >
                My Requests
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.filterButton,
                filter === "prayed" && styles.activeFilterButton
              ]}
              onPress={() => setFilter("prayed")}
            >
              <Text 
                style={[
                  styles.filterText,
                  filter === "prayed" && styles.activeFilterText
                ]}
              >
                Prayed For
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.requestsContainer}
            contentContainerStyle={styles.requestsList}
            showsVerticalScrollIndicator={false}
          >
            {filteredRequests.map((request) => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  {request.isAnonymous ? (
                    <View style={styles.anonymousUser}>
                      <Lock size={16} color={theme.secondaryText} />
                      <Text style={styles.anonymousText}>Anonymous</Text>
                    </View>
                  ) : (
                    <View style={styles.userInfo}>
                      <Image 
                        source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }} 
                        style={styles.userAvatar} 
                      />
                      <Text style={styles.userName}>{request.userName}</Text>
                    </View>
                  )}
                  <Text style={styles.requestDate}>{request.date}</Text>
                </View>
                
                <Text style={styles.requestTitle}>{request.title}</Text>
                <Text style={styles.requestContent}>{request.content}</Text>
                
                <View style={styles.requestFooter}>
                  <TouchableOpacity style={styles.prayButton}>
                    <Heart 
                      size={20} 
                      color={request.isPrayed ? colors.red : theme.secondaryText} 
                      fill={request.isPrayed ? colors.red : "none"} 
                    />
                    <Text 
                      style={[
                        styles.prayButtonText,
                        request.isPrayed && styles.prayedButtonText
                      ]}
                    >
                      {request.isPrayed ? "Prayed" : "Pray"} ({request.prayerCount})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerButton: {
    marginRight: 16,
  },
  banner: {
    padding: 20,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
    opacity: 0.9,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  activeFilterButton: {
    backgroundColor: theme.primaryText,
  },
  filterText: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  activeFilterText: {
    color: colors.white,
    fontWeight: "500",
  },
  requestsContainer: {
    flex: 1,
  },
  requestsList: {
    padding: 16,
    paddingBottom: 32,
  },
  requestCard: {
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.text,
  },
  anonymousUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  anonymousText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  requestDate: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  requestContent: {
    fontSize: 16,
    color: theme.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  requestFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  prayButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  prayButtonText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  prayedButtonText: {
    color: colors.red,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.text,
  },
  textArea: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.text,
    minHeight: 120,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  switchLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 8,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.secondaryText,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: theme.secondaryText,
    fontWeight: "500",
  },
  submitButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.primaryText,
    borderRadius: 8,
    marginLeft: 8,
  },
  submitButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "500",
    marginRight: 8,
  },
});