import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import toast from 'react-hot-toast';

const MyGigs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const fetchMyGigs = async () => {
    try {
      const response = await api.get('/gigs');
      const myGigs = response.data.gigs.filter(
        (gig) => {
          const ownerId = gig.ownerId._id || gig.ownerId;
          return ownerId === user._id;
        }
      );
      setGigs(myGigs);
    } catch (error) {
      toast.error('Failed to load your gigs');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'assigned' 
      ? 'bg-[#A48192] text-white border-[#A48192]' 
      : 'bg-green-100 text-green-800 border-green-300';
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Posted Gigs</h1>
          <button
            onClick={() => navigate('/create-gig')}
            className="px-6 py-3 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white rounded-lg hover:scale-105 transition-transform font-semibold shadow-lg"
          >
            + Post New Gig
          </button>
        </div>

      {gigs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
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
          <h3 className="mt-4 text-xl font-medium text-gray-900">No gigs posted yet</h3>
          <p className="mt-2 text-gray-600">Get started by posting your first gig</p>
          <button
            onClick={() => navigate('/create-gig')}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white rounded-lg hover:scale-105 transition-transform font-semibold shadow-lg"
          >
            Post Your First Gig
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-[#A48192] transition overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 flex-1 pr-2">
                    {gig.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A48192] text-white">
                    {gig.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {gig.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="text-2xl font-bold text-[#A48192]">${gig.budget}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(gig.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/gigs/${gig._id}`)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white rounded-lg hover:scale-105 transition-transform font-medium shadow-md"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate('/received-bids')}
                    className="flex-1 px-4 py-2 bg-[#5A444A] text-white rounded-lg hover:bg-[#A48192] transition-colors font-medium shadow-md"
                  >
                    View Bids
                  </button>
                </div>
              </div>

              {gig.status === 'assigned' && (
                <div className="bg-[#A48192] bg-opacity-10 border-t-2 border-[#A48192] px-6 py-3">
                  <p className="text-sm text-[#A48192] font-medium">
                    ✓ Freelancer hired for this gig
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

export default MyGigs;
