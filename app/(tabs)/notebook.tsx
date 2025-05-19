import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Modal,
  ScrollView
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { 
  Plus, 
  Search, 
  BookOpen, 
  Edit3, 
  Trash2, 
  X, 
  Save,
  Tag,
  Calendar
} from "lucide-react-native";

import { theme, colors } from "@/constants/colors";
import { useNotesStore } from "@/store/notes-store";
import { Note } from "@/types";

export default function NotebookScreen() {
  const router = useRouter();
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "sermon") {
      return matchesSearch && note.tags.includes("sermon");
    }
    if (activeFilter === "devotional") {
      return matchesSearch && note.tags.includes("devotional");
    }
    if (activeFilter === "prayer") {
      return matchesSearch && note.tags.includes("prayer");
    }
    
    return matchesSearch;
  });

  const openNewNoteModal = () => {
    setEditingNote(null);
    setNoteTitle("");
    setNoteContent("");
    setNoteTags("");
    setShowModal(true);
  };

  const openEditNoteModal = (note: Note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTags(note.tags.join(", "));
    setShowModal(true);
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    
    const tagsArray = noteTags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    if (editingNote) {
      updateNote({
        ...editingNote,
        title: noteTitle,
        content: noteContent,
        tags: tagsArray,
      });
    } else {
      addNote({
        id: Date.now().toString(),
        title: noteTitle,
        content: noteContent,
        date: new Date().toISOString().split('T')[0],
        tags: tagsArray,
      });
    }
    
    setShowModal(false);
  };

  const handleDeleteNote = () => {
    if (editingNote) {
      deleteNote(editingNote.id);
      setShowModal(false);
    }
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity 
      style={styles.noteCard}
      onPress={() => openEditNoteModal(item)}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.noteDate}>{item.date}</Text>
      </View>
      
      <Text style={styles.noteContent} numberOfLines={3}>
        {item.content}
      </Text>
      
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Notebook",
          headerRight: () => (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={openNewNoteModal}
            >
              <Plus size={24} color={theme.primaryText} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.secondaryText} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.secondaryText}
        />
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            activeFilter === "all" && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter("all")}
        >
          <Text 
            style={[
              styles.filterText,
              activeFilter === "all" && styles.activeFilterText
            ]}
          >
            All Notes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton,
            activeFilter === "sermon" && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter("sermon")}
        >
          <Text 
            style={[
              styles.filterText,
              activeFilter === "sermon" && styles.activeFilterText
            ]}
          >
            Sermons
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton,
            activeFilter === "devotional" && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter("devotional")}
        >
          <Text 
            style={[
              styles.filterText,
              activeFilter === "devotional" && styles.activeFilterText
            ]}
          >
            Devotionals
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton,
            activeFilter === "prayer" && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter("prayer")}
        >
          <Text 
            style={[
              styles.filterText,
              activeFilter === "prayer" && styles.activeFilterText
            ]}
          >
            Prayer
          </Text>
        </TouchableOpacity>
      </View>
      
      {filteredNotes.length > 0 ? (
        <FlatList
          data={filteredNotes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <BookOpen size={60} color={colors.mediumGray} />
          <Text style={styles.emptyText}>No notes found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery 
              ? "Try a different search term" 
              : "Tap the + button to create your first note"}
          </Text>
        </View>
      )}
      
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingNote ? "Edit Note" : "New Note"}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <X size={24} color={theme.secondaryText} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  style={styles.titleInput}
                  placeholder="Note title"
                  value={noteTitle}
                  onChangeText={setNoteTitle}
                  placeholderTextColor={theme.secondaryText}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Content</Text>
                <TextInput
                  style={styles.contentInput}
                  placeholder="Write your note here..."
                  value={noteContent}
                  onChangeText={setNoteContent}
                  multiline
                  textAlignVertical="top"
                  placeholderTextColor={theme.secondaryText}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tags (comma separated)</Text>
                <TextInput
                  style={styles.tagsInput}
                  placeholder="sermon, prayer, devotional"
                  value={noteTags}
                  onChangeText={setNoteTags}
                  placeholderTextColor={theme.secondaryText}
                />
              </View>
              
              <View style={styles.noteMetaContainer}>
                {editingNote && (
                  <View style={styles.noteMeta}>
                    <Calendar size={16} color={theme.secondaryText} />
                    <Text style={styles.noteMetaText}>Created: {editingNote.date}</Text>
                  </View>
                )}
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              {editingNote && (
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={handleDeleteNote}
                >
                  <Trash2 size={20} color={colors.white} />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveNote}
              >
                <Save size={20} color={colors.white} />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    marginRight: 8,
    marginBottom: 8,
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
  notesList: {
    padding: 16,
    paddingTop: 0,
  },
  noteCard: {
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
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    flex: 1,
  },
  noteDate: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  noteContent: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.secondaryText,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
    maxHeight: 400,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.text,
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.text,
  },
  contentInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.text,
    minHeight: 150,
  },
  tagsInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.text,
  },
  noteMetaContainer: {
    marginBottom: 16,
  },
  noteMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteMetaText: {
    fontSize: 12,
    color: theme.secondaryText,
    marginLeft: 6,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.primaryText,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
    marginLeft: 8,
  },
});