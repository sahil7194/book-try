const express = require('express');
const mangoose = require('mongoose');
const Book = require('./models/bookModel');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res) =>{
    res.send('api working');
})

app.get('/test',(req,res) =>{
    res.send('api working working with autoload');
})

app.post('/book',async (req,res)=>{
    try{
        const book = await Book.create(req.body);
        res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
});

app.get('/book',async (req,res) => {
    try{
        const books = await Book.find({});
        res.status(200).json(books);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});

app.get('/book/:id',async (req,res) => {
    try{
        const {id} = req.params;
        const books = await Book.findById(id);
        res.status(200).json(books);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});

app.put('/book/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id,req.body);
        
        if(!book){
            return res.status(404).json({ message:'Book not found' });
        }
        const updatedbook = await Book.findById(id);
        res.status(200).json(updatedbook);
    }catch(error) {
        res.status(500).json({message:error.message});
    }
});

app.delete('/book/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        
        if(!book){
            return res.status(404).json({ message:'Book not found' });
        }
      
        res.status(200).json({message:"book deleted"});
    }catch(error) {
        res.status(500).json({message:error.message});
    }
});

mangoose.set('strictQuery',false);

mangoose.connect('mongodb+srv://sahiltamboli7194:Test123@crudapi.jk0wgan.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000,()=>{
        console.log('connected to mangodb');
        console.log("Server is running on port 3000");
    })
}).catch((error)=>{
    console.log(error);
});