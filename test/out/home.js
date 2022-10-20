        
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
  
      });