import styled from 'styled-components';

const Styled = styled.div`
  div.ant-checkbox-group {
    display: flex;
    ${props => props.width && `width: ${props.width}px;`}

    > label.ant-checkbox-wrapper {
      height: 35px;
      font-size: 14px;
      align-items: center;
      margin-right: 15px;
      width: auto;
      padding: 0 15px;
      border: 1px solid rgb(217, 217, 217);

      > span:first-child {
        display: none;
      }
      > span:last-child {
        padding: 0;
      }
    }

    > label.ant-checkbox-wrapper-checked {
      border: 1px solid #cd1818;
      color : #cd1818
    }
    > label.ant-checkbox-wrapper-checked + label.ant-checkbox-wrapper {
    }

    > label.ant-checkbox-wrapper:last-child {
    }
  }
`;

export default Styled;