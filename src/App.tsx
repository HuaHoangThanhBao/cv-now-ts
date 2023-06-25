import { useRoutes } from 'react-router-dom'
import { DocumentList } from './stories/pages/DocumentList'
import { MyDocument } from './stories/pages/MyDocument'
import { LandingPage } from './stories/pages/LandingPage'
import { useGoogleLogin } from './hooks'
import './App.scss'

function App() {
  useGoogleLogin()

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

  return <div className="App">{elements}</div>
}

export default App
