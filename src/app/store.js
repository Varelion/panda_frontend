import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/counter'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
