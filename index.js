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

const cat = loadPosts().reduce((context,v)=>{
    const index = context.ids.findIndex(id=>{
        return v.categories.findIndex(i=>i===id) > 0
    })
    if(index > 0 ){
        if(context.arr[v.id] === undefined){
            context.arr[v.id] = []
        }
        context.arr[v.id].push(v)
    }
    return context;
},{
    ids:[...loadCategories().map(i=>i.id)],
    arr:{}
})

var key;
for (key in cat.arr) {
    if (cat.arr.hasOwnProperty(key)) {
        fse.outputFileSync(`./out/data/category.${key}.json`,JSON.stringify(cat.arr[key]))
    }
}


generator("pages","out","public")


// for(let i=0;i<150;i++){
//     if((i+1)%8 === 0){
//         console.log(i,Math.floor(i/8))
//     }
// }