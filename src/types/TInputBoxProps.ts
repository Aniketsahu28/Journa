export type TInputBoxProps = {
    name: string,
    label?: string;
    type?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string[];
    required?: boolean;
    className?: string;
};