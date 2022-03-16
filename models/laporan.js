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
    role: {
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
    anggotaId: {
      type: Schema.Types.ObjectId,
      ref: 'AnggotaKeluarga',
      required: true,
    },
    keluargaId: {
      type: Schema.Types.ObjectId,
      ref: 'Keluarga',
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
