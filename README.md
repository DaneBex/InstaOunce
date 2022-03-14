# InstaOunce

InstaOunce is our app, inspired by Instagram for uploading, viewing, sharing and commenting of photos. Users can share photos, like them, comment on them and become part of the InstaOunce community.

## Index
- Live site: [InstaOunce](https://instaounce1.herokuapp.com)

## Technologies Used
 - Python
 - Flask
 - SQLAlchemy
 - React/JS
 - Redux
 - Node
 - Docker

## Getting Started
1. Clone this repo: git@github.com/DaneBex/InstaOunce
2. cd into the /app directory and install dependencies: pipenv install
3. cd into the /react-app directory and install dependencies: npm install
4. create .env file based on the .env.example file given
5. Create user in psql based on .env DATABASE_URL app_name:
 - `psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"`
6. Create a database in psql based on your .env DATABASE_URL app_db_name
7. Start shell, migrate database, seed database and run flask app
 - `pipenv shell`
 - `flask db upgrade`
 - `flask seed all`
 - `flask run`
8. Open another terminal and cd into /react-app and run the React app:
 - `npm start`

## Features

### Home/Login Page
![Home/Login Page](https://user-images.githubusercontent.com/17211586/158196734-b2208e98-e655-4b25-8972-3b62bd932f2a.png)

### Post Feed
![Post Feed](https://user-images.githubusercontent.com/17211586/158197278-c5b3edf4-33f6-4b31-bd9c-ae198467252c.png)

### Post Detail
![Post Detail](https://user-images.githubusercontent.com/17211586/158197662-73cf7052-bef6-463a-aa32-974cdbe2c845.png)

### Comments, Likes, Follows
![Add likes, comments, follows](https://user-images.githubusercontent.com/17211586/158198720-259e8170-9354-4a40-8209-f05b613c9d76.png)

### Image Upload
![Image Upload](https://user-images.githubusercontent.com/17211586/158197869-7dddbdab-80c6-4431-9fe0-92005dd557bc.png)

### User Profile Page
![User Profile Page](https://user-images.githubusercontent.com/17211586/158198067-a96be25d-51e2-4e98-9a72-84815b059911.png)
