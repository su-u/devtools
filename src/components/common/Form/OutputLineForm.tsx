import styled from '@emotion/styled';
import { Form } from 'rsuite';

export const OutputLineForm = styled(Form)`
  > div:not(:last-child) {
    margin-bottom: 12px !important;
  }
`;

export const OutputLabel = styled(Form.ControlLabel)`
  margin-left: 12px;
  font-size: 12px !important;
  width: 100px !important;
`;
