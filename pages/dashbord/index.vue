<template lang="pug">
  section.event-container

    section.your-url-wrapper
      .your-url あなたのURL：https://event-share.net/{{ userFormData.username }}
      .confirm-wrapper
        .confirm-your-url
          a.underline-link(:href="'https://event-share.net/'+ userFormData.username") 自分のページを確認する
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
            .user-name-wrapper.account-item-wrapper
              .user-name.input-label ユーザー名
              input(v-model="userFormData.username" type="text" name="username" placeholder="_o_s_a_o_" required="required" autocomplete="off").input-area

            .icon-wrapper.account-item-wrapper
              .icon.input-label アイコン設定

              .icon-change-wrapper(v-if="iconImage")
                user-icon(:iconImage="iconImage" v-on:iconChange="iconChange")
                .change-button-wrapper
                  .change-button.underline-link(v-if="iconPreviewImage" @click="fileUpload") 変更する
              .icon-unsetting-wrapper(v-else)
                .icon-upload-wrapper.upload-wrapper
                  i.material-icons.upload-icon photo_camera
                  input.input-file(@change="iconChange($event)" type="file")


            .cover-image-wrapper.account-item-wrapper
              .cover-image.input-label カバー画像設定
              .cover-upload-wrapper.upload-wrapper
                i.material-icons.upload-icon photo_camera
                input.input-file(type="file")
              user-cover

            .save-button-wrapper
              .common-button.disabled-button(v-if="invalid") ユーザー情報を更新
              .common-button.save-button(v-else) ユーザー情報を更新

            .test
              v-btn(@click="userSetting") テストDB追加
            .test
              v-btn(@click="fileUpload") テストDBicon追加

        v-tab-item.event-container
          .myevent-tab-wrapper
            .myevent-add-wrapper.event-share-button(@click="openModal()") イベントの予定を追加する
            .myevent-divider
            .myevent-wrapper
              .myevent-all-delete-wrapper.underline-link 過去のイベントを全て削除する
              .myevent-list-wrapper
                .myevent-content-wrapper
                  p.division 神奈川県
                  p.date 2020.4.20 (火)
                  h3.event-title 横浜ハンドメイドマルシェ2020春
                  p.position A-8
                  p.booth-name osao handmade
                  p.oficial-link.underline-link 公式HPでみる
                  .edit-wrapper
                    .delete.underline-link 削除
                    .edit.underline-link 編集
                .no-event-wrapper
                  p.no-ivent まだイベントが登録されていません。

        v-tab-item.event-container
          .logout
            v-btn.simple-button(@click="logOut" color="#fff") ログアウト
          .unsubscribe.underline-link 退会する

    section.test
      nuxt-link(to="/") トップへ
      p(v-if="$store.state.user") email： {{$store.state.user.email}}

    section
      artwork-modal(:val="postItem" v-if="showModal")

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
      tab: null,
      showModal: false,
      postItem: '',
      uuid: '',
      invalid: false,
      iconImage: '',
      iconPreviewImage: false,
      userFormData: {
        username: '',
        coverImage: '',
      },
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

    myUrl: function () {
        return 'https://event-share.net/' + this.username
    }

  },

  mounted: function(){
  },

  components: {
    ArtworkModal,
    UserIcon,
    UserCover,
  },

  methods: {

    ...mapActions(['setUser']),

    openModal(artwork) {
      this.showModal = true;
    },

    copyMyUrl() {
      const myEventUrl = 'https://event-share.net/'+ this.userFormData.username

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

    iconChange(e){
      // アップロード対象は1件のみとする
      console.log('iconChange発火なう')
      const image = (e.target.files || e.dataTransfer.files)[0]
      console.log(image);
      this.iconPreview(image);
      this.iconPreviewImage = true;
      this.getBase64(image)
        .then(
          image => this.iconImage = image,
          )
        .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
    },

    iconPreview(file){
      const reader = new FileReader();
      reader.onload = e => {
        this.iconImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    fileUpload() {

      const iconImage = this.iconImage;
      const userId = this.$store.state.user.uid;
      console.log(iconImage);

      if (iconImage != null) {
        const fileName = uuid()
        console.log('ファイルネームは？')
        console.log(fileName)
        const uploadImage = this.$store.dispatch('persona/uploadImage', {
          iconName: fileName,
          file: iconImage,
          userId: userId,
        })
      }
      this.iconPreviewImage = false;
    },

    userSetting(){
      const db = firebase.firestore();
      const settings = { timestampsInSnapshots: true }
      db.settings(settings)
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const userName = this.userFormData.username;
      console.log(userName);

      if(userName != null){
        db.collection("users").doc(userId).set({
          userId: userId,
          userName: userName,
          iconImage: "icontest",
          coverImage: "covertest"
          })
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

  .your-url{
    font-size: 0.8rem;
  }

  .confirm-wrapper{
    margin-top: 4px;
    display: flex;
    justify-content: center;
    .confirm-your-url{
      line-height: 30px;
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
        .user-name{

        }
    }

    .icon-unsetting-wrapper,
    .icon-change-wrapper{
      height: 100px;
    }

    .change-button-wrapper{
      text-align: center;
    }


    .icon-wrapper{
      .icon{

      }
    }

    .cover-image-wrapper{
      .cover-image{

      }
    }

  }

  .myevent-tab-wrapper{

    .myevent-add-wrapper{


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

            .division{
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

.upload-wrapper{
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

.upload-icon{
  position: absolute;
  top: 16px;
  left: 16px;
  width: 60px;
  height: 60px;
  color: #F0858C;
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
            .division{

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
