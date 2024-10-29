This is a django project


Setting Up the Backend
Navigate to the backend directory:
    
    cd backend
    
Create a virtual environment (optional but recommended):

    python -m venv env
    source env/bin/activate  # On Windows use `venv\Scripts\activate`
    
    
Install the required packages:
    
    pip install -r requirements.txt
    
    
Apply migrations:
    
    python manage.py migrate


Create a superuser (optional for admin access):
    
    python manage.py createsuperuser


Start the Django server:
    
    python manage.py runserver