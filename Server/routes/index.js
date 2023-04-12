const express = require("express")
const { upload, uploadImage, uploadGet, likes, retweet, comments, getTweets} = require("../controllers/userController")
const { signup, signupGet, signin, follow, profileImage, profileUpload, findUser } = require("../controllers/signController")

const router = express.Router() 

router.post("/get-tweets", getTweets)
router.post("/upload", uploadImage, upload)
router.get("/upload", uploadGet)


// router.get("/upload/:userId", uploadGet)

router.post("/find-user", findUser)
router.post("/signUp", signup)
router.get("/signUp", signupGet)

router.post("/signIn", signin)

router.post("/profileImage", profileImage, profileUpload)

router.post("/followUpdate", follow)

router.post("/likes", likes)
router.post("/retweet", retweet)
router.post("/comments", comments)

module.exports = router  
