/* 
    MODEL UNTUK ANGGOTA KELUARGA
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anggotaKeluargaSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    statusCovid: {
      type: String,
      required: true,
    },
    tokenRT: {
      type: Schema.Types.ObjectId,
      ref: 'Keluarga',
      required: true,
    },
    keluargaId: {
      type: Schema.Types.ObjectId,
      ref: 'Keluarga',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AnggotaKeluarga', anggotaKeluargaSchema);
