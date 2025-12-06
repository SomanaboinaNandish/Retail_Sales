import { importSalesData } from '../src/utils/importData.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Usage: node scripts/import.js <path-to-csv-file>');
  process.exit(1);
}

console.log(`Importing data from: ${csvFilePath}`);

importSalesData(csvFilePath)
  .then(() => {
    console.log('Import finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });
