
import './assets/styles.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login'
import Chat from './components/Chats'
import { AuthContextProvider } from './contexts/AuthContext';


const App = () => {

//   return (
//     <> 
//     <span>The WebSocket is currently {connectionStatus}</span>

//    <input
//   name="name"
//   placeholder='Name'
//   onChange={handleChangeName}
//   value={name}
//   className="shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"/>
// <input
//   name="message"
//   placeholder='Message'
//   onChange={handleChangeMessage}
//   value={message}
//   className="ml-2 shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"/>
// <button className='ml-3 bg-gray-300 px-3 py-1' onClick={handleSubmit}>
//   Submit
// </button>

// <hr />
// <ul>
//   {messageHistory.map((message, idx) => (
//     <div className='border border-gray-200 py-3 px-3' key={idx}>
//       {message.name}: {message.message}
//     </div>
//   ))}
// </ul>
//     </>
//   )

  return (
    <BrowserRouter>
      <Routes>
          <Route path="" 
          element={
            <AuthContextProvider>
              <Chat />
            </AuthContextProvider>
        } 
          
          />
          <Route path="login" element={
            <AuthContextProvider>
              <Login />
            </AuthContextProvider>

          } />
      </Routes>
    </BrowserRouter>
  );
}
export default App
