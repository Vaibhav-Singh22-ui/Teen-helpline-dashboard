# 🌟 Teens Helpline Platform — Project Overview

Welcome to **Teens Helpline**! This document provides a complete guide to all features and capabilities of the platform, structured for presentations, reviews, or pitches.

---

## 🎯 The Core Mission
Teens Helpline is a modern, student-centric digital wellness sanctuary. It is designed to help teenagers manage academic pressure, anxiety, loneliness, and relationship stress, while providing access to certified tutors and counselors. 

The project consists of two websites working together:
1. **Public Website (`Teens Helpline`)**: A public-facing portal for anonymous peer community sharing, resource directories, and helper listings.
2. **Student Dashboard (`teens-helpline-dashboard`)**: A private, authenticated space for personalized habit tracking, self-reflection, booking helpers, and gamified wellness goals.

---

## 📁 1. Public Portal Features (`Teens Helpline`)
This is the front-facing website that anyone can access without logging in.

### 👥 Anonymous Peer Community Forum
- **Confession Space**: Students can share their feelings, struggles, or successes anonymously without fear of judgment.
- **Mood Tags**: Posts are classified using emotional tags (e.g., *Stressed*, *Lonely*, *Anxious*, *Angry*, *Hopeful*).
- **Peer Support Interaction**: Users can like posts and add anonymous encouraging replies to support one another.
- **Self-Cleaning Privacy (7-Day Expiry)**: To ensure a clean and secure environment, posts automatically expire and disappear from the database after 7 days.

### 📚 Resource Library
- **Curated Guides**: Educational articles, coping techniques, and guidance on how to manage exam stress, family dynamics, and mental wellness.
- **Support Directories**: Actionable contact numbers and resources for instant crisis support.

### 👩‍⚕️ Wellness Counselor Directory
- Direct directory listing verified mental health specialists, counselors, and career mentors. Shows their expertise, experience, and real-time availability.

---

## 🔒 2. Private Student Dashboard Features (`teens-helpline-dashboard`)
This is the password-protected, encrypted portal where students log in to access personalized tools.

### 🔑 Secure & Private Authentication
- **Secure Register & Login**: Fully integrated with Supabase Auth to guarantee user privacy.
- **Auto-Confirming Database Profiles**: Seamlessly creates user profiles on register and links them securely without public profiles.
- **Forgot Password Flow**: Built-in automated password recovery email option.
- **Reset Password Dashboard**: A dedicated page for resetting and saving a new password securely.

### 🤖 Safe Journal & AI Buddy Chatbot
- **Private Diary**: A digital space where students can write their thoughts privately.
- **AI Buddy Reflections**: When a student saves a journal entry, a companion chatbot ("Buddy") reads the mood and immediately provides empathetic, personalized, and constructive feedback.
- **Mood History Log**: Displays historical logs of mood swings, stress levels, and sleep quality to help track emotional patterns.

### 🍃 Calm Zone (Interactive Stress Relievers)
- **Breathing Orbit**: An interactive, animated breathing exercise circle that guides students through breathing cycles (Inhale, Hold, Exhale) to lower heart rates.
- **Bubble Burst Stress Reliever**: A mini-game where students can click to pop bubbles with calming sound effects, offering instant distraction from anxiety.

### 📅 Habit & Goal Tracker
- **Academic & Personal Goals**: Allows students to check off daily and weekly goals (e.g., "Complete 5-min Breathing Orbit", "Study for 2 hours").
- **Custom Goal Creation**: Students can add custom habits they want to build.

### 🎓 Help Marketplace & Scheduler
- **Tutor Bookings**: Connects students with experienced tutors (e.g., IIT Mathematics, Coding) for Class 8th-12th support.
- **Counselor Bookings**: Lets students schedule digital therapy sessions (Text, Audio, or Video formats).
- **Interactive Cart & Checkout**: Students add classes or sessions to their cart and checkout to save their scheduled appointments securely to the database.

### 🏆 Gamified Wellness Points System
- **Reward Engine**: Students earn points for healthy behaviors:
  - Writing in the private journal: **+10 points**
  - Checking off a daily goal: **+5 points**
  - Completing an interactive wellness chapter: **+20 points**
  - Booking and completing counselor sessions: **+25 points**
- **Buddy Customization**: Students use points to personalize their virtual helper's avatar, name, and personality (e.g., *Cheerful*, *Empathetic*, *Calm*).

---

## 🗄️ Backend Database Schema
The backend is powered by **Supabase (PostgreSQL)**. Below is the list of database tables and their specific purposes:

### 1. `profiles`
- **Purpose**: Stores student profiles, avatars, and gamified point counts.
- **Key Columns**:
  - `id` (references Supabase auth user)
  - `display_name` (custom screen name/nickname)
  - `buddy_name` / `buddy_avatar` / `buddy_personality` (virtual helper companion settings)
  - `points` (the score/points balance of the user)

### 2. `counselor_bookings`
- **Purpose**: Keeps track of appointments scheduled with wellness experts and professional mentors.
- **Key Columns**:
  - `user_id` (links to customer)
  - `counselor_name` / `counselor_expertise`
  - `appointment_time` (selected date/time string)
  - `status` (scheduled, completed, cancelled)
  - `session_type` (text, audio, or video communication format)

### 3. `community_posts`
- **Purpose**: Holds shared anonymous entries for the peer support forum.
- **Key Columns**:
  - `author_pseudonym` (fake username chosen by author)
  - `content` (message description)
  - `mood_tag` (tag representing post mood)
  - `likes` (total count of upvotes)
  - `expires_at` (used for the 7-day auto-delete schedule)

### 4. `community_replies`
- **Purpose**: Manages comments/replies attached to community posts.
- **Key Columns**:
  - `post_id` (links to parent post; deletes automatically if post expires)
  - `author_pseudonym` (commenter's anonymous nickname)
  - `content` (comment body text)

### 5. `safe_journal`
- **Purpose**: Houses private journal diaries and virtual assistant chat feedbacks.
- **Key Columns**:
  - `user_id` (ensures logs are strictly private)
  - `content` (written text)
  - `mood` (associated text/icon)
  - `buddy_reflection` (encouraging feedback response generated by chatbot)

---

## 💻 Tech Stack & Infrastructure
- **Frontend Framework**: Next.js (React 19)
- **Backend & Auth**: Supabase (PostgreSQL with RLS policies, trigger-based profiles, and automatic auth-confirms)
- **Styling**: Tailwind CSS (PostCSS)
- **Icons**: Lucide React
- **Email Delivery**: Supabase default SMTP / Resend integration
