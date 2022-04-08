const Keluarga = require("../models/keluarga");
const { errorHandling } = require("./errorHandling");

exports.editProfile = async (req, res, next) => {
  try {
    const user = req.session.user;

    const { id } = req.params;

    const {
      namaKepalaKeluarga,
      role,
      email,
      alamat,
      provinsi,
      rt,
      rw,
      nomorRumah,
      kodePos,
    } = req.body;

    if (user.role === "Keluarga") {
      const newKeluarga = {
        namaKepalaKeluarga: namaKepalaKeluarga,
        role: role,
        email: email,
        alamat: alamat,
        provinsi: provinsi,
        rt: rt,
        rw: rw,
        nomorRumah: nomorRumah,
        kodePos: kodePos,
      };

      const keluarga = await Keluarga.findByIdAndUpdate(id, newKeluarga);
    } else {
    }
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};
