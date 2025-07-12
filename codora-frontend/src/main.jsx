import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './custom.css'

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="w-full h-full bg-gray-100 body">
        <App />
        </div>
      </PersistGate>
    </Provider>
)
