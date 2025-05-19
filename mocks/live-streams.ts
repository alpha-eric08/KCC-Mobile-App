import { LiveStream } from "@/types";

export const liveStreams: LiveStream[] = [
  {
    id: "1",
    title: "Sunday Worship Service",
    isLive: true,
    streamUrl: "https://example.com/live/sunday-service",
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    startTime: "2023-10-22 10:00 AM",
    viewers: 245,
  },
  {
    id: "2",
    title: "Wednesday Bible Study: Book of Romans",
    isLive: false,
    streamUrl: "https://example.com/live/bible-study",
    thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    startTime: "2023-10-25 7:00 PM",
    viewers: 0,
  },
  {
    id: "3",
    title: "Friday Prayer Meeting",
    isLive: false,
    streamUrl: "https://example.com/live/prayer-meeting",
    thumbnailUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    startTime: "2023-10-27 6:30 PM",
    viewers: 0,
  },
  {
    id: "4",
    title: "Youth Group Special Event: Worship Night",
    isLive: false,
    streamUrl: "https://example.com/live/youth-worship",
    thumbnailUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    startTime: "2023-10-28 7:00 PM",
    viewers: 0,
  },
  {
    id: "5",
    title: "Sunday Worship Service",
    isLive: false,
    streamUrl: "https://example.com/live/sunday-service-next",
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    startTime: "2023-10-29 10:00 AM",
    viewers: 0,
  },
];