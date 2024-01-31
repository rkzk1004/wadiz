// submenu
$('.header .group-bottom nav a').each(function(){
  const submenuData = $(this).data('submenu')
  $(this).hover(function(){
    $(submenuData).addClass('on').siblings().removeClass('on')
  },function(){
    $($('.submenu-area')).removeClass('on')
  })
})

// group-quick
$('.btn-more').click(function(){
  $('.group-quick').toggleClass('on')
  $('.group-quick-bg').toggleClass('on')
})

// search-area 열기
$('.header .input-text').click(function(){
  $('.search-area').addClass('on')
})

// search-area 서브메뉴 열기
$(document).on('click','.search-area .cate-item button',function(){
  $(this).toggleClass('on').parent().siblings().find('button').removeClass('on')
  $(this).parent().find('.cate-sublist').slideToggle()
  $(this).parent().siblings().find('.cate-sublist').slideUp()
})

// search-area json
fetch('./assets/data/categories.json')
.then(res=>res.json())
.then(json=>{
  data = json.data
  let html = ``
  data.forEach(element => {
    let childHtml = ``
    element.children.forEach(element => {
      childHtml += `
      <li class="cate-subitem">
      <a href="">${element.categoryName}</a></li>
      `
    });

    html += `
      <li class="cate-item">
        <button aria-label="메뉴펼치기" aria-expanded="false" aria-label="메뉴펼치기" aria-expanded="false">
          <div class="text">
            <img src="${element.activeImageUrl}" alt>
            <span>${element.categoryName}</span>
          </div>
          <svg viewBox="0 0 24 24" fill="none" focusable="false" role="presentation" class="withIcon_icon__2nnc8" aria-hidden="true" style="width: 16px; height: 16px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.576 7.924l.848-.848L12 15.652l8.576-8.576.848.848L12 17.35 2.576 7.924z"></path></svg>
        </button>
        <ul class="cate-sublist">
          ${childHtml}
        </ul>
      </li>
    `
  });
  $('#cateList').html(html)
})

// 영역 밖에 클릭시 창닫기
$(document).click(function(e){
  if($('.header').has(e.target).length==0){
    $('.group-quick').removeClass('on')
    $('.group-quick-bg').removeClass('on')
  }
  if($('.col-right').has(e.target).length==0){
    $('.search-area').removeClass('on')
  }
  if($('.footer .content-item').has(e.target).length==0){
    $('.footer .content-sublist').removeClass('on')
  }
})

// sc-banner
const swiperBanner = new Swiper('.swiper-banner',{
  slidesPerView:1,
  // loop:true,
  pagination: {
    el: ".swiper-banner .progress",
    type: "progressbar",
  },
  navigation: {
    prevEl: ".swiper-banner .btn-prev",
    nextEl: ".swiper-banner .btn-next",
  },
})

// sc-banner json
fetch('./assets/data/visualSlideData.json')
.then(res=>res.json())
.then(json=>{
  data = json.ads
  let html = ``
  data.forEach(element=>{
    html+=`<a href="" class="swiper-slide">
    <img src="${element.photoUrl}" alt class="bg">
      <div class="inner">
        <strong>${element.mainCopy}</strong>
        <em>${element.subCopy}</em>
      </div>
      </a>
    `
  })
  $('#slideList').html(html)
})

// ai추천 더보기 클릭시 숫자 1씩 증가
let num = 1;
$('.sc-taste .link-more').click(function(e){
  e.preventDefault()
  num++
 
  if(num > 3){
    num=1
  }

  $(this).find('.fraction span').html(`${num}`)
})

// sc-rank
$('.sc-rank .btn-tab').click(function(){
  const rankTabName = $(this).data('rank')
  $(this).addClass('on').siblings().removeClass('on')
  list(rankTabName)
})

// sc-rank json
list('funding')
function list(rankTabName){
  fetch('./assets/data/ranking.json')
  .then(res=>res.json())
  .then(json=>{
    data = (rankTabName === 'funding') ?  json.funding : json.store
    let html = ``
    data.forEach((element,i) => {
      let num = ``
      let freeDeily = ``
      let grade = ``
      if(rankTabName === 'funding'){
        if(element.productType === 'REWARD'){
          num = `${element.rate}%`
        }else{
          num = `${element.participants}명 참여`
        }
      }else{
        num = `${element.participants}명 인증`
        // freeDeily = ``
        // grade = ``
      }
      html+=`<li class="content-item">
        <a href="" class="module-item">
          <em class="num">${i+1}</em>
          <div class="text-wrap">
            <p class="desc">${element.title}</p>
            <div class="rate">${num}</div>
          </div>
          <picture><img src="${element.thumbnail}" alt="${element.title}"></picture>
        </a>
      </li>`
    });

    $('#rankingList').html(html)
  })
}

// sc-store-pick
const swiperStorePick = new Swiper('.swiper-store-pick',{
  slidesPerView:1
})

// sc-early
const swiperEarly = new Swiper('.swiper-early',{
  slidesPreView:1,
  speed:0,
  pagination: {
    el: ".sc-early .pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    prevEl: ".sc-early .btn-prev",
    nextEl: ".sc-early .btn-next",
  },
})

// sc-early
const swiperPlan = new Swiper('.swiper-plan',{
  slidesPreView:1,
  speed:0,
  pagination: {
    el: ".sc-plan .pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    prevEl: ".sc-plan .btn-prev",
    nextEl: ".sc-plan .btn-next",
  },
})

// sc-dailyy
const swiperDaily = new Swiper('.swiper-daily',{
  slidesPreView:1,
  speed:0,
  pagination: {
    el: ".sc-daily .pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    prevEl: ".sc-daily .btn-prev",
    nextEl: ".sc-daily .btn-next",
  },
})

// footer
$('.footer .btn-left').each(function(idx,item){
  $(this).click(function(){
    $(this).parent().find('.content-sublist').toggleClass("on")
    $(this).parent().siblings().find('.content-sublist').removeClass("on")
  })
})
$('.footer .btn-right').each(function(idx,item){
  $(this).click(function(){
    $(this).parent().find('.content-sublist').toggleClass("on")
    $(this).parent().siblings().find('.content-sublist').removeClass("on")
  })
})