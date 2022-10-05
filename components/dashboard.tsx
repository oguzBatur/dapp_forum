import { ReactComponentElement, useState } from "react";
import Link from "next/link";
import { Menu } from "react-daisyui";


const Dashboard = () => {
    
    const placeHolderTopics = [
        "çok önemli birşeyler oldu",
        "daha önemli şeylerde olabilirmiş gibime geldi",
        "beklemiyordum bu insanların böyle olmasını aslında",
        "alıştım bu saatlerde uyanmaya 11 de uyanıyorum normalde",
        "rahat takılmak istiyorum ama uyu geç işte boşver",
        "uzun süre rahat olmicaz o yüzden değer",
        "çok önemli birkaç şey daha olmuş gibi",
    ];
    
    const [toggleBar, setToggleBar] = useState(true);

    function toggleSideBar() {
        setToggleBar(!toggleBar);
        
    }
    
    function mapTopics() {
        return placeHolderTopics.map((val, ind) => {
            return <Menu.Item className="w-full" id={ind.toString()}>
                        <Link  href={val}  >
                            <p title={val}className="overflow-ellipsis overflow-hidden inline-block  w-full whitespace-nowrap">{val}</p></Link>
                    </Menu.Item>
        })
    }
    return(
        <Menu className="absolute bg-white h-screen w-64 ">
            {mapTopics()}
        </Menu>
    )
}


export default Dashboard;