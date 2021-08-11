import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "../../helpers/auth";
import TabSelectorBlock from "../blocks/tab-selector.block";
import UserSelectorBlock from "../blocks/user-selector.block";
import FeedbackNewTab from "../tabs/feedback-new.tab";
import FeedbackHistoryTab from "../tabs/feedback-history.tab";
import FeedbackReceivedTab from "../tabs/feedback-received.tab";
import FeedbackSentTab from "../tabs/feedback-sent.tab";
import FeedbackMessageItem from "../items/feedback-message.item";
import { Add } from "@material-ui/icons";
import { manageWebSocketSendNotification } from "../../helpers/websocket-helper";

const FeedbackSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("historyTab");
  const [myDetails, setMyDetails] = useState(props.userDetails);
  const [oppDetails, setOppDetails] = useState({ studentMap: {} });
  const [receivedFeedback, setReceivedFeedback] = useState([]);
  const [sentFeedback, setSentFeedback] = useState([]);
  const [mixedFeedback, setMixedFeedback] = useState();
  const [formData, setFormData] = useState({ title: "", content: "" });
  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const titleName = formData.title;
    const messageContent = formData.content;
    if (titleName && messageContent) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/feedback/send`, {
          titleName,
          messageContent,
          fromID: myDetails._id,
          toID: oppDetails._id,
          studentMapID: oppDetails.studentMap._id,
        })
        .then((response) => {
          toast.success("Submitted successfully");
          setFormData({ title: "", content: "" });
          bindTables(myDetails._id, oppDetails._id, oppDetails.studentMap._id);
          setSelectedTab("historyTab");
          manageWebSocketSendNotification(myDetails);
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  const loadSentMessages = (myId, oppoId, mapId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/receive`, {
        fromID: myId,
        toID: oppoId,
        isSender: true,
        studentMapID: mapId,
      })
      .then((response) => {
        setSentFeedback(response.data.feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadReceivedMessages = (myId, oppoId, mapId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/receive`, {
        fromID: oppoId,
        toID: myId,
        isSender: false,
        studentMapID: mapId,
      })
      .then((response) => {
        setReceivedFeedback(response.data.newFeedback);
        props.notify(); //commented for socket test
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const loadMixedMessages = (myId, oppoId) => {
  //   axios
  //     .post(`${process.env.REACT_APP_SERVER_URL}/feedback/history`, {
  //       myId,
  //       oppoId,
  //     })
  //     .then((response) => {
  //       setMixedFeedback(response.data.feedback);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const bindTables = (myId, oppId, mapId) => {
    loadSentMessages(myId, oppId, mapId);
    loadReceivedMessages(myId, oppId, mapId);
    // loadMixedMessages(myId, oppId);
  };
  const bindHistory = () => {
    if (!(sentFeedback.length || receivedFeedback.length))
      return <p className="empty-p">Empty</p>;
    return sentFeedback
      .concat(receivedFeedback)
      .sort((a, b) => (a._id > b._id ? -1 : b._id > a._id ? 1 : 0))
      .map((item) => {
        return (
          <FeedbackMessageItem
            feedback={item}
            key={uuidv4()}
            isSender={item.fromID === myDetails._id}
          />
        );
      });
  };
  const bindSent = () => {
    if (!sentFeedback.length) return <p className="empty-p">Empty</p>;
    return sentFeedback.map((item) => {
      return (
        <FeedbackMessageItem feedback={item} key={uuidv4()} isSender={true} />
      );
    });
  };
  const bindReceived = () => {
    if (!receivedFeedback.length) return <p className="empty-p">Empty</p>;
    return receivedFeedback.map((item) => {
      return (
        <FeedbackMessageItem feedback={item} key={uuidv4()} isSender={false} />
      );
    });
  };
  // const autoRefresh = () => {
  //   if (
  //     props.notifications.feedback.filter(
  //       (el) =>
  //         el.fromID === oppDetails._id &&
  //         el.studentMapID === oppDetails.studentMap._id
  //     ).length > 0
  //   ) {
  //     loadReceivedMessages(
  //       myDetails._id,
  //       oppDetails._id,
  //       oppDetails.studentMap._id
  //     );
  //     // console.log("received");
  //   }
  // };
  // // autoRefresh();

  const handleUserSelect = (user) => {
    setOppDetails(user);
    setSelectedTab("historyTab");
    bindTables(myDetails._id, user._id, user.studentMap._id);
  };
  const handleRefresh = () => {
    bindTables(myDetails._id, oppDetails._id, oppDetails.studentMap._id);
  };
  const bindTabWindow = () => {
    switch (selectedTab) {
      case "historyTab":
        return (
          <FeedbackHistoryTab
            feedbackContent={props.feedbackContent}
            bindHistory={bindHistory}
          />
        );
      case "receivedTab":
        return (
          <FeedbackReceivedTab
            feedbackContent={props.feedbackContent}
            bindReceived={bindReceived}
          />
        );
      case "sentTab":
        return (
          <FeedbackSentTab
            feedbackContent={props.feedbackContent}
            bindSent={bindSent}
          />
        );
      case "newFeedbackTab":
        return (
          <FeedbackNewTab
            feedbackContent={props.feedbackContent}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        );

      default:
        return null;
    }
  };
  return (
    <section className="feedback-section">
      <div className="navbar-spacer"></div>
      <UserSelectorBlock
        myId={myDetails._id}
        myRole={myDetails.role}
        handleUserSelect={handleUserSelect}
        autoLoad={true}
        selectedPage={"feedbackPage"}
        notifications={props.notifications}
        handleRefresh={handleRefresh}
        onlineUsers={props.onlineUsers}
      />
      <div className="tab-section">
        <TabSelectorBlock
          tabWindows={props.feedbackContent.tabWindows}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isAvailable={oppDetails}
          unAvailableMessage="Select one from the list"
        />
        {bindTabWindow()}
        {oppDetails._id && selectedTab !== "newFeedbackTab" && (
          <div className="add-new-round-button-block">
            <button
              className="add-new-round-button add-button"
              onClick={() => {
                setSelectedTab("newFeedbackTab");
              }}
            >
              <Add />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection;
