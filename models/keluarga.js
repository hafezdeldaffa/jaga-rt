/* 
    MODEL UNTUK KELUARGA
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keluargaSchema = new Schema(
  {
    namaKepalaKeluarga: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    provinsi: {
      type: String,
      required: true,
    },
    rt: {
      type: Number,
      required: true,
    },
    rw: {
      type: Number,
      required: true,
    },
    kodePos: {
      type: Number,
      required: true,
    },
    nomorRumah: {
      type: Number,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokenRT: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Keluarga', keluargaSchema);