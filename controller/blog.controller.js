const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();



const blogs = async (req, res)=>{
    try {
        const allBlogs = await prisma.blog.findMany({orderBy:{createdAt:"desc"}})
        res.status(201).json({title:"Blogs",data:allBlogs})
    } catch (error) {
        res.status(400).json({title:"error", error:error.message})
    }
}


const uploadBlog = async (req, res)=>{
    console.log("i am working")
    console.log(req.body)
    console.log("i am working")
    const data = req.body
    const imagePath = req.file.path.split("/")[1]
    try {
        console.log("i am blog")
        const post = await prisma.blog.create({
            data:{
                title:data.title,
                blog : data.blog,
                image : imagePath,
                // authorId : parseInt(id)
                authorId : parseInt(req.userValues.id)

            }
        }) 
        return res.status(201).json({title:"blog", message:"blog created succefully.",post:post})
    } catch (error) {
        return res.status(400).json({title:"error", message:"kuch to fat gaya blog upload me", "error":error.message, })
    }
}

const updateBlog = async (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    // console.log(typeof id)
    try {
        // console.log(data)
        const update = await prisma.blog.updateMany({
            where:{
                id : parseInt(id)
            },
            data
        })
        return res.status(201).json({title:"blog", message:"Blog updated successfully."})
    } catch (error) {
        return res.send(error.message)
    }
}

const deleteBlog = async (req, res)=>{
    console.log(" i am delete blog part")
    const {id} = req.params;
    console.log(id)
    try {
        const deleteblog = await prisma.blog.delete({
            where:{
                id: parseInt(id)
            }
        })
        console.log("i am deleted blog  ",deleteblog)
        res.status(200).json({title:"successfully blog delted ", message:"deleteblog"})
    } catch (error) {
        res.status(400).json({title:"Error", message:error})
    }
}


module.exports = {blogs, uploadBlog, updateBlog, deleteBlog}