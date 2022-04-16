import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyBQxJ7TJiRkUntParr2wV3qWXLwTPWrWSk"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "clueconn-73e93.firebaseapp.com"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID = "clueconn-73e93"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "clueconn-73e93.appspot.com"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "151596128119"
// NEXT_PUBLIC_FIREBASE_APP_ID = "1:151596128119:web:6b824e102dbb160c763372"
// NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "G-EVC0R7RD07"
// NEXT_PUBLIC_GOOGLE_ANALYTICS="G-81H3YERH00"
// NEXT_PUBLIC_URL="192.168.1.227:3000"
// FIREBASE_API="https://us-central1-clueconn-73e93.cloudfunctions.net/api"
// NODE_ENV="development"

const app = initializeApp({
  apiKey: 'AIzaSyBQxJ7TJiRkUntParr2wV3qWXLwTPWrWSk',
  authDomain: 'clueconn-73e93.firebaseapp.com',
  projectId: 'clueconn-73e93',
  storageBucket: 'clueconn-73e93.appspot.com',
  messagingSenderId: '151596128119',
  appId: '1:151596128119:web:6b824e102dbb160c763372',
  measurementId: 'G-EVC0R7RD07',
})

const firestore = getFirestore(app)
const firebaseAuth = getAuth(app)

export { firestore, firebaseAuth }
