const Books = require('../model/booksModel')




//show all books at home page
exports.getAllBooks = async (req,res) => {
    try{
        const allBooks = await Books.findAll();
        res.status(200).json(allBooks);
    }catch(err){
        res.status(500).send("Unable to fetch Data",err)
    }
}

//show all books by name page
exports.getBooksByName = async (req,res) => {
    const { BookName } = req.params
    try{
        const booksByName = await Books.findOne({where : { BookName }});
        res.json(booksByName);
    }catch(err){
        res.status(500).send(err.message)
    }
}

//show all books by an author
exports.getBooksByAuthor = async (req,res) => {
    const { Author } = req.params
    try{
        const booksByAuthor = await Books.findOne({where : { Author }});
        res.status(201).json(booksByAuthor);
    }catch(err){
        res.status(500).send(err.message)
    }
}

//create new book
exports.createBook =  async (req,res) => {
    const { BookName, Author, Category, url } = req.body
    const image = `uploads/${req.file.filename}`;
    try{
        const newBook = await Books.create({BookName, Author, Category, url, image});
        res.redirect('/')
    }catch (error) {
        console.error('Error creating book:', error);
        res.redirect('/');
    }
}

//update existing book
exports.updateBooks = async (req,res) => {
    const{ id } = req.params;
    const { BookName, Author, Category } = req.body;
    try{
        const updateBook = await Books.findByPk(id)
        if(!updateBook){
            return res.status(404).send('Book Not Found')
        }
        updateBook.BookName = BookName;
        updateBook.Author = Author;
        updateBook.Category = Category;

        await updateBook.save();
        res.json(updateBook)
    }catch(err){
        res.status(500).send(err.message)
    }
}

//delete existing book
exports.deleteBooks = async (req,res) => {
    const{ id } = req.params;
    try{
        const deleteBook = await Books.findByPk(id)
        if(!deleteBook){
            return res.status(404).send('Book Not Found')
        }
        await deleteBook.destroy();
        res.status(201).json({message: "Book Deleted Successfully"})
    }catch(err){
        res.status(500).send(err.message)
    }
}
