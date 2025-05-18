### Property Finder Application: Endpoint Usage Guide

## Table of Contents

- [Introduction](#introduction)
- [Property Endpoints](#property-endpoints)
- [Property Image Endpoints](#property-image-endpoints)
- [Bookmark Endpoints](#bookmark-endpoints)
- [Review Endpoints](#review-endpoints)
- [Location Endpoints](#location-endpoints)
- [User Endpoints](#user-endpoints)

## Introduction

This guide maps each API endpoint to its specific usage location in the Property Finder UI. It explains where and when each endpoint is called, what user actions trigger it, and what data is exchanged.

## Property Endpoints

### GET `/api/properties`

**UI Locations:**

- **Home Page**: Displays featured properties in the "Featured Properties" section
- **Property Listing Page**: Shows the main grid of property listings with pagination

**User Actions:**

- Loading the home page
- Navigating to the properties page
- Changing page in the property listings
- Changing sort order in property listings

**Expected Response:**

- Array of property objects with basic details
- Pagination metadata (total count, pages)

### GET `/api/properties/{id}`

**UI Locations:**

- **Property Detail Page**: Displays complete information about a specific property
- **Edit Property Page**: Pre-fills the edit form with current property data

**User Actions:**

- Clicking on a property card to view details
- Clicking "Edit" on a property in the My Properties page

**Expected Response:**

- Complete property object with all details
- Owner information
- Property features and amenities

### GET `/api/properties/search`

**UI Locations:**

- **Property Listing Page**: Filters the property grid based on search criteria
- **Home Page**: Search form in the hero section redirects to filtered results

**User Actions:**

- Submitting the search form
- Applying filters on the property listing page
- Clicking on a location card to see properties in that location

**Query Parameters:**

- `location`: Property location name
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `bedrooms`: Minimum number of bedrooms
- `propertyType`: Type of property (Apartment, Villa, etc.)
- `listingType`: Type of listing (Sale, Rent)

**Expected Response:**

- Filtered array of property objects
- Pagination metadata

### GET `/api/properties/byOwner/{ownerId}`

**UI Locations:**

- **My Properties Page**: Shows all properties owned by the current user
- **Agent Profile Page**: Displays properties listed by a specific agent

**User Actions:**

- Navigating to the My Properties page
- Viewing an agent's profile

**Expected Response:**

- Array of property objects owned by the specified user
- Status information for each property

### POST `/api/properties`

**UI Locations:**

- **Create Property Page**: Form for adding a new property listing

**User Actions:**

- Filling out and submitting the "Add New Property" form

**Request Data:**

- Complete property details (title, description, price, location, etc.)
- Property features (bedrooms, bathrooms, area)
- Property type and listing type

**Expected Response:**

- Created property object with ID

### PUT `/api/properties/{id}`

**UI Locations:**

- **Edit Property Page**: Form for updating an existing property

**User Actions:**

- Modifying and submitting the property edit form

**Request Data:**

- Updated property details
- Same structure as POST request

**Expected Response:**

- Updated property object

### DELETE `/api/properties/{id}`

**UI Locations:**

- **My Properties Page**: Delete option in the property management item menu

**User Actions:**

- Clicking "Delete" in the property actions menu and confirming

**Expected Response:**

- Success confirmation

## Property Image Endpoints

### GET `/api/property-images/property/{propertyId}`

**UI Locations:**

- **Property Detail Page**: Loads all images for the image gallery
- **Property Images Page**: Shows all images in the management interface

**User Actions:**

- Viewing a property's details
- Navigating to the "Manage Images" page for a property

**Expected Response:**

- Array of image objects with URLs and metadata

### GET `/api/property-images/property/{propertyId}/primary`

**UI Locations:**

- **Property Card**: Displays the main image for each property in listings
- **My Properties Page**: Shows the primary image in property management items

**User Actions:**

- Loading any page with property cards

**Expected Response:**

- Single image object with URL and metadata

### POST `/api/property-images`

**UI Locations:**

- **Property Images Page**: "Add Image" form in the image management interface

**User Actions:**

- Clicking "Add Image" and submitting the image form

**Request Data:**

- Property ID
- Image URL
- Description
- Primary status flag

**Expected Response:**

- Created image object with ID

### PUT `/api/property-images/{id}`

**UI Locations:**

- **Property Images Page**: "Edit Image" form in the image management interface

**User Actions:**

- Clicking "Edit" on an image and updating its details

**Request Data:**

- Updated image URL
- Updated description
- Primary status flag

**Expected Response:**

- Updated image object

### PUT `/api/property-images/{id}/set-primary`

**UI Locations:**

- **Property Images Page**: Star icon on each image in the management interface

**User Actions:**

- Clicking the star icon to set an image as primary

**Expected Response:**

- Success confirmation

### DELETE `/api/property-images/{id}`

**UI Locations:**

- **Property Images Page**: Delete icon on each image in the management interface

**User Actions:**

- Clicking the delete icon on an image and confirming

**Expected Response:**

- Success confirmation

## Bookmark Endpoints

### GET `/api/bookmarks/user/{userId}`

**UI Locations:**

- **Bookmarks Page**: Displays all properties bookmarked by the user

**User Actions:**

- Navigating to the Bookmarks page

**Expected Response:**

- Array of bookmark objects with associated property details

### GET `/api/bookmarks/check/{userId}/{propertyId}`

**UI Locations:**

- **Property Card**: Determines if the bookmark icon should be filled or outlined
- **Property Detail Page**: Sets the initial state of the bookmark button

**User Actions:**

- Loading any page with property cards
- Viewing a property's details

**Expected Response:**

- Boolean value indicating bookmark status

### POST `/api/bookmarks`

**UI Locations:**

- **Property Card**: Bookmark icon
- **Property Detail Page**: Bookmark button

**User Actions:**

- Clicking the bookmark icon/button when a property is not bookmarked

**Request Data:**

- User ID
- Property ID

**Expected Response:**

- Created bookmark object

### DELETE `/api/bookmarks/user/{userId}/property/{propertyId}`

**UI Locations:**

- **Property Card**: Bookmark icon
- **Property Detail Page**: Bookmark button
- **Bookmarks Page**: Remove option on bookmarked properties

**User Actions:**

- Clicking the bookmark icon/button when a property is already bookmarked
- Clicking "Remove" on a bookmarked property

**Expected Response:**

- Success confirmation

## Review Endpoints

### GET `/api/reviews/property/{propertyId}`

**UI Locations:**

- **Property Detail Page**: Reviews section showing all reviews for the property

**User Actions:**

- Viewing a property's details

**Expected Response:**

- Array of review objects with user information

### GET `/api/reviews/property/{propertyId}/stats`

**UI Locations:**

- **Property Detail Page**: Average rating display in the reviews section header
- **Property Card**: Could show rating summary (if implemented)

**User Actions:**

- Viewing a property's details

**Expected Response:**

- Average rating value
- Total review count

### POST `/api/reviews`

**UI Locations:**

- **Property Detail Page**: "Write a Review" form in the reviews section

**User Actions:**

- Submitting a new review form

**Request Data:**

- Property ID
- User ID
- Rating value
- Comment text

**Expected Response:**

- Created review object

### PUT `/api/reviews/{id}`

**UI Locations:**

- **Property Detail Page**: Edit option on user's own reviews (if implemented)

**User Actions:**

- Editing and submitting an existing review

**Request Data:**

- Updated rating
- Updated comment

**Expected Response:**

- Updated review object

### DELETE `/api/reviews/{id}`

**UI Locations:**

- **Property Detail Page**: Delete option on user's own reviews (if implemented)

**User Actions:**

- Clicking delete on a review and confirming

**Expected Response:**

- Success confirmation

## Location Endpoints

### GET `/api/locations`

**UI Locations:**

- **Property Search Form**: Populates the location dropdown
- **Location Browse Page**: Displays all available locations
- **Home Page**: Shows popular locations section

**User Actions:**

- Opening the location dropdown in search forms
- Navigating to the Locations page
- Loading the home page

**Expected Response:**

- Array of location objects with hierarchical structure

### GET `/api/locations/type/{type}`

**UI Locations:**

- **Location Browse Page**: Filters locations when a type tab is selected

**User Actions:**

- Clicking on a location type tab (City, District, etc.)

**Expected Response:**

- Filtered array of location objects matching the specified type

### GET `/api/locations/parent/{parentLocationId}`

**UI Locations:**

- **Property Search Form**: Loads sub-locations when a parent location is selected
- **Location Browse Page**: Shows sub-locations for a selected parent

**User Actions:**

- Selecting a city to see its neighborhoods
- Expanding a location to see its sub-areas

**Expected Response:**

- Array of sub-location objects belonging to the parent

### GET `/api/locations/search?name={name}`

**UI Locations:**

- **Location Browse Page**: Filters locations based on search input
- **Property Search Form**: Could provide autocomplete for location search

**User Actions:**

- Typing in the location search field

**Expected Response:**

- Filtered array of location objects matching the search term

## User Endpoints

### GET `/api/users/{id}`

**UI Locations:**

- **Profile Page**: Displays user's personal information
- **Agent Profile Page**: Shows agent details and contact information

**User Actions:**

- Navigating to the Profile page
- Viewing an agent's profile

**Expected Response:**

- User object with personal details
- Professional information for agents

### PUT `/api/users/{id}`

**UI Locations:**

- **Profile Page**: Form for updating personal information

**User Actions:**

- Editing and submitting the profile update form

**Request Data:**

- Updated user information (name, email, phone, etc.)

**Expected Response:**

- Updated user object

### PUT `/api/users/{id}/change-password`

**UI Locations:**

- **Profile Page**: Password change form in the Security tab

**User Actions:**

- Submitting the password change form

**Request Data:**

- Current password
- New password

**Expected Response:**

- Success confirmation

---

## UI Component to Endpoint Mapping

### Home Page

- **Featured Properties Section**: `GET /api/properties` (with limit parameter)
- **Search Form**: Redirects to `GET /api/properties/search` (when submitted)
- **Popular Locations Section**: `GET /api/locations` (filtered for popular ones)

### Property Listing Page

- **Property Grid**: `GET /api/properties` (with pagination)
- **Search/Filter Form**: `GET /api/properties/search`
- **Property Cards**:

- Display: Uses property data from listing endpoints
- Bookmark Toggle: `GET /api/bookmarks/check/{userId}/{propertyId}`, `POST /api/bookmarks`, `DELETE /api/bookmarks/user/{userId}/property/{propertyId}`

### Property Detail Page

- **Main Property Info**: `GET /api/properties/{id}`
- **Image Gallery**: `GET /api/property-images/property/{propertyId}`
- **Bookmark Button**: Same as Property Card bookmark endpoints
- **Reviews Section**:

- Display: `GET /api/reviews/property/{propertyId}`
- Stats: `GET /api/reviews/property/{propertyId}/stats`
- Submit: `POST /api/reviews`

### My Properties Page

- **Property List**: `GET /api/properties/byOwner/{ownerId}`
- **Property Management Actions**:

- Edit: Links to Edit Property Page
- Delete: `DELETE /api/properties/{id}`
- Manage Images: Links to Property Images Page

### Create Property Page

- **Property Form**: `POST /api/properties` (on submit)
- **Location Dropdown**: `GET /api/locations`

### Edit Property Page

- **Property Form**:

- Load: `GET /api/properties/{id}`
- Submit: `PUT /api/properties/{id}`

### Property Images Page

- **Image Grid**: `GET /api/property-images/property/{propertyId}`
- **Add Image**: `POST /api/property-images`
- **Edit Image**: `PUT /api/property-images/{id}`
- **Set Primary**: `PUT /api/property-images/{id}/set-primary`
- **Delete Image**: `DELETE /api/property-images/{id}`

### Bookmarks Page

- **Bookmarked Properties**: `GET /api/bookmarks/user/{userId}`
- **Remove Bookmark**: `DELETE /api/bookmarks/user/{userId}/property/{propertyId}`

### Profile Page

- **User Info**: `GET /api/users/{id}`
- **Update Profile**: `PUT /api/users/{id}`
- **Change Password**: `PUT /api/users/{id}/change-password`

### Agent Profile Page

- **Agent Info**: `GET /api/users/{id}`
- **Agent Properties**: `GET /api/properties/byOwner/{ownerId}`

### Location Browse Page

- **All Locations**: `GET /api/locations`
- **Filtered Locations**: `GET /api/locations/type/{type}`
- **Location Search**: `GET /api/locations/search?name={name}`
