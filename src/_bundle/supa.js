export default () => ({
  // isFetching: false,
  // showInput: false,
  identity: '',
  description: '',
  saveTestimonial(evt) {
    this.isFetching = true

    const file = evt.target[2].files[0]
    const data = new FormData()
    data.append('description', this.description)
    data.append('identity', this.identity)
    data.append('picture', file)

    fetch('/api/testimonials-add', {
      method: 'POST',
      body: data,
    })
      .then(async () => {
        this.showInput = false
        // this.items = (
        //   await (await fetch('/api/testimonials-select')).json()
        // ).data
      })
      .catch((error) => console.log(error))
  },

  // shuffle(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     const temp = array[i]
  //     array[i] = array[j]
  //     array[j] = temp
  //   }
  // },
})
