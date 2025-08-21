import { AlertTriangle, Download } from "lucide-react";

const Fees = ({ fees }: any) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Total Fees</h4>
          <p className="text-2xl font-bold text-blue-600">
            ₦{fees.total.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Amount Paid</h4>
          <p className="text-2xl font-bold text-green-600">
            ₦{fees.paid.toLocaleString()}
          </p>
        </div>
        <div
          className={`rounded-lg p-4 ${fees.balance > 0 ? "bg-red-50" : "bg-green-50"}`}
        >
          <h4
            className={`font-medium ${fees.balance > 0 ? "text-red-900" : "text-green-900"}`}
          >
            Balance
          </h4>
          <p
            className={`text-2xl font-bold ${fees.balance > 0 ? "text-red-600" : "text-green-600"}`}
          >
            ₦{fees.balance.toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>

        <div className="overflow-x-auto border border-[#EAECF0]">
          <table className="w-full text-sm  divide-y divide-[#EAECF0]">
            <thead className="bg-[#F9FAFB]">
              <tr className="bg-gray-50">
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Term</th>
                <th className="text-right p-3">Amount</th>
                <th className="text-center p-3">Method</th>
                <th className="text-center p-3">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {fees.paymentHistory.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-[#EAECF0] hover:bg-gray-50"
                >
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3">{payment.term}</td>
                  <td className="p-3 text-right font-medium">
                    ₦{payment.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">{payment.method}</td>
                  <td className="p-3 text-center">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {fees.balance > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
            <div>
              <h4 className="font-medium text-red-900">Outstanding Balance</h4>
              <p className="text-sm text-red-700">
                Please clear the outstanding balance of ₦
                {fees.balance.toLocaleString()} to avoid any inconvenience.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
