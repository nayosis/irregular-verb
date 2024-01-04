import {
  Button,
  Flag,
  Form,
  FormDropdown,
  FormGroup,
  FormInput,
  Header,
  HeaderContent,
  Icon,
  Label,
  Message,
  Segment,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { groupVerbOption } from "../utils/verbeConfig";
import {
  createQuestionnaire,
  listQuestionnaire,
} from "../services/exerciceService";
import BarStatus from "../comp/BarStatus";
import { calculScore } from "../utils/exerciceUtil";
import Suivi from "../comp/graph/Suivi";

const optionsCount = [
  {
    key: "5",
    text: "5",
    value: "5",
  },
  {
    key: "10",
    text: "10",
    value: "10",
  },
  {
    key: "15",
    text: "15",
    value: "15",
  },
  {
    key: "20",
    text: "20",
    value: "20",
  },
];

const MainPage = () => {
  const [questionnaires, setQuestionnaires] = useState(listQuestionnaire());
  const [owner, setOwner] = useState("");
  const [nbr, setNbr] = useState("5");
  const [grpVerbe, setGrpVerbe] = useState([]);

  function handleCreateQuestionnaire(owner, grpVerbe, nbr) {
    createQuestionnaire(owner, grpVerbe, nbr);
    setQuestionnaires(listQuestionnaire());
  }

  return (
    <>
      <div>
        <Header as="h2" textAlign="center" block style={{ marginTop: "1rem" }}>
          <HeaderContent>
            <Flag name="gb" /> Test de connaissance des verbes irréguliers
            Anglais (4ieme)
            <Flag name="gb" />
          </HeaderContent>
        </Header>
        <Message info>
          <Icon name="bullhorn" />
          Cette application permet de tester sa connaissance des verbes
          irréguliers. Remplissez votre nom , le nombre de verbes, et leurs
          catégories.
        </Message>
        <Segment>
          <Form>
            <FormGroup widths="equal">
              <FormInput
                placeholder="owner"
                value={owner}
                onChange={(e, d) => setOwner(d.value)}
                required={true}
              />
              <FormDropdown
                placeholder="nbr"
                value={nbr}
                onChange={(e, d) => setNbr(d.value)}
                selection
                options={optionsCount}
              />
              <FormDropdown
                placeholder="groupe de verbe"
                value={grpVerbe}
                fluid
                onChange={(e, d) => setGrpVerbe(d.value)}
                multiple
                selection
                options={groupVerbOption}
              />
            </FormGroup>
          </Form>
          <Button
            disabled={isEmpty(owner)}
            onClick={() => handleCreateQuestionnaire(owner, grpVerbe, nbr)}
          >
            {" "}
            creer questionnaire{" "}
          </Button>
        </Segment>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell width={3}>Nom et Date</TableHeaderCell>
              <TableHeaderCell width={7}>
                <Icon name="tags" />
                Groupe de verbe
              </TableHeaderCell>
              <TableHeaderCell width={3}>Score</TableHeaderCell>
              <TableHeaderCell width={1}></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listQuestionnaire()?.map((questionnaire) => {
              return (
                <TableRow
                  key={questionnaire.id}
                  active={questionnaire.etape === questionnaire.verbs.length}
                >
                  <TableCell>
                    {questionnaire.owner}
                    <br />
                    {new Date(questionnaire.date).toLocaleDateString()}{" "}
                    {new Date(questionnaire.date).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    {questionnaire.groups.length !== 0
                      ? questionnaire.groups
                          .map((grp) =>
                            groupVerbOption.find(
                              (grpVerOpt) => grpVerOpt.value === grp
                            )
                          )
                          .map((grp) => (
                            <Label key={grp.value}>{grp.text}</Label>
                          ))
                      : "tous"}
                  </TableCell>
                  <TableCell>
                    <BarStatus questionnaire={questionnaire} />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="tiny"
                      as={Link}
                      color={
                        questionnaire.etape !== questionnaire.verbs.length
                          ? "olive"
                          : "blue"
                      }
                      to={`/exercice/${questionnaire.id}`}
                    >
                      {questionnaire.etape !== questionnaire.verbs.length
                        ? "Acceder"
                        : "Résultat"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {getUniqueValues(
        questionnaires?.map((innerQuest) => innerQuest.owner)
      ).map((owner) => {
        return (
          <div key={owner} style={{ height: "50vh" }}>
            <Suivi data={buildData(questionnaires, owner)} />
          </div>
        );
      })}
    </>
  );
};

export default MainPage;

function isEmpty(value) {
  return (
    value == null || (typeof value === "string" && value.trim().length === 0)
  );
}

function buildData(questionnaires, name) {
  const data = questionnaires
    .filter((innerQuest) => innerQuest.owner === name)
    .filter((innerQuest) => innerQuest.etape === innerQuest.verbs.length)
    .reverse()
    .map((innerQuest, index) => {
      const info = calculScore(innerQuest.verbs);
      return {
        x:
          new Date(innerQuest.date).toLocaleDateString() +
          new Date(innerQuest.date).toLocaleTimeString(),
        y: (info.score / info.total) * 100,
      };
    });

  return [
    {
      id: name,
      color: "hsl(104, 70%, 50%)",
      data: data,
    },
  ];
}

const getUniqueValues = (array) =>
  array.filter(
    (currentValue, index, arr) => arr.indexOf(currentValue) === index
  );
