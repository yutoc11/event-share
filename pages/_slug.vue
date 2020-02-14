<template lang="pug">
  section.event-container テストページ{{userName}}
    p {{userOpenData}}
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  layout: 'user',

  head () {
    return {
      bodyAttrs: {
        class: this.showModal ? 'modal-body' : ''
      }
    }
  },

  data(){
    return{
      userOpenData: '',
      isSetuserName: false,
      isCatchData : false,
    };
  },

  asyncData(context) {
    return {

    }
  },

  computed:{

    userData: function () {
      if(this.isSetuserName){


      }
    }
  },

  beforeCreate(){

  },

  created: function(){

  },

  beforeMount(){
  },

  mounted: function(){
    console.log('マウントわず')
    this.userName = this.$route.path.slice(1);
    console.log(this.userName)
    const db = firebase.firestore();

    db.collection('users').where("userName", "==", this.userName)
       .get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {

             this.isCatchData = true;
             this.userOpenData = doc.data();
           }
         );

         })
         .catch(function(error) {
           console.log("Error getting documents: ", error);
         });

  },

  components: {
  },

  methods: {
  }
}
</script>

<style lang="scss">




@media screen and (max-width: 780px) {

}

@media screen and (max-width: 480px) {

}



</style>
