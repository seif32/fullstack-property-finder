### Property Finder Application Documentation

## Table of Contents

- [Introduction](#introduction)
- [User Types](#user-types)
- [API Endpoints Overview](#api-endpoints-overview)
- [User Flows](#user-flows)

- [Property Seeker Flows](#property-seeker-flows)

- [Browsing Properties](#browsing-properties)
- [Searching for Properties](#searching-for-properties)
- [Viewing Property Details](#viewing-property-details)
- [Managing Bookmarks](#managing-bookmarks)
- [Submitting Reviews](#submitting-reviews)

- [Property Owner/Agent Flows](#property-owneragent-flows)

- [Managing Properties](#managing-properties)
- [Creating New Properties](#creating-new-properties)
- [Editing Properties](#editing-properties)
- [Managing Property Images](#managing-property-images)

- [User Account Flows](#user-account-flows)

- [Profile Management](#profile-management)
- [Viewing Agent Profiles](#viewing-agent-profiles)

- [Location-Based Features](#location-based-features)
- [Technical Implementation Notes](#technical-implementation-notes)

## Introduction

The Property Finder application is a comprehensive platform for property seekers to find their ideal properties and for property owners/agents to list and manage their properties. This documentation outlines the user flows for all features and the API endpoints used throughout the application.

## User Types

The application serves two primary user types:

1. **Property Seekers**: Users looking to buy or rent properties
2. **Property Owners/Agents**: Users who list properties for sale or rent

## API Endpoints Overview

| Feature Area    | Endpoints                                                                                                | Description                     |
| --------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Properties      | `/api/properties`, `/api/properties/{id}`, `/api/properties/search`, `/api/properties/byOwner/{ownerId}` | Core property listing endpoints |
| Property Images | `/api/property-images/property/{propertyId}`, `/api/property-images/{id}/set-primary`                    | Property image management       |
| Bookmarks       | `/api/bookmarks/user/{userId}`, `/api/bookmarks/check/{userId}/{propertyId}`                             | User bookmarks functionality    |
| Reviews         | `/api/reviews/property/{propertyId}`, `/api/reviews/property/{propertyId}/stats`                         | Property review system          |
| Locations       | `/api/locations`, `/api/locations/type/{type}`, `/api/locations/search`                                  | Location browsing and filtering |
| Users           | `/api/users/{id}`                                                                                        | User profile management         |

## User Flows

### Property Seeker Flows

#### Browsing Properties

**Home Page to Property Listings**

1. **Access**: Navigate to the home page (`/`)
2. **Actions**:

3. Click "View All Properties" button
4. Click on a featured property card

5. **Endpoints Used**:

6. `GET /api/properties` (to fetch featured properties on home page)
7. `GET /api/properties` (to fetch all properties on the listing page)

**Browsing Property Listings**

1. **Access**: Navigate to the properties page (`/properties`)
2. **Actions**:

3. Scroll through property listings
4. Use pagination to view more properties
5. Sort properties by price or newest

6. **Endpoints Used**:

7. `GET /api/properties` (with pagination parameters)

#### Searching for Properties

**Basic Search**

1. **Access**: Use the search form on the home page or property listings page
2. **Actions**:

3. Enter location
4. Select property type
5. Click "Search" button

6. **Endpoints Used**:

7. `GET /api/properties/search` (with query parameters)

**Advanced Search**

1. **Access**: Click "Show Filters" on the property listings page
2. **Actions**:

3. Set price range
4. Select number of bedrooms
5. Choose listing type (Sale/Rent)
6. Apply filters

7. **Endpoints Used**:

8. `GET /api/properties/search` (with detailed query parameters)
9. `GET /api/locations` (to populate location dropdown)

**Location-Based Search**

1. **Access**: Navigate to the locations page (`/locations`)
2. **Actions**:

3. Browse locations
4. Filter by location type (City, Neighborhood, etc.)
5. Click on a location card

6. **Endpoints Used**:

7. `GET /api/locations` (to fetch all locations)
8. `GET /api/locations/type/{type}` (when filtering by type)
9. `GET /api/properties/search?location={locationName}` (when selecting a location)

#### Viewing Property Details

**Property Detail Page**

1. **Access**: Click on any property card
2. **Actions**:

3. View property details, images, and features
4. Check property location
5. View owner/agent information
6. Read reviews

7. **Endpoints Used**:

8. `GET /api/properties/{id}` (to fetch property details)
9. `GET /api/property-images/property/{propertyId}` (to fetch property images)
10. `GET /api/reviews/property/{propertyId}` (to fetch property reviews)
11. `GET /api/reviews/property/{propertyId}/stats` (to fetch review statistics)
12. `GET /api/bookmarks/check/{userId}/{propertyId}` (to check if property is bookmarked)

**Image Gallery**

1. **Access**: Click on any image in the property detail page
2. **Actions**:

3. View full-screen image gallery
4. Navigate between images

5. **Endpoints Used**: No additional endpoints (uses already loaded images)

**Contact Agent**

1. **Access**: Click "Contact Agent" button on property detail page
2. **Actions**:

3. Fill out contact form
4. Submit inquiry

5. **Endpoints Used**:

6. Would use a hypothetical `POST /api/inquiries` endpoint in a full implementation

#### Managing Bookmarks

**Adding Bookmarks**

1. **Access**: Click the bookmark icon on any property card or detail page
2. **Actions**:

3. Toggle bookmark status

4. **Endpoints Used**:

5. `POST /api/bookmarks` (when adding a bookmark)
6. `DELETE /api/bookmarks/user/{userId}/property/{propertyId}` (when removing a bookmark)

**Viewing Bookmarks**

1. **Access**: Click the bookmark icon in the header or select "Bookmarks" from user menu
2. **Actions**:

3. View all bookmarked properties
4. Remove bookmarks
5. Click on properties to view details

6. **Endpoints Used**:

7. `GET /api/bookmarks/user/{userId}` (to fetch user's bookmarks)
8. `DELETE /api/bookmarks/user/{userId}/property/{propertyId}` (when removing a bookmark)

#### Submitting Reviews

**Adding a Review**

1. **Access**: Navigate to a property detail page (`/properties/{id}`) and click "Write a Review"
2. **Actions**:

3. Rate the property (1-5 stars)
4. Write review comment
5. Submit review

6. **Endpoints Used**:

7. `POST /api/reviews` (to submit a new review)

**Editing a Review**

1. **Access**: Navigate to a property where you've already submitted a review
2. **Actions**:

3. Click edit button on your review
4. Update rating or comment
5. Save changes

6. **Endpoints Used**:

7. `PUT /api/reviews/{id}` (to update an existing review)

### Property Owner/Agent Flows

#### Managing Properties

**Viewing My Properties**

1. **Access**: Click "My Properties" in the user menu
2. **Actions**:

3. View all properties you've listed
4. Filter by listing type (Sale/Rent)
5. Manage individual properties

6. **Endpoints Used**:

7. `GET /api/properties/byOwner/{ownerId}` (to fetch owner's properties)

**Property Management Actions**

1. **Access**: Click the menu icon on any property in "My Properties"
2. **Actions**:

3. View property
4. Edit property
5. Manage images
6. Delete property

7. **Endpoints Used**:

8. `DELETE /api/properties/{id}` (when deleting a property)

#### Creating New Properties

**Adding a New Property**

1. **Access**: Click "Add New Property" button on "My Properties" page
2. **Actions**:

3. Fill out property details form
4. Select property type and listing type
5. Set price and features
6. Submit the form

7. **Endpoints Used**:

8. `POST /api/properties` (to create a new property)

#### Editing Properties

**Updating Property Details**

1. **Access**: Click "Edit" on a property in "My Properties" page
2. **Actions**:

3. Modify property details
4. Update price, features, or description
5. Save changes

6. **Endpoints Used**:

7. `GET /api/properties/{id}` (to fetch current property details)
8. `PUT /api/properties/{id}` (to update the property)

#### Managing Property Images

**Adding and Managing Images**

1. **Access**: Click "Manage Images" on a property in "My Properties" page
2. **Actions**:

3. View current images
4. Add new images
5. Set primary image
6. Delete images
7. Edit image descriptions

8. **Endpoints Used**:

9. `GET /api/property-images/property/{propertyId}` (to fetch property images)
10. `POST /api/property-images` (to add a new image)
11. `PUT /api/property-images/{id}` (to update image details)
12. `PUT /api/property-images/{id}/set-primary` (to set an image as primary)
13. `DELETE /api/property-images/{id}` (to delete an image)

### User Account Flows

#### Profile Management

**Viewing and Editing Profile**

1. **Access**: Click "Profile" in the user menu
2. **Actions**:

3. View profile information
4. Edit personal details
5. Change password
6. Update notification preferences

7. **Endpoints Used**:

8. `GET /api/users/{id}` (to fetch user profile)
9. `PUT /api/users/{id}` (to update user profile)

#### Viewing Agent Profiles

**Agent Profile Page**

1. **Access**: Click on an agent/owner name on any property detail page
2. **Actions**:

3. View agent information and bio
4. See agent's listed properties
5. Contact the agent

6. **Endpoints Used**:

7. `GET /api/users/{id}` (to fetch agent profile)
8. `GET /api/properties/byOwner/{ownerId}` (to fetch agent's properties)

## Location-Based Features

**Browsing Locations**

1. **Access**: Click "Locations" in the main navigation
2. **Actions**:

3. Browse all locations
4. Filter by location type
5. Search for specific locations
6. Click on a location to view properties

7. **Endpoints Used**:

8. `GET /api/locations` (to fetch all locations)
9. `GET /api/locations/type/{type}` (when filtering by type)
10. `GET /api/locations/search?name={name}` (when searching locations)
11. `GET /api/properties/search?location={locationName}` (when selecting a location)

## Technical Implementation Notes

### API Integration with React Query

For each endpoint, the application uses React Query to manage data fetching, caching, and state. Here's how the integration works:

**Fetching Data Example**:

```javascriptreact
// Example for fetching properties
const { data: properties, isLoading, error } = useQuery({
  queryKey: ['properties', searchParams],
  queryFn: () => fetch(`/api/properties/search?${searchParams}`).then(res => res.json())
});
```

**Mutation Example**:

```javascriptreact
// Example for creating a property
const createProperty = useMutation({
  mutationFn: (data) => {
    return fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['properties'] });
    navigate("/my-properties");
  }
});
```

### Error Handling

The application implements error handling for API requests:

1. **Network Errors**: Displayed when the API is unreachable
2. **404 Errors**: Shown when a resource is not found
3. **Validation Errors**: Form-specific errors displayed inline
4. **Server Errors**: General error messages for unexpected issues

### Authentication Flow

While not fully implemented in the current version, the authentication flow would work as follows:

1. **Login**: User enters credentials, receives JWT token
2. **Protected Routes**: Routes like `/my-properties` require authentication
3. **Token Storage**: JWT stored in localStorage or secure cookie
4. **Token Refresh**: Automatic refresh of tokens before expiry
5. **Logout**: Removes token and redirects to home page

---
