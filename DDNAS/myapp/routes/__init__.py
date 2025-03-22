from flask import Blueprint

# Creating a Blueprint for authentication routes
auth_bp = Blueprint('auth', __name__)

from .auth import *  # Import auth.py functions
from .home import home_bp  # Ensure this line exists

