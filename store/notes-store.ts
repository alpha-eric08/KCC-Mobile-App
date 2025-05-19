import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '@/types';

interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (updatedNote: Note) => void;
  deleteNote: (noteId: string) => void;
}

// Sample notes data
const initialNotes: Note[] = [
  {
    id: "1",
    title: "Sunday Sermon Notes: Finding Peace",
    content: "Pastor Michael shared about finding peace in troubled times. Key points:\n\n1. Peace comes from trusting God's promises\n2. Philippians 4:6-7 reminds us not to be anxious\n3. Prayer is our pathway to peace\n\nI need to remember to practice gratitude daily as a way to maintain peace.",
    date: "2023-10-15",
    tags: ["sermon", "peace", "prayer"]
  },
  {
    id: "2",
    title: "Morning Devotional: Psalm 23",
    content: "The Lord is my shepherd, I shall not want.\nHe makes me lie down in green pastures,\nHe leads me beside quiet waters, He refreshes my soul.\n\nReflection: God provides everything I need. When I feel anxious about provision, I need to remember that my Shepherd is taking care of me.",
    date: "2023-10-12",
    tags: ["devotional", "psalms", "provision"]
  },
  {
    id: "3",
    title: "Prayer List for Family",
    content: "- Mom's health and upcoming doctor's appointment\n- Dad's job situation\n- Sister's college applications\n- Brother's marriage\n\nScripture to pray: \"Don't worry about anything; instead, pray about everything. Tell God what you need, and thank him for all he has done.\" - Philippians 4:6",
    date: "2023-10-08",
    tags: ["prayer", "family"]
  }
];

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: initialNotes,
      
      addNote: (note) => set((state) => ({ 
        notes: [note, ...state.notes] 
      })),
      
      updateNote: (updatedNote) => set((state) => ({ 
        notes: state.notes.map(note => 
          note.id === updatedNote.id ? updatedNote : note
        ) 
      })),
      
      deleteNote: (noteId) => set((state) => ({ 
        notes: state.notes.filter(note => note.id !== noteId) 
      })),
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);