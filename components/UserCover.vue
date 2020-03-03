<template lang="pug">
.cover-image-wrapper(v-bind:class="{ dashcover: isDashbord}")
  .content-loader-wrapper(v-if="isLoading && coverImage && !isDashbord")
    content-loader(:width="100" :height="52.5")
      rect(width="100%" height="100%")
  .cover-display-wrapper(v-show="!isLoading && coverImage")
    img(:src="coverImage" v-on:load="loaded")
  .cover-display-wrapper(v-if="isLoading && !coverImage")
    img(src="~assets/images/default_cover.png")

  .cover-close(v-if="isDashbord")
    i.material-icons photo_camera
  .cover-change-input(v-if="isDashbord")
    input.input-file(@change="$emit('coverChange',$event, 'cover')" type="file")
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {

  props:['coverImage','isDashbord'],

  data(){
    return{
      isLoading: true,
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
      this.$emit('loadedCover')
    },
  }
}
</script>

<style lang="scss">

.cover-image-wrapper{
  position: relative;
  width: 432px;
  margin: 0 auto;
}

.dashcover{
  .cover-display-wrapper{
      margin: 10px auto;
      img{
        border: 3px solid #ccc;
      }
  }

}

.cover-display-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #F0858C;
  width: 432px;
  height: 226.8px;
  background-color: transparent;

  img{
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


.cover-change-input:hover{
  cursor: pointer;
}

.open-url-cover{
  width: 100vw;
  height: 52.5vw;
}

  @media screen and (max-width: 432px) {

    .cover-image-wrapper.dashcover{
      width: 85vw;
    }

    .cover-image-wrapper{
        width: 100vw;
    }



    .cover-display-wrapper{
      width: 100vw;
      height: 52.5vw;
      img{
        width: 100vw;
        height: 52.5vw;
      }
    }

    .dashcover{
      .cover-display-wrapper{
        width: 85vw;
        height: 42vw;
        img{
          width: 85vw;
          height: 42vw;
        }
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
