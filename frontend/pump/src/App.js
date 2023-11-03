import './App.css';
import AppBar from './views/AppBar';
import Dashboard from './views/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Employee from './views/Employee/Employee';
import Creditors from './views/Creditors/Creditors';
import AddCreditors from './views/Creditors/AddCreditors';
import AddEmployee from './views/Employee/AddEmployee';
import PaySlip from './views/PaySlip/PaySlip';
import EditCreditor from './views/Creditors/EditCreditor';

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
        <Route path='/paySlip' Component={PaySlip}/>
        <Route path='/editCreditor' Component={EditCreditor}/>
    </Routes>
    </>
  );
}

export default App;
