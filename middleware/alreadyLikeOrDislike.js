const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const likeOrDislike = async(req, res, next)=>{
    const {id} = req.params
    const data = req.body
    // console.log(data)
    const reaction = await prisma.reaction.findUnique({
        where:{
            id : parseInt(id)
        }
    })
    // console.log(reaction)
    if (data.like && !reaction.like){
        req.ld = {
            like:true,
            dislike: false,
            likecount : 1,
            dislikecount : -1
        }
    }
    else if (data.like && reaction.like){
        req.ld = {
            like:false,
            dislike: false,
            likecount: -1,
            dislikecount:0
        }
    }
    else if (data.dislike && !reaction.dislike){
        req.ld = {
            dislike : true,
            like : false,
            dislikecount:1,
            likecount:-1
        } 
    }
    else if (data.dislike &&  reaction.dislike){
        req.ld = {
            dislike : false,
            like : false,
            dislikecount:-1,
            likecount:0
        }
    }
    next()
    
}

module.exports = { likeOrDislike}
