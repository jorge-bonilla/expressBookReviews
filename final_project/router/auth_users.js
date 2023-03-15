const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
//return true;
}

const authenticatedUser = (username,password)=>{ 
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;
  
  if ((username == null) || (password == null) ) {
    res.status(400).json({message:"username or password has not been sent"});
  } else {

    if (authenticatedUser(username,password)) {
        let accessToken = jwt.sign({
          data: username
        }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = {
          accessToken,username
      }
      return res.status(200).send("User successfully logged in");
      } else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
      };


  }


});


regd_users.put("/auth/review/:isbn", (req, res) => { 
   const username = req.user.data;
   const review = req.query.review;
   const isbn = req.params.isbn;
   let reviews = books[isbn].reviews; 

   let filtered_reviews= reviews.filter((review) => review.username === username);
   if(filtered_reviews.length>0){
        let filtered_review = filtered_reviews[0];
        filtered_review.review=review;
        reviews = reviews.filter((review) => review.username != username);
        reviews.push(filtered_review);
   } else {
        books[isbn].reviews.push({"username" : username ,"review" : review});
   }

  return res.send( reviews);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
   const username = req.user.data;
   const isbn = req.params.isbn;
   let reviews = books[isbn].reviews; 

   let filtered_reviews= reviews.filter((review) => review.username === username);
   if(filtered_reviews.length>0){
        reviews = reviews.filter((review) => review.username != username);
   } 

   return res.send( reviews);

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
