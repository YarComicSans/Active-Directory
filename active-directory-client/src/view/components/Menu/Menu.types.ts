
type MenuOption = {
    name: string,
    onSelect: () => void;
}

export type MenuProps = {
    title: string;
    options: MenuOption[];
}
