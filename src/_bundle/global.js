export default () => ({
  showCta: false,
  landingPageOffset: 400,
  lastScrollTop: window.pageYOffset || document.documentElement.scrollTop,
  isScrollingUp: false,
  init() {
    window.addEventListener(
      'scroll',
      () => {
        var st = window.pageYOffset || document.documentElement.scrollTop
        this.isScrollingUp = st <= this.lastScrollTop
        this.lastScrollTop = st <= 0 ? 0 : st // for mobile or negative scrolling
      },
      false
    )
  },
})
