import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A0B11] text-white overflow-hidden">
      <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0B11 0%, #301C2A 100%)' }}>
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#5A444A] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#A48192] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#DCC9C2] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                Hire Top Talent or Find Your
                <span className="block mt-4 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] bg-clip-text text-transparent">
                  Dream Project
                </span>
              </h1>
              <p className="text-xl text-[#DCC9C2] mb-12 leading-relaxed">
                Join thousands of freelancers and clients connecting on GigFlow. 
                Post gigs, receive competitive bids, and grow your business with confidence.
              </p>
              <div className="flex gap-6 flex-wrap">
                {user ? (
                  <Link
                    to="/create-gig"
                    className="bg-transparent text-[#DCC9C2] px-10 py-5 rounded-xl font-bold text-lg border-2 border-[#DCC9C2] hover:bg-[#301C2A] transition-all shadow-2xl"
                  >
                    Post a Gig
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="bg-transparent text-[#DCC9C2] px-10 py-5 rounded-xl font-bold text-lg border-2 border-[#DCC9C2] hover:bg-[#301C2A] transition-all shadow-2xl"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>

            <div className="relative h-[500px] flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="relative w-64 h-64 animate-spin"
                    style={{ 
                      animationDuration: '20s',
                      transform: `rotateY(${scrollY * 0.5}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A48192] to-[#DCC9C2] opacity-40 rounded-3xl backdrop-blur-xl transform rotate-12 shadow-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-[#5A444A] to-[#A48192] opacity-30 rounded-3xl backdrop-blur-xl transform -rotate-12 translate-x-8 shadow-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#DCC9C2] to-[#301C2A] opacity-35 rounded-3xl backdrop-blur-xl transform rotate-45 translate-y-8 shadow-2xl"></div>
                  </div>
                </div>
                
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#DCC9C2] rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#A48192] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-[#5A444A] rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute w-1 h-96 bg-gradient-to-t from-transparent via-[#A48192] to-transparent opacity-50 animate-pulse transform rotate-45"></div>
                  <div className="absolute w-1 h-96 bg-gradient-to-t from-transparent via-[#DCC9C2] to-transparent opacity-50 animate-pulse transform -rotate-45" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#DCC9C2] rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#A48192] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#DCC9C2] rounded-full animate-bounce"></div>
      </section>

      <section 
        className="py-20 relative"
        style={{ 
          background: 'linear-gradient(135deg, #301C2A 0%, #5A444A 100%)',
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '5K+', label: 'Projects Posted' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-[#A48192] bg-opacity-30 backdrop-blur-lg p-8 rounded-2xl border border-[#DCC9C2] border-opacity-20 hover:scale-105 transition-transform"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-[#DCC9C2] to-white bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-[#DCC9C2] text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative" style={{ background: 'linear-gradient(135deg, #1A0B11 0%, #301C2A 100%)' }}>
        <div className="container mx-auto px-4">
          <div 
            className="text-center mb-20"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] bg-clip-text text-transparent">
              Why Choose GigFlow?
            </h2>
            <p className="text-xl md:text-2xl text-[#DCC9C2]">Everything you need to succeed in the freelance marketplace</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                ),
                title: 'Post Jobs Easily',
                description: 'Create detailed gig postings in minutes. Set your budget, deadline, and requirements to attract the right talent.'
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Competitive Bidding',
                description: 'Receive multiple proposals from qualified freelancers. Compare rates, reviews, and expertise to make the best choice.'
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: 'Real-Time Notifications',
                description: 'Stay updated with instant notifications. Get alerted when you receive bids or when you\'re hired for a project.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#A48192] to-[#5A444A] p-10 rounded-3xl hover:scale-105 transition-all duration-300 shadow-2xl border border-[#DCC9C2] border-opacity-30"
                style={{ 
                  transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="bg-[#1A0B11] w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                  <svg className="w-10 h-10 text-[#DCC9C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-[#DCC9C2] leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative" style={{ background: 'linear-gradient(135deg, #301C2A 0%, #5A444A 50%, #301C2A 100%)' }}>
        <div className="container mx-auto px-4">
          <div 
            className="text-center mb-20"
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">How It Works</h2>
            <p className="text-xl md:text-2xl text-[#DCC9C2]">Get started in three simple steps</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { number: '1', title: 'Create Your Account', text: 'Sign up in seconds. No credit card required. Start as a client, freelancer, or both!' },
                { number: '2', title: 'Post or Bid on Gigs', text: 'Create gig postings or browse and submit proposals on projects that match your skills.' },
                { number: '3', title: 'Connect & Collaborate', text: 'Review bids, hire talent, and get work done. Track everything in your dashboard.' }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="text-center"
                  style={{ transform: `translateY(${scrollY * 0.015 * (index + 1)}px)` }}
                >
                  <div className="bg-gradient-to-br from-[#A48192] to-[#DCC9C2] text-[#1A0B11] w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-8 shadow-2xl hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-[#DCC9C2] text-lg leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0B11 0%, #301C2A 100%)' }}>
        <div 
          className="absolute inset-0 opacity-10"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-10 left-20 w-96 h-96 bg-[#A48192] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#DCC9C2] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl text-[#DCC9C2] mb-12 max-w-3xl mx-auto leading-relaxed">
            Join GigFlow today and connect with talented professionals or find your next opportunity.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {user ? (
              <Link
                to="/create-gig"
                className="bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-[#1A0B11] px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
              >
                Post Your First Gig
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-[#A48192] to-[#DCC9C2] text-[#1A0B11] px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
                >
                  Sign Up Free
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent text-[#DCC9C2] px-10 py-5 rounded-xl font-bold text-lg border-2 border-[#DCC9C2] hover:bg-[#301C2A] transition-all shadow-2xl"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#1A0B11] border-t border-[#301C2A] py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#A48192] to-[#DCC9C2] bg-clip-text text-transparent">
              GigFlow
            </h3>
            <p className="text-[#DCC9C2]">Connecting talent with opportunity</p>
          </div>
          <div className="border-t border-[#301C2A] pt-6">
            <p className="text-[#A48192]">&copy; 2026 GigFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
