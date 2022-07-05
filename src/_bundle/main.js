import Alpine from 'alpinejs'
import global from './global.js'
import form from './form.js'
import testimonials from './testimonials.js'
// import 'htmx.org'
import 'lazysizes'
// import intersect from '@alpinejs/intersect'

// import moment from '@victoryoalli/alpinejs-moment'
// Alpine.plugin(moment)

Alpine.data('global', global)
Alpine.data('form', form)
Alpine.data('testimonials', testimonials)

Alpine.directive(
  'intersect',
  (el, { expression, modifiers }, { evaluateLater, cleanup }) => {
    let evaluate = evaluateLater(expression)
    const threshold =
      modifiers.find((mod) => mod.includes('ratio'))?.split('-')[1] ?? 0.25

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) evaluate()
          // modifiers.includes('once') && observer.unobserve(el)
        })
      },
      { root: null, threshold: threshold }
    )
    observer.observe(el)

    cleanup(() => {
      observer.unobserve(el)
    })
  }
)

window.Alpine = Alpine

// Start Alpine when the page is ready.
window.addEventListener('DOMContentLoaded', () => {
  // Alpine.plugin(intersect)
  Alpine.start()
})

// Restart Alpine when the DOM is altered by HTMX.
// document.body.addEventListener('htmx:afterSwap', () => {
//   // Alpine.plugin(intersect)
//   Alpine.start()
// })

// Basic Store Example in Alpine.
window.addEventListener('alpine:initializing', () => {
  Alpine.store('auth', {
    user: null,
    setUser(user) {
      this.user = user
    },
    init() {
      const token = localStorage.getItem('crdacode_token')
      if (token) {
        fetch('/api/auth-me-query', {
          method: 'POST',
          body: token,
        })
          .then((response) => response.json())
          .then((message) => {
            if (message.success) this.user = message.user
          })
      }
    },
  })
})
