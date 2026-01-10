<div align="center">

# 🚀 {{BRAND_NAME}}

**Product Hunt-ready landing page with waitlist functionality**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> Beautiful, modern landing page template perfect for Product Hunt launches and early-stage startups

[Features](#-features) • [Quick Start](#-quick-start) • [Customization](#-customization) • [Deployment](#-deployment)

</div>

---

## ✨ Overview

A premium, production-ready landing page template built with Next.js 16 and modern web technologies. Perfect for collecting waitlist signups, showcasing your product, and building anticipation before launch.

### 🎯 Perfect For

- 🚀 Product Hunt launches
- 🎨 Early-stage startups
- 📧 Waitlist collection
- 🎯 Product marketing pages
- 💼 SaaS landing pages

---

## 🎨 Features

### 🎯 Core Functionality

- **📧 Email Collection** - Resend integration for waitlist management
- **📊 Dashboard** - Simple admin dashboard to view signups and statistics
- **🎨 Modern Design** - 2026 design trends with glassmorphism and gradients
- **📱 Mobile Responsive** - Perfect on all devices
- **⚡ Performance** - Optimized for speed and SEO
- **🎭 Theme Support** - Automatic dark mode support

### 🎨 Design Features

- **Hero Section** - Eye-catching hero with animated background
- **Features Grid** - Bento-style feature showcase
- **Social Proof** - Statistics and testimonials section
- **Smooth Animations** - Fade-in, slide-up, and parallax effects
- **Gradient Orbs** - Animated background elements
- **Glassmorphism** - Modern glass-effect cards

### 🛠️ Technical Features

- **TypeScript** - Full type safety
- **React Hook Form** - Form validation with Zod
- **shadcn/ui** - Beautiful, accessible components
- **Icon Library Support** - Multiple icon libraries (Lucide, Hugeicons, Tabler, Phosphor)
- **Preset Compatible** - Works with any shadcn/ui preset configuration

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5.0** - Type safety
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library

### Backend & Services

- **Resend** - Email collection and management
- **Next.js API Routes** - Serverless functions

### Development Tools

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **ESLint** - Code linting
- **TypeScript** - Static type checking

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun
- Resend account (for email collection)

### Installation

1. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Resend API Key (Required for waitlist functionality)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Brand Name (automatically set by Rapid Builder during project creation)
# BRAND_NAME={{BRAND_NAME}}
```

3. **Get your Resend API Key**

- Sign up at [resend.com](https://resend.com)
- Go to API Keys section
- Create a new API key
- Copy and paste it into `.env.local`

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── waitlist/          # API routes for email collection
│   ├── dashboard/             # Admin dashboard
│   ├── layout.tsx             # Root layout with SEO
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles and animations
├── components/
│   ├── landing/              # Landing page components
│   │   ├── hero-section.tsx
│   │   ├── features-grid.tsx
│   │   ├── social-proof.tsx
│   │   └── navigation.tsx
│   ├── dashboard/            # Dashboard components
│   │   ├── email-list.tsx
│   │   ├── stats-cards.tsx
│   │   └── filter-bar.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── resend.ts            # Resend client
│   ├── brand.ts             # Brand configuration
│   ├── icon-utils.ts        # Icon library utilities
│   └── utils.ts            # Utility functions
└── public/                  # Static assets
```

---

## 🎨 Customization

### Brand Name

브랜드 이름은 프로젝트 생성 시 자동으로 설정됩니다. 템플릿 파일에서 `{{BRAND_NAME}}` 플레이스홀더를 사용하면 자동으로 교체됩니다.

수동으로 변경하려면:

```typescript
// lib/brand.ts
export function getBrandName(): string {
  return process.env.BRAND_NAME || "{{BRAND_NAME}}";
}
```

**참고:** Rapid Builder에서 프로젝트를 생성할 때 입력한 브랜드 이름이 자동으로 설정됩니다.

### Colors & Theme

⚠️ **중요**: 이 템플릿은 CSS 변수를 사용합니다. 색상이나 radius 값을 하드코딩하지 마세요.

이 템플릿은 shadcn/ui의 프리셋 시스템을 사용합니다. shadcn/ui는 **oklch 형식**으로 CSS 변수를 자동 생성합니다. 색상은 `components.json` 설정에 따라 자동으로 적용됩니다:

**권장 사용 방법:**

1. **Tailwind 유틸리티 클래스** (가장 권장)

   ```tsx
   <div className="bg-primary text-primary-foreground">
   <button className="bg-secondary text-secondary-foreground">
   ```

2. **CSS 변수 직접 사용**

   ```css
   .custom-class {
     background-color: var(--primary);
     color: var(--primary-foreground);
   }
   ```

3. **인라인 스타일**
   ```tsx
   <div style={{ backgroundColor: 'var(--primary)' }}>
   ```

**사용 가능한 CSS 변수:**

- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--accent`, `--accent-foreground`
- `--muted`, `--muted-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`
- `--radius` (border-radius 값)

**참고:** shadcn/ui는 CSS 변수에 **oklch 형식**의 색상 값을 저장합니다 (예: `oklch(0.648 0.2 131.684)`). 따라서 `hsl(var(--primary))`처럼 감싸지 않고 `var(--primary)`를 직접 사용하면 됩니다. 모든 색상은 사용자가 선택한 테마에 따라 자동으로 변경됩니다.

### Content Customization

#### Hero Section

Edit `components/landing/hero-section.tsx`:

```typescript
const headline = "{{BRAND_NAME}}";
const subheadline = "Revolutionary solution for modern problems";
```

#### Features

Edit `components/landing/features-grid.tsx` to add or modify features.

#### Social Proof

Edit `components/landing/social-proof.tsx` to update statistics and testimonials.

---

## 🎭 Preset Configuration

This template is compatible with shadcn/ui preset system. When you create a project using Rapid Builder, you can select:

- **Style** - Vega, Nova, Maia, Lyra, Mira
- **Base Color** - Neutral, Stone, Zinc, Gray
- **Theme** - Amber, Blue, Cyan, Emerald, Fuchsia, Green, Indigo, Lime, Orange, Pink, Purple, Red, Rose, Sky, Teal, Violet, Yellow
- **Icon Library** - Lucide, Tabler Icons, Hugeicons, Phosphor Icons
- **Font** - Inter, Noto Sans, Nunito Sans, Figtree

The template automatically adapts to your preset selection. All colors, fonts, and icons are dynamically loaded based on your `components.json` configuration.

---

## 📧 Email Collection

### Resend Setup

1. **Create a Resend account** at [resend.com](https://resend.com)

2. **Get your API key**
   - Navigate to API Keys in your dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Add to environment variables**

   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

4. **Create an Audience** (optional)
   - Go to Audiences in Resend dashboard
   - Create a new audience
   - Use the audience ID if needed

### API Endpoints

- `POST /api/waitlist` - Submit email to waitlist
- `GET /api/waitlist/list` - Get list of emails (dashboard)
- `GET /api/waitlist/stats` - Get statistics (dashboard)

---

## 📊 Dashboard

Access the dashboard at `/dashboard` to view:

- **Email List** - All waitlist signups
- **Statistics** - Total signups, daily/weekly/monthly trends
- **Search & Filter** - Find specific emails or filter by date

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Add environment variables**
   - `RESEND_API_KEY` - Your Resend API key
   - `BRAND_NAME` - ⚠️ 자동 설정됨 (Rapid Builder에서 프로젝트 생성 시 자동으로 설정됩니다)

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes!

### Other Platforms

This template works on any platform that supports Next.js:

- **Netlify** - Import from GitHub
- **Railway** - Connect your repository
- **AWS Amplify** - Deploy with Amplify Console
- **Docker** - Use the included Dockerfile (if available)

---

## 🔧 Environment Variables

| Variable         | Description                                                                                              | Required |
| ---------------- | -------------------------------------------------------------------------------------------------------- | -------- |
| `RESEND_API_KEY` | Your Resend API key for email collection                                                                 | ✅       |
| `BRAND_NAME`     | ⚠️ **자동 설정됨** - Rapid Builder에서 프로젝트 생성 시 자동으로 설정됩니다. 수동 설정은 선택사항입니다. | ❌       |

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 🎯 Best Practices

### SEO

- Update metadata in `app/layout.tsx`
- Add your Open Graph images to `public/`
- Customize meta descriptions for better search visibility

### Performance

- Images are automatically optimized with Next.js Image component
- Fonts are optimized with `next/font`
- CSS is automatically minified in production

### Accessibility

- All components follow WCAG guidelines
- Keyboard navigation supported
- Screen reader friendly

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Email service by [Resend](https://resend.com)
- Icons from [Lucide](https://lucide.dev), [Hugeicons](https://hugeicons.com), [Tabler](https://tabler.io), [Phosphor](https://phosphoricons.com)

---

## 📞 Support

- 🐛 [Report a Bug](https://github.com/your-username/landing-waitlist-template/issues)
- 💡 [Request a Feature](https://github.com/your-username/landing-waitlist-template/issues)
- 📚 [Documentation](https://your-docs-url.com)

---

<div align="center">

**Made with ❤️ for developers who want to ship fast**

[⬆ Back to Top](#-overview)

</div>
