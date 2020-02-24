<template lang="pug">
  section.event-container

    section
      .your-url-wrapper(v-if="!isSetuserData")
        loading-image
      .your-url-wrapper(v-show="isSetuserData")
        .your-url あなたのURL
        .your-url {{ myUrl }}
        .confirm-wrapper(v-show="isSetuserData")
          .confirm-your-url(v-if="username")
            a.underline-link(:href="'https://event-share.net/'+ username" target="_blank") 自分のページを確認する
          .confirm-your-url(v-else-if="isSetuserData")
            a.underline-link(:href="'https://event-share.net/'+ $store.state.userinfo.userId" target="_blank") 自分のページを確認する
          .copy-your-url(@click="copyMyUrl")
            v-icon(small) file_copy

    section.setting-wrapper
      v-tabs(v-model="tab" background-color="transparent" color="#F0858C" grow)
        v-tab マイページ
        v-tab イベント
        v-tab その他

      v-tabs-items.event-tab-container(v-model="tab")

        v-tab-item.event-container
          .account-tab-wrapper
            .user-name-wrapper.account-item-wrapper(v-if="isEditName")
              .user-name-edit
                .user-name.input-label ユーザー名
                .change-button-wrapper
                  .cancel-button.underline-link(@click="isEditName = false") キャンセル
                  .name-change-button.change-button.underline-link(@click="usernameChange") 変更する
              input(v-model="username" type="text" name="username" placeholder="" autocomplete="off").input-area
            .user-name-wrapper.account-item-wrapper(v-else-if="username")
              .user-name-edit
                .user-name.input-label ユーザー名
                .change-button-wrapper
                  .change-button.underline-link(@click="isEditName = true") 編集する
              p(v-if="username") {{ username }}
            .user-name-wrapper.account-item-wrapper(v-else)
              .user-name-edit
                .user-name.input-label ユーザー名
                .change-button-wrapper
                  .change-button.underline-link(@click="isEditName = true") 編集する
              .username-display(v-if="isSetuserData")
                p(v-if="$store.state.userinfo.userName") {{ $store.state.userinfo.userName }}
                p(v-else-if="$store.state.userinfo.userId") {{ $store.state.userinfo.userId }}


            .icon-wrapper.account-item-wrapper
              .icon.input-label アイコン設定

              .icon-unsetting-wrapper(v-if="isLoadingIcon")
                .icon-upload-wrapper.upload-wrapper.icon-loading-wrapper
                  .icon-loading-display-wrapper
                    content-loader(:width="100" :height="100")
                      circle(cx="50" cy="50" r="50")

              .icon-change-wrapper(v-show="iconImage")
                user-icon(:iconImage="iconImage" :isDashbord="isDashbord" v-on:iconChange="imageChange" @loadedIcon="loadedIcon")
                .change-button-wrapper
                  .change-button.underline-link(v-if="iconPreviewImage" @click="fileUpload('icon')") 変更する

              .icon-unsetting-wrapper(v-if="!iconImage && !isLoadingIcon")
                .icon-upload-wrapper.upload-wrapper
                  .icon-upload-icon-wrapper
                    i.material-icons.icon-upload-icon photo_camera
                  input.input-file(@change="imageChange($event,'icon')" type="file")


            .cover-wrapper.account-item-wrapper
              .cover-image.input-label カバー画像設定

              .cover-loading-wrapper.cover-unsetting-wrapper(v-if="isLoadingCover")
                content-loader(:width="100" :height="52.5")
                  rect(width="100%" height="100%")

              .cover-change-wrapper(v-show="coverImage")
                user-cover(:coverImage="coverImage" :isDashbord="isDashbord" v-on:coverChange="imageChange" @loadedCover="loadedCover")
                .change-button-wrapper
                  .change-button.underline-link(v-if="coverPreviewImage" @click="fileUpload('cover')") 変更する

              .cover-unsetting-wrapper.upload-wrapper(v-if="!coverImage && !isLoadingCover")
                .cover-upload-icon-wrapper
                  i.material-icons.cover-upload-icon photo_camera
                input.input-file(@change="imageChange($event,'cover')" type="file")

        v-tab-item.event-container
          .myevent-tab-wrapper
            .myevent-add-wrapper.common-button(@click="openModal()") イベントの予定を追加する
            .myevent-divider
            .myevent-wrapper
              .myevent-all-delete-wrapper.underline-link(@click="openPastDeleteModal") 過去のイベントを全て削除する
              event-list(
                :prefectures="prefectures"
                :events="events"
                :isDashbord="isDashbord"
                @openingEventEditModal="openingEventEditModal"
                @openingEventDeleteModal="openingEventDeleteModal"
                )

        v-tab-item.event-container
          .logout
            v-btn.simple-button(@click="logOut" color="#fff") ログアウト
          .unsubscribe.underline-link 退会する

    section.test
      nuxt-link(to="/") トップへ
      p(v-if="$store.state.user") email： {{$store.state.user.email}}
      .test(v-if="isSetuserData")
        p(v-if="$store.state.userinfo.userId") {{ $store.state.userinfo.userId }}
      .test(v-if="prefectures")
        p {{prefectures[0].name}}

    section
      artwork-modal(:prefectures="prefectures" v-if="showModal")

    section
      event-edit-modal(:editableEvent="event" :prefectures="prefectures" v-if="showEventEditModal")

    section
      event-delete-modal(
        v-if="showEventDeleteModal"
        :pastDelete="pastDelete"
        :deleteEvent="event"
        :deletedPastEvents="deletedPastEvents"
        @deletePastEvents="deletePastEvents"
        @reloadEvents="reloadEvents")

</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import ArtworkModal from '~/components/ArtworkModal.vue'
import EventEditModal from '~/components/EventEditModal.vue'
import EventDeleteModal from '~/components/EventDeleteModal.vue'
import UserIcon from '~/components/UserIcon.vue'
import UserCover from '~/components/UserCover.vue'
import EventList from '~/components/EventList.vue'
import LoadingImage from '~/components/LoadingImage.vue'
import prefectures from '~/static/prefectures.json'
import uuid from 'uuid'

export default {
  //layout: 'home',

  head () {
    return {
      bodyAttrs: {
        class: this.showModal ? 'modal-body' : '',
        class: this.showEventEditModal ? 'modal-body' : '',
        class: this.showEventDeleteModal ? 'modal-body' : '',
      }
    }
  },

  data(){
    return{
      tab: null,
      showModal: false,
      showEventEditModal: false,
      showEventDeleteModal: false,
      postItem: '',
      isEditName: false,
      uuid: '',
      invalid: false,
      iconImage: '',
      coverImage: '',
      iconPreviewImage: false,
      coverPreviewImage: false,
      isChangeUserData: false,
      username: '',
      isSetuserData: false,
      isDashbord: true,
      isAddEvent: false,
      events: [],
      isLoadingCover: true,
      isLoadingIcon: true,
      pastDelete: false,
      deletedPastEvents: false,
      event: '',
    };
  },

  asyncData ({ params }) {
    return {
      fvWidth: "",
      fvHeight: "",
      flash_message: "",
      prefectures,
      //flash: context.query['flash'],
    };
  },

  computed:{
    //...mapState(['fashions']),
    ...mapState(['user']),
    ...mapState(['userinfo']),
    ...mapGetters(['isAuthenticated']),

    myUrl: function () {
      if(this.isSetuserData){
        if(this.$store.state.userinfo.userName){
          let myUrl = 'https://event-share.net/' + this.$store.state.userinfo.userName;
          console.log("this.$store.state.userinfo.userName")
          return myUrl;
        }else if(this.username){
          let myUrl = 'https://event-share.net/' + this.username;
          console.log("this.username")
          return myUrl;
        }else{
          let myUrl = 'https://event-share.net/' + this.$store.state.user.uid;
          console.log("this.$store.state.user.uid")
          return myUrl;
        }
      }
    },
  },

  watch: {
    // この関数は isChangeUserData が変わるごとに実行されます。
    isChangeUserData: function () {
      if(this.isChangeUserData){
        console.log('チェンジを検知！')
        //本当はよくない処理
        setTimeout(this.getUserInfo,1000);
        this.isChangeUserData  = false;
      }
    }
  },

  created: function(){

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setUser(user)
        this.$router.push("/dashbord")

        const db = firebase.firestore();

        db.collection('users').doc(this.user.uid).get().then((doc) =>{
            console.log('読み取りなう');
            console.log(doc.data());
            this.setUserInfo(doc.data());
            this.userName = doc.data().userName;
            this.isSetuserData = true;
            this.iconImage = doc.data().iconUrl;
            if(!doc.data().iconUrl){
              this.isLoadingIcon = false;
            }
            console.log(this.iconImage)
            this.coverImage = doc.data().coverUrl;
            if(!doc.data().coverUrl){
              this.isLoadingCover = false;
            }
            console.log(this.coverImage)
          }
        )

        db.collection('users').doc(this.user.uid).collection('events').orderBy("eventEndDate", "desc")
           .get().then((querySnapshot) => {
             console.log(querySnapshot)
             console.log(querySnapshot.docs)
             this.events = [];
             querySnapshot.forEach((doc) => {
                 console.log('ページ読み込み時のリスト読み取りなう');
                 console.log(doc.data());
                 this.events.push(doc.data())
               }
             );

             })
             .catch(function(error) {
               console.log("Error getting documents: ", error);
             });
      }
    })

  },

  mounted: function(){
  },

  components: {
    ArtworkModal,
    EventEditModal,
    EventDeleteModal,
    UserIcon,
    UserCover,
    EventList,
    ContentLoader,
    LoadingImage,
  },

  methods: {

    ...mapActions(['setUser']),
    ...mapActions(['setUserInfo']),

    openModal(artwork) {
      this.showModal = true;
    },

    copyMyUrl() {
      let myEventUrl = this.username ? 'https://event-share.net/'+ this.username : 'https://event-share.net/'+ this.$store.state.userinfo.userName;
      this.$copyText(myEventUrl)
      console.log(myEventUrl)
      //this.$parent.flash_message = "コピーしました"
      //setTimeout(this.clearMessage,3000)

    },

    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },

    getBase64(file){
      return new Promise((resolve, reject) =>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },

    imageChange( e , type){
      // アップロード対象は1件のみとする
      console.log('iconChange発火なう')
      const image = (e.target.files || e.dataTransfer.files)[0]
      console.log(image);

      switch( type ){

        case 'icon':
          this.preview(image, type);
          this.iconPreviewImage = true;
          this.getBase64(image)
            .then(
              image => this.iconImage = image,
              )
            .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
          break;
        case 'cover':
        this.preview(image, type);
        this.coverPreviewImage = true;
          this.getBase64(image)
            .then(
              image => this.coverImage = image,
              )
            .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
          break;
      }
    },

    preview(file, type){
      const reader = new FileReader();
      switch( type ){

        case 'icon':
          reader.onload = e => {
            this.iconImage = e.target.result;
          };
          reader.readAsDataURL(file);
          break;

        case 'cover':
          reader.onload = e => {
            this.coverImage = e.target.result;
          };
          reader.readAsDataURL(file);
          break;

      }

    },

    fileUpload(type) {

      const userId = this.$store.state.user.uid;

      switch( type ){

        case 'icon':
          const iconImage = this.iconImage;
          if (iconImage != null) {
            const fileName = uuid()
            console.log('ファイルネームは？')
            console.log(fileName)
            const iconUploadImage = this.$store.dispatch('persona/iconUploadImage', {
              iconName: fileName,
              file: iconImage,
              userId: userId,
            })
            this.isChangeUserData = true;
            this.iconPreviewImage = false;
            //this.iconImage = false;
          }

          break;

        case 'cover':
          const coverImage = this.coverImage;
          if (coverImage != null) {
            const fileName = uuid()
            console.log('ファイルネームは？')
            console.log(fileName)
            const coverUploadImage = this.$store.dispatch('persona/coverUploadImage', {
              coverName: fileName,
              file: coverImage,
              userId: userId,
            })
            this.isChangeUserData = true;
            this.coverPreviewImage = false;
          //this.coverImage = false;
          }

          break;
      }

    },

    usernameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userName = this.username;
      console.log(userName);

      if(userName != null){
        this.$store.state.userinfo.userName = userName;
        db.collection("users").doc(userId).set({
          userId: userId,
          userName: userName,
          }, { merge: true })
          .then(
            function() {
              console.log("変更成功");
            }
          ).catch(
            function(error) {
              console.error("Error adding document: ", error);
            }
          );
      }
      this.isEditName = false;
    },

    userSetting(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userName = this.username;
      console.log(userName);

      if(userName != null){
        db.collection("users").doc(userId).set({
          userId: userId,
          userName: userName,
          }, { merge: true })
          .then(
            function() {
              console.log("変更成功");
            }
          ).catch(
            function(error) {
              console.error("Error adding document: ", error);
            }
          );
      }

    },

    getUserInfo(){
      const db = firebase.firestore();

      db.collection('users').doc(this.user.uid).get().then((doc) =>{
          console.log('読み取りなう');
          console.log(doc.data());
          this.setUserInfo(doc.data());
        }
      )
    },

    //ログアウト
    logOut(){
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
        //this.$router.push('/?flash=logout')
        this.$router.push('/')
      }).catch((error) => {
        alert(error)
      })
    },

    getEvents(){
      console.log("getEvents")
        const db = firebase.firestore();

        db.collection('users').doc(this.$store.state.user.uid).collection('events').orderBy("eventEndDate", "desc")
           .get().then((querySnapshot) => {
             console.log(querySnapshot)
             console.log(querySnapshot.docs)
             this.events = [];
             querySnapshot.forEach((doc) => {
                 console.log('追加時のリスト読み取りなう');
                 console.log(doc.data());
                 this.events.push(doc.data())
               }
             );

             })
             .catch(function(error) {
               console.log("Error getting documents: ", error);
             });
    },

    openingEventEditModal(event){
      console.log("エディット開きたい！")
      console.log(event)
      this.event = event;
      this.showEventEditModal = true;
    },

    openingEventDeleteModal(event){
      console.log("デリート確認開きたい！")
      console.log(event)
      this.event = event;
      this.showEventDeleteModal = true;
    },

    loadedCover(){
      console.log(this.isLoadingCover)
      this.isLoadingCover = false;
    },

    loadedIcon(){
      console.log(this.isLoadingIcon)
      this.isLoadingIcon = false;
    },

    openPastDeleteModal(){
      this.pastDelete = true;
      this.showEventDeleteModal = true;
    },

    deletePastEvents(){
      console.log('deleteEventなう');

      //firestoreに登録
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);

      let now = new Date();

      if( userId != null){
        let query = db.collection("users").doc(userId).collection("events").where('eventEndDate', '<', now)
        console.log(query)
        query.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc)
            doc.ref.delete();
            this.deletedPastEvents = true;
          });
        }).catch(
          function(error) {
            console.error("Error adding document: ", error);
          }
        );
      }

    },

    reloadEvents(){
      this.getEvents();
    }

  }

}


</script>

<style lang="scss">

.modal-body {
  overflow-y: hidden;
}

.your-url-wrapper{
  text-align: center;
  background-color: #fff;
  padding: 12px 0;
  border-radius: 10px;
  margin-bottom: 10px;
  height: 91px;

  .your-url{
    font-size: 0.6rem;
    min-height: 16px;
  }

  .confirm-wrapper{
    margin-top: 4px;
    display: flex;
    justify-content: center;
    .confirm-your-url{
      line-height: 30px;
      a.underline-link{
        color: #565656;
      }
    }
    .confirm-your-url:hover{
    }
    .copy-your-url{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left:10px;
      background-color: #f5f5f5;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .copy-your-url:hover{
      opacity: 0.7;
      cursor: pointer;
    }

  }
}

.event-tab-container{
  min-height: 50vh;
  overflow: scroll;
}

.event-container{

  .account-tab-wrapper{

    text-align: left;

    .account-item-wrapper{
      margin-bottom: 10px;
    }

    .user-name-wrapper{
      min-height: 55px;
        .user-name{

        }

        .user-name-edit{
          display: flex;
          justify-content: space-between;
        }

        p{
          padding-left: 10px;
          font-size: 0.8rem;
          margin: 4px 0 0 0.5px;
        }
    }

    .icon-unsetting-wrapper,
    .icon-change-wrapper{
      height: 100px;
    }

    .change-button-wrapper{
      display: flex;
      justify-content: flex-end;
      .name-change-button{
        margin-left: 10px;
      }
    }


    .icon-wrapper{
      .icon{

      }
    }

    .cover-change-wrapper{
      height: 265px;
    }

    .cover-image-wrapper{
      .cover-image{

      }
    }

  }

  .myevent-tab-wrapper{

    .myevent-add-wrapper{


    }

    .myevent-add-wrapper.common-button{
      margin-top: 0;
      margin-bottom: 0;
    }

    .myevent-divider{
      width: 100%;
      border-bottom: solid 2px #E7EBEF;
      margin: 10px 0;
    }

    .myevent-wrapper{
      .myevent-all-delete-wrapper{
        text-align: right;
        padding: 0 0 10px 0;
      }
      .myevent-list-wrapper{
          .myevent-content-wrapper{

            padding: 10px;
            border-radius: 15px;
            border: 3px solid #F9DBDB;
            background: #fff;
            p{
              margin-bottom: 4px;
            }

            .prefecture{
              padding-left: 10px;
              text-align: left;
              font-size: 0.8rem;
            }

            .date{
              font-size: 0.8rem;
            }
            .event-title{
              font-size: 0.95rem;
            }
            .position{
              font-size: 0.8rem;
              margin-bottom: 2px;
              line-height: 0.8rem;
            }
            .booth-name{
              font-size: 0.8rem;
              line-height: 0.8rem;
            }
            .oficial-link{
              font-size: 0.8rem;
            }
            .edit-wrapper{

              display: flex;
              justify-content: space-between;
              padding: 0 10px;

              .delete{

              }
              .edit{

              }
            }
          }

          .no-event-wrapper{
            padding: 16px 0;
            margin: 0 auto;
          }


      }
    }

  }

}

.icon-upload-wrapper{
  position: relative;
  margin: 10px auto;
  border: 2px dotted #F0858C;
  width: 60px;
  height: 60px;
  border-radius: 50%;

  input.input-file{
    opacity: 0;
    width: 60px;
    height: 60px;
  }

}

.icon-upload-icon-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-upload-icon{
  position: absolute;
  top: 16px;
  left: 16px;
  width: 60px;
  height: 60px;
  color: #F0858C;
}

.cover-upload-icon{
  position: absolute;
  top: 100px;
  color: #F0858C;
}

.cover-upload-icon-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}

.cover-unsetting-wrapper{
  position: relative;
  margin: 10px auto;
  border: 2px dotted #F0858C;
  width: 432px;
  height: 226.8px;

  input.input-file{
    opacity: 0;
    width: 432px;
    height: 226.8px;
  }

}

.icon-loading-wrapper.icon-upload-wrapper,
.cover-loading-wrapper.cover-unsetting-wrapper{
  border: none;
}

.icon-loading-wrapper.icon-unsetting-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-loading-display-wrapper{
  border-radius: 50%;
  background-color: transparent;
  width: 60px;
  height: 60px;
  border: 1px solid #fff;
}

.logout{
  margin: 5px 0;
}


@media screen and (max-width: 780px) {

}

@media screen and (max-width: 480px) {
  .event-container{

    .myevent-tab-wrapper{

      .myevent-add-wrapper{

      }

      .myevent-wrapper{
        .myevent-all-delete-wrapper{

        }
        .myevent-list-wrapper{
          .myevent-wrapper{

          }
            .prefecture{

            }
            .myevent-content-wrapper{
              .date{

              }
              .event-title{
              }
              .position{

              }
              .booth-name{

              }
              .oficial-link{

              }
            }
            .edit-wrapper{
              .delete{

              }
              .edit{

              }
            }

        }
      }

    }

  }
  .cover-unsetting-wrapper{
    width: 85vw;
    height: 42vw;

    input.input-file{
      width: 85vw;
      height: 42vw;
    }

  }

  .cover-upload-icon{
    top: 17vw;
  }
}



</style>
