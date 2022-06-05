export default () => ({
  form: null,
  async handleSubmit(event) {
    event.preventDefault()
    var status = document.getElementById('my-form-status')
    var data = new FormData(event.target)
    fetch(event.target.action, {
      method: 'post',//this.form.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = 'Thanks for your submission!'
          // this.form.reset()
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data['errors']
                .map((error) => error['message'])
                .join(', ')
            } else {
              status.innerHTML =
                'Oops! There was a problem submitting your form'
            }
          })
        }
      })
      .catch((error) => {
        status.innerHTML = 'Oops! There was a problem submitting your form'
      })
  },
  init() {
    this.form = document.getElementById('my-form')
    this.form.addEventListener('submit', this.handleSubmit)
  },
})
