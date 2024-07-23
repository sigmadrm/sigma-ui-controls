import './components/TestCSS';
import './index.css';

class SmUIControls {
  private name: string;
  constructor() {
    this.name = 'SmUIControls';
  }

  static get version(): string {
    // @ts-ignore
    return __VERSION__;
  }

  destroy() {
    this.name = '';
  }
}

export default SmUIControls;
