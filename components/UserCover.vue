<template lang="pug">
.cover-display-wrapper.dashbord-cover
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

.cover-display-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  background-color: #F0858C;
  height: 100px;

  img{
    object-fit: cover;
  }
}

.dashbord-cover{
  width: 432px;
  height: 226.8px;
}
.open-url-cover{
  width: 100vw;
  height: 52.5vw;
}

  @media screen and (max-width: 480px) {

    .dashbord-cover{
      width: 85vw;
      height: 42vw;
    }

  }
</style>
