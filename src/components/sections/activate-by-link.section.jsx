// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// import jwt from "jsonwebtoken";

const ActivateByLinkSection = () => {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     token: "",
  //     show: true,
  //   });
  //   useEffect(() => {
  //     let token = match.params.token;
  //     let name = jwt.decode(token);
  //     if (token) {
  //       setFormData({ ...formData, name, token });
  //     }
  //   }, []);

  //   const handleActivate = (e) => {
  //     e.preventDefault();
  //     axios
  //       .post(`${process.env.REACT_APP_SERVER_URL}/api/activate`, {
  //         token,
  //       })
  //       .then((res) => {
  //         setFormData({ ...formData, show: false });
  //         toast.success(res.data.message);
  //       })
  //       .catch((err) => {
  //         toast.error(err.response.data.error);
  //       });
  //   };
  return <section>This service is currentlly not available</section>;
};

export default ActivateByLinkSection;
