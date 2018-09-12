const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

//Get current user profile = private route - will get info fom JWT so does not need id after profile/id

// this is for /api/profile/
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
   
    const errors = {};
    Profile.findOne({user:req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


// route GET profile by handles

router.get('/handle/:handle', (req, res) => {
    const errors = {};
                Profile.findOne({handle:req.params.handle})
                .populate('user', ['name', 'avatar'])
                .then((profile) => {
                    if(!profile){
                        errors.handle = "There is no profile for this handle";
                        return res.status(404).json(errors)
                    }
                    res.status(200).json(profile)
                    console.log("api returned this with handle")
                })
                .catch(err => res.status(404).json(err));
            });

// route GET profile by id

router.get('/user/:user_id', (req, res) => {
    const errors = {};
                Profile.findOne({user:req.params.user_id})
                .populate('user', ['name', 'avatar'])
                .then((profile) => {
                    if(!profile){
                        errors.handle = "There is no profile for this user";
                        return res.status(404).json(errors)
                    }
                    res.status(200).json(profile)
                })
                .catch(err => res.status(404).json({profile:"no profile for this user"}));
            });

//route that will get all the profiles

router.get('/all', (req, res) => {
    const errors = {};
        Profile.find()
        .populate('user', ['name', 'avatar'])
        .then((profiles) => {
                if(!profiles) {
                    errors.noprofiles = "There are no profiles";
                    return res.status(404).json(errors)
                }
                res.status(200).json(profiles);
        }).catch(error => {
            res.status(404).json({profile:"there are no profiles"});
        })
});



// Route to create/update profile

// you have to be logged in so is private
// we then need to create object that stores the data to be passed to model= this would come from form
// will be a post request to protected route
//if authenticated the user will be passed decoded back to request
//req.body should  contain all the form data
// req.user should be the user passed back from passport.authenticate

router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body)
            if(!isValid){
                return res.status(400).json(errors);
                    }
            
           
    const profileFields = {};     
    
      profileFields.user = req.user.id;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.status) profileFields.status = req.body.status;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        if(typeof req.body.skills !== 'undefined'){
            profileFields.skills = req.body.skills.split(',');
        }
        profileFields.social = {};
        if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

        Profile.findOne({user:req.user.id})
             .then((profile) => {
                if(profile){                   // if profile will be update.
                    Profile.findOneAndUpdate(
                        {user:req.user.id},
                        {$set:profileFields},
                        {new:true})
                .then((profile) =>{
                     res.json(profile)
                    });
                     } else {                        // it wil be a create.
                    Profile.findOne({handle:profileFields.handle})
                        .then((profile) => {
                            if(profile){
                                errors.handle = "that handle already exists";
                                res.status(400).json(errors);
                            }
                            new Profile(profileFields).save()
                            .then((profile)=> {
                                res.json(profile);
                            })
                                                })
                }
        

    });

});


//post request to add experience to profile, private route. as will need user
// current that is submitting post

router.post('/experience', passport.authenticate('jwt', {session:false}), (req, res) => {

    const { errors, isValid } = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
            }

    

    Profile.findOne({user:req.user.id})
    .then((profile) => {
        if(profile){
            const newExperience = {
                title:req.body.title,
                company:req.body.company,
                from:req.body.from,
                current:req.body.current,
                to:req.body.to,
                location:req.body.location,
                description:req.body.description
            }
            profile.experience.unshift(newExperience);
            profile.save().then(profile => res.json(profile));
        }}).catch(err => res.json(err));

    })

    //post request to add education to profile, private route. as will need user
// current that is submitting post

router.post('/education', passport.authenticate('jwt', {session:false}), (req, res) => {

    const { errors, isValid } = validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
            }

   
    Profile.findOne({user:req.user.id})
    .then((profile) => {
        if(profile){
            const newEducation = {
                school:req.body.school,
                degree:req.body.degree,
                fieldofstudy:req.body.fieldofstudy,
                current:req.body.current,
                to:req.body.to,
                from:req.body.from,
                description:req.body.description
            }
            profile.education.unshift(newEducation);
            profile.save().then(profile => res.json(profile));
        }}).catch(err => res.json(err));

    })


// route to delete education

    router.delete('/education/:id', passport.authenticate('jwt', {session:false}), (req, res) => {

          
        Profile.findOne({user:req.user.id})
        .then((profile) => {
            if(profile){
             const keepEducation  = profile.education.filter((studyplace) =>{
                        return studyplace.id !== req.params.id;
                })
                profile.education = keepEducation;
                profile.save().then(profile => res.json(profile));

            }
            }).catch(err => res.json(err));
    
        })
    


// route to delete experience

router.delete('/experience/:id', passport.authenticate('jwt', {session:false}), (req, res) => {

          
    Profile.findOne({user:req.user.id})
    .then((profile) => {
        if(profile){
         const keepExperience  = profile.experience.filter((studyplace) =>{
                    return studyplace.id !== req.params.id;
            })
            profile.experience = keepExperience;
            profile.save().then(profile => res.json(profile));

        }
        }).catch(err => res.json(err));

    })

    // route to delete user and profile!!!!


    router.delete('/', passport.authenticate('jwt', {session:false}), (req,res) => {
            Profile.findOneAndRemove({user:req.user.id})
                .then(() => {
                        User.findOneAndRemove({_id:req.user.id})
                        .then(() => res.json({success: true}))
                })  
                
            });


module.exports = router;