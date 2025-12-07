<div align="center">

# ✂️ The Trim Studio

### Premium Barber Shop Landing Page

A modern, high-performance web application built with Next.js 15, featuring real-time appointment booking, dynamic service showcase, and seamless client communication.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

[Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**The Trim Studio** is a professional barber shop landing page designed to provide an exceptional digital experience for both clients and business owners. Built with cutting-edge web technologies, it offers seamless appointment booking, automated email confirmations, and a visually stunning interface that captures attention.

### Key Highlights

- **Mobile-First Responsive Design** - Optimized for all devices and screen sizes
- **Real-Time Booking System** - Instant appointment scheduling with validation
- **Database Integration** - Secure storage with Supabase PostgreSQL
- **Automated Email Notifications** - Professional confirmations via EmailJS
- **Modern UI/UX** - Smooth animations with Framer Motion
- **Type-Safe Development** - Full TypeScript implementation
- **Clean Architecture** - DRY principles and best practices

---

## ✨ Features

### 🏠 Landing Page
- Hero section with compelling CTAs
- Service showcase with pricing
- Animated components and transitions
- Social media integration

### 📅 Booking System
- Interactive date and time picker
- Service selection with duration mapping
- Barber preference options
- Form validation with Zod schema
- Real-time error handling

### 📧 Email Integration
- Automated booking confirmations
- Professional email templates
- Client notification system

### 💬 WhatsApp Integration
- Floating WhatsApp button for instant communication
- Pre-filled message template
- Smooth animations and hover effects
- Mobile-optimized chat experience

### 🗄️ Database
- Secure appointment storage
- PostgreSQL via Supabase
- RESTful API endpoints

---

## 🛠️ Tech Stack

### Frontend
```
Next.js 15 (App Router)    - React framework
TypeScript                 - Type safety
Tailwind CSS v4            - Utility-first styling
Framer Motion              - Animation library
Lucide React               - Icon system
WhatsApp Business API      - Direct messaging integration
```

### Backend & Services
```
Supabase                   - PostgreSQL database & authentication
EmailJS                    - Email service integration
```

### Form Management
```
React Hook Form            - Form state management
Zod                        - Schema validation
React DatePicker           - Date selection UI
```

### Developer Tools
```
ESLint                     - Code linting
Prettier                   - Code formatting
clsx / tailwind-merge      - Utility class management
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/the-trim-studio.git
cd the-trim-studio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables** (see [Environment Setup](#-environment-setup))

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## ⚙️ Environment Setup

### 1. Supabase Configuration

Create a project at [supabase.com](https://supabase.com)

**Create the `appointments` table:**
```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(100) NOT NULL,
  date_time TIMESTAMP NOT NULL,
  barber VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. EmailJS Configuration

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Connect your Gmail service
3. Create an email template with these variables:
   - `{{user_name}}`
   - `{{service}}`
   - `{{date_time}}`
   - `{{barber}}`
   - `{{phone}}`
   - `{{email}}`

### 3. Environment Variables

Create a `.env.local` file in the root directory:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

> ⚠️ **Important:** Never commit `.env.local` to version control

---

## 📁 Project Structure
```
the-trim-studio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── booking/
│   │   │       └── route.ts       # Booking API endpoint
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx           # Hero section
│   │   │   ├── Services.tsx       # Services showcase
│   │   │   └── Booking.tsx        # Booking form
│   │   └── ui/
│   │       ├── Button.tsx         # Reusable button
│   │       └── Card.tsx           # Reusable card
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client
│   │   ├── validations/
│   │   │   └── booking.ts         # Zod schemas
│   │   └── utils.ts               # Helper functions
│   └── styles/
│       └── globals.css            # Global styles
├── public/
│   └── images/                    # Static assets
├── .env.local                     # Environment variables
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

---

## 🔌 API Routes

### POST `/api/booking`

Creates a new appointment booking.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(123) 456-7890",
  "service": "haircut",
  "dateTime": "2024-12-15T14:00:00Z",
  "barber": "tony",
  "notes": "Optional notes",
  "duration": 45
}
```

**Response:**
```json
{
  "success": true,
  "booking": { ... },
  "message": "Booking confirmed"
}
```

---

## 🎨 Customization

### Colors
Modify `tailwind.config.js` to change the color scheme:
```js
colors: {
  amber: { ... },
  neutral: { ... }
}
```

### Services
Update service offerings in `src/components/sections/Services.tsx`

### Booking Times
Modify time slots in `src/lib/utils.ts` → `generateTimeSlots()`

---

---

## 💬 WhatsApp Integration

The floating WhatsApp button allows clients to instantly connect with your business.

### Configuration

Update the phone number in `src/components/WhatsAppButton.tsx`:
```tsx
const phone = "+3163XXXXXXX" // Your WhatsApp Business number
const message = "Hi! I'd like to ask about your services." // Default message
```

### Features
- **Instant Messaging** - Direct line to your business
- **Pre-filled Messages** - Saves time for customers
- **Mobile Optimized** - Opens WhatsApp app on mobile devices
- **Animated Entry** - Smooth entrance with pulse effect
- **Hover Tooltip** - Shows "Chat with us" on desktop

### Usage

The button is automatically displayed on all pages. To customize:

1. Change phone number format: `+[country_code][number]`
2. Modify default message text
3. Adjust position via Tailwind classes (`bottom-6 right-6`)
4. Customize colors in the component

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Anees Ahmad**
- GitHub: [@AneesDevZone](https://github.com/AneesDevZone?tab=repositories)
- LinkedIn: [anees-ahmad](https://www.linkedin.com/in/-anees-ahmad/)
- Website: [sqrootdev.com](https://sqrootdev.com/)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com)
- [EmailJS](https://www.emailjs.com/)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ by Anees Ahmad

</div>