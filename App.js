import { useState, useReducer } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";// components imports
import {db} from "./App.test";
// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"; 

// Add a new document with a generated id


const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses]
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }
    case "UPDATE_EXPENSE": {
      const expensesDuplicate = state.expenses;
      expensesDuplicate[payload.expensePos] = payload.expense;
      return {
        expenses: expensesDuplicate
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const [newCityRef,setNew]=useState({});
  
  const addExpense = async (expense) => {
    // add expense to firestore here
    if(!expenseToUpdate){
       const temp = doc(collection(db, "expense"));
       

// later...
   await setDoc(temp,expense);
// import firebase methods here
    setExpenseToUpdate(expense);
    
    }
  
    
    dispatch({
      type: "ADD_EXPENSE",
      // add the new document id to the payload expense object below
      payload: { expense: { ...expense } }
    });
    toast.success("Expense added successfully.");
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const resetExpenseToUpdate = () => {
    setExpenseToUpdate(null);
  };

  const updateExpense = async (expense) => {
    const expensePos = state.expenses
      .map( (exp,i)=> {
     if(expense.id === exp.id){
      return i;
     }
      })
      

    if (expensePos === -1) {
      return false;
    }

    

// 


    dispatch({ type: "UPDATE_EXPENSE", payload: { expensePos, expense } });
    toast.success("Expense updated successfully.");
//     const docRef = doc(db, "expense", expense.id);
//      updateDoc(docRef, data)
// .then(docRef => {
//     console.log("A New Document Field has been added to an existing document"); })
//  .catch(error => {
//      console.log(error);
// })
 };

  return (
    <>
      <ToastContainer />
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpense={updateExpense}
          resetExpenseToUpdate={resetExpenseToUpdate}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={setExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
