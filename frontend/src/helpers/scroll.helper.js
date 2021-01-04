export const scrollHelper = {
  goToTop() {
    window.scrollTo(0, 0)
  },

  goScroll(x, y) {
    window.scrollTo(x, y)
  },

  goToBottom() {
    window.scrollTo(0, document.body.scrollHeight)
  },
}
