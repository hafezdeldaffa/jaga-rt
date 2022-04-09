const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');

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
      tokenRT,
      rt,
      rw,
      nomorRumah,
      kodePos,
      password,
    } = req.body;

    if (user.role === 'Keluarga') {
      const newKeluarga = {
        namaKepalaKeluarga: namaKepalaKeluarga,
        role: role,
        tokenRT: tokenRT,
        email: email,
        alamat: alamat,
        password: password,
        provinsi: provinsi,
        rt: rt,
        rw: rw,
        nomorRumah: nomorRumah,
        kodePos: kodePos,
      };

      const keluarga = await Keluarga.findByIdAndUpdate(id, newKeluarga);
      console.log(keluarga);

      res.redirect('/dashboard');
    } else if (user.role === 'RT') {
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
      await Keluarga.findByIdAndUpdate(id, newKeluarga);

      res.redirect('/dashboard');
    }
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};
