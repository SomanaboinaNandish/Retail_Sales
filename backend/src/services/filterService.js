export function querySales({
  search,
  customerRegion,
  gender,
  productCategory,
  paymentMethod,
  tags,
  ageMin,
  ageMax,
  dateFrom,
  dateTo,
  sortBy,
  sortOrder,
  page,
  pageSize,
  data
}) {
  let result = [...data];

  // 🔍 Search: Customer Name + Phone Number
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(r =>
      r["Customer Name"]?.toLowerCase().includes(s) ||
      r["Phone Number"]?.toLowerCase().includes(s)
    );
  }

  // 🎯 Filters
  if (customerRegion?.length) {
    result = result.filter(r => customerRegion.includes(r["Customer Region"]));
  }

  if (gender?.length) {
    result = result.filter(r => gender.includes(r["Gender"]));
  }

  if (productCategory?.length) {
    result = result.filter(r => productCategory.includes(r["Product Category"]));
  }

  if (paymentMethod?.length) {
    result = result.filter(r => paymentMethod.includes(r["Payment Method"]));
  }

  if (tags?.length) {
    result = result.filter(r =>
      r["Tags"].some(tag => tags.includes(tag))
    );
  }

  if (ageMin || ageMax) {
    result = result.filter(r => {
      const age = Number(r["Age"]);
      if (ageMin && age < ageMin) return false;
      if (ageMax && age > ageMax) return false;
      return true;
    });
  }

  if (dateFrom || dateTo) {
    result = result.filter(r => {
      const d = new Date(r["Date"]);
      if (dateFrom && d < new Date(dateFrom)) return false;
      if (dateTo && d > new Date(dateTo)) return false;
      return true;
    });
  }

  // ↕ Sorting
  const multiplier = sortOrder === "asc" ? 1 : -1;
  if (sortBy === "date") {
    result.sort((a, b) =>
      (new Date(a["Date"]) - new Date(b["Date"])) * multiplier * -1
    );
  } else if (sortBy === "customerName") {
    result.sort((a, b) =>
      a["Customer Name"].localeCompare(b["Customer Name"]) * multiplier
    );
  } else if (sortBy === "quantity") {
    result.sort((a, b) =>
      (a["Quantity"] - b["Quantity"]) * multiplier
    );
  }

  // 📊 Stats
  const totalUnitsSold = result.reduce((sum, r) => sum + Number(r["Quantity"]), 0);
  const totalRevenue = result.reduce((sum, r) => sum + Number(r["Final Amount"]), 0);
  const totalDiscount = result.reduce((sum, r) => sum + Number(r["Total Amount"] - r["Final Amount"]), 0);

  // 📄 Pagination
  const total = result.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = result.slice((page - 1) * pageSize, page * pageSize);

  return {
    data: paginated,
    total,
    totalPages,
    totalUnitsSold,
    totalRevenue,
    totalDiscount
  };
}
