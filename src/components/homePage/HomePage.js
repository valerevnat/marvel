import './homePage.scss';

const HomePage = () => {
    const img = [
        {name: 'https://img2.akspic.ru/previews/9/2/0/7/6/167029/167029-prizrachnyj_vsadnik-komiksy_marvel-betmen_2016_111-johnathon_blaze-zheleznyj_chelovek-360x640.jpg',
        descr: 'prizrachnyj_vsadnik'},
        {name: 'https://img2.akspic.ru/previews/1/1/9/6/6/166911/166911-tanos-chelovek_pauk-superzlodej-komiksy_marvel-zlodej-360x640.jpg',
        descr: 'tanos'},
        {name: 'https://img3.akspic.ru/previews/9/3/4/6/6/166439/166439-chudo_sorvigolova-mett_merdok-kinovselennaya_marvel-komiksy_marvel-chudesa_netflix_teleserial-360x640.jpg',
        descr: 'chudo_sorvigolova'},
        {name: 'https://img2.akspic.ru/previews/0/8/6/6/6/166680/166680-yad_2003_10-yad-weying_enn-eddi_brok-filosofiya_yada-360x640.jpg',
        descr: 'yad'},
        {name: 'https://img1.akspic.ru/previews/0/3/0/7/6/167030/167030-kapitan_amerika-kapitan_gidra-agent_ssha-natasha_romanoff-chernaya_pantera-360x640.jpg',
        descr: 'kapitan_amerika'},
        {name: 'https://img1.akspic.ru/previews/7/2/2/5/6/165227/165227-dzhejms_rods-cifrovoe_iskusstvo-komiksy_marvel-supergeroj-svet-360x640.jpg',
        descr: 'dzhejms_rods'},
        {name: 'https://img3.akspic.ru/previews/2/2/5/4/6/164522/164522-dzhin_grej-ciklop-komiksy_marvel-lyudi_v_prirode-priroda-360x640.jpg',
        descr: 'dzhin_grej'},
        {name: 'https://img3.akspic.ru/previews/2/3/6/0/5/150632/150632-komiks-voda-venom_protiv_karnazh-glaz-simbiont-360x640.jpg',
        descr: 'venom'}
    ]

    const elements = img.map((item, i) => {
        const {name, descr} = item;
        return (
            <div className="child" 
                 key={i}>
                <img src={name} alt={descr} />
            </div>
        )
    })


    return (
        <div className="parent">
            {elements}            
        </div>  
    )
}

export default HomePage;




