const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const likeOrDislike = async(req, res, next)=>{
    const {id} = req.params
    const data = req.body
    const reaction = await prisma.reaction.findUnique({
        where:{
            id : parseInt(id)
        }
    })
    // console.log(reaction)
    if (data.like && !reaction.like){
        req.ld = {
            like:true,
            dislike: false
        }
    }
    else if (data.like && reaction.like){
        req.ld = {
            like:false,
            dislike: false
        }
    }
    else if (data.dislike && !reaction.dislike){
        req.ld = {
            dislike : true,
            like : false
        } 
    }
    else if (data.dislike &&  reaction.dislike){
        req.ld = {
            dislike : false,
            like : false
        }
    }
    next()
    
}

module.exports = { likeOrDislike}
