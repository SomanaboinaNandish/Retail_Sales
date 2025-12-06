# Frontend - Retail Sales Management System

Frontend application for the Retail Sales Management System, built with React, TypeScript, and Vite.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **@supabase/supabase-js** - Database client

## Features

- **Advanced Search**: Full-text search across customer names and phone numbers
- **Multi-select Filters**: Region, gender, category, payment method, and tags
- **Range Filters**: Age and date range filtering
- **Dynamic Sorting**: Sort by date, quantity, or customer name
- **Pagination**: Navigate through results with smart page controls
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Visual feedback during data fetching
- **Empty States**: Helpful messages when no results are found

## Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── SearchBar.tsx    # Search input component
│   │   ├── FilterPanel.tsx  # Filter sidebar component
│   │   ├── SortDropdown.tsx # Sort selector component
│   │   ├── SalesTable.tsx   # Data table component
│   │   └── Pagination.tsx   # Pagination controls
│   ├── services/            # API communication
│   │   └── api.ts          # API client and types
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Additional styles
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Components

### App.tsx
Main application component that:
- Manages application state
- Coordinates data fetching
- Handles user interactions
- Composes child components

### SearchBar
- Text input for searching
- Enter key support
- Real-time search functionality

### FilterPanel
- Collapsible filter sidebar
- Multi-select checkboxes
- Range inputs for age and date
- Active filter count badge
- Clear all filters button

### SortDropdown
- Dropdown selector for sort options
- Six sorting options (date, quantity, name)
- Visual indicator for current sort

### SalesTable
- Responsive data table
- Rich data display with icons
- Loading spinner
- Empty state message
- Formatted dates and currency

### Pagination
- Previous/Next navigation
- Smart page number display
- Result counter
- Disabled states at boundaries

## API Service

The `api.ts` file provides a type-safe API client:

```typescript
import { apiService } from './services/api';

// Get sales data
const result = await apiService.getSales({
  search: 'John',
  filters: {
    customerRegion: ['North', 'South'],
    gender: ['Male'],
    ageMin: 25,
    ageMax: 45
  },
  sortBy: 'date-desc',
  page: 1,
  pageSize: 10
});

// Get filter options
const options = await apiService.getFilterOptions();
```

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- Backend server running on port 3001

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

Build output will be in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

## Development

### Adding New Components

1. Create component file in `src/components/`
2. Define TypeScript interfaces for props
3. Use Tailwind CSS for styling
4. Import and use in parent component

### State Management

The application uses React's built-in state management:

```typescript
const [state, setState] = useState<Type>(initialValue);

useEffect(() => {
  // Side effects
}, [dependencies]);
```

### Styling

Tailwind CSS utility classes are used throughout:

```tsx
<div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
  Content
</div>
```

### TypeScript Types

All components and services use TypeScript for type safety:

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Configuration Files

### vite.config.ts
- Vite configuration
- API proxy setup
- Build optimization

### tailwind.config.js
- Tailwind CSS configuration
- Custom theme settings

### tsconfig.json
- TypeScript compiler options
- Path aliases
- Type checking rules

## Performance Optimization

- Component-level re-rendering
- Debounced search input
- Lazy loading of filter options
- Efficient state updates
- Optimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML elements
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels where appropriate

## Dependencies

```json
{
  "@supabase/supabase-js": "^2.57.4",
  "lucide-react": "^0.344.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

## DevDependencies

```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "typescript": "^5.5.3",
  "vite": "^5.4.2",
  "tailwindcss": "^3.4.1",
  "autoprefixer": "^10.4.18",
  "postcss": "^8.4.35"
}
```
