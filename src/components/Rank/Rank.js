import React from 'react';

const Rank = ({ name, entries }) => {
    function capitalizeName(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let userName = capitalizeName(name.toLowerCase());

    return (
        <div>
            <div className='black bold f3'>
                {`${userName}, your current entry count is...`}
            </div>
            <div className="black f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;