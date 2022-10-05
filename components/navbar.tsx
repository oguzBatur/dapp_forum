import { NextPage } from "next";
import Image from "next/image";
import { Navbar, Dropdown } from "react-daisyui"
import Link from "next/link";
import default_img from '../user.png';


interface NavbarProps {
    accountAddress: String[];
    accountChainId: Number | undefined;

}

const SozlukNavbar: NextPage<NavbarProps> = ({accountAddress, accountChainId}) => {
    
    return(
    <Navbar color="blue" className=" items-center gap-x-12 pr-8 shadow-md">
      <Navbar.Start>
        <Link href="/"><h1 className="font-bold  cursor-pointer text-xl ">Sansürsüz Sözlük</h1></Link>
      </Navbar.Start>
      <Navbar.End>
        <p className="italic mx-7">{accountAddress}</p>
      <Dropdown vertical="middle" horizontal="left">
        <Image
          className="rounded-full  bg-white"
          src={default_img}
          alt="default_image"
          width={34}
          height={34}
        ></Image>
        <Dropdown.Menu className="p-6">
           <p className="font-bold">Kullanıcı#1</p>
        </Dropdown.Menu>
      </Dropdown>
      </Navbar.End>
    </Navbar>
        
    )
    
}

export default SozlukNavbar;