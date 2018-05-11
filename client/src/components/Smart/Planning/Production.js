import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-bootstrap';

import JqxExpander from '../../../jqwidgets-react/react_jqxexpander';
import JqxGrid , { jqx } from '../../../jqwidgets-react/react_jqxgrid';
import JqxCheckBox from '../../../jqwidgets-react/react_jqxcheckbox';

import cmConfig from '../../../CommonConfig';
import Aux from '../../../hoc';
import axios from '../../../axiosInst';

let sources = {
    datatype: 'array',
    localdata: [],
    id: "_id",
    datafields: [
        {name: "_id", type: "string"},
        {format: "mm/dd/yyyy", name: "poIssued", type: "date"},
        {format: "mm/dd", name: "shipBy", type: "date"},
        {name: "order", type: "string"},
        {name: "po", type: "number"},
        {name: "line", type: "number"},
        {name: "destination", type: "string"},
        {name: "sku", type: "string"},
        {name: "description", type: "string"},
        {name: "hangTheu", type: "string"},
        {name: "originalQty", type: "number"},
        {name: "factoryQty", type: "number"},
        {format: "mm/dd", name: "originalDueDate", type: "date"},
        {format: "mm/dd", name: "exFtyDate", type: "date"},
        {format: "mm/dd", name: "ebExFtyDate", type: "date"},
        {name: "ebFactoryQty", type: "number"},
        {format: "mm/dd", name: "letterReleaseDate", type: "date"},
        {format: "mm/dd", name: "bookingSentDate", type: "date"},
        {format: "mm/dd", name: "bookingConfirmationDate", type: "date"},
        {format: "mm/dd", name: "etdFactory", type: "date"},
        {format: "mm/dd", name: "etdVietNam", type: "date"},
        {format: "mm/dd", name: "bolDate", type: "date"},
        {format: "mm/dd", name: "etaDate", type: "date"},
        {name: "xContainer", type: "number"},
        {name: "containerNum", type: "number"},
        {name: "vnInvoice", type: "number"},
        {name: "serialnumber", type: "number"},
        {name: "cartons", type: "number"},
        {name: "factoryNotes", type: "string"},
        {name: "ergobabyNotes", type: "string"},
        {name: "productGroup", type: "string"},
        {name: "type", type: "string"},
        {name: "country", type: "string"},
        {name: "factory", type: "string"},
        {name: "packingInstruction", type: "string"},
        {name: "totalFabricStatus", type: "string"},
        {name: "vaiChinh", type: "string"},
        {name: "dmVaiChinh", type: "float"},
        {name: "slVaiChinh", type: "float"},
        {name: "ttVaiChinh", type: "string"},
        {name: "vaiLot", type: "string"},
        {name: "dmVaiLot", type: "float"},
        {name: "slVaiLot", type: "float"},
        {name: "ttVaiLot", type: "string"},
        {name: "vaiVien", type: "string"},
        {name: "dmVaiVien", type: "float"},
        {name: "slVaiVien", type: "float"},
        {name: "ttVaiVien", type: "string"},
        {name: "luoiNho", type: "string"},
        {name: "dmLuoiNho", type: "float"},
        {name: "slLuoiNho", type: "float"},
        {name: "ttLuoiNho", type: "string"},
        {name: "luoiLon", type: "string"},
        {name: "dmLuoiLon", type: "float"},
        {name: "slLuoiLon", type: "float"},
        {name: "ttLuoiLon", type: "string"},
        {name: "vaiLot1", type: "string"},
        {name: "dmVaiLot1", type: "float"},
        {name: "slVaiLot1", type: "float"},
        {name: "ttVaiLot1", type: "string"},
        {name: "vaiLot2", type: "string"},
        {name: "dmVaiLot2", type: "float"},
        {name: "slVaiLot2", type: "float"},
        {name: "ttVaiLot2", type: "string"},
        {name: "vaiLot3", type: "string"},
        {name: "dmVaiLot3", type: "float"},
        {name: "slVaiLot3", type: "float"},
        {name: "ttVaiLot3", type: "string"},
        {name: "vaiLot4", type: "string"},
        {name: "dmVaiLot4", type: "float"},
        {name: "slVaiLot4", type: "float"},
        {name: "ttVaiLot4", type: "string"},
        {name: "vaiLot5", type: "string"},
        {name: "dmVaiLot5", type: "float"},
        {name: "slVaiLot5", type: "float"},
        {name: "ttVaiLot5", type: "string"},
        {name: "buckle", type: "string"},
        {name: "nhan", type: "string"},
        {name: "hop", type: "string"},
        {name: "nut", type: "string"},
        {name: "phuLieuKhac", type: "string"}
    ]
};

let dataAdapter = new jqx.dataAdapter(sources);

class Production extends Component {
    componentDidMount(){
        axios.get('/api/planning/production')
        .then((res) => {
            sources.localdata = res.data;
            this.refs.gridProductionPlanning.updatebounddata('cells');
        })
        .catch((err)=> {

        });
        this.refs.chkPoIssued.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('poIssued', checkState);
        });
        this.refs.chkShipBy.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('shipBy', checkState);
        });
        this.refs.chkDestination.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('destination', checkState);
        });
        this.refs.chkSKU.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('sku', checkState);
        });
        this.refs.chkHangTheu.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('hangTheu', checkState);
        });
        this.refs.chkOriginalDueDate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('originalDueDate', checkState);
        });
        this.refs.chkExFTYDate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('exFtyDate', checkState);
        });
        this.refs.chkEbExFTYDate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('ebExFtyDate', checkState);
        });
        this.refs.chkEbFactoryQty.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('ebFactoryQty', checkState);
        });
        this.refs.chkLetterReleaseDate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('letterReleaseDate', checkState);
        });
        this.refs.chkBookingSentDate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('bookingSentDate', checkState);
        });
        this.refs.chkBookingConfirmationDate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('bookingConfirmationDate', checkState);
        });
        this.refs.chkETDFactory.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('etdFactory', checkState);
        });
        this.refs.chkETDVietNam.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('etdVietNam', checkState);
        });
        this.refs.chkBOLDate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('bolDate', checkState);
        });
        this.refs.chkETADate.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('etaDate', checkState);
        });
        this.refs.chkXContainer.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('xContainer', checkState);
        });
        this.refs.chkContainerNum.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('containerNum', checkState);
        });
        this.refs.chkVnInvoice.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vnInvoice', checkState);
        });
        this.refs.chkSERIALNUMBER.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('serialnumber', checkState);
        });
        this.refs.chkCARTONS.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('cartons', checkState);
        });
        this.refs.chkFactoryNotes.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('factoryNotes', checkState);
        });
        this.refs.chkErgobabyNotes.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('ergobabyNotes', checkState);
        });
        this.refs.chkProductGroup.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('productGroup', checkState);
        });
        this.refs.chkType.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('type', checkState);
        });
        this.refs.chkCountry.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('country', checkState);
        });
        this.refs.chkFactory.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('factory', checkState);
        });
        this.refs.chkPackingInstruction.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('packingInstruction', checkState);
        });
        this.refs.chkTotalFabricStatus.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('totalFabricStatus', checkState);
        });
        this.refs.chkVaiChinh.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiChinh', checkState);
            this.setColumnsProperties('dmVaiChinh', checkState);
            this.setColumnsProperties('slVaiChinh', checkState);
            this.setColumnsProperties('ttVaiChinh', checkState);
        });
        this.refs.chkVaiLot.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiLot', checkState);
            this.setColumnsProperties('dmVaiLot', checkState);
            this.setColumnsProperties('slVaiLot', checkState);
            this.setColumnsProperties('ttVaiLot', checkState);
        });
        this.refs.chkVaiVien.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiVien', checkState);
            this.setColumnsProperties('dmVaiVien', checkState);
            this.setColumnsProperties('slVaiVien', checkState);
            this.setColumnsProperties('ttVaiVien', checkState);
        });
        this.refs.chkLuoiNho.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('luoiNho', checkState);
            this.setColumnsProperties('dmLuoiNho', checkState);
            this.setColumnsProperties('slLuoiNho', checkState);
            this.setColumnsProperties('ttLuoiNho', checkState);
        });
        this.refs.chkLuoiLon.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('luoiLon', checkState);
            this.setColumnsProperties('dmLuoiLon', checkState);
            this.setColumnsProperties('slLuoiLon', checkState);
            this.setColumnsProperties('ttLuoiLon', checkState);
        });
        this.refs.chkVaiLot1.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiLot1', checkState);
            this.setColumnsProperties('dmVaiLot1', checkState);
            this.setColumnsProperties('slVaiLot1', checkState);
            this.setColumnsProperties('ttVaiLot1', checkState);
        });
        this.refs.chkVaiLot2.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiLot2', checkState);
            this.setColumnsProperties('dmVaiLot2', checkState);
            this.setColumnsProperties('slVaiLot2', checkState);
            this.setColumnsProperties('ttVaiLot2', checkState);
        });
        this.refs.chkVaiLot3.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiLot3', checkState);
            this.setColumnsProperties('dmVaiLot3', checkState);
            this.setColumnsProperties('slVaiLot3', checkState);
            this.setColumnsProperties('ttVaiLot3', checkState);
        });
        this.refs.chkVaiLot4.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiLot4', checkState);
            this.setColumnsProperties('dmVaiLot4', checkState);
            this.setColumnsProperties('slVaiLot4', checkState);
            this.setColumnsProperties('ttVaiLot4', checkState);
        });
        this.refs.chkVaiLot5.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('vaiLot5', checkState);
            this.setColumnsProperties('dmVaiLot5', checkState);
            this.setColumnsProperties('slVaiLot5', checkState);
            this.setColumnsProperties('ttVaiLot5', checkState);
        });
        this.refs.chkBuckle.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('buckle', checkState);
        });
        this.refs.chkNhan.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('nhan', checkState);
        });
        this.refs.chkHop.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('hop', checkState);
        });
        this.refs.chkNut.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('nut', checkState);
        });
        this.refs.chkPhuLieuKhac.on('change', (event) => {
            const checkState = event.args.checked;
            this.setColumnsProperties('phuLieuKhac', checkState);
        });
    }

    setColumnsProperties = (colName,value) => {
        this.refs.gridProductionPlanning.beginupdate();
        if(value){
            this.refs.gridProductionPlanning.showcolumn(colName);
        }
        else{
            this.refs.gridProductionPlanning.hidecolumn(colName);
        }
        this.refs.gridProductionPlanning.endupdate();
        
    }

    render(){
        
        let columns = [
            {text:"",datafield: "_id",hidden: true},
            {cellsalign: "center", datafield: "order", text: "Order", width: 120},
            {cellsalign: "center", datafield: "po", text: "PO", width: 68},
            {cellsalign: "center", datafield: "line", text: "Line", width: 68},
            {datafield: "sku", hidden: true, text: "SKU"},
            {datafield: "description", text: "Description", width: 370},
            {datafield: "destination", hidden: true, text: "Destination"},
            {datafield: "country", text: "Country", width: 120},
            {cellsformat: "MM/dd/yyyy", datafield: "poIssued", hidden: true, text: "POIssued"},
            {cellsformat: "MM/dd", datafield: "shipBy", hidden: true, text: "ShipBy"},
            {datafield: "hangTheu", hidden: true, text: "HangTheu"},
            {cellsalign: "right", cellsformat: "n", datafield: "originalQty", text: "OriginalQty"},
            {cellsalign: "right", cellsformat: "n", datafield: "factoryQty", text: "FactoryQty"},
            {cellsformat: "MM/dd", datafield: "originalDueDate", hidden: true, text: "OriginalDueDate"},
            {cellsalign: "center", cellsformat: "MM/dd", datafield: "exFtyDate", text: "ExFTYDate"},
            {cellsformat: "MM/dd", datafield: "ebExFtyDate", hidden: true, text: "EbExFTYDate"},
            {datafield: "ebFactoryQty", hidden: true, text: "EbFactoryQty"},
            {cellsformat: "MM/dd", datafield: "letterReleaseDate", hidden: true, text: "LetterReleaseDate"},
            {cellsformat: "MM/dd", datafield: "bookingSentDate", hidden: true, text: "BookingSentDate"},
            {cellsformat: "MM/dd", datafield: "bookingConfirmationDate", hidden: true, text: "BookingConfirmationDate"},
            {cellsformat: "MM/dd", datafield: "etdFactory", hidden: true, text: "ETDFactory"},
            {cellsformat: "MM/dd", datafield: "etdVietNam", hidden: true, text: "ETDVietNam"},
            {cellsformat: "MM/dd", datafield: "bolDate", hidden: true, text: "BOLDate"},
            {cellsformat: "MM/dd", datafield: "etaDate", hidden: true, text: "ETADate"},
            {datafield: "xContainer", hidden: true, text: "XContainer"},
            {datafield: "containerNum", hidden: true, text: "ContainerNum"},
            {datafield: "vnInvoice", hidden: true, text: "VnInvoice"},
            {datafield: "serialnumber", hidden: true, text: "SERIALNUMBER"},
            {datafield: "cartons", hidden: true, text: "CARTONS"},
            {datafield: "factoryNotes", hidden: true, text: "FactoryNotes"},
            {datafield: "ergobabyNotes", hidden: true, text: "ErgobabyNotes"},
            {datafield: "productGroup", hidden: true, text: "ProductGroup"},
            {datafield: "type", hidden: true, text: "TYPE"},
            {datafield: "factory", hidden: true, text: "Factory"},
            {datafield: "packingInstruction", hidden: true, text: "PackingInstruction"},
            {datafield: "totalFabricStatus", hidden: true, text: "TotalFabricStatus"},
            {datafield: "vaiChinh", hidden: true, text: "VaiChinh"},
            {cellsalign: "right", datafield: "dmVaiChinh", hidden: true, text: "DMVaiChinh"},
            {cellsalign: "right", datafield: "slVaiChinh", hidden: true, text: "SLVaiChinh"},
            {datafield: "ttVaiChinh", hidden: true, text: "TTVaiChinh"},
            {datafield: "vaiLot", hidden: true, text: "VaiLot"},
            {cellsalign: "right", datafield: "dmVaiLot", hidden: true, text: "DMVaiLot"},
            {cellsalign: "right", datafield: "slVaiLot", hidden: true, text: "SLVaiLot"},
            {datafield: "ttVaiLot", hidden: true, text: "TTVaiLot"},
            {datafield: "vaiVien", hidden: true, text: "VaiVien"},
            {cellsalign: "right", datafield: "dmVaiVien", hidden: true, text: "DMVaiVien"},
            {cellsalign: "right", datafield: "slVaiVien", hidden: true, text: "SLVaiVien"},
            {datafield: "ttVaiVien", hidden: true, text: "TTVaiVien"},
            {datafield: "luoiNho", hidden: true, text: "LuoiNho"},
            {cellsalign: "right", datafield: "dmLuoiNho", hidden: true, text: "DMLuoiNho"},
            {cellsalign: "right", datafield: "slLuoiNho", hidden: true, text: "SLLuoiNho"},
            {datafield: "ttLuoiNho", hidden: true, text: "TTLuoiNho"},
            {datafield: "luoiLon", hidden: true, text: "LuoiLon"},
            {cellsalign: "right", datafield: "dmLuoiLon", hidden: true, text: "DMLuoiLon"},
            {cellsalign: "right", datafield: "slLuoiLon", hidden: true, text: "SLLuoiLon"},
            {datafield: "ttLuoiLon", hidden: true, text: "TTLuoiLon"},
            {datafield: "vaiLot1", hidden: true, text: "VaiLot1"},
            {cellsalign: "right", datafield: "dmVaiLot1", hidden: true, text: "DMVaiLot1"},
            {cellsalign: "right", datafield: "slVaiLot1", hidden: true, text: "SLVaiLot1"},
            {datafield: "ttVaiLot1", hidden: true, text: "TTVaiLot1"},
            {datafield: "vaiLot2", hidden: true, text: "VaiLot2"},
            {cellsalign: "right", datafield: "dmVaiLot2", hidden: true, text: "DMVaiLot2"},
            {cellsalign: "right", datafield: "slVaiLot2", hidden: true, text: "SLVaiLot2"},
            {datafield: "ttVaiLot2", hidden: true, text: "TTVaiLot2"},
            {datafield: "vaiLot3", hidden: true, text: "VaiLot3"},
            {cellsalign: "right", datafield: "dmVaiLot3", hidden: true, text: "DMVaiLot3"},
            {cellsalign: "right", datafield: "slVaiLot3", hidden: true, text: "SLVaiLot3"},
            {datafield: "ttVaiLot3", hidden: true, text: "TTVaiLot3"},
            {datafield: "vaiLot4", hidden: true, text: "VaiLot4"},
            {cellsalign: "right", datafield: "dmVaiLot4", hidden: true, text: "DMVaiLot4"},
            {cellsalign: "right", datafield: "slVaiLot4", hidden: true, text: "SLVaiLot4"},
            {datafield: "ttVaiLot4", hidden: true, text: "TTVaiLot4"},
            {datafield: "vaiLot5", hidden: true, text: "VaiLot5"},
            {cellsalign: "right", datafield: "dmVaiLot5", hidden: true, text: "DMVaiLot5"},
            {cellsalign: "right", datafield: "slVaiLot5", hidden: true, text: "SLVaiLot5"},
            {datafield: "ttVaiLot5", hidden: true, text: "TTVaiLot5"},
            {datafield: "buckle", hidden: true, text: "Buckle"},
            {datafield: "nhan", hidden: true, text: "Nhan"},
            {datafield: "hop", hidden: true, text: "Hop"},
            {datafield: "nut", hidden: true, text: "Nut"},
            {datafield: "phuLieuKhac", hidden: true, text: "PhuLieuKhac"}
        ];

        const gridToolbar = (toolbar) => {
            let container = document.createElement('div');
            container.style.margin = '5px';

            let inputContainer = document.createElement('div');
            inputContainer.style.float = 'left';

            container.appendChild(inputContainer);
            toolbar[0].appendChild(container);

            ReactDOM.render(
                <button onClick={() => {this.refs.gridProductionPlanning.autoresizecolumns()}} className="jqx-rc-all jqx-rc-all-bootstrap jqx-button jqx-button-bootstrap jqx-widget jqx-widget-bootstrap jqx-fill-state-normal jqx-fill-state-normal-bootstrap" aria-disabled="false" style={{height: '25px',marginRight:'5px'}}>Resize</button>, inputContainer);
        };

        return(
            <Aux>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <legend>View Production Planning</legend>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <JqxExpander theme={cmConfig.theme}  expanded={false}>
                            <div>Select Column(s)</div>
                            <div>
                                <Row>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Po Issued' ref='chkPoIssued' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Ship By' ref='chkShipBy' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Destination' ref='chkDestination' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='SKU' ref='chkSKU' height={25}/></Col>
                                    <Col xs={6} sm={2}> <JqxCheckBox theme={cmConfig.theme} value='Hang Theu' ref='chkHangTheu' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Eb Factory Qty' ref='chkEbFactoryQty' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Original Due Date' ref='chkOriginalDueDate' height={25}/></Col>
                                    <Col xs={6} sm={2}>
                                        <JqxExpander theme={cmConfig.theme}  expanded={false}>
                                            <div>Ready Date</div>
                                            <div>
                                                <JqxCheckBox theme={cmConfig.theme} value='Ex FTY Date' ref='chkExFTYDate' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Eb Ex FTY Date' ref='chkEbExFTYDate' height={25}/>
                                            </div>
                                        </JqxExpander>
                                    </Col>
                                    <Col xs={6} sm={2}>
                                        <JqxExpander theme={cmConfig.theme}  expanded={false}>
                                            <div>Shipping Status</div>
                                            <div>
                                                <JqxCheckBox theme={cmConfig.theme} value='Letter Release Date' ref='chkLetterReleaseDate' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Booking Sent Date' ref='chkBookingSentDate' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Confirmation Date' ref='chkBookingConfirmationDate' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='ETD Factory' ref='chkETDFactory' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='ETD Viet Nam' ref='chkETDVietNam' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='BOL Date' ref='chkBOLDate' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='ETA Date' ref='chkETADate' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='X Container' ref='chkXContainer' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Container Num' ref='chkContainerNum' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vn Invoice' ref='chkVnInvoice' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='SERIALNUMBER' ref='chkSERIALNUMBER' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='CARTONS' ref='chkCARTONS' height={25}/>
                                            </div>
                                        </JqxExpander>
                                    </Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Factory Notes' ref='chkFactoryNotes' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Ergobaby Notes' ref='chkErgobabyNotes' height={25}/></Col>
                                    <Col xs={6} sm={2}>
                                        <JqxExpander theme={cmConfig.theme}  expanded={false}>
                                            <div>Group/Type</div>
                                            <div>
                                                <JqxCheckBox theme={cmConfig.theme} value='Product Group' ref='chkProductGroup' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Type' ref='chkType' height={25}/>
                                            </div>
                                        </JqxExpander>
                                    </Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Country' ref='chkCountry' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Factory' ref='chkFactory' height={25}/></Col>
                                    <Col xs={6} sm={2}><JqxCheckBox theme={cmConfig.theme} value='Packing Instruction' ref='chkPackingInstruction' height={25}/></Col>
                                    <Col xs={6} sm={2}>
                                        <JqxExpander theme={cmConfig.theme}  expanded={false}>
                                            <div>Fabric</div>
                                            <div>
                                                <JqxCheckBox theme={cmConfig.theme} value='Total Fabric Status' ref='chkTotalFabricStatus' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Chinh' ref='chkVaiChinh' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Lot' ref='chkVaiLot' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Vien' ref='chkVaiVien' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Luoi Nho' ref='chkLuoiNho' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Luoi Lon' ref='chkLuoiLon' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Lot 1' ref='chkVaiLot1' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Lot 2' ref='chkVaiLot2' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Lot 3' ref='chkVaiLot3' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Lot 4' ref='chkVaiLot4' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Vai Lot 5' ref='chkVaiLot5' height={25}/>
                                            </div>
                                        </JqxExpander>
                                    </Col>
                                    <Col xs={6} sm={2}>
                                        <JqxExpander theme={cmConfig.theme}  expanded={false}>
                                            <div>Trim</div>
                                            <div>
                                                <JqxCheckBox theme={cmConfig.theme} value='Buckle' ref='chkBuckle' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Nhan' ref='chkNhan' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Hop' ref='chkHop' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Nut' ref='chkNut' height={25}/>
                                                <JqxCheckBox theme={cmConfig.theme} value='Phu Lieu Khac' ref='chkPhuLieuKhac' height={25}/>
                                            </div>
                                        </JqxExpander>
                                    </Col>
                                </Row>
                            </div>
                        </JqxExpander>
                    </Col>
                </Row>
                <Row style={{marginTop: '5px'}}>
                    <Col xs={12} sm={12}>
                        <JqxGrid
                            ref='gridProductionPlanning'
                            source = {dataAdapter}
                            columns = {columns}
                            columnsresize = {true}
                            filterable = {true}
                            width = {'100%'}
                            pageable = {true}
                            sortable = {true}
                            enabletooltips = {true}
                            autoheight = {true}
                            filtermode={'excel'}
                            showtoolbar = {true}
                            rendertoolbar = {gridToolbar}
                            theme={cmConfig.theme}
                        />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Production;