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
  return (
    <li>
      <h2>
        Name: <b>{userData.name}</b>
      </h2>
      <h2>
        email: <b>{userData.email}</b>
      </h2>
      <h2>{userData.role}</h2>
      <button onClick={handleActivate} className="btn btn-primary">
        Activate
      </button>
      <button
        onClick={() => props.DeleteActivationLink(userData._id)}
        className="btn btn-warning"
      >
        Cancel
      </button>
    </li>
  );
};

export default ActivateAccountItem;
