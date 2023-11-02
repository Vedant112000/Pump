import './App.css';
import AppBar from './views/AppBar';
import Dashboard from './views/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Employee from './views/Employee';
import Creditors from './views/Creditors';
import AddCreditors from './views/AddCreditors';
import AddEmployee from './views/AddEmployee';

function App() {
  return (
    <>
    <div className="App">
      <AppBar />
    </div>

    <Routes>
        <Route path='/' Component={Dashboard} />
        <Route path='/employee' Component={Employee} />
        <Route path='/creditors' Component={Creditors} />
        <Route path='/addCreditor' Component={AddCreditors} />
        <Route path='/addEmployee' Component={AddEmployee}/>
    </Routes>
    </>
  );
}

export default App;
