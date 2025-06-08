// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-10 bg-gray-50 min-h-screen mt-30">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-6">About</h1>

        <p className="text-lg text-gray-700 mb-6">
          BloodDonner waa nidaam casri ah oo fududeynaya isku xirka dadka u baahan dhiig iyo kuwa diyaar u ah in ay dhiig bixiyaan. Ujeeddadayadu waa badbaadinta nolosha dadka iyada oo la adeegsanayo xal teknolojiyad sare leh.
        </p>

        <p className="text-gray-700 mb-4">
          Barnaamijkan wuxuu awood u siinayaa isdiiwaangelinta dadka dhiig-bixiyeyaasha ah, raadinta dadka u baahan dhiig ku dhow, iyo isgaarsiinta degdega ah ee u dhaxeysa dhinacyada.
        </p>

        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Diiwaangelin fudud oo dadka dhiig-bixiyeyaasha ah.</li>
          <li>Raadinta dadka u baahan dhiig ee ku dhow deegaankaaga.</li>
          <li>Ogeysiisyo degdeg ah iyo xiriir toos ah.</li>
          <li>Maamulka xogta dadka iyo taariikhda dhiig bixinta.</li>
        </ul>

        <div className="mt-10 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-red-500 mb-3">Himiladeena</h2>
          <p className="text-gray-700">
            Waxaan ku dadaaleynaa in aan abuurno bulsho u heellan badbaadinta nolosha dadka, iyada oo loo marayo dhiig bixin iskaa ah oo nidaamsan, hufan, isla markaana ammaan ah.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
