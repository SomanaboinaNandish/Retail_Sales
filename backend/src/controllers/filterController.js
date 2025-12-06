import { getAllSales } from "../services/salesService.js";

export function getFilterOptions(req, res) {
  try {
    const data = getAllSales();

    const regions = new Set();
    const genders = new Set();
    const categories = new Set();
    const paymentMethods = new Set();
    const tags = new Set();

    data.forEach(r => {
      if (r.customer_region) regions.add(r.customer_region);
      if (r.gender) genders.add(r.gender);
      if (r.product_category) categories.add(r.product_category);
      if (r.payment_method) paymentMethods.add(r.payment_method);
      if (Array.isArray(r.tags)) r.tags.forEach(t => tags.add(t));
    });

    return res.json({
      success: true,
      data: {
        regions: [...regions],
        genders: [...genders],
        categories: [...categories],
        paymentMethods: [...paymentMethods],
        tags: [...tags]
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
