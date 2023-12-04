const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/auth", async (req, res) => {
  try {
    const authData = JSON.parse(fs.readFileSync("./auth.json", "utf-8"));

    // Generate a unique user ID (you may use a more robust solution in production)
    const userId = authData.users.length + 1;

    // Hash the password before saving it (use a proper hashing strategy in production)
    const hashedPassword = await bcrypt.hash(req.body.pass, 10);

    // Create a new user object
    const newUser = {
      id: userId,
      username: req.body.username,
      email: req.body.email,
      fism: req.body.fism,
      pass: hashedPassword,
    };

    // Add the new user to the array
    authData.users.push(newUser);

    // Write the updated user data back to the auth.json file
    fs.writeFileSync("./auth.json", JSON.stringify(authData, null, 2));

    res.json({ success: true, data: { userId, username: req.body.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


// api for books
app.post("/api/book", async (req, res) => {
  try {
    const bookData = JSON.parse(fs.readFileSync("./book.json", "utf-8"));

    const bookId = bookData.books.length + 1;

    // Create a new book object
    const newBook = {
      id:bookId,
      title: req.body.title,
      author: req.body.author,
      cover: req.body.cover,
      publish: req.body.publish,
      pages: req.body.pages,
    };

    // Add the new book to the array
    bookData.books.push(newBook);

    // Write the updated book data back to the book.json file
    fs.writeFileSync("./book.json", JSON.stringify(bookData, null, 2));

    res.json({ success: true, data: { title: req.body.title } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.delete("/api/book/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    // Read existing book data
    const bookData = JSON.parse(fs.readFileSync("./book.json", "utf-8"));

    // Find the index of the book to delete
    const indexToDelete = bookData.books.findIndex(
      (book) => (book.id && book.id === bookId) || (book.id && book.isbn === bookId)
    ); 

    if (indexToDelete !== -1) {
      // Remove the book from the array
      const deletedBook = bookData.books.splice(indexToDelete, 1);

      // Write the updated book data back to the book.json file
      fs.writeFileSync("./book.json", JSON.stringify(bookData, null, 2));

      res.json({ success: true, data: deletedBook });
    } else {
      res.status(404).json({ success: false, error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


// Endpoint for updating a book with PATCH request
app.patch('/api/book/:id', (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    // Read existing book data
    const bookData = JSON.parse(fs.readFileSync("./book.json", 'utf-8'));

    // Find the index of the book to update
    const indexToUpdate = bookData.books.findIndex((book) => book.id === bookId);

    if (indexToUpdate !== -1) {
      // Update the book with the new data from the request body
      bookData.books[indexToUpdate] = { ...bookData.books[indexToUpdate], ...req.body };

      // Write the updated book data back to the book.json file
      fs.writeFileSync("./book.json", JSON.stringify(bookData, null, 2));

      res.json({ success: true, data: bookData.books[indexToUpdate] });
    } else {
      res.status(404).json({ success: false, error: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
