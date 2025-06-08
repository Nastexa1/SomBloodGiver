import React from "react";

const newsList = [
  {
    title: "Ololaha Dhiig-bixinta oo ka bilaabmay Muqdisho",
    date: "June 3, 2025",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    summary:
      "Ololaha dhiig-bixinta ayaa si rasmi ah uga bilowday caasimadda si loo kordhiyo wacyiga bulshada looguna ururiyo dhiig isbitaalada u baahan.",
    link: "/news/ololaha-muqdisho",
  },
  {
    title: "Ardayda Jaamacadaha oo dhiig bixis ku biiray",
    date: "May 25, 2025",
    image: "https://images.unsplash.com/photo-1588776814546-b7a9d85c7e86",
    summary:
      "Boqolaal arday ah oo ka socda jaamacadaha maxaliga ah ayaa dhiig-bixis ka sameeyay xarumaha caafimaadka, taasoo muujisay doorkooda badbaadinta nolosha.",
    link: "/news/ardayda-dhiig",
  },
  {
    title: "Xuska Maalinta Qadarin Dhiig-bixiyeyaasha",
    date: "May 10, 2025",
    image: "https://images.unsplash.com/photo-1615461066813-7ba3b26016e4",
    summary:
      "Wasaaradda caafimaadka ayaa xustay maalinta loogu talagalay dhiig-bixiyeyaasha, iyadoo la abaal-mariyay dadkii dhiig-bixinta joogtada u sameeyay.",
    link: "/news/qadarin-dhiigbixiye",
  },
  {
    title: "Bankiga Dhiigga Mobile-ka ah oo la daahfuray",
    date: "April 30, 2025",
    image: "https://images.unsplash.com/photo-1582719478250-06f37c47f9ad",
    summary:
      "Banki dhiig ah oo mobile ah ayaa la daahfuray si uu u gaaro gobollada fog-fog ee aan lahayn xarumo dhiig lagu ururiyo.",
    link: "/news/mobile-bloodbank",
  },
  {
    title: "Barnaamijka Tababarka Dhiig-qaybiyeyaasha",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1588776815073-37c2c6b6a751",
    summary:
      "Tababar gaar ah ayaa loo qabtay shaqaalaha iyo mutadawiciinta si ay u bartaan sida saxda ah ee dhiigga loo qaado si badbaado leh.",
    link: "/news/tababar-dhiig",
  },
];

function NewsPage() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-8">Wararkii Ugu Dambeeyay</h2>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
        La soco wararkii ugu dambeeyay ee la xiriira dhiig-bixinta, ololayaasha caafimaadka iyo hawlaha bulshada ee ka socda Soomaaliya.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {newsList.map((news, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-red-600 mb-2">{news.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{news.date}</p>
              <p className="text-gray-700 mb-4">{news.summary}</p>
              <a
                href={news.link}
                className="inline-block mt-2 text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
