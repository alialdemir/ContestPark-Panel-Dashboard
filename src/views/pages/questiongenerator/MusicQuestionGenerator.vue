<template>
  <div>test</div>
</template>
<script>
export default {
  created() {
    const { code } = this.$route.query;
    if (code) {
      localStorage.setItem('spotifyAuth', code);
    } else {
      this.$store.dispatch('spotifyAuth');
    }
    const spotifyAuth = localStorage.getItem('spotifyAuth');
    if (spotifyAuth) {
      this.$store.dispatch('setAccessToken', code);
      //this.$store.dispatch('getArtist', '5gFPi3KWXEwA9bLEO47Ow0');
    }
  }
};
</script>
 