export type TCheckboxProps = {
    name?: string
    id?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string
    style?: React.CSSProperties;
    disable?: boolean
    checked: boolean
}