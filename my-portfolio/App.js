import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import AddStockItems from './components/add-stock-items';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
  }

  getCurrentPrice = (stockItem) => {
    fetch("https://financialmodelingprep.com/api/v3/quote/"+ stockItem.symbol)
    .then(response=>response.json())
    .then(response=> {

      let currentStockItem = response[0];
      Object.keys(currentStockItem).forEach(key => stockItem[key]= currentStockItem[key]);
      console.log("new stock item" + JSON.stringify(stockItem));
    }).catch(error=> console.log(error));
}


  addUpdateStock = (newSymbol, operation) => {
    if (operation == "add") {
      this.setState(prevItems => {
        this.getCurrentPrice(newSymbol);
        prevItems.stocks = [newSymbol, ...prevItems.stocks];
        return prevItems;
      });
    } else {

      this.setState(prevItems => {
        let stocks = prevItems.stocks;
        let index = stocks.findIndex(obj => obj.symbol == newSymbol.symbol);
        stocks[index].unitPrice = newSymbol.unitPrice;
        stocks[index].quantity = newSymbol.quantity;
        prevItems.stocks = stocks.slice();
        return prevItems;
      });
    }
    
  }

  saveAllList = () => {
    AsyncStorage.setItem('stocks', JSON.stringify(this.state.stocks));
  }

  deleteSymbol = (symbol) => {
    if (symbol) {
      let stocks = this.state.stocks.filter(stock => stock.symbol !== symbol);
      this.setState({ stocks: stocks });
    }
  }

  componentDidMount() {
    // create a function that saves your data asyncronously

    try {
      AsyncStorage.getItem('stocks').then(result => {
        console.log("got result" + result)
        if (result) {
          let stockItems = JSON.parse(result);
          stockItems.forEach(stockItem => {
            this.getCurrentPrice(stockItem);
          });
          this.setState({ stocks: stockItems.slice() });
        }
      });


    } catch (error) {
      console.log(error);
    }
  }

  render() {
    
    return (<View style={{ width: '100%', paddingTop:25, flex:1, flexWrap:'nowrap'}}>
      <View style={{backgroundColor:'darkslateblue',  padding:10}}><Text style={{color:'white', fontSize:20, textAlign:'center'}}> My Portfolio </Text></View>
      <AddStockItems stocks={this.state.stocks} addUpdateStock={this.addUpdateStock} deleteSymbol={this.deleteSymbol} />
      <View style={{paddingTop:60}}>
        <Button title="Save Stocks" onPress={AsyncStorage.clear()} />
      </View> 
    </View>);
   
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
}

export default App;
