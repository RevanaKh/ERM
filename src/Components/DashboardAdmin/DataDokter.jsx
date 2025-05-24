import react ,{useEffect ,useState} from 'react'
import { FaCalendarAlt } from "react-icons/fa";
const DataDokter = () => {
return (
    <>
    <div className="h-[120vh] w-full bg-[#FAF7F2] ">
      <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
        <p className="text-[#00B686] font-bold">Jadwal Dokter</p>
      </div>
        <div className="bg-[#6C757D] shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[50px] ">
            <div className='flex justify-between text-white h-[100px] items-center rounded-lg w-[70%] '>
        <p className=" font-bold">Daftar Jadwal</p>
        <p className=" font-bold">Tambah Jadwal</p>
            </div>
      </div>
       <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full min-h-[100px] ">

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nama dokter
                </th>
                <th scope="col" class="px-6 py-3">
                    poli
                </th>
                <th scope="col" class="px-6 py-3">
                    Hari Praktek
                </th>
                <th scope="col" class="px-6 py-3">
                    Jam Mulai
                </th>
                     <th scope="col" class="px-6 py-3">
                    Jam Selesai
                </th>
                     <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
        </tbody>
    </table>
</div>

      </div>
      </div>
    </>
)

}
export default DataDokter