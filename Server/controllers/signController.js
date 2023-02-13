const mongoose = require("mongoose")

const signSchema = new mongoose.Schema({
    name:String,
    email: String,
    userName: String,
    password: String,
    followId: [String],
    followers: [String]
})
const Signs = new mongoose.model("Sign", signSchema)

exports.signup = (req,res) => {
    // console.log(req.body)
    const Sign = new Signs({
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
    })   
    Sign.save()
    res.json(Sign._id)  
} 
exports.signupGet = (req,res) => {
    Signs.find({}, (err, userData) => {
        res.json(userData)
    })
}
 
exports.signin = (req, res) => {
    Signs.findOne({userName: req.body.userName}, function(err, foundUser){
        // console.log(foundUser)
        if(foundUser){
            if(foundUser.password===req.body.password){
                res.json(foundUser._id)
            }else{
                res.json(404)
            }
        }else{
            res.json(404)
        }
    }) 
}

exports.follow = (req,res) => {
    Signs.findById({_id: req.body.userId}, function(err, found){
        if(found.followId.length!==0){
            for(i=0; i<found.followId.length;i++){
                if(found.followId[i]===req.body.followId){
                    present=true
                    break
                }else{
                    present=false
                }
            }
        }else{
            present=false
        }
        if(present){
            Signs.findByIdAndUpdate({_id: req.body.userId}, {$pull: {followId: req.body.followId}}, function(err, update){
                res.json(false)
            })
        }else{
            Signs.findByIdAndUpdate({_id: req.body.userId}, {$push :{followId: req.body.followId}}, function(err, update){
                res.json(true)
            })
        }
    })

    Signs.findById({_id: req.body.followId}, function(err, found){
        if(found.followers.length!==0){
            for(i=0; i<found.followers.length;i++){
                if(found.followers[i]===req.body.userId){
                    present=true
                    break
                }else{
                    present=false
                }
            }
        }else{
            present=false
        }
        if(present){
            Signs.findByIdAndUpdate({_id: req.body.followId}, {$pull: {followers: req.body.userId}}, function(err, update){})
        }else{
            Signs.findByIdAndUpdate({_id: req.body.followId}, {$push :{followers: req.body.userId}}, function(err, update){})
        }
    })
}