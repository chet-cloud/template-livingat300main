const classes = ["tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-0 preview-classic preview-24 img-ani-1 elements-design-1 post-10314 post type-post status-publish format-standard has-post-thumbnail hentry category-food-restaurants category-lifestyle tag-downtown-winnipeg tag-downtown-winnipeg-restaurants tag-winnipeg-restaurants",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-1 preview-classic preview-24 img-ani-1 elements-design-1 post-10226 post type-post status-publish format-standard has-post-thumbnail hentry category-food-restaurants category-lifestyle tag-apartment-living-winnipeg tag-cocktails tag-summer",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-2 preview-classic preview-24 img-ani-1 elements-design-1 post-7899 post type-post status-publish format-standard has-post-thumbnail hentry category-adventure category-lifestyle tag-birds-hill-park tag-churchill tag-explore-manitoba tag-gimli tag-living-in-manitoba tag-riding-mountain-park tag-spring-in-manitoba tag-weekend-getaways",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-3 preview-classic preview-24 img-ani-1 elements-design-1 post-7581 post type-post status-publish format-standard has-post-thumbnail hentry category-lifestyle tag-apartment tag-apartment-building tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-apartments tag-downtown-living tag-downtown-winnipeg tag-living-in-downtown-winnipeg tag-winnipeg-apartments",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-4 preview-classic preview-24 img-ani-1 elements-design-1 post-7564 post type-post status-publish format-standard has-post-thumbnail hentry category-apartment category-apartment-hacks category-lifestyle tag-apartment tag-apartment-building tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-apartments tag-downtown-living tag-downtown-winnipeg tag-living-in-downtown-winnipeg tag-winnipeg-apartments",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-5 preview-classic preview-24 img-ani-1 elements-design-1 post-7465 post type-post status-publish format-standard has-post-thumbnail hentry category-300-main category-lifestyle tag-apartment tag-apartment-building tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-apartments tag-downtown-living tag-downtown-winnipeg tag-living-in-downtown-winnipeg tag-winnipeg-apartments",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-6 preview-classic preview-24 img-ani-1 elements-design-1 post-7136 post type-post status-publish format-standard has-post-thumbnail hentry category-food-restaurants category-lifestyle tag-apartment tag-apartment-building tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-apartments tag-downtown-living tag-downtown-winnipeg tag-living-in-downtown-winnipeg tag-winnipeg-apartments",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-7 preview-classic preview-24 img-ani-1 elements-design-1 post-7330 post type-post status-publish format-standard has-post-thumbnail hentry category-environment category-lifestyle tag-apartment tag-apartment-building tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-apartments tag-downtown-living tag-downtown-winnipeg tag-living-in-downtown-winnipeg tag-winnipeg-apartments",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-8 preview-classic preview-24 img-ani-1 elements-design-1 post-7219 post type-post status-publish format-standard has-post-thumbnail hentry category-culture category-decor category-lifestyle tag-apartment tag-apartment-building tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-apartments tag-downtown-living tag-downtown-winnipeg tag-living-in-downtown-winnipeg tag-winnipeg-apartments",
"tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo masonry-child stack-1 stack-design-1 separation-border loop-9 preview-classic preview-24 img-ani-1 elements-design-1 post-7320 post type-post status-publish format-standard has-post-thumbnail hentry category-food-restaurants category-lifestyle tag-apartment tag-apartment-building tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-apartments tag-downtown-living tag-downtown-winnipeg tag-living-in-downtown-winnipeg tag-winnipeg-apartments"]


const article_temple = (data,i)=>{
    const cats = data.categories.map(c=>`<a href="${c.link}" class="cat">${c.name}</a>`).join('')
    return `
<article class="${classes[i]}">
    <div class="preview-mini-wrap clearfix">
        <div class="mask"><a href="${data.link}"
                class="mask-img"><img width="770" height="513"
                    src="${data.yoast_head_json.og_image[0].url}"
                    class="attachment-zeen-770-513 size-zeen-770-513 wp-post-image" alt=""
                    sizes="(max-width: 770px) 100vw, 770px" /></a></div>
        <div class="meta">
            <div class="byline byline-2 byline-cats-design-1">
                <div class="byline-part cats">
                    ${cats}
                </div>
                <span class="byline-part separator">&middot;</span>
                <span class="byline-part date">
                    <time class="entry-date published dateCreated" datetime="${data.date}">
                        ${new Date(data.date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}
                    </time>
                </span>
            </div>
            <div class="title-wrap">
                <h3 class="title"><a href="${data.link}">${data.title.rendered}</a></h3>
            </div>
            <div class="excerpt body-color">
                ${data.excerpt.rendered.substring(0,113)}...
                <span class="read-more-wrap font-3">
                    <a class="read-more" href="${data.link}">Read More</a>
                </span>
            </div>
        </div>
    </div>
</article>
    `
}


try{ // void error in browser
    module.exports = article_temple
}catch(e){}


/////////////////////////////////////////////////////////////////
//Only for browser
/////////////////////////////////////////////////////////////////
const load_more_tail = ({link, page_number})=>{ 
    return `
    <div class="inf-load-more-wrap pagination clearfix inf-spacer">
        <a href="${link}page/${page_number}/"
            class="inf-load-more block-loader tipi-button tipi-button-border" data-type="2" data-mnp="6" data-title-next=""
            data-title-prev="" data-preview="24" data-next="${link}page/${page_number}/"
            data-prev="${link}">
            Load More
        </a>
    </div>
    `
}


const getPostByTagId = (posts, id, to, from)=>{
    const re =  posts.filter(p=>p.tags.findIndex(result_id=>id===result_id)>0).slice(from?from:0, to)
    return re
}

function binarySearch(ar, el, compare_fn) {
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = compare_fn(el, ar[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if(cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

let binary_search = function (arr, id) {
    return binarySearch(arr,{id}, (a,b) => {
        return a.id - b.id
    } )
}

const setCategoriesInPosts = (categories,posts)=>{
    return posts.map((post)=>{
        //setCategories
        post.categories = post.categories.map(id=>{
            return {...categories[binary_search(categories,id)]}
        })
        return post
    })
}

let tags_lite = null, posts_all = null, categories = null
async function load_more_by_tag_id(tag_id, index){
    if(tags_lite === null){
        tags_lite = await fetch(`/data/tags_lite.json`).then(res=>res.json())
    }
    if(posts_all === null) {
        posts_all = await fetch(`/data/posts.all.json`).then(res=>res.json())
    }
    if(categories === null){
        categories = await fetch(`/data/author.all.json`).then(res=>res.json())
    }
    const page_size = 10
    const result = tags_lite.map((tag) => {
        let post_data = getPostByTagId(posts,tag.id, 10, 0)
        post_data = setCategoriesInPosts(categories,post_data).map(p=>{
          p.categories = p.categories.map(c=>{
            return {name:c.name,link:c.link}
          })
          return p
        })
        return post_data
    })
    const json = result.slice(page_size*index, page_size*index + page_size).map((p,i)=>article_temple(p,i)).join("")
    return json
}


