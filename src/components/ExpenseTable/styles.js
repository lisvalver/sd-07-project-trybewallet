import styled from 'styled-components';

const Table = styled.table`
  margin: 0 auto;
  border-top: 2px solid grey;
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #202020;
    color: white;
    width: 100%;

    tr th {
      padding: 12px;
    }
  }

  tbody{
    background-color: white;
    padding: 12px 0;
    width: 100%;

    tr td {
      padding: 12px;
      text-align: center;
    }
  }
`;

export default Table;
