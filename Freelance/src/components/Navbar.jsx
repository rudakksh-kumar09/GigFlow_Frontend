import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      toast.success('Logged out successfully');
      await new Promise(resolve => setTimeout(resolve, 100));
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-[#1A0B11] shadow-xl border-b border-[#301C2A]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-[#DCC9C2] hover:text-[#A48192] transition">
            GigFlow
          </Link>

          <div className="flex items-center gap-6">
            {user && (
              <>
                <Link
                  to="/gigs"
                  className="text-[#DCC9C2] hover:text-[#A48192] font-medium transition"
                >
                  Browse Gigs
                </Link>
                <Link
                  to="/my-gigs"
                  className="text-[#DCC9C2] hover:text-[#A48192] font-medium transition"
                >
                  Own Gigs
                </Link>
                <Link
                  to="/my-bids"
                  className="text-[#DCC9C2] hover:text-[#A48192] font-medium transition"
                >
                  My Bids
                </Link>
                <Link
                  to="/received-bids"
                  className="text-[#DCC9C2] hover:text-[#A48192] font-medium transition"
                >
                  Received Bids
                </Link>
                <Link
                  to="/create-gig"
                  className="text-[#DCC9C2] hover:text-[#A48192] font-medium transition"
                >
                  Post Gig
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-[#A48192]">Hello, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-[#A48192] text-[#1A0B11] px-4 py-2 rounded hover:bg-[#DCC9C2] transition font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-[#DCC9C2] hover:text-[#A48192] font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#A48192] text-[#1A0B11] px-4 py-2 rounded hover:bg-[#DCC9C2] transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
