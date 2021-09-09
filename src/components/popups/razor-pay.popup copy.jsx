//  import Razorpay from require("razorpay");

const loadRazorPayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
// import Razorpay from "https://checkout.razorpay.com/v1/checkout.js";

// const isDev = document.domain === "localhost";
const isDev = true;

const RazorPayPopup = (props) => {
  const displayRazorPay = () => {
    var options = {
      key: isDev
        ? process.env.REACT_APP_TEST_API_KEY
        : process.env.REACT_APP_LIVE_API_KEY,
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // debugger;
    var rzp1 = new Razorpay(options);
    // rzp1.on("payment.failed", function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });
    // document.getElementById("rzp-button1").onclick = function (e) {
    //   rzp1.open();
    //   e.preventDefault();
    // };
  };

  const showRazorPay = () => {
    const res = loadRazorPayScript();
    if (!res) {
      alert("Can't load Razorpay");
    }
    displayRazorPay();
  };

  return <button onClick={showRazorPay}>RazorPay</button>;
};

export default RazorPayPopup;
