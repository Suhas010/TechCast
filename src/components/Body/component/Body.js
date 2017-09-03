/**
 * Body Component which renders Screen1 or Screen2 or Screen3 dependin on User actions
 */
import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Code from 'material-ui/svg-icons/action/code';
import { Button, Col, Row } from 'react-bootstrap';


import { getData, Lang } from '../../../actions/action';
import Screen1 from '../../Screen1/component/Screen1';
import Screen2 from '../../Screen2/component/Screen2';
import Screen3 from '../../Screen3/component/Screen3';


class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screen: 1,     // Mantains state of active screen depending on this state we decide which screen is to be shown and which not
            api: "",        //  Screen1 retursn API to be called on Screen2 depending on this state we show repositories list on Screen2
            lang: ""        //  Language name >> Java, Python etc...

        }

        this.handleShowRepo = this.handleShowRepo.bind(this);
        this.handleShowRepo = this.handleShowRepo.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getRepositoryDetails = this.getRepositoryDetails.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);
    }



    /**
     * @description toDo handle back click on Screen component
     * @author Suhas R More
     * @memberof Body
     */
    handleHomeClick() {

    }

    /**
     * @description handles click of Language card click >> eg. Java Click , Python Click
     * @author Suhas R More
     * @param {any} event 
     * @memberof Body
     */
    handleShowRepo(event) {
        console.log(event.target.lang);
        this.setState({
            screen: 2,
            api: event.target.id,
            lang: event.target.lang,
        });

    }

    /**
     * @description Hadle Screen2 repo click and change state screen to render screen3
     * @author Suhas R More
     * @param {any} event 
     * @memberof Body
     */
    getRepositoryDetails(event) {
        console.log('====================================');
        console.log(event.target.id, event.target);
        console.log('====================================');
        this.setState({
            screen: 3,
            user: event.target.id
        })

    }


    /**
     * @description  toDo handel search
     * @author Suhas R More
     * @param {any} event 
     * @param {any} value 
     * @memberof Body
     */
    handleSearch(event, value) {
        console.log('====================================');
        console.log(event, value);
        console.log('====================================');
        this.setState({
            api: 'https://api.github.com/search/repositories?q' + value,
            screen: 2,
            lang: value,

        })
    }

    /**
     * @description 
     * @author Suhas R More
     * @returns 
     * @memberof Body
     */
    renderScreen() {
        if (this.state.screen == 1) {
            return (
                <Screen1 onClick={this.handleShowRepo} />
            );

        } else if (this.state.screen == 2) {
            return (
                <Screen2
                    api={this.state.api}
                    lang={this.state.lang}
                    handleSearch={this.handleSearch}
                    getRepositoryDetails={this.getRepositoryDetails}
                    home={this.handleHomeClick}

                />
            );
        } else if (this.state.screen == 3) {
            return (
                <Screen3
                    user={this.state.user}

                />
            );
        }
    }

    
    render() {
        return (
            <div>
                {this.renderScreen()}
                <div>

                </div>
            </div>

        );
    }
}

export default Body;