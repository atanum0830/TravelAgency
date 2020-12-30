import React, { Fragment } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DependsList = ({ id, name, depRecs, depIds, curDepRec, addItem, deleteItem }) => {
    const selectedItems = (depRecs || []).filter(depRec => (depIds || []).indexOf(depRec.id) >= 0 );
    const dropDownItems = (depRecs || []).filter(depRec => (depIds || []).indexOf(depRec.id) < 0 );

    const selectedList = selectedItems.map((item, index) => {
        const lineItem = <li key={index} className="list-group-item py-0 my-0">
            <i className="px-0 fa fa-trash"
                onClick={() => {
                    deleteItem(name, item, index);
                }}
            ></i>
            <label className="px-2">{item.name}</label>
        </li>

        return lineItem;
    });

    const dropDownList = dropDownItems.map((item, index) => {
        const dropDownItem = <Dropdown.Item key={index}
            onClick={() => {
                addItem(name, item, index);
            }}
        >{item.name}</Dropdown.Item>

        return dropDownItem;
    });

    return (
        <Fragment>
            <DropdownButton id="addDetailItem" size="sm" title="Add New Item">
                {dropDownList}
            </DropdownButton>

            <ul className="list-group">
                {selectedList}
            </ul>
        </Fragment>
    )
}

export default DependsList;
