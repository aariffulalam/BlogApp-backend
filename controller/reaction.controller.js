const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// const {likeOrDislike} = require('../middleware/alreadyLikeOrDislike')

const reaction = async (req, res)=>{
    const {id} = req.params
    const data = req.body
    console.log(data )
    const action = await prisma.reaction.create({
        data:{
            like:data.like,
            dislike:data.dislike,
            postid:data.postid,
            userid:parseInt(id)
        }        
    })
    res.send(action)
}

const updateReaction = async(req, res)=>{
    const {id} = req.params
    // console.log(req.ld)
    try {  
        const action = await prisma.reaction.update({
            where:{
                id: parseInt(id)
            },
            data: req.ld
        })
        res.status(201).json({title:"success", message:"reaction updated successfully", data:action})
    } catch (error) {
        res.status(400).json({
            title:"error",
            error: error.message
        })
    }
}

module.exports = {reaction, updateReaction}

