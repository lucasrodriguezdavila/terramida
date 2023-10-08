import Link from "next/link";
import React from "react";

const items = [
  {
    title: "What 'Do you have fire?' does?",
    subtitle:
      "We work together with FIRMS (fire information for resource management system) a NASA system that monitors possible forest fires. The MODIS and VIIRS satellites are able to scan the earth's surface every 3 hours. From these scans, pixels are generated on the terrestrial map, which represent thermal anomalies (a point where temperature, brightness and other factors are considered abnormal and are related to a fire) determined by a series of algorithmically processed data. These appear as red squares where it is possible, to a greater or lesser extent, that a fire is taking place at the time of the scan.",
    urlImg: "./imagen1.png",
  },
  {
    title: "How accurate is the platform?", //en-us: How accurate is the platform?
    subtitle:
      "The size of these fires varies between large, with areas of up to one kilometer or up to 50 meters under optimal conditions. The pixels only indicate a maximum area, the fire usually covers less land and is close to the center of the red box. There are several reasons why MODIS or VIIRS may not have detected a fire: it may have started and ended between satellite observations; cloud cover, dense smoke or tree canopies can completely obscure a fire; occasionally the instruments do not work and cannot observe anything during these moments.",
    urlImg: "./imagen3.png",
  },
  {
    title: "Participate and collaborate", //en-us: Participate and collaborate
    subtitle:
      "At 'Do you have fire?' you can leave comments on possible fire outbreaks. Satellites may be detecting an anomaly that actually corresponds to a normal situation. We propose that you, as a citizen or institution, corroborate these facts and details if they are fires or other type of event. Users can leave comments on the anomalies and others, the corroborated institutions, can also confirm or deny these comments. Thus, with the support of the population, it will be possible to map the situation close to each one and complement the NASA rigor information with local knowledge.",
    urlImg: "./imagen2.png",
  },
];

export default function landingPage() {
  return (
    <>
      <header
        className="background-container bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: "url('./fondo1.png')" }}
      >
        <div
          className="text-center flex flex-col items-center	 h-screen gap-6 md:p-40 p-12 pt-24 md:pt-10 "
          style={{ backdropFilter: " blur(3px)" }}
        >
          <img
            className="w-1/2 mx-auto md:w-[15%]"
            src="./logo.png"
            alt="img"
          />
          <h1 className=" text-3xl font-extrabold tracking-[-0.04em] text-black sm:text-5xl sm:leading-[3.5rem]">
            Do you have fire?
          </h1>
          <p className=" text-base text-gray-700  leading-7 text-slate-600s">
            &lsquo;Do you have fire?&lsquo; It is a community participation
            platform where we collaborate with NASA information to corroborate
            the data of hot spots reported by its satellites.
          </p>
          <Link
            className=" px-6 md:px-10 py-2 text-gray-200 bg-purple-600 rounded-full shadow-md text-lg hover:bg-gray-800 hover:border-red"
            href={"/mapa"}
          >
            Enter the platform
          </Link>
        </div>
      </header>
      <main className="w-full">
        {items.map((item) => {
          return (
            <article
              key={item.urlImg}
              className=" flex flex-col	justify-center alin-items-center gap-6 w-full min-h-screen items-center bg-blue-900 px-8 py-12 md:px-20 text-center"
            >
              <h2 className="text-[20pt] font-semibold leading-6 text-slate-100 ">
                {item.title}
              </h2>
              <img className="w-[60%]" src={item.urlImg} alt="img" />
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {item.subtitle}
              </p>
            </article>
          );
        })}
      </main>
      <footer className="w-full p-5 flex flex-col justify-center items-center bg-gray-800">
        <p>ⓒ No-Copyright - Proyecto SpaceApps - TERRAMIDA</p>
      </footer>
    </>
  );
}
