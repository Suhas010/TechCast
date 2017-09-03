import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

import { Button, Col, Row, Glyphicon } from 'react-bootstrap';
import LoadingModal from '../../Loading/component/LoadingModal';
import PopupMessage from '../../Popup/component/PopupMessage';
import string, { ERRORCODE } from '../../../utils/constants';
import { getRepoDetails, getUserDetails } from '../../../actions/action';

class Screen3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoadingPopup: true,
            showPopup: false,
            repoList: null,
            userList: null,


        }

        this.getRepoDetailsCallback = this.getRepoDetailsCallback.bind(this);
        this.userDetailsCallback = this.userDetailsCallback.bind(this);

        this.getPopUp = this.getPopUp.bind(this);
        this.getPopUpMessage = this.getPopUpMessage.bind(this);
        this.close = this.close.bind(this);

        this.renderUserDetails = this.renderUserDetails.bind(this);
    }


    /**
     * @description On Component calls action(API) getRepoDetails which returns list of repositories
     * @author Suhas R More
     * @memberof Screen3
     */
    componentWillMount() {
        getRepoDetails(this.props.user, this.getRepoDetailsCallback);
    }

    /**
    * @description Renders Loadings Popup Modal
    * @author Suhas R More
    * @returns 
    * @memberof Screen2
    */
    getPopUp() {
        if (this.state.showLoadingPopup == true) {
            return (<LoadingModal />);
        } else {
            return (<div />);
        }
    }



    /**
     * @description Renders Warnning/Succsess Popup Modal
     * @author Suhas R More
     * @returns 
     * @memberof Screen2
     */
    getPopUpMessage() {
        if (this.state.showPopup == true) {
            let errorCode = this.state.errorCode;

            if (errorCode == ERRORCODE.BAD_GATEWAY) {
                return (
                    <PopupMessage
                        title={string.Error}
                        message={string.BadGateway}
                        onClick={this.close}
                    />
                );
            } else if (errorCode == ERRORCODE.INTERNET_NOT_AWAILABLE) {
                return (
                    <PopupMessage
                        title={string.Error}
                        message={string.NetworkFailure}
                        onClick={this.close}
                    />
                );
            }

        } else {
            return (<div />);
        }
    }

    /**
     * @description Close Popup Message Modal by setting showErrorPopu to false
     * @author Suhas R More
     * @memberof Screen2
     */
    close() {
        this.setState({
            showPopup: false
        })
    }

    /**
     * @description getRepositoryDetails API call function returns list of repository owner details
     * @author Suhas R More
     * @param {any} response 
     * @param {any} errorCode 
     * @memberof Screen3
     */
    getRepoDetailsCallback(response, errorCode) {
        console.log('====================================');
        console.log(response, errorCode);
        console.log('====================================');
        getUserDetails(this.props.user, this.userDetailsCallback);

        if (errorCode == ERRORCODE.SUCCESS) {
            this.setState({
                repoList: response,
                errorCode: null,


            });
        } else {
            this.setState({
                showPopup: true,
                showLoadingPopup: false,
                errorCode
            })
        }

    }
    // extractUserInfo(userList){
    //     let User = userList.data.bio;
    //     console.log(User);
    // }

    userDetailsCallback(response, errorCode) {
        console.log('====================================');
        console.log(response.data.bio);
        console.log('====================================');
        if (errorCode == ERRORCODE.SUCCESS) {
            this.setState({
                userList: response,
                showLoadingPopup: false,
                errorCode: null,


            });
            //this.extractUserInfo(resonse);
        } else {
            this.setState({
                showPopup: true,
                showLoadingPopup: false,
                errorCode
            })
        }



    }

    renderUserDetails() {

        if (this.state.repoList != null && this.state.userList != null) {

            let repoList = this.state.repoList.data.items;
            let userList = this.state.userList.data;
            let repoCount = this.state.repoList.data.total_count;

            return (
                <div>


                    <Row >
                        <Col sm={3} className="avatar">
                            <Card>
                                <img src={userList.avatar_url} className="avatar-img" />

                                <CardHeader
                                    className="Languages"
                                    title={userList.name}
                                    subtitle={userList.login} />
                                <CardText>
                                    {
                                        userList.bio == null ?
                                            (userList.company == null ?
                                                (userList.followers == null ?
                                                    "Public Repo : " + userList.public_repos :
                                                    "Followers : " + userList.followers) :
                                                "Comp : " + userList.company) :
                                            "Bio : " + userList.bio
                                    }
                                    <br /><in>Repo Count</in> <em> {repoCount} </em>
                                </CardText>

                            </Card>


                        </Col>
                        <Col sm={9}>
                            <Row>
                                {repoList.map((row, index) => (
                                    <Col sm={6} key={index} className="margin-top-1per">
                                        <Card>
                                            <Row>
                                                <Col sm={6} >

                                                    <CardHeader
                                                        className="Languages"
                                                        title={row.login}
                                                        subtitle={row.type} />
                                                </Col>
                                                <Col sm={6} className="margin-top-16px">
                                                    <in>Score</in> <em>{row.score}</em>
                                                </Col>
                                            </Row>

                                        </Card>

                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>



                </div>
            );
        }
    }
    render() {
        return (
            <div>
                {this.getPopUp()}
                {this.getPopUpMessage()}
                <div>
                    {this.renderUserDetails()}
                </div>
            </div>
        );
    }
}

export default Screen3;