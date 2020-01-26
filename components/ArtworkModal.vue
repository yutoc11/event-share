<template lang="pug">
transition(name="modal")
  .modal-mask
    .modal-wrapper
        .modal-container
          .modal-content-wrapper
            .modal-title
              h3 新規のイベントを追加する
            .modal-date-wrapper
              .date-label
              .date-input-wrapper
                .date-start 2020-4-1
                .date-span 〜
                .date-end 2020-4-3
            .modal-content-title
              h3 へいへい
            .modal-content-caption
              p ういうい
        .close-link-wrapper
          .close-link(@click="closeModal()") とじる
</template>

<script>

export default {

  name: 'ArtworkModal',

  props:[
    'val'
  ],

  computed:{
  },

  methods: {

    closeModal() {
      this.$parent.showModal = false;
    },

  }
}
</script>

<style lang="scss">

  .modal-mask {
    z-index: 9999;
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, .5);
     display: table;
   }

   .modal-wrapper {
     position: relative;
     display: table-cell;
     vertical-align: middle;

     .close-link-wrapper{
       display: flex;
       justify-content: center;
       align-items: center;
     }

     .close-link{
       bottom: 20px;
       color: #fff;
       a{

       }
       cursor: pointer;
       padding: 6px 10px;
       font-size: 0.8rem;
       text-decoration: underline;
       margin-bottom: 14px;
       min-height: 25px;
     }

     .close-link:hover{
       opacity: 0.6;
     }

     .modal-close-button{
       background-color: #564939;
       color: #fff;
       cursor: pointer;
     }

     .modal-close-button:hover{
       opacity: 0.6;
     }

   }

   .modal-container {
     position: relative;
     overflow-y: scroll;
     width: 35%;
     min-width: 300px;
     min-height: 400px;
     height:75vh;
     margin: 0px auto;
     padding: 40px 10px;
     background-color: #fff;
     border-radius: 4px;
     border: none;
     box-shadow: 0 0 10px rgba(0,0,0,0.4);

     .modal-content-wrapper{

       position: relative;
       width: 100%;
       margin: 0 auto;
       display: flex;
       flex-direction: column;
       justify-content: center;
       text-align: center;

       .date-span{
          transform: rotate(90deg);
       }

       .contact-wrapper{
         max-width: 1024px;
         padding: 48px 0;
         margin: 0 auto;
         text-align: center;

         .contact-description{
           max-width: 320px;
           margin: 0 auto;
           padding-top: 30px;
         }

         p{


           &.is-danger{
             color: red;
           }

         }

         .error-ms-wrapper{
           min-height: 20px;
         }.error-ms-wrapper{
           min-height: 20px;
         }

         .form-wrapper{
           max-width: 480px;
           width:100%;
           margin: 0 auto;
           text-align: left;
           padding: 30px 0;

           .contact-contents-wrapper{
             margin-bottom: 30px;
           }
           input,
           textarea{
             width: 100%;
           }

           .input-label{
             margin-bottom: 5px;
           }

           .input-area{
             padding: 10px 16px;
             margin-bottom: 4px;
             font-size: 1rem;
             border-radius: 4px;
             background: #FFFFFF;
             color: #787C7B;
             letter-spacing: 0rem;
             line-height: 1.4;
             opacity: 1;
             pointer-events: all;
             background-clip: border-box;
             border: solid 0.5px #B3B6BB;
             transition: .3s cubic-bezier(.4,.4,0,1);
           }

           input,
           textarea{
             border: solid 0.5px #B3B6BB;
           }

           input:focus,
           textarea:focus{
             border: solid 0.5px #B3B6BB;
             outline: 0;
           }

           .contact-button-wrapper{

             padding-bottom: 40px;
             min-height: 100px;
             text-align: center;

             .osao-button{
               min-width:250px;
               width: 50%;
               padding: 15px;
               border-radius: 6px;
               margin: 0 auto 8px;
               text-align: center;
             }

             .contact-button{
               background-color: #564939;
               color: #fff;
               cursor: pointer;
             }

             .disabled-button{
               background-color: #EEEEEE;
               color: #ccc;
             }
           }

           .contact-button:hover{
             opacity: 0.6;
           }

           p.caption{
             color: #ccc;
           }

         }
       }

     }




   }

   .modal-enter-active, .modal-leave-active {

     transition: opacity 0.1s;

     // オーバーレイに包含されているモーダルウィンドウのトランジション
     .modal-window {
       transition: opacity 0.4s, transform 0.3s;
     }
   }



  @media screen and (max-width: 480px) {

  .modal-container {

    padding: 14px 10px;

    .modal-content-wrapper{

      .modal-content-img-wrapper{

        .no-img{
          margin: 0;
          width: 270px;
          height: 180px;
        }

      }

      .modal-content-title{

      }

      .modal-content-caption{

      }

    }
  }
}
</style>
