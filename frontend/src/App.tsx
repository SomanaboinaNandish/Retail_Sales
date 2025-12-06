import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { FilterPanel } from "./components/FilterPanel";
import { SortDropdown } from "./components/SortDropdown";
import { SalesTable } from "./components/SalesTable";
import { Pagination } from "./components/Pagination";
import { getSales, getFilterOptions, SalesFilters } from "./services/api";
import { ShoppingBag } from "lucide-react";

function App() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<SalesFilters>({});
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [totalUnitsSold, setTotalUnitsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    paymentMethods: [],
    tags: [],
  });

  const pageSize = 10;

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadSales();
  }, [searchTerm, filters, sortBy, sortOrder, currentPage]);

  const loadFilterOptions = async () => {
  try {
    const result: any = await getFilterOptions(); // 👈 force type so no TS error
    console.log("FILTER API RESPONSE:", result);

    const data = result?.data || result || {}; // Supports both types

    setFilterOptions({
      regions: data.regions || [],
      genders: data.genders || [],
      categories: data.categories || [],
      paymentMethods: data.paymentMethods || [],
      tags: data.tags || [],
    });

  } catch (error) {
    console.error("Filter options error:", error);

    setFilterOptions({
      regions: [],
      genders: [],
      categories: [],
      paymentMethods: [],
      tags: [],
    });
  }
};

  const loadSales = async () => {
    setLoading(true);
    try {
      const result = await getSales({
        search: searchTerm,
        filters,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
      });

      setSales(result.data || []);
      setTotalPages(result.totalPages || 1);
      setTotalItems(result.total || 0);

      // 🟢 Stats Update FIXED
      setTotalUnitsSold(result.totalUnitsSold || 0);
      setTotalRevenue(result.totalRevenue || 0);
      setTotalDiscount(result.totalDiscount || 0);

    } catch (error) {
      console.error("Sales fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFiltersChange = (updated: SalesFilters) => {
    setFilters(updated);
    setCurrentPage(1);
  };

 const handleSortChange = (value: string) => {
  const [field, order] = value.split("-");
  setSortBy(field);
  setSortOrder(order);
  setCurrentPage(1);
};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sales Management System</h1>
              <p className="text-sm text-gray-500">Track and manage your sales transactions</p>
            </div>
          </div>
        </div>
      </header>

 {/* MAIN CONTENT */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="space-y-6">

    {/* Search Bar */}
    <SearchBar
      value={searchTerm}
      onChange={setSearchTerm}
      onSearch={handleSearch}
    />

    {/* Filters + Sort */}
    <div className="flex flex-wrap gap-3 justify-between items-center">
      <FilterPanel
        filters={filters}
        filterOptions={filterOptions}
        onFiltersChange={handleFiltersChange}
      />
      <SortDropdown
        value={`${sortBy}-${sortOrder}`}
        onChange={handleSortChange}
      />
    </div>

    {/* Live KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg border p-4 shadow-sm text-center">
        <p className="text-sm text-gray-500">Total Sales Count</p>
        <p className="text-2xl font-bold">{totalItems}</p>
      </div>

      <div className="bg-white rounded-lg border p-4 shadow-sm text-center">
        <p className="text-sm text-gray-500">Revenue</p>
        <p className="text-2xl font-bold text-green-600">
          ₹{totalRevenue.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-lg border p-4 shadow-sm text-center">
        <p className="text-sm text-gray-500">Discount Given</p>
        <p className="text-2xl font-bold text-yellow-600">
          ₹{totalDiscount.toLocaleString()}
        </p>
      </div>
    </div>

    {/* SALES TABLE */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <SalesTable sales={sales} loading={loading} />
    </div>

    {/* PAGINATION */}
    {!loading && sales.length > 0 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={10}
      />
    )}
  </div>
</main>


    </div>
  );
}

export default App;
