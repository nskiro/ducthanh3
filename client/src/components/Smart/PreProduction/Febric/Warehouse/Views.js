import React, { Component } from 'react';
import { Tabs, Form } from 'antd';

//css
import './views.css';
//import { constants } from 'zlib';

import WarehouseImport from './warehouseimport';
import WarehouseExport from './warehouseexport';
import WarehouseFabricProvider from './warehousefabricprovider';
import WarehouseFabricType from './warehousefabrictype';
import WarehouseFabricColor from './warehousefabriccolor';
import WarehouseReport from './warehousereport';

const TabPane = Tabs.TabPane;

const WrappedWarehouseExport = Form.create()(WarehouseExport);
const WrappedWarehouseImport = Form.create()(WarehouseImport);
const WrappedWarehouseReport = Form.create()(WarehouseReport);
const WrappedWarehouseFabricProvider = Form.create()(WarehouseFabricProvider);
const WrappedWarehouseFabricType = Form.create()(WarehouseFabricType);
const WrappedWarehouseFabricColor = Form.create()(WarehouseFabricColor);

class ViewWarehouse extends Component {

    /*
    render() {
        console.log(ExcelFile);

        return (
            <ExcelFile>
                <ExcelSheet dataSet={multiDataSet} name="Organization" />
            </ExcelFile>

        );
    }
    */
    render() {
        return (
            
            <Tabs defaultActiveKey="1">
                <TabPane tab="IMPORT" key="1"><WrappedWarehouseImport /></TabPane>
                <TabPane tab="EXPORT" key="2"><WrappedWarehouseExport /></TabPane>
                <TabPane tab="REPORT" key="3"><WrappedWarehouseReport /></TabPane>
                <TabPane tab="SUPPLIER" key="4"><WrappedWarehouseFabricProvider /></TabPane>
                <TabPane tab="TYPE" key="5"><WrappedWarehouseFabricType /></TabPane>
                <TabPane tab="COLOR" key="6"><WrappedWarehouseFabricColor /></TabPane>
            </Tabs>
        );
    }
}

export default ViewWarehouse;