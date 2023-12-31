import './App.css';
import AppBar from './views/AppBar';
import Dashboard from './views/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Employee from './views/Employee/Employee';
import Creditors from './views/Creditors/Creditors';
import AddCreditors from './views/Creditors/AddCreditors';
import AddEmployee from './views/Employee/AddEmployee';
import PaySlip from './views/PaySlip/PaySlip';
import EditCreditor from './views/Creditors/EditCreditor';
import login from './views/login';
import AddCreditorAmount from './views/Creditors/AddCreditorAmount';
import TransactionReport from './views/report/TransactionReport';

function App() {
  return (
    <>
    <div className="App">
      <AppBar />
      
    </div>
    <ToastContainer position="top-center" />
    <Routes>
        <Route path='/' Component={login}></Route>
        <Route path='/Dashboard' Component={Dashboard} />
        <Route path='/employee' Component={Employee} />
        <Route path='/creditors' Component={Creditors} />
        <Route path='/addCreditor' Component={AddCreditors} />
        <Route path='/addEmployee' Component={AddEmployee}/>
        <Route path='/paySlip' Component={PaySlip}/>
        <Route path='/editCreditor/:id' Component={EditCreditor}/>
        <Route path='/addCreditorAmount/:id' Component={AddCreditorAmount}/>
        <Route path='/transactionReport' Component={TransactionReport}/>
    </Routes>
    </>
  );
}

export default App;
