from flask import Blueprint, request, jsonify, render_template, redirect, url_for, session

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
        
    user_id = request.form.get('user_id')
    password = request.form.get('password')

    if not user_id or not password:
        return jsonify({'error': 'Missing credentials'}), 400

    # Dummy login check
    if user_id == "admin" and password == "admin123":
        session['user_id'] = user_id  # Store user in session
        return redirect(url_for('auth.home'))
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/home')
def home():
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
    return render_template('home.html')

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return render_template('signup.html')
    return render_template('signup.html')

@auth_bp.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('auth.login'))
