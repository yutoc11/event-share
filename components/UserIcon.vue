<template lang="pug">
.icon-image-wrapper(v-bind:class="{ dashicon: isDashbord}")
  .icon-display-wrapper
    img(:src="iconImage")


  .icon-close(v-if="isDashbord")
    i.material-icons photo_camera
  .icon-change-input(v-if="isDashbord")
    input.input-file(@change="$emit('iconChange',$event, 'icon')" type="file")

</template>

<script>

export default {

  props:['iconImage','isDashbord'],

  computed:{
  },

  methods: {
  }
}
</script>

<style lang="scss">

.icon-image-wrapper{
  position: relative;
  width: 100px;
  margin: 0 auto;
}

.icon-image-wrapper.dashicon{
  width: 60px;
}

.icon-display-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: transparent;
  width: 100px;
  height: 100px;
  img{
    border: 3px solid #fff;
    border-radius: 50%;
    object-fit: cover;
    width: 100px;
    height: 100px;
  }
}

.dashicon{
  .icon-display-wrapper{
    margin: 10px auto;
    width: 60px;
    height: 60px;
    img{
      width: 60px;
      height: 60px;
    }
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
