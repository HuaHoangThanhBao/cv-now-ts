import { useNavigate, useRoutes } from 'react-router-dom'
import { DocumentList } from './stories/pages/DocumentList'
import { MyDocument } from './stories/pages/MyDocument'
import { LandingPage } from './stories/pages/LadingPage'
import './App.scss'
import { http } from './utils'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  const elements = useRoutes([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/resume/:documentId',
      element: <MyDocument />
    },
    {
      path: '/my-documents/:userId',
      element: <DocumentList />
    }
  ])

  function handleMessages(message: any) {
    const { from, event, data } = JSON.parse(message)
    if (event === 'login') {
      alert(`data: ${data}`)
      const { email } = data
      alert(`email: ${email}`)
      http.get(`users/getuserbyemail/${email}`).then((res: any) => {
        alert(`res: ${res}`)
        alert(`res id: ${res.data._id}`)
        navigate(`/my-documents/${res.data._id}`)
      }).catch((e) => {
        alert(`error getuserbyemail: ${e}`)
      })
    }
  }

  useEffect(() => {
    document.addEventListener("message", (event: any) => {
      const message = event.data;
      handleMessages(message);
    })
    return () => {
      document.removeEventListener('message', handleMessages)
    }
  }, [])

  return <div className="App">{elements}</div>
}

export default App
