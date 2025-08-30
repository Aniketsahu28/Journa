import { TCategoryTree } from "./TCategoryTree";

export type TCascadeSelectProps = {
    value: number | null;
    defaultValue: string | null
    onChange: (id: number | null) => void;
};