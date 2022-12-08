const {cat,output} = require('./utils.js')

const replace_link = (html) =>{
    return cut_after(html,'fonts.googleapis.com',(rest)=>{
        return rest.replaceAll('https://livingat300main.ca','')
    })
}

const cut_before = (html,search, callback) =>{
    const after = html.search(search)
    return callback(html.substring(0, after-search.length)) + html.substring(after-search.length) 
}

const cut_after = (html, search, callback) =>{
    const after = html.search(search)
    return html.substring(0,after) + callback(html.substring(after))
}

const insert_after = (html, search, callback) =>{
    const after = html.search(search)
    return html.substring(0,after) + callback(html.substring(after))
}





module.exports = {
    replace_link
}


if (process.argv.length===2 && process.argv[1] === __filename) {
    let html = cat('./out/index.html')
    html = replace_link(html)
    console.log(html)
    output('./out/index.1.html',html)
    //console.log(replace_link('</head><a href="https://livingat300main.ca/top-5-food-d'))
}