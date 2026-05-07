import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import AddMarks from "./components/AddMarks";


export default function App() {
  <div>
    <AddMarks />
  </div>
  return <RouterProvider router={router} />;


}
