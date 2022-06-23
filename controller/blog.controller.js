const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const uploadBlog = async (req, res)=>{
    const {id} = req.params
    const data = req.body
    try {
        const post = await prisma.blog.create({
            data:{
                title:data.title,
                blog : data.blog,
                image : data.image,
                authorId : parseInt(id)
            }
        }) 
        res.status(201).json({title:"blog", message:"blog created succefully.",post:post})
    } catch (error) {
        res.status(400).json({title:"error", message:error.message})
    }
}

const updateBlog = async (req, res)=>{
    console.log("i am working")
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
        res.status(201).json({title:"blog", message:"Blog updated successfully."})
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {uploadBlog, updateBlog}