import { Provider } from 'react-redux';
import store from './redux/store';
import Src1 from './src/src1';
const App = () => (
  <Provider store={store}>
    {/* Src1 khai báo ở trên đổi thành tên gì cx đc nhưng nhớ viết hoa chữ cái đầu */}
    <Src1 /> 
  </Provider>
);
export default App;
