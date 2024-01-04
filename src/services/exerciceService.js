import { v4 as uuidv4 } from "uuid";

import { getRandom, groupVerbOption } from "../utils/verbeConfig";

export function createQuestionnaire(owner, groups, questionNumber) {
  let definedgroup = [];
  if (groups.length === 0) {
    definedgroup = groupVerbOption.map((grpVerb) => grpVerb.value);
  } else {
    definedgroup = groups;
  }
  const verbs = getRandom(definedgroup, questionNumber);
  const uuid = uuidv4();

  const questionnaire = {
    id: uuid,
    owner: owner,
    verbs: verbs,
    groups: definedgroup,
    questionNumber,
    etape: 0,
    date: Date.now(),
  };

  localStorage.setItem(`quest-${uuid}`, JSON.stringify(questionnaire));

  return questionnaire;
}

export function saveQuestionnaire(uuid, verbs, etape) {
  console.log("Save ", uuid, verbs, etape);
  const working = readQuestionnaire(`${uuid}`);

  console.log("Save ", working);
  const questionnaire = { ...working, verbs: verbs, etape: etape };

  localStorage.setItem(`quest-${uuid}`, JSON.stringify(questionnaire));
}

export function readQuestionnaire(uuid) {
  return JSON.parse(localStorage.getItem(`quest-${uuid}`));
}

export function listQuestionnaires() {
  for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i));
  }

  //return localStorage?.filter((innerKey) => innerKey.contains(`quest-`));
}
export function listQuestionnaire() {
  let list = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes(`quest-`)) {
      console.log(localStorage.key(i));
      const texxxt = readQuestionnaire(
        localStorage.key(i).replace("quest-", "")
      );
      console.log(texxxt);
      list.push(texxxt);
    }
  }
  return list.sort(comparedate);
  //return localStorage?.filter((innerKey) => innerKey.contains(`quest-`));
}

function comparedate(a, b) {
  return b.date - a.date;
}
