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

const FeedbackSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("historyTab");
  const [myDetails, setMyDetails] = useState(isAuth());
  const [oppDetails, setOppDetails] = useState({});
  const [receivedFeedback, setReceivedFeedback] = useState([]);
  const [sentFeedback, setSentFeedback] = useState([]);
  const [mixedFeedback, setMixedFeedback] = useState();

  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const titleName = e.target.titleName.value;
    const messageContent = e.target.messageContent.value;
    if (titleName && messageContent) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/feedback/send`, {
          titleName,
          messageContent,
          fromID: myDetails._id,
          toID: oppDetails._id,
        })
        .then((response) => {
          toast.success("Submitted successfully");
          e.target.titleName.value = "";
          e.target.messageContent.value = "";
          bindTables(myDetails._id, oppDetails._id);
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  const loadSentMessages = (myId, oppoId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/receive`, {
        fromID: myId,
        toID: oppoId,
        isSender: true,
      })
      .then((response) => {
        setSentFeedback(response.data.feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadReceivedMessages = (myId, oppoId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/receive`, {
        fromID: oppoId,
        toID: myId,
        isSender: false,
      })
      .then((response) => {
        setReceivedFeedback(response.data.newFeedback);
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
  const bindTables = (myId, oppId) => {
    loadSentMessages(myId, oppId);
    loadReceivedMessages(myId, oppId);
    // loadMixedMessages(myId, oppId);
  };
  const bindHistory = () => {
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
    return sentFeedback.map((item) => {
      return (
        <FeedbackMessageItem feedback={item} key={uuidv4()} isSender={true} />
      );
    });
  };
  const bindReceived = () => {
    return receivedFeedback.map((item) => {
      return (
        <FeedbackMessageItem feedback={item} key={uuidv4()} isSender={false} />
      );
    });
  };
  const handleUserSelect = (user) => {
    setOppDetails(user);
    bindTables(myDetails._id, user._id);
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
          />
        );

      default:
        return null;
    }
  };
  return (
    <section>
      <UserSelectorBlock
        myId={myDetails._id}
        myRole={myDetails.role}
        handleUserSelect={handleUserSelect}
        autoLoad={true}
      />
      <TabSelectorBlock
        tabWindows={props.feedbackContent.tabWindows}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {bindTabWindow()}
    </section>
  );
};

export default FeedbackSection;
