export default () => ({
  showCta: false,
  showTests: false,
  showPopup: false,
  landingPageOffset: 400,
  lastScrollTop: window.pageYOffset || document.documentElement.scrollTop,
  isScrollingUp: false,
  circumference: 30 * 2 * Math.PI,
  percent: 0,
  showCommentsPanel:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false,
  showAuthLoginModal: false,
  showAuthSignupModal: false,
  email: '',
  name: '',
  password: '',

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  async init() {
    // document.addEventListener('DOMContentLoaded', () => {
    // desktop
    // document.addEventListener('mouseout', (event) => {
    //   if (!event.toElement && !event.relatedTarget) {
    //     setTimeout(() => {
    //       this.showPopup = true
    //     }, 1000)
    //   }
    // })

    // // mobile
    // window.addEventListener(
    //   'scroll',
    //   (event) => {
    //     if (!event.toElement && !event.relatedTarget) {
    //       if (this.isMobile() && window.scrollY === 0) {
    //         setTimeout(() => {
    //           this.showPopup = true
    //         }, 1000)
    //       }
    //     }
    //   },
    //   { passive: true }
    // )
    // })

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
