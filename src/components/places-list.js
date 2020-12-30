const PlacesList = ({ attractions, ids, curPlace }) => {
    const selectedItems = (attractions || []).filter(attraction => (ids || []).indexOf(attraction) >= 0 );
    const list = selectedItems.map(item =>
        <li className="list-group-item py-0 my-0">
            <i className="px-0 fa fa-trash"></i>
            <label className="px-2">{item.name}</label>
        </li>
    );

    return (
        <ul className="list-group">
            {list}
        </ul>
    )
}

export default PlacesList;
