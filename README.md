# Next.js Supabase Auth Starter

A production-ready starter template for Next.js applications with Supabase authentication, Material-UI, and TypeScript.

## Features

- 🔐 **Authentication**
  - Email/Password Login
  - Registration with email verification
  - Password reset flow
  - Protected routes
  - Session management with cookies

- 🛠 **Tech Stack**
  - Next.js 14
  - TypeScript
  - Material-UI (MUI)
  - Supabase
  - Cookie-based sessions

- 🏗 **Infrastructure**
  - Type-safe database interactions
  - Middleware for route protection
  - Authentication context provider
  - Custom hooks for auth state

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nextjs-supabase-auth-starter.git
   cd nextjs-supabase-auth-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Database Setup**
   - Create a new project in Supabase
   - Run the SQL commands from `database/schema.sql`
   - Set up Row Level Security policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
├── components/         # React components
│   └── auth/          # Authentication components
├── database/          # Database schemas and policies
├── lib/               # Utility functions
│   ├── context/       # React contexts
│   ├── hooks/         # Custom hooks
│   └── supabase.ts    # Supabase client
├── pages/             # Next.js pages
│   └── auth/          # Auth-related pages
├── styles/            # Global styles
└── types/             # TypeScript types
```

## Authentication Features

- **Login**: Email/password authentication
- **Registration**: New user signup with email verification
- **Password Reset**: Complete password reset flow
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure cookie-based sessions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Material-UI](https://mui.com/)

## Support

If you find this template helpful, please give it a ⭐️ on GitHub!
