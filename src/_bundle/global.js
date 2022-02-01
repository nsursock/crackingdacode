export default () => ({
  showCta: false,
  landingPageOffset: 400,
  lastScrollTop: window.pageYOffset || document.documentElement.scrollTop,
  isScrollingUp: false,
  circumference: 30 * 2 * Math.PI,
  percent: 0,
  init() {
    window.addEventListener(
      'scroll',
      () => {
        var st = window.pageYOffset || document.documentElement.scrollTop
        this.isScrollingUp = st <= this.lastScrollTop
        this.lastScrollTop = st <= 0 ? 0 : st // for mobile or negative scrolling

        const target = document.querySelector('#article')
        if (target) {
          const winTop =
            window.pageYOffset || document.documentElement.scrollTop
          const targetBottom = target.offsetTop + target.scrollHeight
          const windowBottom = winTop + window.outerHeight
          this.percent = Math.min(
            Math.round(
              100 -
                ((targetBottom - windowBottom + window.outerHeight / 3) /
                  (targetBottom -
                    window.outerHeight +
                    window.outerHeight / 3)) *
                  100
            ),
            100
          )
        }
      },
      false
    )
  },
})
