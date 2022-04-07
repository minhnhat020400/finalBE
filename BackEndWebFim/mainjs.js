$(document).ready(()=>{
   $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('.list-catagorys').toggleClass('active')
   }) 

   //setting carousel
   let navText=["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]
   $('#hero-carousel').owlCarousel({
      items: 1,
      dots: false,
      loop: true,
      nav: true,
      navText: navText,
      autoplayHoverPause: true
   });
});
