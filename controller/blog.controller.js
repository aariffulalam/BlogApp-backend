const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const blogs = async (req, res)=>{
    try {
        const allBlogs = await prisma.blog.findMany()
        res.status(201).json({title:"Blogs",data:allBlogs})
    } catch (error) {
        res.status(400).json({title:"error", error:error.message})
    }
}


const uploadBlog = async (req, res)=>{
    const {id} = req.params
    const data = req.body
    const imagesPath = req.files.map((file)=>{
        return file.path
    })
    console.log(id)
    console.log(data.image)
    try {
        const post = await prisma.blog.create({
            data:{
                title:data.title,
                blog : data.blog,
                image : imagesPath[0].split("/")[1],
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

module.exports = {blogs, uploadBlog, updateBlog}