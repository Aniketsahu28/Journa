export type TInputBoxProps = {
    name: string,
    label?: string;
    type?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown?:React.KeyboardEventHandler<HTMLInputElement>;
    error?: string[];
    required?: boolean;
    className?: string;
    defaultValue?: any
    borderLess?:boolean
    autoFocus?:boolean
};