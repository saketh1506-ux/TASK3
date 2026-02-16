const { error } = require("console");
const express = require("express");
const app = express();

app.use(express.json()); 

let books = [{ id: 1, title: "book1", author: "author1" }];


app.get("/books", (req, res) => {
  res.json(books);
});


app.post("/books", (req, res) => {
  const newBook = req.body;

  console.log("Received:", newBook);

  books.push(newBook);

  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);   
  const updatedData = req.body;        

  let found = false;

  books = books.map(book => {
    if (book.id === id) {
      found = true;
      return { ...book, ...updatedData };
    }
    return book;
  });

  if (!found) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json({ message: "Book updated successfully", books });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);

  res.json({
    message: "Book deleted successfully",
    book: deletedBook[0]
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
