const quickMiddleware = (req, res, next) => {
  if (req.headers.authorization === process.env.FAKE_TOKEN) {
    next();
  } else {
    res.send({
      Sonic1: `I found you... faker...`,
      Shadow: `Faker? I think you're the fake hedgehog around here. You're comparing yourself to me? Ha. You're not even good enough to be my fake...`,
      Sonic2: `I'll make you eat those words.`,
    });
  }
};

module.exports = {
  quickMiddleware,
};
