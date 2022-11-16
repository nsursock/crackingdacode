export default () => ({
  form: null,
  success: undefined,
  showNotification: false,
  status: '',
  details: '',
  async handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    try {
      const response = await fetch(event.target.action, {
        method: this.form.method,
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
      if (!response.ok) throw new Error({ response })
      this.success = true
      this.status = 'Succeeded'
      this.details = 'Thanks for your submission!'
      this.showNotification = true
      this.form.reset()
    } catch (e) {
      // const data = await e.response.json()
      // if (Object.hasOwn(data, 'errors')) {
      //   this.status = data['errors']
      //     .map((error) => error['message'])
      //     .join(', ')
      // } else {
        this.success = false
        this.status = 'Failed'
        this.details = 'There was a problem submitting your form. Please check and try again.'
        this.showNotification = true
      // }
    }
  },
  init() {
    this.form = document.getElementById('my-form')
    // this.form.addEventListener('submit', this.handleSubmit)
  }
})
