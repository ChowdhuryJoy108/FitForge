# Fitness Website - README

## Overview
This project is a full-stack fitness website developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The website provides a seamless user experience for fitness enthusiasts to browse and book trainers, participate in classes, and engage with the community.

---

## Features

### General
- **Visually Appealing Design:** A well-structured layout with pleasing color contrast, proper alignment, and customized components.
- **Responsive Design:** Ensures compatibility across different devices.
- **Persistent Navbar and Footer:** Present on all pages except the 404 page, providing navigation and contact information.

### Navbar
- **Conditional Rendering:** 
  - If logged in, displays profile picture, dashboard, and logout button.
  - If not logged in, displays login and register options.
- Includes links to:
  - Home Page
  - All Trainers Page
  - All Classes Page
  - Conditional Dashboard
  - Community/Forums Page
  - Conditional User Profile

### Authentication
- **Registration Page:**
  - Fields: Name, Email, Photo URL, Password.
  - Stores user information in MongoDB with default role as `member`.
- **Login Page:**
  - Fields: Email, Password.
  - Social login system.
  - Error messages for invalid credentials.
  - Toggle between login and registration pages.

### Homepage
- **Banner Section:** Displays a heading, short description, and a button redirecting to the Classes page.
- **Featured Section:** Highlights website features through cards with titles, descriptions, and icons/images.
- **About Section:** Provides organizational information in a visually appealing layout.
- **Featured Classes:** Displays top six most booked classes using MongoDB's `$sort` method.
- **Testimonials/Reviews:** Carousel slider for user-submitted reviews.
- **Latest Community Posts:** Displays six recent forum posts with links for further reading.
- **Newsletter Section:** Allows users to subscribe without logging in. Data saved to MongoDB.
- **Team Section:** Displays trainer profiles with name, biography, expertise, and photo.

### All Trainers Page
- Displays all trainer profiles with:
  - Trainer name
  - Profile image
  - Years of experience
  - Social icons
  - Available slots
  - "Know More" button to redirect to Trainer Details page.

### Trainer Details Page
- **Trainer Information Section:** Provides comprehensive details about the trainer.
- **Available Slots Section:** Displays trainer's schedule for booking.
- **Be a Trainer Section:** Includes a CTA button redirecting to the "Become a Trainer" page.

### Trainer Booking Page
- Displays:
  - Trainer name
  - Selected slot
  - Classes
  - Membership packages (Basic, Standard, Premium).
- Stripe-based payment system.

### Payment Page
- Displays:
  - Trainer name
  - Slot name
  - Package name
  - Price
  - User info.
- Saves payment information in MongoDB and updates class booking count.

### "Become a Trainer" Page
- Form fields:
  - Full Name
  - Email (read-only)
  - Age
  - Profile Image
  - Skills (checkbox).
  - Available days (React Select).
  - Available time.
  - Status (default: pending).
- Saves data to MongoDB.

### Classes Page
- Displays all classes with:
  - Class name
  - Description
  - Trainers specializing in the class (up to 5).
- Pagination (6 classes per page).

### Forum Page
- Displays six posts per page with pagination.
- Voting system for logged-in users.

### Dashboard
- Conditional pages based on user roles (Admin, Trainer, Member).

#### Admin
- **All Newsletter Subscribers:** Displays subscribers in a table.
- **All Trainers:**
  - View and delete trainers.
  - Change trainer role back to Member.
- **Applied Trainer:**
  - View applications.
  - Accept or reject applications.
- **Balance Overview:**
  - Displays total balance and last six transactions.
  - Chart: Total newsletter subscribers vs. paid members.
- **Add New Class:** Form to add a new class.

#### Trainer
- **Manage Slots:**
  - View and delete slots.
  - Add new slots.
- **Add New Forum:** Post forums.

#### Member
- **Activity Log Page:**
  - Displays status of trainer applications.
  - Modal for rejection feedback.
- **Profile Page:** Manage account details.
- **Booked Trainer Page:**
  - Displays trainer and class details.
  - Review button to submit feedback.

---

## Technologies Used
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Payment:** Stripe
- **Other Libraries:** React Select, Daisy UI

---

## Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Navigate to the project directory:
   ```bash
   cd [project-directory]
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file.
   - Add the following:
     ```env
     REACT_APP_FIREBASE_API_KEY=[Your Firebase API Key]
     REACT_APP_STRIPE_KEY=[Your Stripe Key]
     MONGODB_URI=[Your MongoDB Connection URI]
     ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Start the backend server:
   ```bash
   npm run start:backend
   ```

---

## Deployment
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the backend to a hosting provider (e.g., Heroku, Render).
3. Deploy the frontend to a hosting service (e.g., Netlify, Vercel).

---

## Acknowledgements
Special thanks to the creators of MERN stack technologies and the open-source community for their tools and libraries.

---

## License
This project is licensed under the [MIT License](LICENSE).

