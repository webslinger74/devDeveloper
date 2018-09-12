const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport =  require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const ValidatePostInput = require('../../validation/post');


//create Post - private route


router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log(req.body)
            const { errors, isValid } = ValidatePostInput(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save().then((post) =>{
         res.json(post);
        console.log(post);
    })

})

// Get Posts = public

router.get('/', (req, res) => {
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404)
    .json({nopostsfound: 'No posts found'}));
})

//Get individual post - public


router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404)
    .json({nopostfound: 'No post found with that Id'}));
});

//Delete post

router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Post.findById(req.params.id)
    .then((post) => {
            const postUserString = post.user.toString();
            const reqUserId = req.user._id.toString();
        if(postUserString !== reqUserId){
          return res.status(401).json({msg:"you cannnot delete this post"})
        } else {
            Post.findOneAndRemove({_id:req.params.id})
                .then(post => {
                    console.log(post, "this is the post deleted???");
                    res.status(200).json(post)
                })
        }
    }
).catch(err => res.status(400).json({msg:"this post does not exist"}));
  
});

//Add like to a Post

router.post('/like/:id', passport.authenticate('jwt', {session:false}),(req, res)=> {
    const reqUserId = req.user._id.toString();
    Post.findById(req.params.id)
        .then((post) => {
            const isUserLikeInArray = post.likes.filter((like) => {
                return like.user.toString() === reqUserId;
            })
            if(isUserLikeInArray.length === 1){
              return res.status(400).json({msg:"You have already liked this!"});
            }
            if(isUserLikeInArray.length === 0){
            //    res.status(200).json({msg:"you have not liked this yet"});
                    post.likes.unshift({user:req.user.id});
                    post.save();
                return res.status(200).json(post);
            }
        })
        .catch((err) => {
            res.status(400).json({err:err})
        })
    
});

// Unlike a Post

router.post('/unlike/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const reqUserId = req.user._id.toString();
    Post.findById(req.params.id)
        .then((post) => {

            


            const isUserLikeInArray = post.likes.filter((like) => {

                return like.user.toString() === reqUserId;
            })
            if(isUserLikeInArray.length === 0){
              return res.status(400).json({msg:"You have not liked this yet"});
            }
            if(isUserLikeInArray.length === 1){
                 const removeIndex = post.likes.filter((like, index) => {
                    if(like.user.toString() === reqUserId){
                        return index;
                    }
              })

              post.likes.splice(removeIndex, 1);
                    post.save().then(post => res.json(post));
            }
        })
})

//Add comment to a Post


router.post('/comment/:id', passport.authenticate('jwt', {session:false}),(req, res)=> {
   
    const { errors, isValid } = ValidatePostInput(req.body);
    
            if(!isValid) {
                return res.status(400).json(errors)
            }
   
    Post.findById(req.params.id)
        .then((post) => {
            const newComment = {
                text:req.body.text,
                name:req.body.name,
                avatar: req.body.avatar,
                user:req.user.id
            }
           
            post.comments.unshift(newComment);
            post.save().then(post => {
                res.status(200).json(post)
            })
            .catch((err) => {
            res.status(400).json({postNotFound: 'No post found'});
        })
    
});

});

router.delete('/comment/:postId/:commentId', passport.authenticate('jwt', {session:false}),(req, res)=> {
   
   
    Post.findById(req.params.postId)
        .then((post) => {
                // loop through comments and aslong as req.user.id ===  comments.user we can delete commentId
             const theComment = post.comments.filter(comment => {
                                    const commentString = comment._id.toString();
                                if(commentString === req.params.commentId){
                            
                                    return comment;
             
                                }})

             if(theComment[0].user.toString() === req.user._id.toString()){
                   post.comments = post.comments.filter(comment => {
                     return comment._id.toString() !== theComment[0]._id.toString()
                   }                   
                )

             } else {
                 res.status(400).json({msg:"this is not your comment to delete"});
             }

               post.save().then(post => {
                   res.status(200).json({msg:"comment deleted"});
               })

                })
                .catch((err) => {
                     res.status(400).json({postNotFound: 'No post found'});
                })

});


module.exports = router;