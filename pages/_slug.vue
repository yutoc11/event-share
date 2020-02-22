<template lang="pug">
  section
    .no-catchdata-wrapper(v-if="!isCatchData")
      loading-image
    .pubuser-page-container(v-show="isCatchData")
      section.user-info-wrapper
        .user-cover-image-wrapper
          user-cover(:coverImage="userOpenData.coverUrl" @loadedCover="loadedCover")
        .user-icon-image-wrapper
          .user-icon-image
            user-icon(:iconImage="userOpenData.iconUrl" @loadedIcon="loadedIcon")

        .username-wrapper
          h3 {{userName}}
        .myevent-store-wrapper
          .store-info-label 販売情報

      section.event-info-wrapper
        v-tabs.event-tab-wrapper(v-model="tab" background-color="transparent" color="#F0858C" grow)
          v-tab これから
          v-tab 今まで

        v-tabs-items.event-tab-container(v-model="tab")

          v-tab-item.future-store-container
            loading-image(v-if="isLoadingEvents")
            event-list(v-show="!isLoadingEvents" :events="futureEvents")

          v-tab-item.previous-store-container
            loading-image(v-if="isLoadingEvents")
            event-list(v-show="!isLoadingEvents" :events="pastEvents")


</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import ArtworkModal from '~/components/ArtworkModal.vue'
import UserIcon from '~/components/UserIcon.vue'
import UserCover from '~/components/UserCover.vue'
import EventList from '~/components/EventList.vue'
import LoadingImage from '~/components/LoadingImage.vue'
import { ContentLoader } from 'vue-content-loader'
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
      futureEvents: [],
      pastEvents: [],
      isLoadingIcon: true,
      isLoadingCover: true,
      isLoadingEvents: true,
    };
  },

  components: {
    UserIcon,
    UserCover,
    EventList,
    ContentLoader,
    LoadingImage,
  },

  computed:{

  },

  mounted: function(){

    this.isLoadingEvents = false;
  },

  beforeCreate(){
    this.userName = this.$route.path.slice(1);
    console.log(this.userName)
    const db = firebase.firestore();

    db.collection('users').where("userName", "==", this.userName)
       .get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {

             this.isCatchData = true;
             this.userOpenData = doc.data();
             if(!this.userOpenData.coverUrl){
               this.isLoadingCover = false;
             }
             if(!this.userOpenData.iconUrl){
               this.isLoadingIcon = false;
             }
             console.log(this.userOpenData)
             console.log(this.isCatchData)
             console.log('↑キャッチしたよ！')
             setTimeout(this.getEvents,100);

           }
         );

         })
         .catch(function(error) {
           console.log("Error getting documents: ", error);
         });
  },

  methods: {
    loadedCover(){
      console.log(this.isLoadingCover)
      this.isLoadingCover = false;
    },

    loadedIcon(){
      console.log(this.isLoadingIcon)
      this.isLoadingIcon = false;
    },

    getEvents(){
      console.log("getEvents")
        const db = firebase.firestore();
        const currentTime = new Date();
        console.log(currentTime)

        db.collection('users').doc(this.userOpenData.userId).collection('events')
          .where("eventEndDate", ">", currentTime)
          .orderBy("eventEndDate", "desc")
           .get().then((querySnapshot) => {
             console.log(querySnapshot)
             console.log(querySnapshot.docs)
             this.futureEvents = [];
             querySnapshot.forEach((doc) => {
                 console.log('追加時のリスト読み取りなう');
                 console.log(doc.data());
                 this.futureEvents.push(doc.data())
                 this.isLoadingEvents = false;
               }
             );

             })
             .catch(function(error) {
               console.log("Error getting documents: ", error);
             });

         db.collection('users').doc(this.userOpenData.userId).collection('events')
           .where("eventEndDate", "<=", currentTime)
           .orderBy("eventEndDate", "desc")
            .get().then((querySnapshot) => {
              console.log(querySnapshot)
              console.log(querySnapshot.docs)
              this.pastEvents = [];
              querySnapshot.forEach((doc) => {
                  console.log('追加時のリスト読み取りなう');
                  console.log(doc.data());
                  this.pastEvents.push(doc.data())
                  this.isLoadingEvents = false;
                }
              );

              })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
              });
    }
  }
}
</script>

<style lang="scss">

body{
  max-width: 432px;
  margin: 0 auto;
}

.no-catchdata-wrapper{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


.user-icon-image-wrapper{

  width:100px;
  margin: 0 auto;
  position: relative;
  .user-icon-image{
    position: absolute;
    top: -50px;
    margin: 0 auto;
    .icon-loading-display-wrapper{
      border-radius: 50%;
      background-color: transparent;
      width: 100px;
      height: 100px;
      border: 1px solid #fff;
    }
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
.event-info-wrapper{
  padding: 12px;
  //min-height: 100vw;
  .event-tab-wrapper{
    margin-bottom: 10px;
  }
}
.event-tab-container{

}




@media screen and (max-width: 780px) {

}

@media screen and (max-width: 480px) {


}



</style>
