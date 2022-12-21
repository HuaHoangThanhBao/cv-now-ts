import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { DocumentList } from './stories/pages/DocumentList'
import { MyDocument } from './stories/pages/MyDocument'
import './App.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/resume/:documentId" element={<MyDocument />} />
          <Route path="/my-documents" element={<DocumentList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
