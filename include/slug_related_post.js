function correct_url(url){
    const index = url.lastIndexOf('.');
    return url.substring(0,index) + "-293x293" + url.substring(index)
}
const template = ({slug,image_url,date,categories,title})=>{
    const cats = categories.map(c=>`<a href="${c.link}" class="cat">${c.name}</a>`).join('')
    const image_url_100X100 = correct_url(image_url)
    return `
<article class="tipi-xs-12 elements-location-1 clearfix with-fi ani-base article-ani article-ani-1 tipi-s-typo stack-1 stack-design-1 separation-border loop-0 preview-classic preview-29 img-ani-1 elements-design-1 post-10187 post type-post status-publish format-standard has-post-thumbnail hentry">
    <div class="preview-mini-wrap clearfix">
        <div class="mask">
            <a href="/${slug}/" class="mask-img">
                <img width="293" height="293"
                        src="${image_url}"
                        class="attachment-zeen-293-293 size-zeen-293-293 wp-post-image"
                        alt="" loading="lazy"
                        sizes="(max-width: 293px) 100vw, 293px" />
            </a>
        </div>
        <div class="meta">
            <div class="byline byline-2 byline-cats-design-1">
                <div class="byline-part cats">
                    ${cats}
                </div>
                <span class="byline-part separator">&middot;</span>
                <span class="byline-part date">
                    <time class="entry-date published dateCreated" datetime="${date}">
                        ${new Date(date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}
                    </time>
                </span>
            </div>
            <div class="title-wrap">
                <h3 class="title">
                    <a href="/${slug}/">
                        ${title}
                    </a>
                </h3>
            </div>
        </div>
    </div>
</article>
`

}

try{ // void error in browser
    module.exports = template
}catch(e){}


/////////////////////////////////////////////////////////////////
//only for browser
/////////////////////////////////////////////////////////////////

let post_with_related_posts = null
async function get_related_posts_by_post_id(id,index){
    if(post_with_related_posts === null){
        post_with_related_posts = await fetch("/data/related_posts."+id+".json").then(r=>r.json())
    }
    const from  = index*4
    const to  = index*4 + 3
    const result = []
    post_with_related_posts['related_posts'].map((v,i) => {
        if(i>= from && i <= to){
            result.push(template(v))
        }
    })
    return [6,result.join('')]
}