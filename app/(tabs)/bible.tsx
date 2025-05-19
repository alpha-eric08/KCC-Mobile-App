import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Search, BookOpen } from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { bibleBooks } from "@/mocks/bible";

export default function BibleScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTestament, setActiveTestament] = useState("new");

  const filteredBooks = bibleBooks.filter(
    (book) => 
      book.testament === activeTestament && 
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookItem}>
      <BookOpen size={20} color={theme.primaryText} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookName}>{item.name}</Text>
        <Text style={styles.chapterCount}>{item.chapters} chapters</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.secondaryText} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.secondaryText}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTestament === "old" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTestament("old")}
        >
          <Text
            style={[
              styles.tabText,
              activeTestament === "old" && styles.activeTabText,
            ]}
          >
            Old Testament
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTestament === "new" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTestament("new")}
        >
          <Text
            style={[
              styles.tabText,
              activeTestament === "new" && styles.activeTabText,
            ]}
          >
            New Testament
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    height: 40,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.lightGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: theme.primaryText,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.secondaryText,
  },
  activeTabText: {
    color: colors.white,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.card,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  bookInfo: {
    marginLeft: 12,
  },
  bookName: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.text,
  },
  chapterCount: {
    fontSize: 14,
    color: theme.secondaryText,
    marginTop: 2,
  },
});