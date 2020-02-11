<template lang="pug">
.icon-image-wrapper
  .icon-display-wrapper
    img(:src="iconImage")


  .icon-close
    i.material-icons photo_camera
  .icon-change-input
    input.input-file(@change="$emit('iconChange',$event, 'icon')" type="file")

</template>

<script>

export default {

  props:['iconImage'],

  computed:{
  },

  methods: {
  }
}
</script>

<style lang="scss">

.icon-image-wrapper{
  position: relative;
  width: 60px;
  margin: 0 auto;
}

.icon-display-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: transparent;
  img{
    border: 3px solid #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
}

.icon-close{
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

.icon-change-input{
  position: absolute;
  top: -4px;
  right: -12px;
  width: 80px;
  height: 80px;
  //border-radius: 50%;

  input.input-file{
    opacity: 0;
    width: 80px;
    height: 80px;
  }
}

.icon-change-input:hover{
  cursor: pointer;
}


  @media screen and (max-width: 480px) {


  }
</style>
