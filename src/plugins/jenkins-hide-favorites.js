export default {
  name: 'Jenkins: hide favorites',
  runFor: function (url) {
    return url.includes('http://build-server:8080/blue/pipelines');
  },
  run: function () {
    const favorites = $('.favorites-card-stack');
    if (favorites) {
      favorites.remove();
    }
  }
}
