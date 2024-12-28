const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
const mongoose = require('mongoose');

app.use(methodOverride('X-HTTP-Method-Override'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//const cats =["Socttish","Ragdoll","British Shorthair"];


const { pathToFileURL } = require('url');
mongoose.connect('mongodb://127.0.0.1:27017/Cats');

const Cat = mongoose.model('Cat', { name: String });

app.get('/api', (req,res)=>{
    res.send("Welcome to Our RESTful API");
})

//GET
app.get('/api/cats', async (req,res)=>{
    //res.json(cats);
     /*Cat.find({}, (err,cats)=>{
        if(err){
            console.log(`there is an error: ${err}`)
        }else{
            res.json(cats)
        }
    })*/
   try {
        const cats = await Cat.find({});
        res.json(cats);
    } catch (err) {
        console.error(`There is an error: ${err}`);
        res.status(500).json({ error: 'An error occurred while fetching cats.' });
    }
})

//POST
app.post('/api/cats/create', (req, res)=>{
    const cat = new Cat({name: req.body.name})
    cat.save().then(()=>{
        res.send('data added successfully')
    })
})

//PUT
app.put('/api/cats/update/:_id', async (req,res)=>{
    const id = req.params._id;
    
     /*Cat.findByIdAndUpdate(id, {name:req.body.name}, (err)=>{
        if(err){
            console.log(`There is an error: ${err}`)
        }else{
            res.send('data updated successfully')
        }
    });*/

    Cat.findByIdAndUpdate(id, { name: req.body.name }, { new: true })
        .then(updatedCat => {
            if (!updatedCat) {
                return res.status(404).send('Cat not found');
            }
            res.send('Data updated successfully');
        })
        .catch(err => {
            console.error(`There is an error: ${err}`);
            res.status(500).send('An error occurred while updating the data');
        });
})

//DELETE
app.delete('/api/cats/remove/:_id', (req,res)=>{
    const id = req.params._id;
    
    /*Cat.findByIdAndUpdate(id, (err)=>{
       if(err){
           console.log(`There is an error: ${err}`)
       }else{
           res.send('data deleted successfully')
       }
   })*/

   Cat.findByIdAndDelete(id)
   .then(deletedCat => {
       if (!deletedCat) {
           return res.status(404).send('Cat not found');
       }
       res.send('Data deleted successfully');
   })
   .catch(err => {
       console.error(`There is an error: ${err}`);
       res.status(500).send('An error occurred while deleting the data');
   })
});





app.listen(3000, ()=>console.log('server is up on port 3000'));



