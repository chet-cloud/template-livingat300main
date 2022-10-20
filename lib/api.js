// https://publishing-project.rivendellweb.net/axios-toolkit-for-wordpress-rest-api/
// https://developer.wordpress.org/rest-api/reference/

require('dotenv').config()
const axios = require('axios') ;
const {saveJSON}  = require('./utils.js')

axios.defaults.baseURL = process.env.baseURL;//'https://livingat300main.ca';

  async function getAll(requestFn){
    const res = await requestFn();
    const total = parseInt(res.headers['x-wp-total'])
    if(isNaN(total)) {
      console.error("Can not find the x-wp0-total property in the response header")
      return res['data'];
    }
    const itemsSize = 10;
    const requestNumber = Math.ceil(total/10);
    const requests = []
    for(let i=1;i<=requestNumber;i++){
      console.log(`--> ${requestFn.name} ${i}/${requestNumber}`)
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

  module.exports = {
    getPages,
    getTypes,
    getTypeBySlug,
    getPosts,
    getPostByID,
    getPostBySlug,
    getTags,
    getCategories,
    getTaxonomies
  };



  if (process.argv.length===2 && process.argv[1] === __filename) {

    let result;

    result = await getAll(getPosts)
    saveJSON("./data/Posts.json", result)
    
    result = await getAll(getPages)
    saveJSON("./data/Pages.json", result)

    result = await getAll(getTypes)
    saveJSON("./data/Types.json", result)

    result = await getAll(getTags)
    saveJSON("./data/Tags.json", result)

    result = await getAll(getCategories)
    saveJSON("./data/Categories.json", result)

    result = await getAll(getTaxonomies)
    saveJSON("./data/Taxonomies.json", result)

    // result = await getAll(getMenuItems)
    // saveJSON("./data/MenuItems.json", result)
  }
