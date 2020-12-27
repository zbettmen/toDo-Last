const express  = require('express');
const router = express.Router();
const path = require('path');
var localStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.get('/admin', (req,res) =>{
 res.sendFile(path.resolve('public/admin.html'));
});

router.get('/admin/todos', (req,res) =>{


    var response={0:'No records'};
    if(localStorage.length==0){
        res.json('')
        return;
    }
    else{
        response=[];
        for (let index = 1; index <= localStorage.length; index++) {
            var todo = localStorage.getItem(index);
            
            if(todo!=null){
                var jsonObj = {
                    todo
                }
                response.push(jsonObj)
            }
        }
    }
    
    res.json(response);
});

router.post('/admin', (req,res) =>{
    
   
    if(req.body.todoItem!=null){
        localStorage.setItem(++localStorage.length,req.body.todoItem)
        console.log("Data recieved ", req.body.todoItem);
    }

    response=[];
    for (let index = 1; index <= localStorage.length; index++) {
        var todo = localStorage.getItem(index);
        
        if(todo!=null){
            var jsonObj = {
                todo
            }
            response.push(jsonObj)
        }
        
    }
    res.json(response);
});


module.exports = router;