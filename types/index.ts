export interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    important?: boolean;
  }
  
  export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    imageUrl?: string;
  }
  
  export interface Sermon {
    id: string;
    title: string;
    preacher: string;
    date: string;
    duration: string;
    thumbnailUrl: string;
    videoUrl: string;
    description: string;
    tags: string[];
    views: number;
    likes: number;
  }
  
  export interface ShortVideo {
    id: string;
    title: string;
    creator: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: string;
    likes: number;
    views: number;
    description: string;
  }
  
  export interface AudioSermon {
    id: string;
    title: string;
    preacher: string;
    date: string;
    duration: string;
    audioUrl: string;
    thumbnailUrl: string;
    description: string;
  }
  
  export interface LiveStream {
    id: string;
    title: string;
    isLive: boolean;
    streamUrl: string;
    thumbnailUrl: string;
    startTime: string;
    viewers: number;
  }
  
  export interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
  }
  
  export interface PrayerRequest {
    id: string;
    title: string;
    content: string;
    date: string;
    isAnonymous: boolean;
    userId?: string;
    userName?: string;
    isPrayed: boolean;
    prayerCount: number;
  }
  
  export interface BibleVerse {
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }
  
  export interface BibleChapter {
    book_id: string;
    book_name: string;
    chapter: number;
    verses: BibleVerse[];
  }
  
  export interface BibleBook {
    id: string;
    name: string;
    chapters: number;
    testament: 'old' | 'new';
  }
  
  export interface ChurchBranch {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
  }
  
  export interface Devotional {
    id: string;
    title: string;
    date: string;
    content: string;
    verse: string;
    verseText: string;
    author: string;
    imageUrl?: string;
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    photoUrl?: string;
    memberSince?: string;
    campus?: string;
    notifications: boolean;
    darkMode: boolean;
    bibleTranslation: string;
  }