import React from 'react'
import {FlatList, Text, StyleSheet, View, Button, TextInput, ActivityIndicator} from 'react-native'
import film from '../Helpers/filmsData' 
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends React.Component {
    constructor(props){
        super(props)
            this.page = 0
            this.totalPages = 0 
            this.searchedText = ""
            this.state = {
                films: [], 
                isLoading: false
            }
    }

_displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    console.log(this.props.navigation);
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
}

_displayLoading = () => {
    if (this.state.isLoading) {
        return ( 
            <View style={styles.loading_container}>
                <ActivityIndicator size='large'/>
            </View>  
        )
    }
}

_loadFilms = () => {
    this.setState({isLoading: true});
    if (this.searchedText.length > 0) {
        getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
            this.page = data.page;
            this.totalPages = data.total_pages;
            this.setState({
                films: [ ...this.state.films, ...data.results],
                isLoading: false
            });
            console.log(this.state.films);
        }
        )       
    }
}

_searchTextInputChanged = (text) => {
    this.searchedText = text
}

_searchFilms = () => {
    this.page = 0
    this.totalPages = 0
    this.setState({
        films: []
    }, () => {
        console.log("Page : " + this.page + " / TotalPages: " + " / Nombre de films: " + this.state.films.length);
        this._loadFilms()
    })
}

    render() {
        console.log(this.state.isLoading); 
        return (
            <View style={styles.main_container}>
  
                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Titre du film"/>
                <Button style={{height: 50}} title="Rechercher" onPress={() => this._searchFilms()}/>
                <FlatList 
                data={this.state.films} // données que l'on souhaite afficher 
                keyExtractor={(item) => item.id.toString()}
                onEndReachThreshold = {0.5}
                onEndReached = {() => {
                    if (this.page < this.totalPages) {
                        this._loadFilms();
                    }
                }}
                renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                />
            {this._displayLoading()} 
            </View>
        )
    }
}

const styles = StyleSheet.create ({

    main_container: { 
        flex: 1
    },

    textinput: {
        marginLeft: 5,
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5 
    }, 

    loading_container: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        top: 100, 
        bottom: 0,
        alignItems: 'center', 
        justifyContent: 'center' 

    }
})

export default Search; 