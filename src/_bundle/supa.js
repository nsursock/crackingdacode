export default () => ({
  // isFetching: false,
  // showInput: false,
  identity: '',
  description: '',
  saveTestimonial(evt) {
    this.isFetching = true

    // const file = document.querySelector('#upload').files[0]
    // console.log(file);

    const file = evt.target[2].files[0]

    // file.arrayBuffer().then((arrayBuffer) => {
    // const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type })
    const data = new FormData()
    data.append('description', this.description)
    data.append('identity', this.identity)
    data.append('picture', file)
    // data.append('blob', blob)

    fetch('/api/testimonials-add', {
      method: 'POST',
      body: data,
    })
      .then(() => (this.showInput = false))
      .catch((error) => console.log(error))
    // })
  },
})
