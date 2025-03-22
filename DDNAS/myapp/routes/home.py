from flask import Blueprint, render_template

# Define a Blueprint for the home module
home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def home():
    return render_template('home.html')

@home_bp.route('/about')
def about():
    return render_template('about.html')

@home_bp.route('/letter')
def letter():
    return render_template('letter.html')

@home_bp.route('/login')
def login():
    return render_template('login.html')
