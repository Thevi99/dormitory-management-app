# 🏠 Dormitory Management Web App

A modern and responsive web application to manage room rentals in dormitories or apartments. Built with **Next.js 15**, **TailwindCSS**, **ShadCN UI**, and **MongoDB (Mongoose)**.

---

## 🔧 Tech Stack

- **Next.js 15** – App Router, SSR, File-based routing
- **TailwindCSS** – Utility-first CSS
- **ShadCN UI** – Accessible and reusable UI components
- **MongoDB + Mongoose** – Document-based database
- **Lucide React Icons** – Clean and lightweight icons
- **Axios** – API requests

---

## ✨ Key Features

- 📋 Add, Edit, Delete rooms with status tracking (Available / Occupied)
- 🧑‍💼 Manage users (tenant or admin panel ready)
- 📊 Dashboard with visual stats (room usage, revenue, applications)
- 🧱 Responsive Sidebar Navigation (collapsible)
- 🗂️ Modular UI components (`/components/ui`) with Radix integration
- 🔐 Ready for future login/auth integration

---

## 📁 Folder Structure

src/
├── app/ # Pages and routing (App Router)
├── components/
│ ├── dashboard/ # Dashboard cards & UI
│ ├── Navbar/ # Sidebar menu
│ └── ui/ # Input, Button, Select, Card, Sheet, etc.
├── models/ # Mongoose models (e.g., room.model.js)
├── lib/ # Utility functions
├── styles/ # Tailwind config, global styles


## 🧩 UI Components

All base UI components are under `src/components/ui/`, inspired by ShadCN:

| Component | Purpose |
|----------|---------|
| `Input`, `Label` | Forms |
| `Button`, `Card`, `Badge` | Dashboard, UI |
| `Select`, `Sheet`, `Alert` | Forms, Filters, Dialogs |
| `Progress` | Status bar in Dashboard |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Thevi99/dormitory-management-app.git
cd dormitory-management-app

# 2. Install dependencies
npm install

# 3. Add MongoDB connection
touch .env.local
