# CampusFixAI

A beginner-friendly hackathon MVP for AI-assisted campus complaint management.

## Features
- Student complaint submission
- Manual campus location entry
- Photo upload
- AI-style category and priority detection (local fallback; no API key needed)
- Student complaint tracking
- Admin dashboard
- Search and filters
- Admin status/team updates
- Browser localStorage database
- Responsive UI

## Run
1. Open this folder in VS Code.
2. Open `index.html` in a browser, or use the VS Code Live Server extension.
3. Student demo: Login → Student.
4. Admin demo: Login → Administrator.
5. Admin can reset demo data with "Reset Demo Data".

## Important
This version is intentionally self-contained so it works without a backend or internet. For a production/hackathon final version, replace localStorage with Firebase/Supabase and connect a real AI API.

## GitHub
After testing:
```bash
git init
git add .
git commit -m "Initial CampusFixAI project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
