<template lang="pug">
  v-app.app
    .event-share
      header.hf-bg-color
        .header-menu
          nuxt-link.header-logo(to="/")
            img(src="~/assets/images/logo.png")
          .header-menu-list
            .header-tomypage(v-if="isAuthenticated && $store.state.userinfo.userName")
              a.tomypage-button(:href="'https://intro-me.net/'+ $store.state.userinfo.userName" target="_blank") 公開ページへ
            .header-tomypage(v-else-if="isAuthenticated && $store.state.userinfo.userId")
              a.tomypage-button(:href="'https://intro-me.net/'+ $store.state.userinfo.userId" target="_blank") 公開ページへ
            //.header-login(v-else)
               .login-button(@click="googleLogin")
        .header-line
      section
        nuxt/

      navi-menu

      .term-privacy-footer
        nuxt-link.footer-link.caption.font-weight-bold(to="../terms") 規約
        nuxt-link.footer-link.caption.font-weight-bold(to="../privacy") プライバシーポリシー
        a.footer-link.caption.font-weight-bold(
          v-if="isAuthenticated"
          :href="'https://docs.google.com/forms/d/e/1FAIpQLSfi7oqBWWag5ACzV-vshvX5WSX6zSFWby6tDXeaDK1zqH0ABw/viewform?usp=pp_url&entry.18453089=' + this.$store.state.user.email"
          target="_blank") ご意見・ご感想
        a.footer-link.caption.font-weight-bold(
          v-else
          href="https://docs.google.com/forms/d/e/1FAIpQLSfi7oqBWWag5ACzV-vshvX5WSX6zSFWby6tDXeaDK1zqH0ABw/viewform"
          target="_blank") ご意見・ご感想

      footer.hf-bg-color
        .center-text
          p.footer-text ©2020 Intro-me. produced by <a :href="osaoHandmade" target="_blank">osao</a>
</template>
<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import NaviMenu from '~/components/NaviMenu.vue'


export default {

  data(){
    return{
      osaoHandmade: 'http://osao-handmade.firebaseapp.com/',
    };
  },

  computed:{
    ...mapState(['user']),
    ...mapState(['userinfo']),
    ...mapGetters(['isAuthenticated']),
  },

  components:{
    NaviMenu,
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
.v-application{
  font-family: 'M PLUS Rounded 1c', sans-serif!important;
}
html {
  font-family: 'M PLUS Rounded 1c', sans-serif!important;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #565656;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h2,h3{
  font-weight: normal;
  color: #565656;
}

p{
  color: #565656;
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

.event-share-button{
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #F9DBDB;
  color: #565656;
}

.event-share-button:hover{
  cursor: pointer;
  opacity: 0.7;
}

a{
  color: #565656;
}
.underline-link{
  font-size: 0.8rem;
  text-decoration: underline;
  color: #565656;
}

.term-privacy-footer{
  display: flex;
  justify-content: center;
  padding: 4px 0;
  background-color: #FBE9F5;
  .footer-link{
    text-decoration: none;
    color: #A7A7A7;
    padding: 0 6px;
  }

}

.underline-link:hover{
  cursor: pointer;
  opacity: 0.7;
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
  height: 36px;
  width: 150px;
  background-size: contain;
}

.login-button:hover{
  cursor: pointer;
  background-image: url("../assets/images/btn_google_signin_light_focus_web.png");
}

.header-menu{
  display: flex;
  justify-content: space-between;
  height: 48px;
  margin-right: 50px;

  .header-logo{

    padding-top: 5px;

    img{
      height: 40px;
    }
  }

  .header-login{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 6px 0 0;
    height: 48px;
  }

  .header-menu-list{
    display: flex;
    justify-content: center;
    align-items: center;

    .header-tomypage{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tomypage-button{
      background-color: #F0858C;
      width: 100px;
      margin: 4px 8px;
      padding: 10px;
      line-height:  12px;
      font-size:  12px;
      color: #fff;
      font-weight: bold;
      border-radius: 6px;
      text-align: center;
      text-decoration: none;
    }
  }

}

.input-label{
  margin-bottom: 5px;
  color: #565656;
  font-size: 0.8rem;
}

.input-area{
  padding: 4px 10px;
  margin-bottom: 4px;
  font-size: 16px;
  border-radius: 4px;
  background: #FFFFFF;
  color: #787C7B;
  letter-spacing: 0rem;
  line-height: 1.4;
  opacity: 1;
  pointer-events: all;
  background-clip: border-box;
  border: solid 0.5px #B3B6BB;
  transition: .3s cubic-bezier(.4,.4,0,1);
}

input,
textarea{
  border: solid 0.5px #B3B6BB;
  width: 100%;
}

input:focus,
textarea:focus{
  border: solid 0.5px #B3B6BB;
  outline: 0;
}

::placeholder{
  color: #cdd;
}




.common-button{
  background-color: #F0858C;
  min-width:250px;
  padding: 8px 6px;
  border-radius: 6px;
  margin: 16px auto;
  text-align: center;
  color: #fff;
  font-weight: bold;
}

.tomypage-button:hover,
.common-button:hover{
  cursor: pointer;
  opacity: 0.7;
}

.save-button{

}

.disabled-button{
  background-color: #EEEEEE;
  color: #ccc;
}


.save-button:hover{
  cursor: pointer;
  opacity: 0.7;
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
    font-size: 0.8rem;
    a{
      color: #565656;
    }
  }
}
</style>
