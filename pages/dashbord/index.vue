<template lang="pug">
  section.event-container

    section
      .your-url-wrapper(v-if="!isSetuserData")
        loading-image
      .your-url-wrapper(v-show="isSetuserData")
        .your-url あなたのURL
        .your-url {{ myUrl }}
        .confirm-wrapper(v-show="isSetuserData")
          //.confirm-your-url(v-if="username")
            a.underline-link(:href="'https://intro-me.net/'+ this.$store.state.user.uid.slice(24) + '--user@' + username" target="_blank") 自分のページを確認する
          //.confirm-your-url(v-else-if="isSetuserData && $store.state.userinfo.userName")
            a.underline-link(:href="'https://intro-me.net/'+ this.$store.state.user.uid.slice(24) + '--user@' + $store.state.userinfo.userName" target="_blank") 自分のページを確認する
          .confirm-your-url(v-if="isSetuserData")
            a.underline-link(:href="'https://intro-me.net/'+ $store.state.userinfo.userId" target="_blank") 自分のページを確認する
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
            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper
                .user-input-edit
                  .input-label ユーザーID（変更不可）
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.userinfo.userId") {{ $store.state.userinfo.userId }}

            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper
                .user-input-edit
                  .input-label ログインGoogleアカウント
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.user.email") {{ $store.state.user.email }}

            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper(v-if="isEditName")
                .user-input-edit
                  .input-label ユーザー名
                  .change-button-wrapper
                    .cancel-button.underline-link(@click="isEditName = false") キャンセル
                    .name-change-button.change-button.underline-link(@click="usernameCheck") 変更する
                input(v-model="username" type="text" name="username" placeholder="" autocomplete="off").input-area
              .user-input-wrapper.account-item-wrapper(v-else-if="username")
                .user-input-edit
                  .input-label ユーザー名
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditName = true") 編集する
                p(v-if="username") {{ username }}
              .user-input-wrapper.account-item-wrapper(v-else)
                .user-input-edit
                  .input-label ユーザー名
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


            //-Instagram
            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper(v-if="isEditInstaName")
                .user-input-edit
                  .input-label Instagramユーザー名
                  .change-button-wrapper
                    .cancel-button.underline-link(@click="isEditInstaName = false") キャンセル
                    .name-change-button.change-button.underline-link(@click="userInstaNameChange") 変更する
                input(v-if="userInstaName" v-model="userInstaName" type="text" name="userInstaName" :placeholder="userInstaName" autocomplete="off").input-area
                input(v-else-if="$store.state.userinfo.userInstaName" v-model="userInstaName" type="text" name="userInstaName" :placeholder="$store.state.userinfo.userInstaName" autocomplete="off").input-area
                input(v-else v-model="userInstaName" type="text" name="userInstaName" placeholder="event_share" autocomplete="off").input-area
              .user-input-wrapper.account-item-wrapper(v-else-if="userInstaName")
                .user-input-edit
                  .input-label Instagramユーザー名
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditInstaName = true") 編集する
                p(v-if="userInstaName") {{ userInstaName }}
                p(v-else) 未設定
              .user-input-wrapper.account-item-wrapper(v-else)
                .user-input-edit
                  .input-label Instagramユーザー名
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditInstaName = true") 編集する
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.userinfo.userInstaName") {{ $store.state.userinfo.userInstaName }}
                  p(v-else) 未設定

            //-Twitter
            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper(v-if="isEditTwitterName")
                .user-input-edit
                  .input-label Twitterユーザー名
                  .change-button-wrapper
                    .cancel-button.underline-link(@click="isEditTwitterName = false") キャンセル
                    .name-change-button.change-button.underline-link(@click="userTwitterNameChange") 変更する
                input(v-if="userTwitterName" v-model="userTwitterName" type="text" name="userTwitterName" :placeholder="userTwitterName" autocomplete="off").input-area
                input(v-else-if="$store.state.userinfo.userTwitterName" v-model="userTwitterName" type="text" name="userTwitterName" :placeholder="$store.state.userinfo.userTwitterName" autocomplete="off").input-area
                input(v-else v-model="userTwitterName" type="text" name="userTwitterName" placeholder="event_share" autocomplete="off").input-area
              .user-input-wrapper.account-item-wrapper(v-else-if="userTwitterName")
                .user-input-edit
                  .input-label Twitterユーザー名
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditTwitterName = true") 編集する
                p(v-if="userTwitterName") {{ userTwitterName }}
                p(v-else) 未設定
              .user-input-wrapper.account-item-wrapper(v-else)
                .user-input-edit
                  .input-label Twitterユーザー名
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditTwitterName = true") 編集する
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.userinfo.userTwitterName") {{ $store.state.userinfo.userTwitterName }}
                  p(v-else) 未設定

            //-Facebook
            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper(v-if="isEditFacebookName")
                .user-input-edit
                  .input-label facebook 公開ページURL
                  .change-button-wrapper
                    .cancel-button.underline-link(@click="isEditFacebookName = false") キャンセル
                    .name-change-button.change-button.underline-link(@click="userFacebookNameChange") 変更する
                input(v-if="userFacebookName" v-model="userFacebookName" type="text" name="userFacebookName" :placeholder="userFacebookName" autocomplete="off").input-area
                input(v-else-if="$store.state.userinfo.userFacebookName" v-model="userTwitterName" type="text" name="userFacebookName" :placeholder="$store.state.userinfo.userFacebookName" autocomplete="off").input-area
                input(v-else v-model="userFacebookName" type="text" name="userFacebookName" placeholder="https://www.facebook.com/event_share/" autocomplete="off").input-area
              .user-input-wrapper.account-item-wrapper(v-else-if="userFacebookName")
                .user-input-edit
                  .input-label facebook 公開ページURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditFacebookName = true") 編集する
                p(v-if="userFacebookName") {{ userFacebookName }}
                p(v-else) 未設定
              .user-input-wrapper.account-item-wrapper(v-else)
                .user-input-edit
                  .input-label facebook 公開ページURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditFacebookName = true") 編集する
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.userinfo.userFacebookName") {{ $store.state.userinfo.userFacebookName }}
                  p(v-else) 未設定

            //-minne
            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper(v-if="isEditMinneName")
                .user-input-edit
                  .input-label minneのショップURL
                  .change-button-wrapper
                    .cancel-button.underline-link(@click="isEditMinneName = false") キャンセル
                    .name-change-button.change-button.underline-link(@click="userMinneNameChange") 変更する
                input(v-if="userMinneName" v-model="userMinneName" type="text" name="userMinneName" :placeholder="userMinneName" autocomplete="off").input-area
                input(v-else-if="$store.state.userinfo.userMinneName" v-model="userMinneName" type="text" name="userMinneName" :placeholder="$store.state.userinfo.userMinneName" autocomplete="off").input-area
                input(v-else v-model="userMinneName" type="text" name="userMinneName" placeholder="https://minne.com/event_share" autocomplete="off").input-area
              .user-input-wrapper.account-item-wrapper(v-else-if="userMinneName")
                .user-input-edit
                  .input-label minneのショップURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditMinneName = true") 編集する
                p(v-if="userMinneName") {{ userMinneName }}
                p(v-else) 未設定
              .user-input-wrapper.account-item-wrapper(v-else)
                .user-input-edit
                  .input-label minneのショップURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditMinneName = true") 編集する
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.userinfo.userMinneName") {{ $store.state.userinfo.userMinneName }}
                  p(v-else) 未設定


            //-creema
            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper(v-if="isEditCreemaName")
                .user-input-edit
                  .input-label CreemaのショップURL
                  .change-button-wrapper
                    .cancel-button.underline-link(@click="isEditCreemaName = false") キャンセル
                    .name-change-button.change-button.underline-link(@click="userCreemaNameChange") 変更する
                input(v-if="userCreemaName" v-model="userCreemaName" type="text" name="userCreemaName" :placeholder="userCreemaName" autocomplete="off").input-area
                input(v-else-if="$store.state.userinfo.userCreemaName" v-model="userCreemaName" type="text" name="userCreemaName" :placeholder="$store.state.userinfo.userCreemaName" autocomplete="off").input-area
                input(v-else v-model="userCreemaName" type="text" name="userCreemaName" placeholder="https://www.creema.jp/creator/000000" autocomplete="off").input-area
              .user-input-wrapper.account-item-wrapper(v-else-if="userCreemaName")
                .user-input-edit
                  .input-label CreemaのショップURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditCreemaName = true") 編集する
                p(v-if="userCreemaName") {{ userCreemaName }}
                p(v-else) 未設定
              .user-input-wrapper.account-item-wrapper(v-else)
                .user-input-edit
                  .input-label CreemaのショップURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditCreemaName = true") 編集する
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.userinfo.userCreemaName") {{ $store.state.userinfo.userCreemaName }}
                  p(v-else) 未設定

            //-BASE
            .user-input-item-wrapper
              .user-input-wrapper.account-item-wrapper(v-if="isEditBaseName")
                .user-input-edit
                  .input-label BASEのショップURL
                  .change-button-wrapper
                    .cancel-button.underline-link(@click="isEditBaseName = false") キャンセル
                    .name-change-button.change-button.underline-link(@click="userBaseNameChange") 変更する
                input(v-if="userBaseName" v-model="userBaseName" type="text" name="userBaseName" :placeholder="userBaseName" autocomplete="off").input-area
                input(v-else-if="$store.state.userinfo.userBaseName" v-model="userBaseName" type="text" name="userBaseName" :placeholder="$store.state.userinfo.userBaseName" autocomplete="off").input-area
                input(v-else v-model="userBaseName" type="text" name="userBaseName" placeholder="https://event-share.thebase.in/" autocomplete="off").input-area
              .user-input-wrapper.account-item-wrapper(v-else-if="userBaseName")
                .user-input-edit
                  .input-label BASEのショップURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditBaseName = true") 編集する
                p(v-if="userBaseName") {{ userBaseName }}
                p(v-else) 未設定
              .user-input-wrapper.account-item-wrapper(v-else)
                .user-input-edit
                  .input-label BASEのショップURL
                  .change-button-wrapper
                    .change-button.underline-link(@click="isEditBaseName = true") 編集する
                .username-display(v-if="isSetuserData")
                  p(v-if="$store.state.userinfo.userBaseName") {{ $store.state.userinfo.userBaseName }}
                  p(v-else) 未設定





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
      username: '',
      isEditInstaName: false,
      userInstaName: '',
      isEditTwitterName: false,
      userTwitterName: '',
      isEditFacebookName: false,
      userFacebookName: '',
      isEditMinneName: false,
      userMinneName: '',
      isEditCreemaName: false,
      userCreemaName: '',
      isEditBaseName: false,
      userBaseName: '',
      uuid: '',
      invalid: false,
      iconImage: '',
      coverImage: '',
      iconPreviewImage: false,
      coverPreviewImage: false,
      isChangeUserData: false,
      isSetuserData: false,
      isDashbord: true,
      isAddEvent: false,
      events: [],
      isLoadingCover: true,
      isLoadingIcon: true,
      pastDelete: false,
      deletedPastEvents: false,
      event: '',
      isExistUserName: false,
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
      //if(this.isSetuserData){
        //if(this.$store.state.userinfo.userName){
        //  let myUrl = 'https://intro-me.net/' + this.$store.state.user.uid.slice(24) + '--user@' + this.$store.state.userinfo.userName;
        //  console.log("this.$store.state.userinfo.userName")
        //  return myUrl;
        //}else if(this.username){
        //  let myUrl = 'https://intro-me.net/' + this.$store.state.user.uid.slice(24) + '--user@' + this.username;
        //  console.log("this.username")
        //  return myUrl;
        //}else{
        //  let myUrl = 'https://intro-me.net/' + this.$store.state.user.uid;
        //  console.log("this.$store.state.user.uid")
        //  return myUrl;
        //}
      //}
      if(this.isSetuserData){
        let myUrl = 'https://intro-me.net/' + this.$store.state.user.uid;
        console.log("this.$store.state.user.uid")
        return myUrl;
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
      }else{
          this.$router.push('/')
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
      //let myEventUrl = this.username ? 'https://intro-me.net/'+ this.username : 'https://intro-me.net/'+ this.$store.state.userinfo.userName;
      let myEventUrl = 'https://intro-me.net/'+ this.$store.state.userinfo.userId;
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

    usernameCheck(){

      const db = firebase.firestore();
      let userName = this.username;
      console.log(userName);
      console.log('ユーザーネームチェック！');

      db.collection('users').where("userName", "==", this.userName)
         .get().then( (querySnapshot) => {

             if(querySnapshot.length){
               querySnapshot.forEach( (doc) =>
                  {

                    //this.isExistUserName = true,
                    //console.log(this.isExistUserName),
                    //resolve('deplicated!')
                    console.log('↑ダブりネームキャッチしたよ！')
                  }
               );
             }else{
               //reject('unique!')
               console.log('ダブりなし')
             }

           }).catch(
              this.usernameChange(),
              console.log("usernameChangeなう"),
           ).finally(()=>{

             });
    },

    usernameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);

      let userName = this.username;
      console.log(userName);


      if(userName != null && !this.isExistUserName){
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

    userInstaNameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userInstaName = this.userInstaName;
      console.log(userInstaName);

      if(userInstaName != null){
        this.$store.state.userinfo.userInstaName = userInstaName;
        db.collection("users").doc(userId).set({
          userId: userId,
          userInstaName: userInstaName,
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
      this.isEditInstaName = false;
    },

    userTwitterNameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userTwitterName = this.userTwitterName;
      console.log(userTwitterName);

      if(userTwitterName != null){
        this.$store.state.userinfo.userTwitterName = userTwitterName;
        db.collection("users").doc(userId).set({
          userId: userId,
          userTwitterName: userTwitterName,
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
      this.isEditTwitterName = false;
    },

    userFacebookNameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userFacebookName = this.userFacebookName;
      console.log(userFacebookName);

      if(userFacebookName != null){
        this.$store.state.userinfo.userFacebookName = userFacebookName;
        db.collection("users").doc(userId).set({
          userId: userId,
          userFacebookName: userFacebookName,
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
      this.isEditFacebookName = false;
    },

    userMinneNameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userMinneName = this.userMinneName;
      console.log(userMinneName);

      if(userMinneName != null){
        this.$store.state.userinfo.userMinneName = userMinneName;
        db.collection("users").doc(userId).set({
          userId: userId,
          userMinneName: userMinneName,
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
      this.isEditMinneName = false;
    },

    userCreemaNameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userCreemaName = this.userCreemaName;
      console.log(userCreemaName);

      if(userCreemaName != null){
        this.$store.state.userinfo.userCreemaName = userCreemaName;
        db.collection("users").doc(userId).set({
          userId: userId,
          userCreemaName: userCreemaName,
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
      this.isEditCreemaName = false;
    },

    userBaseNameChange(){
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userBaseName = this.userBaseName;
      console.log(userBaseName);

      if(userBaseName != null){
        this.$store.state.userinfo.userBaseName = userBaseName;
        db.collection("users").doc(userId).set({
          userId: userId,
          userBaseName: userBaseName,
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
      this.isEditBaseName = false;
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
      this.isSetuserData =  false;
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

.v-window.event-tab-container.v-item-group.theme--light.v-tabs-items{
  border: none;
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

    .cover-wrapper.account-item-wrapper,
    .icon-wrapper.account-item-wrapper,
    .user-input-item-wrapper{
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    .user-input-item-wrapper{

      .user-input-wrapper{
        min-height: 65px;

          .user-input-edit{
            display: flex;
            justify-content: space-between;
          }

          p{
            padding-left: 10px;
            font-size: 0.8rem;
            margin: 4px 0 0 0.5px;
          }
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

    .account-tab-wrapper{

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

      .cover-change-wrapper{
        height: 50vw;
      }

    }

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

}



</style>
