<template lang="pug">
  .event-share
    header.bg-color
      .header-menu
        .header-logo
          img(src="~/assets/images/logo.png")
        .header-login
           .header-login-button(@click="googleLogin")
      .header-line

    section
      nuxt/

    footer.bg-color
      .center-text
        p ©2019 event-share.
</template>
<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  computed:{
    ...mapState(['user']),
  },

  methods: {
    ...mapActions(['setUser']),

    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      .then(user => {
        this.setUser(user)
        console.log(this.$store.state.user);
        this.$router.push('/dashbord')
      }).catch((error) => {
        alert(error)
      });
    },
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.bg-color{
  background-color: #fff;
}

.center-text{
  text-align: center;
}

header{
  height: 50px;
  line-height: 48px;
  .header-line{
    height: 2px;
    background-color: #E7EBEF;
  }
}

.header-menu{
  display: flex;
  justify-content: space-between;
  height: 48px;

  .header-logo{

    padding-top: 5px;

    img{
      height: 40px;
    }
  }

  .header-login{

    padding: 2px 6px 0 0;
    height: 48px;

    .header-login-button{
      background-image: url("../assets/images/btn_google_signin_light_normal_web.png");
      height: 45px;
      width: 190px;
      background-size: cover;
    }

    .header-login-button:hover{
      cursor: pointer;
      background-image: url("../assets/images/btn_google_signin_light_focus_web.png");
    }
  }

}


section{
  background-color: #F9FBFE;
}

footer{
  padding: 40px 0;
  background-color: rgba(255,255,255,0);
}
</style>
