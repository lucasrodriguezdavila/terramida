import React from "react";

const items = [
  {
    title: 'What does You have fire do?',
    subtitle: "We work together with FIRMS (fire information for resource management system), a NASA system that monitors possible forest fires. The MODIS and VIIRS satellites manage to scan the Earth's surface every 3 hours. From these scans, pixels are generated on the Earth map, which represent thermal anomalies (a point where temperature, brightness and other factors are considered abnormal and are related to a fire) determined by a series of data processed algorithmically. These appear as red squares where it is possible, to a greater or lesser extent, that a fire is taking place at the time of the scan.",
    urlImg: './imagen1.png'
  },
  {
    title: 'How accurate is the platform?',
    subtitle: "The size of these fires varies between large, with areas of up to one kilometer or up to 50 meters in optimal conditions. The pixels only indicate a maximum area, the fire usually covers less ground and is close to the center of the red box. There are several reasons why MODIS or VIIRS may not have detected a fire: it may have started and ended between satellite observations; cloud cover, heavy smoke, or tree canopy can completely obscure a fire; occasionally the instruments do not work and they cannot observe anything during these times.",
    urlImg: './imagen3.png'
  },
  {
    title: 'Participate and collaborate',
    subtitle: "In Do you have a fire? You can leave comments about possible fire sources. The satellites may be detecting an anomaly that is actually a normal situation. We propose that you, as a citizen or institution, corroborate these facts and details if they are fires or another type of event. Users can leave comments on anomalies and others, corroborated institutions, can also confirm or deny these comments. Thus, with the support of the population, it will be possible to map the immediate situation of each person and complement the necessary information from NASA with local knowledge.",
    urlImg: './imagen2.png'
  }
]


export default function landingPage() {
  return (
    <>
      <header
        className="background-container bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./fondo1.png')" }}
      >
        <div
          className="text-center flex flex-col items-center	 h-screen gap-6 md:p-40"
          style={{ backdropFilter: " blur(3px)" }}
        >
          <h1 className=" text-3xl font-extrabold tracking-[-0.04em] text-black sm:text-5xl sm:leading-[3.5rem]">
            ¿Tenés fuego?
          </h1>
          <p className=" text-base text-gray-700  leading-7 text-slate-600s">
            ¿Tenés fuego? Es una plataforma de participación comunitaria donde
            colaboramos con información de la NASA para corroborar los datos de
            puntos calientes que reportan sus satélites.
          </p>
          <button className="w-[300px] px-10 py-2 text-gray-200 bg-purple-600 rounded-full shadow-md text-lg hover:bg-gray-800 hover:border-red">
            IR AL MAPA
          </button>
        </div>
      </header>
      <main>
        {items.map((item) => {
          return (
            <article
              key={item.urlImg}
              className=" flex flex-col	justify-center alin-items-center gap-6 w-full min-h-screen flex flex-col justify-center items-center bg-blue-900 py-12 px-20 text-center"
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
>>>>>>> 465cf19b8218272a79fe4477c62d97be3c6dc2d6
        })}
      </main>
      <footer className="w-full p-5 flex flex-col justify-center items-center bg-gray-800">
        <p>ⓒ No-Copyright - Proyect for SpaceApps - TERRAMIDA</p>
      </footer>
    </>
  );
}
