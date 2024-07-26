import { ids } from './constants';
import generateStyles from './style';

export const createElementFromHTML = (htmlString: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString.trim();
  return tempDiv.firstChild;
};

export const generateHtmlContentContainerString = (classes: ReturnType<typeof generateStyles>) => {
  return `
    <div class=${classes.controllerContent}  id=${ids.smControllerContent}>
    </div>
    <div class=${classes.loadingContainer} id=${ids.smLoading}>
    </div>
    <div class=${classes.errorContainer} id=${ids.smError}>
    </div>
    `;
};
export const generateHtmlContentControllerString = (classes: ReturnType<typeof generateStyles>) => {};
