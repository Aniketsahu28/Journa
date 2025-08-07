import { TButtonProps } from "@/types/TButton"

const SecondaryButton = ({ children, onClick, type = 'button', className = "" }: TButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={`${className} bg-white rounded-lg text-black p-2 border-1 border-black/25 hover:shadow-md cursor-pointer font-semibold font-nunito`}>
            {children}
        </button>
    )
}

export default SecondaryButton
