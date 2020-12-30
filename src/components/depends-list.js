const DependsList = ({ depRecs, depIds, curDepRec }) => {
    const selectedItems = (depRecs || []).filter(depRec => (depIds || []).indexOf(depRec.id) >= 0 );
    const dropDownItems = (depRecs || []).filter(depRec => (depIds || []).indexOf(depRec.id) < 0 );

    const list = selectedItems.map(item => {
        const lineItem = <li className="list-group-item py-0 my-0">
            <i className="px-0 fa fa-trash"></i>
            <label className="px-2">{item.name}</label>
        </li>

        return lineItem;
    });

    return (
        <ul className="list-group">
            {list}
        </ul>
    )
}

export default DependsList;
