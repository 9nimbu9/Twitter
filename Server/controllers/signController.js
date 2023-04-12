const mongoose = require("mongoose")
const multer = require("multer")
const fs = require('fs')
var path = require("path");
const nodemailer = require('nodemailer');
mongoose.connect("mongodb://localhost:27017/socialDB")

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'nimishhgoel@gmail.com', 
      pass: 'jfmefrjonapgwqsx'
    }
  });

const signSchema = new mongoose.Schema({
    name:String,
    email: String,
    userName: String,
    password: String,
    followId: [String],
    followers: [String],
    img: {
        data: Buffer,
        contentType: String
    },
    userId: String,
    likedId: [String],
    commentId: [String]
})

const Signs = new mongoose.model("Sign", signSchema)

const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
 
const profileupload = multer({
    storage: multerConfig,
}) 

exports.profileImage = profileupload.single('photo')

exports.profileUpload = (req,res) => {
    if(req.file!=undefined){
        Signs.findByIdAndUpdate({_id: req.body.userId}, {$set: {img: {data: fs.readFileSync(path.join("C:/Social Media/server/public/" + req.file.filename)), contentType: 'image/jpg'}}}, function(err, update){
            console.log(update)
        })
    }
}


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


exports.updateSigns1 = (id, likedId) => {
    Signs.findByIdAndUpdate(id, {$pull: {likedId: likedId}}, function(err, update){})
}
exports.updateSigns2 = (id, likedId) => {
    Signs.findByIdAndUpdate(id, {$push: {likedId: likedId}}, function(err, update){})
}
exports.updateSign3 = (id, commentId) => {
    Signs.findByIdAndUpdate(id, {$push: {commentId: commentId}}, function(err, update){})
}

exports.findUser = (req,res) => {
    Signs.find({}, (err, userData) => {
        res.json(userData)
    })
}

exports.signupGet = (req,res) => {
    Signs.find({}, (err, userData) => {
        res.json(userData)
    })
}
 
exports.signin = (req, res) => {
    Signs.findOne({ userName: req.body.userName }, function (err, foundUser) {
      if (foundUser) {
        if (foundUser.password === req.body.password) {
          res.json(foundUser._id);
          const mailOptions = {
            from: 'nimishhgoel@gmail.com',
            to: foundUser.email,
            subject: 'Login notification',
            text: `You have logged in at ${new Date().toLocaleString()}`,
            html: `You have logged in at <strong>${new Date().toLocaleString()}</strong>`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email notification sent: %s', info.messageId);
            }
          });
        } else {
          res.json(404);
        }
      } else {
        res.json(404);
      }
    });
  };
  

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
        if(found!==undefined){
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

exports = Signs;
