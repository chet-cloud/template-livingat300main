// https://publishing-project.rivendellweb.net/axios-toolkit-for-wordpress-rest-api/
// https://developer.wordpress.org/rest-api/reference/
// https://livingat300main.ca/rest-api/docs/#/


require('dotenv').config()
const axios = require('axios') ;
const {saveJSON}  = require('./utils.js')

axios.defaults.baseURL = process.env.baseURL;//'https://livingat300main.ca';

  async function getAll(requestFn){
    const res = await requestFn();
    const total = parseInt(res.headers['x-wp-total'])
    if(isNaN(total)) {
      console.error(`function ${requestFn.name}() -> Can not find the x-wp0-total property in the response header`)
      return res['data'];
    }
    const itemsSize = 100 ;
    const requestNumber = Math.ceil(total/itemsSize);
    const requests = []
    for(let i=1;i<=requestNumber;i++){
      console.log(`--> ${requestFn.name} ${itemsSize} ${i}/${requestNumber}`)
      requests.push(await requestFn(itemsSize,i))
    }
    return requests.map(res=>res.data).flat(1)
  }

  async function getPosts(per_page = 1, page = 1) {
    return axios
      .get('/wp-json/wp/v2/posts/', {
        params: {
          per_page: per_page,
          page: page,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        return res
      })
  }

  async function getPages(per_page = 1, page = 1) {
    return await axios.get('/wp-json/wp/v2/pages/', {
        params: {
          per_page: per_page,
          page: page,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
      // .then((res) => {
      //   console.log(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  }

  async function getTags(per_page = 1, page = 1) {
    return await axios.get('/wp-json/wp/v2/tags/', {
      params: {
        per_page: per_page,
        page: page,
      },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }

  async function getCategories(per_page = 1, page = 1) {
    return await axios.get('/wp-json/wp/v2/categories/', {
      params: {
        per_page: per_page,
        page: page,
      },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }

  async function getTaxonomies(per_page = 1, page = 1) {
    return await axios.get('/wp-json/wp/v2/taxonomies/', {
      params: {
        per_page: per_page,
        page: page,
      },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }

  async function getTypes(per_page = 1, page = 1) {
    return await axios
      .get('/wp-json/wp/v2/types/', {
        params: {
          per_page: per_page,
          page: page,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }

  async function getComments(per_page = 1, page = 1) {
    return await axios
      .get('/wp-json/wp/v2/comments/', {
        params: {
          per_page: per_page,
          page: page,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }

  async function getUsers(per_page = 1, page = 1) {
    return await axios
      .get('/wp-json/wp/v2/users/', {
        params: {
          per_page: per_page,
          page: page,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }

  // curl -X 'GET'   'https://livingat300main.ca/wp-json/wp/v2/media?media_type=image&page=1&per_page=100'   -H 'accept: application/json'

  async function getImages(per_page = 1, page = 1) {
    return await axios
      .get('/wp-json/wp/v2/media?context=view&slug=&media_type=image', {
        params: {
          per_page: per_page,
          page: page,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }


  async function getTypeBySlug(slugName = 'post') {
    let singleType = `/wp-json/wp/v2/types/${slugName}`;
  
    return await axios
      .get(singleType, {
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
      // .then((res) => {
      //   console.log(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  }

  async function getPostByID(postID = 790634) {
    let theURL = `/wp-json/wp/v2/posts/${postID}`;
    return await axios
      .get(theURL, {
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
      // .then((res) => {
      //   console.log(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  }

  async function getPostBySlug(slugName = 'post-from-rest-api-2') {
    return await axios
      .get('/wp-json/wp/v2/posts/', {
        params: {
          slug: slugName,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
      // .then((res) => {
      //   console.log(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  }

  async function getMenuItems(per_page = 1, page = 1) {
    return await axios
      .get('/wp-json/wp/v2/menu-items/', {
        params: {
          per_page: per_page,
          page: page,
        },
        headers: {
          // Authorization: `Bearer ${access_token}`,
        },
      })
  }


  const rateLimit = require('axios-rate-limit');
  // sets max 2 requests per 1 second, other will be delayed
  // note maxRPS is a shorthand for perMilliseconds: 1000, and it takes precedence
  // if specified both with maxRequests and perMilliseconds
  const http = rateLimit(axios.create({
    validateStatus: function (status){
        return status == 200;
    }
  }), {maxRPS: 50 })

  async function fetch_pages(urls){

    return await Promise.all(urls.map(url=>{
        return http.get(url).then((res)=>{
          console.log("--->"+res.config.url)
          return res.data
        }).catch(e=>{
          return e.response.data
        })
    }));
  }
  
  module.exports = {
    getPages,
    getTypes,
    getTypeBySlug,
    getPosts,
    getPostByID,
    getPostBySlug,
    getTags,
    getCategories,
    getTaxonomies,
    fetch_pages
  };


  async function saveData(){
    let result;

    result = await getAll(getPosts)
    saveJSON("./data/Posts.json", result.sort((a,b)=>new Date(b.date).getTime() - new Date(a.date).getTime()))
    
    result = await getAll(getPages)
    saveJSON("./data/Pages.json", result.sort((a,b)=>new Date(b.date).getTime() - new Date(a.date).getTime()))

    result = await getAll(getTypes)
    saveJSON("./data/Types.json", result)

    result = await getAll(getTags)
    saveJSON("./data/Tags.json", result.sort((a,b)=> a.id - b.id ))

    result = await getAll(getCategories)
    saveJSON("./data/Categories.json", result.sort((a,b)=> a.id - b.id ))

    result = await getAll(getTaxonomies)
    saveJSON("./data/Taxonomies.json", result)

    result = await getAll(getComments)
    saveJSON("./data/Comments.json", result.sort((a,b)=> a.id - b.id ))

    result = await getAll(getUsers)
    saveJSON("./data/Users.json", result.sort((a,b)=> a.id - b.id ))

    result = await getAll(getImages)
    saveJSON("./data/Images.json", result.sort((a,b)=> a.id - b.id ))
  }


  if (process.argv.length===2 && process.argv[1] === __filename) {
    saveData()
  }
