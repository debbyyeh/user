import { initializeApp } from "firebase/app";
import {  getFirestore } from 'firebase/firestore/lite';
import { createClient } from '@supabase/supabase-js';

const firebaseConfig = {
  apiKey: "AIzaSyAVnOFOuqvYg29PvM_-7bbeDLwdU95vu_0",
  authDomain: "pegatron-9b123.firebaseapp.com",
  databaseURL: "https://pegatron-9b123-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pegatron-9b123",
  storageBucket: "pegatron-9b123.firebasestorage.app",
  messagingSenderId: "1064351234221",
  appId: "1:1064351234221:web:242317b65c12e153846e24",
  measurementId: "G-LF84T1B7F8"
};

const app = initializeApp(firebaseConfig);

export const firebaseApp = app;
export const db = getFirestore(app);


export const supabase = createClient('https://puxoyjplbxgthpssgbuy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eG95anBsYnhndGhwc3NnYnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODA3MzQsImV4cCI6MjA2MTc1NjczNH0.cfPt8m36uuNCwFCPoiU-E3e0QlPuLNcPAiYuqlJGKv8');

