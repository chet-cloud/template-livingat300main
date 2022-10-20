// https://github.com/ahmadnassri/node-template-literals-engine

const { resolve } = require('path')
const matter = require('gray-matter')
var requireFromString = require('require-from-string');
const {getScriptStr} = require("./utils.js");

class Engine {
  constructor ({ root, extension, helpers = {}, matter } = {}) {
    this.cache = {}
    this.root = root || process.cwd()
    this.extension = extension || 'jstl'
    this.matter = matter | {}
    this.helpers = {
      ...helpers,
      include: (name, data) => {
        return this.render(name, data)
      },
      map: (name, array) => { 
        return array.map(item => this.render(name, item)).join('\n')
      }
    }
  }

  compile (literal) {
    return new Function('data', 'fn', `return \`${literal}\``) // eslint-disable-line no-new-func
  }

  load (name) {
    if (!this.cache[name]) {
      const path = resolve(this.root, `${name}.${this.extension}`)
      const { content, data } = matter.read(path, this.matter)
      const {script,update_content} = getScriptStr(content)
      this.cache[name] = {
        script,
        path,
        data,
        template: this.compile(update_content)
      }
    }

    return this.cache[name]
  }

  render (name, templateData, callback) {
    const { data, template, script, path } = this.load(name)

    if((typeof script === 'string' || script instanceof String) && script.includes('module.exports')){
      templateData = requireFromString(script)(templateData)
    }

    let content = "";

    const render_fn = (data, templateData, helpers)=>{
      content = template({ ...data, ...templateData }, helpers)
      // apply layout first
      if (data.layout) {
        const layoutData = { ...data, ...templateData, content }
        // remove the processed layout
        delete layoutData.layout
        content = this.render(data.layout, layoutData, callback)
      }
      return content
    }

    if(callback instanceof Function) {
      content = callback(path, render_fn, data, templateData, this.helpers)
    }
    
    if (!(typeof content === 'string' || content instanceof String) || content.trim().length ===0){
      content = render_fn(data, templateData, this.helpers)
    }

    return content
  }
}

const engine = new Engine({root: '.',extension: 'html',
    helpers: { 
        capitalize : str => string[0].toUpperCase() + string.slice(1),
        print: o=>JSON.stringify(o)
        
    }
})

module.exports = engine