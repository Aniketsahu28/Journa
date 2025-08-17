export type TOtpInputBoxProps = {
    name?: string;
    label?: string;
    length?: number; // defaults to 6
    value?: string; // optional controlled value
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string; // extra class for the wrapper
    inputClassName?: string; // extra class for each input
};