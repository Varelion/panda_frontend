// ===================================================
// STAFF DATA - RESTAURANT PERSONNEL INFORMATION
// ===================================================
// This file contains staff member data for the restaurant's team page
// It exports arrays and objects that populate the staff display components
//
// STRUCTURE OVERVIEW:
// - staffMembers: Array of current staff and open positions
// - staffStats: Aggregate statistics about the team
// - departments: Organizational structure with department info
// - brandColors: Consistent color scheme for UI theming
//
// DATA ORGANIZATION:
// Each staff member object contains:
// - id: Unique identifier for database and React key purposes
// - name: Display name (or hiring message for open positions)
// - position: Job title or role description
// - image: Profile photo path (null for hiring positions)
// - description: Bio text or job description for hiring positions
// - experience: Required or actual years of experience
// - specialties: Array of skills, qualifications, or responsibilities
// - featured: Boolean for highlighted display (usually for senior staff)
// - isHiring: Boolean flag indicating this is an open position
// ===================================================

/**
 * RESTAURANT STAFF DATA
 * 
 * Array containing both current staff members and open job positions.
 * Used by the staff page component to display team information and hiring opportunities.
 * 
 * Current structure:
 * - 1 current staff member (Master Panda - Owner/Chef)
 * - 5 open positions for various roles
 * 
 * The data follows the restaurant's branding theme using:
 * - Primary color: #d1282e (restaurant red)
 * - Secondary color: #FFC72C (golden yellow)
 * 
 * @type {Array<Object>} Array of staff member objects
 */
export const staffMembers = [
  // =================== CURRENT STAFF ===================
  // Master Panda - The restaurant's owner and primary chef
  // Featured staff member with extensive experience and leadership role
  {
    id: 1, // Unique identifier for database operations and React keys
    name: "Master Panda", // Display name for staff page
    position: "Restaurant Owner & Head Chef", // Primary job title
    image: "/src/assets/panda_one.jpg", // Profile photo path
    description: "Master Panda brings authentic Pandaren cooking traditions to life at Pandren Express. With decades of experience mastering the ancient art of wok cooking, she ensures every dish captures the true spirit of Pandaria.", // Bio text for staff profile
    experience: "10+ years", // Experience level display
    specialties: ["Authentic Pandaren Cuisine", "Wok Mastery", "Traditional Recipes", "Team Leadership"], // Array of skills and expertise
    featured: true // Boolean flag for prominent display on staff page
  },

  // =================== OPEN POSITIONS ===================
  // Assistant Manager position - Management level role
  // Uses isHiring flag to distinguish from current staff
  {
    id: 2, // Unique identifier for this job posting
    name: "Join Our Team!", // Hiring call-to-action instead of person name
    position: "Assistant Manager", // Job title for the open position
    image: null, // No profile photo for job postings
    description: "We're looking for an enthusiastic assistant manager to help lead our growing Pandren Express family. Perfect opportunity for someone passionate about food service and team leadership.", // Job description and requirements
    experience: "2+ years preferred", // Experience requirements for applicants
    specialties: ["Leadership", "Operations", "Customer Service"], // Required skills and responsibilities
    featured: false, // Not featured since it's a hiring post, not current staff
    isHiring: true // Boolean flag indicating this is an open position
  },
  // Head Chef position - Senior kitchen role
  // Requires significant experience to work alongside Master Panda
  {
    id: 3, // Unique identifier for this job posting
    name: "Now Hiring!", // Hiring call-to-action message
    position: "Head Chef", // Senior kitchen position title
    image: null, // No profile photo for job postings
    description: "Seeking a skilled chef to work alongside Master Panda in our kitchen. Experience with wok cooking and Asian cuisine preferred. Great opportunity to learn traditional Pandaren techniques!", // Job description emphasizing learning opportunity
    experience: "3+ years", // Minimum experience requirement for senior role
    specialties: ["Wok Cooking", "Asian Cuisine", "Food Safety"], // Required skills and certifications
    featured: false, // Not featured since it's a hiring post
    isHiring: true // Boolean flag for open position
  },
  // Line Cook position - Entry to mid-level kitchen role
  // Welcomes entry-level candidates with training provided
  {
    id: 4, // Unique identifier for this job posting
    name: "We're Hiring!", // Enthusiastic hiring message
    position: "Line Cook", // Kitchen staff position title
    image: null, // No profile photo for job postings
    description: "Join our kitchen team! We're looking for dedicated line cooks who are passionate about creating delicious, fresh meals for our customers. Full training provided.", // Job description emphasizing training and growth
    experience: "Entry level welcome", // Open to candidates with minimal experience
    specialties: ["Food Preparation", "Teamwork", "Fast-Paced Environment"], // Skills developed on the job
    featured: false, // Not featured since it's a hiring post
    isHiring: true // Boolean flag for open position
  },
  // Customer Service Lead position - Front of house leadership role
  // Requires customer service experience and leadership qualities
  {
    id: 5, // Unique identifier for this job posting
    name: "Apply Today!", // Urgent hiring call-to-action
    position: "Customer Service Lead", // Front of house leadership position
    image: null, // No profile photo for job postings
    description: "Be the friendly face of Pandren Express! We're seeking a customer service lead who loves helping people and creating positive dining experiences.", // Job description emphasizing customer interaction
    experience: "1+ years preferred", // Minimum experience for leadership role
    specialties: ["Customer Service", "Communication", "Problem Solving"], // Essential skills for customer-facing role
    featured: false, // Not featured since it's a hiring post
    isHiring: true // Boolean flag for open position
  },
  // Cashier position - Entry-level front of house role
  // Perfect for candidates starting their careers in food service
  {
    id: 6, // Unique identifier for this job posting
    name: "Join Us!", // Welcoming hiring message
    position: "Cashier", // Entry-level front of house position
    image: null, // No profile photo for job postings
    description: "Start your career with us! We're hiring cashiers who are friendly, reliable, and excited to be part of our Pandren Express family. Great entry-level opportunity.", // Job description emphasizing career growth and family atmosphere
    experience: "No experience required", // Entry-level position with no barriers
    specialties: ["Cash Handling", "Customer Interaction", "Reliability"], // Skills that will be developed on the job
    featured: false, // Not featured since it's a hiring post
    isHiring: true // Boolean flag for open position
  }
];

// ===================================================
// STAFF STATISTICS - EASY TO MODIFY
// ===================================================
// Update these numbers to reflect your actual restaurant statistics
/**
 * STAFF STATISTICS OBJECT
 * 
 * Provides aggregate data about the restaurant's workforce for display
 * on the staff page. These numbers are calculated based on current
 * staffing levels and open positions.
 * 
 * Used by: Staff page statistics cards and dashboard components
 * Updated: When staff is hired/leaves or positions are opened/closed
 */
export const staffStats = {
  totalEmployees: "1", // Current number of active staff members
  averageExperience: "10+", // Average years of experience (currently just Master Panda's)
  satisfactionRate: "100%", // Customer satisfaction rating (based on reviews/feedback)
  openPositions: "5", // Number of currently available job openings
};

// ===================================================
// DEPARTMENT ORGANIZATION DATA
// ===================================================
// Defines the restaurant's organizational structure by department
// Used for staff page department overview and hiring status display

/**
 * DEPARTMENTS ARRAY
 * 
 * Each department object contains:
 * - name: Department display name
 * - count: Current number of staff in this department
 * - description: Brief description of department status/role
 * - icon: Visual identifier (emoji removed for accessibility)
 * - hiring: Boolean indicating if department has open positions
 * 
 * @type {Array<Object>} Array of department objects
 */
export const departments = [
  {
    name: "Owner/Chef", // Department name for display
    count: 1, // Current staff count in this department
    description: "Master Panda leads with wisdom and skill", // Department description
    icon: "Owner" // Text identifier replacing panda emoji
  },
  {
    name: "Management", // Management department
    count: 0, // No current management staff besides owner
    description: "We're hiring passionate leaders!", // Hiring message
    icon: "Management", // Text identifier replacing crown emoji
    hiring: true // Boolean flag indicating open positions
  },
  {
    name: "Kitchen", // Kitchen/culinary department
    count: 0, // No current kitchen staff besides owner/chef
    description: "Join our culinary team!", // Hiring message
    icon: "Kitchen", // Text identifier replacing chef emoji
    hiring: true // Open positions available
  },
  {
    name: "Service", // Customer service/front of house department
    count: 0, // No current service staff
    description: "Help us serve our community!", // Hiring message
    icon: "Service", // Text identifier replacing handshake emoji
    hiring: true // Open positions available
  }
];

// ===================================================
// BRAND COLOR PALETTE FOR UI CONSISTENCY
// ===================================================
// Defines the restaurant's brand colors used throughout the application
// These colors ensure visual consistency across all components and pages

/**
 * BRAND COLORS OBJECT
 * 
 * Contains hex color codes for the restaurant's visual identity.
 * Used by CSS classes, styled components, and inline styles throughout
 * the application to maintain consistent branding.
 * 
 * Color Usage:
 * - primary: Main brand color for buttons, headers, accents
 * - secondary: Complementary color for highlights and secondary elements
 * - accent: Additional color for variety and emphasis
 * - dark/light: Variations for depth and contrast
 * - text: Standard text color for readability
 * - background: Default background color
 * 
 * @type {Object} Object containing color hex codes
 */
export const brandColors = {
  primary: "#d1282e", // Restaurant's signature red color
  secondary: "#FFC72C", // Golden yellow for complementary elements
  accent: "#FF6B35", // Orange accent for variety and calls-to-action
  dark: "#8B0000", // Dark red variation for depth and contrast
  light: "#FFE135", // Light yellow variation for backgrounds and highlights
  text: "#2C2C2C", // Dark gray for readable body text
  background: "#FFFFFF" // White background for clean, professional look
};
