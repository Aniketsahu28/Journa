import { TButtonProps } from "@/types/TButton"

const TertiaryButton = ({ children, onClick, type = "button", className = "" }: TButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={`${className} cursor-pointer`}>
            {children}
        </button>
    )
}

export default TertiaryButton