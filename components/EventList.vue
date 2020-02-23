<template lang="pug">
.myevent-component-wrapper

  .myevent-list-wrapper(v-if="events.length")
    .myevent-content-wrapper(v-if="events" v-for="(event, index) in events" :key="index")
      p.prefecture {{event.prefectureName}}
      p.date(v-if="event.eventStartDate") {{formatDate(event.eventStartDate)}}〜{{formatDate(event.eventEndDate)}}
      p.date(v-else) {{formatDate(event.eventEndDate)}}
      h3.event-title {{event.eventTitle}}
      p.position {{event.booth}}
      p.booth-name {{event.shopName}}
      a.oficial-link.underline-link(:href="event.eventURL") 公式HPでみる
      .edit-wrapper(v-if="isDashbord")
        .delete.underline-link 削除
        .edit.underline-link(@click="openEventEditModaltest(event)") 編集

  .no-event-wrapper(v-else)
    p.no-ivent まだイベントがありません。

  section
    event-edit-modal(:editableEvent="event" :prefectures="prefectures" v-if="showEventEditModal")



</template>

<script>
import firebase from '@/plugins/firebase'
import EventEditModal from '~/components/EventEditModal.vue'

export default {
  props:['prefectures','events','isDashbord'],

  head () {
    return {
      bodyAttrs: {
        class: this.showEventEditModal ? 'modal-body' : ''
      }
    }
  },

  data(){
    return{
      showEventEditModal: false,
      event,
    };
  },

  components:{
    EventEditModal,
  },

  computed:{

  },

  methods: {
    formatDate(eventdate) {
      const date = eventdate.toDate()
      const yyyy = new String(date.getFullYear())
      const mm = new String(date.getMonth() + 1).padStart(2, "0")
      const dd = new String(date.getDate()).padStart(2, "0")
      return `${yyyy}-${mm}-${dd}`
    },

    openEventEditModal(event) {
      this.event = event;
      console.log(this.event)
      this.showEventEditModal = true;
    },

    openEventEditModaltest(event) {
      this.$emit('openingEventEditModal',event)
    },

    //記述被ってるのでそのうち整理して消す
    getEvents(){
      console.log("getEvents")
        const db = firebase.firestore();

        db.collection('users').doc(this.$store.state.user.uid).collection('events').orderBy("eventEndDate", "desc")
           .get().then((querySnapshot) => {
             console.log(querySnapshot)
             console.log(querySnapshot.docs)
             this.events = [];
             querySnapshot.forEach((doc) => {
                 console.log('追加時のリスト読み取りなう');
                 console.log(doc.data());
                 this.events.push(doc.data())
               }
             );

             })
             .catch(function(error) {
               console.log("Error getting documents: ", error);
             });
    },
  }
}
</script>

<style lang="scss">

.modal-body {
  overflow-y: hidden;
}

.myevent-list-wrapper{

    text-align: center;
    .myevent-content-wrapper{

      padding: 10px;
      margin: 10px 0;
      border-radius: 15px;
      border: 3px solid #F9DBDB;
      background: #fff;
      h3{
        margin-bottom: 4px;
        font-weight: bold;
      }
      p{
        margin-bottom: 4px;
      }


      a.oficial-link{
        font-size: 0.8rem;
        text-decoration: underline;
        color: #565656;
      }

      a.oficial-link:hover{
        cursor: pointer;
        opacity: 0.7;
      }

      .prefecture{
        padding-left: 10px;
        text-align: left;
        font-size: 0.8rem;
      }

      .no-ivent,
      .date,
      .oficial-link,{
        font-size: 0.8rem;
      }
      .event-title{
        font-size: 0.95rem;
      }
      .position,
      .booth-name{
        font-size: 0.8rem;
        line-height: 0.8rem;
      }

      .edit-wrapper{

        display: flex;
        justify-content: space-between;
        padding: 0 10px;

        .delete{

        }
        .edit{

        }
      }
    }
}

.no-event-wrapper{
  padding: 32px 0 16px 0;
  margin: 0 auto;
  p{
    margin-bottom: 0;
    text-align: center;
    letter-spacing: 1.2px;
    font-size: 0.8rem;
  }
}

  @media screen and (max-width: 480px) {



  }

</style>
