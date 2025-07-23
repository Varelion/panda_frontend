import React from 'react';
import Header from '../shared/components/layout/Header';
import { staffMembers, staffStats } from '../data/staffData';

function OurFamilyPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Our Panda Family
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              More than employees, we're a family dedicated to serving our communities with love and respect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold themed-text-heavy mb-6">Our Story</h2>
              <p className="themed-text text-lg leading-relaxed mb-4">
                Founded by Andrew Cherng and his father Master Chef Ming-Tsai Cherng, Panda Express began 
                as a family business with a simple mission: to deliver exceptional Asian dining experiences.
              </p>
              <p className="themed-text text-lg leading-relaxed">
                Today, our family has grown to include thousands of associates across the country, 
                each committed to our values of respect, opportunity, and teamwork.
              </p>
            </div>
            
            <div className="themed-card p-8">
              <h3 className="text-2xl font-bold themed-text-heavy mb-4">Family Values</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#FFC72C] rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✓</span>
                  </div>
                  <span className="themed-text">Respect for all individuals</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#FFC72C] rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✓</span>
                  </div>
                  <span className="themed-text">Opportunities for growth</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#FFC72C] rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✓</span>
                  </div>
                  <span className="themed-text">Continuous learning</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#FFC72C] rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✓</span>
                  </div>
                  <span className="themed-text">Community engagement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Family Members Grid - 12 Staff Cards */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold themed-text-heavy text-center mb-8">Meet Our Family Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {staffMembers.map((member) => (
                <div key={member.id} className="themed-card p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#FFC72C] shadow-lg"
                    />
                    {member.featured && (
                      <div className="absolute -top-2 -right-2 bg-[#d1282e] text-white text-xs px-2 py-1 rounded-full font-bold">
                        Lead
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold themed-text-heavy mb-1">{member.name}</h3>
                  <div className="text-[#d1282e] font-semibold text-sm mb-3">{member.position}</div>
                  
                  <p className="themed-text text-xs leading-relaxed mb-4 h-16 overflow-hidden">
                    {member.description.substring(0, 120)}...
                  </p>
                  
                  {/* Experience Badge */}
                  <div className="mb-3">
                    <span className="bg-[#FFC72C] text-black px-3 py-1 rounded-full text-xs font-medium">
                      {member.experience}
                    </span>
                  </div>
                  
                  {/* Top Specialties */}
                  <div className="text-xs themed-text">
                    <div className="font-semibold mb-2">Key Skills:</div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.slice(0, 2).map((specialty, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center themed-card p-6">
              <div className="text-3xl font-bold text-[#d1282e] mb-2">{staffStats.totalEmployees}</div>
              <div className="themed-text font-medium">Family Members</div>
            </div>
            <div className="text-center themed-card p-6">
              <div className="text-3xl font-bold text-[#d1282e] mb-2">{staffStats.averageExperience}</div>
              <div className="themed-text font-medium">Avg Years Together</div>
            </div>
            <div className="text-center themed-card p-6">
              <div className="text-3xl font-bold text-[#d1282e] mb-2">{staffStats.satisfactionRate}</div>
              <div className="themed-text font-medium">Guest Happiness</div>
            </div>
            <div className="text-center themed-card p-6">
              <div className="text-3xl font-bold text-[#d1282e] mb-2">{staffStats.certifications}</div>
              <div className="themed-text font-medium">Training Completed</div>
            </div>
          </div>

          <div className="bg-[#d1282e] text-white p-12 rounded-lg mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Family</h2>
            <p className="text-lg max-w-4xl mx-auto mb-8">
              We're always looking for passionate individuals who want to grow with us and make a difference in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/signup" 
                className="bg-[#FFC72C] text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block"
              >
                Join Our Family
              </a>
              <a 
                href="/our-staff" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-white hover:text-[#d1282e] transition-colors inline-block"
              >
                Meet Our Staff
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">50,000+</h3>
              <p className="themed-text">Associates Worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Award-Winning</h3>
              <p className="themed-text">Workplace Culture</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Growth</h3>
              <p className="themed-text">Opportunities for All</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OurFamilyPage;