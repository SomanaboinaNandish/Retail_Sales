# Architecture Documentation

## Overview

This document describes the architecture of the Retail Sales Management System, a full-stack web application designed to manage and analyze retail sales data with advanced search, filtering, sorting, and pagination capabilities.

## System Architecture

The system follows a three-tier architecture:

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend Layer                       │
│  (React + TypeScript + Tailwind CSS + Vite)             │
└────────────────┬────────────────────────────────────────┘
                 │ HTTP/REST API
┌────────────────┴────────────────────────────────────────┐
│                     Backend Layer                        │
│     (Node.js + Express + Service/Controller Pattern)    │
└────────────────┬────────────────────────────────────────┘
                 │ Supabase Client
┌────────────────┴────────────────────────────────────────┐
│                    Database Layer                        │
│              (Supabase PostgreSQL)                       │
└──────────────────────────────────────────────────────────┘
```

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database Client**: @supabase/supabase-js
- **Database**: PostgreSQL (Supabase)

### Folder Structure

```
backend/
├── src/
│   ├── controllers/         # Request handlers
│   │   └── salesController.js
│   ├── services/           # Business logic
│   │   └── salesService.js
│   ├── utils/             # Utility functions
│   │   ├── supabase.js    # Database connection
│   │   └── queryBuilder.js # Query construction helpers
│   ├── routes/            # API route definitions
│   │   ├── index.js       # Main router
│   │   └── salesRoutes.js # Sales endpoints
│   └── index.js          # Application entry point
├── package.json
├── .env
└── .env.example
```

### Module Responsibilities

#### Controllers (`salesController.js`)
- Handle HTTP requests and responses
- Parse and validate query parameters
- Transform request data into service layer format
- Send appropriate HTTP status codes and responses

#### Services (`salesService.js`)
- Contain business logic
- Interact with the database through Supabase client
- Process and transform data
- Return structured responses with success/error states

#### Utils
- **`supabase.js`**: Initializes and exports the Supabase client singleton
- **`queryBuilder.js`**: Contains helper methods for building database queries
  - `buildSearchConditions()`: Constructs search queries
  - `buildFilterConditions()`: Constructs filter queries
  - `getSortColumn()`: Maps sort parameters to database columns
  - `calculatePagination()`: Calculates offset and limit for pagination

#### Routes
- Define API endpoints and HTTP methods
- Map routes to controller methods
- Organize endpoints by resource (sales)

### API Endpoints

#### `GET /api/sales`
Retrieves sales data with optional search, filters, sorting, and pagination.

**Query Parameters:**
- `search` (string): Search term for customer name or phone number
- `customerRegion` (string): Comma-separated list of regions
- `gender` (string): Comma-separated list of genders
- `productCategory` (string): Comma-separated list of categories
- `paymentMethod` (string): Comma-separated list of payment methods
- `tags` (string): Comma-separated list of tags
- `ageMin` (number): Minimum age filter
- `ageMax` (number): Maximum age filter
- `dateFrom` (string): Start date filter (YYYY-MM-DD)
- `dateTo` (string): End date filter (YYYY-MM-DD)
- `sortBy` (string): Sort option (date-desc, date-asc, quantity-desc, quantity-asc, name-asc, name-desc)
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10)

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

#### `GET /api/sales/filter-options`
Retrieves available filter options from the database.

**Response:**
```json
{
  "success": true,
  "data": {
    "regions": [...],
    "genders": [...],
    "categories": [...],
    "paymentMethods": [...],
    "tags": [...]
  }
}
```

#### `POST /api/sales`
Creates a new sale record.

#### `POST /api/sales/bulk`
Creates multiple sale records in bulk.

### Data Flow

1. **Request Reception**: Express router receives HTTP request
2. **Controller Processing**: Controller extracts and validates parameters
3. **Service Invocation**: Controller calls appropriate service method
4. **Query Building**: Service uses QueryBuilder to construct database query
5. **Database Interaction**: Service executes query via Supabase client
6. **Response Transformation**: Service formats response with success/error state
7. **HTTP Response**: Controller sends JSON response to client

## Frontend Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

### Folder Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── SalesTable.tsx
│   │   └── Pagination.tsx
│   ├── services/          # API communication
│   │   └── api.ts
│   ├── utils/            # Utility functions (future use)
│   ├── hooks/            # Custom React hooks (future use)
│   ├── styles/           # Additional styles (future use)
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### Component Responsibilities

#### `App.tsx` (Main Application)
- Manages application state (sales data, filters, pagination, etc.)
- Coordinates data fetching from API
- Handles user interactions (search, filter, sort, paginate)
- Composes child components into the main UI

#### `SearchBar.tsx`
- Displays search input field
- Handles search term changes
- Triggers search on Enter key or search button

#### `FilterPanel.tsx`
- Displays collapsible filter panel
- Manages multi-select filters (regions, genders, categories, etc.)
- Handles range filters (age, date)
- Shows active filter count badge
- Provides "Clear All" functionality

#### `SortDropdown.tsx`
- Displays sort options dropdown
- Handles sort option changes
- Updates parent component state

#### `SalesTable.tsx`
- Renders sales data in tabular format
- Displays loading spinner during data fetch
- Shows empty state when no results
- Formats data for display (dates, currency, tags)

#### `Pagination.tsx`
- Displays page controls (Previous, Next, page numbers)
- Shows current page information
- Handles page navigation
- Implements smart page number display with ellipsis

#### `api.ts` (API Service)
- Encapsulates all API communication
- Provides type-safe methods for API calls
- Builds query parameters from filter objects
- Handles response parsing and error handling

### State Management

The application uses React's built-in state management (useState) with the following key state:

- `sales`: Array of sale records
- `loading`: Loading state for data fetching
- `searchTerm`: Current search query
- `filters`: Active filter selections
- `sortBy`: Current sort option
- `currentPage`: Active page number
- `totalPages`: Total number of pages
- `totalItems`: Total number of records
- `filterOptions`: Available filter options from API

### Data Flow

1. **User Interaction**: User interacts with UI (search, filter, sort, paginate)
2. **State Update**: Component updates relevant state
3. **Effect Trigger**: useEffect hook detects state change
4. **API Call**: API service method is called with current state
5. **Data Fetch**: Request sent to backend via proxy
6. **State Update**: Response data updates component state
7. **Re-render**: React re-renders components with new data

## Database Schema

### Sales Table

```sql
CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Customer Information
  customer_id text NOT NULL,
  customer_name text NOT NULL,
  phone_number text NOT NULL,
  gender text NOT NULL,
  age integer NOT NULL,
  customer_region text NOT NULL,
  customer_type text NOT NULL,

  -- Product Information
  product_id text NOT NULL,
  product_name text NOT NULL,
  brand text NOT NULL,
  product_category text NOT NULL,
  tags text[] DEFAULT '{}',

  -- Sales Information
  quantity integer NOT NULL,
  price_per_unit decimal(10,2) NOT NULL,
  discount_percentage decimal(5,2) NOT NULL DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  final_amount decimal(10,2) NOT NULL,

  -- Operational Information
  date date NOT NULL,
  payment_method text NOT NULL,
  order_status text NOT NULL,
  delivery_type text NOT NULL,
  store_id text NOT NULL,
  store_location text NOT NULL,
  salesperson_id text NOT NULL,
  employee_name text NOT NULL,

  created_at timestamptz DEFAULT now()
);
```

### Indexes

Optimized indexes for search, filter, and sort operations:

- `idx_sales_customer_name`: For search and sorting by customer name
- `idx_sales_phone_number`: For phone number search
- `idx_sales_date`: For date filtering and sorting (DESC)
- `idx_sales_customer_region`: For region filtering
- `idx_sales_gender`: For gender filtering
- `idx_sales_age`: For age range filtering
- `idx_sales_product_category`: For category filtering
- `idx_sales_payment_method`: For payment method filtering
- `idx_sales_tags`: GIN index for array tag searching
- `idx_sales_quantity`: For quantity sorting

### Row Level Security (RLS)

RLS is enabled with public read access for demonstration purposes:

```sql
CREATE POLICY "Allow public read access to sales"
  ON sales FOR SELECT TO public USING (true);
```

## Key Design Decisions

### 1. Separation of Concerns
- Clear separation between frontend, backend, and database layers
- Backend follows MVC-like pattern (Routes → Controllers → Services)
- Frontend separates UI components from business logic

### 2. Type Safety
- TypeScript used in frontend for compile-time type checking
- Shared interfaces between API service and components
- Prevents runtime errors and improves developer experience

### 3. Query Optimization
- Database indexes on all filterable and sortable columns
- Pagination at database level to reduce data transfer
- Array overlap operator for efficient tag filtering

### 4. Stateless API
- Each API request is independent
- No server-side session management
- Enables horizontal scaling

### 5. Modular Components
- Each UI component has single responsibility
- Components are reusable and testable
- Clear props interfaces for component communication

### 6. User Experience
- Real-time search (triggers on input change)
- Preserves filter/search/sort state during pagination
- Loading states for better feedback
- Empty states for better guidance
- Responsive design for multiple screen sizes

## Performance Considerations

### Backend
- Database connection pooling via Supabase client
- Indexed columns for fast queries
- Pagination to limit result set size
- Efficient query construction to avoid N+1 problems

### Frontend
- Component-level re-rendering with React
- Debounced search input (via Enter key or button)
- Lazy loading of filter options
- Efficient state updates to minimize re-renders

## Security Considerations

### Backend
- Environment variables for sensitive configuration
- CORS enabled for cross-origin requests
- Input validation in controllers
- Error handling to prevent information leakage

### Database
- Row Level Security enabled
- Prepared statements via Supabase client (prevents SQL injection)
- Read-only access for public endpoints

## Scalability

The architecture supports horizontal scaling:

- **Frontend**: Static files can be served from CDN
- **Backend**: Stateless API can run on multiple instances
- **Database**: Supabase handles scaling automatically

## Future Enhancements

Potential areas for improvement:

1. Add user authentication and authorization
2. Implement caching layer (Redis) for frequent queries
3. Add real-time updates with WebSockets
4. Implement export functionality (CSV, Excel)
5. Add data visualization dashboards
6. Implement audit logging
7. Add advanced analytics and reporting
8. Implement bulk operations (update, delete)
9. Add API rate limiting
10. Implement comprehensive error tracking
