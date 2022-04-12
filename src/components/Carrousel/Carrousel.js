// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

const Carrousel = () => {
    const data = [
        {
            "title": "titulo 1",
            "description": "desciption 1 desciption 1 desciption 1 desciption 1  vdesciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1desciption 1",
            "img": "https://www.hola.com/imagenes/cocina/escuela/200907079224/temperatura/vinos/enologia/0-876-296/temperatura-adobe-t.jpg?filter=w600",
            "alt": "primer foto"
        },
        {
            "title": "titulo 2",
            "description": "desciption 2",
            "img": "https://www.cronista.com/files/image/346/346068/610b207323724.jpg",
            "alt": "segunda foto"
        },
        {
            "title": "titulo 3",
            "description": "desciption 3",
            "img": "https://http2.mlstatic.com/D_NQ_NP_787687-MLA44992858484_022021-O.jpg",
            "alt": "tercera"
        }
    ]
    return (
        <main className="container--main">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data.map((dato, i) =>
                    <SwiperSlide key={i}>
                        <img className="image" src={`${dato.img}`} alt={`${i}`} />
                    </SwiperSlide>
                )}
            </Swiper>
        </main>
    )
}

export default Carrousel