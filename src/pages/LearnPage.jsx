import {
  Header,
  HeaderContent,
  HeaderSubheader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { getAllVerbs } from "../utils/verbeConfig";

const LearnPage = () => {
  const allVerb = getAllVerbs();

  return (
    <>
      <Table basic="very" celled collapsing>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Verbe</TableHeaderCell>
            <TableHeaderCell>simplePast</TableHeaderCell>
            <TableHeaderCell>pastParticiple</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allVerb.map((verb) => {
            return (
              <TableRow key={verb.french}>
                <TableCell>
                  <Header as="h4">
                    <HeaderContent>
                      {verb.infinitive}
                      <HeaderSubheader>{verb.french}</HeaderSubheader>
                    </HeaderContent>
                  </Header>
                </TableCell>
                <TableCell> {verb.simplePast}</TableCell>
                <TableCell> {verb.pastParticiple}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default LearnPage;
