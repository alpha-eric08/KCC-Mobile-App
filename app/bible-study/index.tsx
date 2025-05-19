import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Stack } from "expo-router";
import { Search, BookOpen, ChevronDown, Bookmark, Share2, HighlighterIcon } from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { bibleBooks } from "@/mocks/bible";
import { bibleVerses } from "@/mocks/bible-verses";
import { useUserStore } from "@/store/user-store";

export default function BibleStudyScreen() {
  const { bibleTranslation } = useUserStore();
  const [activeBook, setActiveBook] = useState("John");
  const [activeChapter, setActiveChapter] = useState(1);
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showChapterSelector, setShowChapterSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedBook = bibleBooks.find(book => book.name === activeBook);
  const chapters = selectedBook ? Array.from({ length: selectedBook.chapters }, (_, i) => i + 1) : [];
  
  const filteredBooks = bibleBooks.filter(
    book => book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: "Bible Study",
        headerRight: () => (
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <Search size={22} color={theme.primaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Bookmark size={22} color={theme.primaryText} />
            </TouchableOpacity>
          </View>
        )
      }} />

      <View style={styles.selectionBar}>
        <TouchableOpacity 
          style={styles.bookSelector}
          onPress={() => {
            setShowBookSelector(!showBookSelector);
            setShowChapterSelector(false);
          }}
        >
          <BookOpen size={18} color={theme.primaryText} />
          <Text style={styles.selectorText}>{activeBook}</Text>
          <ChevronDown size={18} color={theme.primaryText} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.chapterSelector}
          onPress={() => {
            setShowChapterSelector(!showChapterSelector);
            setShowBookSelector(false);
          }}
        >
          <Text style={styles.selectorText}>Chapter {activeChapter}</Text>
          <ChevronDown size={18} color={theme.primaryText} />
        </TouchableOpacity>

        <View style={styles.translationBadge}>
          <Text style={styles.translationText}>{bibleTranslation}</Text>
        </View>
      </View>

      {showBookSelector && (
        <View style={styles.selectorPanel}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search books..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.secondaryText}
          />
          <ScrollView style={styles.bookList}>
            {filteredBooks.map((book) => (
              <TouchableOpacity 
                key={book.id}
                style={[
                  styles.bookItem,
                  book.name === activeBook && styles.activeBookItem
                ]}
                onPress={() => {
                  setActiveBook(book.name);
                  setActiveChapter(1);
                  setShowBookSelector(false);
                }}
              >
                <Text 
                  style={[
                    styles.bookItemText,
                    book.name === activeBook && styles.activeBookItemText
                  ]}
                >
                  {book.name}
                </Text>
                <Text style={styles.testamentBadge}>
                  {book.testament === "old" ? "OT" : "NT"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {showChapterSelector && (
        <View style={styles.selectorPanel}>
          <ScrollView style={styles.chapterList} contentContainerStyle={styles.chapterGrid}>
            {chapters.map((chapter) => (
              <TouchableOpacity 
                key={chapter}
                style={[
                  styles.chapterItem,
                  chapter === activeChapter && styles.activeChapterItem
                ]}
                onPress={() => {
                  setActiveChapter(chapter);
                  setShowChapterSelector(false);
                }}
              >
                <Text 
                  style={[
                    styles.chapterItemText,
                    chapter === activeChapter && styles.activeChapterItemText
                  ]}
                >
                  {chapter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.verseContainer}>
        <View style={styles.chapterHeader}>
          <Text style={styles.chapterTitle}>{activeBook} {activeChapter}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <HighlighterIcon size={20} color={theme.primaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Bookmark size={20} color={theme.primaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color={theme.primaryText} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.verses}>
          {bibleVerses.map((verse) => (
            <TouchableOpacity 
              key={verse.id}
              style={styles.verseItem}
            >
              <Text style={styles.verseNumber}>{verse.verse}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </TouchableOpacity>
          ))}
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
  headerRight: {
    flexDirection: "row",
    marginRight: 8,
  },
  headerButton: {
    marginHorizontal: 8,
  },
  selectionBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  bookSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: colors.lightGray,
    marginRight: 8,
  },
  chapterSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: colors.lightGray,
  },
  selectorText: {
    fontSize: 14,
    color: theme.text,
    marginHorizontal: 6,
  },
  translationBadge: {
    marginLeft: "auto",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: theme.primaryText,
  },
  translationText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "500",
  },
  selectorPanel: {
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    maxHeight: 300,
  },
  searchInput: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 12,
    fontSize: 14,
    color: theme.text,
  },
  bookList: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  activeBookItem: {
    backgroundColor: colors.primary,
  },
  bookItemText: {
    fontSize: 16,
    color: theme.text,
  },
  activeBookItemText: {
    color: colors.white,
    fontWeight: "500",
  },
  testamentBadge: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  chapterList: {
    padding: 12,
  },
  chapterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chapterItem: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
  },
  activeChapterItem: {
    backgroundColor: colors.primary,
  },
  chapterItemText: {
    fontSize: 16,
    color: theme.text,
  },
  activeChapterItemText: {
    color: colors.white,
    fontWeight: "500",
  },
  verseContainer: {
    flex: 1,
    padding: 16,
  },
  chapterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.text,
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
  },
  verses: {
    marginBottom: 24,
  },
  verseItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: theme.primaryText,
    width: 24,
    marginTop: 2,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: theme.text,
  },
});