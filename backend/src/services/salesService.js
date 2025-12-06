let SALES_DATA = [];

// called from index.js after CSV load
export function setSalesData(data) {
  SALES_DATA = data;
  console.log(" Data loaded:", SALES_DATA.length);
  console.log(" First record:", SALES_DATA[0]);
}

export function getAllSales() {
  return SALES_DATA;
}

// MAIN QUERY: search + filters + sort + pagination + KPIs
export function querySales(options) {
  const {
    search,
    regions = [],
    genders = [],
    categories = [],
    paymentMethods = [],
    tags = [],
    ageMin,
    ageMax,
    dateFrom,
    dateTo,
    sortBy = "date",      // "date" | "customerName" | "quantity"
    sortOrder = "desc",   // "asc" | "desc"
    page = 1,
    pageSize = 10,
  } = options;

  let result = [...SALES_DATA];

  //  1) SEARCH on customer_name + phone_number
  if (search && search.trim() !== "") {
    const s = search.toLowerCase();
    result = result.filter(
      (r) =>
        (r.customer_name && r.customer_name.toLowerCase().includes(s)) ||
        (r.phone_number && r.phone_number.toLowerCase().includes(s))
    );
  }

  //  2) FILTERS
  if (regions.length) {
    result = result.filter((r) => regions.includes(r.customer_region));
  }

  if (genders.length) {
    result = result.filter((r) => genders.includes(r.gender));
  }

  if (categories.length) {
    result = result.filter((r) => categories.includes(r.product_category));
  }

  if (paymentMethods.length) {
    result = result.filter((r) => paymentMethods.includes(r.payment_method));
  }

  if (tags.length) {
    result = result.filter(
      (r) =>
        Array.isArray(r.tags) &&
        r.tags.some((t) => tags.includes(t))
    );
  }

  if (ageMin != null || ageMax != null) {
    result = result.filter((r) => {
      const age = Number(r.age);
      if (Number.isNaN(age)) return false;
      if (ageMin != null && age < ageMin) return false;
      if (ageMax != null && age > ageMax) return false;
      return true;
    });
  }

  if (dateFrom || dateTo) {
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;

    result = result.filter((r) => {
      const d = new Date(r.date);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }

 // Sorting logic
if (sortBy === "date") {
  result.sort((a, b) =>
    (new Date(b.date) - new Date(a.date)) * (sortOrder === "asc" ? -1 : 1)
  );
}

if (sortBy === "customerName") {
  result.sort((a, b) =>
    a.customer_name.localeCompare(b.customer_name) *
    (sortOrder === "asc" ? 1 : -1)
  );
}

if (sortBy === "quantity") {
  result.sort((a, b) =>
    (b.quantity - a.quantity) * (sortOrder === "asc" ? -1 : 1)
  );
}


  //  4) KPIs on filtered result
  const totalUnitsSold = result.reduce(
    (sum, r) => sum + Number(r.quantity || 0),
    0
  );
  const totalRevenue = result.reduce(
    (sum, r) => sum + Number(r.final_amount || 0),
    0
  );
  const totalDiscount = result.reduce(
    (sum, r) =>
      sum +
      (Number(r.total_amount || 0) - Number(r.final_amount || 0)),
    0
  );

  //  5) PAGINATION
  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const paginated = result.slice(start, start + pageSize);

  return {
    data: paginated,
    total,
    totalPages,
    page: safePage,
    pageSize,
    totalUnitsSold,
    totalRevenue,
    totalDiscount,
  };
}
