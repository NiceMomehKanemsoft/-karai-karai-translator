from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
from models import db, Translation, Admin
import os
from dotenv import load_dotenv
import csv
import io

load_dotenv()

app = Flask(__name__, template_folder='../frontend')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

if os.getenv('USE_SQLITE', 'false').lower() == 'true':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///translator.db'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    text = request.json.get('text', '').strip()
    direction = request.json.get('direction', 'karai_to_english')
    
    if direction == 'karai_to_english':
        translation = Translation.query.filter_by(karai_text=text).first()
        if translation:
            return jsonify({'translation': translation.english_text})
    else:  # english_to_karai
        translation = Translation.query.filter_by(english_text=text).first()
        if translation:
            return jsonify({'translation': translation.karai_text})
    
    return jsonify({'translation': 'Translation not found'})

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        admin = Admin.query.filter_by(username=username).first()
        if admin and admin.check_password(password):
            session['admin_id'] = admin.id
            return redirect(url_for('admin_dashboard'))
        flash('Invalid credentials')
    return render_template('admin_login.html')

@app.route('/admin/dashboard')
def admin_dashboard():
    if 'admin_id' not in session:
        return redirect(url_for('admin_login'))
    translations = Translation.query.all()
    return render_template('admin_dashboard.html', translations=translations)

@app.route('/admin/add', methods=['POST'])
def add_translation():
    if 'admin_id' not in session:
        return redirect(url_for('admin_login'))
    
    karai_text = request.form['karai_text']
    english_text = request.form['english_text']
    translation = Translation(karai_text=karai_text, english_text=english_text)
    db.session.add(translation)
    db.session.commit()
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/edit/<int:id>', methods=['POST'])
def edit_translation(id):
    if 'admin_id' not in session:
        return redirect(url_for('admin_login'))
    
    translation = Translation.query.get_or_404(id)
    translation.karai_text = request.form['karai_text']
    translation.english_text = request.form['english_text']
    db.session.commit()
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete/<int:id>')
def delete_translation(id):
    if 'admin_id' not in session:
        return redirect(url_for('admin_login'))
    
    translation = Translation.query.get_or_404(id)
    db.session.delete(translation)
    db.session.commit()
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/upload', methods=['POST'])
def upload_csv():
    if 'admin_id' not in session:
        return redirect(url_for('admin_login'))
    
    file = request.files['csv_file']
    if file and file.filename.endswith('.csv'):
        stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_input = csv.DictReader(stream)
        for row in csv_input:
            # Handle both column orders
            if 'karai_text' in row and 'english_text' in row:
                karai = row['karai_text']
                english = row['english_text']
            elif 'Karai-karai' in row and 'English' in row:
                karai = row['Karai-karai']
                english = row['English']
            else:
                continue
            
            translation = Translation(karai_text=karai, english_text=english)
            db.session.add(translation)
        db.session.commit()
        flash('CSV uploaded successfully')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_id', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Create default admin if not exists
        if not Admin.query.filter_by(username='admin').first():
            admin = Admin(username='admin')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
    
    # Production configuration
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'true').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)