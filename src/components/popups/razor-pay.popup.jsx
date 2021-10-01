import logo from "../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png";

import axios from "axios";

const { toSmallestSubunit } = require("@coinify/currency");
// toSmallestSubunit(amount, currency)

const apiKey = process.env[process.env.REACT_APP_API_KEY_SELECT];

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const RazorPayPopup = (props) => {
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(props.paymentContent.razorpay.networkErrorMessageContent);
      return;
    }

    // creating a new order
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/payment/order/`,
      {
        amount: toSmallestSubunit(
          props.paymentSchedule.requestAmount,
          props.paymentSchedule.currency
        ),
        currency: props.paymentSchedule.currency,
      }
    );
    // const result = { data: {} };

    if (!result) {
      alert(props.paymentContent.razorpay.serverErrorMessageContent);
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;
    // console.log(result);
    const options = {
      key: apiKey, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: props.paymentContent.razorpay.nameContent,
      description: props.paymentContent.razorpay.descriptionContent,
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // console.log(response);
        const result = await props.razorpayPaymentSucess(
          props.paymentSchedule,
          data
        );
        //axios.post(
        //   "http://localhost:4000/payment/razorpaysuccess",
        //   {
        //     data,
        //     userId: props.userDetails._id,
        //     userRole: props.userDetails.role,
        //     myId: myDetails._id,
        //     myRole: myDetails.role,
        //     oppId: oppDetails._id,
        //     paymentSchedule,
        //     comment: "test",
        //     paymentMethod: "razorpay",
        //   }
        // );

        // alert(result.data.msg);
      },
      // prefill: {
      //   name: "Soumya Dey",
      //   email: "SoumyaDey@example.com",
      //   contact: "9999999999",
      // },
      // notes: {
      //   address: "Croissance Technologies",
      // },
      // theme: {
      //   color: "#61dafb",
      // },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <button className="btn primary-button" onClick={displayRazorpay}>
      {props.paymentContent.payContent}
    </button>
  );
};

export default RazorPayPopup;
