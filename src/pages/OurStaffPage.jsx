// React core library for component creation and JSX syntax
import React from 'react';
// Header component that provides consistent navigation across pages
import Header from '../shared/components/layout/Header';
// Staff data containing information about team members, statistics, and departments
// This includes both current staff profiles and open position listings
import { staffMembers, staffStats, departments } from '../data/staffData';

/**
 * OurStaffPage Component
 *
 * This component renders a comprehensive staff directory page that serves multiple purposes:
 * 1. Showcases current team members with their roles and specialties
 * 2. Displays team statistics and performance metrics
 * 3. Highlights open positions and hiring opportunities
 * 4. Provides an engaging interface for potential applicants
 *
 * The page uses a grid-based layout with responsive design, featuring:
 * - Hero section with call-to-action for joining the team
 * - Statistics dashboard showing team metrics
 * - Department overview with hiring status indicators
 * - Individual staff member profiles
 * - Application prompts for open positions
 *
 * @returns {JSX.Element} The complete staff page with all sections
 */
function OurStaffPage() {
  return (
    <div className="bg-white">
      <Header />
      <main className="pt-0 overflow-x-hidden">
        {/*
          Inline CSS Styles Section

          These styles are scoped to the component and provide:
          - Responsive design breakpoints for desktop, tablet, and mobile
          - Grid layouts for staff cards and statistics
          - Brand-consistent color scheme matching Panda Express theme
          - Hover effects and animations for better user interaction
          - Background patterns and visual elements for brand identity

          The styling system uses:
          - Viewport width (vw) units for responsive scaling
          - CSS Grid for flexible layouts
          - Brand colors: #d1282e (red), #FFC72C (yellow), #22c55e (green)
          - Box shadows and border radius for modern card design
        */}
        <style jsx>{`
          body {
            overflow-y: auto !important;
            height: auto !important;
          }

          .panda-rewards {
            overflow-y: visible;
            height: auto;
          }

          .panda-rewards .panda-rewards-illustration-section {
            width: 100%;
            position: relative;
            overflow: hidden;
          }

          .panda-rewards .panda-rewards-illustration-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url(https://s3.amazonaws.com/PandaExpressWebsite/www/pr-2022-benefits-bg-pattern.svg);
            background-size: 5.5vw;
            background-repeat: repeat;
            filter: hue-rotate(180deg) saturate(0) brightness(0.3);
            z-index: 1;
          }

          .panda-rewards .pr-intro {
            z-index: 2;
            margin: 0 auto;
            text-align: center;
            max-width: 50vw;
          }

          .panda-rewards .pr-intro h1 {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-style: normal;
            font-weight: 700;
            text-transform: uppercase;
            color: #d1282e;
            margin: 0 0 2vw 0;
            font-size: 3.42vw;
            line-height: 2.9vw;
          }

          .panda-rewards .pr-intro p {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-style: normal;
            font-weight: 700;
            color: #000000;
            margin: 1vw 0 2.25vw 0;
            font-size: 1.28vw;
            line-height: 1.6vw;
          }

          .panda-rewards .pr-intro .button-red {
            background: #d1282e;
            border-radius: 8px;
            font-family: 'proxima-nova', Arial, sans-serif;
            font-style: normal;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            display: inline-block;
            text-decoration: none;
            color: #fff;
            border-radius: 0.46vw;
            font-size: 1.1vw;
            min-width: 13.2vw;
            height: 3.2vw;
            line-height: 3.1vw;
          }

          .panda-rewards .pr-member-benefits {
            background-color: #d1282e;
            width: 100%;
            background-image: url(https://s3.amazonaws.com/PandaExpressWebsite/www/pr-2022-benefits-bg-pattern.svg);
            background-size: 5.5vw;
            background-repeat: repeat;
            padding: 2vw 0;
            text-align: center;
          }

          .panda-rewards .pr-feature-grid {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2vw;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2vw;
            margin-top: 3vw;
          }

          .panda-rewards .pr-feature-card {
            background-color: #fff;
            border-radius: 0.5vw;
            padding: 2vw;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .panda-rewards .pr-feature-card h3 {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-weight: 700;
            color: #d1282e;
            font-size: 1.5vw;
            margin: 1vw 0;
            text-transform: uppercase;
          }

          .panda-rewards .pr-feature-card p {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-weight: 500;
            color: #000;
            font-size: 1.1vw;
            line-height: 1.4vw;
          }

          .panda-rewards .pr-feature-icon {
            font-size: 4vw;
            margin-bottom: 1vw;
          }

          .staff-stats-grid {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 2vw;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2vw;
            margin-bottom: 3vw;
          }

          .staff-stats-card {
            background-color: #fff;
            border-radius: 0.5vw;
            padding: 2vw;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .staff-grid {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2vw;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2vw;
            margin-top: 2vw;
          }

          .staff-card {
            background-color: #fff;
            border-radius: 0.5vw;
            padding: 2vw;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .staff-card:hover {
            transform: translateY(-4px);
          }

          .staff-card.hiring {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 2px solid #22c55e;
          }

          .staff-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 1vw;
            border: 3px solid #FFC72C;
            object-fit: cover;
          }

          .hiring-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 1vw;
            border: 3px solid #22c55e;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            font-weight: bold;
          }

          @media only screen and (min-width: 1400px) {
            .panda-rewards .pr-intro h1 {
              font-size: 48px;
              line-height: 41px;
            }

            .panda-rewards .pr-intro p {
              font-size: 18px;
              line-height: 22px;
              margin: 14px 0 32px 0;
            }

            .panda-rewards .pr-intro .button-red {
              min-width: 185px;
              height: 45px;
              border-radius: 6px;
              font-size: 16px;
              line-height: 45px;
            }

            .panda-rewards .pr-intro {
              max-width: 700px;
            }

            .panda-rewards .panda-rewards-illustration-section {
              padding: 56px 0;
            }

            .panda-rewards .pr-member-benefits {
              padding: 28px 0;
              background-size: 75px;
            }

            .panda-rewards .pr-feature-grid {
              gap: 28px;
              margin-top: 42px;
            }

            .panda-rewards .pr-feature-card {
              padding: 28px;
              border-radius: 8px;
            }

            .panda-rewards .pr-feature-card h3 {
              font-size: 21px;
              margin: 14px 0;
            }

            .panda-rewards .pr-feature-card p {
              font-size: 16px;
              line-height: 20px;
            }

            .panda-rewards .pr-feature-icon {
              font-size: 56px;
              margin-bottom: 14px;
            }

            .staff-stats-grid {
              gap: 28px;
              margin-bottom: 42px;
            }

            .staff-stats-card {
              padding: 28px;
              border-radius: 8px;
            }

            .staff-grid {
              gap: 28px;
              margin-top: 28px;
            }

            .staff-card {
              padding: 28px;
              border-radius: 8px;
            }
          }

          @media only screen and (max-width: 900px) {
            .panda-rewards .pr-intro {
              max-width: 90vw;
            }

            .panda-rewards .pr-intro h1 {
              font-size: 12vw;
              line-height: 12vw;
              margin-bottom: 4vw;
            }

            .panda-rewards .pr-intro p {
              font-size: 4.6vw;
              line-height: 5.4vw;
              margin: 2vw 0 6vw 0;
            }

            .panda-rewards .pr-intro .button-red {
              min-width: 70vw;
              height: auto;
              border-radius: 2vw;
              font-size: 4.2vw;
              line-height: 100%;
              padding: 4vw 0;
            }

            .panda-rewards .panda-rewards-illustration-section {
              padding: 8vw 0;
              margin-top: 0;
            }

            .panda-rewards .pr-member-benefits {
              padding: 8vw 0;
              background-size: 20vw;
            }

            .panda-rewards .pr-feature-grid {
              grid-template-columns: 1fr;
              gap: 6vw;
              margin-top: 8vw;
            }

            .panda-rewards .pr-feature-card {
              padding: 6vw;
              border-radius: 2vw;
            }

            .panda-rewards .pr-feature-card h3 {
              font-size: 6vw;
              margin: 4vw 0 2vw 0;
            }

            .panda-rewards .pr-feature-card p {
              font-size: 4.2vw;
              line-height: 5.5vw;
            }

            .panda-rewards .pr-feature-icon {
              font-size: 15vw;
              margin-bottom: 4vw;
            }

            .staff-stats-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 6vw;
              margin-bottom: 8vw;
            }

            .staff-stats-card {
              padding: 6vw;
              border-radius: 2vw;
            }

            .staff-grid {
              grid-template-columns: 1fr;
              gap: 6vw;
              margin-top: 6vw;
            }

            .staff-card {
              padding: 6vw;
              border-radius: 2vw;
            }
          }
        `}</style>

        <div className="panda-rewards">
          {/*
            Hero Section

            The main banner area that introduces the staff page with:
            - Eye-catching headline announcing the team section
            - Descriptive text explaining the team's mission and values
            - Call-to-action button directing visitors to join the team
            - Background pattern and styling consistent with brand identity

            This section sets the tone for the entire page and encourages
            potential applicants to engage with the hiring process.
          */}
          <div className="panda-rewards-illustration-section">
            <div className="relative py-40">
              <div className="pr-intro absolute left-1/2 translate-x-[-50%] bg-white p-10 rounded-lg border-yellow-400 border-2">
                <h1>OUR TEAM!</h1>
                <p>
                  Meet the passionate <strong>Pandaren masters</strong> behind Pandren Express!
                  From our experienced owner to our <strong>growing team opportunities</strong>,
                  discover the family that brings <strong>authentic flavors</strong> to your doorstep.
                </p>
                <a className="button-red !bg-green-500" href="/contact">
                  Join Our Team
                </a>
              </div>
            </div>
          </div>

          {/*
            Staff Statistics Section

            This section displays key metrics about the team using a card-based layout:
            - Total number of current employees
            - Average years of experience across the team
            - Customer satisfaction rating
            - Number of open positions available for hiring

            The statistics are pulled from the staffStats data object and presented
            in an easily digestible format. The open positions card uses green styling
            to draw attention to hiring opportunities.
          */}
          <div className="pr-member-benefits">
            <h2 className="text-center text-white text-4xl font-bold mb-8">
              Team Statistics
            </h2>

            <div className="staff-stats-grid">
              {/* Current Staff Count Card - Shows total active employees */}
              <div className="staff-stats-card">
                <div className="text-3xl font-bold text-[#d1282e] mb-2">{staffStats.totalEmployees}</div>
                <div className="text-gray-700 font-medium">Current Staff</div>
              </div>
              {/* Average Experience Card - Shows team's collective experience level */}
              <div className="staff-stats-card">
                <div className="text-3xl font-bold text-[#d1282e] mb-2">{staffStats.averageExperience}</div>
                <div className="text-gray-700 font-medium">Years Experience</div>
              </div>
              {/* Customer Satisfaction Card - Shows service quality rating */}
              <div className="staff-stats-card">
                <div className="text-3xl font-bold text-[#d1282e] mb-2">{staffStats.satisfactionRate}</div>
                <div className="text-gray-700 font-medium">Customer Satisfaction</div>
              </div>
              {/* Open Positions Card - Highlighted to attract job seekers */}
              <div className="staff-stats-card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300">
                <div className="text-3xl font-bold text-green-600 mb-2">{staffStats.openPositions}</div>
                <div className="text-green-700 font-medium">Open Positions!</div>
              </div>
            </div>

            {/*
              Department Grid Section

              This grid displays all departments within the organization, showing:
              - Department icons for visual identification
              - Department names and member counts
              - Brief descriptions of each department's role
              - Hiring status indicators for departments actively recruiting

              The grid uses conditional styling to highlight departments that are
              currently hiring, making it easy for potential applicants to identify
              opportunities that match their interests and skills.
            */}
            <div className="pr-feature-grid">
              {/* Map through all departments to create individual department cards */}
              {departments.map((dept, index) => (
                <div key={index} className={`pr-feature-card ${dept.hiring ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300' : ''}`}>
                  {/* Department icon for visual identification */}
                  <div className="pr-feature-icon">{dept.icon}</div>
                  {/* Department name with conditional styling for hiring status */}
                  <h3 className={dept.hiring ? 'text-green-600' : ''}>{dept.name}</h3>
                  {/* Member count or hiring status with appropriate styling */}
                  <div className={`text-2xl font-bold mb-2 ${dept.hiring ? 'text-green-600' : 'text-[#d1282e]'}`}>
                    {dept.count} {dept.hiring ? 'Hiring!' : 'Members'}
                  </div>
                  {/* Department description explaining their role */}
                  <p className={dept.hiring ? 'text-green-700' : ''}>{dept.description}</p>
                  {/* Conditional rendering of application prompt for hiring departments */}
                  {dept.hiring && (
                    <div className="mt-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        APPLY NOW
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/*
            Staff Grid Section

            The main content area displaying individual staff member profiles.
            This section includes:
            - Current team member cards with photos, roles, and specialties
            - Open position cards styled differently to indicate hiring opportunities
            - Interactive elements like application buttons for open positions
            - Responsive grid layout that adapts to different screen sizes

            Each staff card contains:
            - Profile photo or placeholder for open positions
            - Name and job title
            - Experience level or requirements
            - List of specialties or desired skills
            - Application button for open positions
          */}
          <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto text-center px-8">
              <h2 className="text-4xl font-bold text-[#d1282e] mb-8">Meet Our Team & Open Positions</h2>
              <p className="text-xl text-gray-700 mb-12">
                Join Sinrider and become part of the Pandaren Express family!
              </p>

              <div className="staff-grid">
                {/* Map through staff members array to create individual profile cards */}
                {staffMembers.map((member) => (
                  <div key={member.id} className={`staff-card ${member.isHiring ? 'hiring' : ''}`}>
                    {/*
                      Profile Image Section
                      Displays either a staff member's photo or a placeholder for open positions
                    */}
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="staff-avatar"
                      />
                    ) : (
                      /* Placeholder avatar for open positions with question mark */
                      <div className="hiring-avatar">?</div>
                    )}

                    {/* Staff member or position name with conditional styling */}
                    <h3 className={`text-xl font-bold mb-2 ${member.isHiring ? 'text-green-700' : 'text-[#d1282e]'}`}>
                      {member.name}
                    </h3>

                    {/* Job title or position with role-appropriate styling */}
                    <div className={`font-semibold mb-3 ${member.isHiring ? 'text-green-600' : 'text-gray-600'}`}>
                      {member.position}
                    </div>

                    {/* Detailed description of the role or staff member's background */}
                    <p className={`text-sm leading-relaxed mb-4 ${member.isHiring ? 'text-green-700' : 'text-gray-700'}`}>
                      {member.description}
                    </p>

                    {/* Experience level badge - shows requirements for open positions or current experience */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${member.isHiring ? 'bg-green-500 text-white' : 'bg-[#FFC72C] text-black'}`}>
                        {member.experience} {member.isHiring ? 'Required' : 'Experience'}
                      </span>
                    </div>

                    {/*
                      Specialties/Skills Section
                      For current staff: shows their areas of expertise
                      For open positions: shows desired skills and qualifications
                    */}
                    <div className="text-sm mb-4">
                      <div className={`font-semibold mb-2 ${member.isHiring ? 'text-green-700' : 'text-gray-700'}`}>
                        {member.isHiring ? 'Looking for:' : 'Specialties:'}
                      </div>
                      {/* Render specialties as small labeled chips */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.specialties.map((specialty, index) => (
                          <span key={index} className={`px-2 py-1 rounded text-xs ${member.isHiring ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Conditional application button for open positions only */}
                    {member.isHiring && (
                      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors w-full">
                        APPLY FOR THIS ROLE
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*
            Call to Action Section

            The final engagement section designed to convert visitors into applicants.
            This section includes:
            - Compelling headline encouraging applications
            - Detailed information about career opportunities and benefits
            - Primary action button linking to the application/contact page
            - Secondary button linking to company values for cultural fit assessment

            The messaging emphasizes the welcoming nature of the team and the
            opportunities for growth, appealing to both experienced professionals
            and newcomers to the food service industry.
          */}
          <div className="pr-member-benefits">
            <h2 className="text-center text-white text-4xl font-bold mb-8">
              Ready to Join the Pandren Express Family?
            </h2>
            <div className="max-w-4xl mx-auto text-center text-white px-8">
              <p className="text-xl leading-relaxed mb-8">
                Sinrider is actively seeking passionate individuals to join our growing team!
                Whether you're experienced in food service or just starting your career, we offer training,
                competitive pay, and the chance to be part of something special in the Moon Guard community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Primary application button with prominent styling */}
                <a
                  href="/contact"
                  className="bg-[#FFC72C] text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors inline-block"
                >
                  Apply Today
                </a>
                {/* Secondary button linking to company values page */}
                <a
                  href="/our-values"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-white hover:text-[#d1282e] transition-colors inline-block"
                >
                  Our Values
                </a>
              </div>
            </div>
          </div>

          {/*
            Disclaimer Section

            Important legal and contextual information explaining that this is
            a roleplay-themed project for the World of Warcraft community.
            This section:
            - Clarifies the fictional nature of the employment opportunities
            - Provides context about the Moon Guard community
            - Maintains the fun, immersive atmosphere while being transparent
            - Uses purple accent color to highlight the community aspect
          */}
          <div className="bg-white p-8 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-bold">Employment Notice:</span> Pandren Express is a roleplay-themed
                project for the World of Warcraft Moon Guard community. These are fictional positions
                designed for immersive storytelling and community engagement.
                <span className="text-purple-600 font-bold"> Join us for the fun!</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OurStaffPage;
