<template lang="pug">
  section.event-container

    section.your-url-wrapper
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
            .myevent-add-wrapper(@click="openModal()") イベントの予定を追加する
            .myevent-wrapper
              .myevent-all-delete-wrapper 過去のイベントを全て削除する
              .myevent-list-wrapper
                .myevent-wrapper
                  .division
                  .myevent-content-wrapper
                    .date 2020.4.20 (火)
                    .event-title 横浜ハンドメイドマルシェ2020春
                    .position A-8
                    .booth-name osao handmade
                    .oficial-link 公式HPでみる
                  .edit-wrapper
                    .delete 削除
                    .edit 編集

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
    font-size: 0.8rem;
    text-decoration: underline;
  }
  .confirm-your-url:hover{
    cursor: pointer;
    opacity: 0.7;
  }
}

.event-tab-container{
  min-height: 50vh;
  overflow: scroll;
}

@media screen and (max-width: 780px) {

}

@media screen and (max-width: 480px) {

}



</style>
