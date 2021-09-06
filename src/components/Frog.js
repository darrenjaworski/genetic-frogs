import styled from "styled-components";

const FrogContainer = styled.div`
  margin: 10px;
  width: 2em;
  height: 2em;
  display: inline-block;
  background: ${(props) => props.color};
`;

const CenteredFitness = styled.span`
  text-align: center;
  display: block;
  padding-top: 6px;
`;

function Frog({ frog }) {
  return (
    <FrogContainer color={frog.color}>
      <CenteredFitness>{frog.fitness.toFixed(0)}</CenteredFitness>
    </FrogContainer>
  );
}

export { Frog };
