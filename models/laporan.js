/* 
    MODEL UNTUK MEMBUAT LAPORAN
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laporanSchema = new Schema(
  {
    anggotaId: {
      type: Schema.Types.ObjectId,
      ref: "AnggotaKeluarga",
      required: true,
    },
    keluargaId: {
      type: Schema.Types.ObjectId,
      ref: "Keluarga",
      required: true,
    },
    laporan: {
      type: String,
      required: true,
    },
    catatan: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Laporan", laporanSchema);
