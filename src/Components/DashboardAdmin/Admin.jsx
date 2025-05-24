import react , {useState , useEffect} from 'react'
import NavAdmin from './NavAdmin'
import DataboardAdmin from './DataboardAdmin'
import {Routes , Route} from 'react-router-dom'
import Datapasien from './Datapasien'
import DataDokter from './DataDokter'
const Admin = () => {
return (
       <div className="h-[120vh] w-full bg-[#FAF7F2] ">
      <NavAdmin />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataboardAdmin/>}/>
<Route path='datapasien' element={<Datapasien/>}/>
<Route path='jadwaldokter' element={<DataDokter/>}/>
          </Routes>
        </div>
      </div>
    </div>
)
}
export default Admin