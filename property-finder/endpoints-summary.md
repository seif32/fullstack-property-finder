# 🔗 API Endpoint Summary

---

## 📚 Bookmark Endpoints

- `GET /api/bookmarks` – Get all bookmarks
- `GET /api/bookmarks/{id}` – Get a specific bookmark by ID
- `GET /api/bookmarks/user/{userId}` – Get all bookmarks for a user
- `GET /api/bookmarks/property/{propertyId}` – Get all bookmarks for a property
- `GET /api/bookmarks/check/{userId}/{propertyId}` – Check if a user bookmarked a property
- `POST /api/bookmarks` – Create a new bookmark
- `DELETE /api/bookmarks/{id}` – Delete bookmark by ID
- `DELETE /api/bookmarks/user/{userId}/property/{propertyId}` – Delete bookmark by user and property

---

## 🌍 Location Endpoints

- `GET /api/locations` – Get all locations
- `GET /api/locations/{id}` – Get location by ID
- `GET /api/locations/type/{type}` – Get locations by type
- `GET /api/locations/parent/{parentLocationId}` – Get sub-locations under a parent
- `GET /api/locations/root` – Get root-level locations
- `GET /api/locations/search?name={name}` – Search locations by name
- `GET /api/locations/city/{cityName}/neighborhoods` – Get neighborhoods under a city
- `GET /api/locations/nearby?latitude={lat}&longitude={lng}&radiusInKm={radius}` – Get nearby locations
- `POST /api/locations` – Create a new location
- `PUT /api/locations/{id}` – Update a location
- `PUT /api/locations/{id}/move/{newParentId}` – Move location to a new parent
- `DELETE /api/locations/{id}` – Delete a location

---

## 🏘️ Property Endpoints

- `GET /api/properties` – Get all properties
- `GET /api/properties/{id}` – Get property by ID
- `GET /api/properties/search` – Search properties with filters
- `GET /api/properties/byOwner/{ownerId}` – Get properties by owner
- `POST /api/properties` – Create a new property
- `PUT /api/properties/{id}` – Update a property
- `DELETE /api/properties/{id}` – Delete a property

---

## 🖼️ Property Image Endpoints

- `GET /api/property-images` – Get all property images
- `GET /api/property-images/{id}` – Get image by ID
- `GET /api/property-images/property/{propertyId}` – Get all images for a property
- `GET /api/property-images/property/{propertyId}/primary` – Get primary image of a property
- `GET /api/property-images/property/{propertyId}/non-primary` – Get non-primary images of a property
- `POST /api/property-images` – Add a new property image
- `PUT /api/property-images/{id}` – Update a property image
- `PUT /api/property-images/{id}/set-primary` – Set image as primary for its property
- `DELETE /api/property-images/{id}` – Delete an image by ID
- `DELETE /api/property-images/property/{propertyId}` – Delete all images for a property

---

## 📝 Review Endpoints

- `GET /api/reviews` – Get all reviews
- `GET /api/reviews/{id}` – Get a review by ID
- `GET /api/reviews/property/{propertyId}` – Get reviews for a property
- `GET /api/reviews/user/{userId}` – Get reviews by a user
- `GET /api/reviews/property/{propertyId}/stats` – Get average rating and count
- `GET /api/reviews/recent?limit={limit}` – Get recent reviews
- `POST /api/reviews` – Create a new review
- `PUT /api/reviews/{id}` – Update a review
- `DELETE /api/reviews/{id}` – Delete a review

---

## 👤 User Endpoints

- `GET /api/users` – Get all users
- `GET /api/users/{id}` – Get a user by ID
- `POST /api/users` – Create a new user
- `PUT /api/users/{id}` – Update a user
- `DELETE /api/users/{id}` – Delete a user

---

Got it! Here's the **shortcut-style API documentation** for the `ViewingRequest` endpoints, following your format:

---

### 📅 **Appointments Endpoints**

#### **Create Viewing Request**

`POST /api/viewing-requests`
Create a new viewing request
📥 Request Body:

```json
{
  "userId": 12,
  "propertyId": 45,
  "requestedDateTime": "2025-06-01T14:00:00",
  "message": "I'd love to view the property this weekend."
}
```

---

#### **Get Viewing Requests by Agent**

`GET /api/viewing-requests/agent/{agentId}`
Fetch all viewing requests for properties owned by a specific agent
📌 Path Param: `agentId` (Long)

---

#### **Update Viewing Request Status**

`PATCH /api/viewing-requests/{id}`
Update status of a viewing request (`PENDING`, `APPROVED`, `DECLINED`)
📌 Path Param: `id` (Long)
📥 Request Body:

```json
{
  "status": "APPROVED"
}
```

## ✅ **All API Endpoints That Require a Firebase Token**

| HTTP Method | Endpoint               | Reason for Token Requirement                      |
| ----------- | ---------------------- | ------------------------------------------------- |
| `POST`      | `/api/properties`      | Create property (must be tied to a user)          |
| `PUT`       | `/api/properties/{id}` | Update property (owner/admin only)                |
| `DELETE`    | `/api/properties/{id}` | Delete property (owner/admin only)                |
| `POST`      | `/api/reviews`         | Create review (user-specific)                     |
| `PUT`       | `/api/reviews/{id}`    | Update review (only by author)                    |
| `DELETE`    | `/api/reviews/{id}`    | Delete review (author or property owner)          |
| `GET`       | `/api/users/me`        | Fetch current user info (based on Firebase email) |
| `POST`      | `/api/users`           | Register new user in backend                      |

---
