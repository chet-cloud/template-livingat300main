
const axios = require('axios') ;
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');


async function download(url,name){
    if(!fs.existsSync( name )){
        await axios({
            method: "get",
            url: url,
            responseType: "stream"
        }).then(function (response) {
            response.data.pipe(fs.createWriteStream(name));
            return name
        });
    }
}

async function filesList(dir){
    const files = await fs.promises.readdir(dir);
    return files;
}

function filesListSync(dir){
    const files = fs.readdirSync(dir);
    return files;
}

function dirClean(dir){
    for (const file of fs.readdirSync(dir)) {
        const f = path.join(dir, file)
        if(fs.lstatSync(f).isDirectory()){
            dirClean(f)
        }else{
            fs.unlinkSync(f);
        } 
    }
}

/**
const fse = require('fs-extra');

const srcDir = `path/to/file`;
const destDir = `path/to/destination/directory`;
                                 
// To copy a folder or file, select overwrite accordingly
try {
  fs.copySync(srcDir, destDir, { overwrite: true|false })
  console.log('success!')
} catch (err) {
  console.error(err)
}
 */
function fileCopyWithPath(from,to){
    fse.copySync(from, to, { overwrite: true, filter : (f)=>{
        return !f.endsWith(".html") || !path.basename(f).startsWith("_")
    }})
}


function fileMoveSync(from,to){
    fs.cpSync(from,to,{force:true});
    fs.unlinkSync(from);
}

async function getJSON(file){
    let f = await fs.promises.readFile(file,{encoding:'utf8', flag:'r'})
    return JSON.parse(f.toString('utf8'))
}

function cat(file){
    let f = fs.readFileSync(file)
    return f.toString('utf8')
}

function getJSONSync(file){
    let f = fs.readFileSync(file)
    return JSON.parse(f.toString('utf8'))
}

async function saveJSON(file, jsonObject){
    await fs.promises.writeFile(file, JSON.stringify(jsonObject))
}

function saveStringToFile(file,str){
    fs.writeFileSync(file, str)
    return file
}

const replaceLast = function(str, find, replace) {
    var index = str.lastIndexOf(find);
    if (index >= 0) {
        return str.substring(0, index) + replace + str.substring(index + find.length);
    }
    return str.toString();
};

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else { 
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}


/**
 * Produces a function which uses template strings to do simple interpolation from objects.
 * 
 * Usage:
 *    var makeMeKing = generateTemplateString('${name} is now the king of ${country}!');
 * 
 *    console.log(makeMeKing({ name: 'Bryan', country: 'Scotland'}));
 *    // Logs 'Bryan is now the king of Scotland!'
 */
 var generateTemplateString = (function(){
    var cache = {};
    function generateTemplate(template){
        var fn = cache[template];
        if (!fn){
            // Replace ${expressions} (etc) with ${map.expressions}.
            var sanitized = template
                .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match){
                    return `\$\{map.${match.trim()}\}`;
                })
                // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');
            fn = Function('map', `return \`${sanitized}\``);
        }
        return fn;
    }
    return generateTemplate;
})();

function parseStringTemplate(str, obj) {
    let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/);
    let args = str.match(/[^{\}]+(?=})/g) || [];
    let parameters = args.map(argument =>{ 
        return obj[argument] || (obj[argument] === undefined ? "" : obj[argument])
    });
    return String.raw({ raw: parts }, ...parameters);
}

function parsePath(template,data){
    const templateFn = generateTemplateString(template)
    return templateFn(data)
}
function removeExt(str){
    const e = "."
    const t=str.lastIndexOf(e);
    const result =  t<0?[str]:[str.substring(0,t),str.substring(t)] 
    return result[0]
}

function getScriptStr(content){
    let regex_start = /<script[^<>]*>/g;
    let regex_end = /<[^<>]+script>/g;
    let start_index = content.search(regex_start);
    let end_index = content.search(regex_end);
    if(start_index==-1 || end_index==-1){
        return {
            script: "",
            update_content: content,
        }
    }
    let start_length = content.match(regex_start)[0].length;
    let end_length = content.match(regex_end)[0].length;
    return {
        script: content.substring(start_index + start_length , end_index),
        update_content: content.substring(0 , start_index) + content.substring(end_index + end_length, content.length),
    }
}

function pathChange(filePath,basePath,baseOutPath){
    const result = path.join(baseOutPath, filePath.substring(basePath.length))
    return result 
}

const isPage = f=> {
    return f.endsWith(".html") && !path.basename(f).startsWith("_")
}

module.exports = {
    download,
    filesList,
    filesListSync,
    getJSON,
    getJSONSync,
    fileMoveSync,
    saveJSON,
    saveStringToFile,
    dirClean,
    walk,
    parsePath,
    removeExt,
    getScriptStr,
    pathChange,
    fileCopyWithPath,
    isPage
};


if (process.argv.length===2 && process.argv[1] === __filename) {
    // console.log(parsePath("${slug}.html",{slug:12}) === "12.html")
    // console.log(parsePath("${slug}${a}.html",{slug:12,a:22}) === "1222.html")
    // console.log(removeExt("xxxxxx/dsfdsf.dd"))
    const content = 'Aenean lacinia bibendum <a href="/life">life</a> sed consectetur. <a href="/work">Work</a> quis risus eget urna mollis ornare <a href="/about">about</a> leo. <script >a=1</script>dfdfdf'
    console.log(getScriptStr(content))
}