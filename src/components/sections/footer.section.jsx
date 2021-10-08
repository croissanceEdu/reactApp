import { customContent } from "../../helpers/custom";

const FooterSection = (props) => {
  return (
    <footer className="" id="footer1-32">
      <div className="">
        <p className="">
          {customContent.footer.copyrightContent}&copy;
          {customContent.footer.organizationContent}
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
