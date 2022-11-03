const {walk,saveStringToFile,parsePath,removeExt, pathChange,fileCopyWithPath,isPage,cat} = require('./utils.js')
const path = require('path');
const Engine = require('./engine.js');
const helpers = require('./helpers.js')


const engine = new Engine({root: '.',extension: 'html',
    helpers: { 
        capitalize : str => string[0].toUpperCase() + string.slice(1),
        print: o=>JSON.stringify(o)
    }
})

const generator = function(relatedBasePath, relatedBaseOutPath, staticPath){
    const cwd = process.cwd()
    const basePath = path.join(cwd,relatedBasePath)
    const baseOutPath = path.join(cwd,relatedBaseOutPath)

    engine.helpers = {...engine.helpers,...helpers(basePath,baseOutPath)}

    fileCopyWithPath(staticPath,baseOutPath)
    const pages = walk(basePath).filter(f=>isPage(f));
    const newFiles = []

    Promise.all(pages.map(template_path=>new Promise(function(resolve){
        engine.render(removeExt(template_path), {}, (path, template, data, templateData, helpers)=>{
            if(!isPage(path)){
                return
            }
            const json = templateData
            if(json instanceof Array){ //multifiles [{},{},{},{},{}]
                Promise.all(json.map(d=>new Promise(function(resolve){
                        const begin = new Date()
                        const renderStr = template(data, d, helpers)
                        const filePath = parsePath(template_path, {...data, ...d})
                        const file = saveStringToFile(pathChange(filePath,basePath,baseOutPath),renderStr)
                        newFiles.push(file)
                        console.log('['+((new Date().getTime() - begin)/1000) + "s]" + file)
                        resolve()
                    })
                ))
            }else{ //single file {}
                new Promise(function(resolve){
                    const begin = new Date()
                    const renderStr = template(data, json, helpers)
                    const filePath = parsePath(template_path, json)
                    const file = saveStringToFile(pathChange(filePath,basePath,baseOutPath),renderStr)
                    newFiles.push(file)
                    console.log(file + ':['+((new Date().getTime() - begin)/1000) + "s]")
                    resolve()
                })
            }
            return "-_-"
        })
    })))
    //console.log(newFiles); 
}

module.exports = generator

if (process.argv.length===2 && process.argv[1] === __filename) {
    generator("test/in","test/out","public")
}