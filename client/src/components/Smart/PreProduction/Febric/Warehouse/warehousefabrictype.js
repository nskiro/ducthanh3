import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-bootstrap';

import { Button } from 'antd';

//import ReactDataGrid from 'react-data-grid';
//import update from 'immutability-helper';

class WarehouseFabricType extends Component {
    render() {
        return (<div>
            <Button type="primary">Primary1</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed2</Button>
            <Button type="danger">Danger2</Button>
        </div>
        );
    }
}

export default WarehouseFabricType;