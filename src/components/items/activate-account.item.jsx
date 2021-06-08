import axios from "axios";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";

const ActivateAccountItem = (props) => {
  const userData = props.activationLinkDetails;

  const handleActivate = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/activate`, {
        _id: userData._id,
        token: userData.token,
        adminId: isAuth()._id,
      })
      .then((res) => {
        props.DeleteActivationLink(userData._id);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/cancel`, {
        _id: userData._id,
        reason: "Admin Cancelled",
        adminId: isAuth()._id,
      })
      .then((res) => {
        props.DeleteActivationLink(userData._id);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  return (
    <li>
      <div className="details">
        <h2>{userData.name}</h2>
        <h3>{userData.email}</h3>
        <div className="action-buttons">
          <button onClick={handleActivate} className="btn btn-primary">
            Activate
          </button>
          <button onClick={handleCancel} className="btn btn-warning">
            Cancel
          </button>
        </div>
      </div>
      <p>
        <span>Registered as </span>
        {userData.role}
      </p>
    </li>
  );
};

export default ActivateAccountItem;
