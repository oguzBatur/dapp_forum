import React, { useEffect, useState } from 'react'
import { Input, Textarea } from 'react-daisyui'
import SozlukNavbar from '../../components/navbar'
import { getAccountInfo } from '../../functions'
import { SozlukError } from '../../types/enums'
import { IAccount } from '../../types/interfaces'
import Dashboard from '../../components/dashboard'

 const CreatePost = () => {
   
   const [account, setAccount] = useState<IAccount>({
    address: "",
    balance: "",
    chainId: 0
   });
   

   useEffect(() => {
     getAccountInfo().then(val => {
      if(val == SozlukError.NoAccount){
        console.error("Problem!");
      }
      else {
        setAccount(val);
      }
     });
   })
  return (
    <div>
      <SozlukNavbar address={account.address} balance={account.balance} chainId={account.chainId} />
      <Dashboard />
        <h1 className='text-center font-bold text-3xl mt-8'>Gönderi Oluştur</h1>

    </div>
  )
}
export default CreatePost;
