const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// const {likeOrDislike} = require('../middleware/alreadyLikeOrDislike')

const getReaction = async (req, res)=>{
    const {postid} = req.params
    const {userid} = req.body;
    const reactionData = await prisma.reaction.findFirst({
        where:{
            postid:parseInt(postid),
            userid
        }
    })
    res.status(200).json({title:"success", message:reactionData})
}

const reaction = async (req, res)=>{
    const {postid} = req.params
    const {userid, like, dislike} = req.body;
    try {
        console.log(postid, userid, like, dislike)
        const reactionData = await prisma.reaction.findMany({
            where:{
                postid:parseInt(postid),
                userid
            }
        })
        console.log(" i am working 1", reactionData)
        if (reactionData.length === 0){
            const createReaction = await prisma.reaction.create({
                data:{
                    like,
                    dislike,
                    postid:parseInt(postid),
                    userid
                }        
            })
            console.log( "working 2", createReaction)
        }
        else{
            // try {
                console.log("i am inside else part")
                const updateReaction = await prisma.reaction.updateMany({
                    where:{
                        postid:parseInt(postid),
                        userid
                    },
                    data:{
                        like,
                        dislike,
                    }
                })
            
            
        }
        // console.log(" i am working 2")
        const likecount = like ? 1 :0
        const dislikecount = dislike ? 1 :0
        const blog = await prisma.blog.findUnique({
            where:{
                id:parseInt(postid)
            }
        })
        // console.log(" i am working 3", blog)
        // console.log(likecount, dislikecount)
        // try {  
            const updateBlog = await prisma.blog.update({
                where:{
                    id:parseInt(postid)
                },
                data:{
                    likes: blog.likes + likecount,
                    dislikes: blog.dislikes + dislikecount
                }
            })
            // const updateBlog = await prisma.blog.findMany({
                //     where:{
                    //         id:parseInt(postid)
                    //     }
                    // })
                    
                    // console.log("i am working 4", updateBlog)
                    res.status(201).json({title:"reaction", message:"reacted succesfully."})
                // } catch (error) {
                //     console.log(" i am another try catch error", error.message)
                // }
                // console.log("outsider console.log()")
    } catch (error) {
        res.status(400).json({title:"error", message:error})
    }
}
/*
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
        
        const updateBlog = await prisma.blog.update({
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
            error: error
        })
    }
}
*/

// module.exports = {reaction, updateReaction, getReaction}
module.exports = {reaction,  getReaction}