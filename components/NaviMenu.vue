<template lang="pug">
Menu
  main(id="page-wrap")
    .test
      slide(right)
        a(id="about" href="http://osao-handmade.firebaseapp.com/" target="_blank")
          span 運営者HP（外部リンク）
        a(id="about" href="https://docs.google.com/forms/d/e/1FAIpQLSfi7oqBWWag5ACzV-vshvX5WSX6zSFWby6tDXeaDK1zqH0ABw/viewform?usp=pp_url&entry.18453089=saochan.yuto@gmail.com" target="_blank")
          span ご意見・ご感想（外部リンク）
        a(id="about" href="https://osaoyuto.thebase.in/" target="_blank")
          span ハンドメイド作家さま向け<br>お役立ちショップ（外部リンク）

        nuxt-link.common-button.open-mypage(v-if="!isAuthenticated" to="/" target="_blank") じぶんのページをつくる
        .common-button.open-mypage(v-else="isAuthenticated" @click="logOut") ログアウト
</template>

<script>
import { Slide } from 'vue-burger-menu'
import { ScaleDown } from 'vue-burger-menu'
import { ScaleRotate } from 'vue-burger-menu'
import { Reveal } from 'vue-burger-menu'
import { Push } from 'vue-burger-menu'
import { PushRotate } from 'vue-burger-menu'
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  computed:{
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),
  },

  components: {
    Slide,
  },

  methods: {
    ...mapActions(['setUser']),

    //ログアウト
    logOut(){
      //this.isSetuserData =  false;
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
        this.setUserInfo(null)
        //this.$router.push('/?flash=logout')
        this.$router.push('/')
      }).catch((error) => {
        alert(error)
      })
    },
  },

}
</script>

<style lang="scss">
.bm-burger-button {
      position: absolute;
      width: 28px;
      height: 25px;
      right: 14px!important;
      top: 12px;
      cursor: pointer;
    }
    .bm-burger-bars {
      background-color: #F0858C;
    }
    .line-style {
      position: absolute;
      height: 20%;
      left: 0;
      right: 0;
    }
    .cross-style {
      position: absolute;
      top: 18px;
      right: 2px;
      cursor: pointer;
    }
    .bm-cross {
      background: #bdc3c7;
    }
    .bm-cross-button {
      height: 24px;
      width: 24px;
    }
    .bm-menu {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1000; /* Stay on top */
      top: 0;
      left: 0;
      background-color: #FBE9F5;
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 50px; /* Place content 60px from the top */
      transition: 0.3s; /*0.5 second transition effect to slide in the sidenav*/
    }

    .bm-overlay {
      background: rgba(0, 0, 0, 0.3);
    }
    .bm-item-list {
      color: #b8b7ad;
      margin-left: 10%;
      font-size: 0.9rem;
    }
    .bm-item-list > * {
      display: flex;
      text-decoration: none;
      padding: 0.7em;
    }
    .bm-item-list > * > span {
      margin-left: 10px;
      font-weight: bold;
      color: #bdc3c7;
    }

    .bm-item-list{
      .common-button.open-mypage{
        display: block;
        text-align: center;
        margin: 20px 40px 20px 0;
        color: #fff;
      }
    }

</style>
