const mysql = require('mysql2');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const jsonData = JSON.parse(fs.readFileSync('restaurants.json', 'utf-8'));

// Insert restaurants data
jsonData.restaurants.forEach((restaurant) => {
  const query = `INSERT INTO restaurants (name, address, location, contact_info, opening_hours, image_url, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [restaurant.name, restaurant.address, restaurant.location, restaurant.contact_info, restaurant.opening_hours, restaurant.image_url, restaurant.rating];
  connection.query(query, values, (err) => {
    if (err) {
      console.error('Error inserting restaurant data:', err);
    } else {
      console.log('Restaurant data inserted:', restaurant.name);
    }
  });
});

// Insert menu items data
jsonData.menu_items.forEach((item) => {
  const query = `INSERT INTO menu_items (restaurant_id, item_name, price, image_url, description) VALUES (?, ?, ?, ?, ?)`;
  const values = [item.restaurant_id, item.item_name, item.price, item.image_url, item.description];
  connection.query(query, values, (err) => {
    if (err) {
      console.error('Error inserting menu item data:', err);
    } else {
      console.log('Menu item data inserted:', item.item_name);
    }
  });
});

// Insert users data
jsonData.users.forEach((user) => {
  const query = `INSERT INTO users (oauth_provider, oauth_uid, name, email, profile_image_url) VALUES (?, ?, ?, ?, ?)`;
  const values = [user.oauth_provider, user.oauth_uid, user.name, user.email, user.profile_image_url];
  connection.query(query, values, (err) => {
    if (err) {
      console.error('Error inserting user data:', err);
    } else {
      console.log('User data inserted:', user.name);
    }
  });
});

// Insert ratings data
jsonData.ratings.forEach((rating) => {
  const query = `INSERT INTO ratings (user_id, restaurant_id, menu_item_id, rating, review) VALUES (?, ?, ?, ?, ?)`;
  const values = [rating.user_id, rating.restaurant_id, rating.menu_item_id, rating.rating, rating.review];
  connection.query(query, values, (err) => {
    if (err) {
      console.error('Error inserting rating data:', err);
    } else {
      console.log('Rating data inserted:', rating.review);
    }
  });
});

connection.end();
