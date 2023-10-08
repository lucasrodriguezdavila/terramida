import React from 'react'

const items=[
  {
    title: '¿Qué hace Tenés fuego?',
    subtitle: 'Trabajamos en conjunto con FIRMS (fire information for resource management system) un sistema de la NASA que monitorea posibles incendios forestales. Los satélites MODIS y VIIRS logran escanear la superficie terrestre cada 3 horas. De estos escaneos se generan píxeles sobre el mapa terráqueo, que representan anomalías térmicas (un punto donde la temperatura, el brillo y otros factores son considerados anormales y son relacionados a un incendio) determinadas por una serie de datos tratados algorítmicamente. Estos aparecen como cuadrados rojos dónde es posible, en mayor o menor medida, que un incendio se esté llevando a cabo al momento del escaneo.',
    urlImg: './imagen1.png'
  },
  {
    title: '¿Qué tan precisa es la plataforma?',
    subtitle: 'El tamaño de estos incendios varía entre grandes, con áreas de hasta un kilómetro o hasta 50 metros en condiciones óptimas. Los píxeles sólo indican un área máxima, el fuego suele cubrir menos terreno y estar próximo al centro del recuadro rojo. Hay varias razones por las que MODIS o VIIRS pueden no haber detectado un incendio: el mismo puede haber comenzado y terminado entre observaciones satelitales; la cobertura de nubes, el humo denso o las copas de los árboles pueden oscurecer completamente un incendio; ocasionalmente los instrumentos no funcionan y no pueden observar nada durante estos momentos.',
    urlImg: ''
  },
  {
    title: 'Participá y colaborá ',
    subtitle: 'En ¿Tenés fuego? podés dejar comentarios sobre los posibles focos de incendio. Puede que los satélites estén detectando una anomalía que corresponde en realidad una situación normal. Proponemos que vos, como ciudadano o institución, corrobores estos hechos y detalles si se tratan de incendios u otro tipo de evento. Los usuarios pueden dejar comentarios en las anomalías y otros, las instituciones corroboradas, pueden también confirmar o negar estos comentarios. Así, con el apoyo de la población, se podrá hacer un mapeo de la situación cercana de cada uno y complementar la información de rigor de la NASA con conocimiento local.',
    urlImg: ''
  }
]



export default function landingPage() {
  return (
    <>
      <header className='background-container bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('./fondo1.png')" }}>
      <div className="text-center flex flex-col items-center	 h-screen gap-6 p-40"
       style={{backdropFilter:' blur(3px)'}}>
        <h1 className=" text-3xl font-extrabold tracking-[-0.04em] text-black sm:text-5xl sm:leading-[3.5rem]">¿Tenés fuego?</h1>
        <p className=' text-base text-gray-700  leading-7 text-slate-600s'>¿Tenés fuego? Es una plataforma de participación comunitaria donde colaboramos con información de la NASA para corroborar los datos de puntos calientes que reportan sus satélites.</p>
        <button className='w-[300px] px-10 py-2 text-gray-200 bg-purple-600 rounded-full shadow-md text-lg hover:bg-gray-800 hover:border-red'>IR AL MAPA</button>
      
      </div>
      </header>
      <main>
        {items.map(item => {
          return <article className=' flex flex-col	justify-center alin-items-center gap-6 w-full min-h-screen flex flex-col justify-center items-center bg-blue-900 py-12 px-20 text-center'> 
                  <h2 className='text-[20pt] font-semibold leading-6 text-slate-100 '>{item.title}</h2>
                  <img className='w-[60%]' src={item.urlImg} alt='img' />
                  <p className='mt-2 text-sm leading-6 text-slate-200'>{item.subtitle}</p>
                </article>
        })}
      </main>
      <footer className="w-full p-5 flex flex-col justify-center items-center bg-gray-800">
        <p>ⓒ No-Copyright - Proyecto SpaceApps - TERRAMIDA</p>
      </footer>
    </>
  )
}
