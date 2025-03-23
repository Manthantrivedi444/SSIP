from flask import Flask, render_template, redirect, url_for
from routes import auth_bp  # Import the blueprint from routes
from routes import home_bp

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Required for session management

# Register the authentication blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(home_bp)

# Make the root URL redirect to login page
@app.route('/')
def index():
    return redirect(url_for('login'))

# Login route
@app.route('/login')
def login():
    return render_template('login.html')

# Your other routes...
@app.route('/auth/login', methods=['POST'])
def auth_login():
    # Your login authentication logic here
    pass

@app.route('/home')
def home():
    # Your home page logic here
    pass

if __name__ == '__main__':
    app.run(debug=True)
