import styled from "styled-components";

const Grid = styled.div`
  width: 100%;
  background: rgb(
    ${(props) => props.bg[0]},
    ${(props) => props.bg[1]},
    ${(props) => props.bg[2]}
  );
`;

function Environment({ children, bg }) {
  return <Grid bg={bg}>{children}</Grid>;
}

export { Environment };
