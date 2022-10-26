
function index_request_posts(posts) {
    function escapeHtml(unsafe){return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");}
    function toText(unsafe){return unsafe.replace(/<[^>]*>/g, "");}
    
    function correct_url(i,url){
        const index = url.lastIndexOf('.');
        if(i===2 || i===5){
            return url.substring(0,index) + "-770x513" + url.substring(index)
        }else{
            return url.substring(0,index) + "-370x247" + url.substring(index)
        }
    }

    function convert_url_cdn(url){
        const result = url.split('/uploads/')
        if(result.length ===2){
            return "https://arwebstore.blob.core.windows.net/livingat300main-ca/" + result[1]
        }else{
            return url
        }
    }

    //console.log(convert_url_cdn('https://livingat300main.ca/wp-content/uploads/2020/02/steinar-engeland-hmIFzdQ6U5k-unsplash-scaled-370x247.jpg'))

    const classes = [
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-s-typo stack-1 stack-design-1 separation-border separation-border-style loop-0 preview-classic preview-21 img-ani-1 elements-design-1 post-10477 post type-post status-publish format-standard has-post-thumbnail hentry category-300-main category-art-photography category-downtown-events category-exchange-district-events tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-bike-in-winnioeg tag-bike-tour-in-winnipeg tag-downtown-apartments tag-downtown-winnipeg tag-nuit-blanche-winnipeg tag-winnipeg-apartments article-window`,
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-s-typo stack-1 stack-design-1 separation-border separation-border-style loop-1 preview-classic preview-21 img-ani-1 elements-design-1 post-10429 post type-post status-publish format-standard has-post-thumbnail hentry category-apartment-hacks tag-apartment-building-in-downtown-winnipeg tag-apartment-living tag-apartment-living-winnipeg tag-downtown-living tag-gardening tag-small-garden tag-winnipeg-apartments article-window`,
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-m-typo stack-1 stack-design-1 separation-border separation-border-style loop-2 preview-classic preview-2 img-ani-1 elements-design-1 post-10346 post type-post status-publish format-standard has-post-thumbnail hentry category-food-restaurants tag-apartment-living tag-lifestyle tag-smoothies article-window`,
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-s-typo stack-1 stack-design-1 separation-border separation-border-style loop-3 preview-classic preview-21 img-ani-1 elements-design-1 post-10314 post type-post status-publish format-standard has-post-thumbnail hentry category-food-restaurants category-lifestyle tag-downtown-winnipeg tag-downtown-winnipeg-restaurants tag-winnipeg-restaurants article-window`,
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-s-typo stack-1 stack-design-1 separation-border separation-border-style loop-4 preview-classic preview-21 img-ani-1 elements-design-1 post-10226 post type-post status-publish format-standard has-post-thumbnail hentry category-food-restaurants category-lifestyle tag-apartment-living-winnipeg tag-cocktails tag-summer article-window`,
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-m-typo stack-1 stack-design-1 separation-border separation-border-style loop-5 preview-classic preview-2 img-ani-1 elements-design-1 post-10187 post type-post status-publish format-standard has-post-thumbnail hentry category-adventure category-travel tag-camping-in-manitoba tag-campsites-in-manitoba tag-manitoba tag-travel-manitoba article-window`,
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-s-typo stack-1 stack-design-1 separation-border separation-border-style loop-6 preview-classic preview-21 img-ani-1 elements-design-1 post-9936 post type-post status-publish format-standard has-post-thumbnail hentry category-apartment-hacks category-pets tag-apartment-living tag-dog-barking tag-dog-training tag-pets tag-tips-for-dogs-barking tag-train-your-dog tag-winnipeg-apartments article-window`,
        `tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani-1 tipi-s-typo stack-1 stack-design-1 separation-border separation-border-style loop-7 preview-classic preview-21 img-ani-1 elements-design-1 post-9920 post type-post status-publish format-standard has-post-thumbnail hentry category-adventure category-travel tag-assiniboine-park tag-downtown-winnipeg tag-gardens-in-winnipeg tag-living-in-downtown-winnipeg tag-rooftop-at-the-wag tag-spring tag-spring-in-winnipeg tag-zen-garden article-window`
    ]

    return posts.map((v,i)=>{
        return `
        <article class="${classes[i]}">
            <div class="preview-mini-wrap clearfix">
                <div class="mask">
                    <a href="${v.link}" class="mask-img">
                        <img src="${convert_url_cdn(v.yoast_head_json.og_image[0].url)}" 
                        class="zeen-lazy-load-base attachment-zeen-770-513 size-zeen-770-513 wp-post-image zeen-lazy-loaded" 
                        sizes="${(i==2 || i==5 )?'(max-width: 770px) 100vw, 770px':'(max-width: 370px) 100vw, 370px'}"
                        />
                    </a>
                </div>
                <div class="meta">
                    <div class="title-wrap">
                        <h3 class="title">
                            <a href="${v.link}">${v.title.rendered}</a>
                        </h3>
                    </div>
                    <div class="excerpt body-color">${toText(v.content.rendered).substring(0,70)}... 
                        <span class="read-more-wrap font-3">
                            <a class="read-more" href="${v.link}">Read More</a>
                        </span>
                    </div>
                </div>
            </div>
        </article>`
    }).join("")

}


try{ // void error in browser
    module.exports = index_request_posts
}catch(e){}


