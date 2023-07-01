# Korila

This is the repository for the final project of the Software Development Academy Estonia.

To run this code, make sure to create an .env file in the folder 'Korila' which has the following data:
DB_NAME=Insert_your_DB_name
DB_USER=Insert_your_DB_user
DB_PASSWORD=Insert_your_DB_password

and run the commands:

python manage.py install -r requirements 
python manage.py migrate
python manage.py compilemessages
