import "./App.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Sms from "./pages/sms/Sms";
import Login from "./pages/auth/login/Login";
import Main from "./pages/main/Main";

function App() {
  return (

    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/user/:userId" element={<User />}></Route>
        <Route path="/newUser" element={<NewUser />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/product/:productId" element={<Product />}></Route>
        <Route path="/newproduct" element={<NewProduct />}></Route>
        <Route path="/sms" element={<Sms />}></Route>
        <Route path="*" element={<Home />}>
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
