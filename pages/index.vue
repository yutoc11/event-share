<template lang="pug">
  section.event-container.lp-container

    section.main-message-container#main-message
      .main-message-wrpper
        h2 SNSやネットショップ<br>イベント情報の<br>まとめが簡単に！
        h3 かんたんリンク作成サービス
      .quick-start-wrapper
        .quick-start-message ＼Googleアカウントではじめてみる／
        .login-button.align-center(@click="googleLogin")
      .prepare-message
        p 対応リンク先は続々追加予定！
      .sample-url-wrapper
        nuxt-link.sample-url(to="/_o_s_a_o_" target="_blank") サンプルをみる
      .public-page-image
        img(src="~assets/images/pubpage-sample.png")
      .attention-message
        p ※画面イメージは変わることがございます


    //section.event-container#service-merit
      .service-merit-wrapper
      .login-button.align-center(@click="googleLogin")

    //section.event-container#start-step
      .start-step-wrapper
      .login-button.align-center(@click="googleLogin")

</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  //layout: 'home',

  head () {
    return {
      bodyAttrs: {
        class: this.showModal ? 'modal-body' : ''
      }
    }
  },

  data(){
    return{
      showModal: false,
      postItem: '',
      formData: {
        name: '',
        email: '',
        content: '',
      }
    };
  },

  asyncData () {
    return {
      fvWidth: "",
      fvHeight: "",
      flash_message: "",
    };
  },


  computed:{
    //...mapState(['fashions']),
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),

  },

  created: function(){


  },

  mounted: function(){

  },

  beforeMount(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setUser(user)
        console.log(this.$store.state.user);
        this.$router.push('/dashbord')
      }
    })
  },

  components: {

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

.modal-body {
  overflow-y: hidden;
}

#main-message.main-message-container,
.event-container.lp-container{
  padding-bottom: 0;
}
.quick-start-wrapper{

  padding: 14px 0 24px;

  .quick-start-message{
    font-size: 0.85rem;
    color: #565656;
    letter-spacing: 1.2px;
  }
}

.sample-url-wrapper{
  margin-bottom: 8px;
  .sample-url{
    color: #565656;
    font-size: 0.85rem;
  }
}


.prepare-message{
  font-size: 0.85rem;
  color: #565656;
  letter-spacing: 1.2px;
  p{
    margin-bottom: 24px;
  }
}

.attention-message{

  width: 300px;
  margin: 0 auto;
  text-align: center;
  font-size: 0.7rem;
  letter-spacing: 1.2px;
  p{
    margin-bottom: 24px;
    color: #A7A7A7;
  }
}

.main-message-container{

  padding: 12px 0 24px;
  .main-message-wrpper{
    h2{
      font-weight: bold;
      letter-spacing: 2px;
      line-height: 2.5rem;
      margin-bottom: 8px;
    }
    h3{
      line-height: 2.5rem;
    }
  }
  .public-page-image{
    img{
      width: 300px;
      border: 3px solid #ccc;
    }
  }

}


@media screen and (max-width: 780px) {
  .main-message-container{

    .main-message-wrpper{
      h2{
        font-weight: bold;
        letter-spacing: 2px;
        line-height: 2.5rem;
        font-size: 1.4rem;
      }
      h3{
        line-height: 2.5rem;
      }
    }
    .public-page-image{
      img{
        width: 300px;
      }
    }

  }
}

@media screen and (max-width: 480px) {

}



</style>
