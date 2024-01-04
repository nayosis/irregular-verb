export function calculScore(data) {
  const score = data.reduce((accu, innerData) => {
    let point = 0;

    if (isCorrect(innerData.response.sp, innerData.simplePast)) {
      point = point + 1;
    }

    if (isCorrect(innerData.response.pp, innerData.pastParticiple)) {
      point = point + 1;
    }

    if (isCorrect(innerData.response.fr, innerData.french)) {
      point = point + 1;
    }

    return accu + point;
  }, 0);

  return { score, total: data.length * 3 };
}

export function isCorrect(reponse, correction) {
  const listCorrectValue = correction
    .split("|")
    .map((corr) => corr.toUpperCase().trim().sansAccent());
  return listCorrectValue.includes(reponse.toUpperCase().trim().sansAccent());
}

String.prototype.sansAccent = function () {
  var accent = [
    /[\300-\306]/g,
    /[\340-\346]/g, // A, a
    /[\310-\313]/g,
    /[\350-\353]/g, // E, e
    /[\314-\317]/g,
    /[\354-\357]/g, // I, i
    /[\322-\330]/g,
    /[\362-\370]/g, // O, o
    /[\331-\334]/g,
    /[\371-\374]/g, // U, u
    /[\321]/g,
    /[\361]/g, // N, n
    /[\307]/g,
    /[\347]/g, // C, c
  ];
  var noaccent = [
    "A",
    "a",
    "E",
    "e",
    "I",
    "i",
    "O",
    "o",
    "U",
    "u",
    "N",
    "n",
    "C",
    "c",
  ];

  var str = this;
  for (var i = 0; i < accent.length; i++) {
    str = str.replace(accent[i], noaccent[i]);
  }

  return str;
};
