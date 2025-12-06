import { Loader2 } from "lucide-react";

interface Props {
  sales: any[];
  loading: boolean;
}

export function SalesTable({ sales, loading }: Props) {
  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );
  }

  if (sales.length === 0) {
    return <p className="text-center text-gray-500 p-6">No records found</p>;
  }

  return (
    <table className="min-w-full border-collapse text-sm">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-3 py-2 border">Customer Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Region</th>
          <th className="px-3 py-2 border">Category</th>
          <th className="px-3 py-2 border">Qty</th>
          <th className="px-3 py-2 border">Final Amount</th>
          <th className="px-3 py-2 border">Payment</th>
          <th className="px-3 py-2 border">Status</th>
        </tr>
      </thead>

      <tbody>
        {sales.map((s, index) => (
          <tr key={index} className="hover:bg-gray-50 border">
            <td className="px-3 py-2">{s.customer_name}</td>
            <td className="px-3 py-2">{s.phone_number}</td>
            <td className="px-3 py-2">{s.customer_region}</td>
            <td className="px-3 py-2">{s.product_category}</td>
            <td className="px-3 py-2 text-center">{s.quantity}</td>
            <td className="px-3 py-2 font-medium text-green-600">
              ₹{s.final_amount?.toLocaleString()}
            </td>
            <td className="px-3 py-2">{s.payment_method}</td>
            <td className="px-3 py-2">
              <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                {s.order_status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
