import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Linking, Platform } from "react-native";
import { Stack } from "expo-router";
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { CHURCH_BRANCHES, CHURCH_LOCATION } from "@/constants/config";

export default function LocationsScreen() {
  const openMaps = (latitude: number, longitude: number, label: string) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
      web: `https://maps.google.com/?q=${latLng}`
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const callPhone = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Locations" }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainLocationContainer}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" }} 
            style={styles.mainLocationImage} 
          />
          
          <View style={styles.mainLocationInfo}>
            <Text style={styles.mainLocationName}>{CHURCH_LOCATION.name}</Text>
            <Text style={styles.mainLocationAddress}>{CHURCH_LOCATION.address}</Text>
            
            <View style={styles.contactInfo}>
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => callPhone(CHURCH_LOCATION.phone)}
              >
                <Phone size={16} color={theme.primaryText} />
                <Text style={styles.contactText}>{CHURCH_LOCATION.phone}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => sendEmail(CHURCH_LOCATION.email)}
              >
                <Mail size={16} color={theme.primaryText} />
                <Text style={styles.contactText}>{CHURCH_LOCATION.email}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.serviceTimesContainer}>
              <Text style={styles.serviceTimesTitle}>Service Times</Text>
              <View style={styles.serviceTime}>
                <Clock size={16} color={theme.secondaryText} />
                <Text style={styles.serviceTimeText}>Sunday: 9:00 AM & 11:00 AM</Text>
              </View>
              <View style={styles.serviceTime}>
                <Clock size={16} color={theme.secondaryText} />
                <Text style={styles.serviceTimeText}>Wednesday: 7:00 PM</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.directionsButton}
              onPress={() => openMaps(CHURCH_LOCATION.latitude, CHURCH_LOCATION.longitude, CHURCH_LOCATION.name)}
            >
              <Navigation size={18} color={colors.white} />
              <Text style={styles.directionsButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.branchesContainer}>
          <Text style={styles.branchesTitle}>Other Campuses</Text>
          
          {CHURCH_BRANCHES.map((branch) => (
            <View key={branch.id} style={styles.branchItem}>
              <View style={styles.branchInfo}>
                <Text style={styles.branchName}>{branch.name}</Text>
                <Text style={styles.branchAddress}>{branch.address}</Text>
                <TouchableOpacity 
                  style={styles.branchPhone}
                  onPress={() => callPhone(branch.phone)}
                >
                  <Phone size={14} color={theme.secondaryText} />
                  <Text style={styles.branchPhoneText}>{branch.phone}</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.branchDirections}
                onPress={() => openMaps(branch.latitude, branch.longitude, branch.name)}
              >
                <MapPin size={20} color={theme.primaryText} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.visitContainer}>
          <Text style={styles.visitTitle}>Plan Your Visit</Text>
          <Text style={styles.visitText}>
            We would love to have you join us for a service! Here's what you can expect when you visit:
          </Text>
          
          <View style={styles.visitItem}>
            <Text style={styles.visitItemTitle}>Welcoming Environment</Text>
            <Text style={styles.visitItemText}>
              Our greeters will welcome you and help you find your way around our campus.
            </Text>
          </View>
          
          <View style={styles.visitItem}>
            <Text style={styles.visitItemTitle}>Children's Ministry</Text>
            <Text style={styles.visitItemText}>
              We offer age-appropriate classes for children from nursery through 5th grade during all services.
            </Text>
          </View>
          
          <View style={styles.visitItem}>
            <Text style={styles.visitItemTitle}>Worship & Message</Text>
            <Text style={styles.visitItemText}>
              Experience uplifting worship and a relevant, Bible-based message.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.visitButton}>
            <Text style={styles.visitButtonText}>Schedule a Visit</Text>
            <ExternalLink size={18} color={theme.primaryText} />
          </TouchableOpacity>
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
  mainLocationContainer: {
    marginBottom: 24,
  },
  mainLocationImage: {
    width: "100%",
    height: 200,
  },
  mainLocationInfo: {
    padding: 16,
  },
  mainLocationName: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  mainLocationAddress: {
    fontSize: 16,
    color: theme.secondaryText,
    marginBottom: 16,
  },
  contactInfo: {
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: theme.primaryText,
    marginLeft: 8,
  },
  serviceTimesContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  serviceTimesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  serviceTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceTimeText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 8,
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.primaryText,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  directionsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
    marginLeft: 8,
  },
  branchesContainer: {
    padding: 16,
    marginBottom: 24,
  },
  branchesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 16,
  },
  branchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  branchInfo: {
    flex: 1,
  },
  branchName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  branchAddress: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 8,
  },
  branchPhone: {
    flexDirection: "row",
    alignItems: "center",
  },
  branchPhoneText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  branchDirections: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  visitContainer: {
    padding: 16,
    marginBottom: 32,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  visitTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  visitText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 16,
    lineHeight: 20,
  },
  visitItem: {
    marginBottom: 12,
  },
  visitItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  visitItemText: {
    fontSize: 14,
    color: theme.secondaryText,
    lineHeight: 20,
  },
  visitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.primaryText,
  },
  visitButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.primaryText,
    marginRight: 8,
  },
});