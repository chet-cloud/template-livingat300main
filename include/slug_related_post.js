const get_related_posts_by_category = ()=>{




}

try{ // void error in browser
    module.exports = get_related_posts_by_category
}catch(e){}



//for browser
async function get_related_posts_by_category(i){
    return await fetch("/data/related_posts."+i+".json").then(r=>r.json()).then(({data})=>{
        return []
    })
}