import { createContext, useReducer } from "react"
import { useContext } from "react"

const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SHOW':
        return action.payload
      case 'HIDE':
        return ''
      default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notifText, notifDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notifText, notifDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const setNotification = (text) => {
  return {
    type: 'SHOW',
    payload: text
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    payload: '' 
  }
}

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[1]
}

export default NotificationContext