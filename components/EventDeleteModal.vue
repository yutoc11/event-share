<template lang="pug">
transition(name="modal")
  .modal-mask
    .modal-wrapper
        .modal-delete-container
          .modal-content-wrapper

            .delete-specific-event-wrapper(v-if="!pastDelete")
              .delete-event-title
                h3 {{deleteEvent.eventTitle}}
                p このイベントを本当に削除しますか？

              .delete-button-wrapper
                .common-button(@click="deleteSpecificEvent") はい

            .delete-past-events-wrapper(v-else-if="pastDelete && !deletedPastEvents")

              .delete-event-title
                h3 過去イベントをまとめて削除
                p 過去イベントを本当に全て削除しますか？
                p.delete-caption ※過去のイベントがない場合、何も削除されません

              .delete-button-wrapper
                .common-button(@click="deletePastEvents") はい

            .reload-events-wrapper(v-else-if="pastDelete && deletedPastEvents")

              .delete-event-title
                h3 過去イベントの削除が完了しました
                p イベントリストを再読み込みしてください。

              .delete-button-wrapper
                .common-button.reload-button(@click="compDeletePastEvents") はい


        .close-link-wrapper(v-if="!deletedPastEvents")
          .close-link(@click="closeEventDeleteModal()") キャンセルしてとじる
</template>

<script>
import firebase from '@/plugins/firebase'
import uuid from 'uuid'


export default {

  name: 'EventDeleteModal',

  props:[
    'pastDelete',
    'deleteEvent',
    'deletedPastEvents',
  ],

  data(){
    return{
    };
  },

  computed:{
  },

  created: function(){
  },

  methods: {

    closeEventDeleteModal() {
      this.$parent.showEventDeleteModal = false;
    },

    deleteSpecificEvent(){
      console.log('deleteEventなう');

      //firestoreに登録
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);

      const eventData = this.deleteEvent;

      if( userId != null){
        db.collection("users").doc(userId).collection("events").doc(eventData.eventId).delete()
          .then(() =>{
            this.$parent.getEvents(),
            console.log("削除成功");
          }).catch(
            function(error) {
              console.error("Error adding document: ", error);
            }
          );
      }
      this.$parent.showEventDeleteModal = false;
      //setTimeout(this.$parent.getEvents,1000);
      console.log("最後まで3ってる？")
    },

    deletePastEvents(){
      this.$parent.deletedPastEvents = true;
      this.$emit('deletePastEvents')
    },

    compDeletePastEvents(){
      this.$parent.pastDelete = false;
      this.$parent.showEventDeleteModal = false;
      this.$parent.deletedPastEvents = false;
      this.$emit('reloadEvents')    }

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

   .modal-delete-container {
     position: relative;
     overflow-y: scroll;
     width: 35%;
     min-width: 300px;
     height:150px;
     margin: 0px auto;
     padding: 6px 10px;
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

       .delete-event-title{

         padding: 12px 0 0 0;
         h3{
           font-size: 1rem;
           text-align: center;
           margin-bottom: 12px;
         }

         p{
           margin-bottom: 0;
           font-size: 0.7rem;
           text-align: center;
         }

         p.delete-caption{
           margin-bottom: 0;
           font-size: 0.55rem;
           text-align: center;
           color: #A7A7A7;
         }
       }

     }

     .common-button.reload-button{
       background-color: red;
     }

   }

   .modal-enter-active, .modal-leave-active {

     transition: opacity 0.1s;

     // オーバーレイに包含されているモーダルウィンドウのトランジション
     .modal-window {
       transition: opacity 0.4s, transform 0.3s;
     }
   }

   .edit-event-title-span{
     font-size: 0.75rem;
     color: #565656;
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
