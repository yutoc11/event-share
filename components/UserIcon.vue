<template lang="pug">
.icon-image-wrapper(v-bind:class="{ dashicon: isDashbord}")

  .icon-display-wrapper(v-if="isLoading && iconImage && !isDashbord")
    .icon-loading-display-wrapper
      content-loader(:width="100" :height="100")
        circle(cx="50" cy="50" r="50")
  .icon-display-wrapper(v-show="!isLoading && iconImage")
    img(:src="iconImage" v-on:load="loaded")
  .icon-display-wrapper(v-if="isLoading && !iconImage")
    img(src="~assets/images/default_icon.png")

  .icon-close(v-if="isDashbord")
    i.material-icons photo_camera
  .icon-change-input(v-if="isDashbord")
    input.input-file(@change="$emit('iconChange',$event, 'icon')" type="file")

</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {

  props:['iconImage','isDashbord'],

  data(){
    return{
      isLoading: true,
      isLoadingIcon: true,
    };
  },

  components: {
    ContentLoader,
  },

  computed:{
  },

  methods: {

    loaded(){
      console.log(this.isLoading)
      this.isLoading = false;
      this.$emit('loadedIcon')
    },

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
  background-color: #fff;
  width: 100px;
  height: 100px;
  img{
    border: 3px solid #ccc;
    border-radius: 50%;
    object-fit: cover;
    width: 100px;
    height: 100px;
  }
  .icon-loading-display-wrapper{
    border-radius: 50%;
    background-color: transparent;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
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
  background-color: #fff;
  border-radius: 50%;
  bottom: -8px;
  right: -7px;
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
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
