import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

const ImageSlider = () => {
  const images = [
    "https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png",
    "https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg",
    "https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg",
    "https://subiz.com.vn/blog/wp-content/uploads/2022/10/chatbot-ho-tro-con-nguoi-e1665570278987.jpg",
  ];

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="welcome-text homemain">
      <h1>
        Chào mừng bạn đã đến với{" "}
        <span style={{ color: "white" }}>BKConnect</span>
      </h1>
      <p>
        Khám phá những tiện ích hỗ trợ làm việc, quản lý tệp tin và trò chuyện
        cùng người thân, bạn bè của bạn
      </p>
      <div style={{ width: "600px", height: "400px", margin: "20px" }}>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index}`} style={{ width: "100%" }} />
            </div>
          ))}
        </Slider>
      </div>
      <p>
        Hãy tìm kiếm kết nối với mọi người ung quanh và cùng trải nghiệm{" "}
        <span style={{ color: "white" }}>BKConnect</span> nhé!
      </p>
    </div>
  );
};

export default ImageSlider;
