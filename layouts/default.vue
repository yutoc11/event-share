<template lang="pug">
  v-app.app
    .event-share
      header.hf-bg-color
        .header-menu
          .header-logo
            img(src="~/assets/images/logo.png")
          .header-login
             .login-button(@click="googleLogin")
        .header-line

      section
        nuxt/

      footer.hf-bg-color
        .center-text
          p.footer-text ©2019 event-share.
</template>
<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  computed:{
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),
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
  background-color: #F9DBDB;
}

.hf-bg-color{
  background-color: #fff;
}

.center-text{
  text-align: center;
}

.align-center{
  margin: 0 auto;
}

.event-share{

}

.event-container{
  max-width: 620px;
  margin: 0 auto;
  padding:12px 12px 50px;
  text-align: center;
  background-color: transparent;
}

.v-window__container,
.v-window.v-item-group.v-tabs-items,
.v-window-item.event-container{
  background-color: #F9FBFE;
}

header{
  height: 50px;
  line-height: 48px;
  .header-line{
    height: 2px;
    background-color: #E7EBEF;
  }
}
.v-btn__content{
  color: #16325c;
}

.login-button{
  background-image: url("../assets/images/btn_google_signin_light_normal_web.png");
  height: 45px;
  width: 190px;
  background-size: cover;
}

.login-button:hover{
  cursor: pointer;
  background-image: url("../assets/images/btn_google_signin_light_focus_web.png");
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
  }

}


section{
  background-color: #F9FBFE;
}

footer{
  padding: 18px 0;
  line-height: 18px;
  background-color: rgba(255,255,255,0);
  p.footer-text{
    margin-bottom: 0;
  }
}
</style>
