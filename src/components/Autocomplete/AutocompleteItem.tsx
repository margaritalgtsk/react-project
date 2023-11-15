import React, {FC} from 'react';
import classes from './Autocomplete.module.css';
import {ISearchAutocomplete} from "../../types/types";

const getHighlightedText = (text: string, highlight: string): JSX.Element => {

    const parts: string[] = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> {parts.map((part: string, i: number) =>
        <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? classes.highlight : ''}>
            {part}
        </span>)
    } </span>;
}

interface IAutocompleteItemProps {
    filter: string;
    active: boolean;
    updateData: (value: ISearchAutocomplete) => void;
    result: ISearchAutocomplete;
}

const AutocompleteItem: FC<IAutocompleteItemProps> = ({result, filter, active, updateData}) => {

    const rootClasses = [classes.autocompleteItem]

    if (active) {
        rootClasses.push(classes.active)
    }

    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        updateData(result)
    };

    return (
        <div onClick={clickHandler}
            className={rootClasses.join(' ')}>
            {getHighlightedText(result.name, filter)}
        </div>
    );
};

export default AutocompleteItem;