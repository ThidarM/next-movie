# 🎬 Next Movie

A modern movie discovery website built with **Next.js** and the **TMDB
API**.

This project fetches movie information from The Movie Database (TMDB)
and presents it through a responsive web interface. It is designed to
run locally with Next.js and can be deployed to **Vercel**.

## ✨ Features

-   🎥 Movie discovery powered by the TMDB API
-   🔎 Movie data and poster images from TMDB
-   📱 Responsive movie UI
-   ⚡ Next.js App Router
-   🎨 Component-based UI
-   🔐 Environment-variable based API configuration
-   ☁️ Ready to deploy on Vercel

## 🛠️ Tech Stack

-   **Next.js**
-   **React**
-   **TypeScript**
-   **TMDB API**
-   **Tailwind CSS / project UI components**
-   **Vercel**

------------------------------------------------------------------------

## 🚀 Create the Project

If you want to create a new Next.js project from scratch:

``` bash
npx create-next-app@latest next-movie
```

During setup, you can choose options such as:

``` text
TypeScript       → Yes
ESLint            → Yes
Tailwind CSS      → Yes
src/ directory    → No
App Router        → Yes
Turbopack         → Yes
Import alias      → Yes
```

Then enter the project:

``` bash
cd next-movie
```

Install the dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

Open:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

## 📁 Project Structure

The project currently follows a structure similar to:

``` text
next-movie/
│
├── app/
│   ├── ...                    # Next.js App Router pages, layouts and routes
│   └── ...
│
├── components/
│   └── ...                    # Reusable UI components
│
├── lib/
│   └── ...                    # Utilities, API helpers and shared logic
│
├── public/
│   └── ...                    # Static assets
│
├── types/
│   └── ...                    # TypeScript types/interfaces
│
├── .env.local                 # Local environment variables (do not commit)
├── .gitignore                 # Git ignore rules
├── components.json            # UI component configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Project dependencies and scripts
├── package-lock.json          # npm dependency lock file
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # Project documentation
└── tsconfig.json              # TypeScript configuration
```

> The exact files inside `app/`, `components/`, `lib/`, and `types/` may
> change as the project grows.

------------------------------------------------------------------------

## 📚 Resources

### Next.js

-   https://nextjs.org/docs
-   https://nextjs.org/learn

### TMDB

-   https://www.themoviedb.org/
-   https://developer.themoviedb.org/docs/getting-started
-   https://developer.themoviedb.org/docs/authentication-application
-   https://developer.themoviedb.org/docs/image-basics

### Vercel

-   https://vercel.com/

------------------------------------------------------------------------

## 📄 License

This project is for learning and development purposes.

TMDB data and images are subject to TMDB's terms and policies. See the
official TMDB documentation for current requirements.
