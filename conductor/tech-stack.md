# Tech Stack: MY LEAP

## Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI (Components)
- **Icons:** Lucide React
- **Identity & Web3:** Thirdweb SDK (Connect Wallet, Auth, Gasless Transactions)
- **State Management:** React Context / TanStack Query (si es necesario)

## Backend & Persistence
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Thirdweb + Supabase Auth Link
- **File Storage:** Supabase Storage (Multimedia de cursos y perfiles)
- **ORM:** Prisma o Direct Supabase Client (usando Row Level Security)

## Blockchain
- **Primary Network:** Polygon (Mainnet/Amoy Testnet)
- **Token:** LEAP (ERC-20)
- **Gas Strategy:** Paymaster (Gasless) vía Thirdweb

## Infrastructure
- **Hosting:** Vercel (Frontend)
- **Database Hosting:** Supabase
- **Monorepo Management:** npm workspaces
