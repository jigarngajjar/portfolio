import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CurrentStockItem = (props) => {

    const [visible, setVisible] = useState(false);

    const toggleStockDetail = () => {
        setVisible(!visible);
    }

    return (
        <View>
            <TouchableOpacity onPress={toggleStockDetail}>
                <View style={styles.stockContainer}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemQuantity}>Qty:{props.stock.item.quantity} | Avg. Price {props.stock.item.unitPrice}</Text>
                        </View>
                        <View>
                            <Text style={styles.itemSymbol}>{props.stock.item.symbol}</Text>
                        </View>
                        <View>
                            <Text style={styles.itemPrice}>Invested:{(props.stock.item.unitPrice * props.stock.item.quantity).toFixed(2)} </Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.itemPrice}>LTP:{props.stock.item.price} ({props.stock.item.changesPercentage}%)</Text>
                            <Text style={styles.itemPrice}>Gain/Loss {((props.stock.item.quantity * props.stock.item.price) - (props.stock.item.unitPrice * props.stock.item.quantity)).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View>{visible  ? (
                <View style={styles.stockDetailPanel}>

                    <View style={styles.stockDetails}>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.open}</Text>
                            <Text>Open</Text></View>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.dayHigh}</Text>
                            <Text>Today's High</Text></View>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.dayLow}</Text>
                            <Text>Today's Low</Text></View>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.yearHigh}</Text>
                            <Text>52 Week High</Text></View>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.yearLow}</Text>
                            <Text>52 Week Low</Text></View>
                    </View>
                    <View style={styles.stockDetails}>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.volume}</Text>
                            <Text>Volume</Text></View>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.avgVolume}</Text>
                            <Text>Average Volume</Text></View>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.marketCap ? props.stock.item.marketCap : 'N/A'}</Text>
                            <Text>Market Cap</Text></View>
                        <View style={styles.stockExtraDetail}><Text>{props.stock.item.pe ? props.stock.item.pe : 'N/A'}</Text>
                            <Text>P/E Ratio</Text></View>
                    </View>

                </View>) : <Text></Text>}</View>
        </View>

    );
}

const styles = StyleSheet.create({
    stockContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderWidth: 1,
        borderColor: 'cyan'
    },
    item: {
        width: '70%'
    },
    itemUnitPrice: {
        color: 'red',
        fontSize: 15

    },
    itemPrice: {
        color: 'green',
        fontSize: 10
    },
    itemSymbol: {
        fontSize: 25,
        color: 'green',
    },
    itemQuantity: {
        color: 'green',
        fontSize: 10
    },
    stockDetailPanel: {
        flex: 4,
        flexDirection: 'row',
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'cyan',
        flexWrap: 'wrap',
    },
    stockDetails: {
        width: '30%',
        margin: 20
    },
    stockExtraDetail: {
        paddingBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
});

export default CurrentStockItem;