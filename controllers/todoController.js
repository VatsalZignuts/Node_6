var bodyParser = require ('body-parser');
const { default: mongoose } = require('mongoose');

//var data = [{item: 'one'}, {item: 'two'}, {item: 'three'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

// server

// mongoose.connect('mongodb://vatsalk:ejnDb0zn54HqoEXrchNCISC54Ku4@15.206.7.200:28017/vatsalk').then(() => {
mongoose.connect('mongodb://vatsalk:ejnDb0zn54HqoEXrchNCISC54Ku4@15.206.7.200:28017/vatsalk?authSource=admin&ssl=false').then(() => {
    console.log("database connected ....");    
}).catch(err => {
    console.log('err :: ', err);
});

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('todo', todoSchema);

// async function createNew() {

//     let newItem = new Todo({
//         item: "four"
//     });
//     await newItem.save();
//     console.log("new item :: ", newItem);
// }
// createNew();

// var itemOne = Todo({item: 'four'}).save((err)=>{
//     if (err) throw err;
//     console.log('item saved');
// })


module.exports = (app) => {

app.get('/', (req, res) => {
res.send('Welcome')
});

app.get('/todo',(req,res)=>{
    //console.log("object");    
    Todo.find({},(err,data)=>{
        console.log("DATA RENDERED :: ",err);
        res.render('todo',{todos:data});
    });

   // res.render('todo',{todos: data});
  
});

app.post('/todo',urlencodedParser,(req,res)=>{ 
    
    var newTodo = Todo(req.body).save((err,data)=>{
        console.log("DATA ADDED :: ",err);
        res.json(data)
    })
    
    // data.push(req.body);
    // res.json(data);
    
});

app.delete('/todo/:item', async (req,res)=>{
console.log(req.params.item.replace(/\-/g,""));
// let a = await Todo.findOne({ item: req.params.item.replace(/\-/g,"")});
let abc = await Todo.deleteOne({item:req.params.item.replace(/\-/g,"")});

let data = await Todo.find();
console.log(abc);

//  data = data.filter((todo)=>{
//     return `-${todo.item}-` !== req.params.item;
//  });
 return res.json(data);
});
}

// app.delete('/todo/:item',(req,res)=>{
//     data = data.filter((todo)=>{
//        return `-${todo.item}-` !== req.params.item;
//     });
//     return res.json(data);
// });



// 31---`-${todo.item}-` !== req.params.item;