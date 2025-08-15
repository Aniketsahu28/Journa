export type TOtpInputBoxHandle = {
    focus: (index?: number) => void;
    clear: () => void;
    getValue: () => string;
};