import { useNavigate, useRoutes } from 'react-router-dom'
import { DocumentList } from './stories/pages/DocumentList'
import { MyDocument } from './stories/pages/MyDocument'
import { LandingPage } from './stories/pages/LadingPage'
import './App.scss'
import { http } from './utils'
import { useEffect } from 'react'
import { useAppDispatch } from './store'
import { getUserByEmail } from './user.slice'

function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
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

  const navigateToDocumentList = (id: string) => {
    // alert(`go to document list with id: ${id}`)
    navigate(`/my-documents/${id}`)
  }

  function handleMessages(message: any) {
    const { from, event, data } = JSON.parse(message)
    if (event === 'login') {
      // alert(`data: ${data}`)
      const { email } = data
      // alert(`email: ${email}`)
      dispatch(getUserByEmail({email, callback: navigateToDocumentList}))
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
