export default () => ({
  showCta: false,
  showTests: false,
  showPopup: false,
  landingPageOffset: 400,
  lastScrollTop: window.pageYOffset || document.documentElement.scrollTop,
  isScrollingUp: false,
  circumference: 30 * 2 * Math.PI,
  percent: 0,
  prevPercent: 0,
  currStep: '0',
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
  paymentMade: false,
  currentStep: 1,

  async checkPermission() {
    const res = await fetch('/api/payment-code-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: Alpine.store('auth').user.email,
        article: window.location.pathname,
      }),
    })
    const json = await res.json()
    return json.data.length !== 0
  },

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  async init() {
    // setTimeout(() => {
    //   this.showPopup = true
    // }, 1000)

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
        this.prevPercent = this.percent
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
          if (
            this.percent >= 25 &&
            this.percent < 50 &&
            this.currStep === '0'
          ) {
            this.currStep = 'article-25'
            umami.trackEvent('article-25', 'scroll')
          } else if (
            this.percent >= 50 &&
            this.percent < 75 &&
            this.currStep.includes('25')
          ) {
            this.currStep = 'article-50'
            umami.trackEvent('article-50', 'scroll')
          } else if (
            this.percent >= 75 &&
            this.percent < 100 &&
            this.currStep.includes('50')
          ) {
            this.currStep = 'article-75'
            umami.trackEvent('article-75', 'scroll')
          } else if (this.percent === 100 && this.currStep.includes('75')) {
            this.currStep = 'article-100'
            umami.trackEvent('article-100', 'scroll')
            // this.showPopup = true
          }
        }
      },
      false
    )
  },
})
