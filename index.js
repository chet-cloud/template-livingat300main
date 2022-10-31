const generator = require("./lib/generator.js")
const fse = require('fs-extra')
const {loadPosts,loadTags,loadCategories,setCategoriesInPosts} = require("./lib/data.js")
var _= require('lodash');


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


//todo 
loadPosts().map(p=>{
    const related_tags_id = [...p.tags]
    const related_categories_id = [...p.categories]
    const related_post = loadPosts().map(post=>{
        post['intersection_value']  = _.intersection(post.tags, related_tags_id) + _.intersection(post.categories, related_categories_id)
        return post
    }).sort(p=>-p['intersection_value'])
    p['related_posts'] = setCategoriesInPosts(related_post).map(p=>{
        p.categories = p.categories.map(c=>c.name)
        return p
    })
    fse.outputFileSync(`./out/data/related_posts.${p.id}.json`,JSON.stringify(p))
})





generator("pages","out","public")

