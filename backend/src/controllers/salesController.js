import { querySales } from "../services/salesService.js";

export function getSales(req, res) {
  try {
    const {
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
    } = req.query;

    const result = querySales({
      search,
      regions: customerRegion ? customerRegion.split(",") : [],
      genders: gender ? gender.split(",") : [],
      categories: productCategory ? productCategory.split(",") : [],
      paymentMethods: paymentMethod ? paymentMethod.split(",") : [],
      tags: tags ? tags.split(",") : [],
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      sortBy: sortBy || "date",
      sortOrder: sortOrder || "desc",
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 10,
    });

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("getSales error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
