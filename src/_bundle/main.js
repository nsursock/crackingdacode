import Alpine from 'alpinejs'
import 'htmx.org'
import 'lazysizes'
// import intersect from '@alpinejs/intersect'

Alpine.directive(
  'intersect',
  (el, { expression, modifiers }, { evaluateLater, cleanup }) => {
    let evaluate = evaluateLater(expression)

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // if (entry.intersectionRatio === 0) return
        // entry.target.style.opacity = entry.intersectionRatio;

        console.log(entry.intersectionRatio)
        if (entry.isIntersecting)
          evaluate()

        // modifiers.includes('once') && observer.disconnect()
      })
    })

    observer.observe(el)

    cleanup(() => {
      observer.disconnect()
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
document.body.addEventListener('htmx:afterSwap', () => {
  // Alpine.plugin(intersect)
  Alpine.start()
})

// Basic Store Example in Alpine.
window.addEventListener('alpine:initializing', () => {
  Alpine.store('nav', {
    isOpen: false,
    close() {
      return (this.isOpen = false)
    },
    open() {
      return (this.isOpen = true)
    },
    toggle() {
      return (this.isOpen = !this.isOpen)
    },
  })
})
