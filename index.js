const generator = require("./lib/generator.js")
const fse = require('fs-extra')
const {loadPosts} = require("./lib/data.js")

//divide posts to small files for chrome request
const all_posts = loadPosts()
all_posts.reduce((context,v,i)=>{
    context.push(v)
    if((i+1)%8 === 0){
        fse.outputFileSync(`./out/data/posts.${Math.floor(i/8)}.json`,JSON.stringify({data:context}))
        return []
    }
    return context
},[])


generator("pages","out","public")


// for(let i=0;i<150;i++){
//     if((i+1)%8 === 0){
//         console.log(i,Math.floor(i/8))
//     }
// }