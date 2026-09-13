import { Alert } from '@mui/material'

const Notification = ({ message, sx }) => {
  if (!message) return null
  return <Alert severity={message.type} sx={sx}>{message.text}</Alert>
}

export default Notification