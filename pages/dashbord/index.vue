<template lang="pug">
  section.event-container

    section.your-url-wrapper.underline-link
      .your-url
        p あなたのURL：eventlinks.net/_o_s_a_o_
      .confirm-your-url
        p 自分のページを確認する

    section.setting-wrapper
      v-tabs(v-model="tab" background-color="transparent" color="#F0858C" grow)
        v-tab マイページ
        v-tab イベント
        v-tab その他

      v-tabs-items.event-tab-container(v-model="tab")

        v-tab-item.event-container
          .event-tab-wrapper
            .user-name-wrapper
              .user-name ユーザー名
            .icon-wrapper
              .icon アイコン設定
            .cover-image-wrapper
              .cover-image カバー画像設定

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

        v-tab-item.event-container
          .logout
            v-btn.simple-button(@click="logOut" color="#fff") ログアウト
          .unsubscribe 退会する

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
      formData: {
        name: '',
        email: '',
        content: '',
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

  },

  mounted: function(){

  },

  components: {
    ArtworkModal,
  },

  methods: {

    ...mapActions(['setUser']),

    openModal(artwork) {
      this.showModal = true;
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
  padding: 20px 0 12px;
  border-radius: 10px;
  margin-bottom: 10px;

  .confirm-your-url{
  }
  .confirm-your-url:hover{
  }
}

.event-tab-container{
  min-height: 50vh;
  overflow: scroll;
}

.event-container{

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


      }
    }

  }

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
