export default interface SerialPortInfo {
    isActive: boolean;
    path: string;

    manufacturer?: string;
    serialNumber?: string;
    pnpID?: string;
    locationID?: string;
    productID?: string;
    vendorID?: string;
}