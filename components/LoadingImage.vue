<template lang="pug">
.loading-image-wrapper
    vue-loading(type="bubbles" color="#F0858C" size="{ width: '30px', height: '30px' }")
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'loading',
  components: {
    VueLoading,
  },

}
</script>

<style lang="scss">
.loading-image-wrapper{
  z-index: 100;
  width: 40px;
  margin: 0 auto;
  padding: 12px 0;
}
</style>
