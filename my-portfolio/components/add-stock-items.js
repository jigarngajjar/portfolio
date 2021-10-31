import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, Text } from 'react-native';
import CurrentStockItem from './my-stock'


const AddStockItems = (props) => {

    const [symbol, setSymbol] = useState();
    const [unitPrice, setUnitPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [currentOperation, setCurrentOperation] = useState('add');

    const [addUpdateButtonText, setAddUpdateButtonText] = useState('Add Stock');



    const onChangeSymbol = (symbol) => setSymbol(symbol);
    const onChangeUnitePrice = (quantity) => setUnitPrice(quantity);
    const onChangeQuantity = (unitPrice) => setQuantity(unitPrice);

    const addUpdateSymbol = () => {

        let newSymbol = { symbol, unitPrice, quantity };
        props.addUpdateStock(newSymbol, currentOperation);
        setCurrentOperation("add");
        setAddUpdateButtonText("Add Stock");
        setSymbol('');
        setUnitPrice('');
        setQuantity('');
    }

    const deleteSymbol = (symbol) => {
        props.deleteSymbol(symbol);
    }

    const selectSymbol = (item) => {
        setQuantity(item.quantity);
        setSymbol(item.symbol);
        setUnitPrice(item.unitPrice);
        setCurrentOperation("update");
        setAddUpdateButtonText("Update Stock");
    }

    return (
        <View>
            <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
                <TextInput style={{height:40, fontSize:20, borderColor:'cyan', borderBottomWidth:2 }} disabled={currentOperation == "update"} placeholder="Symbol" onChangeText={onChangeSymbol} inputref={ref => { symbol = ref; }} value={symbol} />
                <TextInput style={{height:40, fontSize:20, borderColor:'cyan', borderBottomWidth:2 }} placeholder="Qty" onChangeText={onChangeQuantity} inputref={ref => { quantity = ref; }} value={quantity} />
                <TextInput style={{height:40, fontSize:20, borderColor:'cyan', borderBottomWidth:2 }} placeholder="Per Share" onChangeText={onChangeUnitePrice} inputref={ref => { unitPrice = ref; }} value={unitPrice} />
                <Button title="Add/Update" onPress={addUpdateSymbol} />
            </View>
            <View style={{top:60}}>
                <FlatList data={props.stocks} renderItem={(stock) => <CurrentStockItem stock={stock} deleteSymbol={deleteSymbol} selectSymbol={selectSymbol} />} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    stockContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: '#f8f8f8',
        paddingBottom: 30,
        paddingTop: 20,
        borderWidth: 2,
        justifyContent: 'flex-start',
        textAlign: 'left',
        borderColor: '#fff'
    },
    itemSymbol: {
        width: '5%',
        height: 30,
        padding: 10,
        alignContent: 'flex-start'
    },
    itemQuantity: {
        width: '5%',
        height: 30,
        padding: 10,
        alignContent: 'flex-start'
    },
    itemUnit: {
        width: '10%',
        height: 30,
        padding: 10,
        alignContent: 'flex-start'
    },
    item: {
        width: '11.10%'
    }
});

export default AddStockItems;