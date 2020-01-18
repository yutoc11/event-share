<template lang="pug">
  section.section

    section
      .first-view#fv テスト
        
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapState, mapGetters } from 'vuex'

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

  },

  mounted: function(){

  },

  components: {

  },

  methods: {

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
