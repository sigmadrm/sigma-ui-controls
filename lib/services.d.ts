import { EDeviceType, IDeviceInfo, IIds } from './type';
export declare const createElementFromHTML: (htmlString: string) => ChildNode | null;
export declare const generateIIds: () => IIds;
export declare const detectDevice: () => IDeviceInfo;
export declare const detectDeviceMobile: (deviceType: EDeviceType) => boolean;
export declare const detectDeviceDesktop: (deviceType: EDeviceType) => boolean;
export declare const isIOS: (value: string) => boolean;
export declare const checkHasTouch: () => boolean;
//# sourceMappingURL=services.d.ts.map