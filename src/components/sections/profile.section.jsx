import ProfileBasicBlock from "../blocks/profile-basic.block";

const ProfileSection = (props) => {
  return (
    <section className="profile-section container">
      <div className="container container-element">
        <h2>{props.profileContent.titleContent}</h2>
        <ProfileBasicBlock
          profileContent={props.profileContent}
          profilePicture={props.profilePicture}
          setProfilePicture={props.setProfilePicture}
        />
      </div>
    </section>
  );
};

export default ProfileSection;
