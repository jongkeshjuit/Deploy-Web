import React from "react";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";

const SPONSORS = [
  {
    name: "TRỊNH TRẦN PHƯƠNG TUẤN (JACK)",
    image:
      "https://cdnphoto.dantri.com.vn/BWnuv5garDlUBKjRSZrItt4qfWk=/thumb_w/1020/2025/05/26/jack1-1748272770861.jpg",
    description:
      "Sinh ngày 12/04/1997, quê Bến Tre, Việt Nam. Jack là ca sĩ, nhạc sĩ nổi tiếng với nhiều bản hit và đạt nhiều giải thưởng lớn trong làng nhạc Việt.",
    socials: [
      {
        label: "FACEBOOK",
        url: "https://www.facebook.com/jackphuongtuan.official/",
      },
      {
        label: "YOUTUBE",
        url: "https://www.youtube.com/c/J97Official",
      },
      {
        label: "INSTAGRAM",
        url: "https://www.instagram.com/jackj97/",
      },
    ],
  },
  {
    name: "ĐẶNG TIẾN HOÀNG (VIRUSS)",
    image:
      "https://th.bing.com/th/id/OIP.p0zYlMV4xYqqLoY90GsbBAHaD4?w=320&h=180&c=7&r=0&o=5&cb=iwc2&dpr=1.4&pid=1.7",
    description:
      "Sinh ngày 01/05/1990, quê Hà Nội, Việt Nam. ViruSs là streamer, nhạc sĩ, nhà sản xuất âm nhạc nổi tiếng, có sức ảnh hưởng lớn trong cộng đồng mạng Việt Nam.",
    socials: [
      { label: "FACEBOOK", url: "https://www.facebook.com/viruss.official/" },
      { label: "YOUTUBE", url: "https://www.youtube.com/c/ViruSsOfficial/" },
      { label: "INSTAGRAM", url: "https://www.instagram.com/viruss.official/" },
    ],
  },
  {
    name: "PHẠM THOẠI",
    image:
      "https://gamehow.net/upload/suckhoe_post/images/2023/03/03/643/pham-thoai-7.jpg",
    description:
      "Sinh ngày 16/01/1996, quê Hải Phòng, Việt Nam. Phạm Thoại là TikToker, KOL nổi tiếng với phong cách hài hước, sáng tạo và có sức ảnh hưởng lớn trên mạng xã hội.",
    socials: [
      {
        label: "FACEBOOK",
        url: "https://www.facebook.com/PhamThoai.Official/",
      },
      { label: "YOUTUBE", url: "https://www.youtube.com/@phamthoai" },
      {
        label: "INSTAGRAM",
        url: "https://www.instagram.com/phamthoai.official/",
      },
    ],
  },
  {
    name: "NGUYỄN THÚC THUỶ TIÊN (THUỶ TIÊN)",
    image:
      "https://xinhstar.vn/wp-content/uploads/2021/12/xinhstar-nhan-sac-doi-thuong-cua-hoa-hau-hoa-binh-quoc-te-nguyen-thuc-thuy-tien2.jpg",
    description:
      "Sinh ngày 12/08/1998, quê TP. Hồ Chí Minh, Việt Nam. Nguyễn Thúc Thùy Tiên là Hoa hậu Hòa bình Quốc tế 2021, nổi tiếng với các hoạt động thiện nguyện và truyền cảm hứng tích cực cho giới trẻ.",
    socials: [
      { label: "FACEBOOK", url: "https://www.facebook.com/thuytienofficial/" },
      { label: "YOUTUBE", url: "https://www.youtube.com/@thuytienofficial" },
      {
        label: "INSTAGRAM",
        url: "https://www.instagram.com/thuytienofficial/",
      },
    ],
  },
  {
    name: "QUANG LINH VLOG",
    image:
      "https://tudienwiki.com/wp-content/uploads/2023/04/300095820_500185375441609_5755206151203271073_n.jpg",
    description:
      "Sinh ngày 11/12/1997, quê Nghệ An, Việt Nam. Quang Linh là YouTuber nổi tiếng với các hoạt động thiện nguyện tại châu Phi, truyền cảm hứng tích cực đến cộng đồng.",
    socials: [
      {
        label: "FACEBOOK",
        url: "https://www.facebook.com/quanglinhvlogafrica/",
      },
      { label: "YOUTUBE", url: "https://www.youtube.com/@quanglinhvlog" },
      { label: "INSTAGRAM", url: "https://www.instagram.com/quanglinhvlog/" },
    ],
  },
];

const Sponsorship = () => (
  <div>
    <h1 className="text-4xl font-bold mb-6">ĐẠI SỨ THƯƠNG HIỆU</h1>
    <div className="mb-4 text-base">
      WUKUDADA tự hào hợp tác với các KOL hàng đầu Việt Nam
      <br />
    </div>

    <div className="divide-y">
      {SPONSORS.map((s, idx) => (
        <div
          key={s.name}
          className="py-8 flex flex-col md:flex-row gap-6 items-start"
        >
          <img
            src={s.image}
            alt={s.name}
            className="w-48 h-48 object-cover rounded mb-4 md:mb-0"
          />
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold mb-2 md:mb-0">{s.name}</h2>
              <div className="flex flex-col md:items-end gap-1">
                {s.socials.map((soc) => {
                  let Icon = null;
                  if (soc.label === "FACEBOOK") Icon = FaFacebookSquare;
                  if (soc.label === "YOUTUBE") Icon = FaYoutube;
                  if (soc.label === "INSTAGRAM") Icon = FaInstagram;
                  return (
                    <a
                      key={soc.label}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black text-2xl hover:text-blue-600 flex items-center gap-2"
                      title={soc.label}
                    >
                      {Icon && <Icon />}
                      <span className="sr-only">{soc.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 text-base text-black">{s.description}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Sponsorship;
