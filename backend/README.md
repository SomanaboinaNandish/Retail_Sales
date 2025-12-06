# Backend - Retail Sales Management System

Backend API server for the Retail Sales Management System, built with Node.js and Express.

## Tech Stack

- **Node.js** (v18+) with ES Modules
- **Express.js** - Web framework
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## Architecture

The backend follows a layered architecture pattern:

```
Routes → Controllers → Services → Database
```

### Layers

- **Routes**: Define API endpoints and HTTP methods
- **Controllers**: Handle HTTP requests, parse parameters, send responses
- **Services**: Contain business logic and database interactions
- **Utils**: Helper functions for query building and database connection

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── salesController.js    # Sales endpoint handlers
│   ├── services/
│   │   └── salesService.js       # Sales business logic
│   ├── utils/
│   │   |   
│   │   └── queryBuilder.js      # Query construction helpers
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   └── salesRoutes.js       # Sales routes
│   └── index.js                 # Application entry point
├── package.json
├── .env                         # Environment variables
└── README.md
```

## API Endpoints

### GET /api/sales

Retrieve sales data with optional search, filters, sorting, and pagination.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search term for customer name or phone |
| customerRegion | string | Comma-separated regions |
| gender | string | Comma-separated genders |
| productCategory | string | Comma-separated categories |
| paymentMethod | string | Comma-separated payment methods |
| tags | string | Comma-separated tags |
| ageMin | number | Minimum age |
| ageMax | number | Maximum age |
| dateFrom | string | Start date (YYYY-MM-DD) |
| dateTo | string | End date (YYYY-MM-DD) |
| sortBy | string | Sort option (date-desc, date-asc, quantity-desc, quantity-asc, name-asc, name-desc) |
| page | number | Page number (default: 1) |
| pageSize | number | Items per page (default: 10) |

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### GET /api/sales/filter-options

Get available filter options from the database.

**Response:**
```json
{
  "success": true,
  "data": {
    "regions": ["North", "South", "East", "West"],
    "genders": ["Male", "Female"],
    "categories": ["Electronics", "Clothing", ...],
    "paymentMethods": ["Credit Card", "Cash", ...],
    "tags": ["Premium", "Sale", ...]
  }
}
```

### POST /api/sales

Create a new sale record.

**Request Body:**
```json
{
  "customer_id": "C001",
  "customer_name": "John Doe",
  "phone_number": "+1234567890",
  ...
}
```

### POST /api/sales/bulk

Create multiple sale records in bulk.

**Request Body:**
```json
[
  { "customer_id": "C001", ... },
  { "customer_id": "C002", ... }
]
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "API is running"
}
```

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- 

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

### 3. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## Development

### Adding New Endpoints

1. Create a service method in `src/services/`
2. Create a controller method in `src/controllers/`
3. Add a route in `src/routes/`

### Query Building

Use the `QueryBuilder` utility class for constructing database queries:

```javascript
import { QueryBuilder } from '../utils/queryBuilder.js';

const searchCondition = QueryBuilder.buildSearchConditions(searchTerm);
const filterConditions = QueryBuilder.buildFilterConditions(filters);
const sort = QueryBuilder.getSortColumn(sortBy);
const pagination = QueryBuilder.calculatePagination(page, pageSize);
```

## Error Handling

All API endpoints return a consistent error format:

```json
{
  "success": false,
  "error": "Error message"
}
```

HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 500: Internal Server Error

## Performance Considerations

- Database queries use indexes on frequently queried columns
- Pagination is handled at the database level
- Connection pooling via Supabase client
- Efficient query construction to avoid N+1 problems

## Security

- Environment variables for sensitive configuration
- CORS enabled for cross-origin requests
- Input validation in controllers
- Prepared statements via Supabase client (prevents SQL injection)
- Error handling to prevent information leakage

## Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```
