import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending..",
          message: "sending cart data",
        })
      );
      const response = await fetch(
        `https://expense-tracker1-274cd-default-rtdb.firebaseio.com/cart.json`,
        {
          method: "POST",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!!..",
            message: "sending cart data failed",
          })
        );
      }
      // const responseData = await response.json();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "successs!..",
          message: "sending cart data successfully",
        })
      );
    };
  }, [cart]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
