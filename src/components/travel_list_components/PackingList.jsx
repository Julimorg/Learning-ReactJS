import React from "react";
import { useState } from "react";
import { Item } from "./Item";

export const PackingList = ({items , onDeleteItems, onToggleItems, clearListItem}) => {
    const[sortBy, setSortBy] = useState("input");

    let sortListItems ;
    if ( sortBy === 'input' ) sortListItems = items;

    if (sortBy === 'description') sortListItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed') sortListItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

    return ( 
        <div className="list">
            <ul>
                {
                    sortListItems.map((item) => {
                        return (
                            <Item item={item} onDeleteItems = {onDeleteItems}  onToggleItems = {onToggleItems} key = {item.id}/>
                        )
                    })

                }
            </ul>
            <div className="actions" onChange = {(e) => setSortBy(e.target.value)}>
                <select value = {`${sortBy}`}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick = {clearListItem}>Clear List</button>
            </div>
        </div>
    )
}