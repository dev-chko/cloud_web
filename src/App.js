import Navigation from "./view/Navigation";
import Footer from "./view/Footer";
import Contents from "./view/Contents";
import { Routes, Route, Link } from "react-router-dom";
import SignIn from "./view/Signin";
import SignUp from "./view/Signup";
import NotFound from "./view/NotFound";
import Fixed from "./view/MaintenanceMod";
import UserInfo from "./view/Mypage";
import { ChakraProvider } from "@chakra-ui/react";
import ChargeHistory from "./view/mypage/ChargeHistory";
import UseHistory from "./view/mypage/UseHistory";
import Inquiry from "./view/mypage/Inquiry";
import Payment from "./view/Payment";
import Refound from "./components/contents/Refound";
import SalesTotal from "./view/mypage/salesTotal";

import { theme } from "./theme";

import { useUser } from "./auth/useUser";

function App(props) {
  const { user } = useUser();
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<Navigation />}>
          {user != null ? (
            <>
              {user.role === "manager" || user.role === "admin" ? (
                <>
                  <Route path="user" element={<UserInfo />} />
                  <Route path="recharge" element={<ChargeHistory />} />
                  <Route path="usagehistory" element={<UseHistory />} />
                  <Route path="inquiry" element={<Inquiry />} />
                  <Route path="payment" element={<Payment />} />
                  <Route path="salesTotal" element={<SalesTotal />} />
                  <Route path="*" element={<NotFound />} />
                </>
              ) : (
                <>
                  {/* <Route path="/" element={<Contents />} /> */}
                  <Route path="user" element={<UserInfo />} />
                  <Route path="recharge" element={<ChargeHistory />} />
                  <Route path="usagehistory" element={<UseHistory />} />
                  <Route path="inquiry" element={<Inquiry />} />
                  <Route path="payment" element={<Payment />} />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </>
          ) : (
            <>
              {/* <Route path="/" element={<Contents />} /> */}
              <Route path="*" element={<SignIn />} />
            </>
          )}
          <Route path="/" element={<Contents />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="refound" element={<Refound />} />
        </Route>

        {/* <Route path="/" element={<Contents />} /> */}
      </Routes>
    </ChakraProvider>
  );
}

export default App;
