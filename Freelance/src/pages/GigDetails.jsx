import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import toast from 'react-hot-toast';
import BidModal from '../components/BidModal';
import BidsList from '../components/BidsList';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bids, setBids] = useState([]);
  const [loadingBids, setLoadingBids] = useState(false);

  const fetchGigDetails = async () => {
    try {
      const response = await api.get(`/gigs/${id}`);
      setGig(response.data.gig);
    } catch (error) {
      toast.error('Failed to load gig details');
      navigate('/gigs');
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    if (!user || !gig) return;
    
    const gigOwnerId = gig.ownerId._id || gig.ownerId;
    if (gigOwnerId !== user._id) return;
    
    setLoadingBids(true);
    try {
      const response = await api.get(`/bids/${id}`);
      setBids(response.data.bids);
    } catch (error) {
      toast.error('Failed to load bids');
    } finally {
      setLoadingBids(false);
    }
  };

  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  useEffect(() => {
    if (gig && user) {
      fetchBids();
    }
  }, [gig, user]);

  const handleBidSubmitted = () => {
    setShowBidModal(false);
    toast.success('Bid submitted successfully!');
  };

  const handleHireFreelancer = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      toast.success('Freelancer hired successfully!');
      fetchGigDetails();
      fetchBids();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A48192]"></div>
      </div>
    );
  }

  const isOwner = user && gig && user._id === gig.ownerId;
  const canBid = user && !isOwner && gig.status === 'open';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/gigs')}
          className="mb-6 text-[#A48192] hover:text-[#5A444A] flex items-center gap-2 font-medium"
        >
          ← Back to Gigs
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{gig.title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                gig.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {gig.status}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{gig.description}</p>
          </div>

          <div className="flex items-center gap-8 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Budget</h3>
              <p className="text-3xl font-bold text-[#A48192]">${gig.budget}</p>
            </div>
          </div>

          {canBid && (
            <button
              onClick={() => setShowBidModal(true)}
              className="w-full bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Place a Bid
            </button>
          )}

          {isOwner && gig.status === 'assigned' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                ✓ This gig has been assigned to a freelancer
              </p>
            </div>
          )}
        </div>

        {isOwner && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Bids ({bids.length})
            </h2>
            {loadingBids ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A48192]"></div>
              </div>
            ) : (
              <BidsList
                bids={bids}
                gigStatus={gig.status}
                onHire={handleHireFreelancer}
              />
            )}
          </div>
        )}
      </div>

      {showBidModal && (
        <BidModal
          gigId={id}
          onClose={() => setShowBidModal(false)}
          onSuccess={handleBidSubmitted}
        />
      )}
    </div>
  );
};

export default GigDetails;
