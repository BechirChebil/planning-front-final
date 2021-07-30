import React, { Component } from 'react';
import PhaseService from '../services/PhaseService';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class ViewPhaseComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            phase: {},
        }
        
        this.editPhase = this.editPhase.bind(this);
    }

    editPhase(id) {
        this.props.history.push(`/AddPhase/${id}`);
    }
    retour() {
        this.props.history.push('/phases');
    }

    componentDidMount() {
        PhaseService.getPhaseById(this.state.id).then(res => {
            this.setState({ phase: res.data });
        })
    }

    render() {
        const { phase } = this.state;
        console.log(phase.seance);
       // let seance_obj = { id: this.state.phase.seance }
        return (
            <div>
                <br></br>
                <div className="card col-md-6 ofset-md-3">
                    <h3 className="text-center">View phase details</h3>
                    <div className="card-body">

                        <div className="row">
                            <label>Titre: </label>
                            <input className="form-control" disabled
                                value={phase.titre} />
                            
                        </div>

                        <div className="row">
                            <label>Discription: </label>
                            <TextareaAutosize
                                value={phase.discription}
                                disabled
                                //aria-label="empty textarea"

                                style={{ width: 1000 }}
                                className="form-control"

                            />
                            
                        </div>

                        <div className="row">
                            <label>Rendu: </label>
                            <input className="form-control" disabled
                                value={phase.rendu} />
                        </div>
                        <div className="row">
                            <label>Start Time: </label>
                            <input className="form-control" disabled
                                value={phase.startTime} />
                        </div>

                        <div className="row">
                            <label>End Time: </label>
                            <input className="form-control" disabled
                                value={phase.endTime} />
                        </div>

                        <div className="row">
                            <label>Seance_id: </label>
                            <input className="form-control" disabled
                                value={phase.seance ? phase.seance.titre : 'None'} />
                            <div></div>
                        </div>
                    </div>
                </div>
                <br></br>
                <button className="btn btn-success" onClick={this.retour.bind(this)} style={{ marginLeft: "10px" }}>Retour</button>
                <button style={{ marginLeft: "400px"}} onClick={() => this.editPhase(phase.id)} className="btn btn-info">Update</button>
            </div>
        );
    }
}

export default ViewPhaseComponent;