import { Progress } from "semantic-ui-react";
import { calculScore } from "../utils/exerciceUtil";

const BarStatus = ({ questionnaire }) => {
  return (
    <>
      {" "}
      {questionnaire.etape === questionnaire.verbs.length ? (
        <Progress
          indicating
          value={calculScore(questionnaire.verbs).score}
          total={calculScore(questionnaire.verbs).total}
          progress="percent"
          precision={0}
        />
      ) : (
        <Progress
          value={questionnaire.etape + 0}
          total={questionnaire.verbs.length}
        >
          {questionnaire.etape + 0}/{questionnaire.verbs.length}
        </Progress>
      )}
    </>
  );
};

export default BarStatus;
