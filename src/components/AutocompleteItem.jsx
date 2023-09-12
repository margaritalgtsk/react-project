import React, {Fragment, useCallback} from 'react';

const Hightlight = ({ filter, str }) => {

    if (!filter) return str
    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)

    if (matchValue) {

        return str.split(regexp).map((s, index, array) => {
            if (index < array.length - 1) {
                const c = matchValue.shift()
                return <Fragment key={index}>{s}<span className="hightlight">{c}</span></Fragment>
            }
            return s
        })
    }
    return str
}

const AutocompleteItem = ({name, filter }) => {

    const light = useCallback((str) => {
        return <Hightlight filter={filter} str={str} />
    }, [filter])

    return (
        <div className="autocomplete-item">
            {light(name)}
        </div>
    );
};

export default AutocompleteItem;
