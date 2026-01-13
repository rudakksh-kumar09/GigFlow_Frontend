import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGigs } from '../redux/slices/gigSlice';
import toast from 'react-hot-toast';

const Gigs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { gigs, loading } = useSelector((state) => state.gigs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGigs()).catch((error) => {
      toast.error('Failed to load gigs');
    });
  }, [dispatch]);

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Gigs</h1>
          {user && (
            <Link
              to="/create-gig"
              className="bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform font-semibold shadow-lg"
            >
              Post a Gig
            </Link>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search gigs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A48192] placeholder-gray-400 shadow-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#A48192]"></div>
            <p className="mt-4 text-gray-600">Loading gigs...</p>
          </div>
        ) : filteredGigs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-gray-600 text-lg">No gigs found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-xl hover:border-[#A48192] transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">
                    {gig.title}
                  </h3>
                  <span className="bg-[#A48192] text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {gig.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {gig.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-[#A48192]">
                      ${gig.budget}
                    </span>
                  </div>
                  <Link
                    to={`/gigs/${gig._id}`}
                    className="bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-semibold shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
