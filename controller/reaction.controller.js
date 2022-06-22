const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const {likeOrDislike} = require('../middleware/likeOrDislike')

const reaction = async (req, res)=>{
    const {id} = req.params
    // const {like, dislike, userid} = req.body
    const {userid} = req.body
    console.log(likeOrDislike )
    console.log(likeOrDislike.like, likeOrDislike.dislike)
    // console.log(typeof(id),typeof(userid))
    const action = await prisma.reaction.create({
        data:{
            like:likeOrDislike.like,
            dislike:likeOrDislike.dislike,
            userid,
            postid: parseInt(id)
        }
    })
    res.send(action)
}

module.exports = {reaction}

// reaction only one can do LIKE or DISLIKE

// if like : true       then ->     dislike : false
// if dislike : true    then ->     like : true

// if already liked 
            // cliked like ->      like:false
            // cliked dislike ->   dislike: true, like : false

// if already dislike
            // cliked dislike ->   dislike : true
            // cliked like ->   like: true, dislike : false 

// like & discount count