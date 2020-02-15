<template lang="pug">
  section.pubuser-page-container(v-if="isCatchData")
    .user-cover-image-wrapper
      user-cover(:coverImage="userOpenData.coverUrl")
    .user-icon-image-wrapper
      .user-icon-image
        user-icon(:iconImage="userOpenData.iconUrl")
    .username-wrapper
      h3 {{userName}}
    .myevent-store-wrapper
      .store-info-label 販売情報
      v-tabs(v-model="tab" background-color="transparent" color="#F0858C" grow)
        v-tab これから
        v-tab 今まで
      v-tabs-items.event-tab-container(v-model="tab")

        v-tab-item.future-store-container
          .future-store-list-wrapper これからのイベントたぶ

        v-tab-item.previous-store-container
          .previous-store-list-wrapper 過去のイベントたぶ


</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import ArtworkModal from '~/components/ArtworkModal.vue'
import UserIcon from '~/components/UserIcon.vue'
import UserCover from '~/components/UserCover.vue'
import uuid from 'uuid'

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
      isDashbord: false,
      tab: null,
    };
  },

  components: {
    UserIcon,
    UserCover,
  },

  computed:{

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
             //console.log(this.userOpenData)
           }
         );

         })
         .catch(function(error) {
           console.log("Error getting documents: ", error);
         });

  },

  methods: {
  }
}
</script>

<style lang="scss">

body{
  max-width: 432px;
  margin: 0 auto;
}

.user-icon-image-wrapper{

  width:100px;
  margin: 0 auto;
  position: relative;
  .user-icon-image{
    position: absolute;
    top: -50px;
    margin: 0 auto;
  }
}

.username-wrapper{
  margin-top: 50px;
  h3{
    font-size: 1rem;
    font-weight: bold;
    color: #A7A7A7;
  }
}


.username-wrapper{
  text-align: center;
}

.store-info-label{
  text-align: center;
  padding: 10px 0 0;
  font-size: 0.7rem;
  font-weight: bold;
  color: #565656;
}


@media screen and (max-width: 780px) {

}

@media screen and (max-width: 480px) {


}



</style>
