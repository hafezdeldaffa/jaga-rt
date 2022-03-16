/* 
    MODEL UNTUK MEMBUAT LAPORAN
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laporanSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    nomorRumah: {
      type: Number,
      required: true,
    },
    rt: {
      type: Number,
      required: true,
    },
    gejala: {
      type: String,
      required: true,
    },
    catatan: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Laporan', laporanSchema);
