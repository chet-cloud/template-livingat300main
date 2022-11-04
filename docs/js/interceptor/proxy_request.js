function Interceptor(before,after){

  var _open = window.XMLHttpRequest.prototype.open,  
  _send = window.XMLHttpRequest.prototype.send;

  window.XMLHttpRequest.prototype.open = function openReplacement(method, url, async, user, password) {  
    this._url = url;
    const result = (before instanceof Function)? before({method, url, async, user, password}):null
    return _open.apply(this, result ? result : arguments);
  }

  window.XMLHttpRequest.prototype.send = function sendReplacement(data) {  
    if(this.onreadystatechange) {
      this._onreadystatechange = this.onreadystatechange;
    }
    console.log('Request sent');
    this.onreadystatechange = function onReadyStateChangeReplacement() {  
      if(this.readyState ===4 && after instanceof Function) after(this)
      console.log('Ready state changed to: ', this.readyState);
      if(this._onreadystatechange) {
        return this._onreadystatechange.apply(this, arguments);
      }
    }
    return _send.apply(this, arguments);
  }

  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;
    const _resource = (before instanceof Function)? before(resource):null
    const response = await originalFetch(_resource ? _resource : resource, config);
    const json = () =>response.clone().json().then((data) => {
          console.log("response")
          return data
        });
    response.json = json;
    if(after instanceof Function) after(this)
    return response;
  };

}


/**
 
Interceptor();


fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json()).then(console.log);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response)
    }
};
xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
xhttp.send();

 */
