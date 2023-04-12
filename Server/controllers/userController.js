const multer = require("multer")
const mongoose = require("mongoose")
const fs = require('fs')
var path = require("path");
const Signs = require("./signController")


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
    tweetId: String,
    time: Number,
    retweetedBy:[String],
    commentedOnTweetId: String,
    commentedBy: [String]
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
    console.log(req.body.tweet)
    if(req.body.tweet!==undefined || req.file!==undefined){
        if(req.file!=undefined){
            const tweetImage = new TweetImages({
                tweet: req.body.tweet,
                img: {
                    data: fs.readFileSync(path.join("C:/Social Media/server/public/" + req.file.filename)),
                    contentType: 'image/jpg'
                },
                userId: req.body.userId,
                time: Date.now(),
                commentedOnTweetId: req.body.commentedOnTweetId
            })
            tweetImage.save()
        }else{
            const tweetImage = new TweetImages({
                tweet: req.body.tweet,
                userId: req.body.userId,
                time: Date.now(),
                commentedOnTweetId: req.body.commentedOnTweetId
            })
            tweetImage.save()
        }
    }    
    res.status(200).json({
        success: 'Success'
    })
}

exports.getTweets = (req,res) => {
    TweetImages.find({}, (err, images) => {
        res.json(images)
    }).sort('-time').exec((err, docs) => {});    
}

exports.uploadGet = async (req,res) => {
    // const { userId } = req.params
    
    // try{
    //     const users = await TweetImages.findOne({userId})
    //     res.json(users)
    // }catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: 'Error fetching user data' });
    //   } 

    TweetImages.find({}, (err, images) => {
        res.json(images)
    }).sort('-time').exec((err, docs) => {});
} 

exports.comments = (req,res) => {
    TweetImages.findByIdAndUpdate({_id: req.body.tweetId}, {$push: {commentedBy: req.body.commentedBy}}, function(err, update){})
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
            Signs.updateSigns1(req.body.likedBy, req.body.likedOn)
        }else{
            TweetImages.findByIdAndUpdate({_id: req.body.likedOn}, {$push: {l: {likedBy: req.body.likedBy}}}, function(err, update){
                res.json(true)
            })
            Signs.updateSigns2(req.body.likedBy, req.body.likedOn)
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