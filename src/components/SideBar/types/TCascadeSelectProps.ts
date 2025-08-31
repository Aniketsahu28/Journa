export type TCascadeSelectProps = {
    value: number | null;
    defaultValue: string | null
    onChange: (id: number | null) => void;
    excludeId?: number | null
};