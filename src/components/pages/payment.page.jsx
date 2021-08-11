import { useEffect } from "react";
import { Redirect } from "react-router";
import { getPaymentContent } from "../../helpers/content-api";
import PaymentSection from "../sections/payment.section";

const PaymentPage = (props) => {
  useEffect(() => {
    props.setselectedPage("paymentPage");
  }, [props]);
  if (
    props.userDetails &&
    props.hasPageAccess("paymentPage", props.userDetails.role, props.language)
  )
    return (
      <PaymentSection
        paymentContent={getPaymentContent(props.language)}
        notifications={props.notifications}
        notify={props.notify}
        userDetails={props.userDetails}
        popupFunctions={props.popupFunctions}
        onlineUsers={props.onlineUsers}
      />
    );
  else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default PaymentPage;
