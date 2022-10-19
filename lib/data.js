let {getJSONSync} = require('./utils.js') 

const posts = getJSONSync("./data/Posts.json")
const getPostBySlug = (slug)=>{
    return posts.filter(p=>p.slug === slug)
}

const pages = getJSONSync("./data/Pages.json")
const types = getJSONSync("./data/Types.json")
const tags = getJSONSync("./data/Tags.json")
const categories = getJSONSync("./data/Categories.json")
const taxonomies = getJSONSync("./data/Taxonomies.json")

module.exports = {
    posts,getPostBySlug,
    pages,
    types,
    tags,
    categories,
    taxonomies
};

if (process.argv.length===2 && process.argv[1] === __filename) {

    const cc = [
        // { params: { slug: 'aaa' } }, 
        // { params: { slug: 'bbb' } }
        ...posts.map(p=>{return { params: { slug: p.slug } }})
    ]

    console.log(cc)

}