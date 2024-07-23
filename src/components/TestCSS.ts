import { css } from '@emotion/css';

const style = css`
  color: hotpink;
  font-size: 24px;
`;

document.addEventListener('DOMContentLoaded', () => {
  // Then use the style in your component
  const element = document.createElement('div');
  element.className = style;
  element.innerText = 'Hello, Emotion!';
  document.body.appendChild(element);
});
