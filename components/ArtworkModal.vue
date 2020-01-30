<template lang="pug">
transition(name="modal")
  .modal-mask
    .modal-wrapper
        .modal-container
          .modal-content-wrapper
            .contact-wrapper
              .form-wrapper
                .modal-title
                  h3 新規のイベントを追加する
                .modal-date-wrapper
                  .date-label.input-label 日にち：必須
                  .date-input-wrapper
                    .date-start-wrapper
                      input.date-start.input-area(type="text" placeholder="2020-4-1")
                    .date-span 〜
                    .date-end-wrapper
                      input.date-end.input-area(type="text" placeholder="2020-4-3")
                .modal-addevent-wrapper
                  validation-observer(v-slot="{ invalid }")
                    .event-title-wrapper.event-contents-wrapper
                      .input-label イベント名：必須
                      validation-provider(v-slot="{ errors }" rules="required" name="イベント名")
                        input(v-model="formData.eventTitle" type="text" name="EventTitle" placeholder="ハンドメイドマルシェ" required="required" autocomplete="off").input-area
                        .error-ms-wrapper
                          p(v-show="errors.length" class="help is-danger") {{ errors[0] }}
                    .event-title-wrapper.event-contents-wrapper
                      .input-label 場所（ブース番号など）：任意
                        input(v-model="formData.booth" type="text" name="Booth" placeholder="A-18" autocomplete="off").input-area
                        .error-ms-wrapper
                    .event-shoptitle-wrapper.event-contents-wrapper
                      .input-label ショップ名：任意
                        input(v-model="formData.shopName" type="text" name="ShopName" placeholder="osao handmade" autocomplete="off").input-area
                        .error-ms-wrapper
                    .event-comment-wrapper.event-contents-wrapper
                      .input-label コメント：任意
                      validation-provider(v-slot="{ errors }" rules="max:1000" name="コメント")
                        textarea(v-model="formData.content" cols="50" rows="4" name="Comment" placeholder="補足事項があればご記入ください。").input-area
                        .error-ms-wrapper
                          p(v-show="errors.length" class="help is-danger") {{ errors[0] }}
                    .contact-button-wrapper
                      .osao-button.disabled-button(v-if="invalid") イベントを追加
                      .osao-button.contact-button(v-else @click="sendContact()") イベントを追加
                      .error-ms-wrapper
                        p.caption(v-show="invalid" class="help") ※必須項目を入力してください。
        .close-link-wrapper
          .close-link(@click="closeModal()") とじる
</template>

<script>

export default {

  name: 'ArtworkModal',

  props:[
    'val'
  ],

  data(){
    return{
      formData: {
        name: '',
        email: '',
        content: '',
      }
    };
  },

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
     height:85vh;
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

       .modal-title{

         margin-bottom: 6px;
         h3{
           font-size: 1rem;
           text-align: center;
         }
       }

       .contact-wrapper{
         max-width: 1024px;
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
           min-height: 16px;
           p{
             margin-bottom: 0;
             font-size: 0.7rem;
           }
         }

         .form-wrapper{
           max-width: 480px;
           width:100%;
           margin: 0 auto;
           text-align: left;

           .date-span{
              transform: rotate(90deg);
              width: 20px;
              height: 20px;
              margin: 0 auto;
              color: #B3B6BB;
           }

           .modal-date-wrapper{
             .date-label{
               text-align: left;
               font-size: 0.8rem;
             }
             .date-input-wrapper{

               margin-bottom: 16px;
               .date-start,
               .date-end{
                 width: 100%;
                 padding: 4px 10px;
                 font-size: 0.8rem;
               }
             }
           }

           .event-contents-wrapper{
             margin-bottom: 6px;
           }
           input,
           textarea{
             width: 100%;
           }

           .input-label{
             margin-bottom: 5px;
             color: #565656;
             font-size: 0.8rem;
           }

           .input-area{
             padding: 4px 10px;
             margin-bottom: 4px;
             font-size: 0.8rem;
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
