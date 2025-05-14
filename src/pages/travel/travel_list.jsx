import React, { useState } from 'react';
// import "../travel.css";
import Logo from '../../components/travel_list_components/Logo';
import Form from '../../components/travel_list_components/Form';
import { PackingList } from '../../components/travel_list_components/PackingList';


function Stats() {
    return (
        <footer className="stats">
            <em>
                You have X items on your list and you already packed X
            </em>
        </footer>
    )
}
const TravelList = () => {
    const [items, setItems] = useState([]);
    function handleAddItems(item){
        setItems((items) => [...items, item]);
    }
    function hanldeDeleteItem(id){
        setItems((items) => items.filter(item => item.id !== id))
        console.log('Deleted item with id:', id)
    }
    function handleCheckItem(id) {
        setItems((items) => items.filter(item => item.id));
        console.log('CheckItem ', id);
    }
    function handleToggleItem(id){
        setItems(items => 
            items.map(item =>
                item.id === id ? {...item, packed: !item.packed} : item
            )
        )
        console.log("ToggleItem ", id);
    }
    function clearListItem(){
        const confirmed = window.confirm('Are you sure want to delete all lists?');
        if(confirmed) setItems([]);
    }
    return (
        <>
            <div className="app">
                <Logo
                 title='Travel Packing List'
                 />
                <Form onAddItems = {handleAddItems}/>
                <PackingList items = {items} onDeleteItems = {hanldeDeleteItem} onCheckBox = {handleCheckItem} onToggleItems = {handleToggleItem} clearListItem = {clearListItem}/>
                <Stats />
            </div>
        </>
    )
}


export default TravelList;