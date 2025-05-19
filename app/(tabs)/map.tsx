import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Linking,
  Platform
} from "react-native";
import { Stack } from "expo-router";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  ChevronDown,
  ChevronUp,
  Info,
  Calendar
} from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { CHURCH_BRANCHES, CHURCH_LOCATION } from "@/constants/config";
import { events } from "@/mocks/events";

const { width } = Dimensions.get("window");

export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(CHURCH_LOCATION);
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("locations"); // locations or events
  
  const upcomingEvents = events.slice(0, 3);

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

  const renderMap = () => {
    // In a real app, this would be a MapView component
    // For this demo, we'll use a placeholder image
    return (
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80" }} 
          style={styles.mapImage}
          resizeMode="cover"
        />
        
        {/* Map Pins */}
        <View 
          style={[
            styles.mapPin,
            { 
              left: width * 0.5, 
              top: 200,
              backgroundColor: selectedLocation === CHURCH_LOCATION ? theme.primaryText : colors.red
            }
          ]}
          pointerEvents="box-none"
        >
          <MapPin size={16} color={colors.white} />
        </View>
        
        {CHURCH_BRANCHES.map((branch, index) => (
          <TouchableOpacity 
            key={branch.id}
            style={[
              styles.mapPin,
              { 
                left: width * (0.3 + (index * 0.2)), 
                top: 150 + (index * 70),
                backgroundColor: selectedLocation.name === branch.name ? theme.primaryText : colors.red
              }
            ]}
            onPress={() => {
              setSelectedLocation(branch);
              setShowLocationDetails(true);
            }}
          >
            <MapPin size={16} color={colors.white} />
          </TouchableOpacity>
        ))}
        
        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlButton}>
            <Text style={styles.mapControlText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <Text style={styles.mapControlText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Map" }} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === "locations" && styles.activeTabButton
          ]}
          onPress={() => setActiveTab("locations")}
        >
          <MapPin 
            size={18} 
            color={activeTab === "locations" ? colors.white : theme.secondaryText} 
          />
          <Text 
            style={[
              styles.tabText,
              activeTab === "locations" && styles.activeTabText
            ]}
          >
            Locations
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === "events" && styles.activeTabButton
          ]}
          onPress={() => setActiveTab("events")}
        >
          <Calendar 
            size={18} 
            color={activeTab === "events" ? colors.white : theme.secondaryText} 
          />
          <Text 
            style={[
              styles.tabText,
              activeTab === "events" && styles.activeTabText
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderMap()}
      
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHandle} />
        
        {activeTab === "locations" ? (
          <>
            <View style={styles.locationHeader}>
              <Text style={styles.locationTitle}>Church Locations</Text>
              <TouchableOpacity 
                style={styles.infoButton}
                onPress={() => setShowLocationDetails(!showLocationDetails)}
              >
                <Info size={18} color={theme.primaryText} />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.locationsList}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity 
                style={[
                  styles.locationItem,
                  selectedLocation === CHURCH_LOCATION && styles.selectedLocationItem
                ]}
                onPress={() => {
                  setSelectedLocation(CHURCH_LOCATION);
                  setShowLocationDetails(true);
                }}
              >
                <View style={styles.locationItemContent}>
                  <Text style={styles.locationName}>{CHURCH_LOCATION.name}</Text>
                  <Text style={styles.locationAddress}>{CHURCH_LOCATION.address}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.directionsButton}
                  onPress={() => openMaps(CHURCH_LOCATION.latitude, CHURCH_LOCATION.longitude, CHURCH_LOCATION.name)}
                >
                  <Navigation size={20} color={theme.primaryText} />
                </TouchableOpacity>
              </TouchableOpacity>
              
              {CHURCH_BRANCHES.map((branch) => (
                <TouchableOpacity 
                  key={branch.id}
                  style={[
                    styles.locationItem,
                    selectedLocation.name === branch.name && styles.selectedLocationItem
                  ]}
                  onPress={() => {
                    setSelectedLocation(branch);
                    setShowLocationDetails(true);
                  }}
                >
                  <View style={styles.locationItemContent}>
                    <Text style={styles.locationName}>{branch.name}</Text>
                    <Text style={styles.locationAddress}>{branch.address}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.directionsButton}
                    onPress={() => openMaps(branch.latitude, branch.longitude, branch.name)}
                  >
                    <Navigation size={20} color={theme.primaryText} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {showLocationDetails && (
              <View style={styles.locationDetails}>
                <View style={styles.locationDetailsHeader}>
                  <Text style={styles.locationDetailsTitle}>Location Details</Text>
                  <TouchableOpacity 
                    onPress={() => setShowLocationDetails(false)}
                  >
                    <ChevronDown size={20} color={theme.secondaryText} />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.detailsName}>{selectedLocation.name}</Text>
                <Text style={styles.detailsAddress}>{selectedLocation.address}</Text>
                
                <View style={styles.detailsItem}>
                  <Phone size={16} color={theme.secondaryText} />
                  <TouchableOpacity onPress={() => callPhone(selectedLocation.phone)}>
                    <Text style={styles.detailsText}>{selectedLocation.phone}</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.detailsItem}>
                  <Clock size={16} color={theme.secondaryText} />
                  <Text style={styles.detailsText}>
                    Sunday Services: 9:00 AM & 11:00 AM
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.getDirectionsButton}
                  onPress={() => openMaps(
                    selectedLocation.latitude, 
                    selectedLocation.longitude, 
                    selectedLocation.name
                  )}
                >
                  <Navigation size={18} color={colors.white} />
                  <Text style={styles.getDirectionsText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <>
            <Text style={styles.locationTitle}>Upcoming Events</Text>
            
            <ScrollView 
              style={styles.eventsList}
              showsVerticalScrollIndicator={false}
            >
              {upcomingEvents.map((event) => (
                <TouchableOpacity 
                  key={event.id}
                  style={styles.eventItem}
                >
                  <Image 
                    source={{ uri: event.imageUrl }} 
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.eventMeta}>
                      <Calendar size={14} color={theme.secondaryText} />
                      <Text style={styles.eventDate}>{event.date} • {event.time}</Text>
                    </View>
                    <View style={styles.eventMeta}>
                      <MapPin size={14} color={theme.secondaryText} />
                      <Text style={styles.eventLocation}>{event.location}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.viewOnMapButton}
                      onPress={() => {
                        setActiveTab("locations");
                        // In a real app, this would center the map on the event location
                      }}
                    >
                      <Text style={styles.viewOnMapText}>View on Map</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    margin: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: theme.primaryText,
  },
  tabText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  activeTabText: {
    color: colors.white,
    fontWeight: "500",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapPin: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  mapControls: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  mapControlButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  mapControlText: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
  },
  bottomSheet: {
    backgroundColor: theme.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "40%",
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.mediumGray,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },
  infoButton: {
    padding: 4,
  },
  locationsList: {
    maxHeight: 200,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedLocationItem: {
    borderColor: theme.primaryText,
    borderWidth: 1,
  },
  locationItemContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  directionsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  locationDetails: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  locationDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  locationDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
  },
  detailsName: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 4,
  },
  detailsAddress: {
    fontSize: 14,
    color: theme.secondaryText,
    marginBottom: 12,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginLeft: 8,
  },
  getDirectionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.primaryText,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  getDirectionsText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.white,
    marginLeft: 8,
  },
  eventsList: {
    maxHeight: 300,
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventInfo: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 6,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  eventLocation: {
    fontSize: 12,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  viewOnMapButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  viewOnMapText: {
    fontSize: 12,
    color: theme.primaryText,
  },
});