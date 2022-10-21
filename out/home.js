        
    function toggleNav() {
        document.querySelector(".main").classList.toggle("main_open")
        document.querySelector(".right_menu").classList.toggle("right_menu_open")
      }
      function toggleSearch() {
        document.querySelector(".left_search").classList.toggle("left_search_open")
      }
  
      document.addEventListener("DOMContentLoaded", () => {
        
        let imgStyle = document.querySelector(".desktop_menu_container img").style;
        window.addEventListener('scroll', () => {
          let scrollPosition = Math.round(window.scrollY);
          console.log(scrollPosition)
          if (scrollPosition >= 150) {
            imgStyle.display = "block"
          } else {
            imgStyle.display = "none"
          }
        });
  
        document.querySelectorAll(".desktop_menu_container a").forEach((el)=>{
          el.addEventListener("mouseover", (e)=>{
            //let target = e.target;
            //todo 
            document.querySelector(".desktop_menu_detail_list").style.display = "block"
          })
        })
  
        document.querySelector(".desktop_menu").addEventListener("mouseleave", (e)=>{
          document.querySelector(".desktop_menu_detail_list").style.display = "none"
        }) 







        function search_result_article({url,image_url,tags,time,title,title_url}){
          return `<article>
            <div class="mask">
              <a href="${url}"
                class="mask-img">
                <img width="100" height="100"
                  src="${image_url}"
                  sizes="(max-width: 100px) 100vw, 100px">
              </a>
            </div>
            <div class="body">
              <div class="tags">
                ${tags.map(({url,name})=>`<a href="${url}" class="cat">${name}</a>`)}
              </div>
              <span class="byline-part date">
                <time class="entry-date published dateCreated" datetime="2022-08-23T20:47:43+00:00">${time}</time>
              </span>
              <div class="title">
                <a href="${title_url}">
                  ${title}
                </a>
              </div>
            </div>
          </article>`
        }
        


        const data = [
          { url:"https://livingat300main.ca/wp-event/the-dark-eighties-halloween-party-in-winnipeg/",
            image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2022/07/10252_image_289430694_3271102523171404_8792148485379595860_n-100x100.jpg",
            tags:[
              {url:"https://livingat300main.ca/category/300-main/", name:"300 Main"},
              {url:"https://livingat300main.ca/category/adventure/", name:"Adventure"},
              {url:"https://livingat300main.ca/category/culture/", name:"Culture"},
              {url:"https://livingat300main.ca/category/downtown-events/", name:"Downtown Events"},
              {url:"https://livingat300main.ca/category/lifestyle/", name:"Lifestyle"},
            ],
            time:"August 23, 2022",
            title:"https://livingat300main.ca/whats-on-the-docket-for-downtown-winnipeg-in-2019/",
            title_url:"What’s on the Docket for Downtown Winnipeg in 2019?"
          },
          { url:"https://livingat300main.ca/wp-event/the-dark-eighties-halloween-party-in-winnipeg/",
            image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2022/07/10252_image_289430694_3271102523171404_8792148485379595860_n-100x100.jpg",
            tags:[
              {url:"https://livingat300main.ca/category/300-main/", name:"300 Main"},
              {url:"https://livingat300main.ca/category/adventure/", name:"Adventure"},
              {url:"https://livingat300main.ca/category/culture/", name:"Culture"},
              {url:"https://livingat300main.ca/category/downtown-events/", name:"Downtown Events"},
              {url:"https://livingat300main.ca/category/lifestyle/", name:"Lifestyle"},
            ],
            time:"August 23, 2022",
            title:"https://livingat300main.ca/whats-on-the-docket-for-downtown-winnipeg-in-2019/",
            title_url:"What’s on the Docket for Downtown Winnipeg in 2019?"
          },
          { url:"https://livingat300main.ca/wp-event/the-dark-eighties-halloween-party-in-winnipeg/",
          image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2022/07/10252_image_289430694_3271102523171404_8792148485379595860_n-100x100.jpg",
          tags:[
            {url:"https://livingat300main.ca/category/300-main/", name:"300 Main"},
            {url:"https://livingat300main.ca/category/adventure/", name:"Adventure"},
            {url:"https://livingat300main.ca/category/culture/", name:"Culture"},
            {url:"https://livingat300main.ca/category/downtown-events/", name:"Downtown Events"},
            {url:"https://livingat300main.ca/category/lifestyle/", name:"Lifestyle"},
          ],
          time:"August 23, 2022",
          title:"https://livingat300main.ca/whats-on-the-docket-for-downtown-winnipeg-in-2019/",
          title_url:"What’s on the Docket for Downtown Winnipeg in 2019?"
        },
          
        ]
        document.querySelector(".search_result").innerHTML = data.map(d=>search_result_article(d))
        document.querySelector(".search_count").innerHTML = (data.length + "results for what")



        const desktop_menu_detail_list_body_item_data = [
          {
            url:"https://livingat300main.ca/white-night-a-tale-of-nuit-blanche/",
            image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2019/09/beautiful-beauty-blond-hair-2669601-370x247.jpg",
            name:"White Night: A Tale of Nuit Blanche"
          },
          {
            url:"https://livingat300main.ca/white-night-a-tale-of-nuit-blanche/",
            image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2019/04/DSC01357-370x247.jpg",
            name:"Public Arts of Winnipeg: Living Living Room"
          },
          {
            url:"https://livingat300main.ca/white-night-a-tale-of-nuit-blanche/",
            image_url:"https://arwebstore.blob.core.windows.net/livingat300main-ca/2019/03/IMG_02662.jpg",
            name:"Downtown Dining: Curb Your Cravings with These Unique Spots"
          }
        ]
        function desktop_menu_detail_list_body_item({url,image_url,name}){
          return `
          <div>
            <a href="${url}" class="mask-img">
                <img width="370" height="247" src="${image_url}">
            </a>
            <p>
              <a href="${url}">${name}</a>
            </p>
          </div>
          `
        }
        document.querySelector(".desktop_menu_detail_list_body").innerHTML = desktop_menu_detail_list_body_item_data.map(i=>desktop_menu_detail_list_body_item(i))



  
      });