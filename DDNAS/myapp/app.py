from flask import Flask, render_template
from routes import auth_bp  # Import the blueprint from routes
from routes import home_bp

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Required for session management

# Register the authentication blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(home_bp)

@app.route('/')
def index():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
