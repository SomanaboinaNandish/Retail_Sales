// backend/src/utils/buildQueryOptions.js

export function buildQueryOptions(query) {
  const parseArray = (value) =>
    value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

  return {
    search: query.search || "",
    regions: parseArray(query.customerRegion),
    genders: parseArray(query.gender),
    categories: parseArray(query.productCategory),
    tags: parseArray(query.tags),
    paymentMethods: parseArray(query.paymentMethod),

    ageMin: query.ageMin ? Number(query.ageMin) : null,
    ageMax: query.ageMax ? Number(query.ageMax) : null,

    dateFrom: query.dateFrom ? new Date(query.dateFrom) : null,
    dateTo: query.dateTo ? new Date(query.dateTo) : null,

    sortBy: query.sortBy || "date",
    sortOrder: query.sortOrder || "desc",

    page: query.page ? Number(query.page) : 1,
    pageSize: query.pageSize ? Number(query.pageSize) : 10,
  };
}
