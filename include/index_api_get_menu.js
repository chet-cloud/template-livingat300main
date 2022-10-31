
function index_top_menu_article(posts) {
    
    // function escapeHtml(unsafe){return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");}
    // function toText(unsafe){return unsafe.replace(/<[^>]*>/g, "");}
    
    function correct_url(url){
        const index = url.lastIndexOf('.');
        return url.substring(0,index) + "-370x247" + url.substring(index)
    }

    // posts = posts.map(p=>{
    //     p.image_url = correct_url(p.image_url)
    //     return p
    // })

    // function convert_url_cdn(url){
    //     const result = url.split('/uploads/')
    //     if(result.length ===2){
    //         return "https://arwebstore.blob.core.windows.net/livingat300main-ca/" + result[1]
    //     }else{
    //         return url
    //     }
    // }

    // posts = [{
    //     image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2022/07/275864305_497564391750898_2848710138243712305_n-370x247.jpg",
    //     url:"/top-5-food-drink-spots-in-winnipeg-this-summer/",
    //     title:"Top 5 Food &#038; Drink Spots in Winnipeg this Summer"
    // },{
    //     image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2022/07/275864305_497564391750898_2848710138243712305_n-370x247.jpg",
    //     url:"/top-5-food-drink-spots-in-winnipeg-this-summer/",
    //     title:"Top 5 Food &#038; Drink Spots in Winnipeg this Summer"
    // },{
    //     image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2022/07/275864305_497564391750898_2848710138243712305_n-370x247.jpg",
    //     url:"/top-5-food-drink-spots-in-winnipeg-this-summer/",
    //     title:"Top 5 Food &#038; Drink Spots in Winnipeg this Summer"
    // }]

    return posts.map((v,i)=>{
        return `
        <article
        class="tipi-xs-12 elements-location-1 clearfix with-fi ani-base tipi-s-typo stack-1 stack-design-1 separation-border-style loop-0 preview-classic preview-61 img-ani-1 elements-design-1 post-10314 post type-post status-publish format-standard has-post-thumbnail hentry">
        <div class="preview-mini-wrap clearfix">
            <div class="mask"><a href="${v.url}"
                    class="mask-img"><img width="370" height="247"
                        src="${v.image_url}"
                        class="attachment-zeen-370-247 size-zeen-370-247 wp-post-image" alt=""
                        loading="lazy"
                        sizes="(max-width: 370px) 100vw, 370px" /></a>
            </div>
            <div class="meta">
                <div class="title-wrap">
                    <h3 class="title">
                        <a href="${v.url}">
                            ${v.title}
                        </a>
                    </h3>
                </div>
            </div>
        </div>
        </article>
    `}).join("")

}

try{ // void error in browser
    module.exports = index_top_menu_article
}catch(e){}


// for browser

const cache = {}
function set_posts_in_category(data,index,category_id){
    const result =  data.filter((post,i) => { return (3*index <= i) && (3*index + 2 >= i)} ).map(p=> {
        return {
            image_url:p.yoast_head_json.og_image[0].url,
            url:p.link,
            title:p.title.rendered
        }
    })
    const htm = index_top_menu_article(result)
    return [data.length,htm]
}

async function get_posts_in_category(category_id, index){
    if(cache.hasOwnProperty(category_id)){
        const data = cache[category_id]
        return set_posts_in_category(data,index,category_id)
    }else{
        return await fetch("/data/category."+category_id+".json").then(r=>r.json()).then((data)=>{
            cache[category_id] = data
            return set_posts_in_category(data,index,category_id)
        })
    }
}
