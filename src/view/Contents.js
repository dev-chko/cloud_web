import react, { useEffect } from "react";
import Contactus from "../components/contents/Contactus";
import Download from "../components/contents/Download";
import Faq from "../components/contents/Faq";
// import GrinbitEditor from "../components/contents/GrinbitEditor";
import Notice from "../components/contents/Notice";
import Service from "../components/contents/Service";
import ChargePlans from "../components/contents/ChargePlans";

const Contents = () => {
  const scrollToComponent = () => {
    let id = window.location.hash.replace("#", "");
    if (id.length > 0) {
      let element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToComponent();
    }, 200);
  }, []);

  return (
    <div className="container justify-center">
      <Service />
      <ChargePlans />
      <Notice />
      <Faq />
      {/* <GrinbitEditor onChange={setBody} value={body} /> */}
      <Download />
      <Contactus />
    </div>
  );
};

export default Contents;
