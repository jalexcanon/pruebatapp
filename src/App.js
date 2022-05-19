import './App.css';
import {BrowserRouter as Router, Route, Routes, withRouter} from 'react-router-dom';
import List from './components/List'
import Add from './components/Add'
import Edit from './components/Edit'

function App() {
  return (
    <main className='container mt-5'>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<List/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/edit/:id" element={<Edit/>} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}

export default App;
