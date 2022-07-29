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
    // console.log(req.userValues.id)
    // console.log(req.userValues)
    const {postid} = req.params
    const {like, dislike} = req.body;
    console.log(like, dislike)
    try {
        // console.log( " i am console.log()")
        // console.log(postid, like, dislike)
        const reactionData = await prisma.reaction.findMany({
            where:{
                postid:parseInt(postid),
                userid : req.userValues.id
            }
        })
        // console.log(" i am working 1", reactionData)
        if (reactionData.length === 0){
            console.log("i am if")
            const createReaction = await prisma.reaction.create({
                data:{
                    like,
                    dislike,
                    postid:parseInt(postid),
                    userid: req.userValues.id
                }        
            })
            // console.log( "working 2", createReaction)
        }
        else{
            console.log("i am else")
            // console.log("i am inside else part")
            const reaction = await prisma.reaction.findFirst({
                where:{
                    userid:req.userValues.id,
                    postid : parseInt(postid)
                }
            })
            // console.log("i am working")
            // console.log(reaction)
            console.log("i am working")
            let l;
            let d;
            // console.log(like, dislike)
            if (like){
                console.log("if")
                l = reaction.like ? false : true;
                if (l){
                    d = false
                }
                // d = //l ?? false
                console.log(l, d)
            }
            else{
                console.log("else")
                d = reaction.dislike? false : true;
                if (d){
                    l = false
                }
                // l = d ?? false
                console.log(l, d)
            }
            const updateReaction = await prisma.reaction.updateMany({
                where:{
                    postid:parseInt(postid),
                    userid:req.userValues.id
                },
                data:{
                    like : l,   
                    dislike : d,
                }
            })
        }
        const likecount = like ? 1 :0
        const dislikecount = dislike ? 1 :0
        const blog = await prisma.blog.findUnique({
            where:{
                id:parseInt(postid)
            }
        })
            const updateBlog = await prisma.blog.update({
                where:{
                    id:parseInt(postid)
                },
                data:{
                    likes: blog.likes + likecount,
                    dislikes: blog.dislikes + dislikecount
                }
            })
            res.status(201).json({title:"reaction", message:"reacted succesfully."})
                
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