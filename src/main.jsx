import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./redux/store/store";
import './index.css';
import App from './App';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error("Root element not found");
}



