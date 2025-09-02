import React from "react";
import image from "/img/Image_fx (30).jpg";
import image1 from "/img/Image_fx (31).jpg";
import image2 from "/img/Image_fx (29).jpg";
import image3 from "/img/Image_fx (37).jpg";
import image5 from "/img/Image_fx (40).jpg";
import image6 from "/img/Image_fx (39).jpg";

const stories = [
  {
    name: "Mohamed Ali",
    image: image,
    story:
      "After a terrible accident, Mohamed received an emergency blood transfusion that saved his life. He now encourages others to donate.",
  },
  {
    name: "Amina Abdi",
    image: image1,
    story:
      "Amina suffered major complications during childbirth, but thanks to timely blood donations, she survived and recovered fully.",
  },
  {
    name: "Layla Osman",
    image: image2,
    story:
      "Layla battled leukemia and needed frequent transfusions. The generosity of donors gave her a second chance at life.",
  },
  {
     name: "Nasra Ismail",
    image: image3,
    story:"After undergoing chemotherapy, Nasra relied on blood transfusions to stay strong. She now raises awareness about donation.",

  },
  {
    name: "Abdirahman Yusuf",
    image:image5,
    story:    "Abdirahman was critically injured in a car crash. Blood from donors helped him recover and return to university.",

  },
  {
    name: "Said Ahmed",
    image:image6,
    story:
      "Said suffered internal bleeding from a surgery. A donor's blood helped stabilize his condition and brought him back to health.",
  },
];

function SuccessStories() {
  return <>
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
        Success Stories
      </h2>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
        Read about our inspiring donors who changed lives through blood
        donation. Each story is a reminder that every drop counts.
      </p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
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
   
    </>
}

export default SuccessStories;
