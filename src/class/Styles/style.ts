import { EDeviceType, TGenerateStylesProps } from '../../type';

import generateStylesMobile from './mobile.style';
import generateStylesDesktop from './desktop.style';
const generateStyles = (props?: TGenerateStylesProps) => {
  const { deviceType } = props || {};
  if (deviceType === EDeviceType.MOBILE) {
    return generateStylesMobile(props);
  }
  return generateStylesDesktop(props);
};
export default generateStyles;
