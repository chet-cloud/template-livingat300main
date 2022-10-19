const {walk,saveStringToFile,parsePath,removeExt, pathChange,fileCopyWithPath,isPage} = require('./utils.js')
const path = require('path');
const engine = require('./engine.js');

const generator = function(relatedBasePath, relatedBaseOutPath){
    const cwd = process.cwd()
    const basePath = path.join(cwd,relatedBasePath)
    const baseOutPath = path.join(cwd,relatedBaseOutPath)
    fileCopyWithPath(basePath,baseOutPath)
    const pages = walk(basePath).filter(f=>isPage(f));
    const newFiles = []
    pages.map(template_path=>{
        engine.render(removeExt(template_path), {}, (path, template, data, templateData, helpers)=>{
            if(!isPage(path)){
                return
            }
            const json = templateData
            if(json instanceof Array){ //multifiles [{},{},{},{},{}]
                json.forEach(d=>{
                    const renderStr = template(data, d, helpers)
                    const filePath = parsePath(template_path, {...data, ...d})
                    newFiles.push(saveStringToFile(pathChange(filePath,basePath,baseOutPath),renderStr))
                })
            }else{ //single file {}
                const renderStr = template(data, json, helpers)
                const filePath = parsePath(template_path, json)
                newFiles.push(saveStringToFile(pathChange(filePath,basePath,baseOutPath),renderStr))
            }
        })
    })
    console.log(newFiles); 
}

module.exports = generator

if (process.argv.length===2 && process.argv[1] === __filename) {
    generator("./test/in","./test/out")
}