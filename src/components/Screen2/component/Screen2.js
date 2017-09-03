import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Button, Col, Row, Glyphicon } from 'react-bootstrap';

import LoadingModal from '../../Loading/component/LoadingModal';
import PopupMessage from '../../Popup/component/PopupMessage';
import string, { ERRORCODE } from '../../../utils/constants';
import { getData, Lang } from '../../../actions/action';

class Screen2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: "",
            listStatus: false,
            showLoadingPopup: true,
            showPopup: false,
            sortValue: 0,
            lang: this.props.lang ? this.props.lang : "",    // selected language
            errorCode: null,
        }

       
        this.getDataCallback = this.getDataCallback.bind(this);
        this.getRepositoryList = this.getRepositoryList.bind(this);
        this.getRepoSummery = this.getRepoSummery.bind(this);
        this.getPopUp = this.getPopUp.bind(this);
        this.getPopUpMessage = this.getPopUpMessage.bind(this);
        this.close = this.close.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    componentWillMount() {
        getData(this.props.api, this.getDataCallback);
    }

    /**
    * @description Get Repository  List API Call back fucntions >> set response to list
    * @author Suhas R More
    * @param {any} response 
    * @memberof Screen2
    */
    getDataCallback(response, errorCode) {
        if (errorCode == ERRORCODE.SUCCESS) {
            this.setState({
                list: response,
                listStatus: true,
                showLoadingPopup: false,
                errorCode: null,


            });
        } else {
            this.setState({
                listStatus: false,
                showPopup: true,
                showLoadingPopup: false,
                errorCode
            })
        }

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
     * @description renders repo search box and Repositories summuery
     * @author Suhas R More
     * @returns 
     * @memberof Screen2
     */
    getRepoSummery() {
        if (this.state.listStatus == true) {
            return (
                <div >
                    <Row className="Repo-summery">
                        <Col sm={3}>
                            <TextField
                                hintText="Java, Python etc"
                                floatingLabelText="Type and hit enter to search"
                                onChange={this.props.handleSearch}
                            />
                        </Col>
                        <Col sm={3} className="margin-top-2per">
                            {this.state.lang} Repository <em>{this.state.list.data.total_count}</em>
                        </Col>
                    </Row>
                </div>
            );
        }
    }

    /**
     * @description handle Sorting of repositories
     * @author Suhas R More
     * @param {any} e 
     * @param {any} i 
     * @param {any} v 
     * @memberof Screen2
     */
    handleSort(e, i, v) {
        this.setState({
            sortValue: v,
        })
    }

    /**
     * @description renders list of repository Details Name Author commits forks etc
     * @author Suhas R More
     * @returns 
     * @memberof Screen2
     */
    getRepositoryList() {

        if (this.state.listStatus == true) {
            //console.log(this.state.list.data.items.length);
            let Repos = this.state.list.data.items;
            return (

                <div>
                    <Row >
                        <Col sm={7}>
                            <Card className="Repo-details">
                                <Row className="Repo-details-row">

                                    <Col sm={6} className="repo-count">
                                        {this.state.list.data.total_count} total repository count
                                    </Col>
                                    <Col sm={6}>


                                        <SelectField
                                            floatingLabelText="Sort By"
                                            value={this.state.sortValue}
                                            onChange={this.handleSort}
                                        >
                                            <MenuItem value={0} primaryText="Full Name" />
                                            <MenuItem value={1} primaryText="Created Date" />
                                            <MenuItem value={2} primaryText="Updated Date" />
                                            <MenuItem value={3} primaryText="Pushed" />
                                        </SelectField>

                                    </Col>

                                </Row>
                            </Card>

                            {Repos.map((row, index) => (
                                <Row key={index}>
                                    <Card className="Repo-details">
                                        <Row className="Repo-details-row">
                                            <Col sm={6} id={row.owner.login} onClick={this.props.getRepositoryDetails}>
                                                <Button
                                                    id={row.owner.login}
                                                    value={row.owner.login}
                                                    className="Repo-Name"
                                                >
                                                    {row.full_name} <Glyphicon glyph="star" />
                                                </Button>
                                            </Col>
                                            <Col sm={2} className="margin-top-2per noPadding">
                                                <in>Forks</in> <sup>{row.forks}</sup>
                                            </Col>
                                            <Col sm={2} className="margin-top-2per noPadding">
                                                <in>Open Issue</in> <sup>{row.open_issues}</sup>
                                            </Col>
                                            <Col sm={2} className="margin-top-2per noPadding">
                                                <in>Watchers </in> <sup>{row.watchers}</sup>
                                            </Col>

                                        </Row>
                                        <CardHeader
                                            subtitle={row.description}

                                        />
                                        <Row className="bottom">
                                            <Col sm={4}>
                                                <own>{row.owner.login}</own>
                                            </Col>
                                            <Col sm={4}>
                                                <in>Created At </in><time>{row.created_at.split('T', 1)}</time>
                                            </Col>
                                            <Col sm={4}>
                                                <in>Updated At </in><time>{row.updated_at.split('T', 1)}</time>
                                            </Col>
                                        </Row>

                                    </Card>
                                </Row>
                            ))}
                        </Col>
                        <Col sm={4} className="margin-top-6px">

                            {this.getLanguageDescription()}
                        </Col>
                    </Row>
                </div>


            );
        } else {
            return (
                <div>
                    <h3  >Something went wrong</h3>
                </div>
            );
        }
    }

    
    /**
    * @description renders langugae and repo count from Json defined in action
    * @author Suhas R More
    * @returns 
    * @memberof Body
    */
    getLanguageDescription() {
        return (
            <div>
                <Card >
                    <CardHeader className="Languages" title={"Languages"} />

                    {Lang.map((row, index) => (
                        <CardText key={index}>
                            <Row className="lang">
                                <Col sm={6}>
                                    {row.name}
                                </Col>
                                <Col sm={6} className="pull-right ">
                                    {row.repos}
                                </Col>
                            </Row>
                        </CardText>
                    ))}

                </Card>
            </div>
        );
    }

    /**
     * @description renders component (Screen2) when clicked on Lanuage or shows searched repository
     * @author Suhas R More
     * @returns 
     * @memberof Screen2
     */
    render() {
        return (
            <div>
                {this.getPopUp()}
                {this.getPopUpMessage()}
                <div>
                    {this.getRepoSummery()}
                </div>

                <Row>
                    <Col sm={12}>
                        <div className="repo-list">
                            {this.getRepositoryList()}
                        </div>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default Screen2;