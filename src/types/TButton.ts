export type TButtonProps = {
    children: React.ReactNode;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: "button" | "submit" | "reset";
    className?: string
    disable?: boolean
}