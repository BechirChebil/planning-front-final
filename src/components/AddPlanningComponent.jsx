import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';

import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import moment from 'moment';

const DATE_TIME_FORMAT = 'yyyy-MM-DD';
class AddPlanningComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, //step 2
            titre: '',
            startTime: ''
        }

        this.changeTitreHandler = this.changeTitreHandler.bind(this);
        this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);

        this.saveOrUpdatePlanning = this.saveOrUpdatePlanning.bind(this);
    }
    //step 3
    componentDidMount() {
        if (this.state.id === -1) {
            return
        } else {
            PlanningService.getPlanningById(this.state.id).then((res) => {
                let planning = res.data;
                this.setState({
                    titre: planning.titre,
                    startTime: planning.startTime,
                });
            })
        }
    }

    saveOrUpdatePlanning = (p) => {
        p.preventDefault();
        let planning = { titre: this.state.titre, startTime: this.state.startTime };
        console.log('planning => ' + JSON.stringify(planning));

        if (this.state.id == -1) {
            PlanningService.addPlanning(planning).then(res => {
                this.props.history.push('/plannings/');
            });
        } else {
            PlanningService.updatePlanning(planning, this.state.id).then(res => {
                this.props.history.push('/plannings/');
            });
        }


    }

    changeTitreHandler = (event) => {
        this.setState({ titre: event.target.value });
    }

   
    changeStartTimeHandler = (value) => {
        console.log(value);
        const formattedDateTime = moment(value).format(DATE_TIME_FORMAT);
        this.setState({ startTime: formattedDateTime });
    }

    cancel() {
        this.props.history.push('/plannings');
    }

    getTitle() {
        if (this.state.id == -1) {
            return <h3 className="text-center">Add Planning</h3>
        } else {
            return <h3 className="text-center">Update Planning</h3>
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>titre:</label>
                                        <input placeholder="titre" name="titre" className="form-control"
                                            value={this.state.titre} onChange={this.changeTitreHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>start time:</label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                inputFormat='yyyy-MM-dd'
                                                renderInput={(props) => <TextField {...props} />}
                                                className="form-date"
                                                value={this.state.startTime}
                                                onChange={(newValue) =>this.changeStartTimeHandler(newValue)}

                                                
                                            />
                                        </LocalizationProvider>
                                     
                                    </div>


                                    <button className="btn btn-success" onClick={this.saveOrUpdatePlanning}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddPlanningComponent;