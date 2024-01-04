import verbs3forms from "../data/verbe3form.json";
import verbs2forms from "../data/verbe2form.json";
import verbs1forms from "../data/verbe1form.json";

const groupsParam = {
  verb1form: verbs1forms,
  verb2form: verbs2forms,
  verb3form: verbs3forms,
};

export function getAllVerbs() {
  let allVerb = [...verbs3forms, ...verbs2forms, ...verbs1forms];
  return allVerb;
}

export const groupVerbOption = [
  { key: "verb1form", text: "Une Forme unique", value: "verb1form" },
  { key: "verb2form", text: "Deux Formes identiques", value: "verb2form" },
  { key: "verb3form", text: "Deux Formes différentes", value: "verb3form" },
];

export function getRandom(groups, questionNumber) {
  let allVerb = [...verbs3forms, ...verbs2forms, ...verbs1forms];
  if (groups.length === 0) {
    allVerb = [...verbs3forms, ...verbs2forms, ...verbs1forms];
  } else {
    allVerb = groups.flatMap((innergrpKey) => {
      return groupsParam[innergrpKey];
    });
  }

  // Shuffle array
  const shuffled = allVerb.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, questionNumber);

  return selected;
}
