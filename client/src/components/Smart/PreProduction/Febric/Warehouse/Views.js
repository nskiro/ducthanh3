import React, { Component } from 'react';
import { Tabs, Form } from 'antd';

//css
import './views.css';
//import { constants } from 'zlib';

import WarehouseImport from './warehouseimport';
import WarehouseExport from './warehouseexport';
import WarehouseFabricProvider from './warehousefabricprovider';
import WarehouseFabricColor from './warehousefabriccolor';
import WarehouseFabricType from './warehousefabrictype';

const TabPane = Tabs.TabPane;

const WrappedWarehouseExport = Form.create()(WarehouseExport);
const WrappedWarehouseImport = Form.create()(WarehouseImport);
const WrappedWarehouseFabricProvider = Form.create()(WarehouseFabricProvider);
const WrappedWarehouseFabricType = Form.create()(WarehouseFabricType);
const WrappedWarehouseFabricColor = Form.create(WarehouseFabricColor);

class ViewWarehouse extends Component {

    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Nhập kho" key="1"><WrappedWarehouseImport /></TabPane>
                <TabPane tab="Xuất kho" key="2"><WrappedWarehouseExport /></TabPane>
                <TabPane tab="Xuất báo cáo" key="3">Content of Tab Pane 3</TabPane>
                <TabPane tab="Nhà cung cấp" key="4"><WrappedWarehouseFabricProvider /></TabPane>
                <TabPane tab="Loại vải" key="5"><WrappedWarehouseFabricType /></TabPane>
                <TabPane tab="Màu vải" key="6"><WrappedWarehouseFabricColor/></TabPane>
            </Tabs>
        );
    }
}

export default ViewWarehouse;