<template lang="pug">
  section.section

    section
      .test ログインした時のページ
      button(@click="logOut") ログアウト
      nuxt-link(to="/") トップへ
      p {{$store.state.user.email}}

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

  mounted: function(){

  },

  components: {

  },

  methods: {

    ...mapActions(['setUser']),

    //ログアウト
    logOut(){
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
        this.$router.push('/?flash=logout')
      }).catch((error) => {
        alert(error)
      })
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
