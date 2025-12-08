# Retail Sales Management System

A full-stack web application for managing and analyzing retail sales data with advanced search, filtering, sorting, and pagination capabilities.

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)

**Backend:**
- Node.js with ES Modules
- Express.js (Web Framework)

**Database:**
- mongodb

## Search Implementation Summary

The search functionality enables users to find sales records by customer name or phone number. It implements:

- **Case-insensitive search** using PostgreSQL's `ilike` operator
- **Multi-field search** across customer_name and phone_number columns
- **Real-time filtering** that works alongside other filters and sorting
- **Optimized queries** with database indexes on searchable fields
- **Backend query construction** using the `or` operator for flexible matching

The search triggers on Enter key press or button click, and automatically resets pagination to page 1 when new search terms are applied.

## Filter Implementation Summary

The filter system provides multi-select and range-based filtering across multiple dimensions:

- **Multi-select filters**: Customer Region, Gender, Product Category, Payment Method, Tags
- **Range filters**: Age (min/max), Date (from/to)
- **Collapsible UI** with expandable sections for organized filter presentation
- **Active filter badge** showing count of applied filters
- **Clear all functionality** to reset filters instantly
- **Persistent state** maintained across pagination and sorting operations
- **Backend query optimization** using PostgreSQL's `IN` and comparison operators
- **Array overlap search** for tag filtering using GIN indexes

Filters work independently and in combination, allowing complex queries while maintaining performance through indexed database columns.

## Sorting Implementation Summary

The sorting feature allows users to order results by multiple criteria:

- **Date sorting**: Newest First (default) or Oldest First
- **Quantity sorting**: High to Low or Low to High
- **Customer Name sorting**: A-Z or Z-A
- **Dropdown interface** for easy sort selection
- **Backend sorting** using PostgreSQL ORDER BY clauses
- **Indexed columns** for optimized sort performance
- **Preserved filters** - sorting maintains all active search and filter states
- **Automatic pagination reset** to page 1 on sort change

The sort order is sent to the backend and applied at the database level, ensuring efficient handling of large datasets.

## Pagination Implementation Summary

The pagination system provides efficient navigation through large datasets:

- **Fixed page size** of 10 items per page
- **Next/Previous navigation** with disabled states at boundaries
- **Smart page number display** with ellipsis for large page counts
- **Current page highlighting** for clear visual feedback
- **Result counter** showing "Showing X to Y of Z results"
- **Backend pagination** using PostgreSQL LIMIT and OFFSET
- **Preserved state** - filters, search, and sort maintained across page changes
- **Smooth scrolling** to top on page change for better UX
- **Total count calculation** for accurate page count display

Pagination is handled at the database level, ensuring only the required records are transferred from the database to the client, maintaining performance with large datasets.

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env

PORT=3001
```

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env

```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Database Setup

The database schema is automatically created using Supabase migrations. Make sure your Supabase project is set up and the credentials are correctly configured in the `.env` files.

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173` to use the application.

## Project Structure

```
root/
├── backend/              # Backend API server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   ├── routes/       # API routes
│   │   └── index.js      # Entry point
│   └── package.json
├── frontend/             # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── services/     # API client
│   │   └── App.tsx       # Main component
│   └── package.json
├── docs/                 # Documentation
│   └── architecture.md   # Architecture details
└── README.md            # This file
```

## Features

- **Search**: Full-text search across customer names and phone numbers
- **Filtering**: Multi-select filters for regions, genders, categories, payment methods, and tags
- **Range Filters**: Age and date range filtering
- **Sorting**: Sort by date, quantity, or customer name
- **Pagination**: Navigate through results with 10 items per page
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant feedback on search and filter changes

## API Endpoints

- `GET /api/sales` - Retrieve sales data with optional filters
- `GET /api/sales/filter-options` - Get available filter options
- `POST /api/sales` - Create a new sale
- `POST /api/sales/bulk` - Bulk create sales records
- `GET /health` - Health check endpoint

For detailed API documentation, see the [Architecture Document](docs/architecture.md).
