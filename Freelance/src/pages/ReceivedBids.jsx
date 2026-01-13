import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import toast from 'react-hot-toast';

const ReceivedBids = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceivedBids();
  }, []);

  const fetchReceivedBids = async () => {
    try {
      const response = await api.get('/bids/my-bids');
      setBids(response.data.receivedBids);
    } catch (error) {
      toast.error('Failed to load bids');
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (bidId, gigTitle, freelancerName) => {
    if (!window.confirm(`Are you sure you want to hire ${freelancerName} for "${gigTitle}"?`)) {
      return;
    }

    try {
      await api.patch(`/bids/${bidId}/hire`);
      toast.success(`${freelancerName} hired successfully!`);
      fetchReceivedBids();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hired':
        return 'bg-[#A48192] text-white border-[#A48192]';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getGigStatusColor = (status) => {
    return status === 'assigned' 
      ? 'bg-[#A48192] text-white' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const bidsByGig = bids.reduce((acc, bid) => {
    if (!acc[bid.gigId]) {
      acc[bid.gigId] = {
        gigTitle: bid.gigTitle,
        gigBudget: bid.gigBudget,
        gigStatus: bid.gigStatus,
        bids: []
      };
    }
    acc[bid.gigId].bids.push(bid);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A48192]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Received Bids on My Gigs
          </h1>
          <button
            onClick={() => navigate('/my-bids')}
            className="px-4 py-2 text-[#A48192] hover:text-[#5A444A] font-medium"
          >
            View My Submitted Bids →
          </button>
        </div>

      {bids.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">No bids received yet</h3>
          <p className="mt-1 text-gray-500">Create a gig to start receiving bids from freelancers</p>
          <button
            onClick={() => navigate('/create-gig')}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white rounded-lg hover:scale-105 transition-transform font-semibold shadow-lg"
          >
            Create Your First Gig
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(bidsByGig).map(([gigId, gigData]) => (
            <div key={gigId} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-[#A48192] to-[#DCC9C2] px-6 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 
                      className="text-2xl font-bold text-white mb-2 cursor-pointer hover:underline"
                      onClick={() => navigate(`/gigs/${gigId}`)}
                    >
                      {gigData.gigTitle}
                    </h2>
                    <p className="text-white">
                      Budget: <span className="font-semibold">${gigData.gigBudget}</span>
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getGigStatusColor(gigData.gigStatus)}`}>
                    {gigData.gigStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {gigData.bids.length} {gigData.bids.length === 1 ? 'Bid' : 'Bids'} Received
                </h3>
                <div className="space-y-4">
                  {gigData.bids.map((bid) => (
                    <div
                      key={bid._id}
                      className={`border-2 rounded-lg p-5 transition-all ${
                        bid.status === 'hired' ? 'border-[#A48192] bg-[#A48192] bg-opacity-10' : 
                        bid.status === 'rejected' ? 'border-red-200 bg-gray-50' : 
                        'border-gray-200 hover:border-[#A48192] hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">
                              {bid.freelancerName}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(bid.status)}`}>
                              {bid.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{bid.freelancerEmail}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#A48192]">${bid.price}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(bid.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-1">Proposal:</p>
                        <p className="text-gray-800">{bid.message}</p>
                      </div>

                      {bid.status === 'pending' && gigData.gigStatus === 'open' && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleHire(bid._id, gigData.gigTitle, bid.freelancerName)}
                            className="px-6 py-2.5 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg"
                          >
                            ✓ Hire {bid.freelancerName}
                          </button>
                        </div>
                      )}

                      {bid.status === 'hired' && (
                        <div className="bg-[#A48192] bg-opacity-20 border-2 border-[#A48192] rounded-lg p-3 flex items-center gap-2">
                          <span className="text-2xl">🎉</span>
                          <p className="text-[#5A444A] font-bold">
                            You hired this freelancer! Gig status changed to ASSIGNED.
                          </p>
                        </div>
                      )}

                      {bid.status === 'rejected' && (
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                          <p className="text-gray-600 text-sm">
                            This bid was automatically rejected when you hired another freelancer.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default ReceivedBids;
