# 🚀 How to Start Your Todo App

A simple guide to get your full-stack Todo app running.

## Prerequisites

Make sure you have:
- ✅ PostgreSQL installed and running
- ✅ Database `todo_db` created (use pgAdmin if needed)
- ✅ `.env` file configured in `backend/` folder

## Step 1: Start the Backend

**Open Terminal/PowerShell #1:**

```powershell
cd C:\Users\dolre\Downloads\expogo\newactivity\backend
pnpm run start:dev
```

**Wait for this message:**
```
Application is running on: http://localhost:3001
```

✅ **Keep this terminal open!** The backend must stay running.

**Test it:** Open http://localhost:3001/todos in your browser (should show `[]`)

---

## Step 2: Start the Mobile App

**Open a NEW Terminal/PowerShell #2:**

```powershell
cd C:\Users\dolre\Downloads\expogo\newactivity\mobile
pnpm start
```

**Then press:**
- `w` - Open in web browser
- `a` - Open Android emulator (if installed)
- `i` - Open iOS simulator (Mac only)
- Or scan QR code with Expo Go app on your phone

✅ **Keep this terminal open!**

---

## Step 3: Start the Web App

**Open a NEW Terminal/PowerShell #3:**

```powershell
cd C:\Users\dolre\Downloads\expogo\newactivity\web
pnpm dev
```

**Wait for:**
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

✅ **Open http://localhost:3000 in your browser**

---

## 🎉 You're Done!

You should now have:
- ✅ **Backend:** http://localhost:3001 (API server)
- ✅ **Web App:** http://localhost:3000 (Next.js)
- ✅ **Mobile App:** Running in Expo

## Using Your App

1. **Add a Todo:** Enter a title and description, click "Add Todo"
2. **Complete Todo:** Click the checkbox
3. **Delete Todo:** Click the × button

## Troubleshooting

### Backend Won't Start

**"Port 3001 already in use"**
- Change PORT in `backend/.env` to another number (e.g., 3002)
- Update frontend API URLs to match

**"Database connection failed"**
- Make sure PostgreSQL is running (check Windows Services)
- Verify database `todo_db` exists
- Check password in `backend/.env` is correct: `BONDbuenaventura`

**"Cannot find module"**
```powershell
cd backend
pnpm install
```

### Frontend Can't Connect to Backend

**"Failed to load todos"**
- Make sure backend is running (check Terminal #1)
- Verify backend shows: "Application is running on: http://localhost:3001"
- Check browser console for errors

**Mobile app shows connection error**
- Make sure backend is running
- If testing on physical device, use your computer's IP address instead of `localhost`
  - Find your IP: `ipconfig` (look for IPv4 Address)
  - Update `mobile/services/api.js` to use: `http://YOUR_IP:3001`

### Web App Issues

**"Port 3000 already in use"**
- Next.js will automatically use the next available port (3001, 3002, etc.)
- Check the terminal for the actual URL

**Build errors**
```powershell
cd web
pnpm install
```

## Quick Reference

### Backend Commands
```powershell
cd backend
pnpm run start:dev    # Start development server
pnpm run build        # Build for production
pnpm run start:prod   # Start production server
```

### Mobile Commands
```powershell
cd mobile
pnpm start           # Start Expo
pnpm android         # Android only
pnpm ios             # iOS only (Mac)
pnpm web             # Web browser
```

### Web Commands
```powershell
cd web
pnpm dev             # Development server
pnpm build           # Build for production
pnpm start           # Production server
```

## Stopping the Apps

1. **Backend:** Press `Ctrl+C` in Terminal #1
2. **Mobile:** Press `Ctrl+C` in Terminal #2
3. **Web:** Press `Ctrl+C` in Terminal #3

## Need Help?

- Check that all three terminals are running
- Verify backend is on port 3001
- Make sure PostgreSQL is running
- Check `.env` file has correct database password

Happy coding! 🎉

