const {require_json,binarySearch} = require('./utils.js') 
const loadPosts = () => require_json("./data/Posts.json").map(interceptor)
const loadPages = () =>  require_json("./data/Pages.json").map(interceptor)
const loadTypes = () =>  require_json("./data/Types.json").map(interceptor)
const loadTags = () =>  require_json("./data/Tags.json").map(interceptor)
const loadCategories = () =>  require_json("./data/Categories.json").map(interceptor)
const loadTaxonomies = () =>  require_json("./data/Taxonomies.json").map(interceptor)
const loadMenu = () =>  require_json("./data/Menu.json").map(interceptor)
const loadUsers = () =>  require_json("./data/Users.json").map(interceptor)
const loadComments = () =>  require_json("./data/Comments.json").map(interceptor)


const interceptor = (value)=>{
    if(value['link']) {
        if(value['link'] === '/category/shopping/'){
            debugger
        }
        value['link'] = new URL(value['link']).pathname
    }
    return value
}

const binary_search = (arr, id) => binarySearch(arr,{id}, (a,b) => {
    return a.id - b.id
  })

const setCategoriesTagsInPosts = (posts)=>{
    const categories = loadCategories();
    const tags = loadTags();
    return posts.map((post)=>{
        //setCategories
        post.categories = post.categories.map(id=>{
            return {...categories[binary_search(categories,id)]}
        })
        //setTags
        post.tags = post.tags.map(id=>{
            return {...categories[binary_search(tags,id)]}
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

const getPostByTagId = (id,to,from)=>{
    const re =  loadPosts().filter(p=>p.tags.findIndex(result_id=>id===result_id)>0).slice(from?from:0, to)
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
    getPostByTagId,
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