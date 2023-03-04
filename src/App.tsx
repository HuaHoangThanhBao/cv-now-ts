import { useNavigate, useRoutes } from 'react-router-dom'
import { DocumentList } from './stories/pages/DocumentList'
import { MyDocument } from './stories/pages/MyDocument'
import { LandingPage } from './stories/pages/LadingPage'
import { useEffectOnce } from './hooks'
import './App.scss'
import { http } from './utils'

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
  useEffectOnce(() => {
    document.addEventListener("message", (event: any) => {
      const message = event.data;
  
      handleMessages(message);
    })
    function handleMessages(message: any) {
      const { from, event, data } = JSON.parse(message)
      alert(`Received message from native app: ${from}-${event}-${data}`)
      if (event === 'login') {
        const { email } = data
        alert(`email: ${email}`)
        http.get(`users/getuserbyemail/${email}`).then((res: any) => {
          navigate(`/my-documents/${res._id}`)
        }).catch((e) => {
          alert(`error getuserbyemail: ${e}`)
        })
      }
    }
  })

  return <div className="App">{elements}</div>
}

export default App
