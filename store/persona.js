import firebase from '@/plugins/firebase'
const firestorage = firebase.storage()
const db = firebase.firestore()
const storageBucket = 'event-share-416a8.appspot.com'

export const actions = {

 iconUploadImage: async (context, payload) => {
      console.log('uploadImageなう')
      console.log(payload.iconName)
      console.log(payload.file)

      const uploadTask = await firestorage.ref(payload.iconName)
                                    .putString(payload.file,'data_url', {contentType:'image/png'})
                                    .then((snapshot) =>{
                                      const card = db.collection("users").doc(payload.userId)

                                      card.set({
                                        iconName: payload.iconName,
                                        iconUrl: `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(payload.iconName)}?alt=media`,
                                      }, { merge: true })
                                    })
      return uploadTask
  },

coverUploadImage: async (context, payload) => {
     console.log('uploadImageなう')
     console.log(payload.coverName)
     console.log(payload.file)

     const uploadTask = await firestorage.ref(payload.coverName)
                                   .putString(payload.file,'data_url', {contentType:'image/png'})
                                   .then((snapshot) =>{
                                     const card = db.collection("users").doc(payload.userId)

                                     card.set({
                                       coverName: payload.coverName,
                                       coverUrl: `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(payload.coverName)}?alt=media`,
                                     }, { merge: true })
                                   })
     return uploadTask
 }
}
