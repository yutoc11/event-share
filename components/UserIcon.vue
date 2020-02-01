<template lang="pug">
.icon-display-wrapper
  img(src="#")
</template>

<script>

export default {

  props:[],

  computed:{
  },

  methods: {
  }
}
</script>

<style lang="scss">

.icon-display-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #F0858C;
  img{
    object-fit: cover;
  }
}

  @media screen and (max-width: 480px) {


  }
</style>
