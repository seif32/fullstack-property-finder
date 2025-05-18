# 🏡 Property Finder - Full Stack Web Application

This repository contains a full-stack property finder service, divided into two main directories:

- **Frontend**: [`property-finder`](./property-finder)
- **Backend**: [`Aspect-Project`](./Aspect-Project)

## 🚀 Project Overview

Property Finder is a real estate web application that streamlines the process of property discovery and management. It serves three types of users:

- **Admin**: Manages user roles
- **User**: Browses, filters, bookmarks, and reviews properties
- **Agent**: Lists and manages properties and appointments

The system offers advanced search functionality, location browsing, appointment scheduling, and user reviews, delivering a seamless experience for both property seekers and agents.

---

## 🔐 Roles & Permissions

### 👑 Admin

- Access the Admin Dashboard
- View all users
- Promote regular users to agents

### 👤 User

- Search and filter properties
- Browse properties by location
- Review properties
- Schedule appointments with agents
- Bookmark and manage favorite properties

### 🧑‍💼 Agent

- Create, edit, and delete property listings
- View and manage appointments
- Maintain a personal profile

---

## 📄 Main Pages

### Home (`/`)

- Hero with CTA buttons for search and featured listings
- Featured properties and locations
- Testimonials and system explanation

### Property Listing (`/properties`)

- List of all properties with filtering functionality

### Property Details (`/properties/:id`)

- Full property information
- Image gallery, reviews, contact agent button (for users)
- Similar properties section

### Create Property (`/properties/create`)

- For agents only; includes full form for property details

### Edit Property (`/properties/:id/edit`)

- Form prefilled with existing data for agent to update

### Property Images (`/properties/:id/images`)

- Add/edit/delete property images

### My Properties (`/my-properties`)

- Agent dashboard showing owned properties

### Bookmarks (`/bookmarks`)

- User-only page to manage bookmarked properties

### Profile (`/profile`)

- Edit personal info for all roles

### Browse Locations (`/locations`)

- View and filter properties by location

### Admin User Management (`/admin/users`)

- User search, filtering, and promotion tools

### Request Appointment (`/properties/:propertyId/request-appointment`)

- Form for users to request property viewings

### Viewing Requests (`/agent/viewing-requests`)

- For agents to manage user appointments (approve/decline)

### Unauthorized (`/unauthorized`)

- Route for blocked or unauthorized access

---

## 📦 Backend API Modules

The backend provides a RESTful API covering the following controllers:

- [BookmarkController](#bookmark-api-documentation)
- [LocationController](#location-api-documentation)
- [PropertyController](#property-api-documentation)
- [PropertyImageController](#property-image-api-documentation)
- [ReviewController](#review-api-documentation)
- [UserController](#user-api-documentation)
- [AppointmentController](#appointments-api-documentation)

Each controller includes detailed endpoints for managing related data objects.

To see endpoint-by-endpoint usage examples, refer to the sections below in this README or visit the relevant source files under the `Aspect-project` backend module.

---

> ⚠️ **Security Note:**
> Make sure not to commit sensitive files like `serviceAccountKey.json` to version control. Add them to `.gitignore` and load via environment variables in production.
