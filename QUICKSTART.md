# Quick Start Guide

Get the Retail Sales Management System up and running in minutes.

## Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)

## Step 1: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or use existing one
3. Go to Project Settings > API
4. Copy your:
   - Project URL
   - Anon/Public Key

## Step 2: Configure Environment

### Backend Configuration

Create `backend/.env`:
```env
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
PORT=3001
```

### Frontend Configuration

Create `frontend/.env`:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Step 4: Set Up Database

The database schema is already created via Supabase migrations. The `sales` table should already exist in your Supabase project.

## Step 5: Add Sample Data

Generate 100 sample sales records:

```bash
cd backend
npm run generate 100
```

Or import from CSV:

```bash
cd backend
npm run import path/to/your/data.csv
```

## Step 6: Start the Application

### Terminal 1 - Backend:
```bash
cd backend
npm start
```

Backend runs on: `http://localhost:3001`

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Step 7: Access the Application

Open your browser and go to: `http://localhost:5173`

You should see the Retail Sales Management interface with:
- Search bar
- Filter panel
- Sort dropdown
- Sales table
- Pagination controls

## Common Commands

### Backend Commands
```bash
npm start              # Start server
npm run dev           # Start with auto-reload
npm run generate 100  # Generate 100 sample records
npm run import file.csv  # Import from CSV
```

### Frontend Commands
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

## Testing the Features

1. **Search**: Type a customer name or phone number in the search bar
2. **Filter**: Click the "Filters" button and select options
3. **Sort**: Use the dropdown to change sort order
4. **Pagination**: Click page numbers or Previous/Next buttons

## Troubleshooting

### "Cannot connect to database"
- Verify Supabase credentials in `.env` files
- Check if Supabase project is active
- Ensure internet connection

### "Backend not responding"
- Check if backend is running on port 3001
- Look for port conflicts
- Check backend terminal for errors

### "Frontend build errors"
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run typecheck`
- Verify all dependencies are installed

### "No data showing"
- Generate sample data: `npm run generate 100`
- Check browser console for errors
- Verify API endpoint in network tab

## Next Steps

- Read the [Architecture Documentation](docs/architecture.md)
- Check the [Deployment Guide](DEPLOYMENT.md)
- Review API endpoints in [Backend README](backend/README.md)
- Explore component structure in [Frontend README](frontend/README.md)

## Need Help?

1. Check the main [README.md](README.md)
2. Review the [Architecture Document](docs/architecture.md)
3. Inspect browser console and backend logs
4. Verify environment variables are set correctly

## Pro Tips

- Use the filter panel to narrow down results before searching
- Combine multiple filters for complex queries
- Sort by date (newest first) to see recent sales
- Generate more data for testing pagination: `npm run generate 500`
- Use browser DevTools Network tab to inspect API calls
