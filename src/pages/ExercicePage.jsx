import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  StatisticValue,
  StatisticLabel,
  Statistic,
  Divider,
  Form,
  FormGroup,
  FormInput,
  Grid,
  GridColumn,
  Header,
  Icon,
  Segment,
  FormField,
} from "semantic-ui-react";
import "./exercice.scss";

import { useState } from "react";
import {
  readQuestionnaire,
  saveQuestionnaire,
} from "../services/exerciceService";
import { calculScore, isCorrect } from "../utils/exerciceUtil";
import { Link, useParams, useSearchParams } from "react-router-dom";
import BarStatus from "../comp/BarStatus";

const ExercicePage = () => {
  let params = useParams();
  const [searchParams] = useSearchParams();
  const isTraining = searchParams.get('training')
  const questionnaire = readQuestionnaire(params.exerId);
  const [uuid, setUuid] = useState(questionnaire.id);
  const [verbs, setVerbs] = useState(questionnaire.verbs);
  const [etape, setEtape] = useState(questionnaire.etape);

  const [simplePast, setSimplePast] = useState("");
  const [pastParticiple, setPastParticiple] = useState("");
  const [french, setFrench] = useState("");

  function validate(number, innerSP, innerPP, innerFr) {
    verbs[number].response = { sp: innerSP, pp: innerPP, fr: innerFr };

    setVerbs([...verbs]);
    setSimplePast("");
    setPastParticiple("");
    setFrench("");
    setEtape(number + 1);

    saveQuestionnaire(uuid, [...verbs], number + 1);
  }


  if (etape + 1 > verbs.length) {
    return <FinalResult questionnaire={questionnaire} debug={false} />;
  }

  return (
    <>
      <div className="exercice-page">
        <div className="exercice-titre">
          <div>
            {" "}
            <Header as="h2">Question {etape + 1}</Header>
            <BarStatus questionnaire={questionnaire} />
            <Link to="/" as={Button} icon labelPosition="left">
              <Icon name="left arrow" />
              Retour
            </Link>
          </div>
        </div>
        <div className="exercice-response">
          <div>
            <Form>
              <FormGroup widths="equal" style={{ fontSize: "1.3rem" }}>
                <FormField>
                  <label>Infinitive</label>
                  <Segment
                    color="grey"
                    inverted
                    tertiary
                    style={{
                      fontSize: "1.3rem",
                      padding: "0.7em 1em",
                      marginTop: "0",
                    }}
                  >
                    {questionnaire.verbs[etape].infinitive}
                  </Segment>
                </FormField>

                <FormInput
                  fluid
                  value={simplePast}
                  onChange={(e, d) => setSimplePast(d.value)}
                  label="Simple Past"
                  placeholder="Simple Past"
                />
                <FormInput
                  fluid
                  value={pastParticiple}
                  onChange={(e, d) => setPastParticiple(d.value)}
                  label="Past Participate"
                  placeholder="Past Participate"
                />
                <FormInput
                  fluid
                  value={french}
                  onChange={(e, d) => setFrench(d.value)}
                  label="French"
                  placeholder="French"
                />
              </FormGroup>
            </Form>
            <Button
              floated="right"
              icon
              labelPosition="right"
              onClick={() =>
                validate(etape, simplePast, pastParticiple, french)
              }
            >
              Next
              <Icon name="right arrow" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercicePage;

function FinalResult({ questionnaire, debug }) {
  let totalScore = calculScore(questionnaire.verbs).score;

  return (
    <>
      <div>
        <Header as="h2">Résultat {totalScore}</Header>
        <BarStatus questionnaire={questionnaire} />
        <Link to="/" as={Button} icon labelPosition="left">
          <Icon name="left arrow" />
          Retour
        </Link>
      </div>
      <Statistic>
        <StatisticValue>{totalScore}</StatisticValue>
        <StatisticLabel>Score</StatisticLabel>
      </Statistic>
      )
      <CardGroup>
        {questionnaire.verbs?.map((result) => {
          return (
            <>
              <Card>
                <CardContent>
                  <CardDescription>
                    <Header as="h4">{result.infinitive.toUpperCase()}</Header>
                    <Comparator
                      correction={result.simplePast}
                      reponse={result.response.sp}
                    />
                    <Comparator
                      correction={result.pastParticiple}
                      reponse={result.response.pp}
                    />
                    <Comparator
                      correction={result.french}
                      reponse={result.response.fr}
                    />
                  </CardDescription>
                </CardContent>
                <CardContent extra>{result.commentaire}</CardContent>
              </Card>
            </>
          );
        })}
      </CardGroup>
      {debug && <pre>{JSON.stringify(data, null, 4)}</pre>}
    </>
  );
}

const Check = (a, b) => {
  if (isCorrect(a, b)) {
    return <Icon color="green" name="check circle" />;
  } else {
    return <Icon color="red" name="times circle" />;
  }
};

const Comparator = ({ correction, reponse }) => {
  return (
    <Segment color={isCorrect(reponse, correction) ? "green" : "red"}>
      <Grid columns={2} relaxed="very" stackable>
        <GridColumn verticalAlign="middle">
          {correction?.toUpperCase()}
        </GridColumn>

        <GridColumn verticalAlign="middle">
          {reponse?.toUpperCase()}{" "}
        </GridColumn>
      </Grid>

      <Divider vertical> {Check(reponse, correction)}</Divider>
    </Segment>
  );
};
