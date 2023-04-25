import Callicon from "./icon/callicon";
import Rssicon from "./icon/rssicon";
import Printericon from "./icon/printericon";
import Locationicon from "./icon/locationicon";
import Inkeldicon from "./icon/inkeldnicon";
import Pinteresticon from "./icon/pinteresticon";
import Googleicon from "./icon/googleicon";
import Youtube from "./icon/youtubeicon";
import Twitter from "./icon/twittericon";
import Facebookicon from "./icon/facebookicon";
import Instaicon from "./icon/intsaicon";

const Footer = () => {
  return (
    <section className="section">
      <div className="h-[2px] w-[800px] bg-[#423B34] mt-[210px] mx-auto"></div>
      <div className="flex items-center justify-center gap-[375px] mt-[92px]">
        <div>
          <div className="flex gap-[21px]">
            <Locationicon />
            <h2 className="font-secondary font-normal text-[14px]">
              345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
            </h2>
          </div>
          <div className="flex gap-[122px] mt-[22px]">
            <div className="flex gap-[19px]">
              <Callicon />
              <p className="font-secondary font-normal text-[14px]">
                (123) 456-7890
              </p>
            </div>
            <div className="flex gap-[19px]">
              <Printericon />
              <p className="font-secondary font-normal text-[14px]">
                (123) 456-7890
              </p>
            </div>
          </div>
          <div className="flex gap-[30px] mt-[46px]">
            <p className="text-[#0A142F] font-secondary font-normal text-[14px] opacity-75">
              Social Media
            </p>
            <div className="flex items-center gap-[30px]">
              <Facebookicon />
              <Twitter />
              <Inkeldicon />
              <Youtube />
              <Instaicon />
              <Googleicon />
              <Pinteresticon />
              <Rssicon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[154px] p-7 justify-center mt-[110px] items-center">
        <div className="flex gap-[39px]">
          <p className="font-primary uppercase font-normal text-[14px]">
            About us
          </p>
          <p className="font-primary uppercase font-normal text-[14px]">
            Contact us
          </p>
          <p className="font-primary uppercase font-normal text-[14px]">Help</p>
          <p className="font-primary uppercase font-normal text-[14px]">
            Privacy Policy
          </p>
          <p className="font-primary uppercase font-normal text-[14px]">
            Disclaimer
          </p>
        </div>
        <p className="font-primary font-normal opacity-75 text-[#0A142F] text-[14px]">
          Copyright © 2020 Minimumlivingcost. All rights reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
