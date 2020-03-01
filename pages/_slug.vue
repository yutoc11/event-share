<template lang="pug">
  section
    .no-catchdata-wrapper(v-if="!isCatchData && !passUserName && !passUserId")
      loading-image
    .no-user-wrapper(v-else-if="!isCatchData && passUserName && passUserId")
      .no-user-message(v-if="isLoadingPage")
        loading-image
      //.no-user-message(v-else)
        p 申し訳ございません！<br>お探しのページは存在しません。

    .pubuser-page-container(v-show="isCatchData")
      section.user-info-wrapper
        .user-cover-image-wrapper
          user-cover(:coverImage="userOpenData.coverUrl" @loadedCover="loadedCover")

        .user-icon-name-display-wrapper
          .user-icon-name-wrapper
            .user-icon-image-wrapper
              .user-icon-image
                user-icon(:iconImage="userOpenData.iconUrl" @loadedIcon="loadedIcon")
            .username-display-wrapper
              .username-wrapper
                h3 {{userOpenData.userName}}
        .relative-link-list-wrapper
          .relative-link-wrapper
            .content-wrapper(v-if="instaURL")
              .content-img
                a(:href="instaURL" target="_blank")
                  img(src="~/assets/images/instagram.png")
            .content-wrapper(v-if="twitterURL")
              .content-img
                a(:href="twitterURL" target="_blank")
                  img(src="~/assets/images/twitter.png")
            .content-wrapper(v-if="facebookURL")
              .content-img
                a(:href="facebookURL" target="_blank")
                  img(src="~/assets/images/facebook.png")
            .content-wrapper(v-if="minneURL")
              .content-img
                a(:href="minneURL" target="_blank")
                  img(src="~/assets/images/minne_appicon.png")
            .content-wrapper(v-if="baseURL")
              .content-img
                a(:href="baseURL" target="_blank")
                  img(src="~/assets/images/base_icon.png")
            .content-wrapper(v-if="creemaURL")
              .content-img
                a(:href="creemaURL" target="_blank")
                  img(src="~/assets/images/creema.png")

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
      isCatchData: false,
      passUserName: false,
      passUserId: false,
      isDashbord: false,
      tab: null,
      futureEvents: [],
      pastEvents: [],
      isLoadingIcon: true,
      isLoadingCover: true,
      isLoadingEvents: true,
      isLoadingPage: true,
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

    instaURL: function(){
      if(this.isCatchData){
        if(this.userOpenData.userInstaName){
          let instaURL = 'https://www.instagram.com/' + this.userOpenData.userInstaName + '/';
          console.log("this.$store.state.userinfo.userInstaName")
          return instaURL;
        }else{
          return;
        }
      }
    },

    twitterURL: function(){
      if(this.isCatchData){
        if(this.userOpenData.userTwitterName){
          let twitterURL = 'https://twitter.com/' + this.userOpenData.userTwitterName;
          console.log("this.$store.state.userinfo.userTwitterName")
          return twitterURL;
        }else{
          return;
        }
      }
    },

    facebookURL: function(){
      if(this.isCatchData){
        if(this.userOpenData.userFacebookName){
          let facebookURL = this.userOpenData.userFacebookName;
          console.log('facebookURL');
          console.log(facebookURL);
          return facebookURL;
        }else{
          return;
        }
      }
    },

    minneURL: function(){
      if(this.isCatchData){
        if(this.userOpenData.userMinneName){
          let minneURL = this.userOpenData.userMinneName;
          return minneURL;
        }else{
          return;
        }
      }
    },

    creemaURL: function(){
      if(this.isCatchData){
        if(this.userOpenData.userCreemaName){
          let creemaURL = this.userOpenData.userCreemaName;
          return creemaURL;
        }else{
          return;
        }
      }
    },

    baseURL: function(){
      if(this.isCatchData){
        if(this.userOpenData.userBaseName){
          let baseURL = this.userOpenData.userBaseName;
          return baseURL;
        }else{
          return;
        }
      }
    },

  },

  mounted: function(){

    this.isLoadingPage = false;
    console.log("isLoadingPage")
    console.log(this.isLoadingPage)

    this.isLoadingEvents = false;

  },

  created: function(){
    //this.userName = this.$route.path.slice(1);
    //console.log(this.userName)
    //const db = firebase.firestore();
  },

  beforeMount: function(){

    this.userId = this.$route.path.slice(1);
    console.log(this.userId)
    const db = firebase.firestore();

    if(this.isLoadingEvents){
      db.collection('users').where("userId", "==", this.userId)
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

           }).catch(

             this.passUserId = true,

             function(error) {

             console.log("Error getting documents: ", error);
           });
    }
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

    loadedPage(){
      this.isLoadingPage = false;
      console.log("isLoadingPage")
      console.log(this.isLoadingPage)
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

.no-user-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
  font-size: 0.8rem;
  p{
    margin-bottom: 0;
  }
}

.user-icon-name-display-wrapper{
  position: relative;
}

.user-icon-name-wrapper{
  position: absolute;
  top: -50px;
  left: 15px;
}

.user-icon-image-wrapper{

  width:100px;
  margin: 0 auto;
  .user-icon-image{
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

.username-display-wrapper{
  width:100px;
  margin: 0 auto;
  .username-wrapper{
    text-align: center;
    h3{
      font-size: 1rem;
      font-weight: bold;
      color: #A7A7A7;
    }
  }
}

.relative-link-list-wrapper{
  height: 70px;
  margin: 4px 0 0 95px;
  padding-left:20px;
}

.relative-link-wrapper{
  display:flex;
  padding: 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #FCFCFC;
  border-radius: 50px 0 0 50px;

  .content-wrapper{
    margin:4px 8px 4px 4px;
    cursor: pointer;
    //background-color: #ccc;
    border-radius: 50%;
    width: 35px;
    height: 35px;

    .content-img{
      background-color: #fff;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      img{
        border-radius: 50%;
        width: 35px;
        height: 35px;
        object-fit: contain;
      }
    }

  }

  .content-wrapper:hover{
    transform: scale(1.04,1.04);
    transition-duration: 0.25s;
  }
}


.store-info-label{
  text-align: center;
  padding: 10px 0 0;
  margin-bottom: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #565656;
}
.event-info-wrapper{
  padding: 0 12px 12px 12px;
  //min-height: 100vw;
  .event-tab-wrapper{
    margin-bottom: 10px;
  }
}
.event-tab-container{
  margin-bottom: 78px;
}




@media screen and (max-width: 780px) {

}

@media screen and (max-width: 480px) {


}



</style>
