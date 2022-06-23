const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const upload = async (req, res)=>{
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

module.exports = {upload}