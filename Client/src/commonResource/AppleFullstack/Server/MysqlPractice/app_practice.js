const mysql = require("mysql2");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
//var cors = require("cors");

var app = express();
//app.use(cors());
// Middle ware to extract info from the html
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middle ware to have access to the frontend

app.use(express.json());
app.use(cors());
// app.listen(4567, () => console.log("listening to: 1234"));

const connection = mysql.createConnection({
  host: "127.0.0.1", // Change this to your MySQL server host
  user: "mydbuser", // Change this to your MySQL username
  password: "dbuser", // Change this to your MySQL password
  database: "mydb", //
});

//  QUESTION -1
//connect to Mysql
//use connect method to connect with database
connection.connect((err) => {
  if (err) console.log(err);
  else console.log("connected to Mysql");
});

app.listen(4567, () =>
  console.log("listening and running on http://localhost:4567")
);

//QUESTION 2
app.get("/create-table", (req, res) => {
  let createProducts = `CREATE TABLE if not exists Products(
       product_id int auto_increment,
       product_url varchar(255) not null,
       product_name varchar(255) not null,
      PRIMARY KEY (product_id)
   )`;
  let createUser = `CREATE TABLE if not exists Users(
      user_id int auto_increment,
      PRIMARY KEY (user_id),
      User_name varchar(255) not null,
      User_password varchar(255) not null
    )`;
  let createOrders = `CREATE TABLE if not exists Orders(
      Order_id int auto_increment,
       PRIMARY KEY (Order_id),
       product_id int(11) not null,
      user_id int(11) not null,
       
       FOREIGN KEY (product_id) REFERENCES Products(product_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )`;

  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
      description_id int auto_increment,
      product_id int(11) not null,
      product_brief_description varchar(255) not null,
      product_description varchar(255) not null,
      product_img varchar(255) not null,
      product_link varchar(255) not null,
      PRIMARY KEY (description_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
      price_id int auto_increment,
      product_id int(11) not null,
      starting_price varchar(255) not null,
      price_range varchar(255) not null,
      PRIMARY KEY (price_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

  //excuting the query
  //result:-referes to the row part that has been created
  //fields:-refers to the colomuns
  connection.query(createOrders, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
    //else res.end(message)
  });
  connection.query(createProducts, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });
  connection.query(createProductDescription, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });
  connection.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
    //else res.end(message)
  });

  connection.query(createUser, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
    //else res.end(message)
  });

  res.end("Table is Created");
  console.log("Table is Created");
});

app.post("/insert-customers-info", (req, res) => {
  const {
    product_url,
    product_name,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
    User_name,
    User_password,
  } = req.body; // Extracting the values sent from the frontend

  let insertProducts = `INSERT INTO Products (product_url,product_name) VALUES (?,?)`;
  let insertProductDescription = `INSERT INTO productdescription(product_id,
     product_brief_description,product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)`;
  let insertProductPrice = `INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
  let insertUser = `INSERT INTO Users (User_name,User_password) VALUES (?,?)`;
  let insertOrders = `INSERT INTO Orders (product_id, user_id) VALUES (?, ?)`;
  //Executing the query we wrote above
  connection.query(
    insertProducts,
    [product_url, product_name],
    (err, results, fields) => {
      if (err) console.log(`Error Found: ${err}`);

      console.table(results);
      console.log(results);
      const id = results.insertId;
      //const idd = results.insertId;
      console.log(
        "id from customers table to be used as a foreign key on the other tables>>> ",
        id
      );

      connection.query(
        insertProductDescription,
        [
          id,
          product_brief_description,
          product_description,
          product_img,
          product_link,
        ],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);
        }
      );

      connection.query(
        insertProductPrice,
        [id, starting_price, price_range],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);
        }
      );
      connection.query(   insertUser, [User_name, User_password],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);
          //else console.log(results)
          let user_id = results.insertId;

          connection.query(
            insertOrders,
            [id, user_id],
            (error, results, fields) => {
              if (err) console.log(`Error Found: ${err}`);
            }
          );
        }
      );
      // connection.query(insertOrders, [id], (err, results, fields) => {
      //   if (err) console.log(`Error Found: ${err}`);
      // });
    }
  );

  res.end("Data inserted successfully!");
  console.log("Data inserted successfully!");
});

app.get("/customers-detail-info", (req, res) => {
  connection.query(
    "SELECT * FROM Products JOIN productdescription JOIN ProductPrice ON Products.product_id = productdescription.product_id AND Products.product_id = ProductPrice.product_id",
    (err, results, fields) => {
      if (err) console.log("Error During selection", err);
      // console.log(results);
      res.send(results);
    }
  );
});

app.put("/update", (req, res) => {
  const { newName, id } = req.body;
  let updateName = `UPDATE Products SET product_name ='${newName}' WHERE product_id ='${id}'`;
  connection.query(updateName, [newName, id], (err, results, fields) => {
    if (err) throw err;
    console.log(results.affectedRows + " record(s) updated");
    res.send(results);
  });
});

app.delete("/remove-user", (req, res) => {
  const { id } = req.body;
  let removeName = `DELETE FROM Products WHERE product_id = ?`;
  let removeAddress = `DELETE FROM productdescription WHERE product_id = ?`;
  let removeCompany = `DELETE FROM ProductPrice WHERE product_id = ?`;

  connection.query(removeAddress, [id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows + " record(s) Deleted");
  });

  connection.query(removeCompany, [id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows + " record(s) Deleted");
  });

  connection.query(removeName, [id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows + " record(s) Deleted");
  });
  res.end("deleted");
});
