import React, {FC, Fragment} from 'react';
import classes from './Autocomplete.module.css';

const Highlight = (filter:string, str:string) => {

    if (!filter) return str;
    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);

    if (matchValue) {
        return str.split(regexp).map((notHighlightElement, index, array) => {
            if (index < array.length - 1) {
                const highlightElement = matchValue.shift()
                return <Fragment key={index}>{notHighlightElement}<span
                    className={classes.highlight}>{highlightElement}</span></Fragment>
            }
            return notHighlightElement;
        })
    }
    return str;
}

interface AutocompleteItemProps {
    name: string;
    filter: string;
    active: boolean;
    updateData: (name: string) => void;
}

const AutocompleteItem: FC<AutocompleteItemProps> = ({name, filter, active, updateData}) => {

    const rootClasses = [classes.autocompleteItem]

    if (active) {
        rootClasses.push(classes.active)
    }

    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        updateData(name)
    }

    return (
        <div onClick={clickHandler}
            className={rootClasses.join(' ')}>
            {Highlight(filter,name)}
        </div>
    );
};

export default AutocompleteItem;
