export interface SalesFilters {
  customerRegion?: string[];
  gender?: string[];
  productCategory?: string[];
  paymentMethod?: string[];
  tags?: string[];
  ageMin?: number;
  ageMax?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface FilterOptions {
  regions: string[];
  genders: string[];
  categories: string[];
  paymentMethods: string[];
  tags: string[];
}

const BASE_URL = "http://localhost:3001";

/* ---------------- SALES API ---------------- */
export async function getSales(params: {
  search?: string;
  filters?: SalesFilters;
  sortBy?: string;
  sortOrder?: string;
  page: number;
  pageSize: number;
}) {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.sortBy) query.append("sortBy", params.sortBy);
  if (params.sortOrder) query.append("sortOrder", params.sortOrder);

  query.append("page", String(params.page));
  query.append("pageSize", String(params.pageSize));

  if (params.filters) {
    const f = params.filters;
    if (f.customerRegion?.length) query.append("regions", f.customerRegion.join(","));
    if (f.gender?.length) query.append("genders", f.gender.join(","));
    if (f.productCategory?.length) query.append("categories", f.productCategory.join(","));
    if (f.paymentMethod?.length) query.append("paymentMethods", f.paymentMethod.join(","));
    if (f.tags?.length) query.append("tags", f.tags.join(","));
    if (f.ageMin) query.append("ageMin", String(f.ageMin));
    if (f.ageMax) query.append("ageMax", String(f.ageMax));
    if (f.dateFrom) query.append("dateFrom", f.dateFrom);
    if (f.dateTo) query.append("dateTo", f.dateTo);
  }

  const res = await fetch(`${BASE_URL}/api/sales?${query.toString()}`);
  return res.json();
}

/* ---------------- FILTER OPTIONS API ---------------- */
export async function getFilterOptions(): Promise<FilterOptions> {
  const res = await fetch(`${BASE_URL}/api/sales/filter-options`);
  return res.json();
}
