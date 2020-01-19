<template lang="pug">
  section.section
    .test ここはユーザーごとのページ
    .test リンクが動的に表示される
    p {{ $route.params.uid }}

</template>

<script>

import firebase from '@/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {

  head() {
    return {
      title:'マイページ'
    }
  },

  data () {
    return {
      tabs: null,
      newEmail: '',
      currentPassword: '',
      currentPasswordforEmail: '',
      newPassword: '',
      newPasswordConfirm: '',
      title: 'マイページ'
    };
  },

  asyncData () {
    return {
    }
  },

  components: {
  },

  computed: {

  },

  created: function(){
  },

  mounted: function () {
  },

  methods: {

  },
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}

</style>
