const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// const {likeOrDislike} = require('../middleware/alreadyLikeOrDislike')

const reaction = async (req, res)=>{
    const {id} = req.params
    const data = req.body
    // console.log(data )
    try {
        
        const action = await prisma.reaction.create({
            data:{
                like:data.like,
                dislike:data.dislike,
                postid:data.postid,
                userid:parseInt(id)
            }        
        })
        const likecount = data.like ? 1 :0
        const dislikecount = data.dislike ? 1 :0
        // console.log(likecount, dislikecount)
        const blog = await prisma.blog.findUnique({
            where:{
                id:data.postid
            }
        })
        
        const updateBlog = await prisma.blog.updateMany({
            where:{
                id:data.postid
            },
            data:{
                likes: blog.likes + likecount,
                dislikes: blog.dislikes + dislikecount
            }
        })
        res.status(201).json({title:"reaction", message:"reacted succesfully."})
    } catch (error) {
        res.status(400).json({title:"error", error:error.message})
    }
}

const updateReaction = async(req, res)=>{
    const {id} = req.params
    const data = req.body
    try {  
        const action = await prisma.reaction.update({
            where:{
                id: parseInt(id)
            },
            data: {
                like:req.ld.like,
                dislike:req.ld.dislike
            }
        })
        const blog = await prisma.blog.findUnique({
            where:{
                id:data.postid
            }
        })
        console.log(2)
        
        const updateBlog = await prisma.blog.updateMany({
            where:{
                id:data.postid
            },
            data:{
                likes: blog.likes + req.ld.likecount,
                dislikes: blog.dislikes + req.ld.dislikecount
            }
        })
        res.status(201).json({title:"Reaction", message:"reaction updated successfully", data:action})
    } catch (error) {
        res.status(400).json({
            title:"error",
            error: error.message
        })
    }
}

module.exports = {reaction, updateReaction}

