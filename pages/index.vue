<template lang="pug">
  section.section

    section.center-text
      .first-view#fv ログインしていない時のトップ
      button(@click="googleLogin") Googleログイン
      nuxt-link(to="dashbord") ダッシュボードへ

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

  },

  created: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setUser(user)
        console.log(this.$store.state.user);
        this.$router.push('/dashbord')
      }
    })

  },

  mounted: function(){

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



@media screen and (max-width: 780px) {

}

@media screen and (max-width: 480px) {

}



</style>
