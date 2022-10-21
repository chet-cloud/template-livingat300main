let {require_json} = require('./utils.js') 
const loadPosts = () => require_json("./data/Posts.json")
const loadPages = () =>  require_json("./data/Pages.json")
const loadTypes = () =>  require_json("./data/Types.json")
const loadTags = () =>  require_json("./data/Tags.json")
const loadCategories = () =>  require_json("./data/Categories.json")
const loadTaxonomies = () =>  require_json("./data/Taxonomies.json")
const loadMenu = () =>  require_json("./data/Menu.json")

let binary_search = function (arr, id, start, end) {
    if(arr[start] == undefined || arr[end] == undefined ){
        debugger
    }
    if (arr[start].id > arr[end].id) return null;
    let mid=Math.floor((start + end)/2);
    if (arr[mid].id===id) return arr[mid];
    if(arr[mid].id > id)
        return binary_search(arr, id, start, mid-1);
    else
        return binary_search(arr, id, mid+1, end);
}

const setCategoriesTagsInPosts = (posts)=>{
    const categories = loadCategories();
    const tags = loadTags();
    return posts.map((post)=>{
        //setCategories
        post.categories = post.categories.map(id=>{
            return {...binary_search(categories,id,0,categories.length-1)}
        })
        //setTags
        post.tags = post.tags.map(id=>{
            return {...binary_search(tags,id,0,tags.length-1)}
        })
        return post
    })
}


const getPostBySlug = (slug)=>{
    const result = loadPosts().filter(p=>p.slug === slug)
    return setCategoriesTagsInPosts(result)[0]
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


module.exports = {
    loadPosts,
    getPostBySlug,
    getLastedPost,
    getPostByCategoryName,
    loadPages,
    loadTypes,
    loadTags,
    loadCategories,
    loadTaxonomies,
    loadMenu
};


if (process.argv.length===2 && process.argv[1] === __filename) {
    // let result = getPostByCategoryName("Art &amp; Photography",10)
    // console.log(result)
    // result = getPostBySlug("a-new-look-for-downtown-winnipeg")
    // console.log(result)
    // result = getLastedPost(4)
    // console.log(result)
}