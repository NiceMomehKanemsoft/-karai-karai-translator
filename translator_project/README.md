# Karai-Karai Translator Project

A modern Flask web application for bidirectional translation between Karai-Karai and English with comprehensive admin management features.

## Features

- **Bidirectional Translation**: Translate Karai-Karai ↔ English in both directions
- **Language Switcher**: Easy toggle between translation directions
- **Modern UI**: Bootstrap 5 with beautiful animations and responsive design
- **Admin Panel**: Secure admin login with hashed passwords
- **CRUD Operations**: Add, edit, and delete translations
- **Bulk Import**: Upload CSV files to import multiple translations
- **Dual Database Support**: MySQL or SQLite options
- **Professional Styling**: Montserrat font, mature color scheme, smooth animations

## Setup Instructions

### 1. Database Setup
Create a MySQL database named `translator_db`:
```sql
CREATE DATABASE translator_db;
```

### 2. Environment Configuration
Update the `.env` file in the `backend/` directory:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=translator_db
SECRET_KEY=translator_secret_key_2024
USE_SQLITE=false
```

**For SQLite (easier setup):**
```
USE_SQLITE=true
```

### 3. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

**Features Available:**
- Main translator: `http://localhost:5000`
- Admin login: `http://localhost:5000/admin/login`
- Admin dashboard: `http://localhost:5000/admin/dashboard`

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`

## CSV Upload Format
For bulk import, use CSV files with either format:

**Standard Format:**
```csv
karai_text,english_text
"Kara","Hi"
"Usai","Hello"
"Taimako","Help"
```

**Alternative Format:**
```csv
English,Karai-karai
"Hi","Kara"
"Hello","Usai"
"Help","Taimako"
```

## Key Features

### Translation Interface
- **Bidirectional translation** with language switcher
- **Real-time translation** with loading animations
- **Enter key support** for quick translation
- **Responsive design** for all devices
- **Beautiful animations** and smooth transitions

### Admin Dashboard
- **Secure authentication** with session management
- **Add/Edit/Delete** translations with inline editing
- **CSV bulk import** with flexible format support
- **Translation statistics** and management tools
- **Professional interface** with Bootstrap 5

### Technical Features
- **Dual database support** (MySQL/SQLite)
- **Environment-based configuration**
- **Modern CSS animations** with Montserrat font
- **Professional color scheme** and responsive design
- **Error handling** with user-friendly messages

## Project Structure
```
translator_project/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Environment variables
│   └── static/
│       ├── style.css      # Enhanced CSS with animations
│       └── script.js      # Interactive JavaScript
└── frontend/
    ├── index.html         # Bidirectional translation interface
    ├── admin_login.html   # Secure admin login
    └── admin_dashboard.html # Professional admin panel
└── sample_translations.csv  # Sample data for testing
```

## Deployment to New Computer (Step-by-Step)

### Prerequisites Installation

#### Step 1: Install Python
1. **Download Python 3.8+** from [python.org](https://www.python.org/downloads/)
2. **During installation**: Check "Add Python to PATH"
3. **Verify installation**: Open Command Prompt/Terminal and run:
   ```bash
   python --version
   pip --version
   ```

#### Step 2: Install Git (Optional but Recommended)
1. **Download Git** from [git-scm.com](https://git-scm.com/downloads)
2. **Install with default settings**
3. **Verify**: `git --version`

#### Step 3: Install MySQL (Optional - for MySQL setup)
1. **Download MySQL** from [mysql.com](https://dev.mysql.com/downloads/installer/)
2. **Install MySQL Server** with default settings
3. **Remember your root password**

### Project Transfer Methods

#### Method 1: Copy Project Folder
1. **Copy entire `translator_project` folder** to USB drive/cloud storage
2. **Transfer to new computer**
3. **Extract to desired location** (e.g., `C:\Projects\` or `~/Projects/`)

#### Method 2: Create ZIP Archive
1. **Right-click project folder** → "Send to" → "Compressed folder"
2. **Transfer ZIP file** to new computer
3. **Extract ZIP** to desired location

### Setup on New Computer

#### Step 1: Navigate to Project
```bash
cd path/to/translator_project
```

#### Step 2: Create Virtual Environment (Recommended)
```bash
# Create virtual environment
python -m venv translator_env

# Activate virtual environment
# Windows:
translator_env\Scripts\activate
# Mac/Linux:
source translator_env/bin/activate
```

#### Step 3: Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Step 4: Configure Database

**Option A: SQLite (Easiest - No MySQL needed)**
1. **Edit `.env` file**:
   ```
   USE_SQLITE=true
   SECRET_KEY=translator_secret_key_2024
   ```
2. **Skip MySQL setup** - SQLite works automatically

**Option B: MySQL Setup**
1. **Create database**:
   ```sql
   CREATE DATABASE translator_db;
   ```
2. **Edit `.env` file**:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=translator_db
   SECRET_KEY=translator_secret_key_2024
   USE_SQLITE=false
   ```

#### Step 5: Run Application
```bash
python app.py
```

#### Step 6: Access Application
- **Open browser**: `http://localhost:5000`
- **Admin login**: `http://localhost:5000/admin/login`
- **Credentials**: `admin` / `admin123`

### Troubleshooting

#### Common Issues:

**1. "Python not found"**
- **Solution**: Reinstall Python with "Add to PATH" checked

**2. "pip not found"**
- **Solution**: Run `python -m pip install --upgrade pip`

**3. "Module not found"**
- **Solution**: Ensure virtual environment is activated and run `pip install -r requirements.txt`

**4. "Database connection error"**
- **Solution**: Use SQLite option (`USE_SQLITE=true`) or check MySQL credentials

**5. "Port already in use"**
- **Solution**: Change port in `app.py`: `app.run(debug=True, port=5001)`

### Quick Start Script

Create `start.bat` (Windows) or `start.sh` (Mac/Linux):

**Windows (start.bat):**
```batch
@echo off
cd backend
translator_env\Scripts\activate
python app.py
pause
```

**Mac/Linux (start.sh):**
```bash
#!/bin/bash
cd backend
source ../translator_env/bin/activate
python app.py
```

### Data Migration

#### Export Data (From Old Computer)
1. **Login to admin panel**
2. **Backup database** or export translations
3. **Copy `.env` file** with your settings

#### Import Data (To New Computer)
1. **Use CSV upload** feature in admin panel
2. **Upload `sample_translations.csv`** for initial data
3. **Add custom translations** through admin interface
a
## Usage

1. **Translation**: Visit homepage, select direction, enter text, translate
2. **Admin Access**: Go to `/admin/login`, use `admin/admin123`
3. **Add Translations**: Use admin dashboard to add individual entries
4. **Bulk Import**: Upload CSV files for multiple translations
5. **Management**: Edit or delete existing translations as needed