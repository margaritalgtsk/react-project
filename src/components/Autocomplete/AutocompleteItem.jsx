import React, {Fragment} from 'react';
import classes from './Autocomplete.module.css';

const Highlight = ({filter, str}) => {

    if (!filter) return str
    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)

    if (matchValue) {
        return str.split(regexp).map((notHighlightElement, index, array) => {
            if (index < array.length - 1) {
                const highlightElement = matchValue.shift()
                return <Fragment key={index}>{notHighlightElement}<span className={classes.highlight}>{highlightElement}</span></Fragment>
            }
            return notHighlightElement
        })
    }
    return str
}

const AutocompleteItem = ({name, filter, active, updateData}) => {

    const rootClasses = [classes.autocompleteItem]

    if (active) {
        rootClasses.push(classes.active)
    }

    return (
        <div onClick={() => updateData(name)}
            className={rootClasses.join(' ')}>
            <Highlight filter={filter} str={name} />
        </div>
    );
};

export default AutocompleteItem;
