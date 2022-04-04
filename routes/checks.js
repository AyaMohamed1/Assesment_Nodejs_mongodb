const router = require('express').Router();
const verify = require('./privateRoutes');
const Check = require('../models/check');


// Get all checks for user
router.get('/', verify, async(req, res) => {
    const userEmail = req.user.email
    var query = {}
    query["owner_email"] = userEmail
    try{
        const checks = await Check.find(query);
        res.json(checks);
    }
    catch(err){
        res.json({message: err});
    }
});


// Create a check 
router.post('/', verify, async(req, res) => {
    // console.log(req.body.name)
    const check = new Check({
        name:req.body.name,
        url:req.body.url,
        protocol:req.body.protocol,
        owner_email:req.user.email
    });
    console.log(check);
    try{
        const savedCheck = await check.save();
        res.json(savedCheck);
    }
    catch(err){
        res.json({ message: err });
    }
});


// Get specific check
router.get('/:checkId', verify, async(req, res) => {
    try{
        const check = await Check.findById(req.params.checkId);
        if(req.user.email == check.owner_email){
            res.json(check);
        }
        else{
            res.send("You are not the owner, You are not allowed to view this check.")
        }
    }
    catch(err){
        res.json({message: err});
    }
});

// Delete check
router.delete('/:checkId', verify, async(req, res) => {
    try{
        const check = await Check.findById(req.params.checkId);
        if(req.user.email == check.owner_email){
            try{
                const removedCheck = await Check.remove({_id: req.params.checkId});
                res.json(removedCheck);
            }
            catch(err){
                res.json({message: err});
            }
        }
        else{
            res.send("You are not the owner, You are not allowed to delete this check.")
        }
    }
    catch(err){
        res.json({message: err});
    }
    
})

// Update check
router.put('/:checkId', verify, async(req, res) => {
    try{
        const check = await Check.findById(req.params.checkId);
        if(req.user.email == check.owner_email){
            try{
                const updateCheck = await Check.updateOne(
                    {_id: req.params.checkId}, 
                    {$set: {name: req.body.name, url: req.body.url, protocol: req.body.protocol}});
                res.json(updateCheck);
            }
            catch(err){
                res.json({message: err});
            }
        }
        else{
            res.send("You are not the owner, You are not allowed to update this check.")
        }
    }
    catch(err){
        res.json({message: err});
    }
})

module.exports = router;