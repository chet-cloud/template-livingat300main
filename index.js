const generator = require("./lib/generator.js")
const fse = require('fs-extra')
const {loadPosts,loadTags,loadCategories,setCategoriesInPosts} = require("./lib/data.js")
var _= require('lodash');


//pagenation of the posts
loadPosts().reduce((context,v,i)=>{
    context.push(v)
    if((i+1)%8 === 0){
        fse.outputFileSync(`./out/data/posts.${Math.floor(i/8)}.json`,JSON.stringify({data:context}))
        return []
    }
    return context
},[])

//get posts by category
loadCategories().map(({id})=>{
    const posts = loadPosts().filter(v=> v.categories.findIndex(i=>i===id) > 0)
    fse.outputFileSync(`./out/data/category.${id}.json`,JSON.stringify(posts))
})

//related posts
loadPosts().map(p=>{
    const related_tags_id = [...p.tags]
    const related_categories_id = [...p.categories]
    const related_post = loadPosts().map(post=>{
        post['intersection_value']  = _.intersection(post.tags, related_tags_id) + _.intersection(post.categories, related_categories_id)
        return post
    }).sort(p=>-p['intersection_value'])
    p['related_posts'] = setCategoriesInPosts(related_post).map(p=>{
        p.categories = p.categories.map(c=>{return {name:c.name,link:c.link}})
        return p
    }).map(p=>{ return {
        slug:p.slug,
        image_url:p.yoast_head_json.og_image[0].url,
        date: p.date, 
        categories: p.categories, 
        title: p.title.rendered
    }})//.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())

    fse.outputFileSync(`./out/data/related_posts.${p.id}.json`,JSON.stringify(p))
})





generator("pages","out","public")

