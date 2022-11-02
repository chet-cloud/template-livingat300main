let {require_json,binarySearch} = require('./utils.js') 
const loadPosts = () => require_json("./data/Posts.json")
const loadPages = () =>  require_json("./data/Pages.json")
const loadTypes = () =>  require_json("./data/Types.json")
const loadTags = () =>  require_json("./data/Tags.json")
const loadCategories = () =>  require_json("./data/Categories.json")
const loadTaxonomies = () =>  require_json("./data/Taxonomies.json")
const loadMenu = () =>  require_json("./data/Menu.json")
const loadUsers = () =>  require_json("./data/Users.json")
const loadComments = () =>  require_json("./data/Comments.json")

let binary_search = function (arr, id) {
    return binarySearch(arr,{id}, (a,b) => {
        return a.id - b.id
    } )
}

const setCategoriesTagsInPosts = (posts)=>{
    const categories = loadCategories();
    const tags = loadTags();
    return posts.map((post)=>{
        //setCategories
        post.categories = post.categories.map(id=>{
            return {...binary_search(categories,id)}
        })
        //setTags
        post.tags = post.tags.map(id=>{
            return {...binary_search(tags,id)}
        })
        return post
    })
}

const setCategoriesInPosts = (posts)=>{
    const categories = loadCategories();
    return posts.map((post)=>{
        //setCategories
        post.categories = post.categories.map(id=>{
            return {...categories[binary_search(categories,id)]}
        })
        return post
    })
}


const getPostBySlug = (slug)=>{
    const result = loadPosts().filter(p=>p.slug === slug)
    return setCategoriesTagsInPosts(result)[0]
}

const getPageBySlug = (slug)=>{
    const result = loadPages().filter(p=>p.slug === slug)
    return result[0]
}

const getLastedPost = (n)=>{
    const result = loadPosts().slice(0, n);
    return setCategoriesTagsInPosts(result)
}

const getPostByCategoryName = (name,n)=>{
    const results = loadCategories().filter(c=>c.name === name)
    if(results.length!==1){
        throw `Can not find the category by the name [${name}]`
    }
    const result_id = results[0].id
    const re =  loadPosts().filter(p=>p.categories.findIndex(id=>id===result_id)>0).slice(0, n)
    return setCategoriesTagsInPosts(re)
}

const getPostByCategoryId = (id,to,from)=>{
    const re =  loadPosts().filter(p=>p.categories.findIndex(result_id=>id===result_id)>0).slice(from?from:0, to)
    return setCategoriesTagsInPosts(re)
}

module.exports = {
    setCategoriesInPosts,
    setCategoriesTagsInPosts,
    loadPosts,
    getPostBySlug,
    getPageBySlug,
    getLastedPost,
    getPostByCategoryName,
    getPostByCategoryId,
    loadPages,
    loadTypes,
    loadTags,
    loadCategories,
    loadTaxonomies,
    loadMenu,
    loadUsers,
    loadComments
};


if (process.argv.length===2 && process.argv[1] === __filename) {
    // let result = getPostByCategoryName("Art &amp; Photography",10)
    // console.log(result)
    // result = getPostBySlug("a-new-look-for-downtown-winnipeg")
    // console.log(result)
    // result = getLastedPost(4)
    // console.log(result)
}