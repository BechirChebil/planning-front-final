import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class ViewPlanningComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            planning: {},
        }
        
        this.editPlanning = this.editPlanning.bind(this);
    }

    editPlanning(id) {
        this.props.history.push(`/AddPlanning/${id}`);
    }
    retour() {
        this.props.history.push('/plannings');
    }

    componentDidMount() {
        PlanningService.getPlanningById(this.state.id).then(res => {
            this.setState({ planning: res.data });
        })
    }

    render() {
        const { planning } = this.state;
        //console.log(planning.seance);
        //let seance_obj = { id: this.state.planning.seance }
        return (
            <div>
                <br></br>
                <div className="card col-md-6 ofset-md-3">
                    <h3 className="text-center">View planning details</h3>
                    <div className="card-body">

                        <div className="row">
                            <label>Titre: </label>
                            <input className="form-control" disabled
                                value={" ",planning.titre} />
                            
                        </div>

                        
                        <div className="row">
                            <label>Start Time: </label>
                            <input className="form-control" disabled
                                value={planning.startTime} />
                        </div>

                        

                        
                    </div>
                </div>
                <br></br>
                <button className="btn btn-success" onClick={this.retour.bind(this)} style={{ marginLeft: "10px" }}>Retour</button>
                <button style={{ marginLeft: "400px"}} onClick={() => this.editPlanning(planning.id)} className="btn btn-info">Update</button>
            </div>
        );
    }
}

export default ViewPlanningComponent;