export const mapListItemsToTags = (listItems) => {
    var tags = [];
    listItems.map(listItem => {
        var tag = {id: listItem.list_item_id, name: listItem.list_item_name};
        tags.push(tag);
    })
    return tags;


}

