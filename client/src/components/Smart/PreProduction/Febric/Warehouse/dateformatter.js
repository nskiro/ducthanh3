import React, { Component } from 'react';
import moment from 'moment';

import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';

/*
function allowNull(wrappedPropTypes) {
    console.log(wrappedPropTypes);
    return (props, propName, ...rest) => {
        if (props[propName] === null) return null;
        return wrappedPropTypes(props, propName, ...rest);
    }
}
*/
// Custom Formatter component
class DateFormatter extends React.Component {
    render() {
        if (!this.props.value) { return null; }
        const dateformat = moment(this.props.value).format('DD/MM/YYYY hh:mm:ss');// + '%';
        return (
            <div style={{ marginTop: '0px' }}>
                <div>
                    {dateformat}
                </div>
            </div>);

    }
};

DateFormatter.propTypes = {
    // setDataForm: PropTypes.func,
    value: PropTypes.date
};
DateFormatter.defaultProps = {
    value: null
};

export default DateFormatter;