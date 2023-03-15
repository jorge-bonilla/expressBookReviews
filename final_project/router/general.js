const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let filtered_users= users.filter((user) => user.username === req.query.username);
    if(filtered_users.length>0){
        res.send("The user" + (' ')+ (req.query.username) + " Has already been added before");
    } else {
        if ((req.query.username == null) || (req.query.password == null) ) {
            res.send("username or password has not been sent");
        }
        else {
            users.push({"username":req.query.username,"password":req.query.password}); 
            res.send("The user" + (' ')+ (req.query.username) + " Has been added!");
        }
    }
    

});

// task 1 - Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify({books},null,4));
});

// TASK 10 - Get the book list available in the shop using promises
public_users.get('/books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Promise for Task 10 resolved"));
  });

// task 2 - Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// TASK 11 - Get book details based on ISBN using promises
public_users.get('/isbn_t11/:isbn',function (req, res) {
    const get_book = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        res.send(books[isbn]);
      });
      get_book.then(() => console.log("Promise for Task 11 resolved"));
  });
  
// Task 3 - Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filtered_books=Object.values(books).filter((book) => book.author === author);
    res.send(filtered_books);
});

// TASK 12 - Get book details based on author  using promises
public_users.get('/author_t12/:author',function (req, res) {
    const get_book = new Promise((resolve, reject) => {
        const author = req.params.author;
        let filtered_books=Object.values(books).filter((book) => book.author === author);
        res.send(filtered_books);
      });
      get_book.then(() => console.log("Promise for Task 12 resolved"));
});
  
// task 4 - Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filtered_books=Object.values(books).filter((book) => book.title === title);
    res.send(filtered_books);
});

// TASK 13 - Get all books based on title  using promises
public_users.get('/title_t13/:title',function (req, res) {
    const get_book = new Promise((resolve, reject) => {
        const title = req.params.title;
        let filtered_books=Object.values(books).filter((book) => book.title === title);
        res.send(filtered_books);
      });
      get_book.then(() => console.log("Promise for Task 12 resolved"));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const reviews = books[isbn].reviews;
    res.send(reviews);
});

module.exports.general = public_users;

