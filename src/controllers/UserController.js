const database = require('../services/firebase');
const jwt = require('jsonwebtoken')

const userModel = require('../models/User');
const { isEmpty } = require('../functions/validate');

// index, show, store, update, destroy


module.exports = {

    async index(req, res){
        try{
            const items = await database.ref('User').once('value');
            let users = [];

            items.forEach(item =>{
                const {password, ...obj} = item.val()

                users.push({
                    ...obj,
                    id: item.ref_.path.pieces_[1]
                });
            })
            return res.json(users);
        }catch(e){
            return res.status(400).json({ error: e });
        }
    },

    async show(req, res){
        const { uid } = req.params;
        
        try{
            await database.ref(`/User/${uid}`).once('value', function(snapshot) {
    
                if (snapshot.val() == null) {
    
                    res.json({ message: "Error: No user found", "result": false});
                   
                } else {
                    const {password, ...obj} = snapshot.val();

                    res.json({
                        ...obj,
                        id: snapshot.ref_.path.pieces_[1]
                    });
                }
            });
        }catch(err){
            return res.json({err});
        }
    },

    async store(req, res){

        const { email, password }  = req.body;
        
        database.ref('/User').on('value', function(snapshot) {
            try{
                var user = '';
                snapshot.forEach(item => {
                    if(item.val().email === email && item.val().password === password){
                        
                        const {password, ...values} = item.val();
                        
                        user = {
                            ...values,    
                            id: item.ref_.path.pieces_[1]
                        };
                    }
                })
                
                if(user !== ''){
                    var token = jwt.sign(user, 'shhhhhh');
                    return res.json({token : token})
                }else {
                    return res.status(400).json({error: 'Login not found, check email and password again'})
                }
            }catch(e){
                return res.status(400).json({ error: e }) 
            }
        }) 
    },

    async update(req, res){
            
        const { uid } = req.params;
        let data = req.body;
        
        try{
            if(isEmpty(data)) throw "Error: empty values are detecteds";
            
            await database.ref(`/User/${uid}`).update(data, function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ "message": "successfully update data", "result": true })
                }
            })

        }catch(err){
            return res.status(400).json({err});
        }
      },

    async destroy(req, res){
        const { uid } = req.params;

        try{
            await database.ref(`/User/${uid}`).remove(function(err) {
              if (err) {
                  res.send(err);
              } else {
                  res.json({ message: "success: User deleted.", "result": true })
              }
          })

        }catch(err){
            return res.json({err})
        }

    }
}