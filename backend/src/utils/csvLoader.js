import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { fileURLToPath } from "url";

// Convert ES module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV path
const CSV_PATH = path.join(__dirname, "..", "data", "sales.csv");

// Exported function
export async function loadSalesData() {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(CSV_PATH)
      .pipe(csvParser())
      .on("data", (row) => {
        results.push({
          id: row["Transaction ID"],
          date: row["Date"],
          customer_id: row["Customer ID"],
          customer_name: row["Customer Name"],
          phone_number: row["Phone Number"],
          gender: row["Gender"],
          age: Number(row["Age"]),
          customer_region: row["Customer Region"],
          customer_type: row["Customer Type"],
          product_id: row["Product ID"],
          product_name: row["Product Name"],
          brand: row["Brand"],
          product_category: row["Product Category"],
          tags: row["Tags"] ? row["Tags"].split(",") : [],
          quantity: Number(row["Quantity"]),
          price_per_unit: Number(row["Price per Unit"]),
          discount_percentage: Number(row["Discount Percentage"]),
          total_amount: Number(row["Total Amount"]),
          final_amount: Number(row["Final Amount"]),
          payment_method: row["Payment Method"],
          order_status: row["Order Status"],
          delivery_type: row["Delivery Type"],
          store_id: row["Store ID"],
          store_location: row["Store Location"],
          salesperson_id: row["Salesperson ID"],
          employee_name: row["Employee Name"],
        });
      })
      .on("end", () => {
        console.log(`🔥 Transformed ${results.length} records`);
        resolve(results);
      })
      .on("error", reject);
  });
}
