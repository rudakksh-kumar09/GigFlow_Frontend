import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import toast from 'react-hot-toast';

const MyBids = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchMyBids();
  }, []);

  const fetchMyBids = async () => {
    try {
      const response = await api.get('/bids/my-bids');
      setBids(response.data.submittedBids);
      setRole('freelancer');
    } catch (error) {
      toast.error('Failed to load bids');
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (bidId) => {
    if (!window.confirm('Are you sure you want to hire this freelancer?')) return;

    try {
      await api.patch(`/bids/${bidId}/hire`);
      toast.success('Freelancer hired successfully!');
      fetchMyBids();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {role === 'client' ? 'Bids Received on My Gigs' : 'My Submitted Bids'}
        </h1>

        {bids.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-gray-600 text-lg">
              {role === 'client' 
                ? 'No bids received yet. Create a gig to start receiving bids!' 
                : 'You haven\'t submitted any bids yet. Browse gigs to get started!'}
            </p>
            <button
              onClick={() => navigate(role === 'client' ? '/create-gig' : '/gigs')}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white rounded-lg hover:scale-105 transition-transform font-semibold shadow-lg"
          >
            {role === 'client' ? 'Create a Gig' : 'Browse Gigs'}
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-xl hover:border-[#A48192] transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-[#A48192]"
                    onClick={() => navigate(`/gigs/${bid.gigId}`)}
                  >
                    {bid.gigTitle}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-600 mb-2">
                    <span>Budget: ${bid.gigBudget}</span>
                    <span>Bid Price: ${bid.price}</span>
                    <span className="capitalize">Gig Status: {bid.gigStatus}</span>
                  </div>
                  {role === 'client' && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Freelancer:</span> {bid.freelancerName} ({bid.freelancerEmail})
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bid.status)}`}>
                    {bid.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(bid.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Message:</span> {bid.message}
                </p>
              </div>

              {role === 'client' && bid.status === 'pending' && bid.gigStatus === 'open' && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleHire(bid._id)}
                    className="px-6 py-2 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white rounded-lg hover:scale-105 transition-transform font-semibold shadow-lg"
                  >
                    Hire Freelancer
                  </button>
                </div>
              )}

              {role === 'freelancer' && bid.status === 'hired' && (
                <div className="bg-[#A48192] bg-opacity-20 border-2 border-[#A48192] rounded-lg p-3">
                  <p className="text-[#5A444A] font-bold">
                    🎉 Congratulations! You've been hired for this gig.
                  </p>
                </div>
              )}

              {role === 'freelancer' && bid.status === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800">
                    This bid was not selected. Keep trying on other gigs!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MyBids;
