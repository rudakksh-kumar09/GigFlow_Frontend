const BidsList = ({ bids, gigStatus, onHire }) => {
  if (bids.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No bids received yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <div
          key={bid._id}
          className={`border rounded-lg p-6 ${
            bid.status === 'hired'
              ? 'bg-green-50 border-green-300'
              : bid.status === 'rejected'
              ? 'bg-gray-50 border-gray-300'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {bid.freelancerName || 'Freelancer'}
              </h3>
              <p className="text-sm text-gray-500">{bid.freelancerEmail}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">${bid.price}</p>
              <span
                className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  bid.status === 'hired'
                    ? 'bg-green-100 text-green-800'
                    : bid.status === 'rejected'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {bid.status}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Proposal</h4>
            <p className="text-gray-700">{bid.message}</p>
          </div>

          {bid.status === 'pending' && gigStatus === 'open' && (
            <button
              onClick={() => onHire(bid._id)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Hire This Freelancer
            </button>
          )}

          {bid.status === 'hired' && (
            <div className="bg-[#A48192] bg-opacity-20 text-[#5A444A] py-2 px-4 rounded-lg text-center font-bold border border-[#A48192]">
              ✓ Hired
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BidsList;
