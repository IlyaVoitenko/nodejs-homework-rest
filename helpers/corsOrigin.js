const corsOrigine = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
};
module.exports = corsOrigine;
