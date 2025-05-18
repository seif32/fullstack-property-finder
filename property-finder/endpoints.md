# 📚 Bookmark API Documentation

Base URL: `/api/bookmarks`

---

## 📥 GET `/api/bookmarks`

Retrieve all bookmarks.

- **Request Body:** _None_
- **Response:**

  ```json
  [
    {
      "id": 1,
      "userId": 2,
      "propertyId": 5,
      "property": {
        "id": 5,
        "title": "Luxury Apartment",
        "description": "Nice place",
        "price": 500000,
        "location": "Downtown",
        "bedrooms": 2,
        "bathrooms": 2,
        "area": 120,
        "propertyType": "Apartment",
        "listingType": "Sale",
        "ownerId": 7,
        "ownerName": "John Doe"
      },
      "createdAt": "2024-05-13T12:00:00"
    }
  ]
  ```

---

## 📥 GET `/api/bookmarks/{id}`

Retrieve a bookmark by its ID.

- **Path Parameter:** `id` (Long) – Bookmark ID
- **Request Body:** _None_
- **Response:** Same structure as above (a single object)
- **404:** If not found

---

## 📥 GET `/api/bookmarks/user/{userId}`

Retrieve all bookmarks by a specific user.

- **Path Parameter:** `userId` (Long)
- **Response:** List of `BookmarkDTO`

---

## 📥 GET `/api/bookmarks/property/{propertyId}`

Retrieve all bookmarks for a specific property.

- **Path Parameter:** `propertyId` (Long)
- **Response:** List of `BookmarkDTO`

---

## 📥 GET `/api/bookmarks/check/{userId}/{propertyId}`

Check if a property is bookmarked by a user.

- **Path Parameters:**

  - `userId` (Long)
  - `propertyId` (Long)

- **Response:**

  ```json
  true
  ```

---

## ➕ POST `/api/bookmarks`

Create a new bookmark.

- **Request Body:**

  ```json
  {
    "userId": 2,
    "propertyId": 5
  }
  ```

- **Response (201 Created):**

  ```json
  {
    "id": 1,
    "userId": 2,
    "propertyId": 5,
    "property": { ... },
    "createdAt": "2024-05-13T12:00:00"
  }
  ```

- **409 Conflict:** If bookmark already exists or data is invalid

---

## ❌ DELETE `/api/bookmarks/{id}`

Delete a bookmark by ID.

- **Path Parameter:** `id` (Long)
- **Response:** `204 No Content` on success
- **404:** If not found

---

## ❌ DELETE `/api/bookmarks/user/{userId}/property/{propertyId}`

Delete a bookmark by user and property combination.

- **Path Parameters:**

  - `userId` (Long)
  - `propertyId` (Long)

- **Response:** `204 No Content` on success
- **404:** If not found

Here's the **Markdown API documentation** for the `LocationController`, structured and readable for technical or public reference.

---

# 🌍 Location API Documentation

Base URL: `/api/locations`

---

## 📥 GET `/api/locations`

Retrieve all locations.

- **Request Body:** _None_
- **Response:**
  Array of `LocationDTO` objects.

  ```json
  [
    {
      "id": 1,
      "name": "Cairo",
      "description": "Capital of Egypt",
      "type": "City",
      "parentLocationId": null,
      "parentLocationName": null,
      "subLocations": [ ... ],
      "latitude": 30.0444,
      "longitude": 31.2357,
      "createdAt": "2024-05-13T10:00:00"
    }
  ]
  ```

---

## 📥 GET `/api/locations/{id}`

Get a specific location by ID.

- **Path Parameter:** `id` (Long)
- **Response:** A `LocationDTO` object
- **404:** If not found

---

## 📥 GET `/api/locations/type/{type}`

Get locations by type (e.g., City, Neighborhood, District).

- **Path Parameter:** `type` (String)
- **Response:** Array of `LocationDTO`

---

## 📥 GET `/api/locations/parent/{parentLocationId}`

Get all sub-locations for a parent location.

- **Path Parameter:** `parentLocationId` (Long)
- **Response:** Array of `LocationDTO`

---

## 📥 GET `/api/locations/root`

Get all root locations (i.e., without parent).

- **Request Body:** _None_
- **Response:** Array of `LocationDTO`

---

## 📥 GET `/api/locations/search?name={name}`

Search locations by name (case-insensitive).

- **Query Parameter:** `name` (String)
- **Response:** Array of `LocationDTO`

---

## 📥 GET `/api/locations/city/{cityName}/neighborhoods`

Get all neighborhoods under a specific city.

- **Path Parameter:** `cityName` (String)
- **Response:** Array of `LocationDTO`

---

## 📥 GET `/api/locations/nearby?latitude={lat}&longitude={lng}&radiusInKm={radius}`

Get nearby locations based on latitude, longitude, and radius.

- **Query Parameters:**

  - `latitude` (Double) – Required
  - `longitude` (Double) – Required
  - `radiusInKm` (Double) – Optional (default: 5.0)

- **Response:** Array of `LocationDTO`

---

## ➕ POST `/api/locations`

Create a new location.

- **Request Body:**

  ```json
  {
    "name": "Maadi",
    "description": "Residential area",
    "type": "Neighborhood",
    "parentLocationId": 1,
    "latitude": 29.9603,
    "longitude": 31.261
  }
  ```

- **Response (201 Created):** Returns the created `LocationDTO`

---

## ✏️ PUT `/api/locations/{id}`

Update an existing location by ID.

- **Path Parameter:** `id` (Long)
- **Request Body:** Same structure as POST
- **Response:** Updated `LocationDTO`
- **404:** If location not found

---

## 🔁 PUT `/api/locations/{id}/move/{newParentId}`

Move a location under a new parent location.

- **Path Parameters:**

  - `id` (Long) – ID of the location to move
  - `newParentId` (Long) – New parent location ID

- **Response:**

  - `200 OK` if successful
  - `400 Bad Request` if operation fails

---

## ❌ DELETE `/api/locations/{id}`

Delete a location by ID.

- **Path Parameter:** `id` (Long)
- **Response:**

  - `204 No Content` on success
  - `404 Not Found` if not found

Here is the **Markdown API documentation** for the `PropertyController` endpoints. It's structured to clearly show each endpoint, request body (if needed), and the expected response.

---

# 🏘️ Property API Documentation

Base URL: `/api/properties`

---

## 📥 GET `/api/properties`

Get all properties.

- **Request Body:** _None_
- **Response:**

  ```json
  [
    {
      "id": 1,
      "title": "Modern Apartment",
      "description": "Spacious and sunny",
      "price": 750000,
      "location": "Zamalek",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 150.0,
      "propertyType": "Apartment",
      "listingType": "Sale",
      "ownerId": 4,
      "ownerName": "Jane Doe"
    }
  ]
  ```

---

## 📥 GET `/api/properties/{id}`

Get a specific property by ID.

- **Path Parameter:** `id` (Long)
- **Response:** `PropertyDTO`
- **404:** If property is not found

---

## 🔍 GET `/api/properties/search`

Search for properties using optional filters.

- **Query Parameters (all optional):**

  - `location` (String)
  - `minPrice` (BigDecimal)
  - `maxPrice` (BigDecimal)
  - `bedrooms` (Integer)
  - `propertyType` (String)
  - `listingType` (String)

- **Response:** List of matching `PropertyDTO` objects

---

## 📥 GET `/api/properties/byOwner/{ownerId}`

Get properties listed by a specific owner.

- **Path Parameter:** `ownerId` (Long)
- **Response:** Array of `PropertyDTO`

---

## ➕ POST `/api/properties`

Create a new property listing.

- **Request Body:**

  ```json
  {
    "title": "Cozy Villa",
    "description": "With private garden",
    "price": 1200000,
    "location": "6th October",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 250.0,
    "propertyType": "Villa",
    "listingType": "Sale",
    "ownerId": 7
  }
  ```

- **Response (201 Created):** Newly created `PropertyDTO`

---

## ✏️ PUT `/api/properties/{id}`

Update an existing property by ID.

- **Path Parameter:** `id` (Long)
- **Request Body:** Same structure as POST
- **Response:** Updated `PropertyDTO`
- **404:** If property is not found

---

## ❌ DELETE `/api/properties/{id}`

Delete a property listing by ID.

- **Path Parameter:** `id` (Long)
- **Response:**

  - `204 No Content` if successful
  - `404 Not Found` if property does not exist

Here is the **Markdown API documentation** for the `PropertyImageController`, clearly documenting all endpoints, request bodies, and responses.

---

# 🖼️ Property Image API Documentation

Base URL: `/api/property-images`

---

## 📥 GET `/api/property-images`

Retrieve all property images.

- **Response:**

  ```json
  [
    {
      "id": 1,
      "propertyId": 101,
      "imageUrl": "https://example.com/image1.jpg",
      "description": "Front view",
      "isPrimary": true,
      "createdAt": "2024-05-13T09:00:00"
    }
  ]
  ```

---

## 📥 GET `/api/property-images/{id}`

Get a specific image by ID.

- **Path Parameter:** `id` (Long)
- **Response:** `PropertyImageDTO`
- **404:** If not found

---

## 📥 GET `/api/property-images/property/{propertyId}`

Get all images for a specific property.

- **Path Parameter:** `propertyId` (Long)
- **Response:** Array of `PropertyImageDTO`

---

## 📥 GET `/api/property-images/property/{propertyId}/primary`

Get the primary image for a property.

- **Path Parameter:** `propertyId` (Long)
- **Response:** `PropertyImageDTO`
- **404:** If not found

---

## 📥 GET `/api/property-images/property/{propertyId}/non-primary`

Get all non-primary images for a property.

- **Path Parameter:** `propertyId` (Long)
- **Response:** Array of `PropertyImageDTO`

---

## ➕ POST `/api/property-images`

Add a new property image.

- **Request Body:**

  ```json
  {
    "propertyId": 101,
    "imageUrl": "https://example.com/image1.jpg",
    "description": "Living room",
    "isPrimary": false
  }
  ```

- **Response (201 Created):** `PropertyImageDTO`
- **400 Bad Request:** If data is invalid

---

## ✏️ PUT `/api/property-images/{id}`

Update an image’s URL, description, or primary status.

- **Path Parameter:** `id` (Long)
- **Request Body:**

  ```json
  {
    "imageUrl": "https://example.com/updated.jpg",
    "description": "Updated description",
    "isPrimary": true
  }
  ```

- **Response:** Updated `PropertyImageDTO`
- **404:** If image not found

---

## ⭐ PUT `/api/property-images/{id}/set-primary`

Set a specific image as the primary image for its property.

- **Path Parameter:** `id` (Long)
- **Response:**

  - `200 OK` if successful
  - `404 Not Found` if the image doesn't exist

---

## ❌ DELETE `/api/property-images/{id}`

Delete an image by its ID.

- **Path Parameter:** `id` (Long)
- **Response:**

  - `204 No Content` if deleted
  - `404 Not Found` if not found

---

## ❌ DELETE `/api/property-images/property/{propertyId}`

Delete **all** images for a given property.

- **Path Parameter:** `propertyId` (Long)
- **Response:** `204 No Content`

Here is the **Markdown API documentation** for the `ReviewController`. It describes each endpoint, request/response structure, and usage.

---

# 📝 Review API Documentation

Base URL: `/api/reviews`

---

## 📥 GET `/api/reviews`

Retrieve all reviews.

- **Response:**

  ```json
  [
    {
      "id": 1,
      "propertyId": 101,
      "userId": 5,
      "rating": 4,
      "comment": "Great place!",
      "userName": "Jane Doe",
      "propertyTitle": "Modern Apartment",
      "createdAt": "2024-05-12T15:00:00",
      "updatedAt": "2024-05-12T15:00:00"
    }
  ]
  ```

---

## 📥 GET `/api/reviews/{id}`

Retrieve a specific review by ID.

- **Path Parameter:** `id` (Long)
- **Response:** `ReviewDTO`
- **404:** If not found

---

## 📥 GET `/api/reviews/property/{propertyId}`

Get all reviews for a specific property.

- **Path Parameter:** `propertyId` (Long)
- **Response:** Array of `ReviewDTO`

---

## 📥 GET `/api/reviews/user/{userId}`

Get all reviews submitted by a specific user.

- **Path Parameter:** `userId` (Long)
- **Response:** Array of `ReviewDTO`

---

## 📊 GET `/api/reviews/property/{propertyId}/stats`

Get average rating and review count for a property.

- **Path Parameter:** `propertyId` (Long)
- **Response:**

  ```json
  {
    "averageRating": 4.5,
    "reviewCount": 12
  }
  ```

---

## 🕓 GET `/api/reviews/recent?limit={limit}`

Get the most recent reviews.

- **Query Parameter:** `limit` (int, default: 10)
- **Response:** Array of `ReviewDTO`

---

## ➕ POST `/api/reviews`

Create a new review.

- **Request Body:**

  ```json
  {
    "propertyId": 101,
    "userId": 5,
    "rating": 5,
    "comment": "Excellent!"
  }
  ```

- **Response (201 Created):** `ReviewDTO` with full details
- **400 Bad Request:** If user already reviewed or data is invalid

---

## ✏️ PUT `/api/reviews/{id}`

Update an existing review.

- **Path Parameter:** `id` (Long)
- **Request Body:**

  ```json
  {
    "rating": 4,
    "comment": "Updated review comment"
  }
  ```

- **Response:** Updated `ReviewDTO`
- **404:** If review not found

---

## ❌ DELETE `/api/reviews/{id}`

Delete a review by its ID.

- **Path Parameter:** `id` (Long)
- **Response:**

  - `204 No Content` if deleted
  - `404 Not Found` if not found

---

Here is the **Markdown API documentation** for the `UserController`. This includes all user-related endpoints, with request and response formats.

---

# 👤 User API Documentation

Base URL: `/api/users`

---

## 📥 GET `/api/users`

Retrieve all users.

- **Response:**

  ```json
  [
    {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "1234567890",
      "role": "USER"
    }
  ]
  ```

---

## 📥 GET `/api/users/{id}`

Retrieve a specific user by ID.

- **Path Parameter:** `id` (Long)
- **Response:** `UserDTO`
- **404:** If not found

---

## ➕ POST `/api/users`

Create a new user.

- **Request Body:**

  ```json
  {
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "phoneNumber": "9876543210",
    "role": "ADMIN", // Optional, defaults to USER
    "password": "securepass123"
  }
  ```

- **Response (201 Created):** Created `UserDTO` (password not included)
- **409 Conflict:** If email is already in use

---

## ✏️ PUT `/api/users/{id}`

Update an existing user.

- **Path Parameter:** `id` (Long)
- **Request Body:** Same structure as POST
- **Response:** Updated `UserDTO`
- **404:** If user not found

---

## ❌ DELETE `/api/users/{id}`

Delete a user by ID.

- **Path Parameter:** `id` (Long)
- **Response:**

  - `204 No Content` if deleted
  - `404 Not Found` if not found

---

> ⚠️ **Note:** Password is only accepted in `POST`/`PUT` requests and is not returned in any response.

## 📘 Appointments API Documentation

### 📌 Base URL

```
/api/viewing-requests
```

---

### 🔹 1. Create a Viewing Request (User)

**Endpoint:**

```
POST /api/viewing-requests
```

**Description:**
Creates a new viewing request for a specific property. The agent is automatically determined based on the property's owner.

**Request Body (JSON):**

```json
{
  "userId": 12,
  "propertyId": 45,
  "requestedDateTime": "2025-06-01T14:00:00",
  "message": "I'd love to view the property this weekend."
}
```

**Response:**

```json
{
  "id": 101,
  "user": { "id": 12, "name": "John Doe", ... },
  "agent": { "id": 5, "name": "Agent Smith", ... },
  "property": { "id": 45, "title": "Modern Villa", ... },
  "requestedDateTime": "2025-06-01T14:00:00",
  "status": "PENDING",
  "message": "I'd love to view the property this weekend.",
  "createdAt": "2025-05-15T11:00:00"
}
```

**Possible Status Codes:**

- `201 Created` – Successfully created
- `404 Not Found` – User or Property does not exist
- `400 Bad Request` – Validation failed

---

### 🔹 2. Get Viewing Requests by Agent

**Endpoint:**

```
GET /api/viewing-requests/agent/{agentId}
```

**Description:**
Returns all viewing requests associated with a specific agent (i.e. properties owned by the agent).

**Path Parameter:**

- `agentId` – The agent’s user ID

**Example Response:**

```json
[
  {
    "id": 101,
    "user": { "id": 12, "name": "John Doe", ... },
    "agent": { "id": 5, "name": "Agent Smith", ... },
    "property": { "id": 45, "title": "Modern Villa", ... },
    "requestedDateTime": "2025-06-01T14:00:00",
    "status": "PENDING",
    "message": "I'd love to view the property this weekend.",
    "createdAt": "2025-05-15T11:00:00"
  }
]
```

**Possible Status Codes:**

- `200 OK` – Successfully retrieved
- `404 Not Found` – Agent ID invalid or has no requests

---

### 🔹 3. Update Viewing Request Status (Agent)

**Endpoint:**

```
PATCH /api/viewing-requests/{id}
```

**Description:**
Allows the agent to update the status of a viewing request (e.g., approve or decline).

**Path Parameter:**

- `id` – The ID of the viewing request

**Request Body:**

```json
{
  "status": "APPROVED"
}
```

**Accepted Status Values:**

- `PENDING`
- `APPROVED`
- `DECLINED`

**Response:**

```json
{
  "id": 101,
  "status": "APPROVED",
  "requestedDateTime": "2025-06-01T14:00:00",
  "message": "I'd love to view the property this weekend.",
  "createdAt": "2025-05-15T11:00:00"
}
```

**Possible Status Codes:**

- `200 OK` – Successfully updated
- `404 Not Found` – Request ID not found
- `400 Bad Request` – Invalid status value

---
