export const slideBannerHome = {
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 1000,
  fadeEffect: {
    crossFade: true,
  },
}

export const slideImagesProduct = {
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: false,
  autoplay: {
    delay: 3000,
  },
  speed: 1000,
  fadeEffect: {
    crossFade: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}
