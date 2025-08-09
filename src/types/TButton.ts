export type TButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string
    disable?: boolean
}