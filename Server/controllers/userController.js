const multer = require("multer")
const mongoose = require("mongoose")
const fs = require('fs')
var path = require("path");

const tweetImageSchema = new mongoose.Schema({
    tweet: String,
    img: {
        data: Buffer,
        contentType: String
    },
    userId: String,
    l: [{
        likedBy: {
            type: String,
            default: " "
        }
    }],
    count: {
        type: Number,
        default: 0 
    },
    tweetId: String,
    time: Number,
    retweetedBy:[String]
})
const TweetImages = mongoose.model("TweetImage", tweetImageSchema)

const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
 
const upload = multer({
    storage: multerConfig,
}) 

exports.uploadImage = upload.single('photo')

exports.upload = (req,res) => {
    if(req.file!=undefined){
        const tweetImage = new TweetImages({
            tweet: req.body.tweet,
            img: {
                data: fs.readFileSync(path.join("C:/Social Media/server/public/" + req.file.filename)),
                contentType: 'image/jpg'
            },
            userId: req.body.userId,
            time: Date.now()
        })
        tweetImage.save()
    }else{
        const tweetImage = new TweetImages({
            tweet: req.body.tweet,
            userId: req.body.userId,
            time: Date.now()
        })
        tweetImage.save()
    }
    res.status(200).json({
        success: 'Success'
    })
}

exports.uploadGet = (req,res) => {
    TweetImages.find({}, (err, images) => {
        res.json(images)
    }).sort('-time').exec((err, docs) => {});
} 

exports.likes = (req,res) => {
    var present
    TweetImages.findById({_id: req.body.likedOn}, function(err, found){
        if(found.l.length!==0){
            for(i=0; i<found.l.length;i++){
                if(found.l[i].likedBy===req.body.likedBy){
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
            TweetImages.findByIdAndUpdate({_id: req.body.likedOn}, {$pull: {l: {likedBy: req.body.likedBy}}}, function(err, update){
                res.json(false)
            })
        }else{
            TweetImages.findByIdAndUpdate({_id: req.body.likedOn}, {$push: {l: {likedBy: req.body.likedBy}}}, function(err, update){
                res.json(true)
            })
        }
    })
}

exports.retweet = (req,res) => {
    var present
    TweetImages.findById({_id: req.body.retweetedOn}, function(err, found){
        if(found.retweetedBy.length!==0){
            for(i=0; i<found.retweetedBy.length;i++){
                if(found.retweetedBy[i]===req.body.retweetedBy){
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
            TweetImages.findByIdAndUpdate({_id: req.body.retweetedOn}, {$pull: {retweetedBy: req.body.retweetedBy}}, function(err, update){
                res.json(false)
            })
        }else{
            TweetImages.findByIdAndUpdate({_id: req.body.retweetedOn}, {$push: {retweetedBy: req.body.retweetedBy}}, function(err, update){
                res.json(true)
            })
        }
    })
}


exports.deleteTweet = (req,res) => {
    TweetImages.findByIdAndRemove(req.body.delete, (err, dT) => {
        if(err){
            console.log(err)
        }
    })
}