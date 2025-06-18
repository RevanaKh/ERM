import React, { useEffect, useState } from 'react';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import LaporanPasien from './LaporanPasien';
import LaporanDokter from './LaporanDokter';
import LaporanTransaksi from './LaporanTransaksi';
import LaporanStokObat from './LaporanStockObat';
import LaporanPengguna from './LaporanPengguna';
import api from '../../../utils/api';

const Laporan = () => {
  const [laporanData, setLaporanData] = useState({
    pasien: [],
    dokter: [],
    transaksi: [],
    obat: [],
    pengguna: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersRes, transaksiRes, obatRes, dokterRes] = await Promise.all([api.get('/users'), api.get('/pasien/getpembayaran'), api.get('/obat/dataobat'), api.get('/dokter/getdokter')]);

        setLaporanData({
          pasien: usersRes.data.filter((user) => user.role === 'pasien'),
          dokter: dokterRes.data,
          transaksi: transaksiRes.data,
          obat: obatRes.data,
          pengguna: usersRes.data,
        });
      } catch (err) {
        console.error('Gagal memuat laporan:', err.message);
      }
    };

    fetchAll();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Laporan Sistem Rekam Medis', 14, 15);

    let y = 25;

    const addSection = (title, headers, data) => {
      doc.setFontSize(12);
      doc.text(title, 14, y);
      y += 5;
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: y,
        theme: 'grid',
        styles: { fontSize: 8 },
        margin: { top: 10 },
        didDrawPage: (data) => {
          y = data.cursor.y + 10;
        },
      });
    };

    addSection(
      'Data Pasien',
      ['ID', 'Nama', 'NIK', 'Gender', 'Tempat Lahir', 'Tgl Lahir', 'Alamat', 'Email'],
      laporanData.pasien.map((p) => [`RM-${p.id}`, p.nama, p.nik, p.jenis_kelamin, p.tempat_lahir, p.tanggal_lahir, p.alamat, p.email])
    );

    addSection(
      'Data Dokter',
      ['ID', 'Nama', 'Email', 'Poli', 'Role'],
      laporanData.dokter.map((d) => [`DK-${d.id}`, d.nama, d.email, d.poli || '-', d.role])
    );

    addSection(
      'Transaksi',
      ['ID', 'Tanggal', 'Pasien', 'Layanan', 'Harga', 'Status'],
      laporanData.transaksi.map((t) => [t.id, t.waktu_daftar, t.nama_pasien, t.metodePembayaran, t.harga_jual, t.status_pembayaran])
    );

    addSection(
      'Stok Obat',
      ['ID', 'Nama', 'Jenis', 'Harga', 'Stok', 'Kadaluarsa'],
      laporanData.obat.map((o) => [`OBT-${o.id}`, o.nama_obat, o.jenis_obat, `Rp .${o.harga_jual}`, o.stok, o.kadaluarsa])
    );

    addSection(
      'Pengguna',
      ['ID', 'Nama', 'Email', 'Role'],
      laporanData.pengguna.map((u) => [`USR-${u.id}`, u.nama, u.email, u.role])
    );

    doc.save('laporan_rekam_medis.pdf');
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    const makeSheet = (data, headers) => XLSX.utils.aoa_to_sheet([headers, ...data]);

    XLSX.utils.book_append_sheet(
      wb,
      makeSheet(
        laporanData.pasien.map((p) => [`RM-${p.id}`, p.nama, p.nik, p.jenis_kelamin, p.tempat_lahir, p.tanggal_lahir, p.alamat, p.email]),
        ['ID', 'Nama', 'NIK', 'Gender', 'Tempat Lahir', 'Tgl Lahir', 'Alamat', 'Email']
      ),
      'Data Pasien'
    );

    XLSX.utils.book_append_sheet(
      wb,
      makeSheet(
        laporanData.dokter.map((d) => [`DK-${d.id}`, d.nama, d.email, d.poli || '-', d.role]),
        ['ID', 'Nama', 'Email', 'Poli', 'Role']
      ),
      'Data Dokter'
    );

    XLSX.utils.book_append_sheet(
      wb,
      makeSheet(
        laporanData.transaksi.map((t) => [t.id, t.waktu_daftar, t.nama_pasien, t.metodePembayaran, t.harga_jual, t.status_pembayaran]),
        ['ID', 'Tanggal', 'Pasien', 'Layanan', 'Harga', 'Status']
      ),
      'Transaksi'
    );

    XLSX.utils.book_append_sheet(
      wb,
      makeSheet(
        laporanData.obat.map((o) => [`OBT-${o.id}`, o.nama_obat, o.jenis_obat, o.harga, o.stok, o.kadaluarsa]),
        ['ID', 'Nama', 'Jenis', 'Harga', 'Stok', 'Kadaluarsa']
      ),
      'Stok Obat'
    );

    XLSX.utils.book_append_sheet(
      wb,
      makeSheet(
        laporanData.pengguna.map((u) => [`USR-${u.id}`, u.nama, u.email, u.role]),
        ['ID', 'Nama', 'Email', 'Role']
      ),
      'Pengguna'
    );

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'laporan_rekam_medis.xlsx');
  };

  return (
    <div className="min-h-screen py-6 w-full bg-[#FAF7F2]">
      <div className="bg-white shadow-lg flex justify-center items-center w-full h-[100px] rounded-md">
        <p className="text-[#00B686] font-bold text-[20px]">Manajemen Laporan</p>
      </div>

      <div className="flex flex-col min-h-[70px] p-4 sm:flex-row gap-3">
        <button
          onClick={exportPDF}
          type="button"
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 transition duration-150"
        >
          <FaFilePdf className="text-[18px]" />
          Unduh Semua Laporan PDF
        </button>

        <button
          onClick={exportExcel}
          type="button"
          className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1 transition duration-150"
        >
          <FaFileExcel className="text-[18px]" />
          Unduh Semua Laporan Excel
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <LaporanPasien />
        <LaporanDokter />
        <LaporanTransaksi />
        <LaporanStokObat />
        <LaporanPengguna />
      </div>
    </div>
  );
};

export default Laporan;
