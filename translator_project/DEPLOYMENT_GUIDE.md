# 🚀 Karai-Karai Translator - Deployment Guide

## Complete Setup for New Computer (Zero to Running)

### 📋 What You Need to Transfer
- **Entire `translator_project` folder**
- **All files and subfolders**
- **Sample CSV data** (optional)

---

## 🔧 Step-by-Step Installation

### Step 1: Install Python
1. **Go to**: [python.org/downloads](https://www.python.org/downloads/)
2. **Download**: Python 3.8 or newer
3. **IMPORTANT**: Check ✅ "Add Python to PATH" during installation
4. **Test**: Open Command Prompt and type:
   ```
   python --version
   ```

### Step 2: Transfer Project Files
**Method A - USB Drive:**
1. Copy entire `translator_project` folder to USB
2. Plug USB into new computer
3. Copy folder to `C:\Projects\` or `Documents\`

**Method B - Cloud Storage:**
1. Upload project folder to Google Drive/OneDrive
2. Download on new computer
3. Extract to desired location

### Step 3: Setup Project
1. **Open Command Prompt** (Windows) or Terminal (Mac/Linux)
2. **Navigate to project**:
   ```
   cd C:\path\to\translator_project
   ```
3. **Create virtual environment**:
   ```
   python -m venv venv
   ```
4. **Activate virtual environment**:
   ```
   # Windows:
   venv\Scripts\activate
   
   # Mac/Linux:
   source venv/bin/activate
   ```

### Step 4: Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 5: Configure Database (Choose One)

**🟢 EASY OPTION - SQLite (Recommended for beginners):**
1. Open `backend\.env` file
2. Set: `USE_SQLITE=true`
3. Done! No database installation needed.

**🔵 ADVANCED OPTION - MySQL:**
1. Install MySQL from [mysql.com](https://dev.mysql.com/downloads/)
2. Create database: `CREATE DATABASE translator_db;`
3. Update `backend\.env` with your MySQL password

### Step 6: Run the Application
```bash
python app.py
```

### Step 7: Access Your Translator
- **Open browser**: `http://localhost:5000`
- **Admin panel**: `http://localhost:5000/admin/login`
- **Login**: Username: `admin`, Password: `admin123`

---

## 🎯 Quick Start Commands

**Windows Users:**
```batch
cd translator_project\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Mac/Linux Users:**
```bash
cd translator_project/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## 🔧 Create Startup Scripts

### Windows - Create `start.bat`:
```batch
@echo off
echo Starting Karai-Karai Translator...
cd backend
venv\Scripts\activate
python app.py
pause
```

### Mac/Linux - Create `start.sh`:
```bash
#!/bin/bash
echo "Starting Karai-Karai Translator..."
cd backend
source venv/bin/activate
python app.py
```

**Make executable (Mac/Linux):**
```bash
chmod +x start.sh
```

---

## 🚨 Troubleshooting

### Problem: "Python not found"
**Solution:** Reinstall Python and check "Add to PATH"

### Problem: "pip not found" 
**Solution:** Run: `python -m pip install --upgrade pip`

### Problem: "Permission denied"
**Solution:** Run Command Prompt as Administrator (Windows)

### Problem: "Port 5000 in use"
**Solution:** Change port in `app.py`: `app.run(port=5001)`

### Problem: Database errors
**Solution:** Use SQLite option: Set `USE_SQLITE=true` in `.env`

---

## 📊 Load Sample Data

1. **Start the application**
2. **Go to admin panel**: `http://localhost:5000/admin/login`
3. **Login**: `admin` / `admin123`
4. **Upload CSV**: Use the "Upload CSV File" section
5. **Select**: `sample_translations.csv` from project folder
6. **Click**: "Upload CSV"

---

## 🎉 You're Done!

Your Karai-Karai translator is now running on the new computer with:
- ✅ Bidirectional translation (Karai ↔ English)
- ✅ Beautiful modern interface
- ✅ Admin management panel
- ✅ Sample translation data
- ✅ All animations and features

**Bookmark**: `http://localhost:5000` for easy access!