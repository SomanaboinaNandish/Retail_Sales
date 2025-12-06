import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { supabase } from './supabase.js';

export async function importSalesData(csvFilePath) {
  const records = [];
  const parser = createReadStream(csvFilePath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })
  );

  for await (const record of parser) {
    const saleRecord = {
      customer_id: record['Customer ID'] || record['customer_id'],
      customer_name: record['Customer Name'] || record['customer_name'],
      phone_number: record['Phone Number'] || record['phone_number'],
      gender: record['Gender'] || record['gender'],
      age: parseInt(record['Age'] || record['age']),
      customer_region: record['Customer Region'] || record['customer_region'],
      customer_type: record['Customer Type'] || record['customer_type'],
      product_id: record['Product ID'] || record['product_id'],
      product_name: record['Product Name'] || record['product_name'],
      brand: record['Brand'] || record['brand'],
      product_category: record['Product Category'] || record['product_category'],
      tags: record['Tags'] || record['tags']
        ? (record['Tags'] || record['tags']).split(',').map(t => t.trim())
        : [],
      quantity: parseInt(record['Quantity'] || record['quantity']),
      price_per_unit: parseFloat(record['Price per Unit'] || record['price_per_unit']),
      discount_percentage: parseFloat(record['Discount Percentage'] || record['discount_percentage'] || 0),
      total_amount: parseFloat(record['Total Amount'] || record['total_amount']),
      final_amount: parseFloat(record['Final Amount'] || record['final_amount']),
      date: record['Date'] || record['date'],
      payment_method: record['Payment Method'] || record['payment_method'],
      order_status: record['Order Status'] || record['order_status'],
      delivery_type: record['Delivery Type'] || record['delivery_type'],
      store_id: record['Store ID'] || record['store_id'],
      store_location: record['Store Location'] || record['store_location'],
      salesperson_id: record['Salesperson ID'] || record['salesperson_id'],
      employee_name: record['Employee Name'] || record['employee_name'],
    };

    records.push(saleRecord);

    if (records.length >= 100) {
      await insertBatch(records.splice(0, 100));
    }
  }

  if (records.length > 0) {
    await insertBatch(records);
  }

  console.log('Import completed successfully!');
}

async function insertBatch(records) {
  const { error } = await supabase
    .from('sales')
    .insert(records);

  if (error) {
    console.error('Error inserting batch:', error);
    throw error;
  }

  console.log(`Inserted ${records.length} records`);
}
