from flask import Flask, render_template, request
import requests
from config import Config

app = Flask(__name__)

# Load API credentials from config
APP_ID = Config.APP_ID
APP_KEY = Config.APP_KEY
BASE_URL = 'https://api.edamam.com/search'

def search_recipes(ingredients):
    params = {
        'q': ingredients,
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'from': 0,
        'to': 10,
    }
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # Raises an error for bad responses
        return response.json()  # Return the JSON response if successful
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return None
    except Exception as err:
        print(f"An error occurred: {err}")
        return None

@app.route('/', methods=['GET', 'POST'])
def index():
    recipes = None  # Initialize as None
    submitted = False  # Track if the form has been submitted

    if request.method == 'POST':
        submitted = True
        ingredients = request.form['ingredients']
        recipes = search_recipes(ingredients)  # Fetch recipes based on ingredients

    return render_template('index.html', recipes=recipes, submitted=submitted)

if __name__ == '__main__':
    app.run(debug=True)