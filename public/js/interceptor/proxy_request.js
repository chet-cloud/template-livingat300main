var _open = window.XMLHttpRequest.prototype.open,  
  _send = window.XMLHttpRequest.prototype.send;

window.XMLHttpRequest.prototype.open = function openReplacement(method, url, async, user, password) {  
  this._url = url;
  return _open.apply(this, arguments);
}

window.XMLHttpRequest.prototype.send = function sendReplacement(data) {  
  if(this.onreadystatechange) {
    this._onreadystatechange = this.onreadystatechange;
  }
  console.log('Request sent');
  this.onreadystatechange = function onReadyStateChangeReplacement() {  
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

  let response = await originalFetch(resource, config);

  // response interceptor
  const json = () =>
    response
      .clone()
      .json()
      .then((data) => ({ ...data, title: `Intercepted: ${data.title}` }));

  response.json = json;
  return response;
};

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json));

// log
// {
//     "userId": 1,
//     "id": 1,
//     "title": "Intercepted: delectus aut autem",
//     "completed": false
// }

