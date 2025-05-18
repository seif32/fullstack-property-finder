### Comprehensive User Flow and Scenarios for Property Finder System

## 1. User Roles and Permissions Overview

### User Roles

- **Guest Users**: Unauthenticated visitors with limited access
- **Normal Users**: Registered users who can browse, bookmark, and review properties
- **Agents**: Users who can list and manage properties
- **Administrators**: System administrators with full access

### Permission Matrix

| Functionality         | Guest | Normal User | Agent | Admin |
| --------------------- | ----- | ----------- | ----- | ----- |
| Browse Properties     | ✅    | ✅          | ✅    | ✅    |
| View Property Details | ✅    | ✅          | ✅    | ✅    |
| Search Properties     | ✅    | ✅          | ✅    | ✅    |
| Create User Account   | ✅    | ❌          | ❌    | ✅    |
| Bookmark Properties   | ❌    | ✅          | ✅    | ✅    |
| Write Reviews         | ❌    | ✅          | ❌    | ✅    |
| Manage Own Profile    | ❌    | ✅          | ✅    | ✅    |
| List Properties       | ❌    | ❌          | ✅    | ✅    |
| Manage Own Properties | ❌    | ❌          | ✅    | ✅    |
| Manage All Properties | ❌    | ❌          | ❌    | ✅    |
| Manage Users          | ❌    | ❌          | ❌    | ✅    |
| Manage Locations      | ❌    | ❌          | ❌    | ✅    |

## 2. Normal User Journeys

### 2.1 User Registration and Authentication

**Registration Flow:**

1. User accesses the registration page
2. User provides email, name, phone number, and password
3. System validates input (email format, password strength)
4. System checks if email is already registered

5. If email exists: Error message displayed
6. If email is new: Account created with USER role

7. System sends verification email (optional)
8. User receives success message and is directed to login

**Login Flow:**

1. User enters email and password
2. System validates credentials

3. If invalid: Error message displayed
4. If valid: User authenticated and session created

5. User redirected to homepage with personalized content

**Password Recovery:**

1. User requests password reset via "Forgot Password"
2. System sends reset link to registered email
3. User creates new password
4. System confirms password change

### 2.2 Property Search and Browsing

**Basic Search Flow:**

1. User enters search criteria (location, price range, property type)
2. System queries properties matching criteria (`GET /api/properties/search`)
3. Results displayed with pagination
4. Empty results show appropriate message and search refinement suggestions

**Advanced Filtering:**

1. User applies additional filters (bedrooms, bathrooms, amenities)
2. System refines search results in real-time
3. User can sort results (price, newest, popularity)

**Location-Based Search:**

1. User selects location from dropdown or map
2. System fetches locations (`GET /api/locations` or `/api/locations/type/{type}`)
3. System displays properties in selected location
4. User can navigate to sub-locations (neighborhoods within a city)

### 2.3 Property Viewing and Details

**Property Detail Flow:**

1. User selects property from search results
2. System fetches property details (`GET /api/properties/{id}`)
3. System fetches property images (`GET /api/property-images/property/{propertyId}`)
4. System fetches property reviews (`GET /api/reviews/property/{propertyId}`)
5. System checks if property is bookmarked by user (`GET /api/bookmarks/check/{userId}/{propertyId}`)
6. System displays comprehensive property information
7. User can view image gallery, property specifications, location on map

**Similar Properties:**

1. System suggests similar properties based on location, price range, and type
2. User can navigate to suggested properties

### 2.4 Bookmarking Properties

**Add Bookmark Flow:**

1. User clicks "Bookmark" button on property
2. System checks if already bookmarked

3. If already bookmarked: No action or remove bookmark
4. If not bookmarked: Create bookmark (`POST /api/bookmarks`)

5. UI updates to show bookmarked status
6. Success message displayed

**View Bookmarks Flow:**

1. User navigates to "My Bookmarks" section
2. System fetches user's bookmarks (`GET /api/bookmarks/user/{userId}`)
3. System displays bookmarked properties with key information
4. User can filter or sort bookmarks

**Remove Bookmark Flow:**

1. User clicks "Remove" on a bookmarked property
2. System removes bookmark (`DELETE /api/bookmarks/user/{userId}/property/{propertyId}`)
3. UI updates to reflect removal
4. Success message displayed

### 2.5 Writing and Managing Reviews

**Submit Review Flow:**

1. User navigates to property details
2. User clicks "Write Review" button
3. System checks if user has already reviewed this property

4. If already reviewed: Edit existing review
5. If not reviewed: Show review form

6. User submits rating and comment
7. System validates input (rating range, comment length)
8. System creates review (`POST /api/reviews`)
9. Property page updates with new review
10. Success message displayed

**Edit Review Flow:**

1. User navigates to their review
2. User clicks "Edit" button
3. System displays form with current review data
4. User modifies rating or comment
5. System updates review (`PUT /api/reviews/{id}`)
6. Updated review displayed
7. Success message shown

**Delete Review Flow:**

1. User selects "Delete" on their review
2. System prompts for confirmation
3. User confirms deletion
4. System removes review (`DELETE /api/reviews/{id}`)
5. Review removed from property page
6. Success message displayed

### 2.6 User Profile Management

**View Profile Flow:**

1. User navigates to profile section
2. System fetches user data (`GET /api/users/{id}`)
3. System displays user information and activity

**Edit Profile Flow:**

1. User selects "Edit Profile"
2. System displays form with current user data
3. User modifies information (name, phone, etc.)
4. System validates input
5. System updates user data (`PUT /api/users/{id}`)
6. Updated profile displayed
7. Success message shown

**Change Password Flow:**

1. User selects "Change Password"
2. User enters current password and new password
3. System validates input (password strength, match)
4. System updates password
5. Success message displayed

## 3. Agent Journeys

### 3.1 Agent Registration and Verification

**Agent Registration Flow:**

1. User registers as normal user
2. User requests agent status (may require additional information)
3. Administrator reviews and approves agent status
4. User role updated to AGENT
5. Agent receives notification of approval

### 3.2 Property Management

**Property Listing Flow:**

1. Agent navigates to "My Properties" section
2. Agent selects "Add New Property"
3. System displays property creation form
4. Agent enters property details (title, description, price, location, etc.)
5. System validates input
6. System creates property (`POST /api/properties`)
7. Success message displayed
8. Agent directed to add images

**Property Editing Flow:**

1. Agent navigates to "My Properties"
2. System fetches agent's properties (`GET /api/properties/byOwner/{ownerId}`)
3. Agent selects property to edit
4. System displays form with current property data
5. Agent modifies information
6. System validates input
7. System updates property (`PUT /api/properties/{id}`)
8. Success message displayed

**Property Deletion Flow:**

1. Agent selects "Delete" on a property
2. System prompts for confirmation
3. Agent confirms deletion
4. System removes property and related data (`DELETE /api/properties/{id}`)
5. Property removed from listings
6. Success message displayed

### 3.3 Property Image Management

**Add Images Flow:**

1. Agent navigates to property image section
2. Agent uploads images or provides image URLs
3. Agent adds descriptions and sets primary image
4. System validates input (file size, format)
5. System adds images (`POST /api/property-images`)
6. Images displayed in property gallery
7. Success message shown

**Edit Images Flow:**

1. Agent selects image to edit
2. Agent modifies description or primary status
3. System updates image (`PUT /api/property-images/{id}`)
4. Updated image information displayed
5. Success message shown

**Set Primary Image Flow:**

1. Agent selects "Set as Primary" on an image
2. System updates image as primary (`PUT /api/property-images/{id}/set-primary`)
3. UI updates to show new primary image
4. Success message displayed

**Delete Images Flow:**

1. Agent selects "Delete" on an image
2. System prompts for confirmation
3. Agent confirms deletion
4. System removes image (`DELETE /api/property-images/{id}`)
5. Image removed from gallery
6. Success message displayed

### 3.4 Handling User Inquiries (Conceptual)

**Receive Inquiry Flow:**

1. User sends inquiry about property
2. System notifies agent of new inquiry
3. Agent views inquiry details

**Respond to Inquiry Flow:**

1. Agent navigates to inquiries section
2. Agent selects inquiry to respond to
3. Agent writes and sends response
4. System notifies user of response
5. Inquiry marked as responded

### 3.5 Agent Profile Management

**Agent Profile Flow:**

1. Agent navigates to profile section
2. System displays agent profile with professional information
3. Agent can edit profile details, specializations, and contact information
4. System updates agent profile
5. Updated profile displayed to users viewing agent's properties

## 4. Administrator Journeys

### 4.1 User Management

**View Users Flow:**

1. Admin navigates to user management section
2. System fetches all users (`GET /api/users`)
3. Admin can search, filter, and sort users
4. Admin can view detailed user information

**Edit User Flow:**

1. Admin selects user to edit
2. Admin modifies user information (including role)
3. System updates user (`PUT /api/users/{id}`)
4. Updated user information displayed

**Delete User Flow:**

1. Admin selects "Delete" on a user
2. System prompts for confirmation
3. Admin confirms deletion
4. System removes user (`DELETE /api/users/{id}`)
5. User removed from system
6. Success message displayed

### 4.2 Location Management

**Add Location Flow:**

1. Admin navigates to location management
2. Admin selects "Add Location"
3. Admin enters location details (name, type, coordinates)
4. System validates input
5. System creates location (`POST /api/locations`)
6. New location available in location hierarchy
7. Success message displayed

**Edit Location Flow:**

1. Admin selects location to edit
2. Admin modifies location information
3. System updates location (`PUT /api/locations/{id}`)
4. Updated location information displayed
5. Success message shown

**Move Location Flow:**

1. Admin selects "Move" on a location
2. Admin selects new parent location
3. System moves location (`PUT /api/locations/{id}/move/{newParentId}`)
4. Location hierarchy updated
5. Success message displayed

**Delete Location Flow:**

1. Admin selects "Delete" on a location
2. System prompts for confirmation
3. Admin confirms deletion
4. System removes location (`DELETE /api/locations/{id}`)
5. Location removed from hierarchy
6. Success message displayed

### 4.3 Property Oversight

**Review Properties Flow:**

1. Admin navigates to property management
2. System fetches all properties
3. Admin can search, filter, and sort properties
4. Admin can view detailed property information

**Moderate Reviews Flow:**

1. Admin navigates to review management
2. System fetches all reviews
3. Admin can filter reviews by property, user, or rating
4. Admin can edit or delete inappropriate reviews

## 5. Error Handling Scenarios

### 5.1 Authentication Errors

**Invalid Credentials:**

1. User enters incorrect email or password
2. System displays "Invalid email or password" message
3. Login form remains with cleared password field
4. User can retry or reset password

**Unauthorized Access:**

1. User attempts to access restricted resource
2. System returns 401 Unauthorized or 403 Forbidden
3. User redirected to login page or access denied page
4. Error message explains reason for denial

### 5.2 Resource Not Found

**Property Not Found:**

1. User accesses invalid property ID
2. System returns 404 Not Found
3. User shown "Property not found" page with search suggestions
4. User can navigate back to property listings

**User Not Found:**

1. System attempts to fetch non-existent user
2. System returns 404 Not Found
3. Appropriate error message displayed
4. User directed to relevant section

### 5.3 Validation Errors

**Invalid Property Data:**

1. Agent submits property with missing required fields
2. System validates input and returns 400 Bad Request
3. Form highlights invalid fields with specific error messages
4. Agent can correct errors and resubmit

**Invalid Review Data:**

1. User submits review with invalid rating or empty comment
2. System validates input and returns 400 Bad Request
3. Form highlights invalid fields with specific error messages
4. User can correct errors and resubmit

### 5.4 Conflict Errors

**Duplicate Email:**

1. User attempts to register with existing email
2. System returns 409 Conflict
3. Registration form shows "Email already in use" message
4. User can try different email or recover password

**Duplicate Review:**

1. User attempts to submit second review for same property
2. System returns 409 Conflict
3. User shown message that they've already reviewed this property
4. User directed to edit existing review

## 6. Security and Permission Enforcement

### 6.1 Authentication Enforcement

- All endpoints except public browsing require authentication
- JWT or session-based authentication validates user identity
- Tokens expire after set period for security
- Refresh token mechanism for seamless experience

### 6.2 Authorization Enforcement

- Role-based access control (RBAC) enforces permissions
- Endpoints check user role before processing requests
- Users can only modify their own data (except admins)
- Agents can only manage their own properties

### 6.3 Data Validation and Sanitization

- All user inputs validated on both client and server
- Input sanitization prevents XSS and injection attacks
- File uploads validated for type, size, and content
- Rate limiting prevents abuse of API endpoints

## 7. Cross-Functional Flows

### 7.1 Property Lifecycle

1. Agent creates property listing
2. Users view and bookmark property
3. Users submit reviews
4. Agent updates property details as needed
5. Property may be marked as sold/rented
6. Property may eventually be removed from system

### 7.2 User Interaction Flow

1. User searches for properties
2. User views property details
3. User bookmarks interesting properties
4. User contacts agent about property (conceptual)
5. User may visit property in person (outside system)
6. User may submit review after experience
7. User may remove bookmark if no longer interested

### 7.3 Location Hierarchy Navigation

1. User starts with broad location (city)
2. User narrows to specific neighborhood
3. User views properties in selected area
4. User may compare properties across neighborhoods
5. User may expand search to nearby areas
