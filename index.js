const generator = require("./lib/generator.js")
const fse = require('fs-extra')
const {loadPosts,loadCategories} = require("./lib/data.js")

//divide posts to small files for chrome request

loadPosts().reduce((context,v,i)=>{
    context.push(v)
    if((i+1)%8 === 0){
        fse.outputFileSync(`./out/data/posts.${Math.floor(i/8)}.json`,JSON.stringify({data:context}))
        return []
    }
    return context
},[])

loadCategories().map(({id})=>{
    const posts = loadPosts().filter(v=> v.categories.findIndex(i=>i===id) > 0)
    fse.outputFileSync(`./out/data/category.${id}.json`,JSON.stringify(posts))
})

generator("pages","out","public")

