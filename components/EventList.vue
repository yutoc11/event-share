<template lang="pug">
.myevent-list-wrapper
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
      .edit.underline-link 編集
  .no-event-wrapper(v-else)
    p.no-ivent まだイベントがありません。
</template>

<script>

export default {
  props:['events','isDashbord'],

  data(){
    return{
    };
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
  }
}
</script>

<style lang="scss">

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

    .no-event-wrapper{
      padding: 16px 0;
      margin: 0 auto;
    }
}

  @media screen and (max-width: 480px) {



  }

</style>
