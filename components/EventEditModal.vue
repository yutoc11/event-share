<template lang="pug">
transition(name="modal")
  .modal-mask
    .modal-wrapper
        .modal-container
          .modal-content-wrapper
            .contact-wrapper
              .form-wrapper
                .modal-title
                  h3 {{editableEvent.eventTitle}} <br><span class="edit-event-title-span">を編集する</span>

                .modal-date-wrapper
                  .date-label.input-label 日にち：必須
                  .modal-datepicker-wrapper
                    v-date-picker(
                      v-model="eventDates"
                      full-width
                      range
                      no-title
                      color="#F0858C"
                    )
                  .date-display-wrapper
                    p {{ dateRangeText }}

                .modal-addevent-wrapper
                  validation-observer(v-slot="{ invalid }")
                    .event-title-wrapper.event-contents-wrapper
                      .input-label イベント名：必須
                      validation-provider(v-slot="{ errors }" rules="required" name="イベント名")
                        input(v-model="editableEvent.eventTitle" type="text" name="EventTitle" placeholder="ハンドメイドマルシェ" required="required" autocomplete="off").input-area
                        .error-ms-wrapper
                          p(v-show="errors.length" class="help is-danger") {{ errors[0] }}
                    .event-prefecture-wrapper.event-contents-wrapper
                      .input-label 都道府県：必須
                      validation-provider(v-slot="{ errors }" rules="required" name="都道府県")
                        select.input-area.prefecture-selectbox(v-model="editableEvent.prefectureCode" required name="pref_id")
                          option(:value="prefecture.code" v-for="(prefecture, index) in prefectures" :key="index") {{prefecture.name}}
                        .error-ms-wrapper
                          p(v-show="errors.length" class="help is-danger") {{ errors[0] }}
                    .event-title-wrapper.event-contents-wrapper
                      .input-label 場所（ブース番号など）：任意
                      input(v-model="editableEvent.booth" type="text" name="Booth" placeholder="A-18" autocomplete="off").input-area
                      .error-ms-wrapper
                    .event-shoptitle-wrapper.event-contents-wrapper
                      .input-label ショップ名：任意
                      input(v-model="editableEvent.shopName" type="text" name="ShopName" placeholder="osao handmade" autocomplete="off").input-area
                      .error-ms-wrapper
                    .event-officialhp-wrapper.event-contents-wrapper
                      .input-label イベント公式HP：任意
                      input(v-model="editableEvent.eventURL" type="text" name="ShopName" placeholder="osao handmade" autocomplete="off").input-area
                      .error-ms-wrapper
                    .event-comment-wrapper.event-contents-wrapper
                      .input-label コメント：任意
                      validation-provider(v-slot="{ errors }" rules="max:1000" name="コメント")
                        textarea(v-model="editableEvent.comment" cols="50" rows="4" name="Comment" placeholder="補足事項があればご記入ください。").input-area
                        .error-ms-wrapper
                          p(v-show="errors.length" class="help is-danger") {{ errors[0] }}
                    .save-button-wrapper
                      .common-button.disabled-button(v-if="invalid") イベント編集を確定
                      .common-button.save-button(v-else @click="editEvent") イベント編集を確定
                      .error-ms-wrapper
                        p.caption(v-show="invalid" class="help") ※必須項目を入力してください。
        .close-link-wrapper
          .close-link(@click="closeEventEditModal()") とじる
</template>

<script>
import firebase from '@/plugins/firebase'
import uuid from 'uuid'


export default {

  name: 'EventEditModal',

  props:[
    'prefectures',
    'editableEvent'
  ],

  data(){
    return{
      eventDates: [],
    };
  },

  computed:{

    dateRangeText () {
        return this.eventDates.join(' ~ ')
      },


  },

  created: function(){


    if(this.editableEvent.eventStartDate){
      let startDateStr = this.editableEvent.eventStartDate.toDate()
      let startyyyy = new String(startDateStr.getFullYear())
      let startmm = new String(startDateStr.getMonth() + 1).padStart(2, "0")
      let startdd = new String(startDateStr.getDate()).padStart(2, "0")
      this.eventDates[0] = `${startyyyy}-${startmm}-${startdd}`;
      console.log(this.eventDates[0])

      let endDateStr = this.editableEvent.eventEndDate.toDate()
      let endyyyy = new String(endDateStr.getFullYear())
      let endmm = new String(endDateStr.getMonth() + 1).padStart(2, "0")
      let enddd = new String(endDateStr.getDate()).padStart(2, "0")
      this.eventDates[1] = `${endyyyy}-${endmm}-${enddd}`;
      console.log(this.eventDates[1])
    }else{
      let endDateStr = this.editableEvent.eventEndDate.toDate()
      let endyyyy = new String(endDateStr.getFullYear())
      let endmm = new String(endDateStr.getMonth() + 1).padStart(2, "0")
      let enddd = new String(endDateStr.getDate()).padStart(2, "0")
      this.eventDates[0] = `${endyyyy}-${endmm}-${enddd}`;
      console.log(this.eventDates[0])
    }

  },

  methods: {

    closeEventEditModal() {
      this.$parent.showEventEditModal = false;
    },

    editEvent(){
      console.log('editEventなう');

      //入力内容の確認
      //console.log(this.event);
      const eventData = this.editableEvent;

      //日付設定をDate型へ変換する文字列に変換
      let endDateStr = (this.eventDates[1] != null) ? `${this.eventDates[1]}T00:00:00+09:00` : '';
      let startDateStr = (this.eventDates[0] != null) ? `${this.eventDates[0]}T00:00:00+09:00` : '';
      let startDate = Date.parse(startDateStr);
      let endDate = Date.parse(endDateStr);
      //日付を表す数値に変換
      console.log("[1]")
      console.log(endDateStr)
      console.log(endDate)
      console.log("[0]")
      console.log(startDateStr)
      console.log(startDate)

      //日付が1つの時は[0]がendになる
      if(!endDateStr){
        endDateStr = startDateStr;
        startDateStr = '';
        console.log("逆にしたよ！")
      }

      // 前後逆になっていたら値を変更
      if(startDateStr && startDate > endDate ){
        console.log('前後逆転！')
        let oldStartDateStr = startDateStr
        let oldEndDateStr = endDateStr
        startDateStr = oldEndDateStr
        endDateStr = oldStartDateStr
      }
      //firestoreに登録
      const db = firebase.firestore();
      const userId = this.$store.state.user.uid;
      console.log(userId);
      const prefecture = this.prefectures[eventData.prefectureCode]
      console.log(prefecture)

      if( userId != null){
        //this.$store.state.userinfo.userName = userName;
        if(!startDateStr){
          //if(db){
          //期間が1日でで入力されている場合
          db.collection("users").doc(userId).collection("events").doc(eventData.eventId).set({
            eventType: 'store',
            eventTitle: eventData.eventTitle,
            prefectureCode: prefecture.code,
            prefectureName: prefecture.name,
            booth: eventData.booth,
            shopName: eventData.shopName,
            eventURL: eventData.eventURL,
            comment: eventData.comment,
            eventEndDate: firebase.firestore.Timestamp.fromDate(new Date(endDateStr)),
            eventStartDate: "",
            }, { merge: true })
            .then(() =>{
              this.$parent.getEvents(),
              console.log("変更成功");
            }).catch(
              function(error) {
                console.error("Error adding document: ", error);
              }
            );
        }else{
          //期間が終わりと始まりで入力されている場合
          db.collection("users").doc(userId).collection("events").doc(eventData.eventId).set({
            eventType: 'store',
            eventTitle: eventData.eventTitle,
            prefectureCode: prefecture.code,
            prefectureName: prefecture.name,
            booth: eventData.booth,
            shopName: eventData.shopName,
            eventURL: eventData.eventURL,
            comment: eventData.comment,
            eventStartDate: firebase.firestore.Timestamp.fromDate(new Date(startDateStr)),
            eventEndDate: firebase.firestore.Timestamp.fromDate(new Date(endDateStr)),
            }, { merge: true })
            .then(() =>{
              this.$parent.getEvents(),
              console.log("変更成功");
            }).catch(
              function(error) {
                console.error("Error adding document: ", error);
              }
            )
        }

      }
      this.$parent.isEditEvent = true;
      this.$parent.showEventEditModal = false;
      //setTimeout(this.$parent.getEvents,1000);
      console.log("最後まで3ってる？")
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

             .modal-datepicker-wrapper{
               padding: 3px 10px 5px;

             }
             .date-display-wrapper{

               min-height: 20px;
               margin-bottom: 10px;

               p{
                 margin-bottom: 0;
                 font-size: 0.85rem;
                 text-align: center;
               }
             }
           }

           .event-contents-wrapper{
             margin-bottom: 6px;
           }

           .event-prefecture-wrapper.event-contents-wrapper{
             position: relative;
             display: inline-block;
             .prefecture-selectbox{
               width: 100%;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
             }
             .prefecture-selectbox:focus{
               outline: none;
             }
             select::-ms-expand {
               display: none;
             }
           }

           .event-prefecture-wrapper::after{
            content: '';
            width: 6px;
            height: 6px;
            border: 0px;
            border-bottom: solid 2px #b4b3b3;
            border-right: solid 2px #b4b3b3;
            -ms-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            position: absolute;
            top: 53%;
            right: 10px;
            margin-top: -4px;
           }

           p.caption{
             color: #ccc;
           }

           .save-button-wrapper{
             min-height: 60px;
             text-align: center;
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
