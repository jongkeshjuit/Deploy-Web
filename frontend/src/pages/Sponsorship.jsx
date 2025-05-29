import React from "react";

const SPONSORS = [
  {
    name: "AYUMU HIRANO",
    image:
      "https://www.uniqlo.com/jp/ja/contents/ambassador/images/ayumu_hirano.jpg",
    description:
      "Born: November 29, 1998. From: Murakami, Japan. Ayumu Hirano is a two-time gold medalist in the men’s superpipe competition at the Winter X Games and the winner of consecutive silver medals in the half pipe competition at the 2014 and 2018 Winter Olympics.",
    socials: [
      {
        label: "FACEBOOK",
        url: "https://www.facebook.com/ayumuhirano.official/",
      },
    ],
  },
  {
    name: "ROGER FEDERER",
    image:
      "https://www.uniqlo.com/jp/ja/contents/ambassador/images/roger_federer.jpg",
    description:
      "Born: August 8, 1981. From: Basel, Switzerland. Made his ATP Tour debut in 1998, and has won 20 Grand Slam singles titles, the most in history for a male player. Federer has held the world No. 1 spot in the ATP rankings a total of 310 weeks.",
    socials: [
      { label: "FACEBOOK", url: "https://www.facebook.com/Federer/" },
      { label: "INSTAGRAM", url: "https://www.instagram.com/rogerfederer/" },
    ],
  },
];

const Sponsorship = () => (
  <div>
    <h1 className="text-4xl font-bold mb-6">ĐẠI SỨ THƯƠNG HIỆU TOÀN CẦU</h1>
    <div className="mb-4 text-base">
      UNIQLO tự hào hợp tác với các vận động viên hàng đầu thế giới
      <br />
      Tin tức mới sẽ được cập nhật trên trang Facebook chính thức của UNIQLO.
    </div>
    <div className="mb-6 flex justify-end">
      <a
        href="https://www.facebook.com/uniqlo"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline text-black"
      >
        FACEBOOK
      </a>
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
                {s.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline text-black text-right"
                  >
                    {soc.label}
                  </a>
                ))}
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
