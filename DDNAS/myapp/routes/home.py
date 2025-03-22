from flask import Blueprint, render_template

# Create a Blueprint for the letter page
letter_bp = Blueprint("letter", __name__)

@letter_bp.route("/letter")
def letter():
    return render_template("letter.html")
