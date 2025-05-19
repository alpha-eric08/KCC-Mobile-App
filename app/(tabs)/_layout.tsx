import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Home, Calendar, Book, Video, Menu, Map, Notebook, Play } from "lucide-react-native";

import { theme } from "@/constants/colors";



export default function TabLayout() {
  return (
    <Tabs
      // screenOptions={{
      //   tabBarActiveTintColor: theme.tabBarActive,
      //   tabBarInactiveTintColor: theme.tabBarInactive,
      //   tabBarStyle: {
      //     backgroundColor: theme.tabBar,
      //   },
        screenOptions={{
          tabBarShowLabel: true,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 60,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 5 },
          },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.primaryText,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Menu
                    size={24}
                    color={theme.primaryText}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="video-feed"
        options={{
          title: "Videos",
          tabBarIcon: ({ color }) => <Play size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notebook"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => <Notebook size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sermons"
        options={{
          title: "Sermons",
          tabBarIcon: ({ color }) => <Video size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: "Bible",
          tabBarIcon: ({ color }) => <Book size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}





