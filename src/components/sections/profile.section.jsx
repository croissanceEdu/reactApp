import ProfileBasicBlock from "../blocks/profile-basic.block";

const ProfileSection = (props) => {
  return (
    <section className="profile-section">
      <h2>{props.profileContent.titleContent}</h2>
      <ProfileBasicBlock profileContent={props.profileContent} />
    </section>
  );
};

export default ProfileSection;
