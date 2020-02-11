<template lang="pug">
.cover-image-wrapper
  .cover-display-wrapper
    img(:src="coverImage")
  .cover-close
    i.material-icons photo_camera
  .cover-change-input
    input.input-file(@change="$emit('coverChange',$event, 'cover')" type="file")
</template>

<script>

export default {

  props:['coverImage'],

  computed:{
  },

  methods: {
  }
}
</script>

<style lang="scss">

.cover-image-wrapper{
  position: relative;
  width: 432px;
  margin: 0 auto;
}

.cover-display-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  background-color: #F0858C;
  width: 432px;
  height: 226.8px;
  background-color: transparent;

  img{
    border: 3px solid #fff;
    width: 432px;
    height: 226.8px;
    object-fit: cover;
  }
}

.cover-change-input{
  position: absolute;
  top: 2px;
  right: -3px;
  width: 432px;
  height: 226.8px;

  input.input-file{
    opacity: 0;
    width: 432px;
    height: 226.8px;
  }
}

.cover-close{
  position: absolute;
  background-color: #ccc;
  border-radius: 50%;
  bottom: -8px;
  right: -7px;
  width: 25px;
  height: 25px;
  border: 1px solid #fff;
  i.material-icons{
    padding: 4.5px 0 0 4.5px;
    font-size: 14px;
  }

}


.cover-change-input:hover{
  cursor: pointer;
}

.open-url-cover{
  width: 100vw;
  height: 52.5vw;
}

  @media screen and (max-width: 480px) {

    .cover-image-wrapper{
      width: 85vw;
    }

    .cover-display-wrapper{
      width: 85vw;
      height: 42vw;
      img{
        width: 85vw;
        height: 42vw;
      }
    }
    .cover-change-input{
      width: 85vw;
      height: 42vw;
      input.input-file{
        width: 85vw;
        height: 42vw;
      }
    }

  }

</style>
