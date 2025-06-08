import React from "react";

const stories = [
  {
    name: "Amina Abdi",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    story: "Amina saved a child's life by donating blood during an emergency. Her courage and kindness inspired her whole community.",
  },
  {
    name: "Mohamed Ali",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    story: "Mohamed donates blood every three months. His dedication helped over 10 patients in need.",
  },
  {
    name: "Layla Osman",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    story: "After her recovery, Layla started donating blood regularly. Her journey is an inspiration to many survivors.",
  },
  {
    name: "Hassan Noor",
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a",
    story: "Hassan’s consistent donations over 5 years have helped save dozens of lives across the country.",
  },
  {
    name: "Fatima Hassan",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    story: "Fatima became a donor after her brother survived a surgery thanks to blood donors. Now she gives back with every opportunity.",
  },
  {
    name: "Abdirahman Yusuf",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    story: "Abdirahman encourages his university friends to join blood donation campaigns and help the nation.",
  },
  {
    name: "Nasra Ismail",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    story: "Nasra once needed blood after an accident. Now she’s on a mission to save others through her donations.",
  },
  {
    name: "Said Ahmed",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    story: "Said volunteers and donates at every major drive. His passion has motivated others to become regular donors.",
  },
];

function SuccessStories() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
        Success Stories
      </h2>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
        Read about our incredible donors who changed lives through blood
        donation. Each story reminds us that every drop counts.
      </p>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {stories.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-red-600">{item.name}</h3>
              <p className="text-gray-700 mt-2 text-sm">{item.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuccessStories;
